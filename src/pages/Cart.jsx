import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { emptyCart, removeFromCart } from '../redux/slices/cartSlice';


function Cart() {

  const cartArray = useSelector((state)=>state.cartReducer)
  console.log(cartArray);

  const dispatch = useDispatch()
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()

  // function to find sum of given array
  const getTotal = ()=>{
    if (cartArray.length>0) {
      setTotal(cartArray.map(item=>item.price).reduce((p1,p2)=>p1+p2))
    }
    else{
      setTotal(0)
    }

  }
  console.log(total);
  useEffect(()=>{
    getTotal()
  },[cartArray])

  const handleCart = ()=>{
    alert('thankyou.... Your order placed Successfully..')
    dispatch(emptyCart())
    navigate('/')
  }

  return (
    <div style={{marginTop:'100px'}}>
      
      {cartArray?.length>0?
        <div className='row w-100'>
        
          <div className='col-lg-6 m-5'>
          <table className='table shadow border'>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Image</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartArray?.map((item,index)=>(<tr>
                <td>{index+1}</td>
                <td> {item.title} </td>
                <td> <img style={{width:'100px',height:'100px'}} src={item.thumbnail} alt="noimage" /> </td>
                <td> ₹ {item.price}</td>
                <td><Button onClick={()=>dispatch(removeFromCart(item.id))} variant="outline-danger"><i class="fa-solid fa-trash"></i></Button></td>
              </tr>))
              
              }
            </tbody>
          </table>
        </div>
        
        <div className='col-lg-4 d-flex justify-content-center align-items-center flex-column'>
          <div className='border shadow p-5'>
              <h3 className='text-primary'>Cart Summary</h3>
              <h4>Total number of products : <span className='fw-bolder fs-2 text-warning ms-3'>{cartArray.length}</span></h4>
              <h4>Total Price : <span className='fw-bolder fs-2 text-warning'>₹ {total}</span></h4>
              <button onClick={handleCart} className='btn btn-success rounded w-100 mt-3'>CheckOut</button>
          </div>
        </div>
      
      </div>:  
      
      <div style={{height:'100vh'}} className='d-flex justify-content-center align-items-center flex-column'>
            <img src="https://cdn.pixabay.com/animation/2022/11/03/16/39/16-39-41-74_512.gif" height={'300px'} alt="no image" />
            <h3>Your wishlist is empty</h3>
            <button className='btn btn-success mt-2'><Link style={{textDecoration:'none',color:'white'}} to={'/'}><i class="fa-solid fa-arrow-left"></i>Back to Home</Link></button>
          </div>
      }
    
    </div>
  )
}

export default Cart
