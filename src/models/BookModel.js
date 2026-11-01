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
      'A navegacao fluida e a arquitetura MVC sao a espinha dorsal da experiencia mobile moderna.',
    ],
    bookmarks: [1, 2],
    notes: 'Material base da disciplina Programacao para Dispositivos Moveis II.',
    synopsis:
      'Uma obra completa e interativa sobre arquitetura de aplicacoes moveis multiplataforma utilizando React Native, Expo, padrao MVC, React Navigation, animacoes baseadas em fisica e padroes de design editorial.',
    chapters: [
      {
        title: 'Capitulo I — Do Papel ao Ecra Interativo',
        subtitle: 'A evolucao da leitura digital e das interfaces moveis',
        pages: [
          'O artigo estatico morreu por volta de 2012, quando editores perceberam que o texto digital poderia se mover, responder ao toque e respirar no ritmo do leitor. Nos dispositivos moveis, essa revolucao transformou pequenos ecras em janelas editoriais vivas.',
          'Ao projetar aplicativos em React Native no padrao MVC, separamos com rigor a camada de dados (Model), a apresentacao editorial (View) e as regras de negocio (Controller). O uso consciente da tipografia serifada em contraste com controles sans-serif cria hierarquia imediata e conforto visual prolongado.',
          'Com o React Navigation, a transicao entre contextos — da descoberta de uma obra na vitrine ate o mergulho profundo na pagina de leitura — ocorre com fisica de mola calibrada, respeitando a memoria espacial do usuario.',
        ],
      },
      {
        title: 'Capitulo II — Arquitetura Responsiva e Padrao MVC',
        subtitle: 'Padroes escalaveis para smartphones e tablets',
        pages: [
          'A responsividade real exige que o layout compreenda o espaco disponivel em tempo real. Atraves do hook useWindowDimensions, grades assimetricas colapsam suavemente em telas compactas e se expandem com elegancia no modo paisagem.',
          'No padrao inspirado no ecossistema Lyceum, cada livro carrega consigo metadados vivos no Model: progresso percentual, marcadores de pagina, anotacoes pessoais, formato do arquivo (EPUB, PDF, KFX) e vinculo com pastas organizacionais.',
        ],
      },
      {
        title: 'Capitulo III — Persistencia, Desempenho e Microinteracoes',
        subtitle: 'Garantindo 60 quadros por segundo na virada de pagina',
        pages: [
          'Para alcancar fluidez cinematografica, animamos exclusivamente propriedades de transformacao e opacidade. Quando o leitor vira uma pagina ou destaca um trecho importante em amarelo queimado ou sepia, o feedback visual confirma a acao instantaneamente.',
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
    isbn: '978-85-7522-740-1',
    language: 'Portugues',
    releaseYear: '2025',
    highlights: [
      'Estruturas vetoriais e pipelines reprodutiveis separam experimentos amadores de sistemas em producao.',
    ],
    bookmarks: [0],
    notes: 'Revisar capitulo de embeddings e indexacao semantica.',
    synopsis:
      'Guia aprofundado sobre estruturas de dados em Python, manipulacao vetorial, aprendizado de maquina classico e integracao com modelos fundacionais modernos.',
    chapters: [
      {
        title: 'Capitulo I — Pensamento Vetorial em Python',
        subtitle: 'Da sintaxe limpa ao processamento de alto desempenho',
        pages: [
          'A elegancia do Python reside na sua expressividade quase literaria. Quando combinamos compreensoes de listas, geradores e tensores otimizados em C, obtemos codigo que pode ser lido como prosa cientifica.',
          'Em projetos de ciencia de dados, a clareza estrutural do pipeline determina a velocidade com que hipoteses podem ser testadas, auditadas e apresentadas em relatorios interativos.',
        ],
      },
      {
        title: 'Capitulo II — Arquitetura de Agentes e Modelos',
        subtitle: 'Orquestrando inferencia com baixa latencia',
        pages: [
          'Sistemas inteligentes modernos combinam recuperacao de informacao exata com sintese generativa. A calibracao cuidadosa de contexto garante respostas fundamentadas e verificaveis.',
        ],
      },
    ],
  },
  {
    id: 'book_3',
    title: 'SQL Guia Pratico: Modelagem e Performance Relacional',
    author: 'Carlos Eduardo Heuser & Helena Martins',
    category: 'Cientifico ou Tecnico',
    format: 'PDF',
    fileSize: '3.9 MB',
    rating: 4.7,
    reviews: 295,
    price: 'R$ 39,90',
    inLibrary: true,
    isFavorite: true,
    isSample: false,
    folderId: 'folder_tech',
    currentPage: 145,
    totalPages: 180,
    progressPercent: 81,
    lastOpenedAt: '2026-10-24T10:05:00Z',
    coverUrl: 'https://picsum.photos/seed/sqlguide54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/sqlhist/800/450',
    publisher: 'Bookman Tecnica',
    isbn: '978-85-8260-512-7',
    language: 'Portugues',
    releaseYear: '2024',
    highlights: [
      'Um indice bem desenhado transforma varreduras sequenciais lentas em buscas logaritmicas instantaneas.',
    ],
    bookmarks: [1],
    notes: 'Excelente referencia para otimizacao de queries com CTE e Window Functions.',
    synopsis:
      'Domine consultas analiticas, funcoes de janela, planos de execucao, indexacao B-Tree e normalizacao de bancos de dados relacionais modernos.',
    chapters: [
      {
        title: 'Capitulo I — A Algebra Relacional na Pratica',
        subtitle: 'Fundamentos matematicos das bases de dados modernas',
        pages: [
          'Desde o artigo seminal de Edgar Frank Codd em 1970, o modelo relacional provou ser uma das abstracoes mais duradouras da ciencia da computacao. Declarar o que se deseja obter, e nao como percorrer os ponteiros em disco, libertou gerações de engenheiros.',
          'Consultas bem estruturadas com expressoes de tabela comuns (CTEs) permitem decompor problemas complexos de negocio em etapas logicas cristalinas.',
        ],
      },
    ],
  },
  {
    id: 'book_4',
    title: 'Programacao em C# e Arquitetura Limpa Enterprise',
    author: 'AndersHejlsberg Tribute & Marcos Almeida',
    category: 'Cientifico ou Tecnico',
    format: 'AZW3',
    fileSize: '5.5 MB',
    rating: 4.8,
    reviews: 210,
    price: 'R$ 54,90',
    inLibrary: false,
    isFavorite: false,
    isSample: true,
    folderId: 'folder_tech',
    currentPage: 22,
    totalPages: 290,
    progressPercent: 8,
    lastOpenedAt: '2026-10-19T11:30:00Z',
    coverUrl: 'https://picsum.photos/seed/csharpbook54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/csharphist/800/450',
    publisher: 'Alta Books',
    isbn: '978-85-508-1922-8',
    language: 'Portugues',
    releaseYear: '2025',
    highlights: [],
    bookmarks: [],
    notes: '',
    synopsis:
      'Construcao de microsservicos resilientes, injecao de dependencia, Domain-Driven Design e padroes assincronos com C# e .NET moderno.',
    chapters: [
      {
        title: 'Capitulo I — Tipagem Forte e Expressividade',
        subtitle: 'Evolucao da plataforma .NET e padroes de projeto',
        pages: [
          'A combinacao de seguranca de tipos em tempo de compilacao com recursos funcionais como pattern matching e records eleva a manutencao de sistemas corporativos.',
        ],
      },
    ],
  },
  {
    id: 'book_5',
    title: 'Berserk: A Era de Ouro — Edicao de Luxo Vol. 1',
    author: 'Kentaro Miura',
    category: 'Manga',
    format: 'CBZ',
    fileSize: '48.4 MB',
    rating: 5.0,
    reviews: 1940,
    price: 'R$ 34,90',
    inLibrary: true,
    isFavorite: true,
    isSample: false,
    folderId: 'folder_manga',
    currentPage: 164,
    totalPages: 224,
    progressPercent: 73,
    lastOpenedAt: '2026-10-26T09:15:00Z',
    coverUrl: 'https://picsum.photos/seed/berserkmanga54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/berserkhist/800/450',
    publisher: 'Panini Manga • Hakusensha',
    isbn: '978-85-426-1701-6',
    language: 'Portugues (Leitura Oriental)',
    releaseYear: '2025',
    highlights: [
      'Neste mundo, o destino da humanidade e controlado por alguma entidade ou lei transcendental? Pelo menos e verdade que o homem nao tem controle nem mesmo sobre sua propria vontade.',
    ],
    bookmarks: [0, 1],
    notes: 'Arte hachurada impecavel de Kentaro Miura em alta definicao.',
    synopsis:
      'Guts, o Espadachim Negro, percorre um mundo medieval sombrio enfrentando forcas alem da compreensao humana enquanto busca seu proprio proposito e liberdade.',
    chapters: [
      {
        title: 'Episodio I — O Espadachim Negro',
        subtitle: 'Ferro, cinzas e a marca do sacrificio',
        pages: [
          'A chuva fria batia contra a capa rasgada do viajante solitario. Carregando uma lamina macica de ferro bruto — grande demais, espessa demais e pesada demais para ser chamada de espada —, Guts caminhava contra a corrente do próprio destino.',
          'No contraste dramatico do nanquim preto sobre o papel marfim, cada traco de Kentaro Miura revela a tensao entre a fragilidade humana e a vontade indomavel de sobreviver.',
        ],
      },
      {
        title: 'Episodio II — O Bando do Falcao',
        subtitle: 'Ambição, camaradagem e o sonho de um reino',
        pages: [
          'Sobre a colina banhada pelo sol poente, Griffith observava as muralhas distantes do castelo. Entre espadas cruzadas e juramentos silenciosos, nascia a alianca que mudaria para sempre a historia de Midland.',
        ],
      },
    ],
  },
  {
    id: 'book_6',
    title: 'Vagabond: O Caminho da Espada — Musashi Miyamoto',
    author: 'Takehiko Inoue',
    category: 'Manga',
    format: 'CBZ',
    fileSize: '42.0 MB',
    rating: 4.9,
    reviews: 1420,
    price: 'R$ 36,90',
    inLibrary: true,
    isFavorite: true,
    isSample: false,
    folderId: 'folder_manga',
    currentPage: 88,
    totalPages: 210,
    progressPercent: 42,
    lastOpenedAt: '2026-10-23T22:00:00Z',
    coverUrl: 'https://picsum.photos/seed/vagabondmanga54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/vagabondhist/800/450',
    publisher: 'Kodansha • Edicao Definitiva',
    isbn: '978-85-426-2190-7',
    language: 'Portugues',
    releaseYear: '2025',
    highlights: [
      'Invencivel e apenas uma palavra. Quando voce percebe que ceu e terra respiram no mesmo compasso, nao ha mais inimigos.',
    ],
    bookmarks: [0],
    notes: 'Pinceladas sumi-e de Takehiko Inoue.',
    synopsis:
      'A jornada filosofica e marcial de Shinmen Takezo apos a batalha de Sekigahara, transformando-se no lendario espadachim e artista Miyamoto Musashi.',
    chapters: [
      {
        title: 'Capitulo I — Apos a Tempestade de Sekigahara',
        subtitle: 'O despertar de Shinmen Takezo',
        pages: [
          'Sob o ceu cinzento do Japao feudal em 1600, dois jovens sobreviventes erguem-se em meio ao silencio do campo de batalha. A busca pela forca absoluta logo se revela uma jornada interior de autoconhecimento e serenidade.',
          'Com tracos executados a pincel tradicional japones, a narrativa visual alterna momentos de velocidade fulminante com pausas contemplativas dignas da filosofia Zen.',
        ],
      },
    ],
  },
  {
    id: 'book_7',
    title: 'Fullmetal Alchemist: A Lei da Troca Equivalente',
    author: 'Hiromu Arakawa',
    category: 'Manga',
    format: 'KFX',
    fileSize: '31.5 MB',
    rating: 4.9,
    reviews: 1650,
    price: 'R$ 29,90',
    inLibrary: true,
    isFavorite: false,
    isSample: false,
    folderId: 'folder_manga',
    currentPage: 190,
    totalPages: 192,
    progressPercent: 99,
    lastOpenedAt: '2026-10-21T16:40:00Z',
    coverUrl: 'https://picsum.photos/seed/fmamanga54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/fmahist/800/450',
    publisher: 'Editora JBC • Square Enix',
    isbn: '978-85-457-0288-4',
    language: 'Portugues',
    releaseYear: '2024',
    highlights: [
      'A humanidade nao pode obter nada sem primeiro dar algo em troca. Para obter, algo de valor igual deve ser perdido.',
    ],
    bookmarks: [0],
    notes: 'Volume praticamente concluido.',
    synopsis:
      'Os irmaos Edward e Alphonse Elric percorrem Amestris em busca da Pedra Filosofal para restaurar seus corpos apos uma transmutacao alquimica proibida.',
    chapters: [
      {
        title: 'Capitulo I — Os Dois Alquimistas',
        subtitle: 'Ciencia, fe e o principio da equivalencia',
        pages: [
          'O relogio de prata do Alquimista Federal brilhava sob o sol do deserto de Liore. Para Edward e Alphonse Elric, cada cidade visitada trazia novas pistas sobre a estrutura oculta da materia e sobre o preco das escolhas humanas.',
        ],
      },
    ],
  },
  {
    id: 'book_8',
    title: 'Dom Casmurro — Edicao Comentada & Ilustrada',
    author: 'Machado de Assis',
    category: 'Romance',
    format: 'EPUB',
    fileSize: '2.4 MB',
    rating: 4.9,
    reviews: 2310,
    price: 'Incluso no Kindle',
    inLibrary: true,
    isFavorite: true,
    isSample: false,
    folderId: 'folder_romance',
    currentPage: 128,
    totalPages: 208,
    progressPercent: 61,
    lastOpenedAt: '2026-10-25T21:45:00Z',
    coverUrl: 'https://picsum.photos/seed/domcasmurro54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/riohistoric/800/450',
    publisher: 'Companhia das Letras • Classicos',
    isbn: '978-85-359-2790-0',
    language: 'Portugues',
    releaseYear: '1899 / 2025',
    highlights: [
      'Olhos de ressaca? Va, de ressaca. E o que me da ideia daquela feicao nova. Traziam nao sei que fluido misterioso e energetico, uma forca que arrastava para dentro.',
    ],
    bookmarks: [0, 1],
    notes: 'Obra-prima do Realismo brasileiro com foco no narrador nao confiavel.',
    synopsis:
      'Bento Santiago reconstrói na velhice a casa de sua juventude na Rua de Matacavalos e narra suas memórias de amor, promessa e ciúme ao lado de Capitu e Escobar.',
    chapters: [
      {
        title: 'Capitulo I — Do Titulo e da Rua de Matacavalos',
        subtitle: 'Atando as duas pontas da vida no Engenho Novo',
        pages: [
          'Uma noite destas, vindo da cidade para o Engenho Novo, encontrei no trem da Central um rapaz aqui do bairro, que eu conheco de vista e de chapeu. Cumprimentou-me, sentou-se ao pe de mim, falou da Lua e dos ministros, e acabou recitando-me versos.',
          'O meu fim evidente era atar as duas pontas da vida, e restaurar na velhice a adolescencia. Pois, senhor, nao consegui recompor o que foi nem o que fui. Em tudo, se o rosto e igual, a fisionomia e diferente.',
        ],
      },
      {
        title: 'Capitulo XXXII — Olhos de Ressaca',
        subtitle: 'O enigma do olhar de Capitolina',
        pages: [
          'Tinha-me lembrado a definicao que Jose Dias dera deles, "olhos de cigana obliqua e dissimulada". Eu nao sabia o que era obliqua, mas dissimulada sabia, e queria ver se podiam chamar assim. Capitu deixou-se fitar e examinar.',
        ],
      },
    ],
  },
  {
    id: 'book_9',
    title: 'Orgulho e Preconceito — Edicao Bilingue Anotada',
    author: 'Jane Austen',
    category: 'Romance',
    format: 'KFX',
    fileSize: '3.1 MB',
    rating: 4.9,
    reviews: 3120,
    price: 'R$ 24,90',
    inLibrary: true,
    isFavorite: false,
    isSample: false,
    folderId: 'folder_romance',
    currentPage: 74,
    totalPages: 340,
    progressPercent: 22,
    lastOpenedAt: '2026-10-22T20:10:00Z',
    coverUrl: 'https://picsum.photos/seed/janeausten54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/pemberleyhist/800/450',
    publisher: 'Penguin Companhia',
    isbn: '978-85-63560-15-5',
    language: 'Portugues / Ingles',
    releaseYear: '1813 / 2024',
    highlights: [
      'E uma verdade universalmente reconhecida que um homem solteiro, possuidor de uma boa fortuna, deve estar necessitado de uma esposa.',
    ],
    bookmarks: [0],
    notes: 'Ironia fina e construcao impecavel de dialogos entre Elizabeth Bennet e Mr. Darcy.',
    synopsis:
      'Na Inglaterra rural do inicio do seculo XIX, Elizabeth Bennet e Fitzwilliam Darcy precisam superar primeiras impressoes enganosas, orgulho social e julgamentos apressados.',
    chapters: [
      {
        title: 'Capitulo I — Chegada a Netherfield Park',
        subtitle: 'A sociedade de Longbourn em alvoroco',
        pages: [
          'Quando um jovem de posses se estabelece na vizinhanca de Hertfordshire, as familias locais imediatamente o consideram propriedade legitima de uma de suas filhas. Assim comeca o duelo de espirito e inteligencia entre Elizabeth Bennet e o reservado Sr. Darcy.',
        ],
      },
    ],
  },
  {
    id: 'book_10',
    title: 'A Sombra do Vento — O Cemiterio dos Livros Esquecidos',
    author: 'Carlos Ruiz Zafon',
    category: 'Romance',
    format: 'EPUB',
    fileSize: '4.4 MB',
    rating: 4.9,
    reviews: 1875,
    price: 'R$ 44,90',
    inLibrary: false,
    isFavorite: true,
    isSample: false,
    folderId: 'folder_romance',
    currentPage: 0,
    totalPages: 400,
    progressPercent: 0,
    lastOpenedAt: '2026-10-18T08:00:00Z',
    coverUrl: 'https://picsum.photos/seed/sombradovento54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/barcelonahist/800/450',
    publisher: 'Suma de Letras',
    isbn: '978-85-5651-041-9',
    language: 'Portugues',
    releaseYear: '2024',
    highlights: [
      'Cada livro, cada volume que voce ve, tem alma. A alma de quem o escreveu e a alma dos que o leram e viveram e sonharam com ele.',
    ],
    bookmarks: [],
    notes: '',
    synopsis:
      'Na Barcelona nebulosa de 1945, o jovem Daniel Sempere e levado pelo pai ao secreto Cemiterio dos Livros Esquecidos e escolhe um romance misterioso de Julian Carax.',
    chapters: [
      {
        title: 'Capitulo I — O Cemiterio dos Livros Esquecidos',
        subtitle: 'Barcelona, amanhecer de 1945',
        pages: [
          'Ainda me lembro daquele amanhecer em que meu pai me levou pela primeira vez para visitar o Cemiterio dos Livros Esquecidos. Desfilavamos pelas ruas de uma Barcelona presa sob um ceu de cinzas e um sol de vapor que se derramava sobre a Rambla de Santa Monica.',
        ],
      },
    ],
  },
  {
    id: 'book_11',
    title: 'Akira — Edicao Remasterizada Cyberpunk Vol. 1',
    author: 'Katsuhiro Otomo',
    category: 'Manga',
    format: 'CBZ',
    fileSize: '56.0 MB',
    rating: 4.9,
    reviews: 980,
    price: 'R$ 59,90',
    inLibrary: false,
    isFavorite: false,
    isSample: false,
    folderId: 'folder_manga',
    currentPage: 0,
    totalPages: 362,
    progressPercent: 0,
    lastOpenedAt: '2026-10-15T12:00:00Z',
    coverUrl: 'https://picsum.photos/seed/akiramanga54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/akirahist/800/450',
    publisher: 'Editora JBC • Kodansha',
    isbn: '978-85-457-0310-2',
    language: 'Portugues',
    releaseYear: '2025',
    highlights: [],
    bookmarks: [],
    notes: '',
    synopsis:
      'Em Neo-Tokyo no ano de 2019, Kaneda e Tetsuo se veem no epicentro de um projeto governamental secreto que desperta uma forca psiquica capaz de redefinir a evolucao humana.',
    chapters: [
      {
        title: 'Capitulo I — Rodovia de Neo-Tokyo',
        subtitle: 'Luzes de neon sobre a cratera metropolitana',
        pages: [
          'As motocicletas cortavam o asfalto rachado da antiga baia de Toquio em velocidade alucinante. Entre sirenes e faiscas vermelhas, o destino de Tetsuo colide com o segredo mais bem guardado do seculo.',
        ],
      },
    ],
  },
  {
    id: 'book_12',
    title: 'Algoritmos: Teoria, Grafos e Estruturas Avancadas',
    author: 'Thomas H. Cormen & Charles E. Leiserson',
    category: 'Cientifico ou Tecnico',
    format: 'PDF',
    fileSize: '14.2 MB',
    rating: 5.0,
    reviews: 1520,
    price: 'R$ 89,90',
    inLibrary: false,
    isFavorite: true,
    isSample: false,
    folderId: 'folder_tech',
    currentPage: 0,
    totalPages: 940,
    progressPercent: 0,
    lastOpenedAt: '2026-10-14T08:00:00Z',
    coverUrl: 'https://picsum.photos/seed/clrsalgo54/420/600',
    historicBannerUrl: 'https://picsum.photos/seed/algorithist/800/450',
    publisher: 'Campus Elsevier • MIT Press',
    isbn: '978-85-352-3699-6',
    language: 'Portugues',
    releaseYear: '2025',
    highlights: [],
    bookmarks: [],
    notes: '',
    synopsis:
      'A referencia mundial sobre analise assintotica, estruturas de dados balanceadas, programacao dinamica, algoritmos gulosos e caminhos minimos em grafos.',
    chapters: [
      {
        title: 'Capitulo I — O Papel dos Algoritmos na Computacao',
        subtitle: 'Complexidade de tempo e espaco',
        pages: [
          'Um algoritmo e qualquer procedimento computacional bem definido que toma algum valor ou conjunto de valores como entrada e produz algum valor ou conjunto de valores como saida em tempo finito.',
        ],
      },
    ],
  },
];

export const INITIAL_READING_LOGS = [
  { id: 'log_1', bookId: 'book_1', bookTitle: 'Desenvolvendo Aplicativos Moveis com React Native', category: 'Cientifico ou Tecnico', pages: 34, minutes: 45, date: '2026-10-26' },
  { id: 'log_2', bookId: 'book_5', bookTitle: 'Berserk: A Era de Ouro — Edicao de Luxo Vol. 1', category: 'Manga', pages: 48, minutes: 35, date: '2026-10-25' },
  { id: 'log_3', bookId: 'book_8', bookTitle: 'Dom Casmurro — Edicao Comentada & Ilustrada', category: 'Romance', pages: 26, minutes: 40, date: '2026-10-24' },
  { id: 'log_4', bookId: 'book_2', bookTitle: 'Python para Ciencia de Dados e IA Generativa', category: 'Cientifico ou Tecnico', pages: 42, minutes: 55, date: '2026-10-23' },
  { id: 'log_5', bookId: 'book_6', bookTitle: 'Vagabond: O Caminho da Espada — Musashi Miyamoto', category: 'Manga', pages: 36, minutes: 30, date: '2026-10-22' },
  { id: 'log_6', bookId: 'book_7', bookTitle: 'Fullmetal Alchemist: A Lei da Troca Equivalente', category: 'Manga', pages: 50, minutes: 42, date: '2026-10-21' },
  { id: 'log_7', bookId: 'book_3', bookTitle: 'SQL Guia Pratico: Modelagem e Performance', category: 'Cientifico ou Tecnico', pages: 38, minutes: 50, date: '2026-10-20' },
];

export function createFolderEntity(name) {
  const trimmed = (name || '').trim();
  if (!trimmed) return null;
  return {
    id: `folder_${Date.now()}`,
    name: trimmed,
    parentId: null,
    count: 0,
  };
}

export function createReadingLogEntity({ targetBook, pages, minutes, date }) {
  const numPages = Math.max(1, parseInt(pages, 10) || 15);
  const numMinutes = Math.max(1, parseInt(minutes, 10) || 20);
  return {
    id: `log_${Date.now()}`,
    bookId: targetBook.id,
    bookTitle: targetBook.title,
    category: targetBook.category,
    pages: numPages,
    minutes: numMinutes,
    date: date || '2026-10-26',
  };
}

export function computeReadingMomentumStats(readingLogs, dailyGoalPages) {
  const totalPages = readingLogs.reduce((acc, item) => acc + item.pages, 0);
  const totalMinutes = readingLogs.reduce((acc, item) => acc + item.minutes, 0);
  const uniqueDays = new Set(readingLogs.map((l) => l.date)).size;
  const todayPages = readingLogs[0]?.pages || 0;
  const goalProgress = Math.min(
    100,
    Math.round((todayPages / Math.max(1, dailyGoalPages)) * 100)
  );
  return {
    totalPages,
    totalMinutes,
    streakDays: uniqueDays + 5,
    todayPages,
    goalProgress,
  };
}

export function computeLibrarySummary(books, readingLogs) {
  const libraryCount = books.filter((b) => b.inLibrary).length;
  const favoritesCount = books.filter((b) => b.isFavorite).length;
  const totalHighlights = books.reduce((acc, b) => acc + b.highlights.length, 0);
  const totalPagesRead = readingLogs.reduce((acc, item) => acc + item.pages, 0);
  const totalMinutesRead = readingLogs.reduce((acc, item) => acc + item.minutes, 0);

  const byCategory = {
    'Cientifico ou Tecnico': 0,
    Manga: 0,
    Romance: 0,
  };
  readingLogs.forEach((item) => {
    if (byCategory[item.category] !== undefined) {
      byCategory[item.category] += item.pages;
    }
  });

  return {
    libraryCount,
    favoritesCount,
    totalHighlights,
    totalPagesRead,
    totalMinutesRead,
    byCategory,
  };
}
