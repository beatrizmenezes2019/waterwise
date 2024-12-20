# VirtualSensorsWaterwise
# Sobre o projeto:

## Aplicação de Monitoramento de Qualidade da Água com Sensores Virtuais

  A aplicação desenvolvida em Angular tem como objetivo simular sensores físicos para monitoramento da qualidade da água, proporcionando uma solução prática e eficiente para análise de parâmetros ambientais. Através dessa plataforma, é possível realizar a simulação de cinco tipos de sensores virtuais que medem indicadores cruciais para a avaliação da qualidade da água, são eles:

1. Temperatura
2. Turbidez
3. pH
4. Oxigênio Dissolvido (OD)
5. Condutividade
   
  Esses sensores virtuais são responsáveis por monitorar e simular a coleta de dados sobre o estado da água em tempo real, utilizando algoritmos que emulam os valores que seriam observados em sensores físicos reais. Com isso, a aplicação oferece uma maneira de testar e analisar dados sem a necessidade de equipamentos físicos, sendo ideal para validações e testes em ambientes de desenvolvimento ou pesquisa.

## Integração com MQTT

  Os dados simulados pelos sensores são enviados para um broker MQTT na nuvem. O MQTT (Message Queuing Telemetry Transport) é um protocolo de comunicação leve e eficiente, amplamente utilizado para troca de dados em sistemas de IoT (Internet das Coisas). Ao utilizar o MQTT, a aplicação garante que os dados gerados pelos sensores virtuais sejam transmitidos de forma rápida e segura, permitindo o monitoramento remoto e em tempo real da qualidade da água.

## Funcionalidades Principais:

- Simulação de Sensores Virtuais: Cada um dos cinco sensores tem seu comportamento e intervalos de leitura configurados, fornecendo dados simulados de temperatura, turbidez, pH, oxigênio dissolvido e condutividade.
  
- Personalização: Permite que o usuário configure os intervalos de geração de dados aleatórios de cada sensor, bem como o tempo em que os dados serão enviados para o broker;

- Envio de Dados via MQTT: Os dados coletados e simulados pelos sensores são enviados para a nuvem, utilizando o protocolo MQTT. Isso facilita o armazenamento, processamento e visualização dos dados em tempo real.

- Monitoramento Remoto: Através da integração com a plataforma de nuvem, os usuários podem acessar os dados coletados por meio de dashboards ou sistemas de monitoramento conectados ao broker MQTT.

## Benefícios da Aplicação:

- Desenvolvimento de Soluções de IoT: A aplicação serve como um protótipo para testar soluções de monitoramento de qualidade da água com sensores reais.

- Validação de Processos: Permite que os pesquisadores e desenvolvedores validem algoritmos de processamento de dados e integração com sistemas de IoT sem a necessidade de hardware físico.

- Eficiência e Acessibilidade: Por ser baseada em Angular e utilizar o protocolo MQTT, a aplicação é eficiente em termos de consumo de recursos e facilmente acessível de diferentes dispositivos conectados à internet.

## Conceito de Continuidade aplicado ao projeto:

Neste projeto foi abordado o conceito de Continuidade da IoT. A aplicação é iniciada com o sensor virtual de temperatura inativado, pois temos o sensor de temperatura físico em operação. No entanto, caso haja uma falha no sensor físico e o mesmo perca a comunicação com o broker, a aplicação faz a monitoria do tópico de envio dos dados de temperatura e caso o sensor físico permaneça por mais de 15 segundos sem enviar dados, o sensor virtual é automaticamente habilitado, simulando um sensor backup. Quando o sensor físico volta a operar e enviar dados ao Broker, o sensor virtual é automaticamente desabilidado. Esse controle é feito pelo campo "sensorId" presente na mensagem enviada ao Broker, onde o sensor físico possui um id específico, e o sensor virtual possui outro id; 

## A aplicação:

![image](https://github.com/user-attachments/assets/7e26b4c9-7445-4ddd-a884-72c98c1437c5)

# Desenvolvimento:

Este projeto foi gerado utilizando [Angular CLI](https://github.com/angular/angular-cli) versão 16.2.16.

## Development server

Pré-Requisitos:
  - NodeJS;
  - NPM;
  - Angular;

Executar `npm install --legacy-peer-deps` para instalar as dependências necessárias;

Executar `ng serve` para iniciar o servidor. Navegue até `http://localhost:4200/`.

