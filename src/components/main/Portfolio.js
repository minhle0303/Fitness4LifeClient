import React from "react";

const Portfolio = () => {
  return (
    <section id="portfolio">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title wow fadeInDown">Gallery</h2>
          <p className="wow fadeInDown">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget risus vitae massa
            <br /> semper aliquam quis mattis quam.
          </p>
        </div>

        <div className="text-center">
          <ul className="portfolio-filter" style={{ display: "none" }}>
            <li><a className="active" href="#" data-filter="*">All Works</a></li>
            <li><a href="#" data-filter=".designing">Designing</a></li>
            <li><a href="#" data-filter=".mobile">Mobile App</a></li>
            <li><a href="#" data-filter=".development">Development</a></li>
          </ul>
        </div>

        <div className="portfolio-items">
          <div className="portfolio-item designing">
            <div className="portfolio-item-inner">
              <img className="img-responsive" src="../../assets/images/portfolio/01.jpg" alt="" />
              <div className="portfolio-info">
                <a className="preview" href="../../assets/images/portfolio/01.jpg" rel="prettyPhoto">
                  <i className="fa fa-eye"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="portfolio-item mobile development">
            <div className="portfolio-item-inner">
              <img className="img-responsive" src="../../assets/images/portfolio/02.jpg" alt="" />
              <div className="portfolio-info">
                <a className="preview" href="../../assets/images/portfolio/02.jpg" rel="prettyPhoto">
                  <i className="fa fa-eye"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="portfolio-item designing">
            <div className="portfolio-item-inner">
              <img className="img-responsive" src="../../assets/images/portfolio/03.jpg" alt="" />
              <div className="portfolio-info">
                <a className="preview" href="../../assets/images/portfolio/03.jpg" rel="prettyPhoto">
                  <i className="fa fa-eye"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="portfolio-item mobile">
            <div className="portfolio-item-inner">
              <img className="img-responsive" src="../../assets/images/portfolio/04.jpg" alt="" />
              <div className="portfolio-info">
                <a className="preview" href="../../assets/images/portfolio/04.jpg" rel="prettyPhoto">
                  <i className="fa fa-eye"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="portfolio-item designing development">
            <div className="portfolio-item-inner">
              <img className="img-responsive" src="../../assets/images/portfolio/05.jpg" alt="" />
              <div className="portfolio-info">
                <a className="preview" href="../../assets/images/portfolio/05.jpg" rel="prettyPhoto">
                  <i className="fa fa-eye"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="portfolio-item mobile">
            <div className="portfolio-item-inner">
              <img className="img-responsive" src="../../assets/images/portfolio/06.jpg" alt="" />
              <div className="portfolio-info">
                <a className="preview" href="../../assets/images/portfolio/06.jpg" rel="prettyPhoto">
                  <i className="fa fa-eye"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="portfolio-item designing development">
            <div className="portfolio-item-inner">
              <img className="img-responsive" src="../../assets/images/portfolio/07.jpg" alt="" />
              <div className="portfolio-info">
                <a className="preview" href="../../assets/images/portfolio/07.jpg" rel="prettyPhoto">
                  <i className="fa fa-eye"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="portfolio-item mobile">
            <div className="portfolio-item-inner">
              <img className="img-responsive" src="../../assets/images/portfolio/08.jpg" alt="" />
              <div className="portfolio-info">
                <a className="preview" href="../../assets/images/portfolio/08.jpg" rel="prettyPhoto">
                  <i className="fa fa-eye"></i>
                </a>
              </div>
            </div>
          </div>
        </div>x
      </div>
    </section>
  );
};

export default Portfolio;
