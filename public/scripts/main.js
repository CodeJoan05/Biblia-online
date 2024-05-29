// Mapowanie angielskich nazw ksiąg na polskie
const translationMap = {
    "Genesis": "Księga Rodzaju",
    "Exodus": "Księga Wyjścia",
    "Leviticus": "Księga Kapłańska",
    "Numbers": "Księga Liczb",
    "Deuteronomy": "Księga Powtórzonego Prawa",
    "Joshua": "Księga Jozuego",
    "Judges": "Księga Sędziów",
    "Ruth": "Księga Rut",
    "1 Samuel": "1 Księga Samuela",
    "2 Samuel": "2 Księga Samuela",
    "1 Kings": "1 Księga Królewska",
    "2 Kings": "2 Księga Królewska",
    "1 Chronicles": "1 Księga Kronik",
    "2 Chronicles": "2 Księga Kronik",
    "Ezra": "Księga Ezdrasza",
    "Nehemiah": "Księga Nehemiasza",
    "Esther": "Księga Estery",
    "Job": "Księga Hioba",
    "Psalms": "Księga Psalmów",
    "Proverbs": "Księga Przysłów",
    "Ecclesiastes": "Księga Kaznodziei",
    "Song of Solomon": "Pieśń nad Pieśniami",
    "Isaiah": "Księga Izajasza",
    "Jeremiah": "Księga Jeremiasza",
    "Lamentations": "Lamentacje Jeremiasza",
    "Ezekiel": "Księga Ezechiela",
    "Daniel": "Księga Daniela",
    "Hosea": "Księga Ozeasza",
    "Joel": "Księga Joela",
    "Amos": "Księga Amosa",
    "Obadiah": "Księga Abdiasza",
    "Jonah": "Księga Jonasza",
    "Micah": "Księga Micheasza",
    "Nahum": "Księga Nahuma",
    "Habakkuk": "Księga Habakuka",
    "Zephaniah": "Księga Sofoniasza",
    "Haggai": "Księga Aggeusza",
    "Zechariah": "Księga Zachariasza",
    "Malachi": "Księga Malachiasza",
    "Matthew": "Ewangelia Mateusza",
    "Mark": "Ewangelia Marka",
    "Luke": "Ewangelia Łukasza",
    "John": "Ewangelia Jana",
    "Acts": "Dzieje Apostolskie",
    "Romans": "List do Rzymian",
    "1 Corinthians": "1 List do Koryntian",
    "2 Corinthians": "2 List do Koryntian",
    "Galatians": "List do Galacjan",
    "Ephesians": "List do Efezjan",
    "Philippians": "List do Filipian",
    "Colossians": "List do Kolosan",
    "1 Thessalonians": "1 List do Tesaloniczan",
    "2 Thessalonians": "2 List do Tesaloniczan",
    "1 Timothy": "1 List do Tymoteusza",
    "2 Timothy": "2 List do Tymoteusza",
    "Titus": "List do Tytusa",
    "Philemon": "List do Filemona",
    "Hebrews": "List do Hebrajczyków",
    "James": "List Jakuba",
    "1 Peter": "1 List Piotra",
    "2 Peter": "2 List Piotra",
    "1 John": "1 List Jana",
    "2 John": "2 List Jana",
    "3 John": "3 List Jana",
    "Jude": "List Judy",
    "Revelation": "Objawienie Jana"
};

// Mapowanie przekładów Biblii na ich nazwy w plikach JSON
const bibleTranslationFiles = {
    "Polskie": ["Biblia Brzeska (1563).json", "Biblia Nieświeska (1574).json", "Biblia Jakuba Wujka (1599).json", "Biblia Gdańska (1632).json", "Biblia Gdańska (1881).json", "Biblia Szwedzka (1948).json", "Biblia Poznańska (1975).json", "Biblia Warszawska (1975).json", "Słowo Życia (1989).json", "Biblia Tysiąclecia - wydanie V (1999).json", "Słowo Nowego Przymierza - przekład dosłowny (2004).json", "Biblia Góralska (2005).json", "Nowa Biblia Gdańska (2012).json", "Biblia Paulistów (2016).json", "Uwspółcześniona Biblia Gdańska (2017).json", "Biblia Ekumeniczna (2018).json", "Słowo Nowego Przymierza - przekład literacki (2018).json", "Przekład Toruński Nowego Przymierza (2020).json", "Textus Receptus Oblubienicy (2023).json"],
    "Angielskie": ["King James Version (1611).json"],
    "Niemieckie": ["Schlachter Bibel (1951).json"],
    "Łacińskie": ["Wulgata.json"],
    "Greckie": ["Textus Receptus (1550).json", "Tekst Bizantyjski (2013).json"],
    "Hebrajskie": ["Westminster Leningrad Codex.json"]
};

