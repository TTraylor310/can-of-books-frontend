import React from 'react';
import axios from 'axios';
import {Carousel, Container} from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      // photoData: [],
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

  componentDidMount(){
    this.getBooks();
  }

  render() {

    let carouselItems = this.state.books.map((book) => (

      <Carousel.Item className={this.props.className} key={book._id}>
        <img
          className="picBook"
          src="./img/book-img.jpg"
          alt="books or not..."
        />
        <Carousel.Caption>
        <p>{book.name}: {book.description}</p> 
        </Carousel.Caption>
      </Carousel.Item>
    ))



    /* TODO: render all the books in a Carousel */
    // let bookR = this.state.books.map( b => (
    //   <p key="bookR._id">{b.name} - {b.description}</p>
    // ))



    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <p>Book Carousel coming soon</p>
        ) : (
          <h3>No Books Found :</h3>
        )},
        {
          <Container>
            <Carousel>
              {carouselItems}
            </Carousel>
          </Container>
        }
      </>
    )
  }
}

export default BestBooks;
