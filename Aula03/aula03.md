# Aula 03 — Conceitos, Funções e Tipos de Sistemas Operacionais

**Professor:** Prof. Me. Deivison S. Takatu
**Disciplina:** Sistemas Operacionais
**Instituição:** FATEC

---

## 1. Introdução

Os Sistemas Operacionais possuem diferentes tipos, desenvolvidos de acordo com as necessidades dos equipamentos e aplicações em que são utilizados.

Nesta aula foram apresentados diversos tipos de Sistemas Operacionais, suas principais características, aplicações e requisitos de projeto.

Também foram abordados conceitos relacionados ao **Git**, controle de versão, integração entre IDE e GitHub e boas práticas de versionamento.

---

# 2. Tipos de Sistemas Operacionais

Os Sistemas Operacionais podem ser classificados de acordo com o tipo de equipamento, quantidade de usuários, capacidade de processamento, requisitos de segurança, tempo de resposta e finalidade do sistema.

Entre os tipos apresentados estão:

* Sistemas de grande porte (mainframes);
* Sistemas operacionais de servidor;
* Sistemas de multiprocessadores;
* Sistemas de computadores pessoais;
* Sistemas operacionais portáteis;
* Sistemas embarcados;
* Sistemas de nós sensores;
* Sistemas de tempo real;
* Sistemas de cartões inteligentes.

---

# 3. Sistemas de Grande Porte — Mainframes

Os **mainframes** são computadores projetados para oferecer alta capacidade de processamento, entrada e saída de dados e processamento de grandes quantidades de transações.

São utilizados principalmente em ambientes que exigem:

* Alta confiabilidade;
* Alta disponibilidade;
* Grande capacidade de processamento;
* Segurança;
* Integridade dos dados;
* Processamento de grandes volumes de transações.

## 3.1 Características

Os mainframes podem trabalhar com:

* Processamento em lote;
* Processamento de transações;
* Muitos usuários simultâneos;
* Grande quantidade de operações de entrada e saída.

Um indicador utilizado para sistemas que processam transações é o **TPS (Transactions Per Second)**, que representa a quantidade de transações processadas por segundo.

## 3.2 Exemplos de Sistemas Operacionais

Alguns exemplos relacionados a ambientes de mainframe são:

* OS/360;
* OS/390;
* Linux para ambientes de mainframe;
* Variantes UNIX.

## 3.3 Aplicações

Mainframes continuam sendo utilizados em sistemas que exigem alta capacidade e disponibilidade, como:

* Sistemas bancários;
* Grandes varejistas;
* E-commerce;
* Servidores de grande escala;
* Processamento massivo de transações.

---

# 4. Sistemas Operacionais de Servidor

Os Sistemas Operacionais de servidor são desenvolvidos para atender **múltiplos usuários e serviços através de uma rede**.

Eles podem fornecer serviços como:

* Servidores web;
* Compartilhamento de arquivos;
* Bancos de dados;
* Autenticação;
* Serviços de rede;
* Hospedagem de aplicações.

Os principais objetivos são:

* Estabilidade;
* Escalabilidade;
* Segurança;
* Disponibilidade;
* Compartilhamento de recursos.

## 4.1 Linux

O Linux possui ampla utilização em servidores devido à sua flexibilidade e ao grande ecossistema de ferramentas e serviços disponíveis.

Pode ser utilizado em:

* Servidores web;
* Bancos de dados;
* Serviços de rede;
* Computação em nuvem;
* Infraestrutura de empresas.

## 4.2 Windows Server

O **Windows Server** é utilizado principalmente em ambientes corporativos e possui integração com diversas tecnologias da Microsoft.

Um dos recursos importantes é o **Active Directory**, utilizado para gerenciamento de usuários, computadores e recursos de uma rede.

---

# 5. Sistemas de Multiprocessadores

Sistemas de multiprocessadores possuem múltiplas CPUs ou processadores com vários núcleos capazes de executar tarefas em paralelo.

Para aproveitar corretamente esse paralelismo, o Sistema Operacional precisa possuir mecanismos avançados de:

