# Aula 02 — Evolução Histórica dos Sistemas Operacionais

**Professor:** Prof. Me. Deivison S. Takatu
**Disciplina:** Sistemas Operacionais
**Instituição:** FATEC

---

## 1. Introdução

Os **Sistemas Operacionais (SO)** atuam como intermediários entre o usuário e o hardware, tornando a utilização dos computadores mais simples e organizada.

Ao longo da história, os Sistemas Operacionais evoluíram acompanhando os avanços tecnológicos dos computadores e as novas formas de utilização dos sistemas computacionais.

Essa evolução pode ser dividida em diferentes gerações, cada uma marcada por mudanças importantes no hardware, software e na forma como os usuários interagiam com os computadores.

---

# 2. Primeira Geração — 1945 a 1955

A primeira geração dos computadores foi marcada pelo uso de **válvulas eletrônicas** como principal tecnologia.

Essas máquinas apresentavam diversas características:

* Eram extremamente grandes;
* Possuíam alto custo;
* Consumiam muita energia;
* Produziam grande quantidade de calor;
* Apresentavam muitas falhas;
* Tinham capacidade de processamento limitada quando comparadas aos computadores atuais.

## 2.1 Programação

Durante esse período, a programação era realizada diretamente em **código de máquina**, específico para cada hardware.

Programar uma máquina podia exigir alterações físicas em seus componentes, como a modificação de conexões e painéis.

Não existiam os Sistemas Operacionais modernos como conhecemos atualmente. O programador precisava interagir diretamente com o equipamento.

### Principais características da primeira geração

* Uso de válvulas eletrônicas;
* Programação em código de máquina;
* Forte dependência do hardware;
* Operação manual;
* Ausência de Sistemas Operacionais modernos;
* Computadores grandes e caros.

---

# 3. Segunda Geração — 1955 a 1965

A segunda geração foi marcada pela substituição das válvulas eletrônicas pelos **transistores**.

Essa mudança trouxe melhorias importantes para os computadores.

Os transistores permitiram:

* Maior confiabilidade;
* Menor tamanho dos computadores;
* Maior velocidade;
* Menor consumo de energia;
* Maior viabilidade comercial.

Com a evolução do hardware, os Sistemas Operacionais começaram a ganhar novas funcionalidades.

---

## 3.1 Sistemas em Lote — Batch

Durante essa geração surgiram os **sistemas em lote (Batch)**.

Nesse modelo, vários programas eram preparados antecipadamente e executados em sequência, sem interação direta do usuário durante a execução.

O funcionamento básico consistia em:

1. Preparar os programas;
2. Organizar os trabalhos;
3. Inserir os dados;
4. Enviar os trabalhos para processamento;
5. Executar os programas em sequência;
6. Obter os resultados posteriormente.

Os programas e dados eram frequentemente inseridos por meio de **cartões perfurados**.

### Vantagens

* Automatização da execução;
* Redução da necessidade de intervenção manual;
* Possibilidade de executar vários trabalhos em sequência.

### Limitações

* Ausência de interação durante a execução;
* Tempo de espera elevado;
* Dificuldade para identificar e corrigir problemas rapidamente.

---

# 4. Terceira Geração — 1965 a 1980

A terceira geração foi marcada pelo uso de **circuitos integrados**, permitindo a criação de computadores menores, mais rápidos e mais potentes.

Com o avanço do hardware, os Sistemas Operacionais também se tornaram mais complexos.

Entre os principais conceitos dessa geração estão:

* Multiprogramação;
* Compartilhamento de tempo;
* Spooling.

---

## 4.1 Multiprogramação

A **multiprogramação** permitiu manter vários programas simultaneamente na memória.

Enquanto um programa aguardava uma operação de **entrada e saída (E/S)**, outro programa poderia utilizar a CPU.

Dessa maneira, o processador permanecia ocupado por mais tempo, aumentando a eficiência do sistema.

### Exemplo

Imagine três programas:

```text
Programa A → aguardando E/S
Programa B → utilizando a CPU
Programa C → aguardando execução
```

Quando o Programa B precisar aguardar uma operação de E/S, o sistema poderá permitir que outro programa utilize a CPU.

---

## 4.2 Compartilhamento de Tempo

O **compartilhamento de tempo (time-sharing)** permitiu que vários usuários utilizassem o mesmo computador simultaneamente.

Cada usuário interagia com o computador por meio de um terminal conectado ao sistema central.

O processador alternava rapidamente entre os usuários, criando a sensação de que cada pessoa possuía o computador exclusivamente para si.

### Principais características

* Suporte a múltiplos usuários;
* Uso de terminais;
* Compartilhamento da CPU;
* Melhor aproveitamento dos recursos;
* Interação mais direta com o sistema.

---

## 4.3 Spooling

O **spooling** consiste em utilizar o armazenamento, normalmente discos, para armazenar temporariamente dados de entrada e saída.

Isso reduziu a dependência de dispositivos mais lentos, como fitas, e permitiu melhorar a eficiência das operações.

Um exemplo clássico envolve a impressão:

```text
Programa → Spool → Fila de impressão → Impressora
```

O programa pode continuar sua execução enquanto os dados ficam armazenados em uma fila aguardando o processamento pela impressora.

---

# 5. Quarta Geração — 1980 até o Presente

A quarta geração foi marcada pela popularização dos **computadores pessoais (PCs)**.

