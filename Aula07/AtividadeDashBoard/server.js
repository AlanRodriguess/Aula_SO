const express = require("express");
const os = require("os");
const fs = require("fs");
const path = require("path");

const app = express();

/* =========================================================
   CONFIGURAÇÕES
========================================================= */

const PORT = Number(process.env.PORT) || 3000;

const APP_NAME =
  process.env.APP_NAME || "SO Dashboard";

const APP_VERSION =
  process.env.APP_VERSION || "2.0.0";

const NODE_ENV =
  process.env.NODE_ENV || "development";

const AUTHOR =
  process.env.AUTHOR || "Alan Rodrigues";

const CLOUD_PROVIDER =
  process.env.CLOUD_PROVIDER || "Automático";

const AUTO_REFRESH =
  Math.max(
    2,
    Number(process.env.AUTO_REFRESH) || 5
  );

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

  return Number(
    ((part / total) * 100).toFixed(1)
  );
}

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);

  const hours = Math.floor(
    (seconds % 86400) / 3600
  );

  const minutes = Math.floor(
    (seconds % 3600) / 60
  );

  const secs = Math.floor(seconds % 60);

  return (
    days +
    "d " +
    hours +
    "h " +
    minutes +
    "m " +
    secs +
    "s"
  );
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

  const usages = currentCpu.map(
    (current, index) => {

      const previous =
        previousCpu[index];

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

      const totalDiff =
        currentTotal -
        previousTotal;

      const idleDiff =
        current.idle -
        previous.idle;

      if (totalDiff <= 0) {
        return 0;
      }

      return Math.round(
        ((totalDiff - idleDiff) /
          totalDiff) *
          100
      );
    }
  );

  previousCpu = currentCpu;

  return usages;
}

/* =========================================================
   REDE
========================================================= */

