"use strict";
class Book {
    title;
    author;
    category;
    isAvailable;
    constructor(title, author, category, isAvailable = true) {
        this.title = title;
        this.author = author;
        this.category = category;
        this.isAvailable = isAvailable;
    }
    getTitle() {
        return this.title;
    }
    getAuthor() {
        return this.author;
    }
    getCategory() {
        return this.category;
    }
    getAvailability() {
        return this.isAvailable;
    }
    displayInfo() {
        return `${this.title} "by" ${this.author} - ${this.category}`;
    }
    toggleAvailability() {
        this.isAvailable = !this.isAvailable;
    }
}
class ReferenceBook extends Book {
    locationCode;
    constructor(title, author, category, locationCode, isAvailable = true) {
        super(title, author, category, isAvailable);
        this.locationCode = locationCode;
    }
    getLocationCode() {
        return this.locationCode;
    }
    displayInfo() {
        return `${super.displayInfo()} "- location" ${this.locationCode}`;
    }
}
class Library {
    books = [];
    getBooks() {
        return this.books;
    }
    addBook(book) {
        this.books.push(book);
    }
    removeBook(title) {
        this.books = this.books.filter(book => book.getTitle() !== title);
    }
    searchBook(searchWord) {
        const search = searchWord.toLowerCase();
        return this.books.filter(book => book.getTitle().toLowerCase().includes(search)
            || book.getAuthor().toLowerCase().includes(search));
    }
    filterByCategory(category) {
        return this.books.filter(book => book.getCategory() === category);
    }
    toggleAvailability(title) {
        const book = this.books.find(book => book.getTitle() === title);
        if (book) {
            book.toggleAvailability();
        }
    }
}
let library = new Library();
let book1 = new Book("Ababil", "Ahmad Al-Hamdan", "Fantasy");
let book2 = new Book("AlJassasa", "Ahmad Al-Hamdan", "Fantasy");
let book3 = new Book("AlSijeel", "Ahmad Al-Hamdan", "Fantasy");
let book4 = new Book("AlZamhareer", "Ahmad Al-Hamdan", "Fantasy");
let book5 = new Book("أرض زيكولا", "عمرو عبد الحميد", "Adventure");
let book6 = new Book("بساتين علربستان", "أسامة سليم", "Adventure");
let referenceBook5 = new ReferenceBook("الاسود يليق بك", "احلام مستغانمي", "Romance", "A-12");
let referenceBook6 = new ReferenceBook("ذاكرة الجسد", "احلام مستغانمي", "Romance", "A-13");
let referenceBook7 = new ReferenceBook("عابر سرير", "احلام مستغانمي", "Romance", "A-14");
let referenceBook8 = new ReferenceBook("فوضى الحواس", "احلام مستغانمي", "Romance", "A-15");
let referenceBook9 = new ReferenceBook("ثلاثية غرناطة", "رضوى عاشور", "Literary Fiction", "B-1");
let referenceBook10 = new ReferenceBook("موسم الهجرة الى الشمال", "الطيب صالح", "Literary Fiction", "B-2");
let referenceBook11 = new ReferenceBook("موت صغير", "محمد حسن علوان", "Historical Fiction", "c-1");
let referenceBook12 = new ReferenceBook("سمرقند", "أمين معلوف", "Historical Fiction", "c-2");
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);
library.addBook(book4);
library.addBook(book5);
library.addBook(book6);
library.addBook(referenceBook5);
library.addBook(referenceBook6);
library.addBook(referenceBook7);
library.addBook(referenceBook8);
library.addBook(referenceBook9);
library.addBook(referenceBook10);
library.addBook(referenceBook11);
library.addBook(referenceBook12);
function renderBooks(books) {
    const container = document.getElementById("booksContainer");
    if (!container)
        return;
    container.innerHTML = "";
    books.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.innerHTML =
            `  <h2>${book.getTitle()}</h2>
            <p>Author: ${book.getAuthor()}</p>
            <p>Category: ${book.getCategory()}</p>
            ${book instanceof ReferenceBook ? `<p>Location : ${book.getLocationCode()}</p>` : ""}
            <p>Availability: ${book.getAvailability() ? "Available" : "Not Available"}</p>
            <button class = "availability-btn ">Change Availability</button>`;
        const button = card.querySelector(".availability-btn");
        button?.addEventListener("click", () => {
            library.toggleAvailability(book.getTitle());
            renderBooks(library.getBooks());
        });
        container.appendChild(card);
    });
}
renderBooks(library.getBooks());
const searchInput = document.querySelector("#searchInput");
searchInput?.addEventListener("input", () => {
    const query = searchInput.value;
    const results = library.searchBook(query);
    renderBooks(results);
});
const categoryFilter = document.querySelector("#categoryFilter");
categoryFilter?.addEventListener("change", () => {
    const category = categoryFilter.value;
    if (category == "") {
        renderBooks(library.getBooks());
    }
    else {
        const results = library.filterByCategory(category);
        renderBooks(results);
    }
});
