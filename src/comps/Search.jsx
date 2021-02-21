import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';

class Search extends Component {
    state = {
        books: [],
        query: '',
    };
    updateQuery(query) {
        this.setState(() => ({
            query: query,
        }));
        this.getSearchData();
    }

    getSearchData() {
        if (this.state.query) {
            BooksAPI.search(this.state.query).then((data) => {
                this.setState(() => ({
                    books: data,
                }));
            });
        }
    }

    render() {
        const booksData = this.state.query ? this.state.books : [];

        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                    <Link to='/'>
                        <button className='close-search' />
                    </Link>
                    <div className='search-books-input-wrapper'>
                        <input
                            type='text'
                            placeholder='Search by title or author'
                            value={this.state.query}
                            onChange={(e) => this.updateQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className='search-books-results'>
                    <ol className='books-grid'>
                        {Array.isArray(booksData)
                            ? booksData.map((book) => (
                                  <li key={book.id}>
                                      <div className='book'>
                                          <div className='book-top'>
                                              {this.props.books.map((b) => {
                                                  if (b.id === book.id) {
                                                      return (
                                                          <p
                                                              className='book-status'
                                                              key={book.id}>
                                                              {b.shelf}
                                                          </p>
                                                      );
                                                  }
                                                  return '';
                                              })}
                                              <div
                                                  className='book-cover'
                                                  style={{
                                                      width: 128,
                                                      height: 193,
                                                      backgroundImage: `url(${
                                                          book.imageLinks
                                                              ? book.imageLinks
                                                                    .thumbnail
                                                              : ''
                                                      })`,
                                                  }}
                                              />
                                              <div className='book-shelf-changer'>
                                                  <select
                                                      onChange={(e) =>
                                                          this.props.onChangeShelf(
                                                              book,
                                                              e.target.value
                                                          )
                                                      }>
                                                      <option value='move'>
                                                          Move to...
                                                      </option>
                                                      <option value='currentlyReading'>
                                                          Currently Reading
                                                      </option>
                                                      <option value='wantToRead'>
                                                          Want to Read
                                                      </option>
                                                      <option value='read'>
                                                          Read
                                                      </option>
                                                      <option value='none'>
                                                          None
                                                      </option>
                                                  </select>
                                              </div>
                                          </div>
                                          <div className='book-title'>
                                              {book.title}
                                          </div>
                                          <div className='book-authors'>
                                              {book.authors}
                                          </div>
                                      </div>
                                  </li>
                              ))
                            : 'user another keyword'}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;
