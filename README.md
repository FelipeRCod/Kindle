# Kindle Editorial Digital (MVC) — Atividade Prática 10 (React Native)

Clone interativo e responsivo do aplicativo **Amazon Kindle** desenvolvido em **React Native (Expo)** seguindo estritamente o padrão arquitetural **MVC (Model-View-Controller)**, o ecossistema **[Lyceum](https://github.com/Higino-Neto/Lyceum.git)** e a especificação estética **`designe.md`** (*Editorial Interativo Digital*).

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
│       ├── HomeView.js           # View da Tela 1 — Início & Dashboard de Momentum Lyceum
│       ├── LibraryView.js        # View da Tela 2 — Biblioteca, Pastas e Conversor
│       ├── ReaderView.js         # View da Tela 3 — Leitor Digital Interativo
│       ├── StoreView.js          # View da Tela 4 — Loja / Explorar Catálogo
│       └── ProfileSyncView.js    # View da Tela 5 — Mais, Sincronização & Perfil
├── Tela1.js                      # Ponto de entrada da Tela 1 (conectado à HomeView)
├── Tela2.js                      # Ponto de entrada da Tela 2 (conectado à LibraryView)
├── Tela3.js                      # Ponto de entrada da Tela 3 (conectado à ReaderView)
├── Tela4.js                      # Ponto de entrada da Tela 4 (conectado à StoreView)
├── Tela5.js                      # Ponto de entrada da Tela 5 (conectado à ProfileSyncView)
└── App.js                        # Navegação Híbrida (Bottom Tabs + Native Stack)
```

---

## Detalhamento das Camadas MVC

1. **Camada Model (`src/models/`):**
   - [`src/models/BookModel.js`](./src/models/BookModel.js): Define os 12 livros (*Científico ou Técnico*, *Mangá* e *Romance*), coleções em pastas (`INITIAL_FOLDERS`), registros de leitura (`INITIAL_READING_LOGS`) e funções puras de domínio (`createFolderEntity`, `createReadingLogEntity`, `computeReadingMomentumStats`, `computeLibrarySummary`).
   - [`src/models/DesignModel.js`](./src/models/DesignModel.js): Define os `DESIGN_TOKENS` do `designe.md` (`#704214` Sépia, `#FFFFFF` Branco, `#12100E` Charcoal, `#006400` Verde Escuro, `#4682B4` Azul Antigo, `#800020` Vermelho Borgonha, `#DAA520` Amarelo Queimado), resolvedor de temas e `LOCAL_DICTIONARY`.
2. **Camada Controller (`src/controllers/`):**
   - [`src/controllers/KindleController.js`](./src/controllers/KindleController.js): Centraliza todas as operações entre Models e Views (`toggleFavorite`, `addBookToLibrary`, `removeBookFromLibrary`, `updateBookProgress`, `updateBookMetadata`, `toggleBookmarkOnBook`, `addHighlightToBook`, `createFolder`, `logReadingSession`, `convertBookFormat`, `switchGlobalTheme`).
3. **Camada View (`src/views/` & `Tela1.js` a `Tela5.js`):**
   - [`src/views/HomeView.js`](./src/views/HomeView.js) ([`Tela1.js`](./Tela1.js)): Vitrine Kindle, capa flutuante animada, carrosséis e painel de consistência Lyceum.
   - [`src/views/LibraryView.js`](./src/views/LibraryView.js) ([`Tela2.js`](./Tela2.js)): Gestor de coleções por pastas, filtros de formato (`KFX`, `EPUB`, `PDF`, `CBZ`, `AZW3`) e inspetor de metadados.
   - [`src/views/ReaderView.js`](./src/views/ReaderView.js) ([`Tela3.js`](./Tela3.js)): Leitor interativo multi-abas com ilustrações históricas, destaque de parágrafos, dicionário offline e ajustes tipográficos (`Aa`).
   - [`src/views/StoreView.js`](./src/views/StoreView.js) ([`Tela4.js`](./Tela4.js)): Loja Kindle em layout *zig-zag* editorial com ficha técnica ISBN.
   - [`src/views/ProfileSyncView.js`](./src/views/ProfileSyncView.js) ([`Tela5.js`](./Tela5.js)): Sincronização *Whispersync / USB*, conversor de formatos e seletor global de temas.

---

## Como Executar

### Repositório GitHub (Expo SDK 57)

```bash
npm install --legacy-peer-deps
npx expo start
```

### Expo Snack (Versão SDK 54)

- **Link Direto (Snack SDK 54 — Arquitetura MVC):** [https://snack.expo.dev/vAM-xaMkXNZSX_a1FgdXp](https://snack.expo.dev/vAM-xaMkXNZSX_a1FgdXp)
