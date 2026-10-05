const express = require("express");
const os = require("os");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

/* =========================================================
   CONFIGURAÇÕES
========================================================= */

const startTime = Date.now();
let previousCpu = getCpuTimes();

/* =========================================================
   FUNÇÕES AUXILIARES
========================================================= */

function gb(bytes) {
  return (bytes / 1024 / 1024 / 1024).toFixed(2);
}

function mb(bytes) {
  return (bytes / 1024 / 1024).toFixed(2);
}

function percent(part, total) {
  if (!total) return 0;
  return Number(((part / total) * 100).toFixed(1));
}

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

/* =========================================================
   CPU
========================================================= */

function getCpuTimes() {
  return os.cpus().map((cpu) => {
    const times = cpu.times;

    return {
      user: times.user,
      nice: times.nice,
      sys: times.sys,
      idle: times.idle,
      irq: times.irq
    };
  });
}

function calculateCpuUsage() {
  const currentCpu = getCpuTimes();

  const usages = currentCpu.map((current, index) => {
    const previous = previousCpu[index];

    if (!previous) {
      return 0;
    }

    const currentTotal =
      current.user +
      current.nice +
      current.sys +
      current.idle +
      current.irq;

    const previousTotal =
      previous.user +
      previous.nice +
      previous.sys +
      previous.idle +
      previous.irq;

    const totalDiff = currentTotal - previousTotal;
    const idleDiff = current.idle - previous.idle;

    if (totalDiff <= 0) {
      return 0;
    }

    return Math.round(
      ((totalDiff - idleDiff) / totalDiff) * 100
    );
  });

  previousCpu = currentCpu;

  return usages;
}

/* =========================================================
   REDE
========================================================= */

function getNetworkInterfaces() {
  const networks = os.networkInterfaces();
  const interfaces = [];

  for (const name in networks) {
    for (const net of networks[name]) {
      interfaces.push({
        interface: name,
        address: net.address,
        family: net.family,
        mac: net.mac,
        internal: net.internal
      });
    }
  }

  return interfaces;
}

function getMainIP(interfaces) {
  const ipv4 = interfaces.find(
    (item) =>
      item.family === "IPv4" &&
      !item.internal
  );

  return ipv4 ? ipv4.address : "N/A";
}

/* =========================================================
   ARQUIVOS DO PROJETO
========================================================= */

function countFiles(directory) {
  let total = 0;

  try {
    const items = fs.readdirSync(directory, {
      withFileTypes: true
    });

    for (const item of items) {
      // Ignora pastas pesadas e desnecessárias
      if (
        item.name === "node_modules" ||
        item.name === ".git" ||
        item.name === ".cache"
      ) {
        continue;
      }

      const fullPath = path.join(directory, item.name);

      if (item.isDirectory()) {
        total += countFiles(fullPath);
      } else {
        total++;
      }
    }
  } catch (error) {
    return total;
  }

  return total;
}

function getFilesDetailed(directory) {
  const files = [];

  try {
    const items = fs.readdirSync(directory, {
      withFileTypes: true
    });

    for (const item of items) {
      if (
        item.name === "node_modules" ||
        item.name === ".git" ||
        item.name === ".cache"
      ) {
        continue;
      }

      const fullPath = path.join(directory, item.name);

      try {
        const stat = fs.statSync(fullPath);

        files.push({
          name: item.name,
          type: item.isDirectory() ? "Pasta" : "Arquivo",
          size: item.isDirectory()
            ? "-"
            : `${(stat.size / 1024).toFixed(2)} KB`,
          modified: stat.mtime.toLocaleString()
        });
      } catch (error) {
        // Ignora arquivos que não puderem ser acessados
      }

      if (files.length >= 30) {
        break;
      }
    }
  } catch (error) {
    return [];
  }

  return files;
}

/* =========================================================
   AMBIENTE
========================================================= */

function getEnvironment() {
  if (process.env.RENDER) {
    return {
      type: "Cloud",
      provider: "Render",
      color: "#7c3aed"
    };
  }

  if (process.env.RAILWAY_ENVIRONMENT) {
    return {
      type: "Cloud",
      provider: "Railway",
      color: "#111827"
    };
  }

  if (process.env.VERCEL) {
    return {
      type: "Cloud",
      provider: "Vercel",
      color: "#000000"
    };
  }

  if (process.env.RENDER_SERVICE_ID) {
    return {
      type: "Cloud",
      provider: "Render",
      color: "#7c3aed"
    };
  }

  return {
    type: "Local",
    provider: "Computador local",
    color: "#2563eb"
  };
}

