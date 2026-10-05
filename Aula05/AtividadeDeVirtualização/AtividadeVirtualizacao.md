# Manual – Instalação e Virtualização do Lubuntu no Oracle VirtualBox

## 1. Objetivo

Instalar o Oracle VirtualBox, criar uma máquina virtual, instalar o sistema operacional Lubuntu e testar suas principais funcionalidades.

## 2. Materiais necessários

* Computador;
* Oracle VirtualBox;
* Imagem ISO do Lubuntu;
* Espaço disponível no armazenamento;
* Memória RAM suficiente para executar a máquina virtual.

## 3. Instalação do Oracle VirtualBox

1. Baixar e instalar o Oracle VirtualBox no computador.
2. Executar o instalador.
3. Seguir as etapas apresentadas pelo instalador.
4. Manter as opções padrão, caso não seja necessário alterá-las.
5. Finalizar a instalação.
6. Abrir o Oracle VirtualBox.

**Evidência:** adicionar uma captura de tela mostrando o Oracle VirtualBox instalado e aberto.

---

## 4. Criação da máquina virtual

1. No Oracle VirtualBox, clicar em **Novo**.
2. Informar o nome da máquina virtual como `Lubuntu`.
3. Selecionar **Linux** como tipo de sistema operacional.
4. Selecionar **Ubuntu (64-bit)** como versão, quando essa opção estiver disponível.
5. Definir a quantidade de memória RAM.

### Configuração utilizada

| Recurso             | Configuração    |
| ------------------- | --------------- |
| Sistema operacional | Lubuntu         |
| Tipo                | Linux           |
| Versão              | Ubuntu (64-bit) |
| Memória RAM         | 2 GB            |
| Processadores       | 2               |
| Armazenamento       | 20 GB           |
| Rede                | NAT             |

6. Criar um disco rígido virtual.
7. Utilizar o formato padrão de disco do VirtualBox.
8. Selecionar a opção de armazenamento dinamicamente alocado.
9. Definir o tamanho do disco virtual.
10. Finalizar a criação da máquina virtual.

**Evidência:** adicionar uma captura de tela mostrando a máquina virtual `Lubuntu` criada no VirtualBox.

---

## 5. Configuração da imagem ISO

1. Selecionar a máquina virtual `Lubuntu`.
2. Acessar **Configurações**.
3. Entrar na opção **Armazenamento**.
4. Selecionar a unidade óptica virtual.
5. Escolher o arquivo ISO do Lubuntu.
6. Confirmar as configurações.

A imagem ISO é utilizada para iniciar o instalador do sistema operacional dentro da máquina virtual.

**Evidência:** adicionar uma captura de tela mostrando a imagem ISO do Lubuntu configurada no VirtualBox.

---

## 6. Instalação do Lubuntu

1. Iniciar a máquina virtual.
2. O Lubuntu será iniciado utilizando a imagem ISO.
3. Selecionar o idioma desejado.
4. Configurar o teclado.
5. Selecionar a opção para iniciar a instalação do Lubuntu.
6. Seguir as instruções apresentadas pelo instalador.
7. Selecionar o disco virtual criado para receber o sistema.
8. Criar o usuário.
9. Definir uma senha.
10. Aguardar o término da instalação.
11. Reiniciar a máquina virtual quando solicitado.
12. Remover a imagem ISO da unidade virtual, caso seja necessário.
13. Iniciar novamente a máquina virtual.

**Evidências:**

* Adicionar uma captura de tela da tela de instalação.
* Adicionar uma captura de tela do processo de instalação.
* Adicionar uma captura de tela do Lubuntu após a instalação.

---

## 7. Primeiro acesso ao Lubuntu

Após a instalação, foi realizado o primeiro acesso ao sistema operacional.

Foram realizados os seguintes procedimentos:

1. Fazer login utilizando o usuário criado durante a instalação.
2. Observar a área de trabalho do Lubuntu.
3. Abrir o menu de aplicativos.
4. Abrir o gerenciador de arquivos.
5. Abrir o Terminal.
6. Verificar a conexão de rede.
7. Explorar as configurações do sistema.

O Lubuntu apresenta uma interface gráfica leve, permitindo a utilização do sistema mesmo em computadores com recursos mais limitados.

**Evidência:** adicionar uma captura de tela da área de trabalho do Lubuntu.

---

## 8. Teste do sistema virtualizado

Após a instalação, foram realizados testes para verificar o funcionamento da máquina virtual e do sistema operacional Lubuntu.

### 8.1. Teste do Terminal

Foi aberto o Terminal do Lubuntu e foram executados alguns comandos básicos:

```bash
pwd
ls
mkdir teste
cd teste
touch arquivo.txt
ls
```

Os comandos utilizados possuem as seguintes funções:

