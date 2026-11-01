import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  useWindowDimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKindleController, DESIGN_TOKENS } from '../controllers/KindleController';

const FORMAT_OPTIONS = ['KFX', 'EPUB', 'PDF', 'CBZ', 'AZW3'];
const GOAL_PRESETS = [20, 40, 60, 80, 100];

export default function ProfileSyncView({ navigation }) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isWide = width >= 700;
  const topSafe = Math.max(insets.top + 10, Platform.OS === 'android' ? 46 : 48);

  const {
    books,
    readingLogs,
    appTheme,
    switchGlobalTheme,
    palette,
    dailyGoalPages,
    setDailyGoalPages,
    syncDeviceName,
    setSyncDeviceName,
    librarySummary,
    convertBookFormat,
    setSelectedBookId,
    logReadingSession,
  } = useKindleController();

  const [converterBookId, setConverterBookId] = useState(books[0]?.id || 'book_1');
  const [targetFormat, setTargetFormat] = useState('KFX');
  const [syncMessage, setSyncMessage] = useState(
    'Whispersync ativo • Ultima sincronizacao ha 3 minutos'
  );
  const [editingDevice, setEditingDevice] = useState(false);
  const [deviceDraft, setDeviceDraft] = useState(syncDeviceName);
  const [quickPages, setQuickPages] = useState('25');
  const [quickMinutes, setQuickMinutes] = useState('30');

  const selectedConverterBook = useMemo(
    () => books.find((b) => b.id === converterBookId) || books[0],
    [books, converterBookId]
  );

  const statsSummary = librarySummary;

  const handleThemeSwitch = (nextTheme) => {
    switchGlobalTheme(nextTheme);
  };

  const handleRunConversion = () => {
    if (!selectedConverterBook) return;
    convertBookFormat(selectedConverterBook.id, targetFormat);
    setSyncMessage(
      `Conversao concluida: "${selectedConverterBook.title}" agora esta em formato ${targetFormat}`
    );
  };

  const handleSyncNow = () => {
    const timestamp = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setSyncMessage(
      `Sincronizado com ${syncDeviceName} as ${timestamp} (${statsSummary.libraryCount} obras e ${statsSummary.totalHighlights} destaques)`
    );
  };

  const handleSaveDevice = () => {
    if (deviceDraft.trim()) {
      setSyncDeviceName(deviceDraft.trim());
    }
    setEditingDevice(false);
  };

  const handleQuickLog = () => {
    logReadingSession({
      bookId: selectedConverterBook.id,
      pages: quickPages,
      minutes: quickMinutes,
      date: '2026-10-26',
    });
    setSyncMessage(
      `Sessao registrada: +${quickPages} paginas em "${selectedConverterBook.title}"`
    );
  };

  return (
    <View style={[styles.screen, { backgroundColor: palette.bg }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={palette.headerBg}
      />

      <View
        style={[
          styles.topHeader,
          { backgroundColor: palette.headerBg, paddingTop: topSafe },
        ]}
      >
        <View style={styles.headerRow}>
          <View style={styles.profileBadgeRow}>
            <View style={styles.avatarCircle}>
              <Ionicons name="person" size={22} color="#12100E" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerEyebrow}>JADE KINDLE • CENTRAL DO LEITOR</Text>
              <Text style={styles.headerTitle}>Mais, Sincronizacao & Perfil</Text>
              <Text style={styles.headerSub}>
                Felipe Rocha de Oliveira • FATEC DSM • Kindle Cloud & USB
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.syncHeaderBtn}
            onPress={handleSyncNow}
          >
            <Ionicons name="sync-outline" size={18} color="#12100E" />
            <Text style={styles.syncHeaderBtnText}>Sincronizar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.statusBanner,
            { backgroundColor: palette.card, borderColor: palette.border },
          ]}
        >
          <View style={styles.statusIconWrap}>
            <Ionicons name="cloud-done-outline" size={20} color="#006400" />
          </View>
          <Text style={[styles.statusBannerText, { color: palette.text }]}>
            {syncMessage}
          </Text>
        </View>

        <View style={styles.metricsRow}>
          <View
            style={[
              styles.metricCard,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            <Ionicons name="library-outline" size={20} color={palette.primary} />
            <Text style={[styles.metricValue, { color: palette.text }]}>
              {statsSummary.libraryCount}
            </Text>
            <Text style={[styles.metricLabel, { color: palette.textMuted }]}>
              Obras na Biblioteca
            </Text>
          </View>

          <View
            style={[
              styles.metricCard,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            <Ionicons name="document-text-outline" size={20} color="#006400" />
            <Text style={[styles.metricValue, { color: palette.text }]}>
              {statsSummary.totalPagesRead}
            </Text>
            <Text style={[styles.metricLabel, { color: palette.textMuted }]}>
              Paginas Lidas
            </Text>
          </View>

          <View
            style={[
              styles.metricCard,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            <Ionicons name="time-outline" size={20} color="#4682B4" />
            <Text style={[styles.metricValue, { color: palette.text }]}>
              {statsSummary.totalMinutesRead}m
            </Text>
            <Text style={[styles.metricLabel, { color: palette.textMuted }]}>
              Tempo Acumulado
            </Text>
          </View>

          <View
            style={[
              styles.metricCard,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            <Ionicons name="color-wand-outline" size={20} color="#800020" />
            <Text style={[styles.metricValue, { color: palette.text }]}>
              {statsSummary.totalHighlights}
            </Text>
            <Text style={[styles.metricLabel, { color: palette.textMuted }]}>
              Destaques Salvos
            </Text>
          </View>
        </View>

        <View style={isWide ? styles.twoColumnGrid : styles.singleColumnGrid}>
          <View
            style={[
              styles.panelCard,
              isWide && styles.halfPanel,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            <View style={styles.panelHeader}>
              <Ionicons name="color-palette-outline" size={20} color={palette.primary} />
              <Text style={[styles.panelTitle, { color: palette.text }]}>
                Estetica Editorial Global (designe.md)
              </Text>
            </View>
            <Text style={[styles.panelSubtitle, { color: palette.textMuted }]}>
              Alterne o tema visual entre Sepia Classico, Noturno Charcoal OLED e Papel Branco.
            </Text>

            <View style={styles.themeSelectorRow}>
              {[
                {
                  id: 'sepia',
                  label: 'Sepia Editorial',
                  bg: '#F7F1E5',
                  fg: '#704214',
                  icon: 'book-outline',
                },
                {
                  id: 'dark',
                  label: 'Charcoal OLED',
                  bg: '#12100E',
                  fg: '#DAA520',
                  icon: 'moon-outline',
                },
                {
                  id: 'light',
                  label: 'Branco Papel',
                  bg: '#FFFFFF',
                  fg: '#1A1714',
                  icon: 'sunny-outline',
                },
              ].map((item) => {
                const active = appTheme === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.themeOptionCard,
                      {
                        backgroundColor: item.bg,
                        borderColor: active ? '#DAA520' : palette.border,
                        borderWidth: active ? 2 : 1,
                      },
                    ]}
                    onPress={() => handleThemeSwitch(item.id)}
                  >
                    <Ionicons name={item.icon} size={18} color={item.fg} />
                    <Text style={[styles.themeOptionTitle, { color: item.fg }]}>
                      {item.label}
                    </Text>
                    <Text style={[styles.themeOptionMeta, { color: item.fg }]}>
                      {active ? 'ATIVO' : 'SELECIONAR'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={[styles.divider, { backgroundColor: palette.border }]} />

            <View style={styles.panelHeader}>
              <Ionicons name="flag-outline" size={18} color="#006400" />
              <Text style={[styles.panelTitle, { color: palette.text }]}>
                Meta Diaria de Leitura ({dailyGoalPages} paginas/dia)
              </Text>
            </View>

            <View style={styles.goalChipsRow}>
              {GOAL_PRESETS.map((goal) => {
                const selected = dailyGoalPages === goal;
                return (
                  <TouchableOpacity
                    key={goal}
                    style={[
                      styles.goalChip,
                      {
                        backgroundColor: selected ? '#006400' : palette.surface,
                        borderColor: selected ? '#006400' : palette.border,
                      },
                    ]}
                    onPress={() => setDailyGoalPages(goal)}
                  >
                    <Text
                      style={[
                        styles.goalChipText,
                        { color: selected ? '#FFFFFF' : palette.text },
                      ]}
                    >
                      {goal} pags
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View
            style={[
              styles.panelCard,
              isWide && styles.halfPanel,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            <View style={styles.panelHeader}>
              <Ionicons name="hardware-chip-outline" size={20} color="#4682B4" />
              <Text style={[styles.panelTitle, { color: palette.text }]}>
                Dispositivo & Conversor Jade Kindle
              </Text>
            </View>

            <View
              style={[
                styles.deviceBox,
                { backgroundColor: palette.surface, borderColor: palette.border },
              ]}
            >
              <View style={styles.deviceTopRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.deviceLabel, { color: palette.textMuted }]}>
                    DISPOSITIVO VINCULADO (USB / SEND-TO-KINDLE)
                  </Text>
                  {editingDevice ? (
                    <TextInput
                      value={deviceDraft}
                      onChangeText={setDeviceDraft}
                      style={[
                        styles.deviceInput,
                        { color: palette.text, borderColor: palette.primary },
                      ]}
                      placeholder="Nome do seu Kindle"
                      placeholderTextColor={palette.textMuted}
                    />
                  ) : (
                    <Text style={[styles.deviceName, { color: palette.text }]}>
                      {syncDeviceName}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  style={[styles.smallActionBtn, { backgroundColor: palette.primary }]}
                  onPress={() =>
                    editingDevice ? handleSaveDevice() : setEditingDevice(true)
                  }
                >
                  <Ionicons
                    name={editingDevice ? 'checkmark-outline' : 'create-outline'}
                    size={16}
                    color="#FFFFFF"
                  />
                  <Text style={styles.smallActionBtnText}>
                    {editingDevice ? 'Salvar' : 'Editar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={[styles.subSectionTitle, { color: palette.text }]}>
              Conversor Local de Formatos (EPUB / PDF / CBZ / KFX / AZW3)
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.bookPickerScroll}
            >
              {books.map((book) => {
                const active = book.id === selectedConverterBook?.id;
                return (
                  <TouchableOpacity
                    key={book.id}
                    style={[
                      styles.miniBookCard,
                      {
                        backgroundColor: active ? palette.primary : palette.surface,
                        borderColor: active ? '#DAA520' : palette.border,
                      },
                    ]}
                    onPress={() => {
                      setConverterBookId(book.id);
                      setTargetFormat(book.format);
                    }}
                  >
                    <Image source={{ uri: book.coverUrl }} style={styles.miniBookCover} />
                    <View style={{ flex: 1 }}>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.miniBookTitle,
                          { color: active ? '#FFFFFF' : palette.text },
                        ]}
                      >
                        {book.title}
                      </Text>
                      <Text
                        style={[
                          styles.miniBookFormat,
                          { color: active ? '#F5EFE6' : palette.textMuted },
                        ]}
                      >
                        Atual: {book.format} • {book.fileSize}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={styles.formatRow}>
              {FORMAT_OPTIONS.map((fmt) => {
                const active = targetFormat === fmt;
                return (
                  <TouchableOpacity
                    key={fmt}
                    style={[
                      styles.formatBtn,
                      {
                        backgroundColor: active ? '#4682B4' : palette.surface,
                        borderColor: active ? '#4682B4' : palette.border,
                      },
                    ]}
                    onPress={() => setTargetFormat(fmt)}
                  >
                    <Text
                      style={[
                        styles.formatBtnText,
                        { color: active ? '#FFFFFF' : palette.text },
                      ]}
                    >
                      {fmt}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.converterActionsRow}>
              <TouchableOpacity
                style={[styles.primaryActionBtn, { backgroundColor: palette.primary }]}
                onPress={handleRunConversion}
              >
                <Ionicons name="swap-horizontal-outline" size={18} color="#FFFFFF" />
                <Text style={styles.primaryActionBtnText}>
                  Converter para {targetFormat}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.secondaryActionBtn, { borderColor: palette.primary }]}
                onPress={() => {
                  setSelectedBookId(selectedConverterBook.id);
                  navigation.navigate('Tela_Leitor', { bookId: selectedConverterBook.id });
                }}
              >
                <Ionicons name="book-outline" size={16} color={palette.primary} />
                <Text style={[styles.secondaryActionBtnText, { color: palette.primary }]}>
                  Abrir no Leitor
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.panelCard,
            { backgroundColor: palette.card, borderColor: palette.border },
          ]}
        >
          <View style={styles.panelHeader}>
            <Ionicons name="analytics-outline" size={20} color="#800020" />
            <Text style={[styles.panelTitle, { color: palette.text }]}>
              Distribuicao por Tema & Registro Rapido de Sessao
            </Text>
          </View>

          <View style={styles.categoryDistributionRow}>
            {[
              {
                key: 'Cientifico ou Tecnico',
                label: 'Cientifico & Tecnico',
                color: '#4682B4',
                icon: 'code-slash-outline',
              },
              {
                key: 'Manga',
                label: 'Manga Oriental',
                color: '#800020',
                icon: 'sparkles-outline',
              },
              {
                key: 'Romance',
                label: 'Romance & Literatura',
                color: '#006400',
                icon: 'heart-outline',
              },
            ].map((cat) => {
              const pages = statsSummary.byCategory[cat.key] || 0;
              const pct = Math.min(
                100,
                Math.round((pages / Math.max(1, statsSummary.totalPagesRead)) * 100)
              );
              return (
                <View
                  key={cat.key}
                  style={[
                    styles.catDistCard,
                    { backgroundColor: palette.surface, borderColor: palette.border },
                  ]}
                >
                  <View style={styles.catDistTop}>
                    <Ionicons name={cat.icon} size={16} color={cat.color} />
                    <Text style={[styles.catDistLabel, { color: palette.text }]}>
                      {cat.label}
                    </Text>
                  </View>
                  <Text style={[styles.catDistValue, { color: cat.color }]}>
                    {pages} pags ({pct}%)
                  </Text>
                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${pct}%`, backgroundColor: cat.color },
                      ]}
                    />
                  </View>
                </View>
              );
            })}
          </View>

          <View style={[styles.quickLogBox, { backgroundColor: palette.surface }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.quickLogTitle, { color: palette.text }]}>
                Registrar Leitura em "{selectedConverterBook?.title}"
              </Text>
              <Text style={[styles.quickLogSub, { color: palette.textMuted }]}>
                Atualiza imediatamente o painel de consistencia e o progresso do livro.
              </Text>
            </View>

            <View style={styles.quickInputsWrap}>
              <View style={styles.inputMiniGroup}>
                <Text style={[styles.inputMiniLabel, { color: palette.textMuted }]}>
                  Pags
                </Text>
                <TextInput
                  value={quickPages}
                  onChangeText={setQuickPages}
                  keyboardType="numeric"
                  style={[
                    styles.inputMini,
                    { color: palette.text, borderColor: palette.border, backgroundColor: palette.card },
                  ]}
                />
              </View>

              <View style={styles.inputMiniGroup}>
                <Text style={[styles.inputMiniLabel, { color: palette.textMuted }]}>
                  Min
                </Text>
                <TextInput
                  value={quickMinutes}
                  onChangeText={setQuickMinutes}
                  keyboardType="numeric"
                  style={[
                    styles.inputMini,
                    { color: palette.text, borderColor: palette.border, backgroundColor: palette.card },
                  ]}
                />
              </View>

              <TouchableOpacity
                style={[styles.logSubmitBtn, { backgroundColor: '#006400' }]}
                onPress={handleQuickLog}
              >
                <Ionicons name="add-circle-outline" size={18} color="#FFFFFF" />
                <Text style={styles.logSubmitBtnText}>Registrar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={[styles.subSectionTitle, { color: palette.text }]}>
            Historico Recente de Sessoes ({readingLogs.length} registros)
          </Text>

          {readingLogs.slice(0, 5).map((entry) => (
            <View
              key={entry.id}
              style={[
                styles.logHistoryRow,
                { borderBottomColor: palette.border },
              ]}
            >
              <View style={styles.logHistoryLeft}>
                <Ionicons name="bookmark" size={16} color={palette.primary} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.logBookTitle, { color: palette.text }]}>
                    {entry.bookTitle}
                  </Text>
                  <Text style={[styles.logMetaText, { color: palette.textMuted }]}>
                    {entry.category} • Data: {entry.date}
                  </Text>
                </View>
              </View>
              <View style={styles.logRightBadge}>
                <Text style={styles.logRightPages}>+{entry.pages} pags</Text>
                <Text style={[styles.logRightMins, { color: palette.textMuted }]}>
                  {entry.minutes} min
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View
          style={[
            styles.panelCard,
            { backgroundColor: palette.card, borderColor: palette.border },
          ]}
        >
          <View style={styles.panelHeader}>
            <Ionicons name="compass-outline" size={20} color={palette.primary} />
            <Text style={[styles.panelTitle, { color: palette.text }]}>
              Atalhos de Navegacao entre Telas (Atividade Pratica 10)
            </Text>
          </View>

          <View style={styles.navShortcutsGrid}>
            {[
              {
                route: 'Tela_Inicial',
                title: 'Tela_Inicial • Inicio',
                desc: 'Vitrine Jade Kindle & Momentum',
                icon: 'home-outline',
                color: '#704214',
              },
              {
                route: 'Tela_Biblioteca',
                title: 'Tela_Biblioteca • Biblioteca',
                desc: 'Pastas, Colecoes e Metadados',
                icon: 'library-outline',
                color: '#006400',
              },
              {
                route: 'Tela_Leitor',
                title: 'Tela_Leitor • Leitor Digital',
                desc: 'Tipografia Serif, Dicionario e Notas',
                icon: 'book-outline',
                color: '#800020',
              },
              {
                route: 'Tela_Explorar',
                title: 'Tela_Explorar • Loja Kindle',
                desc: 'Catalogo Tecnico, Manga e Romance',
                icon: 'compass-outline',
                color: '#4682B4',
              },
            ].map((item) => (
              <TouchableOpacity
                key={item.route}
                style={[
                  styles.shortcutCard,
                  { backgroundColor: palette.surface, borderColor: palette.border },
                ]}
                onPress={() => navigation.navigate(item.route)}
              >
                <View style={[styles.shortcutIconBox, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icon} size={18} color="#FFFFFF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.shortcutTitle, { color: palette.text }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.shortcutDesc, { color: palette.textMuted }]}>
                    {item.desc}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={palette.textMuted} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  topHeader: {
    paddingTop: Platform.OS === 'ios' ? 50 : 38,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(218, 165, 32, 0.25)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  profileBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#DAA520',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerEyebrow: {
    fontSize: 10,
    fontFamily: DESIGN_TOKENS.fonts.mono,
    color: '#DAA520',
    letterSpacing: 1.1,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: DESIGN_TOKENS.fonts.serif,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  headerSub: {
    fontSize: 12,
    color: '#E6D7C3',
    marginTop: 2,
  },
  syncHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#DAA520',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  syncHeaderBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#12100E',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  statusIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 100, 0, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBannerText: {
    flex: 1,
    fontSize: 13,
    fontFamily: DESIGN_TOKENS.fonts.mono,
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metricCard: {
    flex: 1,
    minWidth: 140,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
  },
  metricValue: {
    fontSize: 22,
    fontFamily: DESIGN_TOKENS.fonts.serif,
    fontWeight: '700',
    marginTop: 2,
  },
  metricLabel: {
    fontSize: 12,
  },
  twoColumnGrid: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'stretch',
  },
  singleColumnGrid: {
    flexDirection: 'column',
    gap: 16,
  },
  halfPanel: {
    flex: 1,
  },
  panelCard: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  panelTitle: {
    fontSize: 17,
    fontFamily: DESIGN_TOKENS.fonts.serif,
    fontWeight: '700',
    flex: 1,
  },
  panelSubtitle: {
    fontSize: 13,
    lineHeight: 19,
  },
  themeSelectorRow: {
    flexDirection: 'row',
    gap: 10,
  },
  themeOptionCard: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    gap: 6,
  },
  themeOptionTitle: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  themeOptionMeta: {
    fontSize: 10,
    fontFamily: DESIGN_TOKENS.fonts.mono,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
  goalChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  goalChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  goalChipText: {
    fontSize: 12,
    fontFamily: DESIGN_TOKENS.fonts.mono,
    fontWeight: '700',
  },
  deviceBox: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  deviceTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  deviceLabel: {
    fontSize: 10,
    fontFamily: DESIGN_TOKENS.fonts.mono,
    letterSpacing: 0.8,
  },
  deviceName: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
  },
  deviceInput: {
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 14,
  },
  smallActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  smallActionBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  subSectionTitle: {
    fontSize: 14,
    fontFamily: DESIGN_TOKENS.fonts.serif,
    fontWeight: '700',
    marginTop: 4,
  },
  bookPickerScroll: {
    maxHeight: 74,
  },
  miniBookCard: {
    width: 210,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 10,
  },
  miniBookCover: {
    width: 36,
    height: 52,
    borderRadius: 4,
  },
  miniBookTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  miniBookFormat: {
    fontSize: 11,
    fontFamily: DESIGN_TOKENS.fonts.mono,
    marginTop: 2,
  },
  formatRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  formatBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  formatBtnText: {
    fontSize: 12,
    fontFamily: DESIGN_TOKENS.fonts.mono,
    fontWeight: '700',
  },
  converterActionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  primaryActionBtn: {
    flex: 1,
    minWidth: 160,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  primaryActionBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  secondaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1.5,
  },
  secondaryActionBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  categoryDistributionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  catDistCard: {
    flex: 1,
    minWidth: 180,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  catDistTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  catDistLabel: {
    fontSize: 13,
    fontWeight: '700',
  },
  catDistValue: {
    fontSize: 14,
    fontFamily: DESIGN_TOKENS.fonts.mono,
    fontWeight: '700',
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(112, 66, 20, 0.15)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  quickLogBox: {
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickLogTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  quickLogSub: {
    fontSize: 12,
    marginTop: 2,
  },
  quickInputsWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  inputMiniGroup: {
    gap: 2,
  },
  inputMiniLabel: {
    fontSize: 10,
    fontFamily: DESIGN_TOKENS.fonts.mono,
  },
  inputMini: {
    width: 58,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 13,
    textAlign: 'center',
    fontFamily: DESIGN_TOKENS.fonts.mono,
  },
  logSubmitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
  },
  logSubmitBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  logHistoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    gap: 10,
  },
  logHistoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  logBookTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  logMetaText: {
    fontSize: 11,
    marginTop: 2,
  },
  logRightBadge: {
    alignItems: 'flex-end',
  },
  logRightPages: {
    fontSize: 13,
    fontFamily: DESIGN_TOKENS.fonts.mono,
    color: '#006400',
    fontWeight: '700',
  },
  logRightMins: {
    fontSize: 11,
    fontFamily: DESIGN_TOKENS.fonts.mono,
  },
  navShortcutsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  shortcutCard: {
    flex: 1,
    minWidth: 230,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  shortcutIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortcutTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  shortcutDesc: {
    fontSize: 11,
    marginTop: 2,
  },
});
