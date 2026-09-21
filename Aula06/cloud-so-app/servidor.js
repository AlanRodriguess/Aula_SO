const express = require("express");
const os = require("node:os");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    const systemInfo = {
        hostname: os.hostname(),
        platform: os.platform(),
        architecture: os.arch(),
        cpus: os.cpus().length,
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        uptime: os.uptime()
    };

    const totalMemoryGB = (systemInfo.totalMemory / (1024 ** 3)).toFixed(2);
    const freeMemoryGB = (systemInfo.freeMemory / (1024 ** 3)).toFixed(2);

    const uptimeHours = Math.floor(systemInfo.uptime / 3600);
    const uptimeMinutes = Math.floor((systemInfo.uptime % 3600) / 60);

    res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cloud SO</title>
            <link rel="stylesheet" href="/style.css">
        </head>

        <body>

            <div class="container">

                <h1>Cloud SO</h1>

                <p class="subtitle">
                    Informações do Sistema Operacional
                </p>

                <div class="cards">

                    <div class="card">
                        <h2>Hostname</h2>
                        <p>${systemInfo.hostname}</p>
                    </div>

                    <div class="card">
                        <h2>Plataforma</h2>
                        <p>${systemInfo.platform}</p>
                    </div>

                    <div class="card">
                        <h2>Arquitetura</h2>
                        <p>${systemInfo.architecture}</p>
                    </div>

                    <div class="card">
                        <h2>CPUs</h2>
                        <p>${systemInfo.cpus}</p>
                    </div>

                    <div class="card">
                        <h2>Memória Total</h2>
                        <p>${totalMemoryGB} GB</p>
                    </div>

                    <div class="card">
                        <h2>Memória Livre</h2>
                        <p>${freeMemoryGB} GB</p>
                    </div>

                    <div class="card">
                        <h2>Tempo de Atividade</h2>
                        <p>${uptimeHours}h ${uptimeMinutes}min</p>
                    </div>

                </div>

            </div>

        </body>
        </html>
    `);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});