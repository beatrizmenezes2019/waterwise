# Sobre o projeto
## Aplicação de Monitoramento de Temperatura com Sensor DS18B20 e Comunicação via MQTT

Esta aplicação foi desenvolvida em C++ para um controlador ESP8266 NodeMCU, com o objetivo de realizar o monitoramento de temperatura em tempo real utilizando o sensor DS18B20. O sistema conecta-se a uma rede Wi-Fi, realiza leituras de temperatura periodicamente e transmite esses dados para um broker MQTT, permitindo o monitoramento remoto e a integração com outras plataformas de IoT (Internet das Coisas).

## Funcionamento da Aplicação
1. Leitura de Dados do Sensor DS18B20:
   
   A aplicação utiliza o sensor DS18B20, um sensor digital de temperatura de alta precisão e fácil integração com microcontroladores, para medir a temperatura ambiente. O sensor é amplamente utilizado em sistemas de automação, controle e monitoramento de temperatura.
A cada 5 minutos, o ESP8266 faz a leitura da temperatura fornecida pelo sensor DS18B20. O intervalo de 5 minutos entre as leituras garante uma coleta regular de dados sem sobrecarregar a rede ou o dispositivo.

3. Conexão Wi-Fi:
   
   Após iniciar a aplicação, o ESP8266 NodeMCU conecta-se à rede Wi-Fi configurada. Isso permite que o dispositivo esteja sempre acessível para o envio de dados, sem a necessidade de uma conexão física constante.
O ESP8266 é um microcontrolador com capacidade de conectividade Wi-Fi, ideal para aplicações de IoT, devido ao seu baixo consumo de energia e flexibilidade para se integrar a diferentes redes.

5. Envio de Dados via MQTT:
   
   Os dados de temperatura lidos pelo sensor DS18B20 são então enviados a um broker MQTT, utilizando o protocolo MQTT (Message Queuing Telemetry Transport), um protocolo leve e eficiente para comunicação em tempo real em redes IoT.
O MQTT garante que os dados de temperatura sejam transmitidos de forma rápida e confiável para a nuvem ou servidores de processamento, onde podem ser armazenados, analisados ou visualizados em tempo real.

## Funcionalidades Principais:
- Coleta de Temperatura: A cada 5 minutos, o sensor DS18B20 fornece uma leitura precisa da temperatura do ambiente, que é coletada pelo ESP8266.
- Conexão com Rede Wi-Fi: O ESP8266 conecta-se à rede Wi-Fi local, permitindo o envio contínuo de dados sem a necessidade de conexão física constante.
- Envio de Dados via MQTT: A temperatura lida é enviada ao broker MQTT, onde pode ser acessada remotamente por outros dispositivos ou sistemas de monitoramento.
- Monitoramento Remoto: O sistema permite que os dados de temperatura sejam monitorados em tempo real a partir de qualquer plataforma conectada ao broker MQTT, possibilitando a criação de alertas, gráficos e relatórios de temperatura.

## Modelo da implementação física:

![nodemcu_sensor](https://github.com/user-attachments/assets/762e7224-316c-41cb-9884-d8dab9c4ec93)

## Desenvolvimento:

Para executar a aplicação, basta instalar o [Arduino IDE](https://www.arduino.cc/en/software), copiar as bibliotecas presentes na pasta "libraries" para dentro de "C:\Users\{{username}}\Documents\Arduino\libraries", e abrir o arquivo "comunicacao_mqtt.ino" na IDE. Caso possua o controlador, será necessário a configuração da placa NodeMCU. Feitas as configurações necessárias, basta compilar e enviar o projeto para a placa através da porta COMX.
