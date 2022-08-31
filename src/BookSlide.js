import {Component} from 'react';
import {Carousel, Container, Button} from 'react-bootstrap';
// import Button from "react-bootstrap/Button";
import UpdateBookForm from './UpdateBookForm';


class BookSlide extends Component {

  render () {
    let books = this.props.books.map(book => (
      <>
        <Book
          book={book}
          key={book._id}
          handleDelete={this.props.handleDelete}
          updateBook={this.props.updateBook}
        />
      </>
    ))

    return (
      <Container>
        <Carousel>
          {books}
        </Carousel>
      </Container>
    )

  }
}


class Book extends Component {
  constructor(props){
    super(props);
    this.state = {
      showUpdateForm: false
    }
  }

  render() {
    return (
      <>
        <Carousel.Item className={this.props.className} key={this.props.book._id}>
          <img
            className="picBook"
            src="./img/book-img.jpg"
            alt="books or not..."
          />
          <Carousel.Caption>
            <p className="bookWords">{this.props.book.name}: {this.props.book.description}</p> 
          </Carousel.Caption>
          <Button variant="primary" type="submit" onClick={() => this.handleDelete(this.props.book)}>Remove Book from List?
          </Button>
          <Button variant="primary" type="submit" onClick={() => this.SetState({showUpdateForm: true})}>Update Book!
          </Button>
          {this.state.showUpdateForm &&
            <UpdateBookForm
              book = {this.props.book}
              updateBooks={this.props.updateBooks}
            />
          }
        </Carousel.Item>
      </>
    )
  }
}

export default BookSlide;