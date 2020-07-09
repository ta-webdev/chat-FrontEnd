import React, { useState, useEffect } from 'react'
import Header from "../../Component/Header/Header"
import Image from "../../Component/Image/Image"
import "./WaitingPage.scss"
import "./CustomStyles/WaitingPageCustom.scss"
import EventTemplates from "../../EventTemplates.json";
import moment from "moment"

const WaitingPage = props => {
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
            let { hours, minutes, secs } = countdownTimer(props.Time);
            setHour(hours)
            setMins(minutes)
            setSecs(secs)
            if (hours === parseInt("00") && minutes === parseInt("00") && secs === parseInt("00")) {
                clearInterval(myInterval)
            }
        }, 1000);
    }, [props])

    const countdownTimer = date => {
        let dueDate = new Date(date); //getting this value from the API
        
        let eventTime = moment(dueDate, 'YYYY-MM-DD HH:mm:ss a');
        const hours = moment.duration(eventTime - moment()).asHours();
        const hInt = Math.floor(hours);
        const minutes = moment.duration(60 * (hours - hInt), 'minutes').asMinutes();
        const mInt = Math.floor(minutes);
        const seconds = moment.duration(60 * (minutes - mInt), 'seconds').asSeconds();
        const sInt = Math.floor(seconds);

            return {
                hours: (isNaN(hInt)) ? 0 : hInt,
                minutes: (isNaN(mInt)) ? 0 : mInt,
                secs: (isNaN(sInt)) ? 0 : sInt,
            }
        };
        

    return(
        <div className={`WaitingPage ${eventStyling}`} style={ eventTemplate && {backgroundImage : `url(${eventTemplate.waiting.bg})`}}>
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