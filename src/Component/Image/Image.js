import React from 'react';
import "./Image.scss"

const Image = ({src, alt, cls, styles, children, refs, handle}) => {
  return (
    <div style={styles} onClick={handle} className={"Image d-flex align-items-center justify-content-center " + cls}>
        <img src={src} ref={refs} alt={alt}/>
        {children}
    </div>
  );
}

export default Image;