import { Link, useParams } from "react-router-dom"
import '../styles/reviews.scss'
import { FaCheckCircle } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

const Reviews = ({title}) => {
  const { id } = useParams()
  const [reviews, setReviews] = useState()

  const fetchReviews = async () => {
    const resp = await fetch('http://localhost:3000/reviews?productId=' + id)
    const data = await resp.json()
    setReviews(data)
  }

  const handleDelete = async (review) => {
    try {
      const resp = await fetch('http://localhost:3000/reviews?id=' + review, {
          method: 'DELETE',
      });
      console.log(resp)
      fetchReviews()
      
  } catch (error) {
      console.log(error)
  }
}

  useEffect(() => {fetchReviews()}, [])
  

  return (
    <div className="reviews">
      <h1>Product {title} reviews:</h1>
      <div className="cardsContainer">
        {reviews && reviews.map((review, index) => (
          <div className="card" key={index}>
            <h3>{review.user} <FaCheckCircle /> <br/> Rating {
            Array.from({ length: review.rating }).map((_, index) => (
              <FaStar key={index}/>
            ))}
            {Array.from({ length: 5 - review.rating }).map((_, index) => (
              <CiStar key={index}/>
            ))
            }  </h3>
            <h2>{review.commentTitle}</h2>
            <p>{review.comment}</p>
            <button onClick={() => handleDelete(review.id)} >Delete review</button>
          </div>
        ))}
      </div>
      <Link className="back" to='/' >Go Back</Link>
    </div>
  )
}

export default Reviews