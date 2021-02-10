//storage
let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}


//get form values
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
  updateDisplay();
  closeModal();
}

//UI changes
const container = document.querySelector('.container');

function updateDisplay(){
  let bookCards = document.querySelectorAll('.book-card')
  bookCards.forEach(book => {container.removeChild(book)});

  for(let i=0; i< myLibrary.length; i++){
    createBookCard(myLibrary[i]);
  }
}

function createBookCard(book){
  let bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  bookCard.id = myLibrary.indexOf(book);

  let removeDiv = document.createElement('div');
  let removeBtn = document.createElement('button');
  let titleDiv = document.createElement('div');
  let authorDiv = document.createElement('div');
  let pageDiv = document.createElement('div');
  let readDiv = document.createElement('div');
  
  titleDiv.classList.add('title-div');
  titleDiv.textContent = book.title;

  authorDiv.classList.add('author-div');
  authorDiv.textContent = `by ${book.author}`;

  pageDiv.classList.add('page-div');
  pageDiv.textContent = `${book.pages} pages`;

  readDiv.classList.add('read-div');
  if(book.read === true){
    readDiv.textContent = 'Completed';
    readDiv.style.backgroundColor = 'rgb(0, 172, 37)';
  }
  else{
    readDiv.textContent = 'Unread';
    readDiv.style.backgroundColor = 'red';
  }
  readDiv.addEventListener('click', ()=>{
    book.read = !book.read;
    updateDisplay();
  });


  removeDiv.classList.add('remove-div');
  removeBtn.classList.add('remove-btn');
  removeBtn.innerHTML = '&times;';
  removeBtn.addEventListener('click',()=>{
    myLibrary = myLibrary.filter(keepbook => {if(keepbook.title != book.title){
      return true;
    }
    else{
      return false;
    }
  })
    updateDisplay();
  });
  

  removeDiv.appendChild(removeBtn);
  bookCard.appendChild(removeDiv);
  bookCard.appendChild(titleDiv);
  bookCard.appendChild(authorDiv);
  bookCard.appendChild(pageDiv);
  bookCard.appendChild(readDiv);
  
  container.insertBefore(bookCard, newBookBtn);
  console.log(bookCard.textContent)
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
  form.reset();
}
window.addEventListener('click', outsideClick);
function outsideClick(e){
  if(e.target == modal){
    modal.style.display = "none";
    form.reset();
  }
}
//filter
const filter = document.querySelector('#searchbar');
filter.addEventListener('keydown', filterBooks);

function filterBooks(e){
  let text = e.target.value.toLowerCase();
  let books = document.querySelectorAll('.book-card');
  books.forEach(book => {
    let bookText = book.textContent;
    if(bookText.toLowerCase().indexOf(text) != -1){
      book.style.display = 'flex';
    } else {
      book.style.display = 'none';
    }
    
  })

}

