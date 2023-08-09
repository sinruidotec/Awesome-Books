const data = JSON.parse(localStorage.getItem('booksData')) || [];

class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static addBooks(booksData) {
    return booksData.map((book, index) => {
      const { title, author } = book;
      return `
      <div>
        <div id="book-${index}" class="booksInfo">
          <div class="infoContainer">
            <h2>"${title}" by</h2>
            <h3>${author}</h3>
          </div>
          <button class="deleteBtn" data-index="${index}">REMOVE</button>
        </div>
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

const dynamicBooks = document.getElementById('dynamicBooks');
dynamicBooks.innerHTML = Books.addBooks(data).join('');

document.getElementById('myForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  data.push(new Books(title, author));
  localStorage.setItem('booksData', JSON.stringify(data));

  dynamicBooks.innerHTML = Books.addBooks(data).join('');
});

dynamicBooks.addEventListener('click', (e) => {
  if (e.target.classList.contains('deleteBtn')) {
    const index = parseInt(e.target.getAttribute('data-index'), 10);
    Books.removeBooks(index);

    dynamicBooks.innerHTML = Books.addBooks(data).join('');
  }
});