* Escalonamento;
* Sincronização;
* Comunicação entre núcleos;
* Gerenciamento de memória;
* Controle de concorrência.

---

## 5.1 Escalonamento

O Sistema Operacional precisa distribuir as tarefas entre os diferentes núcleos disponíveis.

O objetivo é equilibrar a carga e evitar que alguns núcleos fiquem sobrecarregados enquanto outros permanecem ociosos.

---

## 5.2 Sincronização

Quando vários processos ou threads acessam recursos compartilhados simultaneamente, podem ocorrer problemas de concorrência.

Para evitar esses problemas podem ser utilizados mecanismos como:

* Locks;
* Semáforos;
* Algoritmos lock-free.

Esses mecanismos ajudam a evitar condições de corrida (**race conditions**).

---

## 5.3 Coerência de Cache

Em sistemas com múltiplos núcleos, diferentes processadores podem possuir caches próprios.

O Sistema Operacional e o hardware precisam garantir que os dados utilizados pelos diferentes núcleos permaneçam consistentes.

Esse processo está relacionado à **coerência de cache**.

---

## 5.4 Aplicações

Sistemas multiprocessadores são comuns em:

* Servidores de alto desempenho;
* Sistemas científicos;
* Computação científica;
* Data centers;
* Aplicações que exigem alto poder computacional.

---

# 6. Sistemas de Computadores Pessoais

Os Sistemas Operacionais para computadores pessoais são normalmente orientados para um usuário, oferecendo uma interface gráfica e ampla compatibilidade com aplicações.

Entre suas características estão:

* Interface gráfica;
* Suporte à multiprogramação;
* Compatibilidade com diversos aplicativos;
* Suporte multimídia;
* Facilidade de utilização.

## 6.1 Windows

O Windows possui ampla compatibilidade com aplicações de produtividade, entretenimento e jogos.

É utilizado tanto em ambientes domésticos quanto profissionais.

## 6.2 macOS

O macOS é desenvolvido para computadores Apple e possui forte integração entre hardware e software.

Seu projeto possui grande foco na experiência do usuário e integração com o ecossistema da Apple.

## 6.3 Linux

O Linux é utilizado por usuários que desejam maior personalização do sistema e também possui ampla utilização em desenvolvimento e ambientes técnicos.

Uma de suas características é a possibilidade de utilizar diferentes distribuições e ambientes de desktop.

---

# 7. Sistemas Operacionais Portáteis

Os Sistemas Operacionais portáteis são desenvolvidos para dispositivos como smartphones e tablets.

Eles precisam lidar com recursos específicos desses dispositivos, principalmente:

* Bateria;
* Sensores;
* Câmeras;
* GPS;
* Tela sensível ao toque;
* Conectividade sem fio.

## 7.1 Gerenciamento de Energia

Como dispositivos móveis dependem de baterias, o Sistema Operacional precisa realizar um gerenciamento agressivo de energia para aumentar a autonomia.

---

## 7.2 Sensores

Os Sistemas Operacionais móveis disponibilizam APIs para que os aplicativos possam utilizar recursos como:

* GPS;
* Acelerômetro;
* Câmera;
* Giroscópio;
* Microfone;
* Outros sensores.

---

## 7.3 Segurança

Os dispositivos móveis possuem mecanismos de segurança baseados em permissões e isolamento de aplicativos.

Entre os conceitos relacionados estão:

* Permissões;
* Sandboxing;
* Distribuição de aplicativos por lojas oficiais;
* Isolamento entre aplicações.

## 7.4 Exemplos

Os principais exemplos apresentados são:

* Android;
* iOS.

---

# 8. Sistemas Embarcados

Os **Sistemas Embarcados** são utilizados em dispositivos dedicados a funções específicas.

Normalmente possuem recursos limitados e são desenvolvidos para executar determinadas tarefas de maneira eficiente.

O software pode ser armazenado em:

* ROM;
* Memória Flash;
* Outros tipos de memória não volátil.

Em muitos casos, o usuário final não instala ou modifica diretamente o software.

---

