import React from 'react'
import "./NotFound.css"

const NotFound: React.FC = () => {
  return (
    <div className="notfound-container">
        <img 
          className="notfound-img"
          src="https://cdnv2.tgdd.vn/mwg-static/common/Common/tgdd-cach-khac-phuc-loi-404-not-found.jpg" 
          alt="not found"
        />
    </div>
  )
}

export default NotFound
