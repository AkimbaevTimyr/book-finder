import { useState } from 'react';
import './App.css';
import { setData } from './actions/book'
import * as axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
function App() {
  const dispatch = useDispatch()
  const [bookName, setbookName] = useState('')
  const booksData = useSelector(state => state.book.data)
  const handleClick = (e) => {
    e.preventDefault()
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookName}`).then(responce => dispatch(setData(responce.data.items)))
  }
  return (
    <div className="App">
      <div id="app">
        <div>
          <div></div>
          <form id="book-search" onSubmit={handleClick} >
            <label>
              <span>Search for a book</span>
              <input onChange={(e) => setbookName(e.target.value)} type="text" />
            </label>
            <button type="submit">Search</button>
            <div className="books">{booksData.map((b, index) => <div key={index}>{b.map((book => <div><ol class="search-results">
              <li className="search-result" v-for="book in searchResults.items">
                <img src={book.volumeInfo.imageLinks.smallThumbnail} class="search-result--thumbnail" />
                <ul className="search-result--info">
                  <li className="search-result--title">{book.volumeInfo.title}</li>
                  <li v-if="book.volumeInfo.authors" className="search-result--authors">
                    by {book.volumeInfo.authors}
                  </li>
                  <li v-if="book.volumeInfo.publishedDate" className="search-result--published">
                    <span>Published </span> {book.volumeInfo.publishedDate}
                  </li>
                </ul>
              </li>
            </ol></div>))}</div>)}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