## 8.1 Aplicações Domésticas

Sistemas embarcados podem ser encontrados em:

* Micro-ondas;
* Smart TVs;
* Eletrodomésticos;
* Sistemas de controle doméstico.

Esses dispositivos normalmente precisam oferecer resposta rápida e uma interface simples.

---

## 8.2 Sistemas Automotivos

Também são utilizados em veículos para controlar diferentes funcionalidades.

Exemplos:

* Controle do motor;
* Sistemas de entretenimento;
* Infotainment;
* Sistemas de segurança.

Em aplicações críticas, requisitos de segurança e confiabilidade são especialmente importantes.

---

## 8.3 Sistemas Embarcados Sofisticados

Alguns sistemas embarcados possuem maior capacidade computacional e precisam de maior flexibilidade.

Exemplos de Sistemas Operacionais utilizados nesses ambientes incluem:

* Embedded Linux;
* QNX;
* VxWorks.

---

# 9. Sistemas de Nós Sensores

Os **sistemas de nós sensores** são utilizados em dispositivos pequenos que geralmente possuem:

* Pouca memória;
* Baixo poder computacional;
* Bateria limitada;
* Comunicação sem fio.

Esses sistemas normalmente são orientados a eventos e precisam priorizar o baixo consumo de energia.

## 9.1 Aplicações

Podem ser utilizados em:

* Monitoramento ambiental;
* Agricultura de precisão;
* Sistemas de vigilância;
* Monitoramento de equipamentos;
* Aplicações militares.

## 9.2 Exemplos

Alguns exemplos de Sistemas Operacionais desenvolvidos para esse tipo de ambiente são:

* TinyOS;
* Contiki.

Esses sistemas são projetados para trabalhar com recursos limitados e priorizar eficiência energética.

---

# 10. Sistemas de Tempo Real

Os **Sistemas Operacionais de Tempo Real** são projetados para atender requisitos relacionados ao tempo de execução das tarefas.

Nesse tipo de sistema, não basta produzir um resultado correto: em determinadas aplicações, o resultado também precisa ser produzido dentro de um prazo específico.

Existem dois tipos principais apresentados na aula:

---

## 10.1 Hard Real-Time

Em sistemas **Hard Real-Time**, perder um prazo pode causar consequências extremamente graves ou representar uma falha do sistema.

Exemplos:

* Controle de voo;
* Sistemas de segurança;
* Sistemas críticos de controle;
* Equipamentos em que atrasos podem causar acidentes.

Nesse contexto, cumprir os prazos é um requisito fundamental.

---

## 10.2 Soft Real-Time

Em sistemas **Soft Real-Time**, atrasos podem ocorrer sem necessariamente causar uma falha crítica.

Entretanto, o desempenho e a qualidade da aplicação podem ser prejudicados.

Exemplos:

* Streaming de mídia;
* Aplicações multimídia;
* Sistemas interativos.

---

# 11. Sistemas de Cartões Inteligentes

Os Sistemas Operacionais para **cartões inteligentes (Smart Cards)** são desenvolvidos para dispositivos com recursos extremamente limitados.

Eles precisam lidar principalmente com questões relacionadas a:

* Memória limitada;
* Processamento limitado;
* Segurança;
* Criptografia;
* Autenticação;
* Proteção contra ataques físicos.

## 11.1 Gerenciamento de Memória

Como os cartões inteligentes possuem poucos recursos, o gerenciamento da memória precisa ser bastante eficiente.

---

## 11.2 Segurança

A segurança é um requisito fundamental.

Os sistemas precisam oferecer mecanismos para:

* Criptografia;
* Autenticação;
* Proteção de dados;
* Resistência a ataques físicos.

---

## 11.3 Isolamento de Aplicações

A execução de diferentes aplicações pode ser controlada através do isolamento de **applets**, reduzindo o risco de que uma aplicação interfira indevidamente em outra.

---

# 12. Comparação entre os Tipos de Sistemas Operacionais

