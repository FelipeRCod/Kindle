import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  INITIAL_BOOKS,
  INITIAL_FOLDERS,
  INITIAL_READING_LOGS,
  createFolderEntity,
  createReadingLogEntity,
  computeReadingMomentumStats,
  computeLibrarySummary,
} from '../models/BookModel';
import { DESIGN_TOKENS, resolveThemePalette } from '../models/DesignModel';

export { DESIGN_TOKENS };

const KindleControllerContext = createContext(null);

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
  const [syncDeviceName, setSyncDeviceName] = useState(
    'Kindle Paperwhite Signature (USB/Wi-Fi)'
  );

  const selectedBook = useMemo(
    () => books.find((b) => b.id === selectedBookId) || books[0],
    [books, selectedBookId]
  );

  const momentumStats = useMemo(
    () => computeReadingMomentumStats(readingLogs, dailyGoalPages),
    [readingLogs, dailyGoalPages]
  );

  const librarySummary = useMemo(
    () => computeLibrarySummary(books, readingLogs),
    [books, readingLogs]
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
    const newFolder = createFolderEntity(name);
    if (!newFolder) return;
    setFolders((prev) => [...prev, newFolder]);
  };

  const logReadingSession = ({ bookId, pages, minutes, date }) => {
    const targetBook = books.find((b) => b.id === bookId) || selectedBook;
    const newEntry = createReadingLogEntity({
      targetBook,
      pages,
      minutes,
      date,
    });
    setReadingLogs((prev) => [newEntry, ...prev]);
    const nextCurrentPage = Math.min(
      targetBook.totalPages,
      targetBook.currentPage + newEntry.pages
    );
    const nextPercent = Math.round(
      (nextCurrentPage / Math.max(1, targetBook.totalPages)) * 100
    );
    updateBookProgress(targetBook.id, nextCurrentPage, nextPercent);
  };

  const convertBookFormat = (bookId, targetFormat) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === bookId ? { ...book, format: targetFormat } : book
      )
    );
  };

  const switchGlobalTheme = (nextTheme) => {
    setAppTheme(nextTheme);
    setReaderSettings((prev) => ({ ...prev, theme: nextTheme }));
  };

  const palette = useMemo(() => resolveThemePalette(appTheme), [appTheme]);

  return (
    <KindleControllerContext.Provider
      value={{
        books,
        folders,
        readingLogs,
        selectedBook,
        selectedBookId,
        setSelectedBookId,
        appTheme,
        setAppTheme,
        switchGlobalTheme,
        palette,
        readerSettings,
        setReaderSettings,
        dailyGoalPages,
        setDailyGoalPages,
        syncDeviceName,
        setSyncDeviceName,
        momentumStats,
        librarySummary,
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
    </KindleControllerContext.Provider>
  );
}

export function useKindleController() {
  return useContext(KindleControllerContext);
}

export function useKindle() {
  return useContext(KindleControllerContext);
}
