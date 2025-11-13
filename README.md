# 🌱 Coleta de Resíduos API

API REST desenvolvida com NestJS para gerenciamento de pontos de descarte de resíduos e rastreamento de atividades de reciclagem.

## 📋 Sobre o Projeto

Sistema backend para facilitar o descarte consciente de resíduos, permitindo o cadastro de pontos de coleta e o registro de descartes realizados por usuários. A API fornece endpoints para criação, consulta e geração de relatórios sobre atividades de reciclagem.

## 🚀 Funcionalidades

- **Gestão de Pontos de Descarte**
  - Cadastro de pontos de coleta (públicos/privados)
  - Geolocalização dos pontos
  - Categorização por tipos de resíduos aceitos
  
- **Registro de Descartes**
  - Rastreamento de descartes por usuário
  - Vinculação com pontos de descarte
  - Histórico completo de atividades

- **Relatórios e Estatísticas**
  - Identificação dos locais mais utilizados
  - Tipos de resíduos mais descartados
  - Total de usuários ativos e pontos de descarte
  - Métricas de crescimento

- **Consultas Avançadas**
  - Filtros por ponto de descarte, tipo de resíduo, usuário e data
  - População automática de dados relacionados

## 🛠️ Tecnologias

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem
- **[MongoDB](https://www.mongodb.com/)** - Banco de dados NoSQL
- **[Mongoose](https://mongoosejs.com/)** - ODM para MongoDB
- **Class Validator & Transformer** - Validação e transformação de dados

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/GabrielFraga962/coleta-residuos-api.git

# Entre no diretório
cd coleta-residuos-api/Web-Mobile

# Instale as dependências
npm install

# Configure as variáveis de ambiente
# Crie um arquivo .env baseado no .env.example
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
MONGODB_URI=sua_connection_string_mongodb
```

## 🚀 Executando o Projeto

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

A API estará disponível em `http://localhost:3000`

## 📚 Documentação da API

### Pontos de Descarte

**POST** `/descarte/pontos`
```json
{
  "nomeLocal": "Ecoponto Central",
  "bairro": "Centro",
  "tipoLocal": "publico",
  "categoriaResiduos": ["papel", "plastico", "vidro"],
  "geolocalizacao": {
    "lat": -23.550520,
    "lon": -46.633308
  }
}
```

### Registros de Descarte

**POST** `/descarte/registros`
```json
{
  "nomeUsuario": "João Silva",
  "pontoDescarteId": "507f1f77bcf86cd799439011",
  "tipoResiduo": "plastico"
}
```

**GET** `/descarte/registros?pontoDescarteId=xxx&tipoResiduo=plastico&nomeUsuario=João&data=2025-11-12`

### Relatórios

**GET** `/descarte/relatorio`

Retorna estatísticas consolidadas do sistema.

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## 📁 Estrutura do Projeto

```
src/
├── descarte/
│   ├── dto/                    # Data Transfer Objects
│   ├── descarte.controller.ts  # Rotas da API
│   ├── descarte.service.ts     # Lógica de negócio
│   ├── descarte.model.ts       # Schemas Mongoose
│   └── descarte.module.ts      # Módulo NestJS
├── app.module.ts               # Módulo principal
└── main.ts                     # Entry point
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto está sob a licença UNLICENSED.

## 👤 Autor

**Gabriel Fraga**
- GitHub: [@GabrielFraga962](https://github.com/GabrielFraga962)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