| Tipo                   | Principal característica                    | Exemplos/Aplicações                |
| ---------------------- | ------------------------------------------- | ---------------------------------- |
| **Mainframe**          | Alto volume de processamento e transações   | Bancos, grandes empresas           |
| **Servidor**           | Serviços para múltiplos usuários            | Web, arquivos, bancos de dados     |
| **Multiprocessador**   | Processamento paralelo                      | Servidores e computação científica |
| **Computador pessoal** | Usabilidade e compatibilidade               | Windows, macOS, Linux              |
| **Portátil**           | Mobilidade e gerenciamento de energia       | Android, iOS                       |
| **Embarcado**          | Função dedicada e recursos limitados        | Veículos, eletrodomésticos         |
| **Nós sensores**       | Baixo consumo e comunicação sem fio         | Agricultura, monitoramento         |
| **Tempo real**         | Cumprimento de requisitos temporais         | Controle de voo, streaming         |
| **Cartão inteligente** | Segurança e recursos extremamente limitados | Autenticação e sistemas seguros    |

---

# 13. Introdução ao Git

Além dos tipos de Sistemas Operacionais, a aula apresentou o **Git**, uma ferramenta fundamental para controle de versão de arquivos.

O Git é um **sistema de controle de versão distribuído** utilizado para registrar alterações em projetos.

Ele pode ser utilizado através da linha de comando e integrado a diferentes IDEs.

---

## 13.1 O que o Git pode fazer?

O Git permite:

* Registrar versões de um projeto;
* Acompanhar alterações;
* Recuperar versões anteriores;
* Trabalhar com diferentes branches;
* Sincronizar projetos com repositórios remotos;
* Enviar código para plataformas como GitHub;
* Baixar projetos existentes.

O Git é especialmente importante no desenvolvimento de software porque permite acompanhar a evolução de um projeto.

---

# 14. Git e GitHub

É importante diferenciar **Git** de **GitHub**.

### Git

É a ferramenta de controle de versão instalada localmente no computador.

### GitHub

É uma plataforma que permite hospedar repositórios Git remotamente e facilitar a colaboração entre desenvolvedores.

Uma utilização comum é:

```text
Computador
    ↓
Git
    ↓
Commit
    ↓
Push
    ↓
GitHub
```

Para obter alterações de um repositório remoto:

```text
GitHub
    ↓
Pull
    ↓
Git
    ↓
Computador
```

---

# 15. Instalação do Git

Para instalar o Git, deve-se acessar a página oficial de download:

https://git-scm.com/downloads

Após acessar a página:

1. Escolher a versão correspondente ao Sistema Operacional;
2. Baixar o instalador;
3. Executar o instalador;
4. Seguir as etapas de instalação;
5. Finalizar o processo.

---

## 15.1 Verificando a instalação

Após instalar o Git, é possível verificar se ele está funcionando através do terminal.

O comando utilizado é:

```bash
git --version
```

Se o terminal apresentar a versão instalada do Git, a instalação foi concluída corretamente.

---

# 16. Configuração Inicial do Git

Caso seja necessário configurar o usuário e o e-mail, podem ser utilizados os seguintes comandos:

```bash
git config --global user.name "<Nome>"
git config --global user.email "<Email>"
```

Essas informações são utilizadas pelo Git para identificar o autor dos commits realizados.

---

# 17. Integração entre VS Code e Git

O Git pode ser integrado ao **Visual Studio Code (VS Code)**.

Para utilizar o controle de versão:

1. Abrir o VS Code;
2. Acessar a aba **Controle de Código-Fonte**;
3. Verificar se o Git está disponível;
4. Caso solicitado, instalar/configurar o Git;
5. Fechar e reabrir o VS Code quando necessário.

O controle de código-fonte permite realizar operações do Git diretamente pela interface gráfica da IDE.

---

# 18. Criando um Repositório no VS Code

Para criar um repositório local:

1. Criar uma pasta no computador;
2. Abrir a pasta no VS Code;
3. Criar um arquivo, por exemplo:

```text
README.md
```

4. Abrir a aba **Controle de Código-Fonte**;
5. Selecionar **Inicializar Repositório**;
6. Adicionar os arquivos;
7. Escrever uma mensagem de commit;
8. Confirmar o commit.

