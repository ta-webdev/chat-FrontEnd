import React, { useState, useEffect } from 'react'
import Header from "../../Component/Header/Header"
import Image from "../../Component/Image/Image"
import "./WaitingPage.scss"
import "./CustomStyles/WaitingPageCustom.scss"
import EventTemplates from "../../EventTemplates.json";

const WaitingPage = props => {
    const [dayState, setDays] = useState(0);
    const [hourState, setHour] = useState(0);
    const [minState, setMins] = useState(0);
    const [secState, setSecs] = useState(0);

    const [eventStyling, setEventStyling] = useState("")
    const [eventTemplate, setEventTemplate] = useState(null);

    useEffect(() => {
        if(props.EventId) {
            setEventStyling(`Event${props.EventId}`)
        }
        EventTemplates.map(t => t.template.eventId === parseInt(props.EventId) && setEventTemplate(t.template));
        const myInterval = setInterval(() => {
            let { hours, minutes, days, secs } = startTimer(props.Time);
            setDays(days)
            setHour(hours)
            setMins(minutes)
            setSecs(secs)
            if (hours === parseInt("00") && minutes === parseInt("00") && secs === parseInt("00")) {
                clearInterval(myInterval)
            }
        }, 1000);
    }, [props])

    const startTimer = date => {
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

        // calculate (and subtract) whole minutes
        var seconds = Math.floor(r / 60 * 60) % 60;
        r -= seconds * 60;
      
        return {
          days: (isNaN(days)) ? 0 : days,
          hours: (isNaN(hours)) ? 0 : hours,
          minutes: (isNaN(minutes)) ? 0 : minutes,
          secs: (isNaN(seconds)) ? 0 : seconds,
        }
    }
        

    return(
        <div className={`WaitingPage ${eventStyling}`} style={ eventTemplate && {backgroundImage : `url(${eventTemplate.bg})`}}>
            <Header headerImages={eventTemplate && eventTemplate.header.imgUrl}/>
            <div className="content-holder w-100 d-flex align-items-center justify-content-around flex-column" >
                <div className="event-logo-holder">
                    <Image src={eventTemplate && eventTemplate.waiting.eventThemeLogo} alt="event-theme-logo" cls="event-theme-logo"/>
                </div>
                <div className="go-live-holder d-flex justify-content-start align-items-center flex-column">
                    <div className="go-live-img-holder" style={{backgroundImage : `url(${eventTemplate && eventTemplate.waiting.tintImg})`}}>
                        <Image src={eventTemplate && eventTemplate.waiting.goingLiveImg} alt="going-live-img" cls="going-live-img"/>
                    </div>
                    <div className="timer-holder d-flex justify-content-center align-items-center">
                        <Image src={eventTemplate && eventTemplate.waiting.timerBg} alt="timer-bg" cls="timer-bg position-relative">
                            <div className="timer-text d-flex justify-content-start align-items-center flex-column text-white">
                                <div className="row w-100 h-50 time font-weight-bold d-flex justify-content-around align-itmes-center">
                                    <div className="col-3 m-0 text-center">{hourState}</div>
                                    <div className="col-1">:</div>
                                    <div className="col-3 m-0 text-center">{minState}</div>
                                    <div className="col-1">:</div>
                                    <div className="col-3 m-0 text-center">{secState}</div>
                                </div>
                                <div className="row w-100 h-50 time-desc font-weight-bold d-flex justify-content-around align-itmes-center">
                                    <div className="col-3 m-0 text-center">HRS</div>
                                    <div className="col-1"></div>
                                    <div className="col-3 m-0 text-center">MIN</div>
                                    <div className="col-1"></div>
                                    <div className="col-3 m-0 text-center">SEC</div>
                                </div>
                            </div>
                        </Image>
                    </div>  
                </div>  
                { eventTemplate && eventTemplate.footerImg.length > 0 && <div className="footer-img-holder position-absolute w-100 d-flex align-items-center justify-content-center">
                <Image src={eventTemplate.footerImg} cls={"footer-image"}/>
            </div> }
            </div>
        </div>
    )
}

export default WaitingPage