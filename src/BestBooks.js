import React from 'react';
// import React, {useState} from 'react';
import axios from 'axios';
// import {Carousel, Container} from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import BookSlide from './BookSlide';
import 'bootstrap/dist/css/bootstrap.min.css';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showForm: false,
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

  handleClose = () => {
    this.setState({
      showForm: false,
    });
  };
  handleShow = () => {
    this.setState({
      showForm: true,
    });
  };

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

        <Button variant="primary" onClick={this.handleShow}>Enter a new Book?</Button>
        <Modal show={this.state.showForm} onHide={this.handleClose}>
          <Modal.Dialog onHide={this.handleClose}>

            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
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
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>Close</Button>
              <Button variant="primary" onClick={this.handleClose}>Save changes</Button>
            </Modal.Footer>

          </Modal.Dialog>
        </Modal>

      </>
    )
  }
}

export default BestBooks;
