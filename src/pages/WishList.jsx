import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';

function WishList() {

  const wishlistArray = useSelector((state)=> state.wishlistReducer)
  console.log(wishlistArray);

  const dispatch = useDispatch()

  const handlewishlist = (item)=>{
    dispatch(addToCart(item))
    dispatch(removeFromWishlist(item.id))

  }

  return (
    <div style={{marginTop:'100px',marginBottom:'50px'}}>
      <Row className='ms-5 me-3'>
        {wishlistArray?.length>0?
        wishlistArray?.map((item)=>(<Col>
          <Card style={{ width: '18rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
        <Card.Img variant="top" src={item.thumbnail} style={{height:'200px'}}/>
        <Card.Body>
          <Card.Title>{item.title.slice(0,20)}...</Card.Title>
          <Card.Text>
            <p>{item.description.slice(0,50)}</p>
            <p className='fw-bolder'>Price : ₹ {item.price}</p>
          </Card.Text>
          <div className='d-flex align-items-center justify-content-between'>
            <Button onClick={()=>dispatch(removeFromWishlist(item.id))} variant="outline-danger"><i class="fa-solid fa-trash"></i></Button>
            <Button onClick={()=>handlewishlist(item)} variant="outline-success"><i class="fa-solid fa-cart-plus"></i></Button>
          </div>
        </Card.Body>
      </Card>
          </Col>))
          : <div style={{height:'100vh'}} className='d-flex justify-content-center align-items-center flex-column'>
            <img src="https://cdn.pixabay.com/animation/2022/11/03/16/39/16-39-41-74_512.gif" height={'300px'} alt="no image" />
            <h3>Your wishlist is empty</h3>
            <button className='btn btn-success mt-2'><Link style={{textDecoration:'none',color:'white'}} to={'/'}><i class="fa-solid fa-arrow-left"></i>Back to Home</Link></button>
          </div>
        }
      </Row>
    </div>
  )
}

export default WishList
