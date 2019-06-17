import '../less/normalize.less';
import '../less/some.less';
import {BookService} from "./bookService";
import {FilterBook} from "./filterBook";
import {BookEditor} from "./bookEditor";

window.onload = () => {

    if (window.document.body.dataset.id === 'main') {
        const btnFilter = document.querySelector('#btnFilter');
        const inputFilter = document.querySelector('#inputFilter');
        const btnAdd = document.querySelector('#btnAdd');
        const bookList = document.querySelector('.books-list');
        const bookService = new BookService();

        if(!localStorage.getItem('bookCatalogue')) {
            init();
        }

        renderBooksofLocalStorage();
        bookService.deleteLocalStorageFilter();
        startSlider();

        btnAdd.addEventListener('click', addBook);
        btnFilter.addEventListener('click', filterApply);

        function filterApply () {
            let regex = inputFilter.value;
            const filterBook = new FilterBook(regex);
            bookService.saveAllBooksToLocalStorageController(filterBook.filteringBooks(), 'filterCatalogue');
            window.location.reload();
        }

        function addBook() {
            window.location.replace('/editBook.html');
        }

        function init() {
            const book = {
                photo: ['shildt2.jpg', 'shildt1.jpg', 'shildt2.jpg', 'shildt1.jpg', 'shildt2.jpg', 'shildt1.jpg', 'shildt2.jpg', 'shildt1.jpg'],
                title: 'C# 4.0 Полное руководство',
                author: 'Герберт Шилдт',
                year: 2001,
                production: 'ЧП "Антарес"',
                address: 'г.Днепр, Карла маркса 999/7',
                phone: '099 - 999 - 99 - 99',
                heading: 'Программирование',
            };

            const book2 = {
                photo: ['shildt3.jpg', 'shildt2.jpg', 'shildt3.jpg', 'shildt2.jpg', 'shildt3.jpg', 'shildt2.jpg', 'shildt2.jpg', 'shildt1.jpg'],
                title: 'C# 9.0 Полное руководство',
                author: 'Вася',
                year: 2222,
                production: 'ЧЧЧЧЧЧЧЧ',
                address: 'г.Днепр, Карла маркса 999/7',
                phone: '099 - 999 - 99 - 99',
                heading: 'Программирование',
            };

            const book3 = {
                photo: ['shildt3.jpg', 'shildt2.jpg', 'shildt3.jpg', 'shildt2.jpg', 'shildt3.jpg', 'shildt2.jpg', 'shildt2.jpg', 'shildt1.jpg'],
                title: 'Javascript',
                author: 'Вася',
                year: 2222,
                production: 'ЧЧЧЧЧЧЧЧ',
                address: 'г.Днепр, Карла маркса 999/7',
                phone: '099 - 999 - 99 - 99',
                heading: 'Программирование',
            };

            bookService.saveBooksToLocalStorageController(book);
            bookService.saveBooksToLocalStorageController(book2);
            bookService.saveBooksToLocalStorageController(book3);
        }

        function renderBooksofLocalStorage() {
            const objBooks = bookService.getBooksOfLocalStorageController();

            function addPhoto (book) {
                const curBook = objBooks[book];
                let imgHtml = '';
                curBook.photo.forEach( (el, i) => {
                    if (i === 0) {
                        let elHTML = `<img class="slide showing" src="./img/${el}">`;
                        imgHtml+=elHTML;
                    } else {
                        let elHTML = `<img class="slide" src="./img/${el}">`;
                        imgHtml+=elHTML;
                    }
                });
                return imgHtml;
            }

            for (let book in objBooks) {
                const currentBook = document.createElement('li');
                currentBook.classList.add('book');
                currentBook.dataset.key = `${book}`;
                currentBook.innerHTML = `<div class="book_photo slides">${addPhoto(book)}</div><div class="book-description"> <div class="book_title">${objBooks[book].title}</div><div class="book_author">Автор: ${objBooks[book].author}</div><div class="book_date-production txt-sm">Год издания: ${objBooks[book].year}</div><div class="book_name-production txt-sm">Издательство: ${objBooks[book].production}</div><div class="book_address-production txt-sm">Адресс издательства: ${objBooks[book].address}</div><div class="book_phone-production txt-sm">Телефон издательства: ${objBooks[book].phone}</div><div class="book_heading txt-sm">Рубрика: ${objBooks[book].heading}</div></div><div class="book-btn-wrapper disabled"><button class="btn btn-edit" data-key='${book}'>Edit</button> <button class="btn btn-danger" data-key='${book}'>Delete</button> </div>`;
                bookList.appendChild(currentBook);
            }

            const btnDel = document.querySelectorAll('.btn-danger');
            btnDel.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    delete objBooks[e.target.dataset.key];
                    bookService.saveAllBooksToLocalStorageController(objBooks, 'bookCatalogue');
                    window.location.reload();
                });
            });

            const btnEdit = document.querySelectorAll('.btn-edit');
            btnEdit.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const numberBook = e.target.dataset.key;
                    const curBook = bookService.getBooksOfLocalStorageController();
                    const editBook = {};
                    editBook[numberBook]=curBook[numberBook];
                    localStorage.setItem('editBook', JSON.stringify(editBook));
                    window.location.replace('/editBook.html');
                });
            });
        }

        function startSlider () {
            const slideInterval = setInterval(nextSlide,3000);
            const slides = document.querySelectorAll('.slides');

            function nextSlide() {
                slides.forEach(slider => {
                    slider.childNodes.forEach((el, i) => {
                        if(el.className === 'slide showing') {
                            i=i-1;
                            el.className = 'slide';
                            if (!slider.childNodes[i]) {
                                slider.childNodes[slider.childNodes.length-1].className = 'slide showing';
                            } else {
                                slider.childNodes[i].className = 'slide showing';
                            }
                        }
                    });
                });
            }
        }

        const books = document.querySelectorAll('.book');

        books.forEach(book => {
            book.addEventListener('mouseover', mouseOverBookHandler);
            book.addEventListener('mouseout', mouseOutBookHandler);
        });

        function mouseOutBookHandler () {
            this.childNodes[this.childNodes.length-1].classList.add('disabled');
        }

        function mouseOverBookHandler () {
            this.childNodes[this.childNodes.length-1].classList.remove('disabled');
        }
    } else {
        const title = document.querySelector('#titleHandle');
        const bookEditor = new BookEditor();
        const flag = localStorage.getItem('editBook');
        if (flag) {
            bookEditor.setValueOnInput();
            title.innerHTML = 'Edit book';
        } else {
            title.innerHTML = 'Add book';
        }
        const formEditor = document.querySelector('#formEditor');
        formEditor.addEventListener('submit', formBookHandler);

        function formBookHandler (e) {
            e.preventDefault();
            const bookServ = new BookService();
            if (flag) {
                const key = Object.keys(JSON.parse(localStorage.getItem('editBook')))[0];
                const book = bookEditor.createBook();
                if (book.photo.length >= 9) {
                    alert('Max limit of book photo - 8!');
                    return;
                }
                bookServ.updateBooksToLocaleStorageController(key, book);
            } else {
                const book = bookEditor.createBook();
                if (book.photo.length >= 9) {
                    alert('Max limit of book photo - 8!');
                    return;
                }
                bookServ.saveBooksToLocalStorageController(book);
            }
            localStorage.removeItem('editBook');
            window.location.replace('/');
        }
    }
};

