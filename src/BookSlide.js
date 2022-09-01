import {Component} from 'react';
import {Carousel, Container, Button} from 'react-bootstrap';
// import Button from "react-bootstrap/Button";
import UpdateBookForm from './UpdateBookForm';


class BookSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateForm: false
    }
  }

  render () {
    let books = this.props.books.map(book => (
        <Carousel.Item className={this.props.className} key={book._id}>
          <img
            className="picbok1"
            src="../img/book-img.jpg"
            alt="books or not..."
          />
          <Carousel.Caption>
            <p className="bookWords">{book.name}: {book.description}</p> 
          </Carousel.Caption>
          <Button variant="primary" type="submit" onClick={() => this.props.handleDelete(book)} className="funUpdate">Remove Book from List?
          </Button>
          <Button variant="primary" type="submit" onClick={() => this.SetState({showUpdateForm: true})} className="funForm">Update Book!
          </Button>
          {this.state.showUpdateForm &&
            <UpdateBookForm
              book = {book}
              updateBooks={this.props.updateBooks}
            />
          }
        </Carousel.Item>
    ))

    return (
      <Container slide='true' controls={false}>
        <Carousel variant="dark">
          {books}
        </Carousel>
      </Container>
    )

  }
}


export default BookSlide;