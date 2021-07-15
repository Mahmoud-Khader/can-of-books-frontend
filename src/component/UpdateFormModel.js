import React, { Component } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export class UpdateFormModel extends Component {

    // constructor(props){
    //     super(props)
    //     this.state={
    //         showModel:false
    //     }
    // }

    // handleShow = () => {
    //     this.setState({
    //         showModel: true
    //     })
    // }

    // handleClose = () => {
    //     this.setState({
    //         showModel: false
    //     })
    // }



    render() {
        return (
            <div>
                {/* <Button type='submit' onClick={this.handleShow}> Update Book</Button> */}
                {this.props.showModel && (

                    <Modal show={this.props.showModel} onHide={this.props.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Book Modal</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.props.updateBook}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Book Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Book Name" name="name" defaultValue={this.props.name}/>
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Book Description</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Book Description" name="description" defaultValue={this.props.description}/>
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Book Status</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Book Status" name="status" defaultValue={this.props.status} />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Book Image</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Book Image Link" name="img"  defaultValue={this.props.img}/>
                                </Form.Group>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.props.handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="success" type="submit" >
                                        Update
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

export default UpdateFormModel
