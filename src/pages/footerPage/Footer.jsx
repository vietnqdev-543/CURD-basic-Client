import React from 'react'
import './style.scss'
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
const FooterPage = () => {
  return (
    <div className='footer-container'>
      <div className="top">
        <div className="item" style={{ width: '30%' }}>
          <div className="item-logo">HorizonHours</div>
        </div>
        <div className="item">
          <div className="item-title">COMUMNITY</div>
          <div className="item-a">
            <div>About</div>
            <div>Submit on issue</div>
            <div>Github Repo</div>
            <div>Stack</div>
          </div>
        </div>
        <div className="item">
          <div className="item-title">GETTING STARTED</div>
          <div className="item-a">
            <div>Introduction</div>
            <div>Documenttation</div>
            <div>Usage</div>
            <div>Globals</div>
          </div>

        </div>
        <div className="item">
          <div className="item-title">RECOURCES</div>
          <div className='item-a'>
            <div>API</div>
            <div>Form ValidationProduct</div>
            <div>Visbitty</div>
            <div>AccesBiltty</div>

          </div>

        </div>
      </div>
      <div className="bot">
        <div className='left'>@2023 flow-ui . All rights reseved</div>
        <div className='mid'>
          <div style={{ padding: '0 10px' }}>Tems of Services</div>
          <div style={{ padding: '0 10px' }}>Privacy Policy</div>
          <div style={{ padding: '0 10px' }}>Security</div>
          <div style={{ padding: '0 10px' }}>Sitemap</div>
        </div>
        <div className='right' >
          <span>  <FaFacebook />  </span>
          <span>  <AiFillInstagram /></span>
          <span> <FaGithub /></span>
          <span> <FaTwitterSquare />  </span>
        </div>
      </div>
    </div>
  )
}

export default FooterPage