// Funkcja do pobierania danych z pliku JSON
function fetchBibleData(translationFile) {
    return fetch(`/bibles/${translationFile}`)
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
}

// Funkcja do pobierania danych z localStorage
function getSavedData(key) {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : null;
}

// Funkcja do zapisywania danych do localStorage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Funkcja do pobierania dostępnych przekładów Biblii i uzupełniania opcji
function loadBibleTranslations() {
    let biblesSelect = document.getElementById('bibles');
    const savedTranslation = getSavedData('translation');
    
    // Iteruje przez mapę przekładów Biblii
    Object.keys(bibleTranslationFiles).forEach(group => {
        let optgroup = document.createElement('optgroup');
        optgroup.label = group;
        biblesSelect.appendChild(optgroup);

        // Iteruje przez przekłady Biblii w danym labelu
        bibleTranslationFiles[group].forEach(translationFile => {
            // Tworzy opcję dla przekładu Biblii
            let option = document.createElement('option');
            option.text = translationFile.replace('.json', ''); // Usuwa rozszerzenie .json
            option.value = translationFile;
            optgroup.appendChild(option);
        });
    });

    // Ustawia wybrany przekład zapisany w localStorage
    if (savedTranslation) {
        biblesSelect.value = savedTranslation;
    }
    // Wywołuje zdarzenie zmiany, aby zainicjować pobranie danych dla ostatniego przekładu
    biblesSelect.dispatchEvent(new Event('change'));
}

// Funkcja do ustawienia danych o ostatnio wybranej księdze i rozdziale
function setLastSelectedBookAndChapter(book, chapter) {
    saveData('lastSelectedBook', book);
    saveData('lastSelectedChapter', chapter);
}

// Pobiera dane o ostatnio wybranej księdze i rozdziale
function getLastSelectedBookAndChapter() {
    const lastSelectedBook = getSavedData('lastSelectedBook');
    const lastSelectedChapter = getSavedData('lastSelectedChapter');
    return { book: lastSelectedBook, chapter: lastSelectedChapter };
}

// Funkcja do pobierania danych z wybranego przekładu Biblii
function loadBibleData(translationFile, lastSelectedBook, lastSelectedChapter) {
    // Pobiera dane z pliku JSON
    fetchBibleData(translationFile)
        .then(data => {
            // Tworzy opcje dla ksiąg
            let books = [...new Set(data.map(item => translationMap[item.book_name] || item.book_name))];
            let booksSelect = document.getElementById('books');
            booksSelect.innerHTML = '';
            books.forEach(book => {
                let option = document.createElement('option');
                option.text = book;
                option.value = book;
                booksSelect.add(option);
            });
            // Ustawia ostatnio wybraną księgę
            if (lastSelectedBook) {
                booksSelect.value = lastSelectedBook;
            }
            // Wywołuje zdarzenie zmiany, aby zainicjować pobranie danych dla ostatniej księgi
            booksSelect.dispatchEvent(new Event('change'));
        })
        .catch(error => console.error('Error:', error));
}

// Pobiera dostępne przekłady Biblii i uzupełnia opcje
loadBibleTranslations();

// Obsługa zmiany przekładu Biblii
document.getElementById('bibles').addEventListener('change', function() {
    const translationFile = this.value;
    // Zapisuje wybrany przekład do localStorage
    saveData('translation', translationFile);
    // Pobiera dane z wybranego przekładu Biblii
    const { book, chapter } = getLastSelectedBookAndChapter();
    loadBibleData(translationFile, book, chapter);
});

