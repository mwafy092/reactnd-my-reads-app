import React from 'react';

const Read = (props) => {
    return (
        <div className='bookshelf'>
            <h2 className='bookshelf-title'>Read</h2>
            <div className='bookshelf-books'>
                <ol className='books-grid'>
                    {props.books.map((book) => {
                        if (book.shelf === 'read') {
                            return (
                                <li key={book.id}>
                                    <div className='book'>
                                        <div className='book-top'>
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
                                                        props.onChangeShelf(
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
                            );
                        }
                        return '';
                    })}
                </ol>
            </div>
        </div>
    );
};

export default Read;
