import React from 'react';

function Welcome()
{
    return(
      <section>
        <section className="header-section-1 bg-image-1 header-js" id="header" >
          <div className="overlay-color">
            <div className="container">
              <div className="row section-separator" >
                <div >
                  <div className="text-center">
                    {/*  Header SubTitle Goes here */}
                    <h1 className="title" style= {{color:"white"}}>Saving Money, Made Easy</h1>
                    <div className="detail">
                      <p>
                        At Budget Guru, we make sure tracking your expenses is easy
                        and convenient, which means less hassle on your part to manage money
                        and make the best of your day-to-day expenses.
                      </p>
                    </div>
                    {/* Button Area */}
                    <div className="btn-form btn-scroll">
                      <a href="/signup" className="btn btn-fill right-icon">Get Started <i className="icon icons8-advance" /></a>
                    </div>
                  </div>
                </div> {/* End: .part-1 */}
              </div> {/* End: .row */}
            </div> {/* End: .container */}
          </div> {/* End: .overlay-color */}
        </section>

      <section style={{background: "rgb(214, 245, 230)"}} className="features-section-1 relative background-semi-dark" id="features">
        <div className="container">
          <div className="row section-separator">
            {/* Start: Section Header */}
            <div className="section-header col-md-6" style={{margin: "-5% 0% 5% 25%"}}>
              <h2 className="section-heading">Why Choose Us?</h2>
              <p className="sub-heading">Create your own budget to better track your monthly allowances along with personal tips to help better your spending habits daily.</p>
            </div>
            {/* End: Section Header */}
            <div className="clearfix" />
            <div className="col-xs-12 features-item">
              <div className="row">
                <div className="each-features text-center col-md-4 col-sm-6 col-xs-12">
                  <div className="inner background-light">
                    <i className="icon features-icon icons8-clock" />
                    <h6 className="title">Quick Response</h6>
                    <div className="detail">
                      <p>Got a problem? were on our way, contact our helpful customer service that is available 24/7</p>
                    </div>
                  </div> {/* End: .inner */}
                </div> {/* End: .each-features */}
                <div className="each-features text-center col-md-4 col-sm-6 col-xs-12">
                  <div className="inner background-light">
                    <i className="icon features-icon icons8-bullish" />
                    <h6 className="title">Savings Growth</h6>
                    <div className="detail">
                      <p>Saving has never felt so good, with more money in your pocket you might not know what to do with it</p>
                    </div>
                  </div> {/* End: .inner */}
                </div> {/* End: .each-features */}
                <div className="each-features text-center col-md-4 col-sm-6 col-xs-12">
                  <div className="inner background-light">
                    <i className="icon features-icon icons8-calendar" />
                    <h6 className="title">Charts Don't Lie</h6>
                    <div className="detail">
                      <p>With our chart you will be able to easily track your spending and no where your money is going</p>
                    </div>
                  </div> {/* End: .inner */}
                </div> {/* End: .each-features */}
                <div className="each-features text-center col-md-4 col-sm-6 col-xs-12">
                  <div className="inner background-light">
                    <i className="icon features-icon icons8-coins" />
                    <h6 className="title">Tips Anyone?</h6>
                    <div className="detail">
                      <p>We provide you with daily tips to make sure not a penny is wasted on our watch</p>
                    </div>
                  </div> {/* End: .inner */}
                </div> {/* End: .each-features */}
                <div className="each-features text-center col-md-4 col-sm-6 col-xs-12">
                  <div className="inner background-light">
                    <i className="icon features-icon icons8-wine-glass" />
                    <h6 className="title">Most Popular</h6>
                    <div className="detail">
                      <p>Track your spending through our site or our mobile app were here for you</p>
                    </div>
                  </div> {/* End: .inner */}
                </div> {/* End: .each-features */}
                <div className="each-features text-center col-md-4 col-sm-6 col-xs-12">
                  <div className="inner background-light">
                    <i className="icon features-icon icons8-privacy" />
                    <h6 className="title">Secure</h6>
                    <div className="detail">
                      <p>Your financial information is very important to us so we make sure to keep it safe.</p>
                    </div>
                  </div> {/* End: .inner */}
                </div> {/* End: .each-features */}
              </div>
            </div>
          </div> {/* End: .row */}
        </div> {/* End: .container */}
      </section>
</section>
    );
};
export default Welcome;