/* =========================================================
   STATUS DO SISTEMA
========================================================= */

function getHealthStatus(ramUsage, cpuUsage, loadAverage, cores) {
  if (
    ramUsage >= 90 ||
    cpuUsage >= 90 ||
    loadAverage >= cores * 1.5
  ) {
    return {
      label: "CRÍTICO",
      color: "#dc2626",
      icon: "🔴"
    };
  }

  if (
    ramUsage >= 75 ||
    cpuUsage >= 75 ||
    loadAverage >= cores
  ) {
    return {
      label: "ATENÇÃO",
      color: "#f59e0b",
      icon: "🟠"
    };
  }

  return {
    label: "NORMAL",
    color: "#16a34a",
    icon: "🟢"
  };
}

/* =========================================================
   ESCAPAR HTML
========================================================= */

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================================================
   ROTA PRINCIPAL
========================================================= */

app.get("/", (req, res) => {
  /* =========================
     MEMÓRIA
  ========================= */

  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;

  const ramUsage = percent(
    usedMemory,
    totalMemory
  );

  /* =========================
     CPU
  ========================= */

  const cpus = os.cpus();
  const cpuCount = cpus.length;

  const cpuUsages = calculateCpuUsage();

  const averageCpu =
    cpuUsages.length > 0
      ? Math.round(
          cpuUsages.reduce(
            (sum, value) => sum + value,
            0
          ) / cpuUsages.length
        )
      : 0;

  const loadAverage = os.loadavg();

  /* =========================
     REDE
  ========================= */

  const networkInterfaces =
    getNetworkInterfaces();

  const mainIP =
    getMainIP(networkInterfaces);

  /* =========================
     ARQUIVOS
  ========================= */

  const projectDirectory = process.cwd();

  const totalFiles =
    countFiles(projectDirectory);

  const files =
    getFilesDetailed(projectDirectory);

  /* =========================
     SISTEMA
  ========================= */

  const uptime = os.uptime();

  const user = os.userInfo();

  const environment =
    getEnvironment();

  const health =
    getHealthStatus(
      ramUsage,
      averageCpu,
      loadAverage[0],
      cpuCount
    );

  /* =========================
     PROCESSO NODE
  ========================= */

  const nodeMemory =
    process.memoryUsage();

  const processUptime =
    Math.floor(
      (Date.now() - startTime) / 1000
    );

  /* =========================
     VARIÁVEIS DE AMBIENTE
  ========================= */

  const importantEnv = {
    NODE_ENV:
      process.env.NODE_ENV || "development",

    PORT:
      process.env.PORT || PORT,

    RENDER:
      process.env.RENDER || "Não definido",

    RENDER_SERVICE_ID:
      process.env.RENDER_SERVICE_ID ||
      "Não definido",

    RENDER_INSTANCE_ID:
      process.env.RENDER_INSTANCE_ID ||
      "Não definido"
  };

  /* =========================================================
     HTML
  ========================================================= */

  res.send(`
<!DOCTYPE html>

<html lang="pt-BR">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<meta http-equiv="refresh" content="5">

<title>Dashboard de Monitoramento</title>

<style>

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  background:
    linear-gradient(
      135deg,
      #eef2ff,
      #f8fafc
    );

  color: #1e293b;
}

/* =========================
   HEADER
========================= */

.header {

  background:
    linear-gradient(
      135deg,
      #1e3a8a,
      #2563eb
    );

  color: white;

  padding: 30px;

  text-align: center;

  box-shadow:
    0 4px 15px
    rgba(0,0,0,.15);
}

.header h1 {
  margin: 0;
  font-size: 32px;
}

.header p {
  margin-top: 8px;
  opacity: .9;
}

/* =========================
   CONTAINER
========================= */

.container {

  width: 95%;

  max-width: 1500px;

  margin: 25px auto;
}

/* =========================
   GRID
========================= */

.kpi-grid {

  display: grid;

  grid-template-columns:
    repeat(
      auto-fit,
      minmax(180px, 1fr)
    );

  gap: 18px;

  margin-bottom: 20px;
}

.grid {

  display: grid;

  grid-template-columns:
    repeat(
      auto-fit,
      minmax(350px, 1fr)
    );

  gap: 20px;
}

/* =========================
   CARDS
========================= */

.card {

  background: white;

  padding: 22px;

  border-radius: 16px;

  box-shadow:
    0 5px 18px
    rgba(15,23,42,.08);

  border:
    1px solid #e2e8f0;
}

.card h2 {

  margin-top: 0;

  color: #1e3a8a;

  border-bottom:
    2px solid #e2e8f0;

  padding-bottom: 10px;
}

/* =========================
   KPI
========================= */

.kpi {

  text-align: center;
}

.kpi-title {

  color: #64748b;

  font-size: 14px;

  font-weight: bold;
}

.kpi-value {

  font-size: 30px;

  font-weight: bold;

  margin-top: 8px;

  color: #0f172a;
}

/* =========================
   PROGRESS BAR
========================= */

.progress {

  width: 100%;

  height: 24px;

  background: #e2e8f0;

  border-radius: 20px;

  overflow: hidden;

  margin:
    12px 0;
}

.progress-bar {

  height: 100%;

  display: flex;

  align-items: center;

  justify-content: center;

  color: white;

  font-size: 12px;

  font-weight: bold;

  transition:
    width .4s;
}

/* =========================
   STATUS
========================= */

.status {

  display: inline-block;

  padding:
    8px 14px;

  border-radius:
    999px;

  color: white;

  font-weight: bold;

  font-size: 13px;
}

/* =========================
   INFO
========================= */

.info {

  display: flex;

  justify-content:
    space-between;

  gap: 10px;

  padding: 9px 0;

  border-bottom:
    1px solid #f1f5f9;
}

.info:last-child {
  border-bottom: none;
}

.label {
  color: #64748b;
}

.value {
  font-weight: bold;

  text-align: right;

  word-break: break-word;
}

/* =========================
   TABLE
========================= */

table {

  width: 100%;

  border-collapse:
    collapse;

  font-size: 13px;
}

th {

  background: #eff6ff;

  color: #1e3a8a;
}

th,
td {

  padding: 10px;

  border-bottom:
    1px solid #e2e8f0;

  text-align: left;
}

tr:hover {

  background: #f8fafc;
}

/* =========================
   CPU CORES
========================= */

.core {

  margin:
    12px 0;
}

.core-title {

  display: flex;

  justify-content:
    space-between;

  font-size: 13px;

  margin-bottom: 5px;
}

/* =========================
   ENVIRONMENT
========================= */

.environment {

  color: white;

  padding: 14px;

  border-radius: 10px;

  text-align: center;

  font-weight: bold;

  margin-bottom: 15px;
}

/* =========================
   FOOTER
========================= */

.footer {

  text-align: center;

  padding: 30px;

  color: #64748b;

  font-size: 13px;
}

/* =========================
   RESPONSIVE
========================= */

@media(max-width:600px) {

  .header h1 {
    font-size: 24px;
  }

  .container {
    width: 92%;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .info {
    flex-direction: column;
  }

  .value {
    text-align: left;
  }

}

</style>

</head>

<body>

<!-- =========================
     HEADER
========================= -->

<header class="header">

<h1>
🖥️ Dashboard de Monitoramento
</h1>

<p>
Sistema Operacional + Hardware + Node.js + Cloud
</p>

<p>
Atualizado em:
${new Date().toLocaleString("pt-BR")}
</p>

</header>

<div class="container">

<!-- =========================
     KPIs
========================= -->

<div class="kpi-grid">

<div class="card kpi">

<div class="kpi-title">
🧠 USO DE RAM
</div>

<div class="kpi-value">
${ramUsage}%
</div>

</div>


<div class="card kpi">

<div class="kpi-title">
⚙️ USO MÉDIO DA CPU
</div>

<div class="kpi-value">
${averageCpu}%
</div>

</div>


<div class="card kpi">

<div class="kpi-title">
⏱️ UPTIME
</div>

<div class="kpi-value"
style="font-size:20px">

${formatUptime(uptime)}

</div>

</div>


<div class="card kpi">

<div class="kpi-title">
📂 ARQUIVOS DO PROJETO
</div>

<div class="kpi-value">
${totalFiles}
</div>

</div>


<div class="card kpi">

<div class="kpi-title">
🌐 IP PRINCIPAL
</div>

<div class="kpi-value"
style="font-size:18px">

${escapeHtml(mainIP)}

</div>

</div>


<div class="card kpi">

<div class="kpi-title">
🚦 STATUS DO SISTEMA
</div>

<div style="margin-top:10px">

<span
class="status"
style="background:${health.color}">

${health.icon}
${health.label}

</span>

</div>

</div>

</div>


<!-- =========================
     GRID PRINCIPAL
========================= -->

<div class="grid">


<!-- =========================
     SISTEMA OPERACIONAL
========================= -->

<div class="card">

<h2>
📌 Sistema Operacional
</h2>

<div class="info">
<span class="label">
Nome da máquina
</span>

<span class="value">
${escapeHtml(os.hostname())}
</span>
</div>

<div class="info">
<span class="label">
Sistema
</span>

<span class="value">
${escapeHtml(os.type())}
</span>
</div>

<div class="info">
<span class="label">
Versão do Kernel
</span>

<span class="value">
${escapeHtml(os.release())}
</span>
</div>

<div class="info">
<span class="label">
Plataforma
</span>

<span class="value">
${escapeHtml(os.platform())}
</span>
</div>

<div class="info">
<span class="label">
Arquitetura
</span>

<span class="value">
${escapeHtml(os.arch())}
</span>
</div>

<div class="info">
<span class="label">
Endianness
</span>

<span class="value">
${escapeHtml(os.endianness())}
</span>
</div>

<div class="info">
<span class="label">
Versão do Node.js
</span>

<span class="value">
${escapeHtml(process.version)}
</span>
</div>

</div>


<!-- =========================
     MEMÓRIA
========================= -->

<div class="card">

<h2>
🧠 Memória RAM
</h2>

<div class="info">

<span class="label">
Memória total
</span>

<span class="value">
${gb(totalMemory)} GB
</span>

</div>

<div class="info">

<span class="label">
Memória utilizada
</span>

<span class="value">
${gb(usedMemory)} GB
</span>

</div>

<div class="info">

<span class="label">
Memória livre
</span>

<span class="value">
${gb(freeMemory)} GB
</span>

</div>

<div class="progress">

<div
class="progress-bar"
style="
width:${ramUsage}%;
background:
${
  ramUsage >= 85
    ? "#dc2626"
    : ramUsage >= 65
    ? "#f59e0b"
    : "#2563eb"
};
">

${ramUsage}%

</div>

</div>

<p style="color:#64748b;font-size:13px">

A memória RAM é utilizada pelos processos
e aplicações em execução no sistema.

</p>

</div>


<!-- =========================
     CPU
========================= -->

<div class="card">

<h2>
⚙️ Processador
</h2>

<div class="info">

<span class="label">
Quantidade de CPUs
</span>

<span class="value">
${cpuCount}
</span>

</div>

<div class="info">

<span class="label">
Modelo
</span>

<span class="value">
${escapeHtml(cpus[0]?.model || "N/A")}
</span>

</div>

<div class="info">

<span class="label">
Velocidade
</span>

<span class="value">
${cpus[0]?.speed || "N/A"} MHz
</span>

</div>

<div class="info">

<span class="label">
Uso médio
</span>

<span class="value">
${averageCpu}%
</span>

</div>

<h3>
Uso por núcleo
</h3>

${cpuUsages
  .map(
    (usage, index) => `
    
<div class="core">

<div class="core-title">

<span>
Core ${index}
</span>

<span>
${usage}%
</span>

</div>

<div class="progress">

<div
class="progress-bar"
style="
width:${usage}%;
background:
${
  usage >= 85
    ? "#dc2626"
    : usage >= 65
    ? "#f59e0b"
    : "#2563eb"
};
">

${usage}%

</div>

</div>

</div>

`
  )
  .join("")}

</div>


<!-- =========================
     LOAD AVERAGE
========================= -->

<div class="card">

<h2>
📊 Carga do Sistema
</h2>

<div class="info">

<span class="label">
Último minuto
</span>

<span class="value">
${loadAverage[0].toFixed(2)}
</span>

</div>

<div class="info">

<span class="label">
Últimos 5 minutos
</span>

<span class="value">
${loadAverage[1].toFixed(2)}
</span>

</div>

<div class="info">

<span class="label">
Últimos 15 minutos
</span>

<span class="value">
${loadAverage[2].toFixed(2)}
</span>

</div>

<p style="color:#64748b;font-size:13px">

Load Average representa a quantidade
média de processos aguardando recursos
do sistema.

</p>

</div>


<!-- =========================
     REDE
========================= -->

<div class="card">

<h2>
🌐 Rede
</h2>

<div class="info">

<span class="label">
IP principal
</span>

<span class="value">
${escapeHtml(mainIP)}
</span>

</div>

<div class="info">

<span class="label">
Interfaces encontradas
</span>

<span class="value">
${networkInterfaces.length}
</span>

</div>

<table>

<thead>

<tr>

<th>
Interface
</th>

<th>
IP
</th>

<th>
Família
</th>

</tr>

</thead>

<tbody>

${networkInterfaces
  .map(
    (network) => `
    
<tr>

<td>
${escapeHtml(network.interface)}
</td>

<td>
${escapeHtml(network.address)}
</td>

<td>
${escapeHtml(network.family)}
</td>

</tr>

`
  )
  .join("")}

</tbody>

</table>

</div>


<!-- =========================
     ARQUIVOS
========================= -->

<div class="card">

<h2>
📂 Arquivos do Projeto
</h2>

<div class="info">

<span class="label">
Total de arquivos
</span>

<span class="value">
${totalFiles}
</span>

</div>

<table>

<thead>

<tr>

<th>
Nome
</th>

<th>
Tipo
</th>

<th>
Tamanho
</th>

</tr>

</thead>

<tbody>

${files
  .map(
    (file) => `
    
<tr>

<td>
${escapeHtml(file.name)}
</td>

<td>
${escapeHtml(file.type)}
</td>

<td>
${escapeHtml(file.size)}
</td>

</tr>

`
  )
  .join("")}

</tbody>

</table>

<p style="color:#64748b;font-size:12px">

São exibidos até 30 itens como exemplo.
A contagem considera todo o projeto,
exceto node_modules, .git e .cache.

</p>

</div>


<!-- =========================
     USUÁRIO
========================= -->

<div class="card">

<h2>
👤 Usuário do Sistema
</h2>

<div class="info">

<span class="label">
Usuário
</span>

<span class="value">
${escapeHtml(user.username)}
</span>

</div>

<div class="info">

<span class="label">
Diretório Home
</span>

<span class="value">
${escapeHtml(os.homedir())}
</span>

</div>

<div class="info">

<span class="label">
Diretório temporário
</span>

<span class="value">
${escapeHtml(os.tmpdir())}
</span>

</div>

<div class="info">

<span class="label">
Shell
</span>

<span class="value">
${escapeHtml(user.shell || "N/A")}
</span>

</div>

<div class="info">

<span class="label">
UID
</span>

<span class="value">
${process.getuid
  ? process.getuid()
  : "N/A"}
</span>

</div>

<div class="info">

<span class="label">
GID
</span>

<span class="value">
${process.getgid
  ? process.getgid()
  : "N/A"}
</span>

</div>

</div>


<!-- =========================
     TEMPO
========================= -->

<div class="card">

<h2>
⏰ Tempo de Atividade
</h2>

<div class="info">

<span class="label">
Uptime do sistema
</span>

<span class="value">
${formatUptime(uptime)}
</span>

</div>

<div class="info">

<span class="label">
Timezone
</span>

<span class="value">
${escapeHtml(
  Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone
)}
</span>

</div>

<div class="info">

<span class="label">
Data atual
</span>

<span class="value">
${new Date().toLocaleString("pt-BR")}
</span>

</div>

<div class="info">

<span class="label">
ISO
</span>

<span class="value">
${new Date().toISOString()}
</span>

</div>

</div>


<!-- =========================
     NODE.JS
========================= -->

<div class="card">

<h2>
🟢 Aplicação Node.js
</h2>

<div class="info">

<span class="label">
PID
</span>

<span class="value">
${process.pid}
</span>

</div>

<div class="info">

<span class="label">
Versão Node
</span>

<span class="value">
${process.version}
</span>

</div>

<div class="info">

<span class="label">
Diretório
</span>

<span class="value">
${escapeHtml(process.cwd())}
</span>

</div>

<div class="info">

<span class="label">
Memória RSS
</span>

<span class="value">
${mb(nodeMemory.rss)} MB
</span>

</div>

<div class="info">

<span class="label">
Heap utilizado
</span>

<span class="value">
${mb(nodeMemory.heapUsed)} MB
</span>

</div>

<div class="info">

<span class="label">
Heap total
</span>

<span class="value">
${mb(nodeMemory.heapTotal)} MB
</span>

</div>

<div class="info">

<span class="label">
Uptime da aplicação
</span>

<span class="value">
${formatUptime(processUptime)}
</span>

</div>

</div>


<!-- =========================
     CLOUD
========================= -->

<div class="card">

<h2>
☁️ Ambiente de Execução
</h2>

<div
class="environment"
style="background:${environment.color}">

${environment.type}

<br>

${environment.provider}

</div>

<div class="info">

<span class="label">
Plataforma
</span>

<span class="value">
${environment.provider}
</span>

</div>

<div class="info">

<span class="label">
PORT
</span>

<span class="value">
${escapeHtml(importantEnv.PORT)}
</span>

</div>

<div class="info">

<span class="label">
NODE_ENV
</span>

<span class="value">
${escapeHtml(importantEnv.NODE_ENV)}
</span>

</div>

<div class="info">

<span class="label">
Render
</span>

<span class="value">
${escapeHtml(importantEnv.RENDER)}
</span>

</div>

<div class="info">

<span class="label">
Render Service ID
</span>

<span class="value">
${escapeHtml(
  importantEnv.RENDER_SERVICE_ID
)}
</span>

</div>

<div class="info">

<span class="label">
Render Instance ID
</span>

<span class="value">
${escapeHtml(
  importantEnv.RENDER_INSTANCE_ID
)}
</span>

</div>

</div>


<!-- =========================
     VARIÁVEIS DE AMBIENTE
========================= -->

<div class="card">

<h2>
🔐 Variáveis de Ambiente
</h2>

<table>

<thead>

<tr>

<th>
Variável
</th>

<th>
Valor
</th>

</tr>

</thead>

<tbody>

${Object.entries(importantEnv)
  .map(
    ([key, value]) => `
    
<tr>

<td>
<b>${escapeHtml(key)}</b>
</td>

<td>
${escapeHtml(value)}
</td>

</tr>

`
  )
  .join("")}

</tbody>

</table>

<p style="color:#64748b;font-size:12px">

Por segurança, apenas variáveis
relevantes ao funcionamento da aplicação
são exibidas.

</p>

</div>


<!-- =========================
     STATUS
========================= -->

<div class="card">

<h2>
🚦 Diagnóstico
</h2>

<div
style="
text-align:center;
padding:20px;
">

<div
style="
font-size:50px;
">

${health.icon}

</div>

<h2
style="
border:none;
margin:5px;
">

${health.label}

</h2>

<p>

RAM:
<b>${ramUsage}%</b>

<br>

CPU:
<b>${averageCpu}%</b>

<br>

Load:
<b>${loadAverage[0].toFixed(2)}</b>

</p>

</div>

</div>


</div>

</div>


<!-- =========================
     FOOTER
========================= -->

<footer class="footer">

SO Dashboard • Node.js + Express

<br>

Monitoramento de Sistema Operacional
e Ambiente Cloud

<br><br>

Atualização automática a cada 5 segundos.

</footer>

</body>

</html>
  `);
});

