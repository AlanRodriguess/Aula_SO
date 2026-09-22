# Aula 01 — Apresentação da Disciplina e Introdução aos Sistemas Operacionais

**Professor:** Prof. Me. Deivison S. Takatu
**Disciplina:** Sistemas Operacionais
**Instituição:** FATEC

---

## 1. Apresentação da Disciplina

A primeira aula teve como objetivo apresentar a disciplina de **Sistemas Operacionais**, seu conteúdo programático, metodologia de ensino, critérios de avaliação e atividades que serão desenvolvidas durante o semestre.

Também foi realizada uma apresentação inicial da turma, considerando aspectos como:

* Experiências profissionais na área de tecnologia;
* Expectativas após a conclusão do curso;
* Hobbies e passatempos.

---

## 2. Conteúdo da Disciplina

Os principais assuntos apresentados para o semestre foram:

* Contextualização dos Sistemas Operacionais;
* Estrutura e funcionamento dos Sistemas Operacionais;
* Gerenciamento de processos;
* Gerenciamento de memória;
* Gerenciamento de dispositivos de entrada e saída;
* Sistemas de arquivos;
* Segurança em Sistemas Operacionais;
* Virtualização;
* Outros conceitos relacionados ao funcionamento e gerenciamento de recursos computacionais.

---

## 3. O que são Sistemas Operacionais?

Um **Sistema Operacional (SO)** é um software essencial responsável por gerenciar os recursos de hardware e software de um computador ou dispositivo.

Ele atua como uma **interface entre o usuário, os aplicativos e o hardware**, permitindo que os programas utilizem os recursos do computador de maneira organizada e controlada.

### Exemplos de Sistemas Operacionais

* Windows;
* macOS;
* Linux;
* Android;
* iOS.

---

## 4. Estrutura Interna dos Sistemas Operacionais

Os Sistemas Operacionais possuem estruturas internas organizadas para permitir o gerenciamento dos recursos do sistema.

### 4.1 Estrutura em Camadas

A estrutura em camadas organiza o sistema de forma hierárquica. Cada camada possui determinadas responsabilidades e utiliza os serviços fornecidos pelas camadas inferiores.

Essa organização contribui para:

* Modularidade;
* Organização;
* Manutenção;
* Separação de responsabilidades.

### 4.2 Estrutura Monolítica e Modular

Existem diferentes abordagens para estruturar o **kernel** de um Sistema Operacional.

* **Monolítica:** grande parte dos serviços do sistema é executada dentro do kernel.
* **Modular:** permite organizar funcionalidades em módulos, facilitando a inclusão ou alteração de determinados componentes.

---

## 5. Kernel

O **kernel** é o núcleo do Sistema Operacional.

Ele possui privilégios elevados e é responsável por funções fundamentais, como:

* Gerenciamento de processos;
* Gerenciamento de memória;
* Comunicação com dispositivos;
* Controle de recursos do sistema;
* Comunicação direta com o hardware.

O kernel permite que os programas utilizem os recursos físicos do computador de maneira controlada.

---

## 6. Modos de Operação

Os Sistemas Operacionais utilizam diferentes níveis de privilégio para controlar o acesso aos recursos do computador.

### Modo Usuário

É utilizado normalmente por aplicações comuns.

Nesse modo, os programas possuem acesso limitado aos recursos do sistema, aumentando a segurança e evitando que uma aplicação possa comprometer diretamente o funcionamento do Sistema Operacional.

### Modo Kernel

Possui privilégios elevados e permite acesso direto aos recursos do hardware.

O kernel utiliza esse modo para realizar operações que não podem ser executadas diretamente por programas comuns.

---

## 7. Escalonamento de Processos

O **escalonamento de processos** determina qual processo será executado pelo processador e por quanto tempo.

O objetivo é utilizar o processador de maneira eficiente, proporcionando:

* Eficiência;
* Justiça na utilização do processador;
* Bom tempo de resposta;
* Melhor desempenho geral do sistema.

### Exemplos de algoritmos

#### FIFO

Também conhecido como **First In, First Out**.

Os processos são executados seguindo a ordem em que chegaram.

#### Round Robin

Cada processo recebe uma determinada quantidade de tempo de CPU, chamada de **quantum**. Após esse período, o próximo processo recebe a oportunidade de execução.

#### Prioridade

Os processos são executados considerando níveis de prioridade definidos pelo sistema.

---

## 8. Gerenciamento de Memória

O Sistema Operacional também é responsável por controlar a utilização da memória.

### 8.1 Memória Principal

A memória principal, principalmente a **RAM**, é utilizada para armazenar temporariamente dados e programas que estão em execução.

O gerenciamento envolve:

* Alocação dinâmica;
* Liberação de memória;
* Proteção entre processos;
* Controle da utilização dos recursos.

### 8.2 Memória Virtual

A memória virtual permite que o Sistema Operacional utilize uma parte do armazenamento como uma extensão lógica da memória RAM.

Entre os conceitos relacionados estão:

* Paginação;
* Segmentação;
* Gerenciamento do espaço de memória;
* Isolamento e proteção dos processos.

A memória virtual proporciona maior flexibilidade na utilização da memória, embora seu uso excessivo possa afetar o desempenho.

---

## 9. Gerenciamento de Entrada e Saída

O Sistema Operacional também controla os dispositivos de **entrada e saída (E/S)**.

Exemplos:

* Teclado;
* Mouse;
* Impressoras;
* Discos;
* Monitores;
* Outros dispositivos periféricos.

