# Sistema de TO DO List

Sistema de gerenciamento de tarefas desenvolvido com React, TypeScript e TailwindCSS.

## Tecnologias

- React 18.3.1
- TypeScript 5.6.3
- Vite 5.4.11
- TailwindCSS 3.4.14
- React Router DOM 6.26.2
- TanStack Query 5.59.20
- React Hook Form 7.53.1
- Zod 3.23.8

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── main.tsx           # Ponto de entrada
│   ├── App.tsx            # Componente raiz
│   ├── providers.tsx      # Provedores globais
│   └── router.tsx         # Configuração de rotas
├── core/                  # Componentes e utilitários compartilhados
│   ├── components/        # Componentes genéricos
│   ├── lib/              # Configurações de bibliotecas
│   ├── types/            # Tipos globais
│   └── utils/            # Funções utilitárias
├── domain/               # Domínios de negócio
├── pages/                # Páginas da aplicação
│   └── layouts/          # Layouts compartilhados
└── assets/               # Recursos estáticos
    └── styles/           # Estilos globais
```

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3001`

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Configuração da API

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1
VITE_API_TIMEOUT=30000
```

## Funcionalidades

- ✅ Criação de tarefas com título, descrição, data de vencimento e prioridade
- ✅ Listagem de tarefas
- ✅ Validação de formulários com Zod
- ✅ Gerenciamento de estado com TanStack Query
- ✅ Roteamento com React Router
- ✅ Interface responsiva com TailwindCSS

## Padrões de Código

- Componentes funcionais com TypeScript
- Hooks customizados para lógica de negócio
- Separação clara entre domínios
- Documentação JSDoc em todos os componentes
- Validação de tipos com TypeScript
- Estilização com TailwindCSS

## Licença

MIT