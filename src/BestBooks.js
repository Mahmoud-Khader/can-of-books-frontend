import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card } from 'react-bootstrap';


class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookData: [],
      showBooks:false
    };
  }

  componentDidMount = async () => {
    const { user } = this.props.auth0;
    console.log(user);

    const bookData = await axios.get(`http://localhost:3001/books?email=${user.email}`);
    console.log('IT WORKS', bookData.data[0].books);

this.setState({
  bookData:bookData.data[0].books,
  showBooks:true
})

  }

  render() {


    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <div >
        {
          this.state.showBooks &&
          this.state.bookData.map(book => {


            return (
              <Card className="book" style={{ width: '18rem', backgroundColor: 'lightgrey', boxShadow: '2px 2px 2px black' }} >

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


// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
// import './BestBooks.css';
// import { withAuth0 } from '@auth0/auth0-react';
// import axios from 'axios';
// import Carousel from 'react-bootstrap/Carousel';

// class BestBooks extends React.Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       bookData: [],
//     };

//   }
//   componentDidMount = async () => {
//     const { user } = this.props.auth0;
//     console.log(user);


//     const bookData = await axios.get(`http://localhost:3001/books?email=${user.email}`);
//     console.log('book data exists!', bookData.data[0].books);
//     console.log('book data exists!', bookData);

//     this.setState({
//       bookData: bookData.data[0].books
//     });
//   }




//   render() {
//     return(
//       <>
//       <Jumbotron>
//         <h1>My Favorite Books</h1>
//         <p>
//           This is a collection of my favorite books
//         </p>
//         <Carousel >
//         {this.state.bookData.map(book =>
//  <Carousel.Item>
//     <img
//                   className="d-block w-100"
//                   src="https://via.placeholder.com/800x400/111111/111111?text=' '"
//                   alt={`slide`}
//                 />
//                    <Carousel.Caption>
//                    <h3>{book.name}</h3>
//        <p>{book.description}</p>
//        <p>{book.status}</p>
//                    </Carousel.Caption>

//  </Carousel.Item>
//   )}
//    </Carousel>
//       </Jumbotron>
//       </>
//     )
//   }
// }

// export default withAuth0(BestBooks );