O SO fornece mecanismos para que os programas possam utilizar esses dispositivos sem precisar controlar diretamente todos os detalhes do hardware.

---

## 10. Sistemas de Arquivos

Os **sistemas de arquivos** são responsáveis pela organização, armazenamento e acesso aos dados presentes nos dispositivos de armazenamento.

Eles permitem que o Sistema Operacional:

* Crie arquivos;
* Exclua arquivos;
* Organize diretórios;
* Controle permissões;
* Localize e acesse dados armazenados.

Exemplos de sistemas de arquivos incluem NTFS, FAT32, ext4 e outros.

---

## 11. Segurança em Sistemas Operacionais

A segurança é uma parte importante do funcionamento de um Sistema Operacional.

Entre seus objetivos estão:

* Proteger arquivos e dados;
* Controlar permissões de acesso;
* Isolar processos;
* Impedir acessos não autorizados;
* Reduzir os impactos de ameaças e ataques.

Os mecanismos de segurança ajudam a proteger tanto os usuários quanto os recursos do sistema.

---

## 12. Virtualização

A **virtualização** permite executar ambientes virtuais utilizando os recursos físicos de um computador.

Com ela é possível, por exemplo, executar diferentes Sistemas Operacionais ou ambientes isolados em uma mesma máquina física.

Entre suas vantagens estão:

* Melhor aproveitamento dos recursos;
* Isolamento de ambientes;
* Flexibilidade;
* Facilidade para testes e desenvolvimento;
* Utilização mais eficiente da infraestrutura.

---

## 13. Importância de um Portfólio

Durante a aula também foi destacada a importância de possuir um **portfólio de projetos**.

Um portfólio permite demonstrar:

* Habilidades práticas;
* Conhecimento técnico;
* Criatividade;
* Capacidade de solucionar problemas;
* Domínio de ferramentas.

Além de servir como evidência do aprendizado, um portfólio pode contribuir para oportunidades de **estágio e emprego**.

A criação de projetos também incentiva a organização, a melhoria contínua e o desenvolvimento de soluções próximas às situações encontradas no mercado profissional.

---

## 14. Critérios de Avaliação

A avaliação da disciplina será composta por diferentes atividades.

A fórmula apresentada foi:

```text
Nota = (P1 × 0,25) + (P2 × 0,25) + ((PJ + AT) × 0,25)
```

Onde:

* **P1:** Prova 1;
* **P2:** Prova 2;
* **PJ:** Projeto;
* **AT:** Atividades.

---

## 15. Atividade da Aula

A primeira atividade da disciplina envolve a formação de grupos.

### Formação dos grupos

Os grupos devem possuir:

* Mínimo de **3 integrantes**;
* Máximo de **5 integrantes**.

A mesma composição deverá ser utilizada nas atividades semanais durante o semestre.

Após a formação do grupo, os integrantes devem enviar um arquivo contendo os **nomes completos dos participantes**.

### Repositório no GitHub

Cada grupo deverá criar um **repositório no GitHub**, que será utilizado como diretório principal das atividades da disciplina durante todo o semestre.

No repositório deverá existir um arquivo **Markdown (`.md`)** contendo um resumo da Aula 01 e seus principais conceitos.

### Linha do tempo dos Sistemas Operacionais

Também deverá ser elaborada uma **linha do tempo**, em formato de mapa mental, apresentando os anos de lançamento de diferentes Sistemas Operacionais.

A atividade deverá ser realizada de forma colaborativa utilizando a ferramenta **Miro**.

Posteriormente, o conteúdo deverá ser convertido para o formato `.md` e armazenado no repositório do grupo.

---

## 16. Conclusão

A primeira aula apresentou a estrutura da disciplina de **Sistemas Operacionais** e introduziu os principais conceitos relacionados ao funcionamento de um Sistema Operacional.

Foi possível compreender que o SO atua como uma camada fundamental entre os aplicativos, usuários e hardware, sendo responsável pelo gerenciamento de recursos como:

* Processador;
* Memória;
* Dispositivos de entrada e saída;
* Arquivos;
* Processos.

Também foram introduzidos conceitos fundamentais como **kernel, modos de operação, escalonamento de processos, memória virtual, sistemas de arquivos, segurança e virtualização**.

Além dos conceitos técnicos, a aula apresentou a metodologia, os critérios de avaliação e as atividades que serão desenvolvidas ao longo do semestre.

---

## 17. Referências

* TANENBAUM, Andrew S.; BOS, Herbert. **Sistemas Operacionais Modernos**. 4. ed. São Paulo: Pearson, 2016.
* SILBERSCHATZ, Abraham; GALVIN, Peter B.; GAGNE, Greg. **Fundamentos de Sistemas Operacionais**. 9. ed. Rio de Janeiro: LTC, 2015.
* STALLINGS, William. **Sistemas Operacionais: Conceitos e Projetos**. 8. ed. São Paulo: Pearson, 2015.
* DENARDIN, G. W.; BARRIQUELLO, C. H. **Sistemas Operacionais de Tempo Real e sua Aplicação em Sistemas Embarcados**. Porto Alegre: Editora da UFRGS, 2014.
* AWASTHI, A.; RAWAT, V. **Ramificação e Tarefas do Sistema Operacional**. Edições Nosso Conhecimento, 2023.
* DOWNEY, Allen B. **Think OS: A Brief Introduction to Operating Systems**. Green Tea Press, 2015.
* RED HAT. **Red Hat Enterprise Linux – System Administration Guide**. Documentação Oficial.
* DOCKER INC. **Docker Documentation**. Documentação Oficial.
