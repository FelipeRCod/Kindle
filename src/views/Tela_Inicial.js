import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKindleController, DESIGN_TOKENS } from '../controllers/KindleController';

export default function Tela_Inicial({ navigation }) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isLandscape = width > height;
  const isTablet = width >= 700;
  const topSafe = Math.max(insets.top + 10, Platform.OS === 'android' ? 46 : 48);

  const {
    books,
    readingLogs,
    selectedBook,
    setSelectedBookId,
    palette,
    appTheme,
    setAppTheme,
    dailyGoalPages,
    toggleFavorite,
    logReadingSession,
  } = useKindleController();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Explorar');
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [logBookId, setLogBookId] = useState(selectedBook?.id || 'book_1');
  const [logPages, setLogPages] = useState('25');
  const [logMinutes, setLogMinutes] = useState('35');
  const [logError, setLogError] = useState('');

  const heroFadeAnim = useRef(new Animated.Value(0)).current;
  const heroSlideAnim = useRef(new Animated.Value(16)).current;
  const coverFloatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heroFadeAnim, {
        toValue: 1,
        duration: 540,
        useNativeDriver: true,
      }),
      Animated.spring(heroSlideAnim, {
        toValue: 0,
        stiffness: 120,
        damping: 20,
        useNativeDriver: true,
      }),
    ]).start();

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(coverFloatAnim, {
          toValue: -6,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(coverFloatAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [heroFadeAnim, heroSlideAnim, coverFloatAnim]);

  const categories = [
    { id: 'Explorar', label: 'Explorar', icon: 'compass-outline' },
    { id: 'Cientifico ou Tecnico', label: 'Cientifico & Tecnico', icon: 'code-slash-outline' },
    { id: 'Manga', label: 'Manga', icon: 'color-palette-outline' },
    { id: 'Romance', label: 'Romance & Classicos', icon: 'heart-outline' },
  ];

  const libraryBooks = books.filter((b) => {
    const matchesSearch =
      !searchQuery.trim() ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'Explorar' || b.category === activeCategory;
    return b.inLibrary && matchesSearch && matchesCategory;
  });

  const recommendedBooks = books.filter((b) => {
    const matchesSearch =
      !searchQuery.trim() ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'Explorar' || b.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPagesRead = readingLogs.reduce((acc, item) => acc + item.pages, 0);
  const totalMinutesRead = readingLogs.reduce((acc, item) => acc + item.minutes, 0);
  const todayPages = readingLogs[0]?.pages || 0;
  const goalProgress = Math.min(100, Math.round((todayPages / Math.max(1, dailyGoalPages)) * 100));

  const heatmapCells = Array.from({ length: 28 }, (_, idx) => {
    const seed = (idx * 7 + totalPagesRead) % 5;
    return seed;
  });

  const handleOpenBookReader = (book) => {
    setSelectedBookId(book.id);
    navigation.navigate('Tela_Leitor', { bookId: book.id });
  };

  const handleSaveReadingLog = () => {
    const pagesNum = parseInt(logPages, 10);
    const minsNum = parseInt(logMinutes, 10);
    if (!pagesNum || pagesNum <= 0) {
      setLogError('Informe uma quantidade valida de paginas lidas.');
      return;
    }
    if (!minsNum || minsNum <= 0) {
      setLogError('Informe o tempo de leitura em minutos.');
      return;
    }
    setLogError('');
    logReadingSession({
      bookId: logBookId,
      pages: pagesNum,
      minutes: minsNum,
      date: '2026-10-26',
    });
    setLogModalVisible(false);
  };

  const cycleTheme = () => {
    if (appTheme === 'sepia') setAppTheme('dark');
    else if (appTheme === 'dark') setAppTheme('light');
    else setAppTheme('sepia');
  };

  const coverCardWidth = isTablet ? 165 : isLandscape ? 145 : 136;

  return (
    <View style={[styles.container, { backgroundColor: palette.bg }]}>
      <View
        style={[
          styles.topHeader,
          {
            backgroundColor: palette.headerBg,
            paddingTop: topSafe,
          },
        ]}
      >
        <View style={styles.searchRow}>
          <TouchableOpacity
            style={styles.headerIconButton}
            onPress={() => navigation.navigate('Tela_Mais')}
            activeOpacity={0.8}
          >
            <Ionicons name="notifications-outline" size={21} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.searchBarBox}>
            <Ionicons name="search-outline" size={18} color="#704214" />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar no Jade Kindle..."
              placeholderTextColor="#8B7355"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color="#704214" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={styles.headerIconButton}
            onPress={cycleTheme}
            activeOpacity={0.8}
          >
            <Ionicons
              name={
                appTheme === 'dark'
                  ? 'moon'
                  : appTheme === 'sepia'
                  ? 'book'
                  : 'sunny'
              }
              size={20}
              color="#DAA520"
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsScrollContent}
        >
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryChip,
                  active
                    ? { backgroundColor: '#DAA520', borderColor: '#DAA520' }
                    : {
                        backgroundColor: 'rgba(255,255,255,0.12)',
                        borderColor: 'rgba(255,255,255,0.28)',
                      },
                ]}
                onPress={() => setActiveCategory(cat.id)}
                activeOpacity={0.85}
              >
                <Ionicons
                  name={cat.icon}
                  size={15}
                  color={active ? '#12100E' : '#FFFFFF'}
                />
                <Text
                  style={[
                    styles.categoryChipText,
                    { color: active ? '#12100E' : '#FFFFFF' },
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={[
          styles.scrollContent,
          { maxWidth: 1280, alignSelf: 'center', width: '100%' },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.heroCard,
            {
              backgroundColor: palette.card,
              borderColor: palette.border,
              opacity: heroFadeAnim,
              transform: [{ translateY: heroSlideAnim }],
              flexDirection: isLandscape || isTablet ? 'row' : 'column',
            },
          ]}
        >
          <View style={styles.heroLeftColumn}>
            <View style={styles.editorialBadge}>
              <Ionicons name="sparkles-outline" size={13} color="#704214" />
              <Text style={styles.editorialBadgeText}>
                JADE KINDLE • DESTAQUE DA ESTANTE
              </Text>
            </View>

            <Text style={[styles.heroTitle, { color: palette.text }]}>
              {selectedBook.title}
            </Text>
            <Text style={[styles.heroAuthor, { color: palette.textMuted }]}>
              {selectedBook.author} • {selectedBook.category}
            </Text>

            <Text
              style={[styles.heroSynopsis, { color: palette.textMuted }]}
              numberOfLines={3}
            >
              {selectedBook.synopsis}
            </Text>

            <View style={styles.heroProgressWrap}>
              <View style={styles.heroProgressRow}>
                <Text style={[styles.monoMetric, { color: palette.primary }]}>
                  PAGINA {selectedBook.currentPage} DE {selectedBook.totalPages}
                </Text>
                <Text style={[styles.monoMetric, { color: palette.neutral }]}>
                  {selectedBook.progressPercent}% CONCLUIDO
                </Text>
              </View>
              <View
                style={[
                  styles.progressBarTrack,
                  { backgroundColor: palette.border },
                ]}
              >
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${selectedBook.progressPercent}%`,
                      backgroundColor: palette.neutral,
                    },
                  ]}
                />
              </View>
            </View>

            <View style={styles.heroActionsRow}>
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  { backgroundColor: DESIGN_TOKENS.colors.primary },
                ]}
                onPress={() => handleOpenBookReader(selectedBook)}
                activeOpacity={0.85}
              >
                <Ionicons name="book-outline" size={17} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Continuar Leitura</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.secondaryButton,
                  { borderColor: palette.primary },
                ]}
                onPress={() => {
                  setLogBookId(selectedBook.id);
                  setLogModalVisible(true);
                }}
                activeOpacity={0.85}
              >
                <Ionicons
                  name="create-outline"
                  size={17}
                  color={palette.primary}
                />
                <Text
                  style={[
                    styles.secondaryButtonText,
                    { color: palette.primary },
                  ]}
                >
                  Registrar Sessao
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.heroRightColumn}>
            <Animated.View
              style={[
                styles.animatedCoverFrame,
                { transform: [{ translateY: coverFloatAnim }] },
              ]}
            >
              <Image
                source={{ uri: selectedBook.coverUrl }}
                style={styles.heroBookCover}
                resizeMode="cover"
              />
              <View style={styles.formatPillOverlay}>
                <Text style={styles.formatPillText}>{selectedBook.format}</Text>
              </View>
            </Animated.View>
          </View>
        </Animated.View>

        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleGroup}>
            <Ionicons name="bookmark" size={18} color={palette.primary} />
            <Text style={[styles.sectionTitle, { color: palette.text }]}>
              Da sua biblioteca
            </Text>
          </View>
          <TouchableOpacity
            style={styles.sectionLinkBtn}
            onPress={() => navigation.navigate('Tela_Biblioteca')}
          >
            <Text style={[styles.sectionLinkText, { color: palette.blue }]}>
              Ver tudo ({libraryBooks.length})
            </Text>
            <Ionicons name="chevron-forward" size={15} color={palette.blue} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalCarousel}
        >
          {libraryBooks.map((book) => (
            <TouchableOpacity
              key={book.id}
              style={[
                styles.bookCardHorizontal,
                {
                  width: coverCardWidth,
                  backgroundColor: palette.card,
                  borderColor: palette.border,
                },
              ]}
              onPress={() => handleOpenBookReader(book)}
              activeOpacity={0.88}
            >
              <View style={styles.coverContainer}>
                <Image
                  source={{ uri: book.coverUrl }}
                  style={styles.cardCoverImage}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={styles.favoriteBadgeBtn}
                  onPress={() => toggleFavorite(book.id)}
                >
                  <Ionicons
                    name={book.isFavorite ? 'heart' : 'heart-outline'}
                    size={15}
                    color={book.isFavorite ? '#DAA520' : '#FFFFFF'}
                  />
                </TouchableOpacity>
                <View style={styles.formatBadgeMini}>
                  <Text style={styles.formatBadgeMiniText}>{book.format}</Text>
                </View>
              </View>

              <View style={styles.cardFooterInfo}>
                <Text
                  style={[styles.cardBookTitle, { color: palette.text }]}
                  numberOfLines={2}
                >
                  {book.title}
                </Text>
                <Text
                  style={[styles.cardBookAuthor, { color: palette.textMuted }]}
                  numberOfLines={1}
                >
                  {book.author}
                </Text>
                <View style={styles.miniProgressTrack}>
                  <View
                    style={[
                      styles.miniProgressFill,
                      {
                        width: `${book.progressPercent}%`,
                        backgroundColor: palette.neutral,
                      },
                    ]}
                  />
                </View>
                <View style={styles.cardMetaBottom}>
                  <Text style={[styles.cardPercentText, { color: palette.textMuted }]}>
                    {book.progressPercent}% lido
                  </Text>
                  {book.progressPercent === 100 && (
                    <Ionicons name="checkmark-circle" size={14} color={palette.neutral} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleGroup}>
            <Ionicons name="layers-outline" size={18} color={palette.blue} />
            <Text style={[styles.sectionTitle, { color: palette.text }]}>
              Para voce em Computacao, Manga e Literatura
            </Text>
          </View>
          <TouchableOpacity
            style={styles.sectionLinkBtn}
            onPress={() => navigation.navigate('Tela_Explorar')}
          >
            <Text style={[styles.sectionLinkText, { color: palette.blue }]}>
              Explorar loja
            </Text>
            <Ionicons name="chevron-forward" size={15} color={palette.blue} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalCarousel}
        >
          {recommendedBooks.map((book) => (
            <TouchableOpacity
              key={`rec_${book.id}`}
              style={[
                styles.bookCardHorizontal,
                {
                  width: coverCardWidth,
                  backgroundColor: palette.card,
                  borderColor: palette.border,
                },
              ]}
              onPress={() => handleOpenBookReader(book)}
              activeOpacity={0.88}
            >
              <View style={styles.coverContainer}>
                <Image
                  source={{ uri: book.coverUrl }}
                  style={styles.cardCoverImage}
                  resizeMode="cover"
                />
                <View
                  style={[
                    styles.categoryTagOverlay,
                    { backgroundColor: '#4682B4' },
                  ]}
                >
                  <Text style={styles.categoryTagOverlayText}>
                    {book.category === 'Cientifico ou Tecnico'
                      ? 'Tecnico'
                      : book.category}
                  </Text>
                </View>
              </View>

              <View style={styles.cardFooterInfo}>
                <Text
                  style={[styles.cardBookTitle, { color: palette.text }]}
                  numberOfLines={2}
                >
                  {book.title}
                </Text>
                <Text
                  style={[styles.cardBookAuthor, { color: palette.textMuted }]}
                  numberOfLines={1}
                >
                  {book.author}
                </Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={12} color="#DAA520" />
                  <Text style={[styles.ratingText, { color: palette.text }]}>
                    {book.rating.toFixed(1)}
                  </Text>
                  <Text style={[styles.priceTagText, { color: palette.primary }]}>
                    {book.price}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View
          style={[
            styles.jadeMomentumCard,
            { backgroundColor: palette.card, borderColor: palette.border },
          ]}
        >
          <View style={styles.momentumTopHeader}>
            <View>
              <Text style={[styles.kickerLabel, { color: palette.neutral }]}>
                JADE KINDLE • RITMO & CONSISTENCIA
              </Text>
              <Text style={[styles.momentumHeadline, { color: palette.text }]}>
                Painel de Habito Editorial
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.smallLogButton,
                { backgroundColor: palette.primary },
              ]}
              onPress={() => setLogModalVisible(true)}
            >
              <Ionicons name="add" size={16} color="#FFFFFF" />
              <Text style={styles.smallLogButtonText}>Registrar</Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.metricsGrid,
              { flexDirection: isLandscape || isTablet ? 'row' : 'row' },
            ]}
          >
            <View
              style={[
                styles.metricTile,
                { backgroundColor: palette.surface, borderColor: palette.border },
              ]}
            >
              <Ionicons name="flame" size={18} color="#DAA520" />
              <Text style={[styles.metricValue, { color: palette.text }]}>
                7 dias
              </Text>
              <Text style={[styles.metricLabel, { color: palette.textMuted }]}>
                Ofensiva Atual
              </Text>
            </View>

            <View
              style={[
                styles.metricTile,
                { backgroundColor: palette.surface, borderColor: palette.border },
              ]}
            >
              <Ionicons name="document-text-outline" size={18} color={palette.primary} />
              <Text style={[styles.metricValue, { color: palette.text }]}>
                {totalPagesRead} p.
              </Text>
              <Text style={[styles.metricLabel, { color: palette.textMuted }]}>
                Paginas Lidas
              </Text>
            </View>

            <View
              style={[
                styles.metricTile,
                { backgroundColor: palette.surface, borderColor: palette.border },
              ]}
            >
              <Ionicons name="time-outline" size={18} color={palette.blue} />
              <Text style={[styles.metricValue, { color: palette.text }]}>
                {Math.round(totalMinutesRead / 60)}h {totalMinutesRead % 60}m
              </Text>
              <Text style={[styles.metricLabel, { color: palette.textMuted }]}>
                Tempo Imerso
              </Text>
            </View>

            <View
              style={[
                styles.metricTile,
                { backgroundColor: palette.surface, borderColor: palette.border },
              ]}
            >
              <Ionicons name="trophy-outline" size={18} color={palette.neutral} />
              <Text style={[styles.metricValue, { color: palette.text }]}>
                {goalProgress}%
              </Text>
              <Text style={[styles.metricLabel, { color: palette.textMuted }]}>
                Meta Diaria ({dailyGoalPages}p)
              </Text>
            </View>
          </View>

          <View style={styles.heatmapSection}>
            <View style={styles.heatmapTitleRow}>
              <Text style={[styles.heatmapTitle, { color: palette.textMuted }]}>
                Mapa de Consistencia de Leitura (Ultimas 4 Semanas)
              </Text>
              <Text style={[styles.monoSmall, { color: palette.primary }]}>
                {readingLogs.length} sessoes salvas
              </Text>
            </View>
            <View style={styles.heatmapGrid}>
              {heatmapCells.map((level, index) => {
                const tones = [
                  palette.border,
                  'rgba(112, 66, 20, 0.30)',
                  'rgba(112, 66, 20, 0.55)',
                  '#704214',
                  '#006400',
                ];
                return (
                  <View
                    key={`heat_${index}`}
                    style={[
                      styles.heatmapCell,
                      { backgroundColor: tones[level] },
                    ]}
                  />
                );
              })}
            </View>
          </View>
        </View>

        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleGroup}>
            <Ionicons name="newspaper-outline" size={18} color={palette.primary} />
            <Text style={[styles.sectionTitle, { color: palette.text }]}>
              Curadoria Editorial Interativa
            </Text>
          </View>
        </View>

        <View style={styles.zigZagContainer}>
          <View
            style={[
              styles.zigZagRow,
              {
                backgroundColor: palette.card,
                borderColor: palette.border,
                flexDirection: isLandscape || isTablet ? 'row' : 'column',
              },
            ]}
          >
            <Image
              source={{ uri: 'https://picsum.photos/seed/editorialhist1/800/450' }}
              style={[
                styles.zigZagImage,
                isLandscape || isTablet ? { width: '45%', height: 180 } : { width: '100%', height: 155 },
              ]}
              resizeMode="cover"
            />
            <View style={styles.zigZagTextContent}>
              <Text style={[styles.zigZagKicker, { color: palette.primary }]}>
                ERA 2026+ • NARRATIVA DIGITAL
              </Text>
              <Text style={[styles.zigZagHeading, { color: palette.text }]}>
                Da Prensa Historica ao Scrollytelling Mobile
              </Text>
              <Text style={[styles.zigZagBody, { color: palette.textMuted }]}>
                A tipografia serifada classica encontra microinteracoes de destaque e sincronizacao instantanea entre biblioteca local e dispositivos Kindle.
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.zigZagRow,
              {
                backgroundColor: palette.card,
                borderColor: palette.border,
                flexDirection: isLandscape || isTablet ? 'row-reverse' : 'column',
              },
            ]}
          >
            <Image
              source={{ uri: 'https://picsum.photos/seed/editorialhist2/800/450' }}
              style={[
                styles.zigZagImage,
                isLandscape || isTablet ? { width: '45%', height: 180 } : { width: '100%', height: 155 },
              ]}
              resizeMode="cover"
            />
            <View style={styles.zigZagTextContent}>
              <Text style={[styles.zigZagKicker, { color: palette.blue }]}>
                ECOSSISTEMA INTEGRADO
              </Text>
              <Text style={[styles.zigZagHeading, { color: palette.text }]}>
                Conversao Local de Formatos sem Fronteiras
              </Text>
              <Text style={[styles.zigZagBody, { color: palette.textMuted }]}>
                Gerencie obras em EPUB, PDF, CBZ, AZW3 e KFX com pastas reais, metadados completos por ISBN e envio direto para o seu e-reader.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={logModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLogModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.modalSheet,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            <View style={styles.modalHeader}>
              <View>
                <Text style={[styles.kickerLabel, { color: palette.primary }]}>
                  DIARIO DE LEITURA JADE KINDLE
                </Text>
                <Text style={[styles.modalTitle, { color: palette.text }]}>
                  Registrar Sessao de Leitura
                </Text>
              </View>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setLogModalVisible(false)}
              >
                <Ionicons name="close" size={20} color={palette.text} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.inputLabel, { color: palette.text }]}>
              Livro Selecionado
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.bookSelectorScroll}
            >
              {books
                .filter((b) => b.inLibrary)
                .map((b) => {
                  const chosen = logBookId === b.id;
                  return (
                    <TouchableOpacity
                      key={`pick_${b.id}`}
                      style={[
                        styles.bookPickChip,
                        {
                          backgroundColor: chosen ? palette.primary : palette.surface,
                          borderColor: chosen ? palette.primary : palette.border,
                        },
                      ]}
                      onPress={() => setLogBookId(b.id)}
                    >
                      <Text
                        style={[
                          styles.bookPickChipText,
                          { color: chosen ? '#FFFFFF' : palette.text },
                        ]}
                        numberOfLines={1}
                      >
                        {b.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>

            <View style={styles.formRowTwoCols}>
              <View style={styles.formCol}>
                <Text style={[styles.inputLabel, { color: palette.text }]}>
                  Paginas Lidas
                </Text>
                <TextInput
                  style={[
                    styles.formInput,
                    {
                      backgroundColor: palette.surface,
                      borderColor: palette.border,
                      color: palette.text,
                    },
                  ]}
                  keyboardType="numeric"
                  value={logPages}
                  onChangeText={setLogPages}
                  placeholder="Ex: 25"
                  placeholderTextColor={palette.textMuted}
                />
              </View>
              <View style={styles.formCol}>
                <Text style={[styles.inputLabel, { color: palette.text }]}>
                  Tempo (Minutos)
                </Text>
                <TextInput
                  style={[
                    styles.formInput,
                    {
                      backgroundColor: palette.surface,
                      borderColor: palette.border,
                      color: palette.text,
                    },
                  ]}
                  keyboardType="numeric"
                  value={logMinutes}
                  onChangeText={setLogMinutes}
                  placeholder="Ex: 35"
                  placeholderTextColor={palette.textMuted}
                />
              </View>
            </View>

            {logError ? (
              <Text style={styles.errorText}>{logError}</Text>
            ) : null}

            <TouchableOpacity
              style={[
                styles.primaryButton,
                {
                  backgroundColor: DESIGN_TOKENS.colors.primary,
                  marginTop: 14,
                  justifyContent: 'center',
                },
              ]}
              onPress={handleSaveReadingLog}
            >
              <Ionicons name="checkmark-circle-outline" size={18} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Salvar no Historico</Text>
            </TouchableOpacity>
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
  topHeader: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.15)',
    zIndex: 100,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarBox: {
    flex: 1,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1714',
    fontFamily: DESIGN_TOKENS.fonts.sans,
  },
  chipsScrollContent: {
    paddingTop: 12,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: 12.5,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  mainScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 28,
  },
  heroCard: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 14,
    gap: 14,
    marginBottom: 20,
    shadowColor: '#12100E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  heroLeftColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },
  editorialBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: 'rgba(218, 165, 32, 0.18)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  editorialBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#704214',
    letterSpacing: 0.7,
  },
  heroTitle: {
    fontSize: 19,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
    lineHeight: 24,
  },
  heroAuthor: {
    fontSize: 12.5,
    marginTop: 3,
    fontFamily: DESIGN_TOKENS.fonts.serif,
  },
  heroSynopsis: {
    fontSize: 12.5,
    lineHeight: 18,
    marginTop: 8,
    fontFamily: DESIGN_TOKENS.fonts.serif,
  },
  heroProgressWrap: {
    marginTop: 10,
  },
  heroProgressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  monoMetric: {
    fontSize: 10.5,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.mono,
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  heroActionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1.5,
  },
  secondaryButtonText: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  heroRightColumn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedCoverFrame: {
    width: 108,
    height: 152,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(112, 66, 20, 0.35)',
    backgroundColor: '#221E1A',
  },
  heroBookCover: {
    width: '100%',
    height: '100%',
  },
  formatPillOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(18, 16, 14, 0.85)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
  },
  formatPillText: {
    color: '#DAA520',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.mono,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 4,
  },
  sectionTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
  },
  sectionLinkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  sectionLinkText: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  horizontalCarousel: {
    gap: 10,
    paddingBottom: 16,
  },
  bookCardHorizontal: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  coverContainer: {
    width: '100%',
    height: 146,
    backgroundColor: '#221E1A',
  },
  cardCoverImage: {
    width: '100%',
    height: '100%',
  },
  favoriteBadgeBtn: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(18, 16, 14, 0.72)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formatBadgeMini: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(112, 66, 20, 0.92)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  formatBadgeMiniText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.mono,
  },
  categoryTagOverlay: {
    position: 'absolute',
    top: 7,
    left: 7,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
  },
  categoryTagOverlayText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '700',
  },
  cardFooterInfo: {
    padding: 10,
  },
  cardBookTitle: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
    lineHeight: 17,
    minHeight: 34,
  },
  cardBookAuthor: {
    fontSize: 11,
    marginTop: 3,
  },
  miniProgressTrack: {
    height: 4,
    backgroundColor: 'rgba(150, 150, 150, 0.25)',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  cardMetaBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  cardPercentText: {
    fontSize: 10.5,
    fontFamily: DESIGN_TOKENS.fonts.mono,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 7,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    marginRight: 4,
  },
  priceTagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  jadeMomentumCard: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  momentumTopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  kickerLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.9,
  },
  momentumHeadline: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
    marginTop: 2,
  },
  smallLogButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  smallLogButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  metricsGrid: {
    flexWrap: 'wrap',
    gap: 10,
  },
  metricTile: {
    flex: 1,
    minWidth: 130,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.mono,
    marginTop: 6,
  },
  metricLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  heatmapSection: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(150,150,150,0.2)',
  },
  heatmapTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  heatmapTitle: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  monoSmall: {
    fontSize: 11,
    fontFamily: DESIGN_TOKENS.fonts.mono,
    fontWeight: '700',
  },
  heatmapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  heatmapCell: {
    width: 18,
    height: 18,
    borderRadius: 4,
  },
  zigZagContainer: {
    gap: 14,
  },
  zigZagRow: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  zigZagImage: {
    backgroundColor: '#221E1A',
  },
  zigZagTextContent: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
  zigZagKicker: {
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  zigZagHeading: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
    marginTop: 4,
  },
  zigZagBody: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
    fontFamily: DESIGN_TOKENS.fonts.serif,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(18, 16, 14, 0.72)',
    justifyContent: 'center',
    padding: 18,
  },
  modalSheet: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
    marginTop: 2,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 6,
  },
  bookSelectorScroll: {
    maxHeight: 44,
    marginBottom: 8,
  },
  bookPickChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
    maxWidth: 210,
  },
  bookPickChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  formRowTwoCols: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  formCol: {
    flex: 1,
  },
  formInput: {
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  errorText: {
    color: '#800020',
    fontSize: 12.5,
    fontWeight: '600',
    marginTop: 8,
  },
});
