import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-page" id="top">
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
                    Contact
                  </li>
                </ol>
              </nav>

              <h2 className="text-white">Contact Form</h2>

              <div className="d-flex align-items-center mt-5">
                <a href="#contact-form" className="btn custom-btn custom-border-btn smoothscroll me-4">
                  Say Hello
                </a>
                <a href="#top" className="custom-icon bi-bookmark smoothscroll"></a>
              </div>
            </div>

            <div className="col-lg-5 col-12">
              <div className="contact-info-wrap">
                <h2 className="mb-4 text-white">Get in touch</h2>
                <h5 className="mb-3 text-white">Topic Listing Center</h5>
                <p className="d-flex mb-1 text-white">
                  <i className="bi-geo-alt me-2"></i>
                  Bay St &amp;, Larkin St, San Francisco, CA 94109, United States
                </p>
                <p className="d-flex mb-1 text-white">
                  <i className="bi-telephone me-2"></i>
                  <a href="tel: 305-240-9671" className="site-footer-link text-white">
                    305-240-9671
                  </a>
                </p>
                <p className="d-flex text-white">
                  <i className="bi-envelope me-2"></i>
                  <a href="mailto:info@company.com" className="site-footer-link text-white">
                    info@company.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="contact-section section-padding" id="contact-form">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12 mx-auto">
              <form onSubmit={handleSubmit} className="custom-form contact-form">
                <h2 className="mb-4 pb-2">Send us a message</h2>

                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor="name">Name</label>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-floating">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        pattern="[^ @]*@[^ @]*"
                        className="form-control"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor="email">Email address</label>
                    </div>
                  </div>

                  <div className="col-lg-12 col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        className="form-control"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor="subject">Subject</label>
                    </div>

                    <div className="form-floating">
                      <textarea
                        name="message"
                        id="message"
                        className="form-control"
                        placeholder="Tell me about the project"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                      <label htmlFor="message">Tell me about the project</label>
                    </div>
                  </div>

                  <div className="col-lg-4 col-12 ms-auto">
                    <button type="submit" className="form-control">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <iframe
        title="Google Maps"
        className="google-map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2595.065641062665!2d-122.4230416990949!3d37.80335401520422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858127459fabad%3A0x808ba520e5e9edb7!2sFrancisco%20Park!5e1!3m2!1sen!2sth!4v1684340239744!5m2!1sen!2sth"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Contact;