# 📋 Projeto - API de Cadastro de Clientes
Este projeto é uma API REST desenvolvida em TypeScript para cadastro de clientes.

Este projeto foi desenvolvido como parte de uma pesquisa sobre o **impacto da linguagem de programação no tempo de resposta de uma API**. Para mais detalhes sobre o estudo e seus resultados, acesse o [relatório completo em PDF](./docs/Larissa%20Galvão%20Barcelos%20-%20TCC.pdf).

Também estão disponíveis os repositórios equivalentes desenvolvidos em **Java** e **Python**, para fins de comparação:

- [sistema-cadastro-clientes-java](https://github.com/LarissaGB01/sistema-cadastro-clientes-java)  
- [sistema-cadastro-clientes-python](https://github.com/LarissaGB01/sistema-cadastro-clientes-python)


## 🚀 Tecnologias utilizadas
- Express — framework web para Node.js
- TypeORM — ORM para integração com MySQL
- MySQL — banco de dados relacional
- Axios — cliente HTTP para validação de CPF via API externa
- TypeScript — tipagem estática para JavaScript
- RabbitMQ — fila de mensagens para notificação de novos clientes

## ⚙️ Como rodar o projeto

Antes de rodar o projeto, lembre-se de configurar um arquivo na src chamado `.env.properties` que irá guardar as configurações de ambiente no seguinte formato:
```
# Database
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=

# RabbitMQ
SPRING_RABBITMQ_USERNAME=
SPRING_RABBITMQ_PASSWORD=

# Invertexto
INVERTEXTO_TOKEN=
```

Com isso configurado, para rodar o projeto: 

```
npm run build
npm run dev
```

Lembre-se de iniciar o docker usando:
```
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```
Para verificar as mensagens na fila basta acessar o [servidor rabbit mq](http://localhost:15672/#/nodes/rabbit%40de9c42bc1172) rodando localmente.

Usuário padrão: guest | Senha: guest

## 🛠️ Endpoints disponíveis
- POST /v1/clientes
    - cadastra um novo cliente
    - complexidades envolvidas:
        - comunicação com banco de dados
- POST /v2/clientes
    - cadastra um novo cliente com validação de cpf
    - complexidades envolvidas:
        - comunicação com banco de dados
        - comunicação assíncrona com API externa
- POST /v3/clientes 
  - cadastra um novo cliente com validação de cpf e notificação do cliente criado via fila
  - complexidades envolvidas:
      - comunicação com banco de dados
      - comunicação assíncrona com API externa
      - comunicação assíncrona via fila RabbitMQ
- POST /v4/clientes 
  - recebe uma lista de clientes e processa todos em paralelo, cadastrando com validação de cpf e notificação via fila 
  - complexidades envolvidas:
      - comunicação com banco de dados
      - comunicação assíncrona com API externa
      - comunicação assíncrona via fila RabbitMQ
      - processamento paralelo 

## ✅ Exemplo de requisição

Considere alterar v0 para a versão que você deseja testar para o endpoint de clientes

POST http://localhost:8080/v0/clientes

```json
{
  "cpf": "12345678900",
  "nome": "João da Silva"
}
```

Apenas para a v4 o body de requisição deve ser informado como um array

POST http://localhost:8080/v4/clientes

```json
[
  {
    "cpf": "12345678900",
    "nome": "João da Silva"
  },
  {
    "cpf": "98765432100",
    "nome": "Maria da Silva"
  }
]
```