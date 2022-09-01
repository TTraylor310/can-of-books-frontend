import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';


class UpdateBookForm extends React.Component {

  handleSubmit = (e) => {

    e.preventDefault();
    console.log("trying to update");

    let bookToUpdate = {
      name: e.target.name.value || this.props.book.name,
      description: e.target.description.value || this.props.book.description,
      status: e.target.status.checked || this.props.book.status,
      //   location: e.target.location.value || this.props.book.location,
      _id: this.props.book._id,
      __v: this.props.book.__v,
 
    }
    this.props.updateBooks(bookToUpdate);
    this.props.handleClose()
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder={this.props.book.name} />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Color</Form.Label>
            <Form.Control type="text" placeholder={this.props.book.description} />
          </Form.Group>
          {/* <Form.Group controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" placeholder={this.props.book.location} />
          </Form.Group> */}
          <Form.Group  controlId="status">
            <Form.Check type="checkbox" label="status" />
          </Form.Group>
          <Button variant="secondary" type="submit">Update Book</Button>
        </Form>
      </Container>
    )
  }

}

export default UpdateBookForm