O repositório Git passa então a acompanhar as alterações realizadas no projeto.

---

# 19. Publicando o Repositório no GitHub

Depois de criar o repositório local, ele pode ser publicado no GitHub.

O processo apresentado envolve:

1. Selecionar **Publicar Branch**;
2. Fazer login na conta do GitHub;
3. Escolher se o repositório será público ou privado;
4. Confirmar a publicação.

Depois da publicação:

1. Acessar o perfil do GitHub;
2. Abrir a seção **Repositórios**;
3. Localizar o projeto;
4. Abrir o repositório;
5. Verificar se os arquivos foram enviados corretamente.

---

# 20. Principais Operações do Git

Alguns comandos fundamentais para trabalhar com Git são:

### Inicializar um repositório

```bash
git init
```

### Verificar o estado do repositório

```bash
git status
```

### Adicionar arquivos

```bash
git add .
```

### Criar um commit

```bash
git commit -m "Mensagem do commit"
```

### Enviar alterações para o repositório remoto

```bash
git push
```

### Baixar alterações do repositório remoto

```bash
git pull
```

### Clonar um repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

Esses comandos formam parte do fluxo básico de utilização do Git.

---

# 21. Boas Práticas de Versionamento

O uso correto do Git não consiste apenas em executar comandos. É importante seguir boas práticas para manter o histórico do projeto organizado.

---

## 21.1 Commits Pequenos e Frequentes

É recomendado realizar commits menores e relacionados a alterações específicas.

Isso facilita:

* Identificação de problemas;
* Análise do histórico;
* Reversão de alterações;
* Compreensão da evolução do projeto.

---

## 21.2 Mensagens de Commit Claras

As mensagens dos commits devem explicar de maneira objetiva o que foi alterado.

Exemplo:

```bash
git commit -m "Adiciona resumo da aula 03"
```

Uma boa mensagem facilita a compreensão do histórico do projeto.

---

## 21.3 Uso de Branches

Branches permitem trabalhar em funcionalidades ou correções separadamente da versão principal.

Uma prática comum é manter a branch principal estável e utilizar branches para desenvolver novas funcionalidades.

Exemplo:

```text
main
 ├── feature/login
 ├── feature/cadastro
 └── correcao-bug
```

---

## 21.4 Testes Automatizados

Quando aplicável, testes automatizados devem ser utilizados para verificar se o código continua funcionando corretamente antes de integrar alterações.

Isso ajuda a reduzir problemas durante o desenvolvimento e o processo de merge.

---

# 22. Fluxo Básico de Versionamento

Um fluxo simples utilizando Git pode ser representado da seguinte maneira:

```text
Alterar arquivos
       ↓
   git status
       ↓
    git add
       ↓
   git commit
       ↓
    git push
       ↓
    GitHub
```

Para obter alterações existentes no GitHub:

```text
GitHub
   ↓
git pull
   ↓
Computador
```

Para obter um projeto pela primeira vez:

```text
GitHub
   ↓
git clone
   ↓
Computador
```

---

# 23. Atividades da Aula

## Atividade 1 — Integração entre IDE, Git e GitHub

Deverá ser realizada a configuração da integração entre a IDE instalada no computador e a conta pessoal do GitHub utilizando o Git.

O aluno deverá verificar:

* Autenticação;
* Reconhecimento do repositório remoto;
* Funcionamento do Git na IDE;
* Operações de `commit`;
* Operações de `push`;
* Operações de `pull`.

O objetivo é garantir que o ambiente esteja preparado para o desenvolvimento e versionamento dos projetos.

---

## Atividade 2 — Repositório de Teste

Deverá ser criado um repositório de teste contendo pelo menos um arquivo inicial.

Depois:

1. Realizar alterações no arquivo;
2. Executar um commit;
3. Sincronizar o projeto com o GitHub;
4. Apagar a pasta local do projeto;
5. Utilizar `git clone` para baixar novamente o repositório;
6. Verificar se o projeto foi restaurado corretamente.

