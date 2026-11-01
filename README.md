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
│       ├── HomeView.js           # View da Tela Inicial — Início & Dashboard Jade Momentum
│       ├── LibraryView.js        # View da Tela Biblioteca — Pastas, Coleções e Conversor
│       ├── ReaderView.js         # View da Tela Leitor — Leitor Digital Interativo Jade Kindle
│       ├── StoreView.js          # View da Tela Explorar — Loja / Catálogo Jade Kindle
│       └── ProfileSyncView.js    # View da Tela Mais — Sincronização, Temas & Perfil
├── Tela_Inicial.js               # Tela Inicial (conectada à HomeView)
├── Tela_Biblioteca.js            # Tela da Biblioteca (conectada à LibraryView)
├── Tela_Leitor.js                # Tela do Leitor Digital (conectada à ReaderView)
├── Tela_Explorar.js              # Tela Explorar / Loja (conectada à StoreView)
├── Tela_Mais.js                  # Tela Mais / Perfil & Sincronização (conectada à ProfileSyncView)
└── App.js                        # Navegação Híbrida (Bottom Tabs + Native Stack)
```

---

## Detalhamento das Camadas MVC

1. **Camada Model (`src/models/`):**
   - [`src/models/BookModel.js`](./src/models/BookModel.js): Define os 12 livros (*Científico ou Técnico*, *Mangá* e *Romance*), coleções em pastas (`INITIAL_FOLDERS`), registros de leitura (`INITIAL_READING_LOGS`) e funções puras de domínio (`createFolderEntity`, `createReadingLogEntity`, `computeReadingMomentumStats`, `computeLibrarySummary`).
   - [`src/models/DesignModel.js`](./src/models/DesignModel.js): Define os `DESIGN_TOKENS` do `designe.md` (`#704214` Sépia, `#FFFFFF` Branco, `#12100E` Charcoal, `#006400` Verde Escuro, `#4682B4` Azul Antigo, `#800020` Vermelho Borgonha, `#DAA520` Amarelo Queimado), resolvedor de temas e `LOCAL_DICTIONARY`.
2. **Camada Controller (`src/controllers/`):**
   - [`src/controllers/KindleController.js`](./src/controllers/KindleController.js): Centraliza todas as operações entre Models e Views (`toggleFavorite`, `addBookToLibrary`, `removeBookFromLibrary`, `updateBookProgress`, `updateBookMetadata`, `toggleBookmarkOnBook`, `addHighlightToBook`, `createFolder`, `logReadingSession`, `convertBookFormat`, `switchGlobalTheme`).
3. **Camada View (`src/views/` & Telas na Raiz):**
   - [`Tela_Inicial.js`](./Tela_Inicial.js) ([`src/views/HomeView.js`](./src/views/HomeView.js)): Vitrine Jade Kindle, capa flutuante animada, carrosséis e painel de consistência Jade Momentum.
   - [`Tela_Biblioteca.js`](./Tela_Biblioteca.js) ([`src/views/LibraryView.js`](./src/views/LibraryView.js)): Gestor de coleções por pastas, filtros de formato (`KFX`, `EPUB`, `PDF`, `CBZ`, `AZW3`) e inspetor de metadados.
   - [`Tela_Leitor.js`](./Tela_Leitor.js) ([`src/views/ReaderView.js`](./src/views/ReaderView.js)): Leitor interativo multi-abas com ilustrações históricas, destaque de parágrafos, dicionário offline e ajustes tipográficos (`Aa`).
   - [`Tela_Explorar.js`](./Tela_Explorar.js) ([`src/views/StoreView.js`](./src/views/StoreView.js)): Loja Jade Kindle em layout *zig-zag* editorial com ficha técnica ISBN.
   - [`Tela_Mais.js`](./Tela_Mais.js) ([`src/views/ProfileSyncView.js`](./src/views/ProfileSyncView.js)): Sincronização *Whispersync / USB*, conversor de formatos e seletor global de temas.

---

## Como Executar

### Repositório GitHub (Expo SDK 57)

```bash
npm install --legacy-peer-deps
npx expo start
```

### Expo Snack (Versão SDK 54)

- **Link Direto (Snack SDK 54 — Jade Kindle MVC):** [https://snack.expo.dev/wemWe1iw6NByiSWWX0exS](https://snack.expo.dev/wemWe1iw6NByiSWWX0exS)
