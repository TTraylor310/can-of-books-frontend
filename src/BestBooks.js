import { Component } from 'react';
import { Button, Container, ListGroup, Carousel } from 'react-bootstrap';
import UpdateBookForm from './UpdateBookForm';

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateForm: false
    }
  }

  handleClose = () => {
    this.setState({ showUpdateForm: false })
  }

  render() {
    let books = this.props.books.map(book => (
      <Carousel.Item variant="dark" style = {{textAlign:"center"}}>
        <img style = {{marginBottom:"240px"}}src="https://loremflickr.com/640/480"></img>
        <Carousel.Caption>
          <h1 >{book.name}</h1>
          <p>{book.description}</p>
          <Button variant="outline-danger" onClick={() => this.props.handleDelete(book)} style = {{margin:"5px"}}>Remove from database?</Button>
          <Button variant="outline-success" onClick={() => this.setState({ showUpdateForm: true }) }style = {{margin:"5px"}}>Update Book</Button>
          {this.state.showUpdateForm &&
            <UpdateBookForm
              handleClose={this.handleClose}
              book={book}
              updateBooks={this.props.updateBooks}
            />
          }

        </Carousel.Caption>
      </Carousel.Item >
    ))
    return (
      <>

        {this.props.books.length ?
          <Container>
            <Carousel variant="dark">
              {books}
            </Carousel>
          </Container>
          : <p>nothing</p>
        }
      </>
    )
  }
}

// class Book extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showUpdateForm: false
//     }
//   }
//   render() {
//     return (
//       <>
//         <ListGroup.Item
//           key={this.props.key}
//         >
//           {this.props.book.name} is a {this.props.book.description}
//         </ListGroup.Item>

//         <Button onClick={() => this.props.handleDelete(this.props.book)}>Remove from database?</Button>
//         <Button onClick={() => this.setState({ showUpdateForm: true })}>Update Cat</Button>
//         { this.state.showUpdateForm && 
//            <UpdateBookForm 
//               cat={this.props.cat}
//               updateCats={this.props.updateBooks}
//               // handleClose={this.handleClose}
//            />
        
//         }
//       </>
//     )
//   }
// }

export default Books;