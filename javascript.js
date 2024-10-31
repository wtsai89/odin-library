const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const newBook = {}
  const title = document.querySelector("#title");
  newBook.title = title.value;
  title.value = "";
  const author = document.querySelector("#author");
  newBook.author = author.value;
  author.value = "";
  const pages = document.querySelector("#pages");
  newBook.pages = pages.value;
  pages.value = "";
  const unread = document.querySelector("#read_2");
  if (!unread.checked)
    newBook.read = "Read";
  else
    newBook.read = "Unread";
  unread.checked = true;
  newBook.color = randomColor();

  myLibrary.push(newBook);
}

const cardList = document.querySelector("#card-list");
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".new-book");
const submitButton = document.querySelector(".submit");
const cancelButton = document.querySelector(".cancel");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

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

  for (const book of myLibrary) {
    const newCard = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = book.title;
    const author = document.createElement("p")
    author.textContent = "Author: " + book.author;
    const pages = document.createElement("p");
    pages.textContent = "Pages: " + book.pages;
    const read = document.createElement("p");
    read.textContent = "Status: " + book.read;
    newCard.appendChild(title);
    newCard.appendChild(author);
    newCard.appendChild(pages);
    newCard.appendChild(read);
    newCard.className = "card";
    newCard.style.backgroundColor = book.color;

    cardList.appendChild(newCard);
  }
}

