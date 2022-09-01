import React from 'react';
// import './App.css';
import BestBooks from './BestBooks';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false
    }
  }

  getBooks = async () => {
    try {
      // make a call to my server/cats to get cats
      let bookData = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
      // bookData.data
      this.setState({
        books: bookData.data
      })

    } catch (error) {
      console.log('we have an error: ', error.response);
    }
  }

  handleBookCreate = async (bookInfo) => {
    console.log(bookInfo);
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER}/books`, bookInfo);
      const newBook = response.data;
      this.setState({
        books: [...this.state.books, newBook],
      });
    } catch (error) {
      console.log('error is cat post: ', error.response);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleBookCreate({
      name: event.target.formName.value,
      description: event.target.formDescription.value,
      status: event.target.status.checked,
      // location: event.target.formLocation.value,
    })
    this.setState({ showModal: false })
  }

  handleDelete = async (bookToDelete) => {
    console.log(bookToDelete._id);
    try {
      // make axios.delete request
      const response = await axios.delete(`${process.env.REACT_APP_SERVER}/books/${bookToDelete._id}`);

      // console.log response.status
      console.log(response.status);

      // .filter on the front end
      const filteredBooks = this.state.books.filter(book => {
        return book._id !== bookToDelete._id;
      })

      // .setState with the filteredBooks
      this.setState({
        books: filteredBooks
      })

    } catch (error) {
      console.log(error);
    }
  }

  updateBooks = async (bookToUpdate) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${bookToUpdate._id}`;
      let updatedBook = await axios.put(url, bookToUpdate);

      let updatedBookArray = this.state.books.map(existingBook => {
        return existingBook._id === bookToUpdate._id
          ? updatedBook.data
          : existingBook
      });
      this.setState({
        books: updatedBookArray
      });

    } catch (error) {
      console.log('error is cat post: ', error.response);
    }
  }

  componentDidMount() {
    this.getBooks();
  }
  closeModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    console.log(this.state.books);
    return (
      <>
        <header style={{ textAlign: "center" }}>
          <h1>Cool Cat Books</h1>
          <p>Learning &amp; Formation Shelf</p>
          <Button style={{marginBottom:"20px"}} variant ='outline-secondary' onClick={() => this.setState({ showModal: true })}>Add Book</Button>

        </header>
        <main>
          {
            this.state.books.length > 0 &&
            <>
              <BestBooks
                books={this.state.books}
                handleDelete={this.handleDelete}
                updateBooks={this.updateBooks}
              />
            </>
          }
          <Modal show={this.state.showModal} onHide={this.closeModal} style={{marginTop:"50px"}}>
            <Modal.Header closeButton>
              Information
            </Modal.Header>
            <Modal.Body >
              <Form onSubmit={this.handleSubmit} style={{ width: "40%", margin: "auto" }}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="name" placeholder="Enter book" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="name" placeholder="Enter book description" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="status">
                  <Form.Check type="checkbox" label="status?" />
                </Form.Group>
                <Button variant="outline-dark" style={{ margin: "auto" }} type="submit">
                  Submit
                </Button>
              </Form>
            </Modal.Body>

            <Modal.Footer>


            </Modal.Footer>
          </Modal>

          {/* <Form onSubmit={this.handleSubmit} style={{ width: "40%", margin: "auto" }}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Enter book" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Color</Form.Label>
              <Form.Control type="name" placeholder="Enter book description" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
              <Form.Check type="checkbox" label="status?" />
            </Form.Group>

          </Form> */}
        </main>
      </>
    );
  }
}

export default App;
