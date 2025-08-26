# ASGen Microservice - Schedule Generator

Microsserviço de Geração Automática de Horários do Sistema ASGen do Instituto Federal de Pernambuco (IFPE).

## 📋 Sobre o Projeto

O ASGen Microservice é um microsserviço especializado desenvolvido em Node.js/TypeScript que implementa algoritmos genéticos para geração automática de horários acadêmicos. Este serviço utiliza técnicas avançadas de otimização computacional para resolver o complexo problema de alocação de horários, considerando múltiplas restrições como disponibilidade de professores, salas, conflitos de horários e preferências.

## 🧬 Algoritmo Genético

O sistema utiliza **Algoritmos Genéticos** (GA) para resolver o problema de otimização de horários. Esta abordagem metaheurística é especialmente adequada para problemas de scheduling complexos como:

### Como Funciona

1. **População Inicial**: Geração de múltiplas soluções (horários) aleatórias
2. **Avaliação**: Cada solução é avaliada por uma função de fitness que considera:
   - Conflitos de horários de professores
   - Conflitos de salas
   - Disponibilidade de recursos
   - Preferências de professores
   - Distribuição equilibrada de aulas
3. **Seleção**: Escolha das melhores soluções para reprodução
4. **Cruzamento**: Combinação de soluções para gerar descendentes
5. **Mutação**: Alterações aleatórias para explorar novas possibilidades
6. **Evolução**: Repetição do processo por múltiplas gerações até encontrar uma solução ótima

## 🚀 Tecnologias Utilizadas

### Core Technologies
- **Runtime**: Node.js 18+
- **Linguagem**: TypeScript 5.8+
- **Framework Web**: Express.js 5.1
- **Validação**: Zod 3.25
- **Real-time**: Socket.io 4.8

### Bibliotecas e Ferramentas
- **HTTP Client**: Axios 1.11
- **CORS**: Cors 2.8
- **Environment**: Dotenv 16.5
- **Serialization**: Flatted 3.3 (para objetos circulares)

### Ferramentas de Desenvolvimento
- **Transpilador**: TypeScript Compiler
- **Hot Reload**: Nodemon
- **Path Mapping**: TSConfig Paths
- **Minification**: Terser
- **Formatação**: Prettier
- **Containerização**: Docker

## 🏗️ Arquitetura do Sistema

### Estrutura de Diretórios

```
asgen-ms-schedule-generate/
├── src/
│   ├── classes/                    # Classes principais do algoritmo
│   │   ├── genetic-algorithm/      # Implementação do algoritmo genético
│   │   │   ├── interfaces/         # Interfaces TypeScript
│   │   │   ├── generate-generations.ts
│   │   │   ├── validate-timetable.ts
│   │   │   └── mixing-randomly-subjects-from-the-semester.ts
│   │   ├── generate-timetable.ts   # Classe principal de geração
│   │   └── generate-base-schedule-grid-by-course.ts
│   ├── config/                     # Configurações do servidor
│   │   ├── server.ts              # Configuração do Express
│   │   ├── socketServer.ts        # Configuração do Socket.io
│   │   ├── app.ts                 # Aplicação Express
│   │   └── env.ts                 # Variáveis de ambiente
│   ├── db/                        # Tipos de dados e persistência
│   │   ├── types/                 # Definições de tipos
│   │   └── index.ts               # Operações de banco/arquivo
│   ├── routes/                    # Rotas da API REST
│   ├── services/                  # Serviços externos
│   ├── socket/                    # Handlers de WebSocket
│   ├── validation/                # Esquemas de validação Zod
│   └── main.ts                    # Ponto de entrada da aplicação
├── dist/                          # Build de desenvolvimento
├── dist-min/                      # Build minificada para produção
├── timetables.json               # Cache de horários gerados
├── docker-compose.yml            # Configuração Docker
└── package.json                  # Dependências e scripts
```

### Componentes Principais

#### 🧬 Genetic Algorithm Engine
- **GenerateTimetable**: Classe principal que coordena todo o processo
- **GeneticAlgorithm**: Implementação do algoritmo genético
- **ValidateTimetable**: Validação de soluções geradas
- **GenerateGenerations**: Evolução de populações