Exemplo:

```bash
git clone <URL_DO_REPOSITORIO>
```

O objetivo é compreender na prática o funcionamento do versionamento e da clonagem de repositórios.

---

## Atividade 3 — Pesquisa de Projetos no GitHub

A terceira atividade consiste em pesquisar no GitHub **5 projetos de outros usuários**.

Após encontrar os projetos, deverá ser utilizado o comando:

```bash
git clone <URL_DO_REPOSITORIO>
```

Cada projeto deverá ser analisado para compreender:

* Estrutura de pastas;
* Arquivos;
* Tecnologias utilizadas;
* Organização do projeto;
* Documentação;
* Histórico ou informações disponíveis no repositório.

---

# 24. Objetivos da Aula

Ao final da aula, espera-se que o aluno seja capaz de:

* Diferenciar os principais tipos de Sistemas Operacionais;
* Identificar aplicações de cada tipo de SO;
* Compreender os requisitos específicos de cada ambiente;
* Reconhecer a importância do gerenciamento de recursos;
* Entender o conceito de controle de versão;
* Compreender a diferença entre Git e GitHub;
* Configurar o Git;
* Integrar Git com uma IDE;
* Criar um repositório;
* Realizar commits;
* Utilizar push e pull;
* Clonar repositórios;
* Aplicar boas práticas de versionamento.

---

# 25. Conclusão

Os Sistemas Operacionais possuem diferentes características de acordo com o ambiente em que são utilizados.

Mainframes priorizam alta capacidade de processamento, disponibilidade e processamento de grandes volumes de transações. Sistemas de servidores são desenvolvidos para oferecer serviços a múltiplos usuários e dispositivos através de redes.

Sistemas multiprocessadores precisam lidar com paralelismo, escalonamento e sincronização. Já os Sistemas Operacionais para computadores pessoais priorizam usabilidade e compatibilidade com diferentes aplicações.

Em dispositivos móveis, o gerenciamento de energia, sensores e segurança possuem grande importância. Sistemas embarcados e nós sensores trabalham frequentemente com recursos limitados e finalidades específicas.

Os Sistemas de Tempo Real, por sua vez, possuem requisitos relacionados aos prazos de execução, podendo ser classificados em **Hard Real-Time** e **Soft Real-Time**.

Por fim, a aula apresentou o **Git** como uma ferramenta essencial para controle de versão. O uso de Git integrado ao GitHub permite registrar alterações, colaborar em projetos, manter históricos e recuperar versões anteriores.

O conhecimento dessas ferramentas é importante para o desenvolvimento de software e para a organização de projetos acadêmicos e profissionais.

---

# 26. Referências

* TANENBAUM, Andrew S.; BOS, Herbert. **Sistemas Operacionais Modernos**. 4. ed. São Paulo: Pearson, 2016.
* SILBERSCHATZ, Abraham; GALVIN, Peter B.; GAGNE, Greg. **Fundamentos de Sistemas Operacionais**. 9. ed. Rio de Janeiro: LTC, 2015.
* STALLINGS, William. **Sistemas Operacionais: Conceitos e Projetos**. 8. ed. São Paulo: Pearson, 2015.
* DENARDIN, G. W.; BARRIQUELLO, C. H. **Sistemas Operacionais de Tempo Real e sua Aplicação em Sistemas Embarcados**. Porto Alegre: Editora da UFRGS, 2014.
* AWASTHI, A.; RAWAT, V. **Ramificação e Tarefas do Sistema Operacional**. Edições Nosso Conhecimento, 2023.
* DOWNEY, Allen B. **Think OS: A Brief Introduction to Operating Systems**. Green Tea Press, 2015.
* RED HAT. **Red Hat Enterprise Linux – System Administration Guide**. Documentação Oficial.
* DOCKER INC. **Docker Documentation**. Documentação Oficial. Disponível em: https://docs.docker.com
* GIT. **Git — Documentation**. Disponível em: https://git-scm.com/
* GITHUB. **GitHub Documentation**. Disponível em: https://docs.github.com/
