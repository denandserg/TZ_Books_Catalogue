export class BookService {
    constructor() {
        this.allBooks = {};
        this.count = +JSON.parse(localStorage.getItem('countBooks')) || 0;
    }

    getBooksOfLocalStorageController = () => {
        if (localStorage.getItem('filterCatalogue')) {
            return this.allBooks = JSON.parse(localStorage.getItem('filterCatalogue'));
        }
        if (localStorage.getItem('bookCatalogue'))  {
            return this.allBooks = JSON.parse(localStorage.getItem('bookCatalogue'));
        } else {
            return this.allBooks;
        }
    };

    saveBooksToLocalStorageController = (obj) => {
        const curBooks = this.getBooksOfLocalStorageController();
        curBooks[`${this.count}`] = obj;
        localStorage.setItem('bookCatalogue', this.serializeObj(curBooks));
        this.count++;
        localStorage.setItem('countBooks', JSON.stringify(this.count.toString()));
    };

    saveAllBooksToLocalStorageController = (obj, keyCatalogue) => {
        this.allBooks = obj;
        localStorage.setItem(`${keyCatalogue}`, this.serializeObj(this.allBooks));
    };

    deleteLocalStorageFilter = () => {
        localStorage.removeItem('filterCatalogue');
    };

    updateBooksToLocaleStorageController = (key, obj) => {
        const curBooks = this.getBooksOfLocalStorageController();
        curBooks[key] = obj;
        localStorage.setItem('bookCatalogue', this.serializeObj(curBooks));
    };

    serializeObj = (obj) => {
        return JSON.stringify(obj);
    };
}