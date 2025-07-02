import React from 'react';
import TopicCard from './TopicCard';

const TopicsListing = () => {
  const topics = [
    {
      id: 1,
      title: 'Web Design',
      description: 'Topic Listing includes home, listing, detail and contact pages. Feel free to modify this template for your custom websites.',
      image: 'images/topics/undraw_Remote_design_team_re_urdx.png',
      badge: '14',
      badgeClass: 'bg-design'
    },
    {
      id: 2,
      title: 'Advertising',
      description: 'Visit TemplateMo website to download free CSS templates. Lorem ipsum dolor, sit amet consectetur adipisicing elit animi necessitatibus',
      image: 'images/topics/undraw_online_ad_re_ol62.png',
      badge: '30',
      badgeClass: 'bg-advertising'
    },
    {
      id: 3,
      title: 'Podcast',
      description: 'You can browse free templates based on different tags either for commercial or personal use. We always want to bring something new.',
      image: 'images/topics/undraw_Podcast_audience_re_4i5q.png',
      badge: '20',
      badgeClass: 'bg-music'
    },
    {
      id: 4,
      title: 'Investment',
      description: 'Topic Listing is a free Bootstrap 5 CSS template for your business websites. This layout is based on the famous Bootstrap framework.',
      image: 'images/topics/undraw_Finance_re_gnv2.png',
      badge: '25',
      badgeClass: 'bg-finance'
    },
    {
      id: 5,
      title: 'Finance',
      description: 'You can freely use this template for a commercial purpose or personal use. You can also change the whole layout or design if you want.',
      image: 'images/topics/undraw_right_direction_tge8.png',
      badge: '35',
      badgeClass: 'bg-finance'
    },
    {
      id: 6,
      title: 'Music',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint animi necessitatibus aperiam repudiandae nam omnis',
      image: 'images/topics/undraw_happy_music_g6wc.png',
      badge: '45',
      badgeClass: 'bg-music'
    }
  ];

  return (
    <div className="topics-listing-page" id="top">
      <header className="site-header d-flex flex-column justify-content-center align-items-center">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-5 col-12 mb-5">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Homepage</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Topics Listing
                  </li>
                </ol>
              </nav>

              <h2 className="text-white">Browse Topics</h2>

              <div className="d-flex align-items-center mt-5">
                <a href="#topics-listing" className="btn custom-btn custom-border-btn smoothscroll me-4">
                  Read More
                </a>
                <a href="#top" className="custom-icon bi-bookmark smoothscroll"></a>
              </div>
            </div>

            <div className="col-lg-5 col-12">
              <div className="topics-listing-form">
                <div className="input-group input-group-lg">
                  <span className="input-group-text bi-search" id="basic-addon1"></span>
                  <input
                    name="keyword"
                    type="search"
                    className="form-control"
                    id="keyword"
                    placeholder="Type keyword and hit enter..."
                    aria-label="Search"
                  />
                  <button type="submit" className="form-control">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="topics-listing-section section-padding" id="topics-listing">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12 text-center">
              <h3 className="mb-5">Popular Topics</h3>
            </div>

            {topics.map((topic) => (
              <div key={topic.id} className="col-lg-8 col-12 mx-auto">
                <TopicCard topic={topic} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12 text-center mb-4">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center mb-0">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">Prev</span>
                    </a>
                  </li>
                  <li className="page-item active" aria-current="page">
                    <a className="page-link" href="#">1</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">2</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">3</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopicsListing;