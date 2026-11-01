import React, { createContext, useContext, useState, useMemo } from 'react';
import { Platform } from 'react-native';

export const DESIGN_TOKENS = {
  colors: {
    primary: '#704214',
    primaryLight: '#9A622B',
    primarySoft: 'rgba(112, 66, 20, 0.16)',
    secondary: '#FFFFFF',
    paper: '#FAF6F0',
    paperCard: '#FFFDF9',
    tertiary: '#12100E',
    darkBg: '#0E0D0B',
    darkSurface: '#181512',
    darkCard: '#221E1A',
    neutral: '#006400',
    neutralLight: '#1E8A3E',
    neutralSoft: 'rgba(0, 100, 0, 0.18)',
    surface: '#4682B4',
    surfaceSoft: 'rgba(70, 130, 180, 0.18)',
    accent: '#800020',
    accentSoft: 'rgba(128, 0, 32, 0.18)',
    warning: '#DAA520',
    warningSoft: 'rgba(218, 165, 32, 0.18)',
    borderLight: '#E0E0E0',
    borderDark: '#302A24',
    textDark: '#1A1714',
    textMutedDark: '#6E645A',
    textLight: '#F5EFE6',
    textMutedLight: '#A89E93',
  },
  fonts: {
    serif: Platform.select({
      ios: 'Georgia',
      android: 'serif',
      default: 'Georgia, "Old Standard TT", serif',
    }),
    sans: Platform.select({
      ios: 'System',
      android: 'sans-serif',
      default: 'System, -apple-system, BlinkMacSystemFont, sans-serif',
    }),
    mono: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      default: '"JetBrains Mono", monospace',
    }),
  },
  radius: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    pill: 999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};

export const INITIAL_FOLDERS = [
  { id: 'folder_tech', name: 'Engenharia & Dados', parentId: null, count: 5 },
  { id: 'folder_manga', name: 'Colecao Manga Oriental', parentId: null, count: 4 },
  { id: 'folder_romance', name: 'Classicos & Romance', parentId: null, count: 4 },
];

export const INITIAL_BOOKS = [
  {
    id: 'book_1',
    title: 'Desenvolvendo Aplicativos Moveis com React Native',
    author: 'Jeferson de Souza Dias & Equipe DSM',
    category: 'Cientifico ou Tecnico',
    format: 'KFX',
    fileSize: '4.8 MB',
    rating: 4.9,
    reviews: 412,
    price: 'Incluso no Kindle',
    inLibrary: true,
    isFavorite: true,
    isSample: false,
    folderId: 'folder_tech',
    currentPage: 112,
    totalPages: 240,
    progressPercent: 47,
    lastOpenedAt: '2026-10-26T14:20:00Z',
    coverUrl: 'https://picsum.photos/seed/rnkindle54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/rnhistory/800/450',
    publisher: 'Editora Fatec Press',
    isbn: '978-85-7522-891-0',
    language: 'Portugues',
    releaseYear: '2026',
    highlights: [
      'A navegacao fluida e o gerenciamento de estado sao a espinha dorsal da experiencia mobile moderna.',
    ],
    bookmarks: [1, 2],
    notes: 'Material base da disciplina Programacao para Dispositivos Moveis II.',
    synopsis:
      'Uma obra completa e interativa sobre arquitetura de aplicacoes moveis multiplataforma utilizando React Native, Expo, React Navigation, animacoes baseadas em fisica e padroes de design editorial.',
    chapters: [
      {
        title: 'Capitulo I — Do Papel ao Ecra Interativo',
        subtitle: 'A evolucao da leitura digital e das interfaces moveis',
        pages: [
          'O artigo estatico morreu por volta de 2012, quando editores perceberam que o texto digital poderia se mover, responder ao toque e respirar no ritmo do leitor. Nos dispositivos moveis, essa revolucao transformou pequenos ecras em janelas editoriais vivas.',
          'Ao projetar aplicativos em React Native, nao estamos apenas posicionando botoes na tela; estamos construindo uma narrativa tatil. O uso consciente da tipografia serifada em contraste com controles sans-serif cria hierarquia imediata e conforto visual prolongado.',
          'Com o React Navigation, a transicao entre contextos — da descoberta de uma obra na vitrine ate o mergulho profundo na pagina de leitura — ocorre com fisica de mola calibrada, respeitando a memoria espacial do usuario.',
        ],
      },
      {
        title: 'Capitulo II — Arquitetura Responsiva e Componentizacao',
        subtitle: 'Padroes escalaveis para smartphones e tablets',
        pages: [
          'A responsividade real exige que o layout compreenda o espaco disponivel em tempo real. Através do hook useWindowDimensions, grades assimetricas colapsam suavemente em telas compactas e se expandem com elegancia no modo paisagem.',
          'No padrao inspirado no ecossistema Lyceum, cada livro carrega consigo metadados vivos: progresso percentual, marcadores de pagina, anotacoes pessoais, formato do arquivo (EPUB, PDF, KFX) e vinculo com pastas organizacionais.',
        ],
      },
      {
        title: 'Capitulo III — Persistencia, Desempenho e Microinteracoes',
        subtitle: 'Garantindo 60 quadros por segundo na virada de pagina',
        pages: [
          'Para alcancar fluidez cinematografica, animamos exclusivamente propriedades de transformacao e opacidade. Quando o leitor vira uma pagina ou destaca um trecho importante em amarelo queimado ou sépia, o feedback visual confirma a acao instantaneamente.',
          'Este volume consolida as praticas essenciais para o quinto semestre de Desenvolvimento de Software Multiplataforma, unindo rigor tecnico e acabamento visual de nivel editorial.',
        ],
      },
    ],
  },
  {
    id: 'book_2',
    title: 'Python para Ciencia de Dados e IA Generativa',
    author: 'Luciano Ramalho & Ana Beatriz Costa',
    category: 'Cientifico ou Tecnico',
    format: 'EPUB',
    fileSize: '6.2 MB',
    rating: 4.8,
    reviews: 689,
    price: 'R$ 49,90',
    inLibrary: true,
    isFavorite: false,
    isSample: false,
    folderId: 'folder_tech',
    currentPage: 198,
    totalPages: 320,
    progressPercent: 62,
    lastOpenedAt: '2026-10-25T19:10:00Z',
    coverUrl: 'https://picsum.photos/seed/pythonbook54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/pythonhist/800/450',
    publisher: 'Novatec Editorial',
    isbn: '978-85-7522-742-5',
    language: 'Portugues',
    releaseYear: '2025',
    highlights: [],
    bookmarks: [1],
    notes: 'Excelente referencia sobre estruturas de dados e pipelines.',
    synopsis:
      'Dos fundamentos pythonicos ao processamento de linguagem natural e modelos generativos modernos, com exemplos praticos, metricas de desempenho e visualizacao de dados.',
    chapters: [
      {
        title: 'Capitulo I — Estruturas de Dados Expressivas',
        subtitle: 'Clareza algoritmica e eficiencia em memoria',
        pages: [
          'A linguagem Python consolidou-se como a lingua franca da ciencia contemporanea nao por acaso, mas pela legibilidade quase literaria de sua sintaxe. Codigo claro e lido muito mais vezes do que e escrito.',
          'Compreender compreensoes de listas, geradores e protocolos de iteracao permite processar grandes volumes de informacao mantendo o consumo de recursos sob estrito controle.',
        ],
      },
      {
        title: 'Capitulo II — Redes Neurais e Aprendizado Profundo',
        subtitle: 'Da algebra linear aos transformadores',
        pages: [
          'Por tras de cada modelo capaz de sintetizar textos ou analisar imagens residem operacoes matriciais classicas aliadas a mecanismos de atencao que ponderam o contexto de cada token.',
        ],
      },
    ],
  },
  {
    id: 'book_3',
    title: 'SQL Guia Pratico: Modelagem e Performance',
    author: 'Carlos Eduardo Silveira',
    category: 'Cientifico ou Tecnico',
    format: 'PDF',
    fileSize: '3.4 MB',
    rating: 4.7,
    reviews: 310,
    price: 'R$ 39,90',
    inLibrary: true,
    isFavorite: true,
    isSample: false,
    folderId: 'folder_tech',
    currentPage: 180,
    totalPages: 180,
    progressPercent: 100,
    lastOpenedAt: '2026-10-20T10:00:00Z',
    coverUrl: 'https://picsum.photos/seed/sqlguide54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/sqlhist/800/450',
    publisher: 'Alta Books',
    isbn: '978-85-508-1120-4',
    language: 'Portugues',
    releaseYear: '2024',
    highlights: ['Indices compostos devem respeitar a seletividade das colunas no predicado WHERE.'],
    bookmarks: [],
    notes: 'Livro concluido para revisao de banco de dados relacional.',
    synopsis:
      'Domine consultas analiticas, Window Functions, planos de execucao, indexacao avancada e modelagem relacional para aplicacoes de alta disponibilidade.',
    chapters: [
      {
        title: 'Capitulo I — A Arte da Consulta Declarativa',
        subtitle: 'Pensando em conjuntos em vez de lacos iterativos',
        pages: [
          'Quando escrevemos uma instrucao SQL, descrevemos qual conjunto de dados desejamos obter, delegando ao otimizador do banco de dados a decisao sobre o melhor caminho fisico de acesso.',
          'Dominar expressoes de tabela comuns (CTEs) e funcoes de janela transforma relatorios complexos em blocos modulares, legiveis e faceis de auditar.',
        ],
      },
    ],
  },
  {
    id: 'book_4',
    title: 'Engenharia de Software Moderna: Arquitetura Limpa',
    author: 'Marco Tulio Valente',
    category: 'Cientifico ou Tecnico',
    format: 'AZW3',
    fileSize: '5.1 MB',
    rating: 5.0,
    reviews: 845,
    price: 'R$ 54,90',
    inLibrary: true,
    isFavorite: true,
    isSample: false,
    folderId: 'folder_tech',
    currentPage: 74,
    totalPages: 290,
    progressPercent: 26,
    lastOpenedAt: '2026-10-24T21:15:00Z',
    coverUrl: 'https://picsum.photos/seed/engsoft54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/engsofthist/800/450',
    publisher: 'UFMG Tech Press',
    isbn: '978-65-00-01920-9',
    language: 'Portugues',
    releaseYear: '2025',
    highlights: [],
    bookmarks: [1],
    notes: 'Referencia para separar regras de negocio da camada de interface.',
    synopsis:
      'Principios de projeto, arquitetura hexagonal, DDD, testes automatizados, refatoracao continua e entrega sustentavel de sistemas de software.',
    chapters: [
      {
        title: 'Capitulo I — Separacao de Conceitos e Dominio',
        subtitle: 'Protegendo o coracao do software contra mudancas externas',
        pages: [
          'Sistemas longevos sao aqueles nos quais as regras de negocio nao dependem de detalhes de infraestrutura, bancos de dados ou frameworks de interface grafica.',
          'Ao estabelecer fronteiras claras entre camadas, permitimos que a interface evolua — do desktop para o mobile — sem reescrever a logica essencial.',
        ],
      },
    ],
  },
  {
    id: 'book_5',
    title: 'Algoritmos: Teoria e Pratica Ilustrada',
    author: 'Thomas H. Cormen & Aditya Bhargava',
    category: 'Cientifico ou Tecnico',
    format: 'KFX',
    fileSize: '8.9 MB',
    rating: 4.9,
    reviews: 950,
    price: 'R$ 64,90',
    inLibrary: false,
    isFavorite: false,
    isSample: true,
    folderId: 'folder_tech',
    currentPage: 12,
    totalPages: 410,
    progressPercent: 3,
    lastOpenedAt: null,
    coverUrl: 'https://picsum.photos/seed/algoritmos54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/algohist/800/450',
    publisher: 'Campus Elsevier',
    isbn: '978-85-352-3699-6',
    language: 'Portugues',
    releaseYear: '2025',
    highlights: [],
    bookmarks: [],
    notes: '',
    synopsis:
      'De busca binaria e grafos a programacao dinamica, apresentado com diagramas visuais passo a passo e analise rigorosa de complexidade assintotica.',
    chapters: [
      {
        title: 'Capitulo I — O Papel dos Algoritmos na Computacao',
        subtitle: 'Complexidade de tempo e espaco no mundo real',
        pages: [
          'Um algoritmo e qualquer procedimento computacional bem definido que toma algum valor ou conjunto de valores como entrada e produz algum valor como saida em tempo finito.',
          'Na engenharia moderna, escolher entre uma estrutura de busca logaritmica e uma varredura linear determina se uma interface responde em milissegundos ou trava a experiencia do usuario.',
        ],
      },
    ],
  },
  {
    id: 'book_6',
    title: 'Vagabond: A Lamina sob o Sol Sépia — Vol. 1',
    author: 'Takehiko Inoue',
    category: 'Manga',
    format: 'CBZ',
    fileSize: '18.4 MB',
    rating: 5.0,
    reviews: 1240,
    price: 'R$ 34,90',
    inLibrary: true,
    isFavorite: true,
    isSample: false,
    folderId: 'folder_manga',
    currentPage: 142,
    totalPages: 210,
    progressPercent: 68,
    lastOpenedAt: '2026-10-26T08:40:00Z',
    coverUrl: 'https://picsum.photos/seed/vagabond54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/samuraihist/800/450',
    publisher: 'Panini Manga Classic',
    isbn: '978-85-426-0912-7',
    language: 'Portugues',
    releaseYear: '2025',
    highlights: ['A verdadeira forca nao nasce da pressa da lamina, mas do silencio da mente.'],
    bookmarks: [1, 2],
    notes: 'Arte em nanquim impressionante no modo Sépia.',
    synopsis:
      'Inspirado na vida de Miyamoto Musashi no Japao feudal pos-Sekigahara, uma jornada filosofica e visualmente arrebatedora sobre autodominio, arte e sobrevivencia.',
    chapters: [
      {
        title: 'Ato I — O Campo de Batalha de Sekigahara',
        subtitle: 'Ano de 1600: O despertar de Shinmen Takezo',
        pages: [
          'Sob o ceu carregado de cinzas e chuva fina, dois jovens sobreviventes despertam entre milhares de guerreiros caidos. Takezo empunha sua espada de madeira nao apenas contra inimigos visiveis, mas contra o proprio medo da insignificancia.',
          'Ao longo das estradas poeirentas do periodo Edo, cada duelo revela que a busca pelo titulo de invencivel sob os ceus e, na verdade, um espelho para compreender a fragilidade da vida humana.',
        ],
      },
      {
        title: 'Ato II — O Monge Takuan e o Silencio',
        subtitle: 'Quando a forca bruta encontra a sabedoria',
        pages: [
          'Preso ao antigo cedro do templo, Takezo escuta o vento nas folhas e percebe pela primeira vez a vastidao do mundo alem da violencia. Renascido como Miyamoto Musashi, inicia sua peregrinacao.',
        ],
      },
    ],
  },
  {
    id: 'book_7',
    title: 'Fullmetal Alchemist: A Lei da Troca Equivalente',
    author: 'Hiromu Arakawa',
    category: 'Manga',
    format: 'CBZ',
    fileSize: '14.2 MB',
    rating: 4.9,
    reviews: 1580,
    price: 'R$ 29,90',
    inLibrary: true,
    isFavorite: false,
    isSample: false,
    folderId: 'folder_manga',
    currentPage: 88,
    totalPages: 192,
    progressPercent: 46,
    lastOpenedAt: '2026-10-22T18:00:00Z',
    coverUrl: 'https://picsum.photos/seed/fma54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/alchemyhist/800/450',
    publisher: 'JBC Edicoes',
    isbn: '978-85-457-0211-5',
    language: 'Portugues',
    releaseYear: '2024',
    highlights: [],
    bookmarks: [],
    notes: '',
    synopsis:
      'Os irmaos Edward e Alphonse Elric percorrem o pais de Amestris em busca da lendaria Pedra Filosofal, confrontando os limites entre ciencia, etica e sacrificio.',
    chapters: [
      {
        title: 'Capitulo I — Os Dois Alquimistas sob o Sol',
        subtitle: 'O preco de desafiar as leis naturais',
        pages: [
          'A humanidade nao pode obter nada sem primeiro dar algo em troca. Para criar, algo de valor igual deve ser perdido. Essa e a Primeira Lei da Alquimia: a Troca Equivalente.',
          'Naquela epoca, acreditavamos que essa era a unica verdade absoluta do universo, ate descobrirmos que certas memorias e afetos nao cabem em nenhuma equacao.',
        ],
      },
    ],
  },
  {
    id: 'book_8',
    title: 'Steins;Gate: Cronica das Linhas de Mundo',
    author: 'Chiyomaru Shikura & Yomi Sarachi',
    category: 'Manga',
    format: 'EPUB',
    fileSize: '11.6 MB',
    rating: 4.8,
    reviews: 620,
    price: 'R$ 27,90',
    inLibrary: false,
    isFavorite: false,
    isSample: true,
    folderId: 'folder_manga',
    currentPage: 1,
    totalPages: 176,
    progressPercent: 0,
    lastOpenedAt: null,
    coverUrl: 'https://picsum.photos/seed/steins54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/timehist/800/450',
    publisher: 'JBC Sci-Fi',
    isbn: '978-85-457-0881-0',
    language: 'Portugues',
    releaseYear: '2025',
    highlights: [],
    bookmarks: [],
    notes: '',
    synopsis:
      'Em Akihabara, um pequeno laboratorio de invencoes acidentalmente descobre como enviar mensagens de texto para o passado, alterando a divergencia temporal.',
    chapters: [
      {
        title: 'Prologo — O Prologo do Comeco e do Fim',
        subtitle: 'Divergencia 1.048596%',
        pages: [
          'O universo possui um comeco, mas nao possui um fim. Infinito. As estrelas tambem possuem um comeco, mas seu proprio poder as conduz a destruicao. Finito.',
          'Aquele que carrega a memoria de todas as linhas de mundo caminha sozinho entre segundos que se repetem.',
        ],
      },
    ],
  },
  {
    id: 'book_9',
    title: 'Vinland Saga: Alem do Mar do Norte',
    author: 'Makoto Yukimura',
    category: 'Manga',
    format: 'CBZ',
    fileSize: '16.0 MB',
    rating: 4.9,
    reviews: 890,
    price: 'R$ 32,90',
    inLibrary: false,
    isFavorite: false,
    isSample: false,
    folderId: 'folder_manga',
    currentPage: 1,
    totalPages: 224,
    progressPercent: 0,
    lastOpenedAt: null,
    coverUrl: 'https://picsum.photos/seed/vinland54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/vikinghist/800/450',
    publisher: 'Panini Manga',
    isbn: '978-85-426-1844-0',
    language: 'Portugues',
    releaseYear: '2025',
    highlights: [],
    bookmarks: [],
    notes: '',
    synopsis:
      'No seculo XI, o jovem Thorfinn busca o significado de um verdadeiro guerreiro em meio as navegacoes nordicas e ao sonho de uma terra pacifica chamada Vinland.',
    chapters: [
      {
        title: 'Capitulo I — Um Verdadeiro Guerreiro',
        subtitle: 'As aguas geladas da Islandia',
        pages: [
          'Escute bem, Thorfinn: voce nao tem inimigos. Ninguem neste mundo tem inimigos. Nao existe uma unica pessoa que voce tenha o direito de ferir.',
        ],
      },
    ],
  },
  {
    id: 'book_10',
    title: 'Dom Casmurro — Edicao Comentada Historica',
    author: 'Machado de Assis',
    category: 'Romance',
    format: 'EPUB',
    fileSize: '2.9 MB',
    rating: 4.9,
    reviews: 2150,
    price: 'Incluso no Kindle',
    inLibrary: true,
    isFavorite: true,
    isSample: false,
    folderId: 'folder_romance',
    currentPage: 156,
    totalPages: 208,
    progressPercent: 75,
    lastOpenedAt: '2026-10-25T22:30:00Z',
    coverUrl: 'https://picsum.photos/seed/domcasmurro54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/riohistory1899/800/450',
    publisher: 'Companhia Editorial Classica',
    isbn: '978-85-359-1484-9',
    language: 'Portugues',
    releaseYear: '1899 / 2026',
    highlights: ['Olhos de ressaca: traziam nao sei que fluido misterioso e energetico.'],
    bookmarks: [1],
    notes: 'Narrador em primeira pessoa clássico do Realismo brasileiro.',
    synopsis:
      'Bento Santiago reconstrói na velhice a casa de sua juventude na Rua de Mata-cavalos e narra suas memorias ao lado de Capitu e Escobar, em uma das obras mais sutis da literatura mundial.',
    chapters: [
      {
        title: 'Capitulo I — Do Titulo',
        subtitle: 'Uma noite destas, vindo da cidade para o Engenho Novo',
        pages: [
          'Uma noite destas, vindo da cidade para o Engenho Novo, encontrei no trem da Central um rapaz aqui do bairro, que eu conheco de vista e de chapeu. Cumprimentou-me, sentou-se ao pe de mim, falou da Lua e dos ministros, e acabou recitando-me versos.',
          'No dia seguinte entrou a dizer de mim nomes feios, e acabou alcunhando-me Dom Casmurro. Os vizinhos, que nao gostam dos meus habitos reclusos e calados, deram curso a alcunha, que afinal pegou.',
        ],
      },
      {
        title: 'Capitulo XXXII — Olhos de Ressaca',
        subtitle: 'A definicao poetica de Jose Dias ganhando vida',
        pages: [
          'Tinha-me lembrado a definicao que Jose Dias dera deles, "olhos de cigana obliqua e dissimulada". Eu nao sabia o que era obliqua, mas dissimulada sabia, e queria ver se se podiam chamar assim.',
          'Capitu deixou-se fitar e examinar. Só me perguntava o que era, se nunca os vira; eu nada achei extraordinario; a cor e a docura eram minhas conhecidas. A demora da contemplacao creio que lhe deu outra ideia do meu intento; imaginou que era um pretexto para mirá-los mais de perto.',
        ],
      },
    ],
  },
  {
    id: 'book_11',
    title: 'Orgulho e Preconceito — Edicao Imperial',
    author: 'Jane Austen',
    category: 'Romance',
    format: 'KFX',
    fileSize: '3.7 MB',
    rating: 4.9,
    reviews: 1840,
    price: 'R$ 24,90',
    inLibrary: true,
    isFavorite: false,
    isSample: false,
    folderId: 'folder_romance',
    currentPage: 64,
    totalPages: 310,
    progressPercent: 21,
    lastOpenedAt: '2026-10-19T16:15:00Z',
    coverUrl: 'https://picsum.photos/seed/janeausten54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/pemberleyhist/800/450',
    publisher: 'Penguin Companhia',
    isbn: '978-85-63560-15-5',
    language: 'Portugues',
    releaseYear: '1813 / 2025',
    highlights: [],
    bookmarks: [],
    notes: '',
    synopsis:
      'Na Inglaterra georgiana, o encontro entre a espirituosa Elizabeth Bennet e o reservado Sr. Darcy desencadeia um embate memoravel de ironia, julgamentos apressados e autoconhecimento.',
    chapters: [
      {
        title: 'Capitulo I — Longbourn e Netherfield Park',
        subtitle: 'Uma verdade universalmente reconhecida',
        pages: [
          'E uma verdade universalmente reconhecida que um homem solteiro, possuidor de uma boa fortuna, deve estar necessitado de uma esposa.',
          'Por pouco conhecidos que sejam os sentimentos ou as opinioes de um tal homem ao entrar pela primeira vez numa vizinhanca, esta verdade esta tao fortemente enraizada nas mentes das familias circunvizinhas, que ele e considerado como propriedade legitima de uma ou outra das suas filhas.',
        ],
      },
    ],
  },
  {
    id: 'book_12',
    title: 'A Sombra do Vento: O Cemiterio dos Livros Esquecidos',
    author: 'Carlos Ruiz Zafon',
    category: 'Romance',
    format: 'EPUB',
    fileSize: '5.5 MB',
    rating: 4.9,
    reviews: 1420,
    price: 'R$ 42,90',
    inLibrary: false,
    isFavorite: false,
    isSample: false,
    folderId: 'folder_romance',
    currentPage: 1,
    totalPages: 400,
    progressPercent: 0,
    lastOpenedAt: null,
    coverUrl: 'https://picsum.photos/seed/sombravento54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/barcelonahist/800/450',
    publisher: 'Suma das Letras',
    isbn: '978-85-5651-032-7',
    language: 'Portugues',
    releaseYear: '2024',
    highlights: [],
    bookmarks: [],
    notes: '',
    synopsis:
      'Na Barcelona de 1945, o jovem Daniel Sempere e levado por seu pai livreiro a um lugar secreto no coracao da cidade antiga, onde escolhe um livro que mudara o rumo de sua vida.',
    chapters: [
      {
        title: 'Capitulo I — O Cemiterio dos Livros Esquecidos',
        subtitle: 'Barcelona, manha de 1945',
        pages: [
          'Ainda me lembro daquele amanhecer em que meu pai me levou pela primeira vez para visitar o Cemiterio dos Livros Esquecidos. Desgranavam-se os primeiros dias do verao de 1945 e caminhavamos pelas ruas de uma Barcelona presa sob ceus de cinza.',
          'Cada livro, cada volume que voce ve aqui, tem alma. A alma de quem o escreveu e a alma dos que o leram e viveram e sonharam com ele.',
        ],
      },
    ],
  },
];

export const INITIAL_READING_LOGS = [
  { id: 'log_1', bookId: 'book_1', bookTitle: 'Desenvolvendo Aplicativos Moveis com React Native', category: 'Cientifico ou Tecnico', pages: 34, minutes: 48, date: '2026-10-26' },
  { id: 'log_2', bookId: 'book_6', bookTitle: 'Vagabond: A Lamina sob o Sol Sépia — Vol. 1', category: 'Manga', pages: 42, minutes: 35, date: '2026-10-25' },
  { id: 'log_3', bookId: 'book_10', bookTitle: 'Dom Casmurro — Edicao Comentada Historica', category: 'Romance', pages: 28, minutes: 40, date: '2026-10-24' },
  { id: 'log_4', bookId: 'book_2', bookTitle: 'Python para Ciencia de Dados e IA Generativa', category: 'Cientifico ou Tecnico', pages: 30, minutes: 45, date: '2026-10-23' },
  { id: 'log_5', bookId: 'book_4', bookTitle: 'Engenharia de Software Moderna: Arquitetura Limpa', category: 'Cientifico ou Tecnico', pages: 25, minutes: 38, date: '2026-10-22' },
  { id: 'log_6', bookId: 'book_7', bookTitle: 'Fullmetal Alchemist: A Lei da Troca Equivalente', category: 'Manga', pages: 50, minutes: 42, date: '2026-10-21' },
  { id: 'log_7', bookId: 'book_3', bookTitle: 'SQL Guia Pratico: Modelagem e Performance', category: 'Cientifico ou Tecnico', pages: 38, minutes: 50, date: '2026-10-20' },
];

const KindleContext = createContext(null);

export function KindleProvider({ children }) {
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [folders, setFolders] = useState(INITIAL_FOLDERS);
  const [readingLogs, setReadingLogs] = useState(INITIAL_READING_LOGS);
  const [selectedBookId, setSelectedBookId] = useState('book_1');
  const [appTheme, setAppTheme] = useState('sepia');
  const [readerSettings, setReaderSettings] = useState({
    theme: 'sepia',
    fontSize: 18,
    lineHeight: 1.65,
    fontFamily: 'serif',
    marginHorizontal: 20,
  });
  const [dailyGoalPages, setDailyGoalPages] = useState(40);
  const [syncDeviceName, setSyncDeviceName] = useState('Kindle Paperwhite Signature (USB/Wi-Fi)');

  const selectedBook = useMemo(
    () => books.find((b) => b.id === selectedBookId) || books[0],
    [books, selectedBookId]
  );

  const toggleFavorite = (bookId) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === bookId ? { ...book, isFavorite: !book.isFavorite } : book
      )
    );
  };

  const addBookToLibrary = (bookId, asSample = false) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === bookId
          ? {
              ...book,
              inLibrary: true,
              isSample: asSample,
              lastOpenedAt: new Date().toISOString(),
            }
          : book
      )
    );
  };

  const removeBookFromLibrary = (bookId) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === bookId ? { ...book, inLibrary: false } : book
      )
    );
  };

  const updateBookProgress = (bookId, nextPage, nextPercent) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === bookId
          ? {
              ...book,
              currentPage: nextPage,
              progressPercent: Math.min(100, Math.max(0, nextPercent)),
              lastOpenedAt: new Date().toISOString(),
            }
          : book
      )
    );
  };

  const updateBookMetadata = (bookId, patch) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === bookId ? { ...book, ...patch } : book))
    );
  };

  const toggleBookmarkOnBook = (bookId, chapterIndex) => {
    setBooks((prev) =>
      prev.map((book) => {
        if (book.id !== bookId) return book;
        const exists = book.bookmarks.includes(chapterIndex);
        const nextBookmarks = exists
          ? book.bookmarks.filter((idx) => idx !== chapterIndex)
          : [...book.bookmarks, chapterIndex];
        return { ...book, bookmarks: nextBookmarks };
      })
    );
  };

  const addHighlightToBook = (bookId, textSnippet) => {
    if (!textSnippet) return;
    setBooks((prev) =>
      prev.map((book) => {
        if (book.id !== bookId) return book;
        if (book.highlights.includes(textSnippet)) return book;
        return { ...book, highlights: [...book.highlights, textSnippet] };
      })
    );
  };

  const createFolder = (name) => {
    const trimmed = (name || '').trim();
    if (!trimmed) return;
    const newFolder = {
      id: `folder_${Date.now()}`,
      name: trimmed,
      parentId: null,
      count: 0,
    };
    setFolders((prev) => [...prev, newFolder]);
  };

  const logReadingSession = ({ bookId, pages, minutes, date }) => {
    const targetBook = books.find((b) => b.id === bookId) || selectedBook;
    const numPages = Math.max(1, parseInt(pages, 10) || 15);
    const numMinutes = Math.max(1, parseInt(minutes, 10) || 20);
    const newEntry = {
      id: `log_${Date.now()}`,
      bookId: targetBook.id,
      bookTitle: targetBook.title,
      category: targetBook.category,
      pages: numPages,
      minutes: numMinutes,
      date: date || '2026-10-26',
    };
    setReadingLogs((prev) => [newEntry, ...prev]);
    const nextCurrentPage = Math.min(targetBook.totalPages, targetBook.currentPage + numPages);
    const nextPercent = Math.round((nextCurrentPage / Math.max(1, targetBook.totalPages)) * 100);
    updateBookProgress(targetBook.id, nextCurrentPage, nextPercent);
  };

  const convertBookFormat = (bookId, targetFormat) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === bookId ? { ...book, format: targetFormat } : book
      )
    );
  };

  const palette = useMemo(() => {
    if (appTheme === 'dark') {
      return {
        bg: '#0E0D0B',
        surface: '#181512',
        card: '#221E1A',
        text: '#F5EFE6',
        textMuted: '#A89E93',
        primary: '#704214',
        accent: '#DAA520',
        neutral: '#1E8A3E',
        blue: '#4682B4',
        burgundy: '#800020',
        border: '#302A24',
        headerBg: '#14110E',
      };
    }
    if (appTheme === 'light') {
      return {
        bg: '#FFFFFF',
        surface: '#F6F4F0',
        card: '#FFFFFF',
        text: '#1A1714',
        textMuted: '#6E645A',
        primary: '#704214',
        accent: '#DAA520',
        neutral: '#006400',
        blue: '#4682B4',
        burgundy: '#800020',
        border: '#E0E0E0',
        headerBg: '#704214',
      };
    }
    return {
      bg: '#F7F1E5',
      surface: '#EFE6D5',
      card: '#FFFDF9',
      text: '#1E1610',
      textMuted: '#69533E',
      primary: '#704214',
      accent: '#DAA520',
      neutral: '#006400',
      blue: '#4682B4',
      burgundy: '#800020',
      border: '#DCCB9E',
      headerBg: '#704214',
    };
  }, [appTheme]);

  return (
    <KindleContext.Provider
      value={{
        books,
        folders,
        readingLogs,
        selectedBook,
        selectedBookId,
        setSelectedBookId,
        appTheme,
        setAppTheme,
        palette,
        readerSettings,
        setReaderSettings,
        dailyGoalPages,
        setDailyGoalPages,
        syncDeviceName,
        setSyncDeviceName,
        toggleFavorite,
        addBookToLibrary,
        removeBookFromLibrary,
        updateBookProgress,
        updateBookMetadata,
        toggleBookmarkOnBook,
        addHighlightToBook,
        createFolder,
        logReadingSession,
        convertBookFormat,
      }}
    >
      {children}
    </KindleContext.Provider>
  );
}

export function useKindle() {
  return useContext(KindleContext);
}