// Obsługa zmiany księgi
document.getElementById('books').addEventListener('change', function() {
    const translationFile = document.getElementById('bibles').value;
    const book = this.value;
    // Zapisuje wybraną księgę do localStorage
    saveData('book', book);
    // Pobiera ostatnio zaznaczony rozdział z localStorage
    const savedChapter = getSavedData('chapter');
    const chapter = savedChapter || 1; // Domyślnie wybiera pierwszy rozdział, jeśli nie ma zapisanego w localStorage
    // Zapisuje wybrany rozdział do localStorage
    saveData('chapter', chapter);
    // Ustawia dane o ostatnio wybranej księdze i rozdziale
    setLastSelectedBookAndChapter(book, chapter);
    // Pobiera dane dla wybranej księgi
    fetchBibleData(translationFile)
        .then(data => {
            // Filtruje dane tylko dla wybranej księgi
            const chapters = [...new Set(data.filter(item => (translationMap[item.book_name] || item.book_name) === book).map(item => item.chapter))];
            // Uzupełnia opcje z rozdziałami
            const chaptersSelect = document.getElementById('chapters');
            chaptersSelect.innerHTML = '';
            chapters.forEach(chapter => {
                const option = document.createElement('option');
                option.text = chapter;
                option.value = chapter;
                chaptersSelect.add(option);
            });
            // Ustawia ostatnio wybrany rozdział
            chaptersSelect.value = chapter;
            // Wywołuje zdarzenie zmiany, aby zainicjować pobranie danych dla ostatniego rozdziału
            chaptersSelect.dispatchEvent(new Event('change'));
        })
        .catch(error => console.error('Error:', error));
});

// Obsługa zmiany rozdziału
document.getElementById('chapters').addEventListener('change', function() {
    const translationFile = document.getElementById('bibles').value;
    const book = document.getElementById('books').value;
    const chapter = this.value;
    // Zapisuje wybrany rozdział do localStorage
    saveData('chapter', chapter);
    // Ustawia dane o ostatnio wybranej księdze i rozdziale
    setLastSelectedBookAndChapter(book, chapter);
    // Pobiera dane dla wybranego rozdziału
    fetchBibleData(translationFile)
        .then(data => {
            // Pobiera tekst całego rozdziału
            const versesInChapter = data
                .filter(item => (translationMap[item.book_name] || item.book_name) === book && item.chapter == chapter)
                .map(item => {
                    // Formatuje tekst w nawiasach kwadratowych na czcionkę italic
                    let formattedText = item.text.replace(/\[([^\]]+)\]/g, '<i>$1</i>');
                    return `<div class="row"><div class="col-2 col-lg-1 d-flex align-items-center justify-content-center">${chapter}:${item.verse}</div><div class="col-10 col-lg-11 verse">${formattedText}</div></div>`;
                })
                .join('');
            // Wyświetla tekst całego rozdziału
            const container = document.getElementById('container');
            container.innerHTML = versesInChapter;
            
            // Pobiera listę dostępnych wersetów dla danego rozdziału
            const verseSelect = document.getElementById('verse');
            verseSelect.innerHTML = '';
            const verses = data
                .filter(item => (translationMap[item.book_name] || item.book_name) === book && item.chapter == chapter)
                .map(item => item.verse);
            verses.forEach(verse => {
                const option = document.createElement('option');
                option.text = verse;
                option.value = verse;
                verseSelect.add(option);
            });
        })
        .catch(error => console.error('Error:', error));
});

// Obsługa zmiany wersetu
document.getElementById('verse').addEventListener('change', function() {
    const verse = this.value;
    // Płynne przewinięcie do wybranego wersetu
    const verseElement = document.querySelector(`div.row:nth-child(${parseInt(verse)})`);
    if (verseElement) {
        verseElement.scrollIntoView({ behavior: 'smooth' });
    }
});

// Po załadowaniu strony, pobiera ostatnio wybrane dane i wczytuje odpowiednie dane z wybranego przekładu Biblii
window.onload = function() {
    const translationFile = getSavedData('translation');
    if (translationFile) {
        const { book, chapter } = getLastSelectedBookAndChapter();
        loadBibleData(translationFile, book, chapter);
    }
};

// Zastępuje zdarzenia 'unload' i 'beforeunload' zdarzeniem 'pagehide'
window.addEventListener('pagehide', function(){});
