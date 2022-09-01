import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';


class UpdateBookForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();

    let bookToUpdate = {
      name: e.target.name.value || this.props.book.name,
      description: e.target.description.value || this.props.book.description,
      status: e.target.readStat.checked || this.props.book.status,
      _id: this.props.book._id, 
      __v: this.props.book.__v,
    }

    this.props.updateBook(bookToUpdate);
  }


  render(){
    return(
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Book Title</Form.Label>
            <Form.Control type="text" placeholder={this.props.book.name} />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description?</Form.Label>
            <Form.Control type="text" placeholder={this.props.book.description} />
          </Form.Group>
          <Form.Group controlId="readStat">
            <Form.Check type="checkbox" label="read already?" />
          </Form.Group>
          <Button type="submit" onClick={() => this.setState({showUpdateForm: false})}>Update this Book</Button>
        </Form>
      </Container>
    )
  }
}

export default UpdateBookForm;