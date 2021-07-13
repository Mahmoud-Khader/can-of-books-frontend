import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card,Button } from 'react-bootstrap';
import BookFormModal from './component/BookFormModal';


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
    const addbook = await axios.post(`http://localhost:3001/addbook`, bodydata)
    console.log('POST IS WORKING', addbook.data)
    console.log('POST IS WORKING', addbook)
    console.log('POST IS WORKING', this.state.bookName)
    this.setState({
      bookData: addbook.data,
      bookName: event.target.value,
      bookDescription: event.target.value,
      bookStatus: event.target.value,
      bookImg: event.target.value
      

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



  deleteBook=async(index)=>{
    const newArrbook=this.state.bookData.filter((bok,idx)=>{
      return idx !== index;
    })
    console.log(newArrbook);
    this.setState({
      bookData:newArrbook
    })
  
    const { user } = this.props.auth0;
  const queryParams={
    email:user.email
  }
  await axios.delete(`http://localhost:3001/books/${index}`,{params:queryParams})
  };


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
            this.state.bookData.map((book,index) => {


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
                  <Button variant="danger" onClick ={()=> this.deleteBook(index)}>Delete</Button>
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