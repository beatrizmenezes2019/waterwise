# WaterWise API Documentation

## Overview

WaterWise é uma API para monitoramento da qualidade da água que integra sensoriamento virtual, processamento de dados em tempo real e visualização de métricas. A aplicação utiliza uma arquitetura orientada a eventos para coleta de dados de sensores e oferece endpoints REST para gerenciamento de sistemas de água.

## Arquitetura

### Estrutura do Projeto

```
src/
├── application/
│   └── services/
│       ├── event/              # Serviços relacionados ao processamento de eventos
│       ├── processing_pipeline/ # Serviços de processamento e twinning
│       └── rest/               # Serviços REST para gerenciamento
├── controllers/
│   ├── event_driven_controller.py  # Controlador para eventos MQTT
│   └── rest_controller.py          # Controlador para endpoints REST
├── domain/
│   ├── entities/               # Entidades de domínio
│   ├── events/                 # Definições de eventos
│   └── repositories/           # Interfaces de repositório
└── infrastructure/
    ├── adapters/              # Adaptadores (ex: MQTT)
    └── config/                # Configurações

```

## Componentes Principais

### 1. Controladores

#### EventDrivenController

- Gerencia a conexão MQTT e processamento de eventos dos sensores
- Subscreve no tópico "waterwise/+" para receber leituras dos sensores
- Processa eventos e os encaminha para persistência

#### RestController

- Fornece endpoints REST para gerenciamento de sistemas de água
- Implementa operações CRUD para WaterSystem

### 2. Serviços

#### EventService

- Processa leituras dos sensores
- Realiza normalização de timezone (UTC-3)
- Persiste leituras no MongoDB

#### ProcessingPipelineService

- Executa a cada 60 segundos
- Realiza o twinning digital dos sistemas de água
- Processa dados de sensores dentro da janela de twinning
- Calcula estatísticas (média, mínimo, máximo) para cada sensor

#### RestService

- Implementa a lógica de negócio para operações CRUD
- Gerencia WaterSystems e suas configurações

## API Endpoints

### Water Systems

#### POST /water-systems

Cria um novo sistema de água.

- Request Body: WaterSystemCreateUpdateRequest
- Response: string (ID do sistema criado)

#### GET /water-systems/{water_system_id}

Retorna detalhes de um sistema específico.

- Response: WaterSystem

#### PUT /water-systems/{water_system_id}

Atualiza um sistema existente.

- Request Body: WaterSystemCreateUpdateRequest
- Response: int (contagem de atualizações)

#### DELETE /water-systems/{water_system_id}

Remove um sistema.

- Response: int (contagem de deleções)

#### GET /water-systems

Lista todos os sistemas de água.

- Response: List[WaterSystem]

## Modelos de Dados

### WaterSystem

```python
{
    "id": str,
    "name": str,
    "location": str,
    "capacityCubicMeters": float,
    "system_type": str,
    "sensors": List[Sensor],
    "twinning_rate_seconds": int,
    "status": str
}
```

### SensorReadingEvent

```python
{
    "water_system_id": str,
    "sensor_id": str,
    "value": float,
    "measure_unit": str,
    "create_date": datetime
}
```

## Fluxos de Dados

### Fluxo de Eventos

1. Sensores enviam leituras via MQTT
2. EventDrivenController recebe e valida os eventos
3. EventService processa e persiste os dados
4. ProcessingPipelineService processa os dados a cada minuto

[O diagrama de sequência detalhado deste fluxo pode ser encontrado aqui](https://github.com/beatrizmenezes2019/waterwise/blob/76d682e8efb8276021ae4681d8854a9eadd797ff/docs/diagrams/ds-persistencia-medicoes.png). Este diagrama ilustra a interação entre o Message Broker, EventDrivenController e MongoDB para a persistência dos dados dos sensores.

### Fluxo de Twinning

1. Scheduler dispara ProcessingPipelineService
2. Serviço busca leituras recentes dos sensores
3. Calcula estatísticas para cada sensor
4. Atualiza o estado do digital twin
5. Persiste o estado atualizado

[O diagrama de sequência completo deste processo pode ser encontrado aqui](https://github.com/beatrizmenezes2019/waterwise/blob/091dd9e6a2e366023ef6836c0cfee0ae0ac25cff/docs/diagrams/ds-processing-pipeline.png). Este diagrama mostra em detalhes como o ProcessingPipelineService interage com o MongoDB e os WaterSystem Twins para realizar o processamento e atualização dos estados.

## Configuração

A aplicação utiliza variáveis de ambiente para configuração:

- MQTT_BROKER_URL
- MQTT_BROKER_PORT
- MQTT_BROKER_CLIENT_ID
- DEFAULT_WATER_SYSTEM_ID

## Persistência

- MongoDB é utilizado como banco de dados principal
- Coleção sensorReadings armazena as leituras dos sensores como série temporal
- Coleção water_systems armazena as configurações e estados dos sistemas

## Monitoramento e Logging

- Sistema de logging configurado via logging_config.py
- Logs incluem informações sobre processamento de eventos e erros
- Retry mechanism implementado para reconexão MQTT (60 segundos de intervalo)
