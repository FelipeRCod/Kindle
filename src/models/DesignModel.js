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

export const CATEGORIES = [
  'Todos',
  'Cientifico ou Tecnico',
  'Manga',
  'Romance',
];

export const FORMAT_FILTERS = ['TODOS', 'KFX', 'EPUB', 'PDF', 'CBZ', 'AZW3'];

export const LOCAL_DICTIONARY = {
  algoritmo: {
    word: 'Algoritmo',
    phonetic: '/al.go.ˈɾit.mu/',
    partOfSpeech: 'substantivo masculino • Ciencia da Computacao',
    definition:
      'Sequencia finita de instrucoes bem definidas e nao ambiguas, executadas sistematicamente para solucionar uma classe de problemas ou realizar um calculo.',
  },
  arquitetura: {
    word: 'Arquitetura MVC (Model-View-Controller)',
    phonetic: '/aʁ.ki.te.ˈtu.ɾɐ/',
    partOfSpeech: 'expressao tecnica • Engenharia de Sistemas',
    definition:
      'Padrao arquitetural que divide o sistema em Model (dados e entidades), View (interface visual responsiva) e Controller (regras de negocio e sincronizacao de estado).',
  },
  alquimia: {
    word: 'Troca Equivalente',
    phonetic: '/ˈtɾɔ.kɐ e.ki.va.ˈlẽ.tʃi/',
    partOfSpeech: 'principio filosofico • Manga & Literatura',
    definition:
      'Lei primordial segundo a qual nada pode ser obtido sem que algo de igual valor seja oferecido em contrapartida.',
  },
  ressaca: {
    word: 'Olhos de Ressaca',
    phonetic: '/ˈɔ.ʎus dʒi ʁe.ˈsa.kɐ/',
    partOfSpeech: 'metafora literaria • Machado de Assis (1899)',
    definition:
      'Expressao consagrada em Dom Casmurro para descrever o olhar magnetico, profundo e misterioso de Capitu, comparavel ao movimento de retorno das ondas do mar.',
  },
};

export function resolveThemePalette(appTheme) {
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
}
