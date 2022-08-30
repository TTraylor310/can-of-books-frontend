import React from 'react';
import axios from 'axios';
import {Carousel, Container} from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
    console.log('line 52', response.status);

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

  componentDidMount(){
    this.getBooks();
  }

  render() {
    console.log(this.state.books);



    let carouselItems = this.state.books.map((book) => (
        <Carousel.Item className={this.props.className} key={book._id}>
          <img
            className="picBook"
            src="./img/book-img.jpg"
            alt="books or not..."
          />
          <Carousel.Caption>
          <p className="bookWords">{book.name}: {book.description}</p> 
          <form><button variant="primary" type="submit" onClick={() => this.handleDelete(book)}>Remove Book from List?
          </button></form>
          {/* <Form><Button variant="primary" type="submit">
          </Button></Form> */}
          </Carousel.Caption>
        </Carousel.Item>
    ))


    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        {this.state.books.length ? (<p></p>) : (<h3>No Books Found :</h3>)},
        {
          <Container>
            <Carousel variant="dark">
              {carouselItems}
            </Carousel>
          </Container>
        }
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter book name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="name" placeholder="Enter brief description of book" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Check type="checkbox" label="Already read?" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Remove Book from List?
          </Button>
        </Form>
      </>
    )
  }
}

export default BestBooks;
