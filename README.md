# Jade Kindle — Editorial Digital (MVC) • Atividade Prática 10

Clone interativo e responsivo do aplicativo **Amazon Kindle** batizado como **Jade Kindle**, desenvolvido em **React Native (Expo)** seguindo estritamente o padrão arquitetural **MVC (Model-View-Controller)** e a especificação estética **`designe.md`** (*Editorial Interativo Digital*).

---

## Arquitetura MVC (`src/models`, `src/views`, `src/controllers`)

```text
Kindle/
├── src/
│   ├── models/
│   │   ├── BookModel.js          # Entidades de livros, pastas, sessões e cálculos de domínio
│   │   └── DesignModel.js        # Tokens visuais do designe.md, paletas e dicionário local
│   ├── controllers/
│   │   └── KindleController.js   # Orquestração de estado, regras de negócio e ações MVC
│   └── views/
│       ├── Tela_Inicial.js       # View de Início & Dashboard Jade Momentum
│       ├── Tela_Biblioteca.js    # View de Biblioteca, Pastas, Coleções e Conversor
│       ├── Tela_Leitor.js        # View do Leitor Digital Interativo Jade Kindle
│       ├── Tela_Explorar.js      # View da Loja / Catálogo Jade Kindle
│       └── Tela_Mais.js          # View de Sincronização, Temas & Perfil
├── App.js                        # Navegação Híbrida (Bottom Tabs + Native Stack)
├── index.js                      # Ponto de entrada da aplicação
├── app.json                      # Configuração Expo SDK 57
└── package.json                  # Dependências e scripts
```

---

## Detalhamento das Camadas MVC

1. **Camada Model (`src/models/`):**
   - [`src/models/BookModel.js`](./src/models/BookModel.js): Define os 12 livros (*Científico ou Técnico*, *Mangá* e *Romance*), coleções em pastas (`INITIAL_FOLDERS`), registros de leitura (`INITIAL_READING_LOGS`) e funções puras de domínio (`createFolderEntity`, `createReadingLogEntity`, `computeReadingMomentumStats`, `computeLibrarySummary`).
   - [`src/models/DesignModel.js`](./src/models/DesignModel.js): Define os `DESIGN_TOKENS` do `designe.md` (`#704214` Sépia, `#FFFFFF` Branco, `#12100E` Charcoal, `#006400` Verde Escuro, `#4682B4` Azul Antigo, `#800020` Vermelho Borgonha, `#DAA520` Amarelo Queimado), resolvedor de temas e `LOCAL_DICTIONARY`.
2. **Camada Controller (`src/controllers/`):**
   - [`src/controllers/KindleController.js`](./src/controllers/KindleController.js): Centraliza todas as operações entre Models e Views (`toggleFavorite`, `addBookToLibrary`, `removeBookFromLibrary`, `updateBookProgress`, `updateBookMetadata`, `toggleBookmarkOnBook`, `addHighlightToBook`, `createFolder`, `logReadingSession`, `convertBookFormat`, `switchGlobalTheme`).
3. **Camada View (`src/views/`):**
   - [`src/views/Tela_Inicial.js`](./src/views/Tela_Inicial.js): Vitrine Jade Kindle, capa flutuante animada, carrosséis e painel de consistência Jade Momentum.
   - [`src/views/Tela_Biblioteca.js`](./src/views/Tela_Biblioteca.js): Gestor de coleções por pastas, filtros de formato (`KFX`, `EPUB`, `PDF`, `CBZ`, `AZW3`) e inspetor de metadados.
   - [`src/views/Tela_Leitor.js`](./src/views/Tela_Leitor.js): Leitor interativo multi-abas com ilustrações históricas, destaque de parágrafos, dicionário offline e ajustes tipográficos (`Aa`).
   - [`src/views/Tela_Explorar.js`](./src/views/Tela_Explorar.js): Loja Jade Kindle em layout *zig-zag* editorial com ficha técnica ISBN.
   - [`src/views/Tela_Mais.js`](./src/views/Tela_Mais.js): Sincronização *Whispersync / USB*, conversor de formatos e seletor global de temas.

---

## Como Executar

### Repositório GitHub (Expo SDK 57)

```bash
npm install --legacy-peer-deps
npx expo start
```

### Expo Snack (Versão SDK 54)

- **Link Direto (Snack SDK 54 — Jade Kindle MVC):** [https://snack.expo.dev/pN7bIN5ejKCO5ZfJYC4Dq](https://snack.expo.dev/pN7bIN5ejKCO5ZfJYC4Dq)
