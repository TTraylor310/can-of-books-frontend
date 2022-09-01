import React from 'react';
import axios from 'axios';
// import {Carousel, Container} from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import BookSlide from './BookSlide';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
  }}


  getBooks = async() => {
    try{
      let bookData = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
      this.setState({
        books: bookData.data,
      })
    }catch (error) {
      console.log('we have an error: ', error.response);
    }
  }

  handleBookCreate = async (bookInfo) => {
    console.log(bookInfo);
    try{
      let response = await axios.post(`${process.env.REACT_APP_SERVER}/books`, bookInfo);
      let newBook = response.data;
      this.setState({
        books: [...this.state.books, newBook],
      });
    } catch (error) {
      console.log('error on book postings: ', error.response)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.handleBookCreate({
      name: e.target.formName.value,
      description: e.target.formDescription.value,
      status: e.target.formStatus.checked,
    })
  }

  handleDelete = async (bookToDelete) => {
  try {
    let response = await axios.delete(`${process.env.REACT_APP_SERVER}/books/${bookToDelete._id}`)
    console.log('line 51', response.status);

    let filteredBooks = this.state.books.filter ( book => {
      return book._id !== bookToDelete._id;
    })
    this.setState({
      books: filteredBooks,
    })

  } catch (error) {
    console.log(error);
  }
  }

  updateBook = async (bookToUpdate) => {
    
    try{
      let url = `${process.env.REACT_APP_SERVER}/books/${bookToUpdate._id}`;
      console.log(url);
      console.log(bookToUpdate);
      await axios.put(url, bookToUpdate);
      // console.log(updatedBook);
      // let updatedBookArr = this.state.books.map(existingBook => {
      //   return existingBook._id === bookToUpdate._id
      //   ? updatedBook.data : existingBook
      // });
      // console.log(updatedBookArr);
      // this.setState({
      //   book: updatedBookArr,
      // });
      this.getBooks();
    }catch (error) {
      console.error('error is on post?: ', error)
    }
  }

  componentDidMount(){
    this.getBooks();
  }

  render() {
    return (
      <>
        <h2>"The List? Your List? A good List."</h2>
        {this.state.books.length ? (<p></p>) : (<h3>No Books Found :</h3>)},
        { this.state.books.length > 0 &&
        <>
          <BookSlide 
            books = {this.state.books}
            handleDelete = {this.handleDelete}
            updateBook = {this.updateBook}
          />
        </>
        }
        <Form onSubmit={this.handleSubmit} style={{margin:"auto", width:"50%"}}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Book Title:</Form.Label>
            <Form.Control type="name" placeholder="Enter book name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description:</Form.Label>
            <Form.Control type="name" placeholder="Enter brief description of book" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Check type="checkbox" label="Already read?" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sumbit a new book?
          </Button>
        </Form>
      </>
    )
  }
}

export default BestBooks;
