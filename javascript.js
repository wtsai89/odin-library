const cardList = document.querySelector("#card-list");
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".new-book");
const submitButton = document.querySelector(".submit");
const cancelButton = document.querySelector(".cancel");
const myLibrary = [];
//var idCount = 0;

class Book {
  constructor(title, author, pages, read, color) {
    this.title = title || "Untitled";
    this.author = author || "None";
    this.pages = pages || 0;
    this.read = read;
    this.color = color || randomColor();
    this.id = Book.idCount;
    Book.idCount += 1;
  }

  static idCount = 0;
}

const sampleBook1 = new Book("A Midsummer's Night Dream", "William Shakespeare", 9001, "Unread", "#deb887");
const sampleBook2 = new Book("Harry Potter and the Sorcerer's Stone", "J K Rowling", 456, "Read", "#9725c1");
const sampleBook3 = new Book("Chronicles of Narnia", "C S Lewis", 234, "Unread", "#25c154");

myLibrary.push(sampleBook1);
myLibrary.push(sampleBook2);
myLibrary.push(sampleBook3);
refreshCards();

/*
function Book(title, author, pages, read, color) {
  this.title = title || "Untitled";
  this.author = author || "None";
  this.pages = pages || 0;
  this.read = read;
  this.color = color || randomColor();
  this.id = idCount;
  idCount += 1;
}
*/

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const unread = document.querySelector("#read_2");

function addBookToLibrary() {
  newBook = new Book(title.value, author.value, pages.value, !unread.checked ? "Read" : "Unread");
  title.value = "";
  author.value = "";
  pages.value = "";
  unread.checked = true;
  myLibrary.push(newBook);
}

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

cancelButton.addEventListener("click", () => {
  title.value = "";
  author.value = "";
  pages.value = "";
  unread.checked = true;
  dialog.close();
})

submitButton.addEventListener("click", submitClose);

function submitClose(event) {
  addBookToLibrary();
  console.log(myLibrary);

  refreshCards();
  dialog.close();
  event.preventDefault();
}

function refreshCards() {
  while(cardList.lastElementChild) {
    cardList.removeChild(cardList.lastElementChild);
  }

  for (const book of myLibrary.filter(b => b)) {
    const newCard = document.createElement("div");
    const del = document.createElement("img");
    del.src = "./alpha-x-box.svg";
    del.alt = "delete button";
    del.addEventListener("click", () => {
      myLibrary[book.id] = null;
      refreshCards();
    })
    const title = document.createElement("h3");
    title.textContent = book.title;
    const authordiv = document.createElement("div");
    const author = document.createElement("span");
    author.textContent = book.author;
    const authorlabel = document.createElement("p")
    authorlabel.textContent = "Author: ";
    authordiv.appendChild(authorlabel);
    authordiv.appendChild(author);
    const pages = document.createElement("span");
    pages.textContent = book.pages;
    const pagesLabel = document.createElement("p");
    pagesLabel.textContent = "Pages: ";
    pagesLabel.appendChild(pages);
    const readDiv = document.createElement("div");
    const readLabel = document.createElement("p");
    readLabel.textContent = "Status: "
    const readButton = document.createElement("button");
    if (book.read == "Read")
      readButton.textContent = "Read";
    else
      readButton.textContent = "Unread";
    readButton.addEventListener("click", () => {
      if (book.read == "Read")
        book.read = "Unread";
      else
        book.read = "Read"
      refreshCards();
    })
    readDiv.appendChild(readLabel);
    readDiv.appendChild(readButton);
    newCard.appendChild(del);
    newCard.appendChild(title);
    newCard.appendChild(authordiv);
    newCard.appendChild(pagesLabel);
    newCard.appendChild(readDiv);
    newCard.className = "card";
    newCard.style.backgroundColor = book.color;

    cardList.appendChild(newCard);
  }
}

