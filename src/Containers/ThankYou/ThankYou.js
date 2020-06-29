import React, { useState, useEffect } from 'react'
import Header from "../../Component/Header/Header"
import Image from "../../Component/Image/Image"
import "./ThankYou.scss"
import "./CustomStyles/ThankYouCustom.scss"
import EventTemplates from "../../EventTemplates.json";

const ThankYou = props => {

    const [eventStyling, setEventStyling] = useState("")
    const [eventTemplate, setEventTemplate] = useState(null);

    useEffect(() => {
        if(props.EventId) {
            setEventStyling(`Event${props.EventId}`)
        }
        EventTemplates.map(t => t.template.eventId === parseInt(props.EventId) && setEventTemplate(t.template))
    }, [props])

    return(
        <div className={`ThankYou ${eventStyling}`} style={ eventTemplate && {backgroundImage : `url(${eventTemplate.bg})`}}>
            <Header headerImages={eventTemplate && eventTemplate.header.imgUrl}/>
            <div className="content-holder w-100 d-flex justify-content-around align-items-center flex-column">
                <div className="event-logo-holder d-flex justify-content-center align-items-center">
                    <Image src={eventTemplate && eventTemplate.eventThemeLogo} alt="event-theme-logo" cls="event-theme-logo"/>
                </div>
                <div className="thankyou-image-holder d-flex justify-content-center align-items-center" style={eventTemplate && {backgroundImage : `url(${eventTemplate.thankYou.tintImg})`}}>
                    <Image src={eventTemplate && eventTemplate.thankYou.thankYouImg} alt="thankyou-image" cls="thankyou-image"/>
                </div>
                { eventTemplate && eventTemplate.footerImg.length > 0 && <div className="footer-img-holder position-absolute w-100 d-flex align-items-center justify-content-center">
                    <Image src={eventTemplate.footerImg} cls={"footer-image"}/>
                </div> }
            </div>
        </div>
    )
}

export default ThankYou