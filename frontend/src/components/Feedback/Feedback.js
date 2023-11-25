import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import AddFeedback from './AddFeedback';

const Feedback = ({ showModal, handleClose, postId }) => {
  const initialReviews = [
    { name: 'John Doe', rating: 4, text: 'Great product!' },
    { name: 'Jane Smith', rating: 5, text: 'Excellent service!' },
    { name: 'Bob Johnson', rating: 3, text: 'Average experience.' },
  ];

  const [reviews, setReviews] = useState(initialReviews);


  const starColorStyle = { color: 'gold' };

  return (
    <>
      {showModal && (
        <div className="blur-container">
          <Modal
            show={showModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Reviews</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {reviews.map((review, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <h6>Name: {review.name}</h6>
                  <h6>Comments: {review.text}</h6>
                  <h6>
                    Rating:{' '}
                    {[...Array(review.rating)].map((_, i) => (
                      <BsStarFill key={i} style={starColorStyle} />
                    ))}
                  </h6>
                </div>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              
            </Modal.Footer>
          </Modal>

          
        </div>
      )}
    </>
  );
};

export default Feedback;