* `pwd` — mostra o diretório atual;
* `ls` — lista os arquivos e diretórios;
* `mkdir teste` — cria uma pasta chamada `teste`;
* `cd teste` — entra na pasta `teste`;
* `touch arquivo.txt` — cria um arquivo chamado `arquivo.txt`;
* `ls` — verifica os arquivos existentes no diretório.

**Evidência:** adicionar uma captura de tela do Terminal mostrando os comandos executados.

---

## 9. Teste do sistema de arquivos

Para testar o sistema de arquivos do Lubuntu, foi criada uma pasta chamada `teste`.

Dentro dessa pasta foi criado o arquivo:

```text
arquivo.txt
```

A estrutura criada foi:

```text
teste/
└── arquivo.txt
```

Esse teste demonstrou a possibilidade de criar, acessar e organizar arquivos e diretórios no sistema operacional.

**Evidência:** adicionar uma captura de tela mostrando a pasta `teste` e o arquivo `arquivo.txt`.

---

## 10. Teste da conexão de rede

Também foi realizado um teste para verificar a conexão de rede da máquina virtual.

No Terminal, foi utilizado o comando:

```bash
ping -c 4 google.com
```

O comando envia pacotes para o endereço informado e verifica se a máquina virtual consegue se comunicar com a internet.

Quando são recebidas respostas, é possível verificar que a conexão de rede da máquina virtual está funcionando.

**Evidência:** adicionar uma captura de tela mostrando o resultado do teste de conexão.

---

## 11. Teste dos aplicativos

Foram explorados alguns aplicativos disponíveis no Lubuntu, incluindo:

* Gerenciador de arquivos;
* Terminal;
* Navegador;
* Configurações do sistema;
* Menu de aplicativos.

Esses testes permitiram verificar o funcionamento da interface gráfica e dos principais recursos disponíveis no sistema operacional.

**Evidência:** adicionar uma ou mais capturas de tela dos aplicativos utilizados.

---

## 12. Funcionalidades exploradas

Durante a atividade, foram exploradas as seguintes funcionalidades do Lubuntu:

* Área de trabalho;
* Menu de aplicativos;
* Gerenciador de arquivos;
* Terminal;
* Criação de arquivos;
* Criação de diretórios;
* Organização de arquivos;
* Configurações do sistema;
* Conexão de rede;
* Execução de aplicativos;
* Utilização de uma máquina virtual.

---

## 13. Resultado

A máquina virtual foi criada utilizando o Oracle VirtualBox e o sistema operacional Lubuntu foi instalado com sucesso.

Após a instalação, foram realizados testes para verificar o funcionamento do sistema virtualizado. Foram testados o Terminal, o sistema de arquivos, a conexão de rede e alguns aplicativos disponíveis no Lubuntu.

Os testes demonstraram que o sistema operacional está funcionando corretamente dentro do ambiente virtualizado.

---

## 14. Conclusão

A atividade permitiu colocar em prática os conhecimentos relacionados à virtualização e aos sistemas operacionais.

Por meio do Oracle VirtualBox, foi possível criar uma máquina virtual e instalar o Lubuntu em um ambiente separado do sistema operacional principal do computador.

Durante a atividade, também foi possível explorar diferentes funcionalidades do Lubuntu, como o gerenciamento de arquivos, utilização do Terminal, execução de aplicativos e acesso à rede.

A virtualização possibilitou testar o sistema operacional de forma segura, sem a necessidade de modificar ou formatar o sistema operacional principal do computador.

---

## 15. Evidências da atividade

Nesta seção devem ser adicionadas as capturas de tela realizadas durante a execução da atividade.

### Evidência 1 – Oracle VirtualBox

Adicionar aqui o print do Oracle VirtualBox instalado e aberto.

### Evidência 2 – Máquina virtual

Adicionar aqui o print mostrando a máquina virtual `Lubuntu` criada.

### Evidência 3 – Configuração da máquina virtual

Adicionar aqui o print das configurações de memória, processador, armazenamento e rede.

### Evidência 4 – Imagem ISO

Adicionar aqui o print mostrando a ISO do Lubuntu configurada.

### Evidência 5 – Instalação

Adicionar aqui o print da instalação do Lubuntu.

### Evidência 6 – Área de trabalho

Adicionar aqui o print do Lubuntu funcionando após a instalação.

### Evidência 7 – Terminal

Adicionar aqui o print dos comandos executados no Terminal.

### Evidência 8 – Sistema de arquivos

Adicionar aqui o print mostrando a pasta `teste` e o arquivo `arquivo.txt`.

### Evidência 9 – Teste de rede

Adicionar aqui o print do comando `ping`.

### Evidência 10 – Aplicativos

Adicionar aqui o print dos aplicativos explorados durante a atividade.
