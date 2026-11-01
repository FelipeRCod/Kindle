import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Modal,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKindleController, DESIGN_TOKENS } from '../controllers/KindleController';

export default function Tela_Explorar({ navigation }) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isLandscape = width > height;
  const isTablet = width >= 700;
  const topSafe = Math.max(insets.top + 10, Platform.OS === 'android' ? 46 : 48);

  const {
    books,
    palette,
    setSelectedBookId,
    addBookToLibrary,
    toggleFavorite,
  } = useKindleController();

  const [storeSearch, setStoreSearch] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('Todos');
  const [detailBook, setDetailBook] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  const themes = [
    { id: 'Todos', label: 'Todos os Temas', icon: 'apps-outline' },
    { id: 'Cientifico ou Tecnico', label: 'Cientifico ou Tecnico', icon: 'terminal-outline' },
    { id: 'Manga', label: 'Manga & Quadrinhos', icon: 'sparkles-outline' },
    { id: 'Romance', label: 'Romance & Classicos', icon: 'rose-outline' },
  ];

  const catalogBooks = books.filter((b) => {
    const matchesSearch =
      !storeSearch.trim() ||
      b.title.toLowerCase().includes(storeSearch.toLowerCase()) ||
      b.author.toLowerCase().includes(storeSearch.toLowerCase()) ||
      b.synopsis.toLowerCase().includes(storeSearch.toLowerCase());
    const matchesTheme =
      selectedTheme === 'Todos' || b.category === selectedTheme;
    return matchesSearch && matchesTheme;
  });

  const featuredBook = catalogBooks[0] || books[0];

  const handleAcquireBook = (book, sample = false) => {
    addBookToLibrary(book.id, sample);
    setToastMsg(
      sample
        ? `Amostra de "${book.title}" adicionada a sua Biblioteca!`
        : `"${book.title}" adquirido e sincronizado na Biblioteca!`
    );
    setTimeout(() => setToastMsg(''), 3200);
  };

  return (
    <View style={[styles.container, { backgroundColor: palette.bg }]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: palette.headerBg,
            paddingTop: topSafe,
          },
        ]}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerKicker}>JADE KINDLE UNLIMITED & LOJA</Text>
            <Text style={styles.headerTitle}>Explorar Catalogo Editorial</Text>
          </View>
          <View style={styles.unlimitedBadge}>
            <Ionicons name="infinite" size={16} color="#12100E" />
            <Text style={styles.unlimitedBadgeText}>Unlimited</Text>
          </View>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#704214" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar obras cientificas, mangas, romances..."
            placeholderTextColor="#8B7355"
            value={storeSearch}
            onChangeText={setStoreSearch}
          />
          {storeSearch.length > 0 && (
            <TouchableOpacity onPress={() => setStoreSearch('')}>
              <Ionicons name="close-circle" size={18} color="#704214" />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.themesScroll}
        >
          {themes.map((t) => {
            const active = selectedTheme === t.id;
            return (
              <TouchableOpacity
                key={t.id}
                style={[
                  styles.themeChip,
                  active
                    ? { backgroundColor: '#DAA520', borderColor: '#DAA520' }
                    : {
                        backgroundColor: 'rgba(255,255,255,0.12)',
                        borderColor: 'rgba(255,255,255,0.28)',
                      },
                ]}
                onPress={() => setSelectedTheme(t.id)}
              >
                <Ionicons
                  name={t.icon}
                  size={14}
                  color={active ? '#12100E' : '#FFFFFF'}
                />
                <Text
                  style={[
                    styles.themeChipText,
                    { color: active ? '#12100E' : '#FFFFFF' },
                  ]}
                >
                  {t.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {toastMsg ? (
        <View style={styles.toastBanner}>
          <Ionicons name="checkmark-circle" size={17} color="#FFFFFF" />
          <Text style={styles.toastBannerText}>{toastMsg}</Text>
        </View>
      ) : null}

      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={[
          styles.scrollContent,
          { maxWidth: 1280, alignSelf: 'center', width: '100%' },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.spotlightBanner,
            {
              backgroundColor: palette.card,
              borderColor: palette.border,
              flexDirection: isLandscape || isTablet ? 'row' : 'column',
            },
          ]}
        >
          <Image
            source={{ uri: featuredBook.historicBannerUrl }}
            style={[
              styles.spotlightImg,
              isLandscape || isTablet
                ? { width: '44%', height: 210 }
                : { width: '100%', height: 165 },
            ]}
            resizeMode="cover"
          />
          <View style={styles.spotlightInfo}>
            <View style={styles.spotlightBadgeRow}>
              <Text style={[styles.spotlightKicker, { color: palette.primary }]}>
                CURADORIA DA SEMANA • {featuredBook.category.toUpperCase()}
              </Text>
            </View>
            <Text style={[styles.spotlightTitle, { color: palette.text }]}>
              {featuredBook.title}
            </Text>
            <Text style={[styles.spotlightAuthor, { color: palette.textMuted }]}>
              {featuredBook.author} • {featuredBook.publisher}
            </Text>
            <Text
              style={[styles.spotlightDesc, { color: palette.textMuted }]}
              numberOfLines={3}
            >
              {featuredBook.synopsis}
            </Text>

            <View style={styles.spotlightButtons}>
              <TouchableOpacity
                style={[
                  styles.primaryBtn,
                  { backgroundColor: DESIGN_TOKENS.colors.primary },
                ]}
                onPress={() => {
                  setSelectedBookId(featuredBook.id);
                  navigation.navigate('Tela_Leitor', { bookId: featuredBook.id });
                }}
              >
                <Ionicons name="book-outline" size={16} color="#FFFFFF" />
                <Text style={styles.primaryBtnText}>Ler Agora</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.secondaryBtn,
                  { borderColor: palette.primary },
                ]}
                onPress={() => setDetailBook(featuredBook)}
              >
                <Text style={[styles.secondaryBtnText, { color: palette.primary }]}>
                  Ficha Editorial
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionHeading, { color: palette.text }]}>
          Obras em Destaque ({catalogBooks.length})
        </Text>

        <View style={styles.catalogList}>
          {catalogBooks.map((book, index) => {
            const reversed = (isLandscape || isTablet) && index % 2 === 1;
            return (
              <View
                key={book.id}
                style={[
                  styles.catalogRowCard,
                  {
                    backgroundColor: palette.card,
                    borderColor: palette.border,
                    flexDirection: reversed ? 'row-reverse' : 'row',
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => setDetailBook(book)}
                  activeOpacity={0.88}
                >
                  <Image
                    source={{ uri: book.coverUrl }}
                    style={styles.catalogCover}
                    resizeMode="cover"
                  />
                </TouchableOpacity>

                <View style={styles.catalogCardBody}>
                  <View style={styles.catalogTopMeta}>
                    <View
                      style={[
                        styles.catBadge,
                        { backgroundColor: DESIGN_TOKENS.colors.surfaceSoft },
                      ]}
                    >
                      <Text style={styles.catBadgeText}>{book.category}</Text>
                    </View>
                    <Text style={[styles.formatMono, { color: palette.primary }]}>
                      {book.format} • {book.fileSize}
                    </Text>
                  </View>

                  <Text
                    style={[styles.catalogBookTitle, { color: palette.text }]}
                    numberOfLines={2}
                  >
                    {book.title}
                  </Text>
                  <Text
                    style={[styles.catalogBookAuthor, { color: palette.textMuted }]}
                  >
                    {book.author}
                  </Text>

                  <View style={styles.starsRow}>
                    <Ionicons name="star" size={13} color="#DAA520" />
                    <Text style={[styles.ratingNum, { color: palette.text }]}>
                      {book.rating.toFixed(1)}
                    </Text>
                    <Text style={[styles.reviewsCount, { color: palette.textMuted }]}>
                      ({book.reviews} avaliacoes)
                    </Text>
                    <Text style={[styles.priceHighlight, { color: palette.neutral }]}>
                      • {book.price}
                    </Text>
                  </View>

                  <Text
                    style={[styles.catalogSynopsis, { color: palette.textMuted }]}
                    numberOfLines={2}
                  >
                    {book.synopsis}
                  </Text>

                  <View style={styles.catalogActionsRow}>
                    {book.inLibrary ? (
                      <TouchableOpacity
                        style={[
                          styles.actionPillBtn,
                          { backgroundColor: palette.neutral },
                        ]}
                        onPress={() => {
                          setSelectedBookId(book.id);
                          navigation.navigate('Tela_Leitor', { bookId: book.id });
                        }}
                      >
                        <Ionicons
                          name="checkmark-circle-outline"
                          size={15}
                          color="#FFFFFF"
                        />
                        <Text style={styles.actionPillBtnText}>
                          Na Biblioteca • Ler
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <>
                        <TouchableOpacity
                          style={[
                            styles.actionPillBtn,
                            { backgroundColor: palette.primary },
                          ]}
                          onPress={() => handleAcquireBook(book, false)}
                        >
                          <Ionicons
                            name="cloud-download-outline"
                            size={15}
                            color="#FFFFFF"
                          />
                          <Text style={styles.actionPillBtnText}>
                            Obter no Kindle
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.outlinePillBtn,
                            { borderColor: palette.primary },
                          ]}
                          onPress={() => handleAcquireBook(book, true)}
                        >
                          <Text
                            style={[
                              styles.outlinePillBtnText,
                              { color: palette.primary },
                            ]}
                          >
                            Amostra Gratis
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}

                    <TouchableOpacity
                      style={styles.infoCircleBtn}
                      onPress={() => setDetailBook(book)}
                    >
                      <Ionicons
                        name="information-circle-outline"
                        size={20}
                        color={palette.blue}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <Modal
        visible={Boolean(detailBook)}
        transparent
        animationType="fade"
        onRequestClose={() => setDetailBook(null)}
      >
        <View style={styles.modalBackdrop}>
          {detailBook && (
            <View
              style={[
                styles.detailModalCard,
                { backgroundColor: palette.card, borderColor: palette.border },
              ]}
            >
              <View style={styles.modalHeaderRow}>
                <Text style={[styles.spotlightKicker, { color: palette.primary }]}>
                  FICHA TECNICA & EDITORIAL
                </Text>
                <TouchableOpacity onPress={() => setDetailBook(null)}>
                  <Ionicons name="close" size={22} color={palette.text} />
                </TouchableOpacity>
              </View>

              <View style={styles.detailTopBlock}>
                <Image
                  source={{ uri: detailBook.coverUrl }}
                  style={styles.detailCover}
                  resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.detailTitle, { color: palette.text }]}>
                    {detailBook.title}
                  </Text>
                  <Text
                    style={[styles.detailAuthor, { color: palette.textMuted }]}
                  >
                    {detailBook.author}
                  </Text>
                  <Text style={[styles.detailMono, { color: palette.primary }]}>
                    ISBN: {detailBook.isbn}
                  </Text>
                  <Text style={[styles.detailMono, { color: palette.blue }]}>
                    Editora: {detailBook.publisher} ({detailBook.releaseYear})
                  </Text>
                  <Text style={[styles.detailMono, { color: palette.neutral }]}>
                    Formato Nativo: {detailBook.format} ({detailBook.fileSize})
                  </Text>
                </View>
              </View>

              <Text style={[styles.detailSynopsis, { color: palette.text }]}>
                {detailBook.synopsis}
              </Text>

              <View style={styles.detailBottomRow}>
                <TouchableOpacity
                  style={[
                    styles.primaryBtn,
                    { backgroundColor: palette.primary, flex: 1, justifyContent: 'center' },
                  ]}
                  onPress={() => {
                    if (!detailBook.inLibrary) {
                      handleAcquireBook(detailBook, false);
                    }
                    setSelectedBookId(detailBook.id);
                    setDetailBook(null);
                    navigation.navigate('Tela_Leitor', { bookId: detailBook.id });
                  }}
                >
                  <Ionicons name="book-outline" size={16} color="#FFFFFF" />
                  <Text style={styles.primaryBtnText}>
                    Abrir no Leitor Interativo
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.secondaryBtn,
                    { borderColor: palette.primary },
                  ]}
                  onPress={() => toggleFavorite(detailBook.id)}
                >
                  <Ionicons
                    name={detailBook.isFavorite ? 'heart' : 'heart-outline'}
                    size={18}
                    color={palette.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerKicker: {
    color: '#DAA520',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.9,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
  },
  unlimitedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#DAA520',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  unlimitedBadgeText: {
    color: '#12100E',
    fontSize: 11.5,
    fontWeight: '700',
  },
  searchBar: {
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1714',
  },
  themesScroll: {
    paddingTop: 12,
    gap: 8,
  },
  themeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
  },
  themeChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  toastBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#006400',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  toastBannerText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '600',
    flex: 1,
  },
  mainScroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 34,
  },
  spotlightBanner: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 22,
  },
  spotlightImg: {
    backgroundColor: '#221E1A',
  },
  spotlightInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  spotlightBadgeRow: {
    marginBottom: 4,
  },
  spotlightKicker: {
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  spotlightTitle: {
    fontSize: 19,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
  },
  spotlightAuthor: {
    fontSize: 12.5,
    marginTop: 2,
  },
  spotlightDesc: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
    fontFamily: DESIGN_TOKENS.fonts.serif,
  },
  spotlightButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  secondaryBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
    marginBottom: 12,
  },
  catalogList: {
    gap: 14,
  },
  catalogRowCard: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    gap: 14,
    alignItems: 'center',
  },
  catalogCover: {
    width: 96,
    height: 142,
    borderRadius: 6,
    backgroundColor: '#221E1A',
  },
  catalogCardBody: {
    flex: 1,
  },
  catalogTopMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  catBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  catBadgeText: {
    color: '#4682B4',
    fontSize: 10,
    fontWeight: '700',
  },
  formatMono: {
    fontSize: 10.5,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.mono,
  },
  catalogBookTitle: {
    fontSize: 15.5,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
    lineHeight: 20,
  },
  catalogBookAuthor: {
    fontSize: 12,
    marginTop: 2,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 5,
  },
  ratingNum: {
    fontSize: 12,
    fontWeight: '700',
  },
  reviewsCount: {
    fontSize: 11,
  },
  priceHighlight: {
    fontSize: 11.5,
    fontWeight: '700',
  },
  catalogSynopsis: {
    fontSize: 12.5,
    lineHeight: 17,
    marginTop: 6,
    fontFamily: DESIGN_TOKENS.fonts.serif,
  },
  catalogActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  actionPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 6,
  },
  actionPillBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  outlinePillBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  outlinePillBtnText: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  infoCircleBtn: {
    padding: 4,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(18, 16, 14, 0.75)',
    justifyContent: 'center',
    padding: 16,
  },
  detailModalCard: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailTopBlock: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },
  detailCover: {
    width: 92,
    height: 136,
    borderRadius: 6,
  },
  detailTitle: {
    fontSize: 16.5,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
  },
  detailAuthor: {
    fontSize: 12.5,
    marginTop: 3,
    marginBottom: 6,
  },
  detailMono: {
    fontSize: 11,
    fontFamily: DESIGN_TOKENS.fonts.mono,
    marginTop: 3,
  },
  detailSynopsis: {
    fontSize: 13.5,
    lineHeight: 20,
    fontFamily: DESIGN_TOKENS.fonts.serif,
    marginBottom: 16,
  },
  detailBottomRow: {
    flexDirection: 'row',
    gap: 10,
  },
});