Os computadores passaram a estar disponíveis para usuários individuais, e os Sistemas Operacionais começaram a priorizar cada vez mais a:

* Facilidade de uso;
* Interface gráfica;
* Compatibilidade com diferentes dispositivos;
* Experiência do usuário.

---

## 5.1 Interfaces Gráficas

As **interfaces gráficas de usuário (GUI)** substituíram grande parte da interação baseada exclusivamente em comandos textuais por elementos visuais.

Entre esses elementos estão:

* Janelas;
* Ícones;
* Menus;
* Botões;
* Ponteiros;
* Barras de tarefas.

Isso tornou os computadores mais acessíveis para usuários que não possuíam conhecimentos avançados de programação ou comandos.

---

# 6. UNIX e sua Influência

O **UNIX** surgiu como uma alternativa mais simples ao projeto MULTICS.

Ao longo do tempo, o UNIX exerceu forte influência sobre diversos Sistemas Operacionais modernos.

Conceitos e ideias associados à família UNIX podem ser encontrados em sistemas como:

* Linux;
* macOS;
* Android;
* Outros sistemas baseados ou influenciados por conceitos UNIX.

A influência do UNIX é importante para compreender a evolução dos Sistemas Operacionais modernos.

---

# 7. Sistemas Operacionais Modernos

Atualmente, os Sistemas Operacionais estão presentes em diversos tipos de dispositivos.

### Computadores pessoais

Exemplos:

* Windows;
* Linux;
* macOS.

### Smartphones

Exemplos:

* Android;
* iOS.

### Servidores

Sistemas Operacionais são utilizados para executar serviços de rede, aplicações, bancos de dados, sistemas corporativos e diversos outros recursos.

### Dispositivos embarcados

Também existem Sistemas Operacionais desenvolvidos para equipamentos específicos, veículos, equipamentos industriais, dispositivos inteligentes e outros sistemas computacionais.

---

# 8. Quinta Geração — 1990 até o Presente

A aula também apresentou uma proposta de **quinta geração**, relacionada principalmente à evolução dos dispositivos móveis e à integração entre telefonia e computação.

A ideia de combinar recursos de telefonia e computação em um único dispositivo começou a ser desenvolvida décadas antes da popularização dos smartphones.

Na década de 1990, surgiram dispositivos que combinavam características de telefones e **PDAs (Personal Digital Assistants)**.

Em 1997, a Ericsson utilizou o termo **smartphone** para descrever seu conceito GS88 "Penelope".

A evolução desses dispositivos contribuiu para a criação do cenário atual, no qual smartphones possuem recursos avançados de:

* Comunicação;
* Computação;
* Internet;
* Aplicativos;
* Câmeras;
* Sensores;
* GPS;
* Sistemas multimídia.

---

# 9. Evolução dos Sistemas Operacionais em Dispositivos Móveis

A evolução dos smartphones também exigiu o desenvolvimento de Sistemas Operacionais capazes de administrar recursos limitados e diferentes tipos de hardware.

Os sistemas móveis atuais precisam gerenciar:

* Processador;
* Memória;
* Armazenamento;
* Bateria;
* Tela;
* Câmeras;
* Sensores;
* Redes móveis;
* Wi-Fi;
* Bluetooth;
* Aplicativos.

Nesse contexto, **Android e iOS** tornaram-se importantes plataformas para dispositivos móveis.

---

# 10. Possível Sexta Geração

A evolução dos Sistemas Operacionais não necessariamente termina na quarta ou quinta geração.

A aula propõe refletir sobre uma possível **sexta geração** e sobre quais características poderão marcar os Sistemas Operacionais do futuro.

A análise histórica permite identificar padrões tecnológicos e compreender como os Sistemas Operacionais foram se adaptando às mudanças no hardware e nas necessidades dos usuários.

Algumas tendências que podem influenciar futuras gerações incluem:

* Inteligência Artificial;
* Computação em nuvem;
* Computação distribuída;
* Internet das Coisas (IoT);
* Automação;
* Maior segurança;
* Processamento em dispositivos locais;
* Integração entre diferentes dispositivos;
* Sistemas mais adaptativos e automatizados.

Essas características são possibilidades de estudo e não representam uma definição oficial de uma "sexta geração".

---

# 11. Linha do Tempo das Gerações

| Geração      | Período       | Principais características                                                    |
| ------------ | ------------- | ----------------------------------------------------------------------------- |
| **Primeira** | 1945–1955     | Válvulas, programação em código de máquina e operação manual                  |
| **Segunda**  | 1955–1965     | Transistores, sistemas em lote e cartões perfurados                           |
| **Terceira** | 1965–1980     | Circuitos integrados, multiprogramação, time-sharing e spooling               |
| **Quarta**   | 1980–presente | PCs, interfaces gráficas e popularização dos Sistemas Operacionais            |
| **Quinta**   | 1990–presente | Dispositivos móveis, smartphones e integração entre telefonia e computação    |
| **Sexta**    | Em discussão  | Possível integração de IA, nuvem, IoT, automação e novas formas de computação |

---

# 12. Comparação entre as Gerações

A evolução dos Sistemas Operacionais pode ser compreendida através de algumas mudanças fundamentais.

### Hardware

```text
Válvulas
   ↓
Transistores
   ↓
Circuitos integrados
   ↓
Microprocessadores
   ↓
Computadores pessoais
   ↓
Dispositivos móveis
```
