import React from 'react';
import { Link } from 'react-router-dom';

const TopicsDetail = () => {
  return (
    <div className="topics-detail-page" id="top">
      <header className="site-header d-flex flex-column justify-content-center align-items-center">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-5 col-12 mb-5">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Homepage</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Web Design
                  </li>
                </ol>
              </nav>

              <h2 className="text-white">Introduction to <br /> Web Design 101</h2>

              <div className="d-flex align-items-center mt-5">
                <a href="#topics-detail" className="btn custom-btn custom-border-btn smoothscroll me-4">
                  Read More
                </a>
                <a href="#top" className="custom-icon bi-bookmark smoothscroll"></a>
              </div>
            </div>

            <div className="col-lg-5 col-12">
              <div className="topics-detail-block bg-white shadow-lg">
                <img 
                  src="images/topics/undraw_Remote_design_team_re_urdx.png" 
                  className="topics-detail-block-image img-fluid" 
                  alt="" 
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="topics-detail-section section-padding" id="topics-detail">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12 m-auto">
              <h3 className="mb-4">What is Web Design?</h3>

              <p>
                Web design is the process of creating and organizing the visual elements, layout, and user interface of a website. 
                It involves combining aesthetics, functionality, and user experience to create an engaging and intuitive digital experience.
              </p>

              <p>
                <strong>Key Elements of Web Design:</strong>
              </p>

              <blockquote className="blockquote">
                "Good design is obvious. Great design is transparent." - Joe Sparano
              </blockquote>

              <p>
                The best web designs seamlessly blend form and function, creating an experience that feels natural and intuitive to users. 
                This requires understanding both technical capabilities and user psychology.
              </p>

              <div className="social-share d-flex mt-5">
                <span className="me-4">Share:</span>
                <a href="#" className="social-icon-link bi-twitter"></a>
                <a href="#" className="social-icon-link bi-facebook"></a>
                <a href="#" className="social-icon-link bi-pinterest"></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12 text-center">
              <h6>Related Topics</h6>
            </div>

            <div className="col-lg-6 col-12 mt-3 mb-4 mb-lg-0">
              <div className="custom-block bg-white shadow-lg">
                <Link to="/topics-detail">
                  <div className="d-flex">
                    <div>
                      <h5 className="mb-2">Graphic Design</h5>
                      <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                    </div>
                    <span className="badge bg-design rounded-pill ms-auto">59</span>
                  </div>
                  <img 
                    src="images/topics/undraw_Remote_design_team_re_urdx.png" 
                    className="custom-block-image img-fluid" 
                    alt="" 
                  />
                </Link>
              </div>
            </div>

            <div className="col-lg-6 col-12 mt-lg-3">
              <div className="custom-block bg-white shadow-lg">
                <Link to="/topics-detail">
                  <div className="d-flex">
                    <div>
                      <h5 className="mb-2">UI/UX Design</h5>
                      <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                    </div>
                    <span className="badge bg-design rounded-pill ms-auto">75</span>
                  </div>
                  <img 
                    src="images/topics/undraw_Educator_re_ju47.png" 
                    className="custom-block-image img-fluid" 
                    alt="" 
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopicsDetail;