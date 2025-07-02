import React, { useEffect } from 'react';

const Timeline = () => {
  useEffect(() => {
    // Timeline scroll animation function
    const handleScroll = () => {
      const isScrollIntoView = (elem) => {
        const docViewTop = window.pageYOffset;
        const docViewBottom = docViewTop + window.innerHeight;
        const elemTop = elem.offsetTop;
        const elemBottom = elemTop + window.innerHeight * 0.5;
        
        if (elemBottom <= docViewBottom && elemTop >= docViewTop) {
          elem.classList.add('active');
        }
        if (!(elemBottom <= docViewBottom)) {
          elem.classList.remove('active');
        }
        
        const mainTimelineContainer = document.getElementById('vertical-scrollable-timeline');
        if (mainTimelineContainer) {
          const mainTimelineContainerBottom = mainTimelineContainer.getBoundingClientRect().bottom - window.innerHeight * 0.5;
          const inner = mainTimelineContainer.querySelector('.inner');
          if (inner) {
            inner.style.height = mainTimelineContainerBottom + 'px';
          }
        }
      };

      const timeline = document.querySelectorAll('#vertical-scrollable-timeline li');
      timeline.forEach(isScrollIntoView);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="timeline-section section-padding" id="section_3">
      <div className="section-overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="text-white mb-4">How does it work?</h2>
          </div>

          <div className="col-lg-10 col-12 mx-auto">
            <div className="timeline-container">
              <ul className="vertical-scrollable-timeline" id="vertical-scrollable-timeline">
                <div className="list-progress">
                  <div className="inner"></div>
                </div>

                <li>
                  <h4 className="text-white mb-3">Search your favourite topic</h4>
                  <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, cumque magnam? Sequi, cupiditate quibusdam alias illum sed esse ad dignissimos libero sunt, quisquam numquam aliquam? Voluptas, accusamus omnis?</p>
                  <div className="icon-holder">
                    <i className="bi-search"></i>
                  </div>
                </li>
                
                <li>
                  <h4 className="text-white mb-3">Bookmark &amp; Keep it for yourself</h4>
                  <p className="text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint animi necessitatibus aperiam repudiandae nam omnis est vel quo, nihil repellat quia velit error modi earum similique odit labore. Doloremque, repudiandae?</p>
                  <div className="icon-holder">
                    <i className="bi-bookmark"></i>
                  </div>
                </li>

                <li>
                  <h4 className="text-white mb-3">Read &amp; Enjoy</h4>
                  <p className="text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi vero quisquam, rem assumenda similique voluptas distinctio, iste est hic eveniet debitis ut ducimus beatae id? Quam culpa deleniti officiis autem?</p>
                  <div className="icon-holder">
                    <i className="bi-book"></i>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-12 text-center mt-5">
            <p className="text-white">
              Want to learn more?
              <a href="#" className="btn custom-btn custom-border-btn ms-3">Check out Youtube</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;