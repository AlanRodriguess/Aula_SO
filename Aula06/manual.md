# Manual — Cloud SO App

## 1. Objetivo

Desenvolver uma aplicação web com Node.js e Express.js para exibir informações do sistema operacional e comparar o ambiente local com um ambiente em nuvem.

## 2. Ferramentas utilizadas

- Node.js
- Express.js
- Git
- GitHub
- Render
- Visual Studio Code

## 3. Criação do projeto

O projeto foi criado dentro do repositório da disciplina:

```text
Aula_SO/
└── Aula06/
    └── cloud-so-app/
        ├── public/
        │   └── style.css
        ├── server.js
        ├── package.json
        ├── package-lock.json
        └── MANUAL.md
```

Inicialização do projeto:

```bash
npm init -y
```

Instalação do Express:

```bash
npm install express
```

## 4. Desenvolvimento

A aplicação utiliza Node.js, Express.js e o módulo `os` para obter informações do sistema operacional.

São apresentadas:

- Hostname;
- Plataforma;
- Arquitetura;
- Quantidade de CPUs;
- Memória total;
- Memória livre;
- Tempo de atividade.

O servidor utiliza a porta `3000` quando executado localmente.

## 5. Teste local

Para iniciar a aplicação:

```bash
npm start
```

A aplicação pode ser acessada em:

```text
http://localhost:3000
```

### Dados do ambiente local

| Informação | Resultado |
|---|---|
| Hostname | `DESKTOP-0MUAEIV` |
| Plataforma | `win32` |
| Arquitetura | `[x64]` |
| CPUs | `[12]` |
| Memória Total | `[31.90 GB]` |
| Memória Livre | `[20.49 GB]` |
| Tempo de Atividade | `[0h 58min]` |

## 6. Git e GitHub

O projeto foi enviado para o repositório `Aula_SO`.

Os principais comandos utilizados foram:

```bash
git add Aula06/cloud-so-app
git commit -m "Adiciona Cloud SO App"
git push
```

## 7. Publicação no Render

A aplicação foi publicada como um **Web Service** no Render.

| Configuração | Valor |
|---|---|
| Repositório | `Aula_SO` |
| Branch | `main` |
| Root Directory | `Aula06/cloud-so-app` |
| Build Command | `npm install` |
| Start Command | `npm start` |

Aplicação publicada:

https://cloud-so-app-ytwx.onrender.com

## 8. Resultado no Render

Durante o teste, foram obtidos os seguintes dados:

| Informação | Render |
|---|---|
| Hostname | `srv-daosc7ek1f9s738-iv8tg-hibernate-5648cbdf58-fjq4s` |
| Plataforma | `linux` |
| Arquitetura | `x64` |
| CPUs | `8` |
| Memória Total | `30.65 GB` |
| Memória Livre | `6.84 GB` |
| Tempo de Atividade | `3443h 39min` |

## 9. Comparação

Os valores apresentados localmente e no Render são diferentes porque a aplicação está sendo executada em sistemas e ambientes diferentes.

Localmente, o Node.js acessa os recursos do computador utilizado.

No Render, o Node.js acessa os recursos disponibilizados pelo ambiente de nuvem.

## 10. Relação com Sistemas Operacionais

A aplicação permite observar conceitos estudados na disciplina:

- **Processos:** o Node.js executa a aplicação como um processo.
- **Memória:** `os.totalmem()` e `os.freemem()` mostram informações de memória.
- **CPU:** `os.cpus()` identifica os processadores disponíveis.
- **Sistema operacional:** `os.platform()` identifica a plataforma utilizada.
- **Virtualização:** o serviço de nuvem fornece um ambiente isolado para execução.
- **Computação em nuvem:** a aplicação fica disponível através de um servidor remoto.

## 11. Conclusão

A atividade demonstrou, na prática, como uma aplicação pode obter informações do sistema operacional em diferentes ambientes.

A execução local e a publicação no Render permitiram comparar os recursos disponíveis e compreender a relação entre aplicações, sistemas operacionais, processos, memória, CPU e computação em nuvem.