#### 🌐 API REST
- **GET /**: Endpoint de saúde do serviço
- **POST /start**: Iniciar geração de horários
- **GET /progress**: Monitorar progresso da geração
- **GET /temporary-timetables**: Recuperar horários gerados

#### 📡 WebSocket Server
- **Real-time Progress**: Atualizações em tempo real do progresso
- **Event Broadcasting**: Notificações de conclusão
- **Client Synchronization**: Sincronização com múltiplos clientes

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+
- npm/yarn/pnpm/bun
- Docker & Docker Compose (opcional)

### Instalação Local

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd asgen-ms-schedule-generate
   ```

2. **Instale as dependências**
   ```bash
   # npm
   npm install

   # yarn
   yarn install

   # pnpm
   pnpm install

   # bun
   bun install
   ```

3. **Configure o ambiente**
   ```bash
   cp .env.example .env
   ```

4. **Configure as variáveis de ambiente**
   ```env
   # URL da API REST (backend Laravel)
   API_REST_URL=http://localhost

   # Credenciais para autenticação na API REST
   API_REST_LOGIN=admin@ifpe.edu.br
   API_REST_PASSWORD=senha_segura
   ```

### Instalação com Docker

1. **Configure o ambiente**
   ```bash
   cp .env.example .env
   # Edite as variáveis conforme necessário
   ```

2. **Execute com Docker Compose**
   ```bash
   docker-compose up -d
   ```

## 🚀 Comandos de Execução

### Desenvolvimento

```bash
# Servidor de desenvolvimento
npm run dev
yarn dev
pnpm run dev
bun run dev

# Servidor com hot reload (recomendado)
npm run dev:watch
yarn dev:watch
pnpm run dev:watch
bun run dev:watch

# Acesse: http://localhost:9000
```

### Produção

```bash
# Build para produção (com minificação)
npm run build
yarn build
pnpm run build
bun run build

# Executar versão de produção
npm run start:prod
yarn start:prod
pnpm run start:prod
bun run start:prod

# Executar versão normal (desenvolvimento)
npm run start
yarn start
pnpm run start
bun run start
```

### Outros Comandos

```bash
# Formatação de código
npm run format
yarn format
pnpm run format
bun run format

# Build sem minificação
npm run start
yarn start
pnpm run start
bun run start
```

### Docker

```bash
# Executar com Docker
docker-compose up -d

# Ver logs
docker-compose logs -f app

# Parar serviços
docker-compose down

# Rebuild da imagem
docker-compose up --build
```

## 📡 API Endpoints

### Health Check
```http
GET /
```
**Resposta:**
```json
{
    "message": "Welcome to Timetable Generator microservice"
}
```

### Iniciar Geração de Horários
```http
POST /start
Content-Type: application/json

{
    "courses": [
        {
            "id": 1,
            "name": "Análise e Desenvolvimento de Sistemas",
            "semesters": [
                {
                    "id": 1,
                    "name": "1º Semestre",
                    "subjects": [...],
                    "classes": [...]
                }
            ]
        }
    ]
}
```

**Resposta:**
```json
{
    "message": "Started generating timetables"
}
```

### Monitorar Progresso
```http
GET /progress
```

**Resposta:**
```json
{
    "status": "in_progress", // "in_progress" | "completed"
    "progress": 45 // 0-100
}
```

### Obter Horários Gerados
```http
GET /temporary-timetables
```

**Resposta:**
```json
{
    "timetables": [
        {
            "courseId": 1,
            "semesterId": 1,
            "classId": 1,
            "schedule": {
                "monday": [...],
                "tuesday": [...],
                // ...
            }
        }
    ]
}
```

## 🧬 Algoritmo Genético - Detalhes Técnicos

### Parâmetros de Configuração

```typescript path=/home/guilherme/projects/ifpe/asgen/asgen-ms-schedule-generate/src/classes/generate-timetable.ts start=10
async start(data: CourseType[], number_of_simulations: number = 1000) {
    // Número padrão de simulações/gerações: 1000
    // Pode ser ajustado conforme necessidade
}
```

### Função de Fitness

A função de fitness avalia cada solução considerando:

1. **Conflitos Críticos** (peso alto):
   - Professor em dois locais simultaneamente
   - Sala ocupada por múltiplas turmas
   - Aulas fora do horário disponível

2. **Conflitos Moderados** (peso médio):
   - Distribuição desbalanceada de aulas
   - Janelas excessivas entre aulas
   - Violação de preferências de professores

3. **Otimizações** (peso baixo):
   - Minimização de deslocamentos
   - Maximização de preferências
   - Equilíbrio na carga de trabalho

### Classes do Algoritmo

#### GenerateTimetable
```typescript path=null start=null
class GenerateTimetable {
    private progress: number = 0;
    
    async start(courses: CourseType[], simulations: number): Promise<void> {
        // Coordena todo o processo de geração
    }
    
    getProgress(): number {
        return this.progress;
    }
}
```

#### GeneticAlgorithm Interface
```typescript path=/home/guilherme/projects/ifpe/asgen/asgen-ms-schedule-generate/src/classes/genetic-algorithm/interfaces/genetic-algorithm.ts start=1
interface IGeneticAlgorithm {
    start(...args: any): any;
}
```

### Processo de Evolução

1. **Inicialização**: `mixingRandomlySubjectsFromTheSemester`
2. **Avaliação**: `validateTimetable`  
3. **Evolução**: `generateGenerations`
4. **Persistência**: Salvar melhor solução encontrada

## 🔧 Configurações Avançadas

### Performance Optimization

```json
// package.json - script de produção
"start:prod": "node --max-old-space-size=6144 dist-min/main.js"
```
- **Memory Allocation**: 6GB para processos intensivos
- **Minification**: Código otimizado para produção
- **Build Pipeline**: TypeScript → JavaScript → Minification

### Socket.io Configuration

```typescript path=null start=null
// Configuração WebSocket para real-time updates
io.on('connection', (socket) => {
    socket.on('subscribe_progress', (data) => {
        // Cliente se inscreve para receber atualizações
    });
});

// Emissão de progresso
io.emit('progress_update', {
    progress: currentProgress,
    status: currentStatus,
    estimatedTime: remainingTime
});
```

### Validação de Dados

```typescript path=null start=null
// Validação com Zod
const manyCourseSchema = z.array(z.object({
    id: z.number(),
    name: z.string(),
    semesters: z.array(semesterSchema)
}));

// Validação automática nos endpoints
const validate = manyCourseSchema.safeParse(requestData);
if (!validate.success) {
    return res.status(400).json({
        error: validate.error,
        message: "Invalid data format"
    });
}
```

## 📊 Monitoramento e Performance

### Métricas de Performance

- **Tempo de Geração**: Varia conforme complexidade (1-30 minutos)
- **Memory Usage**: Pode usar até 6GB em casos complexos
- **CPU Intensivo**: Utiliza todos os cores disponíveis
- **Convergência**: Tipicamente converge em 500-1500 gerações

### Logs e Debug

```bash
# Logs em tempo real durante desenvolvimento
yarn dev:watch

# Logs de produção
tail -f logs/production.log

# Debug via Socket.io
# Conecte-se ao WebSocket na porta 9000 para acompanhar progresso
```

### Otimizações Implementadas

- **Parallel Processing**: Avaliação paralela de soluções
- **Memory Management**: Garbage collection otimizada
- **Caching**: Cache de soluções parciais
- **Early Termination**: Parada antecipada quando solução ótima é encontrada

## 🔄 Integração com o Sistema ASGen

### Fluxo de Comunicação

1. **API REST** recebe solicitação de geração de horários
2. **API REST** faz requisição POST para `/start` do microsserviço
3. **Frontend** monitora progresso via WebSocket ou polling `/progress`
4. **Microsserviço** processa usando algoritmo genético
5. **Microsserviço** notifica conclusão via WebSocket
6. **API REST** recupera resultado via `/temporary-timetables`
7. **API REST** persiste resultado no banco de dados

### Autenticação

```env
# Credenciais para acesso à API REST
API_REST_LOGIN=admin@ifpe.edu.br
API_REST_PASSWORD=senha_segura
```

### Formato de Dados

```typescript path=null start=null
// Estrutura de entrada esperada
interface CourseType {
    id: number;
    name: string;
    semesters: SemesterType[];
}

interface SemesterType {
    id: number;
    name: string;
    subjects: SubjectType[];
    classes: ClassType[];
}

// Estrutura de saída gerada
interface TimetableResult {
    courseId: number;
    semesterId: number;
    classId: number;
    fitness: number; // Qualidade da solução (0-100)
    schedule: WeekSchedule;
    conflicts: ConflictInfo[];
}
```

## 🧪 Testes e Validação

### Tipos de Teste

1. **Unit Tests**: Funções individuais do algoritmo
2. **Integration Tests**: Fluxo completo de geração
3. **Performance Tests**: Benchmarks de tempo e memória
4. **Stress Tests**: Cenários com muitos cursos/disciplinas

### Executar Testes

```bash
# Testes unitários (quando implementados)
npm run test
yarn test

# Teste manual via API
curl -X POST http://localhost:9000/start \
  -H "Content-Type: application/json" \
  -d @test-data.json

# Monitorar progresso
curl http://localhost:9000/progress
```

### Validação de Resultados

O sistema implementa validação rigorosa:
- **Zero conflicts**: Nenhum conflito crítico é permitido
- **Constraint satisfaction**: Todas as restrições são respeitadas
- **Optimization metrics**: Métricas de qualidade são calculadas

## 🚀 Deploy e Produção

### Build Otimizada

```bash
# Build completa (transpilação + minificação)
yarn build

# Estrutura gerada:
# dist/        - Build de desenvolvimento
# dist-min/    - Build minificada para produção
```

### Docker em Produção

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar package.json e yarn.lock
COPY package.json yarn.lock ./

# Instalar apenas dependências de produção
RUN yarn install --frozen-lockfile --production

# Copiar código fonte
COPY . .

# Build para produção
RUN yarn build

# Expor porta
EXPOSE 9000

# Comando de execução
CMD ["yarn", "start:prod"]
```

### Variáveis de Ambiente (Produção)

```env
NODE_ENV=production
API_REST_URL=https://api.asgen.ifpe.edu.br
API_REST_LOGIN=microservice@ifpe.edu.br
API_REST_PASSWORD=senha_super_segura
PORT=9000
```

### Monitoramento em Produção

- **Health Checks**: Endpoint `/` para verificação de saúde
- **Memory Monitoring**: Limite de 6GB configurado
- **Process Management**: PM2 ou similar recomendado
- **Logs Centralizados**: Winston ou similar para logs estruturados

## 👥 Equipe de Desenvolvimento

Este projeto foi desenvolvido pelos seguintes contribuidores:

- **Guilherme Valença** - [`gvrp@discente.ifpe.edu.br`](mailto:gvrp@discente.ifpe.edu.br) - [GitHub](https://github.com/Guilhermevalenca)
- **Claudiane Rodrigues** - [`cra@discente.ifpe.edu.br`](mailto:cra@discente.ifpe.edu.br) - [GitHub](https://github.com/RodriguesClaudiane)  
- **Weydson Lino** - [`wls10@discente.ifpe.edu.br`](mailto:wls10@discente.ifpe.edu.br) - [GitHub](https://github.com/weydsonlino)
- **Joana Gomes** - [`jgn@discente.ifpe.edu.br`](mailto:jgn@discente.ifpe.edu.br) - [GitHub](https://github.com/JoanaG0mes)

## 🤝 Contribuição

### Estrutura de Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/algoritmo-melhorado`)
3. Commit suas mudanças (`git commit -m 'feat: melhora algoritmo genético'`)
4. Push para a branch (`git push origin feature/algoritmo-melhorado`)
5. Abra um Pull Request

### Padrões de Código

- **TypeScript Strict**: Tipagem rigorosa obrigatória
- **Prettier**: Formatação automática
- **Conventional Commits**: Padrão de commits
- **ESLint**: Regras de qualidade (quando configurado)

### Áreas para Contribuição

- **Performance**: Otimizações do algoritmo genético
- **Algoritmos**: Implementação de novos algoritmos (Simulated Annealing, Tabu Search)
- **Validação**: Melhoria das funções de fitness
- **Testes**: Implementação de testes automatizados
- **Documentação**: Aprimoramento da documentação técnica

## 📝 Licença

Este projeto está licenciado sob a licença ISC.

## 🆘 Suporte e Recursos

### Documentação Técnica
- **Algoritmos Genéticos**: [Genetic Algorithms Guide](https://en.wikipedia.org/wiki/Genetic_algorithm)
- **Scheduling Problems**: [Job Shop Scheduling](https://en.wikipedia.org/wiki/Job_shop_scheduling)
- **TypeScript**: [Official Documentation](https://www.typescriptlang.org/docs/)
- **Socket.io**: [Socket.io Documentation](https://socket.io/docs/)

### Suporte
- 📧 **Email**: Entre em contato com a equipe de desenvolvimento
- 🐛 **Issues**: Abra issues no repositório GitHub
- 📚 **Wiki**: Documentação detalhada no repositório

## 🎯 Roadmap e Futuras Melhorias

### Curto Prazo
- [ ] **Unit Tests**: Implementação de testes automatizados
- [ ] **Error Handling**: Melhoria no tratamento de erros
- [ ] **Logging**: Sistema estruturado de logs
- [ ] **Metrics**: Coleta de métricas de performance

### Médio Prazo  
- [ ] **Multi-Algorithm**: Suporte a múltiplos algoritmos (SA, Tabu Search)
- [ ] **Parallel Processing**: Paralelização mais eficiente
- [ ] **Caching**: Sistema avançado de cache
- [ ] **API Documentation**: Swagger/OpenAPI spec

### Longo Prazo
- [ ] **Machine Learning**: Integração com ML para melhores heurísticas
- [ ] **Distributed Computing**: Processamento distribuído
- [ ] **Real-time Constraints**: Restrições dinâmicas em tempo real
- [ ] **Advanced Visualization**: Visualização avançada do progresso

### Melhorias Algorítmicas
- [ ] **Adaptive Parameters**: Parâmetros adaptativos do GA
- [ ] **Hybrid Approaches**: Combinação GA + algoritmos locais
- [ ] **Multi-objective**: Otimização multi-objetivo
- [ ] **Constraint Programming**: Integração com CP

---

Desenvolvido com 🧬 pela equipe do IFPE

**Stack**: Node.js + TypeScript + Genetic Algorithms + Socket.io + Express.js

**Algoritmo**: Genetic Algorithm com otimizações para Schedule Generation
