import React from 'react';
import { Link } from 'react-router-dom';

const TopicCard = ({ topic }) => {
  return (
    <div className="custom-block custom-block-topics-listing bg-white shadow-lg mb-5">
      <div className="d-flex">
        <img 
          src={topic.image} 
          className="custom-block-image img-fluid" 
          alt={topic.title} 
        />

        <div className="custom-block-topics-listing-info d-flex">
          <div>
            <h5 className="mb-2">{topic.title}</h5>
            <p className="mb-0">{topic.description}</p>
            <Link to="/topics-detail" className="btn custom-btn mt-3 mt-lg-4">
              Learn More
            </Link>
          </div>

          <span className={`badge ${topic.badgeClass} rounded-pill ms-auto`}>
            {topic.badge}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;