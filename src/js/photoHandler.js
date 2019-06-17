export class PhotoHandler {
    constructor() {
        this.inputPhoto = document.getElementById('inputPhoto');
    }

    setBase64Image = () => {
        const files = this.inputPhoto.files;
        const allPhoto = [];
        for (let i = 0; i <=files.length-1; i++) {
            const reader = new FileReader();
            reader.onload = (function() {
                return function(e) {
                    allPhoto.push(e.target.result);
                    localStorage.setItem('img', JSON.stringify(allPhoto));
                };
            })(files[i]);
            reader.readAsDataURL(files[i]);
        }
    };

    getBase64Image = () => {
        return JSON.parse(localStorage.getItem('img'));
    }
}