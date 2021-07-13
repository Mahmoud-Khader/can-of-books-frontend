import React, { Component } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export class BookFormModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookData: [],
            showModel: false
        }
    }

    handleShow = () => {
        this.setState({
            showModel: true
        })
    }

    handleClose = () => {
        this.setState({
            showModel: false
        })
    }


    render() {
        return (
            <div>
                <Button type='submit' onClick={this.handleShow}> Add Book</Button>

                {this.state.showModel && (

                    <Modal show={this.state.showModel} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Book Modal</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>  
                        <Form onSubmit={this.props.getAdd}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Book Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Book Name" name="name" onChange={this.props.addbookname}/>
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Book Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter Book Description" name="description" onChange={this.props.addbookdes}/>
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Book Status</Form.Label>
                                <Form.Control type="text" placeholder="Enter Book Status" name="status" onChange={this.props.addstatus}/>
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Book Image</Form.Label>
                                <Form.Control type="text" placeholder="Enter Book Image Link" name="img" onChange={this.props.addimage}/>
                            </Form.Group>
                             <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                                </Button>
                                <Button variant="success" type="submit" >
                                    Add
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                        
                    </Modal>
                )}
            </div>
        )
    }
}

export default BookFormModal
