import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Timeline from './Timeline';
import FAQ from './FAQ';

const Home = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Placeholder for search functionality
    console.log('Search keyword:', searchKeyword);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section d-flex justify-content-center align-items-center" id="section_1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12 mx-auto">
              <h1 className="text-white text-center">Discover. Learn. Enjoy</h1>
              <h6 className="text-center">platform for creatives around the world</h6>

              <form onSubmit={handleSearch} className="custom-form mt-4 pt-2 mb-lg-0 mb-5" role="search">
                <div className="input-group input-group-lg">
                  <span className="input-group-text bi-search" id="basic-addon1"></span>
                  <input 
                    name="keyword" 
                    type="search" 
                    className="form-control" 
                    id="keyword" 
                    placeholder="Design, Code, Marketing, Finance ..." 
                    aria-label="Search"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                  <button type="submit" className="form-control">Search</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-12 mb-4 mb-lg-0">
              <div className="custom-block bg-white shadow-lg">
                <Link to="/topics-detail">
                  <div className="d-flex">
                    <div>
                      <h5 className="mb-2">Web Design</h5>
                      <p className="mb-0">When you search for free CSS templates, you will notice that TemplateMo is one of the best websites.</p>
                    </div>
                    <span className="badge bg-design rounded-pill ms-auto">14</span>
                  </div>
                  <img src="images/topics/undraw_Remote_design_team_re_urdx.png" className="custom-block-image img-fluid" alt="" />
                </Link>
              </div>
            </div>

            <div className="col-lg-6 col-12">
              <div className="custom-block custom-block-overlay">
                <div className="d-flex flex-column h-100">
                  <img src="images/businesswoman-using-tablet-analysis.jpg" className="custom-block-image img-fluid" alt="" />
                  <div className="custom-block-overlay-text d-flex">
                    <div>
                      <h5 className="text-white mb-2">Finance</h5>
                      <p className="text-white">Topic Listing Template includes homepage, listing page, detail page, and contact page. You can feel free to edit and adapt for your CMS requirements.</p>
                      <Link to="/topics-detail" className="btn custom-btn mt-2 mt-lg-3">Learn More</Link>
                    </div>
                    <span className="badge bg-finance rounded-pill ms-auto">25</span>
                  </div>

                  <div className="social-share d-flex">
                    <p className="text-white me-4">Share:</p>
                    <ul className="social-icon">
                      <li className="social-icon-item">
                        <a href="#" className="social-icon-link bi-twitter"></a>
                      </li>
                      <li className="social-icon-item">
                        <a href="#" className="social-icon-link bi-facebook"></a>
                      </li>
                      <li className="social-icon-item">
                        <a href="#" className="social-icon-link bi-pinterest"></a>
                      </li>
                    </ul>
                    <a href="#" className="custom-icon bi-bookmark ms-auto"></a>
                  </div>
                  <div className="section-overlay"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Topics Section */}
      <section className="explore-section section-padding" id="section_2">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="mb-4">Browse Topics</h2>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="design-tab" data-bs-toggle="tab" data-bs-target="#design-tab-pane" type="button" role="tab" aria-controls="design-tab-pane" aria-selected="true">Design</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="marketing-tab" data-bs-toggle="tab" data-bs-target="#marketing-tab-pane" type="button" role="tab" aria-controls="marketing-tab-pane" aria-selected="false">Marketing</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="finance-tab" data-bs-toggle="tab" data-bs-target="#finance-tab-pane" type="button" role="tab" aria-controls="finance-tab-pane" aria-selected="false">Finance</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="music-tab" data-bs-toggle="tab" data-bs-target="#music-tab-pane" type="button" role="tab" aria-controls="music-tab-pane" aria-selected="false">Music</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="education-tab" data-bs-toggle="tab" data-bs-target="#education-tab-pane" type="button" role="tab" aria-controls="education-tab-pane" aria-selected="false">Education</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="design-tab-pane" role="tabpanel" aria-labelledby="design-tab" tabIndex="0">
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
                      <div className="custom-block bg-white shadow-lg">
                        <Link to="/topics-detail">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Graphic</h5>
                              <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                            </div>
                            <span className="badge bg-design rounded-pill ms-auto">59</span>
                          </div>
                          <img src="images/topics/undraw_Remote_design_team_re_urdx.png" className="custom-block-image img-fluid" alt="" />
                        </Link>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="custom-block bg-white shadow-lg">
                        <Link to="/topics-detail">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Educator</h5>
                              <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                            </div>
                            <span className="badge bg-education rounded-pill ms-auto">75</span>
                          </div>
                          <img src="images/topics/undraw_Educator_re_ju47.png" className="custom-block-image img-fluid" alt="" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade" id="marketing-tab-pane" role="tabpanel" aria-labelledby="marketing-tab" tabIndex="0">
                  <div className="row">
                    <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                      <div className="custom-block bg-white shadow-lg">
                        <Link to="/topics-detail">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Advertising</h5>
                              <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                            </div>
                            <span className="badge bg-advertising rounded-pill ms-auto">30</span>
                          </div>
                          <img src="images/topics/undraw_online_ad_re_ol62.png" className="custom-block-image img-fluid" alt="" />
                        </Link>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
                      <div className="custom-block bg-white shadow-lg">
                        <Link to="/topics-detail">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Video Content</h5>
                              <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                            </div>
                            <span className="badge bg-advertising rounded-pill ms-auto">65</span>
                          </div>
                          <img src="images/topics/undraw_Group_video_re_btu7.png" className="custom-block-image img-fluid" alt="" />
                        </Link>
                      </div>
                    </div>

                    <div className="col-lg-5 col-md-12 col-12 mb-4 mb-lg-0">
                      <div className="custom-block bg-white shadow-lg">
                        <Link to="/topics-detail">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Viral Tweet</h5>
                              <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                            </div>
                            <span className="badge bg-advertising rounded-pill ms-auto">50</span>
                          </div>
                          <img src="images/topics/undraw_viral_tweet_gndb.png" className="custom-block-image img-fluid" alt="" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade" id="finance-tab-pane" role="tabpanel" aria-labelledby="finance-tab" tabIndex="0">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12 mb-4 mb-lg-0">
                      <div className="custom-block bg-white shadow-lg">
                        <Link to="/topics-detail">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Investment</h5>
                              <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                            </div>
                            <span className="badge bg-finance rounded-pill ms-auto">25</span>
                          </div>
                          <img src="images/topics/undraw_Finance_re_gnv2.png" className="custom-block-image img-fluid" alt="" />
                        </Link>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-12 mb-4 mb-lg-0">
                      <div className="custom-block bg-white shadow-lg">
                        <Link to="/topics-detail">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Finance</h5>
                              <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                            </div>
                            <span className="badge bg-finance rounded-pill ms-auto">35</span>
                          </div>
                          <img src="images/topics/undraw_right_direction_tge8.png" className="custom-block-image img-fluid" alt="" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade" id="music-tab-pane" role="tabpanel" aria-labelledby="music-tab" tabIndex="0">
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
                      <div className="custom-block bg-white shadow-lg">
                        <Link to="/topics-detail">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Podcast</h5>
                              <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                            </div>
                            <span className="badge bg-music rounded-pill ms-auto">45</span>
                          </div>
                          <img src="images/topics/undraw_Podcast_audience_re_4i5q.png" className="custom-block-image img-fluid" alt="" />
                        </Link>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
                      <div className="custom-block bg-white shadow-lg">
                        <Link to="/topics-detail">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Rock Music</h5>
                              <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                            </div>
                            <span className="badge bg-music rounded-pill ms-auto">20</span>
                          </div>
                          <img src="images/topics/undraw_happy_music_g6wc.png" className="custom-block-image img-fluid" alt="" />
                        </Link>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="custom-block bg-white shadow-lg">
                        <Link to="/topics-detail">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Classical Music</h5>
                              <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                            </div>
                            <span className="badge bg-music rounded-pill ms-auto">30</span>
                          </div>
                          <img src="images/topics/undraw_Compose_music_ovo2.png" className="custom-block-image img-fluid" alt="" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade" id="education-tab-pane" role="tabpanel" aria-labelledby="education-tab" tabIndex="0">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12 mb-4 mb-lg-0">
                      <div className="custom-block bg-white shadow-lg">
                        <Link to="/topics-detail">
                          <div className="d-flex">
                            <div>
                              <h5 className="mb-2">Educator</h5>
                              <p className="mb-0">Lorem Ipsum dolor sit amet consectetur</p>
                            </div>
                            <span className="badge bg-education rounded-pill ms-auto">75</span>
                          </div>
                          <img src="images/topics/undraw_Educator_re_ju47.png" className="custom-block-image img-fluid" alt="" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <Timeline />

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Section */}
      <section className="contact-section section-padding section-bg" id="section_5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12 text-center">
              <h2 className="mb-5">Get in touch</h2>
            </div>

            <div className="col-lg-5 col-12 mb-4 mb-lg-0">
              <iframe 
                className="google-map" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2595.065641062665!2d-122.4230416990949!3d37.80335401520422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858127459fabad%3A0x808ba520e5e9edb7!2sFrancisco%20Park!5e1!3m2!1sen!2sth!4v1684340239744!5m2!1sen!2sth" 
                width="100%" 
                height="250" 
                style={{border: 0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Francisco Park Location"
              ></iframe>
            </div>

            <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg- mb-md-0 ms-auto">
              <h4 className="mb-3">Head office</h4>
              <p>Bay St &amp;, Larkin St, San Francisco, CA 94109, United States</p>
              <hr />
              <p className="d-flex align-items-center mb-1">
                <span className="me-2">Phone</span>
                <a href="tel: 305-240-9671" className="site-footer-link">305-240-9671</a>
              </p>
              <p className="d-flex align-items-center">
                <span className="me-2">Email</span>
                <a href="mailto:info@company.com" className="site-footer-link">info@company.com</a>
              </p>
            </div>

            <div className="col-lg-3 col-md-6 col-12 mx-auto">
              <h4 className="mb-3">Dubai office</h4>
              <p>Burj Park, Downtown Dubai, United Arab Emirates</p>
              <hr />
              <p className="d-flex align-items-center mb-1">
                <span className="me-2">Phone</span>
                <a href="tel: 110-220-3400" className="site-footer-link">110-220-3400</a>
              </p>
              <p className="d-flex align-items-center">
                <span className="me-2">Email</span>
                <a href="mailto:info@company.com" className="site-footer-link">info@company.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;