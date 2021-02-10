let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

const form = document.querySelector('#book-form');
form.addEventListener('submit', addBookToLibrary);

function addBookToLibrary(e) {
  e.preventDefault();
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let read = document.getElementById('read').checked;

  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
  closeModal();
  
}

function clearForms(){
  let title = document.getElementById('title').value = '';
  let author = document.getElementById('author').value = '';
  let pages = document.getElementById('pages').value = '';
  let read = document.getElementById('read').checked = false;

}





//modal
const modal = document.querySelector('#modal');
const newBookBtn = document.querySelector('#new-book-button');
const closeBtn = document.querySelector('.close-button');

newBookBtn.addEventListener('click', openModal);
function openModal(){
  modal.style.display = "block";
}

closeBtn.addEventListener('click', closeModal);
function closeModal(){
  modal.style.display = "none";
  clearForms();
}

window.addEventListener('click', outsideClick);
function outsideClick(e){
  if(e.target == modal){
    modal.style.display = "none";
    clearForms();
  }
}