function getNetworkInterfaces() {
  const networks =
    os.networkInterfaces();

  const interfaces = [];

  for (const name in networks) {

    for (const net of networks[name] || []) {

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

  const ipv4 =
    interfaces.find(
      (item) =>
        item.family === "IPv4" &&
        !item.internal
    );

  return ipv4
    ? ipv4.address
    : "N/A";
}

/* =========================================================
   ARQUIVOS
========================================================= */

function shouldIgnore(name) {

  return [
    "node_modules",
    ".git",
    ".cache",
    ".next",
    "dist",
    "build"
  ].includes(name);

}

function countFiles(directory) {

  let total = 0;

  try {

    const items =
      fs.readdirSync(
        directory,
        {
          withFileTypes: true
        }
      );

    for (const item of items) {

      if (shouldIgnore(item.name)) {
        continue;
      }

      const fullPath =
        path.join(
          directory,
          item.name
        );

      if (item.isDirectory()) {

        total += countFiles(
          fullPath
        );

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

    const items =
      fs.readdirSync(
        directory,
        {
          withFileTypes: true
        }
      );

    for (const item of items) {

      if (shouldIgnore(item.name)) {
        continue;
      }

      const fullPath =
        path.join(
          directory,
          item.name
        );

      try {

        const stat =
          fs.statSync(fullPath);

        files.push({

          name:
            item.name,

          type:
            item.isDirectory()
              ? "Pasta"
              : "Arquivo",

          size:
            item.isDirectory()
              ? "-"
              : (
                  stat.size /
                  1024
                ).toFixed(2) +
                " KB",

          modified:
            stat.mtime.toLocaleString(
              "pt-BR"
            )

        });

      } catch (error) {

        continue;

      }

      if (files.length >= 100) {
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

  if (
    process.env.RENDER ||
    process.env.RENDER_SERVICE_ID
  ) {

    return {
      type: "Cloud",
      provider: "Render",
      color: "#7c3aed"
    };

  }

  if (
    process.env.RAILWAY_ENVIRONMENT
  ) {

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

  if (
    CLOUD_PROVIDER !==
    "Automático"
  ) {

    return {
      type: "Cloud",
      provider: CLOUD_PROVIDER,
      color: "#2563eb"
    };

  }

  return {
    type: "Local",
    provider: "Computador local",
    color: "#2563eb"
  };
}

/* =========================================================
   SAÚDE
========================================================= */

function getHealthStatus(
  ramUsage,
  cpuUsage,
  loadAverage,
  cores
) {

  const loadProblem =
    process.platform !== "win32" &&
    cores > 0 &&
    loadAverage >= cores * 1.5;

  const loadWarning =
    process.platform !== "win32" &&
    cores > 0 &&
    loadAverage >= cores;

  if (
    ramUsage >= 90 ||
    cpuUsage >= 90 ||
    loadProblem
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
    loadWarning
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
   COLETA DOS DADOS
========================================================= */

function getSystemData() {

  const totalMemory =
    os.totalmem();

  const freeMemory =
    os.freemem();

  const usedMemory =
    totalMemory -
    freeMemory;

  const ramUsage =
    percent(
      usedMemory,
      totalMemory
    );

  const cpus =
    os.cpus();

  const cpuUsages =
    calculateCpuUsage();

  const averageCpu =
    cpuUsages.length
      ? Math.round(
          cpuUsages.reduce(
            (sum, value) =>
              sum + value,
            0
          ) /
          cpuUsages.length
        )
      : 0;

  const loadAverage =
    os.loadavg();

  const networkInterfaces =
    getNetworkInterfaces();

  const mainIP =
    getMainIP(
      networkInterfaces
    );

  const projectDirectory =
    process.cwd();

  const totalFiles =
    countFiles(
      projectDirectory
    );

  const files =
    getFilesDetailed(
      projectDirectory
    );

  const uptime =
    os.uptime();

  const user =
    os.userInfo();

  const environment =
    getEnvironment();

  const health =
    getHealthStatus(
      ramUsage,
      averageCpu,
      loadAverage[0],
      cpus.length
    );

  const nodeMemory =
    process.memoryUsage();

  const processUptime =
    Math.floor(
      (Date.now() -
        startTime) /
        1000
    );

  return {

    timestamp:
      new Date().toISOString(),

    system: {

      hostname:
        os.hostname(),

      type:
        os.type(),

      release:
        os.release(),

      platform:
        os.platform(),

      architecture:
        os.arch(),

      endianness:
        os.endianness(),

      nodeVersion:
        process.version,

      cpus:
        cpus.length

    },

    memory: {

      total:
        totalMemory,

      free:
        freeMemory,

      used:
        usedMemory,

      usagePercent:
        ramUsage

    },

    cpu: {

      cores:
        cpus.length,

      model:
        cpus[0]?.model ||
        "N/A",

      speed:
        cpus[0]?.speed ||
        0,

      averageUsage:
        averageCpu,

      perCore:
        cpuUsages,

      loadAverage:
        loadAverage

    },

    network: {

      mainIP:
        mainIP,

      interfaces:
        networkInterfaces

    },

    project: {

      directory:
        projectDirectory,

      files:
        totalFiles,

      details:
        files

    },

    user: {

      username:
        user.username,

      home:
        os.homedir(),

      temp:
        os.tmpdir(),

      shell:
        user.shell ||
        "N/A",

      uid:
        process.getuid
          ? process.getuid()
          : "N/A",

      gid:
        process.getgid
          ? process.getgid()
          : "N/A"

    },

    time: {

      uptime:
        uptime,

      timezone:
        Intl.DateTimeFormat()
          .resolvedOptions()
          .timeZone,

      current:
        new Date()
          .toLocaleString(
            "pt-BR"
          ),

      iso:
        new Date()
          .toISOString()

    },

    node: {

      pid:
        process.pid,

      version:
        process.version,

      directory:
        process.cwd(),

      rss:
        nodeMemory.rss,

      heapUsed:
        nodeMemory.heapUsed,

      heapTotal:
        nodeMemory.heapTotal,

      external:
        nodeMemory.external,

      arrayBuffers:
        nodeMemory.arrayBuffers,

      uptime:
        processUptime

    },

    environment,

    health,

    config: {

      appName:
        APP_NAME,

      version:
        APP_VERSION,

      nodeEnv:
        NODE_ENV,

      port:
        PORT,

      author:
        AUTHOR,

      cloudProvider:
        CLOUD_PROVIDER,

      autoRefresh:
        AUTO_REFRESH

    }

  };
}

/* =========================================================
   API
========================================================= */

app.get(
  "/api/status",
  (req, res) => {

    try {

      res.json(
        getSystemData()
      );

    } catch (error) {

      console.error(error);

      res.status(500).json({

        error:
          "Erro ao coletar dados do sistema."

      });

    }

  }
);

/* =========================================================
   DASHBOARD
========================================================= */

app.get("/", (req, res) => {

  const data =
    getSystemData();

  res.send(`

<!DOCTYPE html>

<html lang="pt-BR">

<head>

<meta charset="UTF-8">

<meta
name="viewport"
content="width=device-width, initial-scale=1.0">

<meta
name="description"
content="Dashboard de monitoramento do Sistema Operacional">

<title>
${escapeHtml(APP_NAME)}
</title>

<style>

/* =========================================================
   RESET
========================================================= */

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {

  margin: 0;

  font-family:
    Inter,
    Segoe UI,
    Arial,
    sans-serif;

  background:
    #f1f5f9;

  color:
    #0f172a;

  transition:
    background .3s,
    color .3s;

}

/* =========================================================
   DARK
========================================================= */

body.dark {

  background:
    #020617;

  color:
    #e2e8f0;

}

/* =========================================================
   SIDEBAR
========================================================= */

.sidebar {

  position: fixed;

  left: 0;

  top: 0;

  width: 245px;

  height: 100vh;

  background:
    linear-gradient(
      180deg,
      #0f172a,
      #172554
    );

  color: white;

  padding: 25px 15px;

  z-index: 1000;

  overflow-y: auto;

  transition:
    transform .3s;

}

.logo {

  text-align: center;

  padding:
    10px 5px 25px;

  border-bottom:
    1px solid
    rgba(255,255,255,.12);

}

.logo-icon {

  font-size:
    42px;

}

.logo h2 {

  margin:
    8px 0 3px;

}

.logo small {

  opacity:
    .65;

}

.menu {

  margin-top:
    25px;

}

.menu a {

  display:
    flex;

  align-items:
    center;

  gap:
    12px;

  color:
    #cbd5e1;

  text-decoration:
    none;

  padding:
    13px;

  border-radius:
    10px;

  margin-bottom:
    5px;

  transition:
    .2s;

}

.menu a:hover {

  background:
    rgba(255,255,255,.1);

  color:
    white;

  transform:
    translateX(3px);

}

/* =========================================================
   MAIN
========================================================= */

.main {

  margin-left:
    245px;

  min-height:
    100vh;

}

/* =========================================================
   HEADER
========================================================= */

.header {

  background:
    linear-gradient(
      135deg,
      #0f172a,
      #1d4ed8,
      #2563eb
    );

  color:
    white;

  padding:
    35px;

  box-shadow:
    0 10px 30px
    rgba(15,23,42,.2);

}

.header-content {

  max-width:
    1500px;

  margin:
    auto;

  display:
    flex;

  justify-content:
    space-between;

  align-items:
    center;

  gap:
    20px;

}

.header h1 {

  margin:
    0;

  font-size:
    clamp(25px,4vw,42px);

}

.header p {

  margin:
    7px 0 0;

  opacity:
    .85;

}

.header-actions {

  display:
    flex;

  gap:
    8px;

  flex-wrap:
    wrap;

}

/* =========================================================
   BUTTONS
========================================================= */

.btn {

  border:
    none;

  padding:
    10px 15px;

  border-radius:
    10px;

  cursor:
    pointer;

  font-weight:
    700;

  background:
    white;

  color:
    #1e3a8a;

  transition:
    .2s;

}

.btn:hover {

  transform:
    translateY(-2px);

  box-shadow:
    0 8px 20px
    rgba(0,0,0,.2);

}

.btn-blue {

  background:
    #2563eb;

  color:
    white;

}

/* =========================================================
   CONTAINER
========================================================= */

.container {

  width:
    94%;

  max-width:
    1500px;

  margin:
    30px auto;

}

/* =========================================================
   STATUS BAR
========================================================= */

.status-bar {

  display:
    flex;

  justify-content:
    space-between;

  align-items:
    center;

  gap:
    15px;

  flex-wrap:
    wrap;

  margin-bottom:
    20px;

}

.status {

  display:
    inline-flex;

  align-items:
    center;

  gap:
    7px;

  padding:
    9px 15px;

  border-radius:
    999px;

  color:
    white;

  font-weight:
    800;

}

/* =========================================================
   CARDS
========================================================= */

.card {

  background:
    white;

  border:
    1px solid
    #e2e8f0;

  border-radius:
    18px;

  padding:
    22px;

  box-shadow:
    0 8px 25px
    rgba(15,23,42,.06);

  transition:
    .25s;

}

.card:hover {

  transform:
    translateY(-3px);

  box-shadow:
    0 15px 35px
    rgba(15,23,42,.1);

}

.dark .card {

  background:
    #111827;

  border-color:
    #1e293b;

  box-shadow:
    none;

}

.card h2 {

  margin:
    0 0 18px;

  font-size:
    19px;

  color:
    #1d4ed8;

}

.dark .card h2 {

  color:
    #60a5fa;

}

/* =========================================================
   KPI
========================================================= */

.kpi-grid {

  display:
    grid;

  grid-template-columns:
    repeat(
      auto-fit,
      minmax(180px,1fr)
    );

  gap:
    18px;

  margin-bottom:
    20px;

}

.kpi {

  position:
    relative;

  overflow:
    hidden;

}

.kpi::after {

  content:
    "";

  position:
    absolute;

  width:
    70px;

  height:
    70px;

  border-radius:
    50%;

  right:
    -25px;

  top:
    -25px;

  background:
    rgba(37,99,235,.08);

}

.kpi-icon {

  font-size:
    28px;

}

.kpi-title {

  color:
    #64748b;

  font-size:
    12px;

  font-weight:
    800;

  margin-top:
    8px;

}

.dark .kpi-title {

  color:
    #94a3b8;

}

.kpi-value {

  font-size:
    29px;

  font-weight:
    900;

  margin-top:
    5px;

}

/* =========================================================
   GRID
========================================================= */

.grid {

  display:
    grid;

  grid-template-columns:
    repeat(
      auto-fit,
      minmax(350px,1fr)
    );

  gap:
    20px;

  margin-bottom:
    20px;

}

/* =========================================================
   INFO
========================================================= */

.info {

  display:
    flex;

  justify-content:
    space-between;

  gap:
    15px;

  padding:
    11px 0;

  border-bottom:
    1px solid
    #f1f5f9;

}

.dark .info {

  border-color:
    #1e293b;

}

.label {

  color:
    #64748b;

}

.dark .label {

  color:
    #94a3b8;

}

.value {

  font-weight:
    700;

  text-align:
    right;

  word-break:
    break-word;

}

/* =========================================================
   PROGRESS
========================================================= */

.progress {

  height:
    20px;

  background:
    #e2e8f0;

  border-radius:
    999px;

  overflow:
    hidden;

  margin:
    14px 0;

}

.dark .progress {

  background:
    #1e293b;

}

.progress-bar {

  height:
    100%;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  color:
    white;

  font-size:
    11px;

  font-weight:
    800;

  transition:
    width .5s;

}

/* =========================================================
   CPU CORES
========================================================= */

.core {

  margin:
    12px 0;

}

.core-header {

  display:
    flex;

  justify-content:
    space-between;

  font-size:
    13px;

  margin-bottom:
    5px;

}

.core-track {

  height:
    9px;

  background:
    #e2e8f0;

  border-radius:
    999px;

  overflow:
    hidden;

}

.dark .core-track {

  background:
    #1e293b;

}

.core-bar {

  height:
    100%;

  width:
    0%;

  border-radius:
    999px;

  background:
    #2563eb;

  transition:
    width .4s;

}

/* =========================================================
   TABLE
========================================================= */

.table-tools {

  display:
    flex;

  justify-content:
    space-between;

  gap:
    10px;

  margin-bottom:
    15px;

  flex-wrap:
    wrap;

}

.search {

  padding:
    11px 14px;

  border:
    1px solid
    #cbd5e1;

  border-radius:
    10px;

  outline:
    none;

  width:
    min(100%,350px);

  background:
    white;

  color:
    #0f172a;

}

.dark .search {

  background:
    #020617;

  border-color:
    #334155;

  color:
    white;

}

.table-wrapper {

  overflow-x:
    auto;

}

table {

  width:
    100%;

  border-collapse:
    collapse;

  font-size:
    13px;

}

th {

  background:
    #eff6ff;

  color:
    #1e3a8a;

}

.dark th {

  background:
    #172554;

  color:
    #bfdbfe;

}

th,
td {

  padding:
    12px;

  border-bottom:
    1px solid
    #e2e8f0;

  text-align:
    left;

}

.dark th,
.dark td {

  border-color:
    #1e293b;

}

tr:hover {

  background:
    #f8fafc;

}

.dark tr:hover {

  background:
    #172033;

}

/* =========================================================
   ENVIRONMENT
========================================================= */

.environment {

  padding:
    25px;

  border-radius:
    15px;

  color:
    white;

  text-align:
    center;

  font-size:
    22px;

  font-weight:
    900;

  margin-bottom:
    15px;

}

/* =========================================================
   CHART
========================================================= */

.chart {

  height:
    180px;

  display:
    flex;

  align-items:
    flex-end;

  gap:
    5px;

  padding:
    15px 5px;

  border-bottom:
    1px solid
    #cbd5e1;

  border-left:
    1px solid
    #cbd5e1;

}

.chart-bar {

  flex:
    1;

  min-width:
    4px;

  background:
    #2563eb;

  border-radius:
    5px 5px 0 0;

  transition:
    height .3s;

  position:
    relative;

}

.chart-bar:hover::after {

  content:
    attr(data-value) "%";

  position:
    absolute;

  bottom:
    100%;

  left:
    50%;

  transform:
    translateX(-50%);

  font-size:
    10px;

  background:
    #0f172a;

  color:
    white;

  padding:
    3px 5px;

  border-radius:
    4px;

}

/* =========================================================
   CONFIG
========================================================= */

.env-grid {

  display:
    grid;

  grid-template-columns:
    repeat(
      auto-fit,
      minmax(200px,1fr)
    );

  gap:
    12px;

}

.env-item {

  padding:
    15px;

  border:
    1px solid
    #e2e8f0;

  border-radius:
    12px;

  background:
    #f8fafc;

}

.dark .env-item {

  background:
    #020617;

  border-color:
    #1e293b;

}

.env-name {

  color:
    #64748b;

  font-size:
    11px;

  font-weight:
    800;

}

.env-value {

  font-weight:
    800;

  margin-top:
    5px;

  word-break:
    break-word;

}

/* =========================================================
   FOOTER
========================================================= */

.footer {

  text-align:
    center;

  padding:
    40px;

  color:
    #64748b;

}

/* =========================================================
   TOAST
========================================================= */

.toast {

  position:
    fixed;

  right:
    25px;

  bottom:
    25px;

  background:
    #0f172a;

  color:
    white;

  padding:
    14px 18px;

  border-radius:
    12px;

  box-shadow:
    0 10px 30px
    rgba(0,0,0,.3);

  opacity:
    0;

  transform:
    translateY(20px);

  pointer-events:
    none;

  transition:
    .3s;

  z-index:
    3000;

}

.toast.show {

  opacity:
    1;

  transform:
    translateY(0);

}

/* =========================================================
   MOBILE
========================================================= */

.mobile-menu {

  display:
    none;

}

@media(max-width:900px) {

  .sidebar {

    transform:
      translateX(-100%);

  }

  .sidebar.open {

    transform:
      translateX(0);

  }

  .main {

    margin-left:
      0;

  }

  .mobile-menu {

    display:
      inline-block;

  }

}

@media(max-width:700px) {

  .container {

    width:
      92%;

  }

  .grid {

    grid-template-columns:
      1fr;

  }

  .header {

    padding:
      25px 18px;

  }

  .header-content {

    flex-direction:
      column;

    align-items:
      flex-start;

  }

  .info {

    flex-direction:
      column;

  }

  .value {

    text-align:
      left;

  }

}

/* =========================================================
   PRINT
========================================================= */

@media print {

  .sidebar,
  .header-actions,
  .status-bar button,
  .table-tools {

    display:
      none !important;

  }

  .main {

    margin:
      0;

  }

  .card {

    box-shadow:
      none;

    break-inside:
      avoid;

  }

}

</style>

</head>

<body>

<!-- =======================================================
     SIDEBAR
======================================================== -->

<aside class="sidebar" id="sidebar">

<div class="logo">

<div class="logo-icon">
🖥️
</div>

<h2>
SO Dashboard
</h2>

<small>
v${escapeHtml(APP_VERSION)}
</small>

</div>

<nav class="menu">

<a href="#resumo">
📊 <span>Resumo</span>
</a>

<a href="#sistema">
💻 <span>Sistema</span>
</a>

<a href="#cpu">
⚙️ <span>Processador</span>
</a>

<a href="#rede">
🌐 <span>Rede</span>
</a>

<a href="#arquivos">
📂 <span>Arquivos</span>
</a>

<a href="#node">
🟢 <span>Node.js</span>
</a>

<a href="#ambiente">
☁️ <span>Ambiente</span>
</a>

<a href="#config">
⚙️ <span>Configuração</span>
</a>

</nav>

</aside>

<!-- =======================================================
     MAIN
======================================================== -->

<div class="main">

<header class="header">

<div class="header-content">

<div>

<h1>
🖥️ ${escapeHtml(APP_NAME)}
</h1>

<p>
Monitoramento do Sistema Operacional,
Hardware, Node.js e Computação em Nuvem
</p>

<p>
Versão ${escapeHtml(APP_VERSION)}
•
${escapeHtml(AUTHOR)}
</p>

</div>

<div class="header-actions">

<button
class="btn mobile-menu"
onclick="toggleSidebar()">

☰ Menu

</button>

<button
class="btn"
onclick="toggleDarkMode()">

🌙 Tema

</button>

<button
class="btn"
onclick="toggleFullscreen()">

⛶ Tela cheia

</button>

<button
class="btn"
onclick="exportJSON()">

📥 Exportar

</button>

</div>

</div>

</header>

<main class="container">

<!-- =======================================================
     STATUS
======================================================== -->

<div class="status-bar">

<div>

<strong>
Saúde do sistema:
</strong>

<span
id="health"
class="status"
style="
background:${data.health.color};
">

${data.health.icon}
${data.health.label}

</span>

</div>

<div>

<button
class="btn btn-blue"
onclick="updateDashboard()">

🔄 Atualizar

</button>

<button
id="autoButton"
class="btn btn-blue"
onclick="toggleAutoRefresh()">

⏸️ Pausar

</button>

</div>

<div
id="lastUpdate">

Atualizado:
${escapeHtml(
  data.time.current
)}

</div>

</div>

<!-- =======================================================
     RESUMO
======================================================== -->

<section id="resumo">

<div class="kpi-grid">

<div class="card kpi">

<div class="kpi-icon">
🧠
</div>

<div class="kpi-title">
USO DE RAM
</div>

<div
class="kpi-value"
id="ramValue">

${data.memory.usagePercent}%

</div>

</div>

<div class="card kpi">

<div class="kpi-icon">
⚙️
</div>

<div class="kpi-title">
USO MÉDIO DA CPU
</div>

<div
class="kpi-value"
id="cpuValue">

${data.cpu.averageUsage}%

</div>

</div>

<div class="card kpi">

<div class="kpi-icon">
⏱️
</div>

<div class="kpi-title">
UPTIME
</div>

<div
class="kpi-value"
id="uptimeValue"
style="font-size:18px">

${formatUptime(
  data.time.uptime
)}

</div>

</div>

<div class="card kpi">

<div class="kpi-icon">
📂
</div>

<div class="kpi-title">
ARQUIVOS
</div>

<div
class="kpi-value"
id="filesValue">

${data.project.files}

</div>

</div>

<div class="card kpi">

<div class="kpi-icon">
🌐
</div>

<div class="kpi-title">
IP PRINCIPAL
</div>

<div
class="kpi-value"
id="ipValue"
style="font-size:18px">

${escapeHtml(
  data.network.mainIP
)}

</div>

</div>

<div class="card kpi">

<div class="kpi-icon">
☁️
</div>

<div class="kpi-title">
AMBIENTE
</div>

<div
class="kpi-value"
id="environmentValue"
style="font-size:19px">

${escapeHtml(
  data.environment.provider
)}

</div>

</div>

</div>

</section>

<!-- =======================================================
     MONITORAMENTO
======================================================== -->

<section>

<div class="grid">

<div class="card">

<h2>
📈 Histórico de CPU
</h2>

<div
class="chart"
id="cpuChart">

</div>

</div>

<div class="card">

<h2>
📈 Histórico de RAM
</h2>

<div
class="chart"
id="ramChart">

</div>

</div>

</div>

</section>

<!-- =======================================================
     SISTEMA
======================================================== -->

<section id="sistema">

<div class="grid">

<div class="card">

<h2>
💻 Sistema Operacional
</h2>

<div class="info">

<span class="label">
Nome da máquina
</span>

<span
class="value"
id="hostname">

${escapeHtml(
  data.system.hostname
)}

</span>

</div>

<div class="info">

<span class="label">
Sistema
</span>

<span class="value">

${escapeHtml(
  data.system.type
)}

</span>

</div>

<div class="info">

<span class="label">
Kernel
</span>

<span class="value">

${escapeHtml(
  data.system.release
)}

</span>

</div>

<div class="info">

<span class="label">
Plataforma
</span>

<span class="value">

${escapeHtml(
  data.system.platform
)}

</span>

</div>

<div class="info">

<span class="label">
Arquitetura
</span>

<span class="value">

${escapeHtml(
  data.system.architecture
)}

</span>

</div>

<div class="info">

<span class="label">
Endianness
</span>

<span class="value">

${escapeHtml(
  data.system.endianness
)}

</span>

</div>

<div class="info">

<span class="label">
Node.js
</span>

<span class="value">

${escapeHtml(
  data.system.nodeVersion
)}

</span>

</div>

</div>

<div class="card">

<h2>
🧠 Memória RAM
</h2>

<div class="info">

<span class="label">
Total
</span>

<span
class="value"
id="ramTotal">

${gb(data.memory.total)}
GB

</span>

</div>

<div class="info">

<span class="label">
Utilizada
</span>

<span
class="value"
id="ramUsed">

${gb(data.memory.used)}
GB

</span>

</div>

<div class="info">

<span class="label">
Livre
</span>

<span
class="value"
id="ramFree">

${gb(data.memory.free)}
GB

</span>

</div>

<div class="progress">

<div
class="progress-bar"
id="ramBar"
style="
width:${data.memory.usagePercent}%;
background:#2563eb;
">

${data.memory.usagePercent}%

</div>

</div>

</div>

</div>

</section>

<!-- =======================================================
     CPU
======================================================== -->

<section id="cpu">

<div class="grid">

<div class="card">

<h2>
⚙️ Processador
</h2>

<div class="info">

<span class="label">
Núcleos
</span>

<span
class="value"
id="cpuCores">

${data.cpu.cores}

</span>

</div>

<div class="info">

<span class="label">
Modelo
</span>

<span class="value">

${escapeHtml(
  data.cpu.model
)}

</span>

</div>

<div class="info">

<span class="label">
Velocidade
</span>

<span class="value">

${data.cpu.speed}
MHz

</span>

</div>

<div class="info">

<span class="label">
Uso médio
</span>

<span
class="value"
id="cpuAverage">

${data.cpu.averageUsage}%

</span>

</div>

<div class="progress">

<div
class="progress-bar"
id="cpuBar"
style="
width:${data.cpu.averageUsage}%;
background:#2563eb;
">

${data.cpu.averageUsage}%

</div>

</div>

</div>

<div class="card">

<h2>
📊 Uso por núcleo
</h2>

<div id="coreList">

${data.cpu.perCore
  .map(
    (usage, index) => `

<div class="core">

<div class="core-header">

<span>
CPU ${index + 1}
</span>

<strong>
${usage}%
</strong>

</div>

<div class="core-track">

<div
class="core-bar"
style="width:${usage}%">

</div>

</div>

</div>

`
  )
  .join("")}

</div>

</div>

<div class="card">

<h2>
📊 Carga do Sistema
</h2>

<div class="info">

<span class="label">
1 minuto
</span>

<span
class="value"
id="load1">

${data.cpu.loadAverage[0].toFixed(2)}

</span>

</div>

<div class="info">

<span class="label">
5 minutos
</span>

<span
class="value"
id="load5">

${data.cpu.loadAverage[1].toFixed(2)}

</span>

</div>

<div class="info">

<span class="label">
15 minutos
</span>

<span
class="value"
id="load15">

${data.cpu.loadAverage[2].toFixed(2)}

</span>

</div>

<p class="label">

No Windows, alguns valores de carga
podem aparecer como 0.

</p>

</div>

</div>

</section>

<!-- =======================================================
     REDE
======================================================== -->

<section id="rede">

<div class="card">

<h2>
🌐 Rede
</h2>

<div class="info">

<span class="label">
IP principal
</span>

<span
class="value"
id="networkIP">

${escapeHtml(
  data.network.mainIP
)}

</span>

</div>

<div class="info">

<span class="label">
Interfaces
</span>

<span
class="value"
id="interfaceCount">

${data.network.interfaces.length}

</span>

</div>

<div class="table-wrapper">

<table>

<thead>

<tr>

<th>
Interface
</th>

<th>
Endereço
</th>

<th>
Família
</th>

<th>
MAC
</th>

<th>
Interna
</th>

</tr>

</thead>

<tbody id="networkTable">

${data.network.interfaces
  .map(
    (network) => `

<tr>

<td>
${escapeHtml(
  network.interface
)}
</td>

<td>
${escapeHtml(
  network.address
)}
</td>

<td>
${escapeHtml(
  network.family
)}
</td>

<td>
${escapeHtml(
  network.mac
)}
</td>

<td>
${network.internal
  ? "Sim"
  : "Não"}

</td>

</tr>

`
  )
  .join("")}

</tbody>

</table>

</div>

</div>

</section>

<!-- =======================================================
     ARQUIVOS
======================================================== -->

<section id="arquivos">

<div class="card">

<h2>
📂 Arquivos do Projeto
</h2>

<div class="table-tools">

<input
class="search"
id="fileSearch"
placeholder="🔎 Pesquisar arquivo..."
oninput="filterFiles()">

<strong>
Total:
<span id="fileCount">
${data.project.files}
</span>
</strong>

</div>

<div class="table-wrapper">

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

<th>
Modificado
</th>

</tr>

</thead>

<tbody id="fileTable">

${data.project.details
  .map(
    (file) => `

<tr>

<td>
${escapeHtml(
  file.name
)}
</td>

<td>
${escapeHtml(
  file.type
)}
</td>

<td>
${escapeHtml(
  file.size
)}
</td>

<td>
${escapeHtml(
  file.modified
)}
</td>

</tr>

`
  )
  .join("")}

</tbody>

</table>

</div>

</div>

</section>

<!-- =======================================================
     NODE
======================================================== -->

<section id="node">

<div class="grid">

<div class="card">

<h2>
🟢 Aplicação Node.js
</h2>

<div class="info">

<span class="label">
PID
</span>

<span class="value">

${data.node.pid}

</span>

</div>

<div class="info">

<span class="label">
Versão
</span>

<span class="value">

${escapeHtml(
  data.node.version
)}

</span>

</div>

<div class="info">

<span class="label">
Memória RSS
</span>

<span
class="value"
id="nodeRss">

${mb(data.node.rss)}
MB

</span>

</div>

<div class="info">

<span class="label">
Heap utilizado
</span>

<span
class="value"
id="nodeHeap">

${mb(
  data.node.heapUsed
)}
MB

</span>

</div>

<div class="info">

<span class="label">
Heap total
</span>

<span class="value">

${mb(
  data.node.heapTotal
)}
MB

</span>

</div>

<div class="info">

<span class="label">
Memória externa
</span>

<span
class="value"
id="nodeExternal">

${mb(
  data.node.external
)}
MB

</span>

</div>

<div class="info">

<span class="label">
Uptime
</span>

<span
class="value"
id="nodeUptime">

${formatUptime(
  data.node.uptime
)}

</span>

</div>

</div>

<div class="card">

<h2>
🕐 Informações de Tempo
</h2>

<div class="info">

<span class="label">
Data/Hora
</span>

<span
class="value"
id="clock">

${escapeHtml(
  data.time.current
)}

</span>

</div>

<div class="info">

<span class="label">
Fuso horário
</span>

<span class="value">

${escapeHtml(
  data.time.timezone
)}

</span>

</div>

<div class="info">

<span class="label">
Uptime do sistema
</span>

<span
class="value"
id="systemUptime">

${formatUptime(
  data.time.uptime
)}

</span>

</div>

<div class="info">

<span class="label">
PID
</span>

<span class="value">

${data.node.pid}

</span>

</div>

</div>

</div>

</section>

<!-- =======================================================
     AMBIENTE
======================================================== -->

<section id="ambiente">

<div class="grid">

<div class="card">

<h2>
☁️ Ambiente de Execução
</h2>

<div
class="environment"
id="environmentBox"
style="
background:${data.environment.color};
">

${escapeHtml(
  data.environment.type
)}

<br>

<small>
${escapeHtml(
  data.environment.provider
)}
</small>

</div>

<div class="info">

<span class="label">
Provedor
</span>

<span class="value">

${escapeHtml(
  data.environment.provider
)}

</span>

</div>

<div class="info">

<span class="label">
NODE_ENV
</span>

<span class="value">

${escapeHtml(
  data.config.nodeEnv
)}

</span>

</div>

</div>

<div class="card">

<h2>
📌 Informações do Projeto
</h2>

<div class="info">

<span class="label">
Nome
</span>

<span class="value">

${escapeHtml(
  data.config.appName
)}

</span>

</div>

<div class="info">

<span class="label">
Versão
</span>

<span class="value">

${escapeHtml(
  data.config.version
)}

</span>

</div>

<div class="info">

<span class="label">
Autor
</span>

<span class="value">

${escapeHtml(
  data.config.author
)}

</span>

</div>

<div class="info">

<span class="label">
Diretório
</span>

<span class="value">

${escapeHtml(
  data.project.directory
)}

</span>

</div>

</div>

</div>

</section>

<!-- =======================================================
     CONFIGURAÇÃO
======================================================== -->

<section id="config">

<div class="card">

<h2>
⚙️ Configuração da Aplicação
</h2>

<div class="env-grid">

<div class="env-item">

<div class="env-name">
APP_NAME
</div>

<div class="env-value">
${escapeHtml(
  data.config.appName
)}
</div>

</div>

<div class="env-item">

<div class="env-name">
APP_VERSION
</div>

<div class="env-value">
${escapeHtml(
  data.config.version
)}
</div>

</div>

<div class="env-item">

<div class="env-name">
NODE_ENV
</div>

<div class="env-value">
${escapeHtml(
  data.config.nodeEnv
)}
</div>

</div>

<div class="env-item">

<div class="env-name">
PORT
</div>

<div class="env-value">
${data.config.port}
</div>

</div>

<div class="env-item">

<div class="env-name">
AUTHOR
</div>

<div class="env-value">
${escapeHtml(
  data.config.author
)}
</div>

</div>

<div class="env-item">

<div class="env-name">
CLOUD_PROVIDER
</div>

<div class="env-value">
${escapeHtml(
  data.config.cloudProvider
)}
</div>

</div>

<div class="env-item">

<div class="env-name">
AUTO_REFRESH
</div>

<div class="env-value">
${data.config.autoRefresh}s
</div>

</div>

</div>

</div>

</section>

</main>

<footer class="footer">

<strong>
${escapeHtml(APP_NAME)}
</strong>

<br><br>

Node.js + Express
•
Sistema Operacional
•
Hardware
•
Cloud Computing

<br><br>

Versão ${escapeHtml(APP_VERSION)}
•
${escapeHtml(AUTHOR)}

</footer>

</div>

<div
class="toast"
id="toast">

Mensagem

</div>

<script>

/* =========================================================
   VARIÁVEIS
========================================================= */

let autoRefresh = true;

let refreshTimer;

let currentData = null;

const cpuHistory = [];

const ramHistory = [];

const MAX_HISTORY = 20;

/* =========================================================
   FORMATAÇÃO
========================================================= */

function formatUptime(seconds) {

  const days =
    Math.floor(
      seconds / 86400
    );

  const hours =
    Math.floor(
      (seconds % 86400) /
      3600
    );

  const minutes =
    Math.floor(
      (seconds % 3600) /
      60
    );

  const secs =
    Math.floor(
      seconds % 60
    );

  return (
    days +
    "d " +
    hours +
    "h " +
    minutes +
    "m " +
    secs +
    "s"
  );
}

/* =========================================================
   CORES
========================================================= */

function getColor(value) {

  if (value >= 90) {
    return "#dc2626";
  }

  if (value >= 75) {
    return "#f59e0b";
  }

  return "#2563eb";
}

/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

  const toast =
    document.getElementById(
      "toast"
    );

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );

  setTimeout(
    function() {

      toast.classList.remove(
        "show"
      );

    },
    2500
  );
}

/* =========================================================
   ATUALIZAR
========================================================= */

async function updateDashboard() {

  try {

    const response =
      await fetch(
        "/api/status?time=" +
        Date.now()
      );

    if (!response.ok) {

      throw new Error(
        "Erro na API"
      );

    }

    const data =
      await response.json();

    currentData =
      data;

    /* =====================================================
       HISTÓRICO
    ===================================================== */

    cpuHistory.push(
      data.cpu.averageUsage
    );

    ramHistory.push(
      data.memory.usagePercent
    );

    if (
      cpuHistory.length >
      MAX_HISTORY
    ) {

      cpuHistory.shift();

    }

    if (
      ramHistory.length >
      MAX_HISTORY
    ) {

      ramHistory.shift();

    }

    renderCharts();

    /* =====================================================
       RAM
    ===================================================== */

    document.getElementById(
      "ramValue"
    ).textContent =
      data.memory.usagePercent +
      "%";

    document.getElementById(
      "ramUsed"
    ).textContent =
      (
        data.memory.used /
        1024 /
        1024 /
        1024
      ).toFixed(2) +
      " GB";

    document.getElementById(
      "ramFree"
    ).textContent =
      (
        data.memory.free /
        1024 /
        1024 /
        1024
      ).toFixed(2) +
      " GB";

    const ramBar =
      document.getElementById(
        "ramBar"
      );

    ramBar.style.width =
      data.memory.usagePercent +
      "%";

    ramBar.style.background =
      getColor(
        data.memory.usagePercent
      );

    ramBar.textContent =
      data.memory.usagePercent +
      "%";

    /* =====================================================
       CPU
    ===================================================== */

    document.getElementById(
      "cpuValue"
    ).textContent =
      data.cpu.averageUsage +
      "%";

    document.getElementById(
      "cpuAverage"
    ).textContent =
      data.cpu.averageUsage +
      "%";

    const cpuBar =
      document.getElementById(
        "cpuBar"
      );

    cpuBar.style.width =
      data.cpu.averageUsage +
      "%";

    cpuBar.style.background =
      getColor(
        data.cpu.averageUsage
      );

    cpuBar.textContent =
      data.cpu.averageUsage +
      "%";

    /* =====================================================
       CPU POR NÚCLEO
    ===================================================== */

    const coreList =
      document.getElementById(
        "coreList"
      );

    coreList.innerHTML = "";

    data.cpu.perCore.forEach(
      function(usage, index) {

        const div =
          document.createElement(
            "div"
          );

        div.className =
          "core";

        div.innerHTML =
          '<div class="core-header">' +
          '<span>CPU ' +
          (index + 1) +
          '</span>' +
          '<strong>' +
          usage +
          '%</strong>' +
          '</div>' +
          '<div class="core-track">' +
          '<div class="core-bar" ' +
          'style="width:' +
          usage +
          '%;background:' +
          getColor(usage) +
          '"></div>' +
          '</div>';

        coreList.appendChild(
          div
        );

      }
    );

    /* =====================================================
       UPTIME
    ===================================================== */

    document.getElementById(
      "uptimeValue"
    ).textContent =
      formatUptime(
        data.time.uptime
      );

    document.getElementById(
      "systemUptime"
    ).textContent =
      formatUptime(
        data.time.uptime
      );

    document.getElementById(
      "nodeUptime"
    ).textContent =
      formatUptime(
        data.node.uptime
      );

    /* =====================================================
       ARQUIVOS
    ===================================================== */

    document.getElementById(
      "filesValue"
    ).textContent =
      data.project.files;

    document.getElementById(
      "fileCount"
    ).textContent =
      data.project.files;

    renderFiles(
      data.project.details
    );

    /* =====================================================
       IP
    ===================================================== */

    document.getElementById(
      "ipValue"
    ).textContent =
      data.network.mainIP;

    document.getElementById(
      "networkIP"
    ).textContent =
      data.network.mainIP;

    document.getElementById(
      "interfaceCount"
    ).textContent =
      data.network.interfaces.length;

    renderNetwork(
      data.network.interfaces
    );

    /* =====================================================
       LOAD
    ===================================================== */

    document.getElementById(
      "load1"
    ).textContent =
      data.cpu.loadAverage[0]
        .toFixed(2);

    document.getElementById(
      "load5"
    ).textContent =
      data.cpu.loadAverage[1]
        .toFixed(2);

    document.getElementById(
      "load15"
    ).textContent =
      data.cpu.loadAverage[2]
        .toFixed(2);

    /* =====================================================
       NODE
    ===================================================== */

    document.getElementById(
      "nodeRss"
    ).textContent =
      (
        data.node.rss /
        1024 /
        1024
      ).toFixed(2) +
      " MB";

    document.getElementById(
      "nodeHeap"
    ).textContent =
      (
        data.node.heapUsed /
        1024 /
        1024
      ).toFixed(2) +
      " MB";

    document.getElementById(
      "nodeExternal"
    ).textContent =
      (
        data.node.external /
        1024 /
        1024
      ).toFixed(2) +
      " MB";

    /* =====================================================
       AMBIENTE
    ===================================================== */

    document.getElementById(
      "environmentValue"
    ).textContent =
      data.environment.provider;

    const environmentBox =
      document.getElementById(
        "environmentBox"
      );

    environmentBox.style.background =
      data.environment.color;

    environmentBox.innerHTML =
      data.environment.type +
      "<br><small>" +
      data.environment.provider +
      "</small>";

    /* =====================================================
       STATUS
    ===================================================== */

    const health =
      document.getElementById(
        "health"
      );

    health.textContent =
      data.health.icon +
      " " +
      data.health.label;

    health.style.background =
      data.health.color;

    /* =====================================================
       RELÓGIO
    ===================================================== */

    document.getElementById(
      "clock"
    ).textContent =
      data.time.current;

    /* =====================================================
       ÚLTIMA ATUALIZAÇÃO
    ===================================================== */

    document.getElementById(
      "lastUpdate"
    ).textContent =
      "Atualizado: " +
      new Date()
        .toLocaleString(
          "pt-BR"
        );

  } catch (error) {

    console.error(
      error
    );

    showToast(
      "⚠️ Não foi possível atualizar os dados."
    );

  }

}

/* =========================================================
   GRÁFICOS
========================================================= */

function renderCharts() {

  renderChart(
    "cpuChart",
    cpuHistory
  );

  renderChart(
    "ramChart",
    ramHistory
  );

}

function renderChart(
  elementId,
  values
) {

  const chart =
    document.getElementById(
      elementId
    );

  chart.innerHTML = "";

  values.forEach(
    function(value) {

      const bar =
        document.createElement(
          "div"
        );

      bar.className =
        "chart-bar";

      bar.style.height =
        Math.max(
          3,
          value
        ) +
        "%";

      bar.dataset.value =
        value;

      chart.appendChild(
        bar
      );

    }
  );

}

/* =========================================================
   ARQUIVOS
========================================================= */

let allFiles = ${JSON.stringify(
  data.project.details
)};

function renderFiles(
  files
) {

  allFiles =
    files;

  const table =
    document.getElementById(
      "fileTable"
    );

  table.innerHTML = "";

  files.forEach(
    function(file) {

      const row =
        document.createElement(
          "tr"
        );

      row.innerHTML =
        "<td>" +
        escapeClient(
          file.name
        ) +
        "</td>" +
        "<td>" +
        escapeClient(
          file.type
        ) +
        "</td>" +
        "<td>" +
        escapeClient(
          file.size
        ) +
        "</td>" +
        "<td>" +
        escapeClient(
          file.modified
        ) +
        "</td>";

      table.appendChild(
        row
      );

    }
  );

}

function escapeClient(value) {

  const div =
    document.createElement(
      "div"
    );

  div.textContent =
    value;

  return div.innerHTML;

}

function filterFiles() {

  const search =
    document.getElementById(
      "fileSearch"
    ).value
      .toLowerCase();

  const filtered =
    allFiles.filter(
      function(file) {

        return (
          file.name
            .toLowerCase()
            .includes(search)
        );

      }
    );

  renderFiles(
    filtered
  );

}

/* =========================================================
   REDE
========================================================= */

function renderNetwork(
  interfaces
) {

  const table =
    document.getElementById(
      "networkTable"
    );

  table.innerHTML = "";

  interfaces.forEach(
    function(network) {

      const row =
        document.createElement(
          "tr"
        );

      row.innerHTML =
        "<td>" +
        escapeClient(
          network.interface
        ) +
        "</td>" +

        "<td>" +
        escapeClient(
          network.address
        ) +
        "</td>" +

        "<td>" +
        escapeClient(
          network.family
        ) +
        "</td>" +

        "<td>" +
        escapeClient(
          network.mac
        ) +
        "</td>" +

        "<td>" +
        (
          network.internal
            ? "Sim"
            : "Não"
        ) +
        "</td>";

      table.appendChild(
        row
      );

    }
  );

}

/* =========================================================
   AUTO REFRESH
========================================================= */

function startAutoRefresh() {

  clearInterval(
    refreshTimer
  );

  refreshTimer =
    setInterval(
      updateDashboard,
      ${AUTO_REFRESH * 1000}
    );

}

function toggleAutoRefresh() {

  autoRefresh =
    !autoRefresh;

  const button =
    document.getElementById(
      "autoButton"
    );

  if (autoRefresh) {

    startAutoRefresh();

    button.textContent =
      "⏸️ Pausar";

    showToast(
      "🔄 Atualização automática ativada."
    );

  } else {

    clearInterval(
      refreshTimer
    );

    button.textContent =
      "▶️ Continuar";

    showToast(
      "⏸️ Atualização automática pausada."
    );

  }

}

/* =========================================================
   DARK MODE
========================================================= */

function toggleDarkMode() {

  document.body.classList.toggle(
    "dark"
  );

  const dark =
    document.body.classList.contains(
      "dark"
    );

  localStorage.setItem(
    "darkMode",
    dark
      ? "true"
      : "false"
  );

}

if (
  localStorage.getItem(
    "darkMode"
  ) === "true"
) {

  document.body.classList.add(
    "dark"
  );

}

/* =========================================================
   SIDEBAR MOBILE
========================================================= */

function toggleSidebar() {

  document
    .getElementById(
      "sidebar"
    )
    .classList.toggle(
      "open"
    );

}

/* =========================================================
   TELA CHEIA
========================================================= */

function toggleFullscreen() {

  if (
    !document.fullscreenElement
  ) {

    document.documentElement
      .requestFullscreen()
      .catch(
        function() {}
      );

    showToast(
      "⛶ Modo tela cheia ativado."
    );

  } else {

    document.exitFullscreen();

    showToast(
      "Modo tela cheia encerrado."
    );

  }

}

/* =========================================================
   EXPORTAR JSON
========================================================= */

function exportJSON() {

  if (!currentData) {

    showToast(
      "⚠️ Aguarde os dados serem carregados."
    );

    return;

  }

  const json =
    JSON.stringify(
      currentData,
      null,
      2
    );

  const blob =
    new Blob(
      [json],
      {
        type:
          "application/json"
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement(
      "a"
    );

  link.href =
    url;

  link.download =
    "so-dashboard-" +
    Date.now() +
    ".json";

  link.click();

  URL.revokeObjectURL(
    url
  );

  showToast(
    "📥 Dados exportados com sucesso."
  );

}

/* =========================================================
   RELÓGIO LOCAL
========================================================= */

function updateClock() {

  const clock =
    document.getElementById(
      "clock"
    );

  if (clock) {

    clock.textContent =
      new Date()
        .toLocaleString(
          "pt-BR"
        );

  }

}

/* =========================================================
   INICIALIZAÇÃO
========================================================= */

currentData =
  ${JSON.stringify(data)};

cpuHistory.push(
  currentData.cpu.averageUsage
);

ramHistory.push(
  currentData.memory.usagePercent
);

renderCharts();

startAutoRefresh();

setInterval(
  updateClock,
  1000
);

</script>

</body>

</html>

  `);

});

/* =========================================================
   INICIALIZAÇÃO
========================================================= */

app.listen(
  PORT,
  () => {

    console.log(
      "=========================================="
    );

    console.log(
      "🖥️ SO DASHBOARD"
    );

    console.log(
      "=========================================="
    );

    console.log(
      "Aplicação: " +
      APP_NAME
    );

    console.log(
      "Versão: " +
      APP_VERSION
    );

    console.log(
      "Servidor: http://localhost:" +
      PORT
    );

    console.log(
      "Ambiente: " +
      getEnvironment().provider
    );

    console.log(
      "NODE_ENV: " +
      NODE_ENV
    );

    console.log(
      "Atualização: " +
      AUTO_REFRESH +
      " segundos"
    );

    console.log(
      "=========================================="
    );

  }
);