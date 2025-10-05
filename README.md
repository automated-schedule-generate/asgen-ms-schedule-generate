# ASGEN - Microsserviço de Geração de Horários

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

## 📋 Sobre o Projeto

Microsserviço responsável pela geração automática de horários acadêmicos utilizando algoritmos genéticos. Este sistema faz parte do ecossistema ASGEN (Automatic Schedule Generation) do IFPE e foi desenvolvido para otimizar a alocação de turmas, professores, salas de aula e horários, respeitando diversas restrições e preferências.

O sistema utiliza técnicas de computação evolutiva para encontrar soluções otimizadas de grade horária, considerando:

- Disponibilidade de professores
- Capacidade e recursos das salas
- Conflitos de horários
- Preferências e restrições específicas
- Carga horária das disciplinas

---

## 🚀 Tecnologias Utilizadas

### Framework e Runtime

- **[NestJS](https://nestjs.com/)** v11.x - Framework Node.js progressivo para aplicações server-side
- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[Deno](https://deno.land/)** v2.5.x - Runtime alternativo com suporte nativo a TypeScript
- **[TypeScript](https://www.typescriptlang.org/)** v5.7.x - Superset tipado de JavaScript

### Banco de Dados

- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Sequelize](https://sequelize.org/)** v6.x - ORM para Node.js
- **[Sequelize-TypeScript](https://github.com/sequelize/sequelize-typescript)** v2.x - Decorators TypeScript para Sequelize

### Bibliotecas Principais

- **[Express](https://expressjs.com/)** v5.x - Framework web para Node.js
- **[Axios](https://axios-http.com/)** v1.x - Cliente HTTP
- **[RxJS](https://rxjs.dev/)** v7.x - Biblioteca para programação reativa
- **[dotenv](https://github.com/motdotla/dotenv)** v17.x - Gerenciamento de variáveis de ambiente

### Ferramentas de Desenvolvimento

- **[Jest](https://jestjs.io/)** v30.x - Framework de testes
- **[ESLint](https://eslint.org/)** v9.x - Linter para JavaScript/TypeScript
- **[Prettier](https://prettier.io/)** v3.x - Formatador de código
- **[ts-jest](https://kulshekhar.github.io/ts-jest/)** v29.x - Preprocessador Jest para TypeScript

---

## 📁 Arquitetura do Projeto

O projeto segue os princípios da **Arquitetura Limpa (Clean Architecture)** e **DDD (Domain-Driven Design)**, organizando o código em camadas bem definidas:

```
src/
├── modules/                          # Módulos da aplicação
│   ├── auth/                         # Módulo de autenticação
│   │   ├── domain/                   # Lógica de negócio
│   │   │   └── interfaces/           # Contratos e interfaces
│   │   ├── guards/                   # Guards de autenticação
│   │   └── auth.module.ts
│   │
│   ├── database/                     # Módulo de banco de dados
│   │   └── database.module.ts        # Configuração do Sequelize
│   │
│   └── generate-schedule/            # Módulo principal de geração de horários
│       ├── application/              # Camada de aplicação
│       │   ├── use-cases/            # Casos de uso
│       │   └── dtos/                 # Data Transfer Objects
│       │
│       ├── domain/                   # Camada de domínio
│       │   ├── entities/             # Entidades de negócio
│       │   ├── enums/                # Enumerações
│       │   ├── types/                # Contratos de repositório e/ou tipos e interfaces do sistema
│       │   └── services/             # Serviços de domínio
│       │       ├── genetic.service.ts
│       │       ├── crossover.service.ts
│       │       ├── mutation.service.ts
│       │       ├── natural-selection.service.ts
│       │       └── score.service.ts
│       │
│       ├── infrastructure/           # Camada de infraestrutura
│       │   ├── controllers/          # Controladores REST
│       │   ├── repositories/         # Implementações de repositórios
│       │   ├── models/               # Modelos Sequelize
│       │   ├── mappers/              # Mapeadores de dados
│       │   └── workers/              # Workers para processamento assíncrono
│       │
│       └── generate-schedule.module.ts
│
├── app.module.ts                     # Módulo raiz
├── app.controller.ts                 # Controlador raiz
├── app.service.ts                    # Serviço raiz
└── main.ts                           # Ponto de entrada da aplicação
```

### Camadas da Arquitetura

#### 1. **Domain (Domínio)**

- Contém a lógica de negócio pura
- Entidades, value objects e interfaces
- Serviços de domínio (algoritmos genéticos)
- Independente de frameworks e tecnologias externas

#### 2. **Application (Aplicação)**

- Casos de uso que orquestram a lógica de negócio
- DTOs para entrada e saída de dados
- Coordena interações entre domínio e infraestrutura

#### 3. **Infrastructure (Infraestrutura)**

- Implementações concretas de repositórios
- Controladores HTTP (REST API)
- Modelos de banco de dados (Sequelize)
- Workers para processamento assíncrono
- Integrações com serviços externos

---

## ⚙️ Instalação e Configuração

### Pré-requisitos

- **Node.js** >= 18.x
- **npm** >= 9.x (ou **yarn/pnpm**)
- **PostgreSQL** >= 13.x
- **Deno** >= 2.x (opcional, para execução alternativa)

### 1. Clone o Repositório

```bash
git clone <repository-url>
cd refactor-asgen-ms-schedule-generate
```

### 2. Instale as Dependências

#### Usando npm:

```bash
npm install
```

#### Usando yarn:

```bash
yarn install
```

#### Usando pnpm:

```bash
pnpm install
```

### 3. Configure as Variáveis de Ambiente

Copie o arquivo de exemplo e configure as variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Configurações da Aplicação
PORT=9000                              # Porta onde a aplicação será executada

# Configurações do Banco de Dados PostgreSQL
DB_HOST=localhost                      # Host do banco de dados
DB_PORT=5432                          # Porta do PostgreSQL
DB_USER=user                          # Usuário do banco de dados
DB_PASS=password                      # Senha do banco de dados
DB_NAME=asgen                         # Nome do banco de dados

# Configurações de API REST Externa
API_REST_URL=localhost:8000           # URL da API REST principal do sistema ASGEN
```

### 4. Configure o Banco de Dados

Certifique-se de que o PostgreSQL está rodando e crie o banco de dados:

```bash
# Acesse o PostgreSQL
psql -U postgres

# Crie o banco de dados
CREATE DATABASE asgen;

# Crie o usuário (se necessário)
CREATE USER user WITH PASSWORD 'password';

# Conceda permissões
GRANT ALL PRIVILEGES ON DATABASE asgen TO user;
```

---

## 🏃 Executando a Aplicação

### Modo Desenvolvimento

#### Com Node.js (npm):

```bash
npm run start:dev
```

#### Com Deno:

```bash
deno task start:dev
```

A aplicação estará disponível em: `http://localhost:9000/api`

### Modo Produção

#### Compilar o projeto:

```bash
npm run build
# ou
deno task build
```

#### Executar em produção:

```bash
npm run start:prod
# ou
deno task start:prod
```

### Modo Debug

```bash
npm run start:debug
```

---

## 🔨 Opções de Build

### Scripts Disponíveis

| Script          | Descrição                                     | Comando               |
| --------------- | --------------------------------------------- | --------------------- |
| **build**       | Compila o projeto TypeScript para JavaScript  | `npm run build`       |
| **start**       | Inicia a aplicação em modo normal             | `npm start`           |
| **start:dev**   | Inicia em modo desenvolvimento com hot-reload | `npm run start:dev`   |
| **start:debug** | Inicia em modo debug                          | `npm run start:debug` |
| **start:prod**  | Inicia a aplicação compilada em modo produção | `npm run start:prod`  |
| **lint**        | Executa o linter (ESLint) e corrige problemas | `npm run lint`        |
| **format**      | Formata o código com Prettier                 | `npm run format`      |
| **test**        | Executa os testes unitários                   | `npm test`            |
| **test:watch**  | Executa testes em modo watch                  | `npm run test:watch`  |
| **test:cov**    | Executa testes com cobertura de código        | `npm run test:cov`    |
| **test:e2e**    | Executa testes end-to-end                     | `npm run test:e2e`    |

### Build com Deno

```bash
# Desenvolvimento
deno task start:dev

# Verificação de tipos
deno task check

# Produção
deno task build
deno task start:prod
```

### Build para Docker (Futuro)

```bash
# Construir imagem
docker build -t asgen-schedule-generate .

# Executar container
docker run -p 9000:9000 --env-file .env asgen-schedule-generate
```

---

## 🧪 Testes

### Executar Testes Unitários

```bash
npm test
```

### Executar com Cobertura

```bash
npm run test:cov
```

### Executar Testes E2E

```bash
npm run test:e2e
```

### Executar em Modo Watch

```bash
npm run test:watch
```

---

## 📊 Trabalho Realizado

### ✅ Funcionalidades Implementadas

1. **Arquitetura Limpa**
   - Separação clara de responsabilidades em camadas
   - Inversão de dependências
   - Testabilidade e manutenibilidade

2. **Algoritmo Genético**
   - Implementação completa do algoritmo genético para otimização de horários
   - Serviços especializados:
     - `GeneticService`: Orquestração do algoritmo
     - `CrossoverService`: Operador de cruzamento
     - `MutationService`: Operador de mutação
     - `NaturalSelectionService`: Seleção natural
     - `ScoreService`: Função de aptidão (fitness)

3. **Módulos Principais**
   - **Auth Module**: Autenticação e autorização com guards
   - **Database Module**: Configuração e gerenciamento do banco de dados
   - **Generate Schedule Module**: Lógica principal de geração de horários

4. **Repositórios**
   - `CourseRepository`: Gerenciamento de cursos
   - `TeacherRepository`: Gerenciamento de professores
   - `SubjectRepository`: Gerenciamento de disciplinas
   - `ClassroomRepository`: Gerenciamento de salas
   - `TimetableRepository`: Gerenciamento de horários

5. **Workers Assíncronos**
   - Processamento em background para geração de horários
   - Gerenciamento de filas de processamento

6. **API REST**
   - Endpoints para geração e consulta de horários
   - Validação de entrada com DTOs
   - Tratamento de erros

7. **Integração com Banco de Dados**
   - Modelos Sequelize para todas as entidades
   - Migrações e seeders (se aplicável)
   - Relacionamentos entre entidades

### 🔧 Refatorações Realizadas

- Migração de arquitetura monolítica para microsserviço
- Implementação de padrões de design (Repository, Factory, Strategy)
- Adoção de TypeScript strict mode
- Configuração de linting e formatação
- Suporte dual para Node.js e Deno

---

## 🔮 Possíveis Trabalhos Futuros

### Curto Prazo

1. **Testes**
   - [ ] Aumentar cobertura de testes unitários para 80%+
   - [ ] Implementar testes de integração completos
   - [ ] Adicionar testes E2E para fluxos principais

2. **Documentação**
   - [ ] Documentação da API com Swagger/OpenAPI
   - [ ] Diagramas de arquitetura detalhados
   - [ ] Guia de contribuição

3. **Performance**
   - [ ] Implementar cache (Redis) para consultas frequentes
   - [ ] Otimizar consultas ao banco de dados
   - [ ] Profiling do algoritmo genético

4. **Monitoramento**
   - [ ] Integração com ferramentas de APM (Application Performance Monitoring)
   - [ ] Logging estruturado com Winston ou Pino
   - [ ] Métricas e dashboards (Prometheus + Grafana)

### Médio Prazo

5. **Containerização**
   - [ ] Dockerfile otimizado multi-stage
   - [ ] Docker Compose para ambiente completo
   - [ ] Kubernetes manifests para deploy

6. **CI/CD**
   - [ ] Pipeline de integração contínua
   - [ ] Testes automatizados em PRs
   - [ ] Deploy automatizado

7. **Melhorias no Algoritmo**
   - [ ] Implementar estratégias adaptativas de mutação
   - [ ] Adicionar algoritmos de busca local (hill climbing)
   - [ ] Paralelização do processamento genético

8. **API Melhorias**
   - [ ] Versionamento de API (v1, v2)
   - [ ] Rate limiting
   - [ ] Autenticação JWT aprimorada
   - [ ] WebSockets para atualizações em tempo real

### Longo Prazo

9. **Escalabilidade**
   - [ ] Suporte a múltiplos workers distribuídos
   - [ ] Message broker (RabbitMQ/Kafka) para comunicação entre serviços
   - [ ] Sharding de banco de dados

10. **Machine Learning**
    - [ ] Análise preditiva de conflitos de horário
    - [ ] Recomendação de horários baseada em histórico
    - [ ] Ajuste automático de parâmetros do algoritmo genético

11. **Features Adicionais**
    - [ ] Interface gráfica para visualização de horários
    - [ ] Exportação em múltiplos formatos (PDF, Excel, iCal)
    - [ ] Notificações por email/SMS
    - [ ] Sistema de aprovação de horários

12. **Internacionalização**
    - [ ] Suporte a múltiplos idiomas (i18n)
    - [ ] Suporte a diferentes fusos horários

---

## 🏗️ Padrões de Design Utilizados

- **Repository Pattern**: Abstração da camada de dados
- **Dependency Injection**: Gerenciamento de dependências com NestJS
- **Factory Pattern**: Criação de objetos complexos
- **Strategy Pattern**: Diferentes estratégias para operadores genéticos
- **Observer Pattern**: RxJS para programação reativa
- **Guard Pattern**: Proteção de rotas e autenticação

---

## 📚 Recursos e Documentação

- [Documentação do NestJS](https://docs.nestjs.com)
- [Documentação do Sequelize](https://sequelize.org/docs/v6/)
- [Documentação do Deno](https://deno.land/manual)
- [Algoritmos Genéticos - Teoria](https://en.wikipedia.org/wiki/Genetic_algorithm)

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Commit

Utilize [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: formatação de código
refactor: refatoração de código
test: adiciona ou atualiza testes
chore: tarefas de manutenção
```

---

## 📄 Licença

Este projeto é parte do sistema ASGEN do IFPE e possui licença **UNLICENSED** (uso restrito à instituição).

---

## 👥 Equipe e Contribuidores

**Instituto Federal de Pernambuco (IFPE)**

### Contribuidores do Projeto

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Guilhermevalenca">
        <img src="https://github.com/Guilhermevalenca.png" width="100px;" alt="Guilherme Valença"/><br />
        <sub><b>Guilherme Valença</b></sub>
      </a><br />
      <sub>Desenvolvedor Fullstack e DBA</sub><br />
      <sub>📧 gvrp@discente.ifpe.edu.br</sub>
    </td>
    <td align="center">
      <a href="https://github.com/RodriguesClaudiane">
        <img src="https://github.com/RodriguesClaudiane.png" width="100px;" alt="Claudiane Rodrigues"/><br />
        <sub><b>Claudiane Rodrigues</b></sub>
      </a><br />
      <sub>Desenvolvedora Frontend</sub><br />
      <sub>📧 cra@discente.ifpe.edu.br</sub>
    </td>
    <td align="center">
      <a href="https://github.com/weydsonlino">
        <img src="https://github.com/weydsonlino.png" width="100px;" alt="Weydson Lino"/><br />
        <sub><b>Weydson Lino</b></sub>
      </a><br />
      <sub>Desenvolvedor Backend</sub><br />
      <sub>📧 wls10@discente.ifpe.edu.br</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/JoanaG0mes">
        <img src="https://github.com/JoanaG0mes.png" width="100px;" alt="Joana Gomes"/><br />
        <sub><b>Joana Gomes</b></sub>
      </a><br />
      <sub>Desenvolvedora Frontend</sub><br />
      <sub>📧 jgn@discente.ifpe.edu.br</sub>
    </td>
    <td align="center">
      <a href="https://github.com/lilialnas">
        <img src="https://github.com/lilialnas.png" width="100px;" alt="Liliane Sales"/><br />
        <sub><b>Liliane Sales</b></sub>
      </a><br />
      <sub>Gerente de Projetos</sub><br />
      <sub>📧 liliane.sales@igarassu.ifpe.edu.br</sub>
    </td>
    <td></td>
  </tr>
</table>

---

## 📞 Suporte

Para questões, problemas ou sugestões:

- Abra uma issue no repositório
- Entre em contato com a equipe de desenvolvimento

---

## 🔄 Versionamento

Este projeto segue o [Semantic Versioning](https://semver.org/).

**Versão Atual**: 0.0.1 (Alpha)

---

## 🙏 Agradecimentos

- Comunidade NestJS
- Equipe do IFPE
- Contribuidores do projeto

---

<p align="center">
  Desenvolvido com ❤️ por estudantes e professores do IFPE
</p>
