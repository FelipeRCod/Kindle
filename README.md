# Kindle Editorial Digital — Atividade Prática 10 (React Native)

Clone interativo e responsivo do aplicativo **Amazon Kindle** desenvolvido em **React Native (Expo)** para a disciplina de **Programação para Dispositivos Móveis II** (FATEC — 5º Semestre DSM), integrando o padrão arquitetural e funcional do ecossistema **[Lyceum](https://github.com/Higino-Neto/Lyceum.git)** e a especificação estética **`designe.md`** (*Editorial Interativo Digital*).

---

## Arquitetura de Telas (`Tela1.js` a `Tela5.js`)

O aplicativo implementa navegação híbrida (`@react-navigation/native`, `@react-navigation/bottom-tabs` e `@react-navigation/native-stack`) distribuída em 5 telas completas na raiz do projeto:

1. **[`Tela1.js`](./Tela1.js) — Início & Dashboard de Momentum (Kindle + Lyceum)**
   - Barra de busca integrada do Kindle e filtros rápidos por categoria (*Científico ou Técnico*, *Mangá*, *Romance*).
   - Hero Editorial com capa flutuante animada a 60fps (`Animated.loop`), barra de progresso da leitura atual e atalhos para o Leitor e Registro de Sessão.
   - Carrosséis horizontais *"Da sua biblioteca"* e *"Para você em Computação, Mangá e Literatura"*.
   - Painel de Consistência Lyceum com ofensiva (*streak*), páginas lidas, tempo acumulado, meta diária e mapa de calor de 28 dias.
2. **[`Tela2.js`](./Tela2.js) — Biblioteca & Gestor de Coleções**
   - Organização em pastas customizáveis (*Engenharia & Dados*, *Coleção Mangá Oriental*, *Clássicos & Romance*), filtros por formato (`KFX`, `EPUB`, `PDF`, `CBZ`, `AZW3`) e alternância entre visualização em Grade e Lista.
   - Inspetor de Metadados completo com edição de notas, conversão de formato e envio direto ao Kindle.
3. **[`Tela3.js`](./Tela3.js) — Leitor Digital Interativo**
   - Barra superior multi-abas para alternar rapidamente entre livros abertos.
   - Ilustrações históricas de alta resolução no cabeçalho de capítulo, paginação animada (`Animated.parallel`), marcador de página e destaque de parágrafos com um toque.
   - Dicionário Offline integrado, Sumário de Capítulos + Caderno de Destaques e painel tipográfico (`Aa`) com temas *Sépia*, *Charcoal OLED* e *Branco Papel*.
4. **[`Tela4.js`](./Tela4.js) — Explorar & Loja Kindle**
   - Catálogo completo combinando livros *Científicos/Técnicos* (React Native, Python, SQL, C#, Algoritmos), *Mangás* (Berserk, Vagabond, Fullmetal Alchemist, Akira) e *Romances* (Dom Casmurro, Orgulho e Preconceito, A Sombra do Vento).
   - Vitrine em layout *zig-zag* editorial, aquisição em 1 clique (*Obter no Kindle* / *Amostra Grátis*) e modal de Ficha Técnica ISBN.
5. **[`Tela5.js`](./Tela5.js) — Mais, Sincronização Kindle & Conversor Lyceum**
   - Seletor global de temas do `designe.md`, ajuste de meta diária de leitura, sincronização *Whispersync / USB* e conversor local de formatos (`EPUB`/`PDF`/`CBZ`/`KFX`/`AZW3`).

---

## Sistema de Design (`designe.md`)

- **Paleta de Cores:** Sépia (`#704214`), Branco (`#FFFFFF`), Preto Charcoal (`#12100E`), Verde Escuro (`#006400`), Azul Antigo (`#4682B4`), Vermelho Borgonha (`#800020`), Amarelo Queimado (`#DAA520`) e Cinza Claro (`#E0E0E0`).
- **Tipografia:** Serifada para títulos e leitura longa, Sans-Serif para controles de interface e Monospace para métricas, páginas e formatos.
- **Ícones:** Exclusivamente ícones vetoriais via `@expo/vector-icons` (`Ionicons`).

---

## Como Executar

### Repositório GitHub (Expo SDK 57)

```bash
npm install --legacy-peer-deps
npx expo start
```

### Expo Snack (SDK 54)

O projeto também está publicado e homologado para execução direta no navegador e Expo Go na versão **SDK 54** via **Snack.expo.dev**:

- **Link Direto (Snack SDK 54):** [https://snack.expo.dev/uGguJ0g8Wl3CeNovblyjP](https://snack.expo.dev/uGguJ0g8Wl3CeNovblyjP)
