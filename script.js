//const maxCount = +(document.getElementById('count').value);
class Book {
    constructor(title, author, isbn, genre, count=1,availability = true) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.genre = genre;
        this.availability = availability;
        this.count = count;

    }
    
    

}



class LibraryCatalog {
    constructor() {
        this.books = JSON.parse(localStorage.getItem('libraryCatalog')) || [];
    }

    addBook(book) {
             
            //console.log(this.books[1].isbn,book.isbn);
            for(let val of this.books){

                if(val.isbn === book.isbn){
                    
                    //console.log(val.isbn,book.isbn,book.count);
                    val.count++;
                    maxCount = val.count;
                    this.updateLocalStorage();
                    return;
                }
            }
        
            this.books.push(book);
            //maxCount = book.count;
            this.updateLocalStorage();
            this.displayBooks();
    }

    removeBook(isbn) {
        this.books = this.books.filter(book => book.isbn !== isbn);
        this.updateLocalStorage();
        this.displayBooks();
    }

    updateLocalStorage() {
        localStorage.setItem('libraryCatalog', JSON.stringify(this.books));
    }

    displayBooks() {
        const bookList = document.getElementById("catalog-info");
        bookList.innerHTML = '';
        this.books.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('container');
            bookItem.innerHTML = `
                <p><strong>Title:</strong> ${book.title}</p>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>ISBN:</strong> ${book.isbn}</p>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <p><strong>Availability:</strong> ${book.availability ? 'Available' : 'Not Available'}</p>
                <button style="margin-bottom:5px;" onclick="removeBook('${book.isbn}')">Remove</button>
                <button style="margin-bottom:5px;" onclick="showBookDetails('${book.isbn}')">Details</button>
                <button onclick="checkoutBook('${book.isbn}')">Checkout</button>
                <button onclick="returnBook('${book.isbn}')">Return</button>
            `;
            bookList.appendChild(bookItem);
        });
    }

    display(filteredBooks){

        const bookList = document.getElementById("catalog-info");
        bookList.innerHTML = '';
        filteredBooks.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('container');
            bookItem.innerHTML = `
                <p><strong>Title:</strong> ${book.title}</p>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>ISBN:</strong> ${book.isbn}</p>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <p><strong>Availability:</strong> ${book.availability ? 'Available' : 'Not Available'}</p>
                <button style="margin-bottom:5px;" onclick="removeBook('${book.isbn}')">Remove</button>
                <button style="margin-bottom:5px;" onclick="showBookDetails('${book.isbn}')">Details</button>
                <button onclick="checkoutBook('${book.isbn}')">Checkout</button>
                <button onclick="returnBook('${book.isbn}')">Return</button>
            `;
            bookList.appendChild(bookItem);
        });
    }

    searchBooks(keyword,type) {
        const filteredBooks = this.books.filter(book =>

            book[`${type}`].toLowerCase().includes(keyword.toLowerCase())
        );

        console.log(filteredBooks);
        this.display(filteredBooks);
    }

    displayBookDetails(isbn) {
        const book = this.books.find(book => book.isbn === isbn);
        console.log(book);
        if (book) {
            alert(`Title: ${book.title}\nAuthor: ${book.author}\nISBN: ${book.isbn}\nGenre: ${book.genre}\nAvailability: ${book.availability ? 'Available' : 'Not Available'}`);
        } else {
            alert('Book not found.');
        }
    }

    
    checkoutBook(isbn) {
        const book = this.books.find(book => book.isbn === isbn);
        if (book) {

             
            if(book.count<=0){
                book.availability = false;
                this.updateLocalStorage();
                this.displayBooks();
                alert('Book Not Available');
                return;
            }
            book.count -=1;
            this.updateLocalStorage();
            this.displayBooks();
            alert(`Book "${book.title}" has been checked out. Only ${book.count} books are left`);

        } else {
            alert('Book not found.');
        }
    }

    
    returnBook(isbn) {
        //const cnt = 5;
        //console.log(cnt);
        const book = this.books.find(book => book.isbn === isbn);
        if (book) {
            book.availability = true;
            //book.count++;
            console.log(book.count, maxCount);
            if(book.count<maxCount){
            book.count+=1;
            this.updateLocalStorage();
            this.displayBooks();
            alert(`Book "${book.title}" has been returned. Stock left ${book.count}`);
            return;
            }
            else{
                alert('All copies of books available')
            }
        
        } else {
            alert('Book not found.');
        }
    }
}

/*class ReferenceBooks extends libraryCatalog{

    constructor(rating){
        
        super(libraryCatalog);
        this._rating = rating;
    }

    set rating(value){
        this._rating=value;
    }

    get rating(){
        return this._rating;
    }

    displayRating(){
          console.log(`The book rating is ${this._rating}`)
    }
}*/

var maxCount=0;
let libraryCatalog = new LibraryCatalog(); 
 
function removeBook(isbn) {
    libraryCatalog.removeBook(isbn);
}

 
function showBookDetails(isbn) {
    libraryCatalog.displayBookDetails(isbn);
}

 
function checkoutBook(isbn) {
    libraryCatalog.checkoutBook(isbn);
}

 
function returnBook(isbn) {
    libraryCatalog.returnBook(isbn);
}



function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const genre = document.getElementById('genre').value;
     
    const newBook = new Book(title, author, isbn, genre);
    libraryCatalog.addBook(newBook);

    // Clear form fields after adding the book
    
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
    document.getElementById('genre').value = '';
    //document.getElementById('count').value='';
}


libraryCatalog.displayBooks();


function bookSearch(){

    selectElement = document.querySelector('#select1');
    output = selectElement.value;
    this.value = document.getElementById('search').value;
    libraryCatalog.searchBooks(this.value,output);
}
