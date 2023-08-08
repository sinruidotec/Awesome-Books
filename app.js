const dynamicBooks = document.getElementById('dynamicBooks');
const data = JSON.parse(localStorage.getItem('booksData')) || [];

class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static addBooks(booksData) {
    return booksData.map((books, index) => {
      const { title, author } = books;
      return `
      <div id="book-${index}">
        <h2 >${title}</h2>
        <h3>${author}</h3>
        <button class="deleteBtn" data-index ="${index}">Delete</button>
      </div>
      `;
    });
  }

  static removeBooks(index) {
    const bookToRemove = document.getElementById(`book-${index}`);
    if (bookToRemove) {
      bookToRemove.remove();
      data.splice(index, 1);
      localStorage.setItem('booksData', JSON.stringify(data));
    }
  }
}

// DOM manipulation

document.getElementById('myForm').addEventListener('submit', (e) => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const copyBook = new Books(title, author);
  data.push(copyBook);
  localStorage.setItem('booksData', JSON.stringify(data));
  const deployHtml = Books.addBooks(data);
  dynamicBooks.innerHTML = deployHtml.join('');
  e.preventDefault();
});

const deployHtml = Books.addBooks(data);
dynamicBooks.innerHTML = deployHtml.join('');

dynamicBooks.addEventListener('click', (e) => {
  if (e.target.classList.contains('deleteBtn')) {
    const index = parseInt(e.target.getAttribute('data-index'), 10);
    Books.removeBooks(index);
  }
});
