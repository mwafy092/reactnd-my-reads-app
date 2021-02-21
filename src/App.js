import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Search from './comps/Search';
import Read from './comps/Read';
import CurrentlyReading from './comps/CurrentlyReading';
import WantToRead from './comps/WantToRead';
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {
    state = {
        books: [],
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState(() => ({
                books,
            }));
        });
    }

    changeShelf = (selectedBook, shelf) => {
        BooksAPI.update({ ...selectedBook, shelf }, shelf).then(() =>
            BooksAPI.getAll().then((books) => {
                this.setState(() => ({
                    books,
                }));
            })
        );
    };

    render() {
        return (
            <div className='app'>
                <Route
                    path='/'
                    exact
                    render={() => (
                        <div className='list-books'>
                            <div className='list-books-title'>
                                <h1>MyReads</h1>
                            </div>
                            <div className='list-books-content'>
                                <CurrentlyReading
                                    books={this.state.books}
                                    onChangeShelf={this.changeShelf}
                                />
                                <WantToRead
                                    books={this.state.books}
                                    onChangeShelf={this.changeShelf}
                                />
                                <Read
                                    books={this.state.books}
                                    onChangeShelf={this.changeShelf}
                                />
                                <div />
                                <div className='open-search'>
                                    <Link to='/search'>
                                        <button />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                />
                <Route
                    path='/search'
                    render={({ history }) => (
                        <Search
                            onChangeShelf={this.changeShelf}
                            books={this.state.books}
                        />
                    )}
                />
            </div>
        );
    }
}

export default BooksApp;
