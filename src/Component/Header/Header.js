import React from 'react'
import Image from "../Image/Image"
import shortid from "shortid"
import "./Header.scss"

const Header = props => {

    return(
        <div className="Header position-absolute d-flex align-items-center justify-content-between w-100">
            { props.headerImages && props.headerImages.map((img, i ) => <Image key={i} src={img} cls="header-img" />) }
        </div>
    )
}

export default Header