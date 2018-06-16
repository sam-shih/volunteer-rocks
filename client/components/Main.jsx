import React from 'react';

const Main = (props) => (
  <React.Fragment>
    <section className="showcase">
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          <div className="col-lg-6 order-lg-2 text-white showcase-img image1"></div>
          <div className="col-lg-6 order-lg-1 my-auto showcase-text">
            <h2>Easily Search for Volunteer Opportunities</h2>
            <p className="lead mb-0">Start searching by entering your zip code. You'll be able to find the perfect volunteering opportunity in your area.</p>
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col-lg-6 text-white showcase-img image2"></div>
          <div className="col-lg-6 my-auto showcase-text">
            <h2>Sign Up Today</h2>
            <p className="lead mb-0">You'll have access to our awesome filters!  Just click on your user icon once you're signed in to view a map of opportunities in your area.</p>
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col-lg-6 order-lg-2 text-white showcase-img image3"></div>
          <div className="col-lg-6 order-lg-1 my-auto showcase-text">
            <h2>Tell your friends!</h2>
            <p className="lead mb-0">Let your friends know about us! Volunteering is a great way to spend time with friends or family.</p>
          </div>
            <ul id="privateMessages"></ul>
        </div>
          <ul id="messages"></ul>
          <form id="everybody" action=""><input id="m" autoComplete="off" /><button>Send</button></form>
          <form id="private" action=""><input id="pM" autoComplete="off" /><button>private</button></form>
      </div>
    </section>
  </React.Fragment>
);

export default Main;