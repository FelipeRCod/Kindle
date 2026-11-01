import React, { useState, useMemo } from 'react';
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
import { useKindleController, DESIGN_TOKENS } from '../controllers/KindleController';

export default function LibraryView({ navigation }) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const isTablet = width >= 700;

  const {
    books,
    folders,
    palette,
    setSelectedBookId,
    toggleFavorite,
    updateBookMetadata,
    removeBookFromLibrary,
    createFolder,
    convertBookFormat,
  } = useKindleController();

  const [search, setSearch] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [newFolderModal, setNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [folderError, setFolderError] = useState('');
  const [editingBook, setEditingBook] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editIsbn, setEditIsbn] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [editFolderId, setEditFolderId] = useState('folder_tech');
  const [sendFeedback, setSendFeedback] = useState('');

  const formats = ['ALL', 'KFX', 'EPUB', 'PDF', 'CBZ', 'AZW3'];
  const categories = ['Todas', 'Cientifico ou Tecnico', 'Manga', 'Romance'];

  const filteredBooks = useMemo(() => {
    const list = books.filter((b) => {
      if (!b.inLibrary) return false;
      const matchesSearch =
        !search.trim() ||
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase()) ||
        (b.isbn && b.isbn.toLowerCase().includes(search.toLowerCase()));
      const matchesFolder =
        selectedFolderId === 'all' ||
        (selectedFolderId === 'favorites' ? b.isFavorite : b.folderId === selectedFolderId);
      const matchesFormat =
        selectedFormat === 'ALL' || b.format === selectedFormat;
      const matchesCategory =
        selectedCategory === 'Todas' || b.category === selectedCategory;
      return matchesSearch && matchesFolder && matchesFormat && matchesCategory;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'progress') return b.progressPercent - a.progressPercent;
      return String(b.lastOpenedAt || '').localeCompare(String(a.lastOpenedAt || ''));
    });
  }, [books, search, selectedFolderId, selectedFormat, selectedCategory, sortBy]);

  const openBookEditor = (book) => {
    setEditingBook(book);
    setEditTitle(book.title);
    setEditAuthor(book.author);
    setEditIsbn(book.isbn || '');
    setEditNotes(book.notes || '');
    setEditFolderId(book.folderId || 'folder_tech');
    setSendFeedback('');
  };

  const handleSaveBookMetadata = () => {
    if (!editingBook || !editTitle.trim()) return;
    updateBookMetadata(editingBook.id, {
      title: editTitle.trim(),
      author: editAuthor.trim(),
      isbn: editIsbn.trim(),
      notes: editNotes.trim(),
      folderId: editFolderId,
    });
    setEditingBook(null);
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      setFolderError('Digite um nome para a pasta da biblioteca.');
      return;
    }
    createFolder(newFolderName.trim());
    setNewFolderName('');
    setFolderError('');
    setNewFolderModal(false);
  };

  const numColumns = isTablet ? 4 : isLandscape ? 3 : 2;
  const gridCardWidth = `${Math.floor(96 / numColumns)}%`;

  return (
    <View style={[styles.container, { backgroundColor: palette.bg }]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: palette.headerBg,
            paddingTop: Platform.OS === 'ios' ? 48 : 34,
          },
        ]}
      >
        <View style={styles.headerTopRow}>
          <View>
            <Text style={styles.headerKicker}>GERENCIADOR LYCEUM & KINDLE</Text>
            <Text style={styles.headerTitle}>Sua Biblioteca Digital</Text>
          </View>
          <View style={styles.headerRightActions}>
            <TouchableOpacity
              style={styles.iconActionBtn}
              onPress={() => setNewFolderModal(true)}
            >
              <Ionicons name="folder-open-outline" size={19} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconActionBtn}
              onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              <Ionicons
                name={viewMode === 'grid' ? 'list-outline' : 'grid-outline'}
                size={19}
                color="#DAA520"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#704214" />
          <TextInput
            style={styles.searchInput}
            placeholder="Filtrar por titulo, autor ou ISBN..."
            placeholderTextColor="#8B7355"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color="#704214" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.bodyScroll}
        contentContainerStyle={[
          styles.bodyContent,
          { maxWidth: 1280, alignSelf: 'center', width: '100%' },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionMiniRow}>
          <Text style={[styles.sectionSmallLabel, { color: palette.textMuted }]}>
            CARROSSEL DE PASTAS E COLECOES
          </Text>
          <TouchableOpacity onPress={() => setNewFolderModal(true)}>
            <Text style={[styles.addFolderLink, { color: palette.primary }]}>
              + Nova Pasta
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.foldersCarousel}
        >
          <TouchableOpacity
            style={[
              styles.folderPill,
              {
                backgroundColor:
                  selectedFolderId === 'all' ? palette.primary : palette.card,
                borderColor:
                  selectedFolderId === 'all' ? palette.primary : palette.border,
              },
            ]}
            onPress={() => setSelectedFolderId('all')}
          >
            <Ionicons
              name="library-outline"
              size={16}
              color={selectedFolderId === 'all' ? '#FFFFFF' : palette.primary}
            />
            <Text
              style={[
                styles.folderPillText,
                { color: selectedFolderId === 'all' ? '#FFFFFF' : palette.text },
              ]}
            >
              Todos ({books.filter((b) => b.inLibrary).length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.folderPill,
              {
                backgroundColor:
                  selectedFolderId === 'favorites'
                    ? palette.primary
                    : palette.card,
                borderColor:
                  selectedFolderId === 'favorites'
                    ? palette.primary
                    : palette.border,
              },
            ]}
            onPress={() => setSelectedFolderId('favorites')}
          >
            <Ionicons
              name="heart"
              size={16}
              color={
                selectedFolderId === 'favorites' ? '#DAA520' : palette.burgundy
              }
            />
            <Text
              style={[
                styles.folderPillText,
                {
                  color:
                    selectedFolderId === 'favorites' ? '#FFFFFF' : palette.text,
                },
              ]}
            >
              Favoritos ({books.filter((b) => b.inLibrary && b.isFavorite).length})
            </Text>
          </TouchableOpacity>

          {folders.map((folder) => {
            const active = selectedFolderId === folder.id;
            const count = books.filter(
              (b) => b.inLibrary && b.folderId === folder.id
            ).length;
            return (
              <TouchableOpacity
                key={folder.id}
                style={[
                  styles.folderPill,
                  {
                    backgroundColor: active ? palette.primary : palette.card,
                    borderColor: active ? palette.primary : palette.border,
                  },
                ]}
                onPress={() => setSelectedFolderId(folder.id)}
              >
                <Ionicons
                  name={active ? 'folder-open' : 'folder-outline'}
                  size={16}
                  color={active ? '#DAA520' : palette.primary}
                />
                <Text
                  style={[
                    styles.folderPillText,
                    { color: active ? '#FFFFFF' : palette.text },
                  ]}
                >
                  {folder.name} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersBar}
        >
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: active ? palette.blue : palette.surface,
                    borderColor: active ? palette.blue : palette.border,
                  },
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    { color: active ? '#FFFFFF' : palette.text },
                  ]}
                >
                  {cat === 'Cientifico ou Tecnico' ? 'Cientifico/Tecnico' : cat}
                </Text>
              </TouchableOpacity>
            );
          })}

          {formats.map((fmt) => {
            const active = selectedFormat === fmt;
            return (
              <TouchableOpacity
                key={fmt}
                style={[
                  styles.formatChip,
                  {
                    backgroundColor: active ? palette.neutral : palette.card,
                    borderColor: active ? palette.neutral : palette.border,
                  },
                ]}
                onPress={() => setSelectedFormat(fmt)}
              >
                <Text
                  style={[
                    styles.formatChipText,
                    { color: active ? '#FFFFFF' : palette.textMuted },
                  ]}
                >
                  {fmt === 'ALL' ? 'Formatos: Todos' : fmt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.toolbarInfoRow}>
          <Text style={[styles.resultCountText, { color: palette.textMuted }]}>
            {filteredBooks.length} volume(s) encontrados
          </Text>
          <View style={styles.sortButtonsRow}>
            {[
              { id: 'recent', label: 'Recentes' },
              { id: 'progress', label: 'Progresso' },
              { id: 'title', label: 'A-Z' },
            ].map((s) => (
              <TouchableOpacity
                key={s.id}
                style={[
                  styles.sortMiniBtn,
                  {
                    backgroundColor:
                      sortBy === s.id ? palette.primary : 'transparent',
                  },
                ]}
                onPress={() => setSortBy(s.id)}
              >
                <Text
                  style={[
                    styles.sortMiniBtnText,
                    { color: sortBy === s.id ? '#FFFFFF' : palette.textMuted },
                  ]}
                >
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {filteredBooks.length === 0 ? (
          <View
            style={[
              styles.emptyStateBox,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            <Ionicons name="book-outline" size={38} color={palette.primary} />
            <Text style={[styles.emptyTitle, { color: palette.text }]}>
              Nenhum livro corresponde ao filtro
            </Text>
            <Text style={[styles.emptySubtitle, { color: palette.textMuted }]}>
              Limpe os filtros ou adicione novos volumes na aba Explorar Loja.
            </Text>
            <TouchableOpacity
              style={[
                styles.primaryActionBtn,
                { backgroundColor: palette.primary },
              ]}
              onPress={() => {
                setSelectedFolderId('all');
                setSelectedFormat('ALL');
                setSelectedCategory('Todas');
                setSearch('');
              }}
            >
              <Text style={styles.primaryActionBtnText}>Restaurar Filtros</Text>
            </TouchableOpacity>
          </View>
        ) : viewMode === 'grid' ? (
          <View style={styles.gridWrap}>
            {filteredBooks.map((book) => (
              <View
                key={book.id}
                style={[
                  styles.gridBookCard,
                  {
                    width: gridCardWidth,
                    backgroundColor: palette.card,
                    borderColor: palette.border,
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.gridCoverButton}
                  onPress={() => {
                    setSelectedBookId(book.id);
                    navigation.navigate('Tela_Leitor', { bookId: book.id });
                  }}
                  activeOpacity={0.88}
                >
                  <Image
                    source={{ uri: book.coverUrl }}
                    style={styles.gridCoverImg}
                    resizeMode="cover"
                  />
                  <View style={styles.gridTopBadges}>
                    <View style={styles.formatPill}>
                      <Text style={styles.formatPillLabel}>{book.format}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.moreIconBtn}
                      onPress={() => openBookEditor(book)}
                    >
                      <Ionicons
                        name="ellipsis-vertical"
                        size={15}
                        color="#FFFFFF"
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>

                <View style={styles.gridCardBody}>
                  <Text
                    style={[styles.gridBookTitle, { color: palette.text }]}
                    numberOfLines={2}
                  >
                    {book.title}
                  </Text>
                  <Text
                    style={[styles.gridBookAuthor, { color: palette.textMuted }]}
                    numberOfLines={1}
                  >
                    {book.author}
                  </Text>

                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${book.progressPercent}%`,
                          backgroundColor: palette.neutral,
                        },
                      ]}
                    />
                  </View>

                  <View style={styles.gridFooterRow}>
                    <Text
                      style={[styles.monoInfoText, { color: palette.textMuted }]}
                    >
                      {book.progressPercent}% • {book.fileSize}
                    </Text>
                    <TouchableOpacity onPress={() => toggleFavorite(book.id)}>
                      <Ionicons
                        name={book.isFavorite ? 'heart' : 'heart-outline'}
                        size={16}
                        color={
                          book.isFavorite ? '#DAA520' : palette.textMuted
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.listWrap}>
            {filteredBooks.map((book) => (
              <View
                key={book.id}
                style={[
                  styles.listBookItem,
                  { backgroundColor: palette.card, borderColor: palette.border },
                ]}
              >
                <TouchableOpacity
                  style={styles.listMainTouch}
                  onPress={() => {
                    setSelectedBookId(book.id);
                    navigation.navigate('Tela_Leitor', { bookId: book.id });
                  }}
                >
                  <Image
                    source={{ uri: book.coverUrl }}
                    style={styles.listCoverThumb}
                    resizeMode="cover"
                  />
                  <View style={styles.listBookDetails}>
                    <View style={styles.listBadgeRow}>
                      <Text
                        style={[
                          styles.listFormatBadge,
                          { color: palette.primary },
                        ]}
                      >
                        {book.format}
                      </Text>
                      <Text
                        style={[
                          styles.listCategoryLabel,
                          { color: palette.blue },
                        ]}
                      >
                        • {book.category}
                      </Text>
                    </View>
                    <Text
                      style={[styles.listBookTitle, { color: palette.text }]}
                      numberOfLines={1}
                    >
                      {book.title}
                    </Text>
                    <Text
                      style={[
                        styles.listBookAuthor,
                        { color: palette.textMuted },
                      ]}
                      numberOfLines={1}
                    >
                      {book.author}
                    </Text>
                    <View style={styles.listProgressRow}>
                      <View style={[styles.progressTrack, { flex: 1 }]}>
                        <View
                          style={[
                            styles.progressFill,
                            {
                              width: `${book.progressPercent}%`,
                              backgroundColor: palette.neutral,
                            },
                          ]}
                        />
                      </View>
                      <Text
                        style={[
                          styles.monoInfoText,
                          { color: palette.textMuted },
                        ]}
                      >
                        {book.progressPercent}%
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.listEditBtn}
                  onPress={() => openBookEditor(book)}
                >
                  <Ionicons
                    name="options-outline"
                    size={19}
                    color={palette.primary}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <Modal
        visible={newFolderModal}
        transparent
        animationType="fade"
        onRequestClose={() => setNewFolderModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.modalBox,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            <Text style={[styles.modalKicker, { color: palette.primary }]}>
              ORGANIZACAO DE ARQUIVOS
            </Text>
            <Text style={[styles.modalHeading, { color: palette.text }]}>
              Criar Nova Pasta na Biblioteca
            </Text>
            <TextInput
              style={[
                styles.inputField,
                {
                  backgroundColor: palette.surface,
                  borderColor: palette.border,
                  color: palette.text,
                },
              ]}
              placeholder="Nome da pasta (ex: Estudos IA)"
              placeholderTextColor={palette.textMuted}
              value={newFolderName}
              onChangeText={setNewFolderName}
            />
            {folderError ? (
              <Text style={styles.errorText}>{folderError}</Text>
            ) : null}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.ghostBtn, { borderColor: palette.border }]}
                onPress={() => setNewFolderModal(false)}
              >
                <Text style={{ color: palette.textMuted, fontWeight: '600' }}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.primaryActionBtn,
                  { backgroundColor: palette.primary },
                ]}
                onPress={handleCreateFolder}
              >
                <Text style={styles.primaryActionBtnText}>Criar Pasta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={Boolean(editingBook)}
        transparent
        animationType="slide"
        onRequestClose={() => setEditingBook(null)}
      >
        <View style={styles.modalBackdrop}>
          <ScrollView
            contentContainerStyle={styles.editorModalScroll}
            showsVerticalScrollIndicator={false}
          >
            {editingBook && (
              <View
                style={[
                  styles.modalBox,
                  { backgroundColor: palette.card, borderColor: palette.border },
                ]}
              >
                <View style={styles.editorTopBar}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.modalKicker, { color: palette.primary }]}>
                      INSPETOR DE METADADOS & SEND TO KINDLE
                    </Text>
                    <Text
                      style={[styles.modalHeading, { color: palette.text }]}
                      numberOfLines={1}
                    >
                      {editingBook.title}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => setEditingBook(null)}>
                    <Ionicons name="close" size={22} color={palette.text} />
                  </TouchableOpacity>
                </View>

                <Text style={[styles.fieldLabel, { color: palette.text }]}>
                  Titulo da Obra
                </Text>
                <TextInput
                  style={[
                    styles.inputField,
                    {
                      backgroundColor: palette.surface,
                      borderColor: palette.border,
                      color: palette.text,
                    },
                  ]}
                  value={editTitle}
                  onChangeText={setEditTitle}
                />

                <Text style={[styles.fieldLabel, { color: palette.text }]}>
                  Autor(a)
                </Text>
                <TextInput
                  style={[
                    styles.inputField,
                    {
                      backgroundColor: palette.surface,
                      borderColor: palette.border,
                      color: palette.text,
                    },
                  ]}
                  value={editAuthor}
                  onChangeText={setEditAuthor}
                />

                <Text style={[styles.fieldLabel, { color: palette.text }]}>
                  ISBN • Identificador Editorial
                </Text>
                <TextInput
                  style={[
                    styles.inputField,
                    {
                      backgroundColor: palette.surface,
                      borderColor: palette.border,
                      color: palette.text,
                    },
                  ]}
                  value={editIsbn}
                  onChangeText={setEditIsbn}
                />

                <Text style={[styles.fieldLabel, { color: palette.text }]}>
                  Pasta Gerenciada
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ marginVertical: 6 }}
                >
                  {folders.map((f) => (
                    <TouchableOpacity
                      key={f.id}
                      style={[
                        styles.folderPickBtn,
                        {
                          backgroundColor:
                            editFolderId === f.id
                              ? palette.primary
                              : palette.surface,
                          borderColor: palette.border,
                        },
                      ]}
                      onPress={() => setEditFolderId(f.id)}
                    >
                      <Text
                        style={{
                          color:
                            editFolderId === f.id ? '#FFFFFF' : palette.text,
                          fontSize: 12,
                          fontWeight: '600',
                        }}
                      >
                        {f.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <Text style={[styles.fieldLabel, { color: palette.text }]}>
                  Converter Formato Local (Pipeline Lyceum)
                </Text>
                <View style={styles.convertRow}>
                  {['KFX', 'AZW3', 'EPUB', 'PDF'].map((targetFmt) => (
                    <TouchableOpacity
                      key={targetFmt}
                      style={[
                        styles.convertBtn,
                        {
                          backgroundColor:
                            editingBook.format === targetFmt
                              ? palette.neutral
                              : palette.surface,
                          borderColor: palette.border,
                        },
                      ]}
                      onPress={() => {
                        convertBookFormat(editingBook.id, targetFmt);
                        setEditingBook({ ...editingBook, format: targetFmt });
                        setSendFeedback(
                          `Formato convertido com sucesso para ${targetFmt}!`
                        );
                      }}
                    >
                      <Text
                        style={{
                          color:
                            editingBook.format === targetFmt
                              ? '#FFFFFF'
                              : palette.text,
                          fontSize: 11.5,
                          fontWeight: '700',
                          fontFamily: DESIGN_TOKENS.fonts.mono,
                        }}
                      >
                        {targetFmt}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={[styles.fieldLabel, { color: palette.text }]}>
                  Notas de Estudo
                </Text>
                <TextInput
                  style={[
                    styles.inputField,
                    {
                      height: 68,
                      textAlignVertical: 'top',
                      backgroundColor: palette.surface,
                      borderColor: palette.border,
                      color: palette.text,
                    },
                  ]}
                  multiline
                  value={editNotes}
                  onChangeText={setEditNotes}
                />

                {sendFeedback ? (
                  <Text
                    style={{
                      color: palette.neutral,
                      fontSize: 12,
                      fontWeight: '700',
                      marginTop: 8,
                    }}
                  >
                    {sendFeedback}
                  </Text>
                ) : null}

                <View style={styles.editorBottomActions}>
                  <TouchableOpacity
                    style={[
                      styles.sendKindleBtn,
                      { backgroundColor: palette.blue },
                    ]}
                    onPress={() =>
                      setSendFeedback(
                        `Enviado para Kindle Paperwhite via USB/Wi-Fi (${editingBook.format})!`
                      )
                    }
                  >
                    <Ionicons name="paper-plane-outline" size={16} color="#FFFFFF" />
                    <Text style={styles.primaryActionBtnText}>
                      Send to Kindle
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.primaryActionBtn,
                      { backgroundColor: palette.primary, flex: 1 },
                    ]}
                    onPress={handleSaveBookMetadata}
                  >
                    <Ionicons name="save-outline" size={16} color="#FFFFFF" />
                    <Text style={styles.primaryActionBtnText}>
                      Salvar Metadados
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[
                    styles.removeBtn,
                    { borderColor: DESIGN_TOKENS.colors.accent },
                  ]}
                  onPress={() => {
                    removeBookFromLibrary(editingBook.id);
                    setEditingBook(null);
                  }}
                >
                  <Ionicons name="trash-outline" size={16} color="#800020" />
                  <Text style={styles.removeBtnText}>
                    Remover da Biblioteca
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
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
    paddingBottom: 14,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerKicker: {
    color: '#DAA520',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
  },
  headerRightActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconActionBtn: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
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
  bodyScroll: {
    flex: 1,
  },
  bodyContent: {
    padding: 16,
    paddingBottom: 36,
  },
  sectionMiniRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionSmallLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  addFolderLink: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  foldersCarousel: {
    gap: 8,
    paddingBottom: 12,
  },
  folderPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
  },
  folderPillText: {
    fontSize: 12.5,
    fontWeight: '600',
  },
  filtersBar: {
    gap: 8,
    paddingBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  formatChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  formatChipText: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.mono,
  },
  toolbarInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  resultCountText: {
    fontSize: 12,
    fontFamily: DESIGN_TOKENS.fonts.mono,
  },
  sortButtonsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  sortMiniBtn: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
  },
  sortMiniBtnText: {
    fontSize: 11.5,
    fontWeight: '600',
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  gridBookCard: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 4,
  },
  gridCoverButton: {
    width: '100%',
    aspectRatio: 0.72,
    backgroundColor: '#221E1A',
  },
  gridCoverImg: {
    width: '100%',
    height: '100%',
  },
  gridTopBadges: {
    position: 'absolute',
    top: 7,
    left: 7,
    right: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formatPill: {
    backgroundColor: 'rgba(18, 16, 14, 0.84)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
  },
  formatPillLabel: {
    color: '#DAA520',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.mono,
  },
  moreIconBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(18, 16, 14, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridCardBody: {
    padding: 10,
  },
  gridBookTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
    lineHeight: 18,
    minHeight: 36,
  },
  gridBookAuthor: {
    fontSize: 11.5,
    marginTop: 2,
  },
  progressTrack: {
    height: 5,
    backgroundColor: 'rgba(150,150,150,0.24)',
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  gridFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  monoInfoText: {
    fontSize: 10.5,
    fontFamily: DESIGN_TOKENS.fonts.mono,
  },
  listWrap: {
    gap: 10,
  },
  listBookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  listMainTouch: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  listCoverThumb: {
    width: 54,
    height: 76,
    borderRadius: 6,
    backgroundColor: '#221E1A',
  },
  listBookDetails: {
    flex: 1,
  },
  listBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  listFormatBadge: {
    fontSize: 10.5,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.mono,
  },
  listCategoryLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  listBookTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
    marginTop: 2,
  },
  listBookAuthor: {
    fontSize: 12,
    marginTop: 2,
  },
  listProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  listEditBtn: {
    padding: 8,
  },
  emptyStateBox: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 28,
    alignItems: 'center',
    marginTop: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
    marginTop: 10,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 16,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(18, 16, 14, 0.75)',
    justifyContent: 'center',
    padding: 16,
  },
  editorModalScroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  modalBox: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  editorTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalKicker: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  modalHeading: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: DESIGN_TOKENS.fonts.serif,
    marginTop: 2,
  },
  fieldLabel: {
    fontSize: 12.5,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
  },
  inputField: {
    height: 42,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 13.5,
  },
  folderPickBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
  },
  convertRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  convertBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 16,
  },
  ghostBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  primaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  primaryActionBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  editorBottomActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  sendKindleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  removeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 10,
  },
  removeBtnText: {
    color: '#800020',
    fontSize: 12.5,
    fontWeight: '700',
  },
  errorText: {
    color: '#800020',
    fontSize: 12,
    marginTop: 6,
  },
});
