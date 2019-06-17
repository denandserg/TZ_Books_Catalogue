export class BookEditor {
    constructor() {
        this.title = document.querySelector('#inputTitle');
        this.author = document.querySelector('#inputAuthor');
        this.year = document.querySelector('#inputYear');
        this.phone = document.querySelector('#inputPhone');
        this.address = document.querySelector('#inputAddress');
        this.production = document.querySelector('#inputProduction');
        this.heading = document.querySelector('#inputHeading');
        this.photo = document.querySelector('#inputPhoto');
    };

    setValueOnInput = () => {
        const obj = JSON.parse(localStorage.getItem('editBook'));
        const key = obj[Object.keys(obj)[0]];
        this.title.value = key.title;
        this.author.value = key.author;
        this.year.value = key.year;
        this.production.value = key.production;
        this.address.value = key.address;
        this.phone.value = key.phone;
        this.heading.value = key.heading;
    };

    createBook = () => {
        return {
            photo: handlePhoto(this.photo.files),
            title: this.title.value,
            author: this.author.value,
            year: this.year.value,
            production: this.production.value,
            address: this.address.value,
            phone: this.phone.value,
            heading: this.heading.value,
        };

        function handlePhoto (obj) {
            const arrPhoto = [];
            for (let el of obj) {
                arrPhoto.push(el.name);
            }
            switch (arrPhoto.length) {
                case 1:
                    let a = 0;
                    while (a<7) {
                        arrPhoto[a+1]=arrPhoto[0];
                        a++;
                    }
                    return arrPhoto;
                case 2:
                    let b = 0;
                    while (b<6) {
                        arrPhoto[b+2]=arrPhoto[0];
                        b++;
                    }
                    return arrPhoto;
                case 3:
                    let c = 0;
                    while (c<5) {
                        arrPhoto[c+3]=arrPhoto[0];
                        c++;
                    }
                    return arrPhoto;
                case 4:
                    let x = 0;
                    while (x<4) {
                        arrPhoto[x+4]=arrPhoto[0];
                        x++;
                    }
                    return arrPhoto;
                case 5:
                    let z = 0;
                    while (z<3) {
                        arrPhoto[z+5]=arrPhoto[0];
                        z++;
                    }
                    return arrPhoto;
                case 6:
                    let q = 0;
                    while (q<2) {
                        arrPhoto[q+6]=arrPhoto[0];
                        q++;
                    }
                    return arrPhoto;
            }
        }
    }
}