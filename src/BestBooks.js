import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import BookFormModal from './component/BookFormModal';
import UpdateFormModel from './component/UpdateFormModel';


class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookData: [],
      showBooks: false,
      bookName: '',
      bookDescription: '',
      bookStatus: '',
      bookImg: '',
      index: 0,
      
      showModel:false
    };
  }

  componentDidMount = async () => {
    const { user } = this.props.auth0;
    console.log(user);

    const bookData = await axios.get(`http://localhost:3001/books?email=${user.email}`);
    console.log('IT WORKS', bookData.data[0].books);

    this.setState({
      bookData: bookData.data[0].books,
      showBooks: true
    })

  }

  getAdd = async (event) => {
    event.preventDefault();

    const { user } = this.props.auth0;
    const bodydata = {
      name: this.state.bookName,
      description: this.state.bookDescription,
      status: this.state.bookStatus,
      img: this.state.bookImg,
      email: user.email

    }
    console.log('aaaaaaaaaaaaaaaaaaaaaaa', bodydata)
    const addbook = await axios.post(`http://localhost:3001/addbook`, bodydata)
    console.log('POST IS WORKING', addbook.data)
    console.log('POST IS WORKING', addbook)
    console.log('POST IS WORKING', this.state.bookName)
    this.setState({
      bookData: addbook.data,
      // bookName: event.target.value,
      // bookDescription: event.target.value,
      // bookStatus: event.target.value,
      // bookImg: event.target.value


    })
  }

  addbookname = (event) => {
    this.setState({
      bookName: event.target.value
    })
  }
  addbookdes = (event) => {
    this.setState({
      bookDescription: event.target.value
    })
  }
  addstatus = (event) => {
    this.setState({
      bookStatus: event.target.value
    })
  }

  addimage = (event) => {
    this.setState({
      bookImg: event.target.value
    })
  }
///////////////////////////////////////////////////////


  handleShow = (index) => {
    this.setState({
        showModel: true,
        index:index,
      bookName:this.state.bookData[index].name,
      bookDescription:this.state.bookData[index].description,
      bookStatus:this.state.bookData[index].status,
      bookImg:this.state.bookData[index].email,
    })
}

handleClose = () => {
    this.setState({
        showModel: false
    })
}




  deleteBook = async (index) => {
    const newArrbook = this.state.bookData.filter((bok, idx) => {
      return idx !== index;
    })
    console.log(newArrbook);
    this.setState({
      bookData: newArrbook
    })

    const { user } = this.props.auth0;
    const queryParams = {
      email: user.email
    }
    console.log('aaaaaaaaaaaaaaaaaaaaaaa', queryParams)
    console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbb', this.state.index)
    await axios.delete(`http://localhost:3001/deletebook/${index}`, { params: queryParams })
  };

  updateBook = async (event) => {
    event.preventDefault();

    const { user } = this.props.auth0;
    const updateData = {
      name: event.target.name.value,
      description: event.target.description.value,
      status: event.target.status.value,
      img: event.target.img.value,
      email: user.email

    }
    console.log('aaaaaaaaaaaaaaaaaaaaaaa', updateData)
    console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbb', this.state.index)
    let bookUpdateData = await axios.put(`http://localhost:3001/updateBook/${this.state.index}`, updateData)
    console.log('llllllllllllllllllllllllllllll', bookUpdateData)
    this.setState({
      bookData: bookUpdateData.data,
      // index:event
      
    })
    this.componentDidMount();

  }

  

  render() {


    return (
      <Jumbotron>
        < BookFormModal
          getAdd={this.getAdd}
          addbookname={this.addbookname}
          addbookdes={this.addbookdes}
          addstatus={this.addstatus}
          addimage={this.addimage}
        />


        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <div >
          {
            this.state.showBooks &&
            this.state.bookData.map((book, index) => {


              return (
                <Card key={index} className="book" style={{ width: '18rem', backgroundColor: 'lightgrey', boxShadow: '2px 2px 2px black' }} >

                  <Card.Body>
                    <Card.Title>{book.name}</Card.Title>
                    <Card.Img style={{ boxShadow: '2px 2px 2px #ccc' }} variant="top" src={book.img} alt={book.name} />

                    <Card.Text>
                      {book.description}
                    </Card.Text>
                    <Card.Text>
                      {book.status}
                    </Card.Text>
                  </Card.Body>
                  <Button variant="danger" onClick={() => this.deleteBook(index)}>Delete</Button>
                  <br></br>
                  <Button variant="warning" onClick ={()=> this.handleShow(index)}>Update</Button>
                  
                  <UpdateFormModel showModel={this.state.showModel} handleShow={this.handleShow} handleClose={this.handleClose} updateBook={this.updateBook}  bookData={this.state.bookData} />
                </Card>
              )

            })

          }
        </div>



      </Jumbotron>
    )
  }
}


export default withAuth0(MyFavoriteBooks);


//