/* =========================================================
   ROTA DE API
========================================================= */

app.get("/api/status", (req, res) => {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;

  const cpuUsages = calculateCpuUsage();

  const averageCpu =
    cpuUsages.length > 0
      ? Math.round(
          cpuUsages.reduce(
            (sum, value) => sum + value,
            0
          ) / cpuUsages.length
        )
      : 0;

  const networkInterfaces =
    getNetworkInterfaces();

  const environment =
    getEnvironment();

  res.json({
    timestamp: new Date().toISOString(),

    system: {
      hostname: os.hostname(),
      type: os.type(),
      release: os.release(),
      platform: os.platform(),
      architecture: os.arch(),
      endianness: os.endianness(),
      nodeVersion: process.version
    },

    memory: {
      total: totalMemory,
      free: freeMemory,
      used: usedMemory,
      usagePercent: percent(
        usedMemory,
        totalMemory
      )
    },

    cpu: {
      cores: os.cpus().length,
      averageUsage: averageCpu,
      perCore: cpuUsages,
      loadAverage: os.loadavg()
    },

    network: {
      mainIP:
        getMainIP(networkInterfaces),

      interfaces:
        networkInterfaces
    },

    project: {
      directory: process.cwd(),
      files:
        countFiles(process.cwd())
    },

    environment,

    process: {
      pid: process.pid,
      uptime: process.uptime(),
      memory: process.memoryUsage()
    }
  });
});

/* =========================================================
   INICIALIZAÇÃO
========================================================= */

app.listen(PORT, () => {

  console.log(
    "=========================================="
  );

  console.log(
    "🖥️  SO DASHBOARD"
  );

  console.log(
    "=========================================="
  );

  console.log(
    `Servidor rodando na porta ${PORT}`
  );

  console.log(
    `Acesse: http://localhost:${PORT}`
  );

  console.log(
    `Ambiente: ${
      getEnvironment().provider
    }`
  );

  console.log(
    "=========================================="
  );

});