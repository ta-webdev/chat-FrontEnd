import React from 'react';
// import "./103/WaitingPage.css";
const getHMS = (date) => {
  let Current = new Date();
  let cDate = new Date(date);

  let r = cDate.getTime() - Current.getTime();
  r = r / 1000;

  var days = Math.floor(r / (60 * 60 * 24));
  r -= days * (60 * 60 * 24);

  // calculate (and subtract) whole hours
  var hours = Math.floor(r / (60 * 60));
  r -= hours * (60 * 60);

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(r / 60) % 60;
  r -= minutes * 60;

  return {
    days: (isNaN(days)) ? 0 : days,
    hours: (isNaN(hours)) ? 0 : hours,
    minutes: (isNaN(minutes)) ? 0 : minutes,
  }
}

class WaitingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      Time: this.props.Time,
      event: '',
      hours: 0,
      minutes: 0,
      days: 0,
    }
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      let { hours, minutes, days } = getHMS(this.props.Time);
      this.setState({ days, hours, minutes });
    }, 1000);

    const query = new URLSearchParams(this.props.location.search);
    let event = query.get('eventId');
    this.setState( { event: event } );
  }


  render() {
    return (
      <div className="waiting_welcomeHeader">
        <header className="waiting_header-logo">
          <div className="Waiting_socialDistancing_logo">
           <img class="header_logo_img"  alt="header_logo_img" />
          </div>        
        </header>

        <section className="SideImg marginBottom">
        <div className="sideimagesHeading_waiting">
            <img className="sideimgLeft"  alt="" />
            <img  className="sideimgRight"  alt="" />
            </div>
        </section>
        
      
        <section className="waiting_welcomeContainer">
          <img className="goLiveImg" alt="goLiveImg"/>
        </section>
        <section class="clockArea">
          <img className="clockbg" alt="" />
          <div className="Clockcount">
            <span className="clocktext">{this.state.hours}&nbsp;</span>
            <span className="clocktext">:&nbsp;</span>
            <span className="clocktext">{this.state.minutes}</span>
          </div>
        </section>
        <section className="Clock-indi">
                  <div className="hrmin ">
                      {/* <span>DAYS</span>  */}
                      <span>HR</span> 
                      <span>MIN</span>
                   </div>
        </section>
      </div>
    )
  }
}

export default WaitingPage;
