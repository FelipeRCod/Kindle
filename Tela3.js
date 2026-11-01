import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Animated,
  Modal,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useKindle, DESIGN_TOKENS } from './src/context/KindleContext';

const LOCAL_DICTIONARY = {
  algoritmo: {
    word: 'Algoritmo',
    phonetic: '/al.go.ˈɾit.mu/',
    partOfSpeech: 'substantivo masculino • Ciencia da Computacao',
    definition:
      'Sequencia finita de instrucoes bem definidas e nao ambiguas, executadas sistematicamente para solucionar uma classe de problemas ou realizar um calculo.',
  },
  arquitetura: {
    word: 'Arquitetura de Software',
    phonetic: '/aʁ.ki.te.ˈtu.ɾɐ/',
    partOfSpeech: 'expressao tecnica • Engenharia de Sistemas',
    definition:
      'Organizacao fundamental de um sistema computacional, compreendendo seus componentes, relacoes mutuas, fronteiras de dominio e principios evolutivos.',
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

export default function Tela3({ navigation }) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const {
    books,
    selectedBook,
    setSelectedBookId,
    readerSettings,
    setReaderSettings,
    updateBookProgress,
    toggleBookmarkOnBook,
    addHighlightToBook,
  } = useKindle();

  const [chapterIndex, setChapterIndex] = useState(0);
  const [pageInChapter, setPageInChapter] = useState(0);
  const [settingsModal, setSettingsModal] = useState(false);
  const [tocModal, setTocModal] = useState(false);
  const [dictModal, setDictModal] = useState(false);
  const [selectedDictKey, setSelectedDictKey] = useState('algoritmo');
  const [highlightedParagraphs, setHighlightedParagraphs] = useState({});

  const pageAnimOpacity = useRef(new Animated.Value(1)).current;
  const pageAnimSlide = useRef(new Animated.Value(0)).current;

  const chapters = selectedBook?.chapters || [
    {
      title: 'Capitulo I',
      subtitle: 'Abertura Editorial',
      pages: ['Conteudo interativo carregado no leitor Kindle Lyceum.'],
    },
  ];
  const currentChapter = chapters[chapterIndex] || chapters[0];
  const totalChapterPages = currentChapter.pages.length;
  const currentParagraphText =
    currentChapter.pages[pageInChapter] || currentChapter.pages[0];

  useEffect(() => {
    setChapterIndex(0);
    setPageInChapter(0);
  }, [selectedBook?.id]);

  const animatePageTurn = (direction, callback) => {
    Animated.parallel([
      Animated.timing(pageAnimOpacity, {
        toValue: 0.15,
        duration: 140,
        useNativeDriver: true,
      }),
      Animated.timing(pageAnimSlide, {
        toValue: direction * -22,
        duration: 140,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback();
      pageAnimSlide.setValue(direction * 22);
      Animated.parallel([
        Animated.timing(pageAnimOpacity, {
          toValue: 1,
          duration: 210,
          useNativeDriver: true,
        }),
        Animated.spring(pageAnimSlide, {
          toValue: 0,
          stiffness: 120,
          damping: 20,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleNextPage = () => {
    if (pageInChapter < totalChapterPages - 1) {
      animatePageTurn(1, () => {
        const nextP = pageInChapter + 1;
        setPageInChapter(nextP);
        syncProgress(chapterIndex, nextP);
      });
    } else if (chapterIndex < chapters.length - 1) {
      animatePageTurn(1, () => {
        const nextC = chapterIndex + 1;
        setChapterIndex(nextC);
        setPageInChapter(0);
        syncProgress(nextC, 0);
      });
    }
  };

  const handlePrevPage = () => {
    if (pageInChapter > 0) {
      animatePageTurn(-1, () => {
        const prevP = pageInChapter - 1;
        setPageInChapter(prevP);
        syncProgress(chapterIndex, prevP);
      });
    } else if (chapterIndex > 0) {
      animatePageTurn(-1, () => {
        const prevC = chapterIndex - 1;
        const prevCapPages = chapters[prevC]?.pages?.length || 1;
        setChapterIndex(prevC);
        setPageInChapter(prevCapPages - 1);
        syncProgress(prevC, prevCapPages - 1);
      });
    }
  };

  const syncProgress = (cIdx, pIdx) => {
    const totalSteps = chapters.reduce((acc, c) => acc + c.pages.length, 0);
    let completedSteps = pIdx + 1;
    for (let i = 0; i < cIdx; i += 1) {
      completedSteps += chapters[i].pages.length;
    }
    const percent = Math.min(
      100,
      Math.max(5, Math.round((completedSteps / Math.max(1, totalSteps)) * 100))
    );
    const simulatedPage = Math.max(
      1,
      Math.round((percent / 100) * (selectedBook.totalPages || 200))
    );
    updateBookProgress(selectedBook.id, simulatedPage, percent);
  };

  const readerPalette = (() => {
    if (readerSettings.theme === 'dark') {
      return {
        bg: '#12100E',
        pageBg: '#191613',
        text: '#F2ECE1',
        muted: '#A09486',
        accent: '#DAA520',
        border: '#2E2822',
        highlightBg: 'rgba(218, 165, 32, 0.25)',
      };
    }
    if (readerSettings.theme === 'paper') {
      return {
        bg: '#F2EFE9',
        pageBg: '#FFFFFF',
        text: '#181512',
        muted: '#665E54',
        accent: '#704214',
        border: '#E0DCD3',
        highlightBg: 'rgba(112, 66, 20, 0.16)',
      };
    }
    return {
      bg: '#EFE4CE',
      pageBg: '#FAF3E3',
      text: '#2B1D0E',
      muted: '#6E5236',
      accent: '#704214',
      border: '#D8C39E',
      highlightBg: 'rgba(218, 165, 32, 0.30)',
    };
  })();

  const isBookmarked = selectedBook?.bookmarks?.includes(chapterIndex + 1);
  const paragraphKey = `${selectedBook.id}_${chapterIndex}_${pageInChapter}`;
  const isHighlighted =
    Boolean(highlightedParagraphs[paragraphKey]) ||
    selectedBook?.highlights?.includes(currentParagraphText);

  const toggleParagraphHighlight = () => {
    setHighlightedParagraphs((prev) => ({
      ...prev,
      [paragraphKey]: !prev[paragraphKey],
    }));
    addHighlightToBook(selectedBook.id, currentParagraphText);
  };

  const openBooksTabs = books.filter((b) => b.inLibrary).slice(0, 5);

  return (
    <View style={[styles.container, { backgroundColor: readerPalette.bg }]}>
      <View
        style={[
          styles.readerTopBar,
          {
            backgroundColor: '#161310',
            paddingTop: Platform.OS === 'ios' ? 46 : 32,
          },
        ]}
      >
        <View style={styles.topControlsRow}>
          <TouchableOpacity
            style={styles.topIconBtn}
            onPress={() => navigation.navigate('Tela2')}
          >
            <Ionicons name="arrow-back" size={19} color="#F5EFE6" />
          </TouchableOpacity>

          <View style={styles.topTitleWrap}>
            <Text style={styles.topKicker}>LEITOR INTELIGENTE LYCEUM</Text>
            <Text style={styles.topBookTitle} numberOfLines={1}>
              {selectedBook.title}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.topIconBtn}
            onPress={() =>
              toggleBookmarkOnBook(selectedBook.id, chapterIndex + 1)
            }
          >
            <Ionicons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={19}
              color={isBookmarked ? '#DAA520' : '#F5EFE6'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.topIconBtn}
            onPress={() => setTocModal(true)}
          >
            <Ionicons name="list-outline" size={20} color="#F5EFE6" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.topIconBtn}
            onPress={() => setDictModal(true)}
          >
            <Ionicons name="school-outline" size={19} color="#DAA520" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.topIconBtn}
            onPress={() => setSettingsModal(true)}
          >
            <Text style={styles.aaButtonText}>Aa</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.persistentTabsBar}
        >
          {openBooksTabs.map((tabBook) => {
            const active = tabBook.id === selectedBook.id;
            return (
              <TouchableOpacity
                key={`tab_${tabBook.id}`}
                style={[
                  styles.bookTabPill,
                  active
                    ? { backgroundColor: '#704214', borderColor: '#DAA520' }
                    : {
                        backgroundColor: 'rgba(255,255,255,0.07)',
                        borderColor: 'rgba(255,255,255,0.14)',
                      },
                ]}
                onPress={() => setSelectedBookId(tabBook.id)}
              >
                <Ionicons
                  name="book-outline"
                  size={12}
                  color={active ? '#DAA520' : '#A89E93'}
                />
                <Text
                  style={[
                    styles.bookTabText,
                    { color: active ? '#FFFFFF' : '#CFC6BC' },
                  ]}
                  numberOfLines={1}
                >
                  {tabBook.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.readerBodyScroll}
        contentContainerStyle={[
          styles.readerBodyContent,
          {
            paddingHorizontal: readerSettings.marginHorizontal,
            maxWidth: 860,
            alignSelf: 'center',
            width: '100%',
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.bookPageSheet,
            {
              backgroundColor: readerPalette.pageBg,
              borderColor: readerPalette.border,
              opacity: pageAnimOpacity,
              transform: [{ translateX: pageAnimSlide }],
            },
          ]}
        >
          <View style={styles.pageRunningHeader}>
            <Text
              style={[styles.runningHeaderText, { color: readerPalette.muted }]}
              numberOfLines={1}
            >
              {selectedBook.author.toUpperCase()}
            </Text>
            <Text
              style={[styles.runningHeaderMono, { color: readerPalette.accent }]}
            >
              {selectedBook.format} • CAP. {chapterIndex + 1}/{chapters.length}
            </Text>
          </View>

          <View
            style={[
              styles.historicIllustrationBox,
              { borderColor: readerPalette.border },
            ]}
          >
            <Image
              source={{ uri: selectedBook.historicBannerUrl }}
              style={[
                styles.historicBannerImg,
                { height: isLandscape ? 135 : 155 },
              ]}
              resizeMode="cover"
            />
            <View style={styles.historicCaptionStrip}>
              <Ionicons name="image-outline" size={13} color="#DAA520" />
              <Text style={styles.historicCaptionText} numberOfLines={1}>
                Acervo Editorial em Alta Resolucao • {selectedBook.releaseYear}
              </Text>
            </View>
          </View>

          <Text style={[styles.chapterTitle, { color: readerPalette.text }]}>
            {currentChapter.title}
          </Text>
          <Text style={[styles.chapterSubtitle, { color: readerPalette.muted }]}>
            {currentChapter.subtitle}
          </Text>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={toggleParagraphHighlight}
            style={[
              styles.paragraphPressable,
              isHighlighted && {
                backgroundColor: readerPalette.highlightBg,
                borderLeftWidth: 3,
                borderLeftColor: '#DAA520',
                paddingLeft: 10,
              },
            ]}
          >
            <Text
              style={[
                styles.bookBodyParagraph,
                {
                  color: readerPalette.text,
                  fontSize: readerSettings.fontSize,
                  lineHeight: Math.round(
                    readerSettings.fontSize * readerSettings.lineHeight
                  ),
                  fontFamily:
                    readerSettings.fontFamily === 'serif'
                      ? DESIGN_TOKENS.fonts.serif
                      : DESIGN_TOKENS.fonts.sans,
                },
              ]}
            >
              {currentParagraphText}
            </Text>
          </TouchableOpacity>

          <View style={styles.microInteractionBar}>
            <TouchableOpacity
              style={[
                styles.microChipBtn,
                {
                  backgroundColor: isHighlighted
                    ? '#704214'
                    : 'rgba(112, 66, 20, 0.12)',
                },
              ]}
              onPress={toggleParagraphHighlight}
            >
              <Ionicons
                name={isHighlighted ? 'color-wand' : 'color-wand-outline'}
                size={14}
                color={isHighlighted ? '#FFFFFF' : readerPalette.accent}
              />
              <Text
                style={[
                  styles.microChipText,
                  { color: isHighlighted ? '#FFFFFF' : readerPalette.accent },
                ]}
              >
                {isHighlighted ? 'Trecho Destacado' : 'Toque para Destacar'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.microChipBtn,
                { backgroundColor: 'rgba(70, 130, 180, 0.16)' },
              ]}
              onPress={() => setDictModal(true)}
            >
              <Ionicons name="book-outline" size={14} color="#4682B4" />
              <Text style={[styles.microChipText, { color: '#4682B4' }]}>
                Dicionario Embutido
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.pageFooterDivider,
              { borderTopColor: readerPalette.border },
            ]}
          >
            <Text style={[styles.pageFooterMono, { color: readerPalette.muted }]}>
              Secao {pageInChapter + 1} de {totalChapterPages}
            </Text>
            <Text style={[styles.pageFooterMono, { color: readerPalette.accent }]}>
              Progresso Total: {selectedBook.progressPercent}%
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      <View
        style={[
          styles.bottomTurnBar,
          { backgroundColor: '#161310', borderTopColor: '#2E2822' },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.pageTurnButton,
            chapterIndex === 0 && pageInChapter === 0 && { opacity: 0.4 },
          ]}
          disabled={chapterIndex === 0 && pageInChapter === 0}
          onPress={handlePrevPage}
        >
          <Ionicons name="chevron-back" size={18} color="#FFFFFF" />
          <Text style={styles.pageTurnButtonText}>Pagina Anterior</Text>
        </TouchableOpacity>

        <View style={styles.pageIndicatorCenter}>
          <Text style={styles.pageCenterLabel}>
            Pag. {selectedBook.currentPage} / {selectedBook.totalPages}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.pageTurnButton,
            { backgroundColor: '#704214' },
            chapterIndex === chapters.length - 1 &&
              pageInChapter === totalChapterPages - 1 && { opacity: 0.4 },
          ]}
          disabled={
            chapterIndex === chapters.length - 1 &&
            pageInChapter === totalChapterPages - 1
          }
          onPress={handleNextPage}
        >
          <Text style={styles.pageTurnButtonText}>Virar Pagina</Text>
          <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={settingsModal}
        transparent
        animationType="fade"
        onRequestClose={() => setSettingsModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCardDark}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitleLight}>
                Tipografia & Tema de Leitura
              </Text>
              <TouchableOpacity onPress={() => setSettingsModal(false)}>
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.settingSectionLabel}>TEMA DA PAGINA</Text>
            <View style={styles.optionRow}>
              {[
                { id: 'sepia', label: 'Sépia Editorial', bg: '#FAF3E3', fg: '#704214' },
                { id: 'paper', label: 'Branco Papel', bg: '#FFFFFF', fg: '#1A1714' },
                { id: 'dark', label: 'Noturno Charcoal', bg: '#191613', fg: '#DAA520' },
              ].map((t) => (
                <TouchableOpacity
                  key={t.id}
                  style={[
                    styles.themeSelectBtn,
                    {
                      backgroundColor: t.bg,
                      borderColor:
                        readerSettings.theme === t.id ? '#DAA520' : '#3A322B',
                      borderWidth: readerSettings.theme === t.id ? 2.5 : 1,
                    },
                  ]}
                  onPress={() =>
                    setReaderSettings((prev) => ({ ...prev, theme: t.id }))
                  }
                >
                  <Text style={[styles.themeSelectText, { color: t.fg }]}>
                    {t.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.settingSectionLabel}>FAMILIA TIPOGRAFICA</Text>
            <View style={styles.optionRow}>
              {[
                { id: 'serif', label: 'Old Standard Serif' },
                { id: 'sans', label: 'Sans-Serif Interativa' },
              ].map((f) => (
                <TouchableOpacity
                  key={f.id}
                  style={[
                    styles.fontSelectBtn,
                    {
                      backgroundColor:
                        readerSettings.fontFamily === f.id
                          ? '#704214'
                          : '#26211C',
                    },
                  ]}
                  onPress={() =>
                    setReaderSettings((prev) => ({ ...prev, fontFamily: f.id }))
                  }
                >
                  <Text style={styles.fontSelectText}>{f.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.settingSectionLabel}>
              TAMANHO DA FONTE ({readerSettings.fontSize}px)
            </Text>
            <View style={styles.optionRow}>
              <TouchableOpacity
                style={styles.sizeStepBtn}
                onPress={() =>
                  setReaderSettings((prev) => ({
                    ...prev,
                    fontSize: Math.max(14, prev.fontSize - 2),
                  }))
                }
              >
                <Text style={styles.sizeStepText}>A-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sizeStepBtn}
                onPress={() =>
                  setReaderSettings((prev) => ({
                    ...prev,
                    fontSize: Math.min(26, prev.fontSize + 2),
                  }))
                }
              >
                <Text style={styles.sizeStepText}>A+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={tocModal}
        transparent
        animationType="slide"
        onRequestClose={() => setTocModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCardDark}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitleLight}>
                Sumario & Trechos Destacados
              </Text>
              <TouchableOpacity onPress={() => setTocModal(false)}>
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.settingSectionLabel}>CAPITULOS DA OBRA</Text>
            {chapters.map((cap, idx) => (
              <TouchableOpacity
                key={`toc_${idx}`}
                style={[
                  styles.tocItemBtn,
                  chapterIndex === idx && {
                    backgroundColor: '#704214',
                  },
                ]}
                onPress={() => {
                  setChapterIndex(idx);
                  setPageInChapter(0);
                  setTocModal(false);
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.tocItemTitle}>{cap.title}</Text>
                  <Text style={styles.tocItemSubtitle}>{cap.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#DAA520" />
              </TouchableOpacity>
            ))}

            <Text style={[styles.settingSectionLabel, { marginTop: 14 }]}>
              DESTAQUES SALVOS ({selectedBook.highlights?.length || 0})
            </Text>
            {(selectedBook.highlights || []).length === 0 ? (
              <Text style={styles.emptyNoteText}>
                Toque em qualquer paragrafo durante a leitura para salvar um destaque.
              </Text>
            ) : (
              selectedBook.highlights.map((hl, i) => (
                <View key={`hl_${i}`} style={styles.highlightSavedBox}>
                  <Text style={styles.highlightSavedText} numberOfLines={2}>
                    "{hl}"
                  </Text>
                </View>
              ))
            )}
          </View>
        </View>
      </Modal>

      <Modal
        visible={dictModal}
        transparent
        animationType="fade"
        onRequestClose={() => setDictModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCardDark}>
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={styles.topKicker}>BUILT-IN DICTIONARY LYCEUM</Text>
                <Text style={styles.modalTitleLight}>
                  Consulta de Vocabulario Offline
                </Text>
              </View>
              <TouchableOpacity onPress={() => setDictModal(false)}>
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.dictWordsRow}>
              {Object.keys(LOCAL_DICTIONARY).map((key) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.dictTermPill,
                    selectedDictKey === key && { backgroundColor: '#704214' },
                  ]}
                  onPress={() => setSelectedDictKey(key)}
                >
                  <Text style={styles.dictTermPillText}>
                    {LOCAL_DICTIONARY[key].word}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.dictDefinitionCard}>
              <Text style={styles.dictWordHeading}>
                {LOCAL_DICTIONARY[selectedDictKey].word}
              </Text>
              <Text style={styles.dictPhonetic}>
                {LOCAL_DICTIONARY[selectedDictKey].phonetic} •{' '}
                {LOCAL_DICTIONARY[selectedDictKey].partOfSpeech}
              </Text>
              <Text style={styles.dictDefinitionBody}>
                {LOCAL_DICTIONARY[selectedDictKey].definition}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  readerTopBar: {
    paddingHorizontal: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2E2822',
  },
  topControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  topIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#25201B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aaButtonText: {
    color: '#DAA520',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
  },
  topTitleWrap: {
    flex: 1,
    paddingHorizontal: 4,
  },
  topKicker: {
    color: '#DAA520',
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  topBookTitle: {
    color: '#F5EFE6',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
  },
  persistentTabsBar: {
    paddingTop: 10,
    gap: 8,
  },
  bookTabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    maxWidth: 165,
  },
  bookTabText: {
    fontSize: 11,
    fontWeight: '600',
  },
  readerBodyScroll: {
    flex: 1,
  },
  readerBodyContent: {
    paddingVertical: 16,
  },
  bookPageSheet: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 20,
    minHeight: 440,
    shadowColor: '#12100E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  pageRunningHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  runningHeaderText: {
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.9,
    flex: 1,
  },
  runningHeaderMono: {
    fontSize: 10.5,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.mono,
  },
  historicIllustrationBox: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: 16,
  },
  historicBannerImg: {
    width: '100%',
  },
  historicCaptionStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#181512',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  historicCaptionText: {
    color: '#E0E0E0',
    fontSize: 10.5,
    fontFamily: DESIGN_TOKENS.fonts.mono,
  },
  chapterTitle: {
    fontSize: 21,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
    lineHeight: 27,
  },
  chapterSubtitle: {
    fontSize: 13,
    fontStyle: 'italic',
    fontFamily: DESIGN_TOKENS.fonts.serif,
    marginTop: 4,
    marginBottom: 16,
  },
  paragraphPressable: {
    borderRadius: 6,
    paddingVertical: 6,
  },
  bookBodyParagraph: {
    textAlign: 'justify',
  },
  microInteractionBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 18,
  },
  microChipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 6,
  },
  microChipText: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  pageFooterDivider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    marginTop: 22,
    paddingTop: 10,
  },
  pageFooterMono: {
    fontSize: 11,
    fontFamily: DESIGN_TOKENS.fonts.mono,
  },
  bottomTurnBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  pageTurnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#2A231D',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 8,
  },
  pageTurnButtonText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '600',
  },
  pageIndicatorCenter: {
    alignItems: 'center',
  },
  pageCenterLabel: {
    color: '#DAA520',
    fontSize: 11.5,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.mono,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(18, 16, 14, 0.76)',
    justifyContent: 'center',
    padding: 16,
  },
  modalCardDark: {
    backgroundColor: '#1B1714',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#362E27',
    padding: 18,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalTitleLight: {
    color: '#F5EFE6',
    fontSize: 17,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
  },
  settingSectionLabel: {
    color: '#DAA520',
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 6,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  themeSelectBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  themeSelectText: {
    fontSize: 11.5,
    fontWeight: '700',
  },
  fontSelectBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  fontSelectText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  sizeStepBtn: {
    flex: 1,
    backgroundColor: '#2A231D',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  sizeStepText: {
    color: '#F5EFE6',
    fontSize: 14,
    fontWeight: '700',
  },
  tocItemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#25201B',
    marginBottom: 6,
  },
  tocItemTitle: {
    color: '#F5EFE6',
    fontSize: 13.5,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
  },
  tocItemSubtitle: {
    color: '#A89E93',
    fontSize: 11.5,
    marginTop: 2,
  },
  emptyNoteText: {
    color: '#A89E93',
    fontSize: 12,
    fontStyle: 'italic',
  },
  highlightSavedBox: {
    backgroundColor: 'rgba(218, 165, 32, 0.16)',
    borderLeftWidth: 3,
    borderLeftColor: '#DAA520',
    padding: 8,
    borderRadius: 6,
    marginBottom: 6,
  },
  highlightSavedText: {
    color: '#F5EFE6',
    fontSize: 12,
    fontFamily: DESIGN_TOKENS.fonts.serif,
  },
  dictWordsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  dictTermPill: {
    backgroundColor: '#2A231D',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  dictTermPillText: {
    color: '#F5EFE6',
    fontSize: 12,
    fontWeight: '600',
  },
  dictDefinitionCard: {
    backgroundColor: '#241F1A',
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#3A322B',
  },
  dictWordHeading: {
    color: '#DAA520',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
  },
  dictPhonetic: {
    color: '#A89E93',
    fontSize: 11.5,
    fontFamily: DESIGN_TOKENS.fonts.mono,
    marginTop: 3,
    marginBottom: 8,
  },
  dictDefinitionBody: {
    color: '#F5EFE6',
    fontSize: 13.5,
    lineHeight: 20,
    fontFamily: DESIGN_TOKENS.fonts.serif,
  },
});
