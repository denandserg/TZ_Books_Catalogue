import {BookService} from "./bookService";

Object.filter = (obj, predicate) =>
    Object.keys(obj)
        .filter( key => predicate(obj[key]) )
        .reduce( (res, key) => (res[key] = obj[key], res), {} );

export class FilterBook {
    constructor(str) {
        this.filterString = str.toLowerCase().trim().split(' ');
    };

    getCurrentBookOfLocalStorage = () => {
        const bookSRV = new BookService();
        const curBooks = bookSRV.getBooksOfLocalStorageController();
        bookSRV.saveAllBooksToLocalStorageController(curBooks, 'bookCatalogue');
        return curBooks;
    };

    filteringBooks = () => {
        const allCurrentBooks = this.getCurrentBookOfLocalStorage();
        return this.filterString[0] === '' ? allCurrentBooks : this.compareTitle(allCurrentBooks);
    };

    compareTitle = (allCurBooks) => {
        return Object.filter(allCurBooks, book => book.title
            .trim()
            .toLowerCase()
            .split(' ')
            .some(el => this.filterString.includes(el)));
    }
}