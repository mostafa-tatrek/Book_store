class Author {
  constructor(authorName, authorEmail) {
      this.authorName = authorName;
      this.authorEmail = authorEmail;
  }
}

class Book {
  constructor(id, bookName, bookPrice, authorName, authorEmail) {
      this.id = id;
      this.bookName = bookName;
      this.bookPrice = bookPrice;
      this.author = new Author(authorName, authorEmail);
  }
}

let numBookContainer = document.querySelector(".num-book");
let booksDataContainer = document.querySelector(".books-data");
let booknumInput = document.getElementById("booknum");
let errorNumBook = document.querySelector(".numBook");
let numsBtn = document.getElementById("numsBtn");
let booknameInput = document.getElementById("bookname");
let errorBookName = document.querySelector(".nameBook");
let bookpriceInput = document.getElementById("bookprice");
let errorBookPrice = document.querySelector(".bookprice");
let authorNameInput = document.getElementById("outhername");
let errorAuthorName = document.querySelector(".outhername");
let authorEmailInput = document.getElementById("outheremail");
let errorAuthorEmail = document.querySelector(".outheremail");
let subBookBtn = document.getElementById("subBook");
let tableContainer = document.querySelector(".table-container");
let tableBody = document.querySelector(".table-container table tbody");

let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let booksArray = [];
let count = 0;
let tdId = 0;
let totalBooks = 0;

numsBtn.addEventListener("click", function () {
  let num = booknumInput.value.trim();
  if (num === "") {
      errorNumBook.textContent = "Field is required";
      errorNumBook.style.visibility = "visible";
  } else if (!isFinite(num)) {
      errorNumBook.textContent = "Numbers only";
      errorNumBook.style.visibility = "visible";
  } else {
      errorNumBook.style.visibility = "hidden";
      totalBooks = parseInt(num);
      numBookContainer.style.display = "none";
      booksDataContainer.style.display = "block";
  }
});

subBookBtn.addEventListener("click", function () {
  let valid = validateInputs();
  if (valid) {
      let book = new Book(count, booknameInput.value, bookpriceInput.value, authorNameInput.value, authorEmailInput.value);
      booksArray.push(book);
      count++;
      tablePush(book);
      clearInputs();
  }
  if (count === totalBooks) {
      booksDataContainer.style.display = "none";
      tableContainer.style.display = "block";
  }
});

function validateInputs() {
  let valid = true;
  if (!booknameInput.value.trim() || !isNaN(booknameInput.value)) {
      errorBookName.textContent = "Valid book name is required";
      errorBookName.style.visibility = "visible";
      valid = false;
  } else errorBookName.style.visibility = "hidden";

  if (!bookpriceInput.value.trim() || isNaN(bookpriceInput.value)) {
      errorBookPrice.textContent = "Valid price is required";
      errorBookPrice.style.visibility = "visible";
      valid = false;
  } else errorBookPrice.style.visibility = "hidden";

  if (!authorNameInput.value.trim() || !isNaN(authorNameInput.value)) {
      errorAuthorName.textContent = "Valid author name is required";
      errorAuthorName.style.visibility = "visible";
      valid = false;
  } else errorAuthorName.style.visibility = "hidden";

  if (!emailReg.test(authorEmailInput.value.trim())) {
      errorAuthorEmail.textContent = "Valid email is required";
      errorAuthorEmail.style.visibility = "visible";
      valid = false;
  } else errorAuthorEmail.style.visibility = "hidden";

  return valid;
}

function clearInputs() {
  booknameInput.value = "";
  bookpriceInput.value = "";
  authorNameInput.value = "";
  authorEmailInput.value = "";
}

function tablePush(book) {
  let tr = document.createElement("tr");
  tr.setAttribute("id", `td-${tdId}`);
  tr.innerHTML = `<td>${book.bookName}</td>
                  <td>${book.bookPrice}</td>
                  <td>${book.author.authorName}</td>
                  <td>${book.author.authorEmail}</td>
                  <td><button class="btn edit">Edit</button></td>
                  <td><button class="btn delete">Delete</button></td>`;
  tableBody.appendChild(tr);
  tdId++;
}

tableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit")) {
      handleEdit(e.target);
  } else if (e.target.classList.contains("delete")) {
      handleDelete(e.target);
  }
});

function handleEdit(button) {
  let tr = button.parentElement.parentElement;
  let tds = tr.children;
  for (let i = 0; i < 4; i++) {
      let input = document.createElement("input");
      input.value = tds[i].textContent;
      tds[i].innerHTML = "";
      tds[i].appendChild(input);
  }
  tds[4].innerHTML = `<button class="btn save">Save</button>`;
  tds[5].innerHTML = `<button class="btn cancel">Cancel</button>`;
}

function handleDelete(button) {
  let tr = button.parentElement.parentElement;
  let id = parseInt(tr.id.split("-")[1]);
  booksArray = booksArray.filter((book) => book.id !== id);
  tr.remove();
}
