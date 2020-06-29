import React from 'react';
// import "./104/ThankYou.css";

class ThankYou extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="ThankYou">
        <header className="ThankYou_header_container ThankYou_flex w-100">
          <div className="ThankYou_header_middle_logo">
            <img className="top-logo" alt="adaptive-logo"/>
          </div>
          <section className="ThankYou_flex icici_logo_div ThankYou_left_right_logo w-100">
            <img className="ThankYou_left_logo left-logo ThankYou_icici_img" alt="icici_direct_logo"/>
            <img className="ThankYou_right_logo right-logo ThankYou_icici_img" alt="icici_prudential_logo"/>
          </section>
        </header >
        <section className="ThankYou_main_con ThankYou_flex">
          <img className="ThankYou_image center-thankYou-img" alt="thankyou_right_logo"/>
        </section>
      </div >
    )
  }
}

export default ThankYou;
