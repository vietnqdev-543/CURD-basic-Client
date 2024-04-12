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
      <div className="item" style={{width:'30%'}}>
        <div className="item-head" style={{fontSize:'30px'}}>LOGO</div>
      </div>
      <div className="item">
      <div className="item-head">COMUMNITY</div>
      <div className="item-a">
        <div>About</div>
        <div>Submit on issue</div>
        <div>Github Repo</div>
        <div>Stack</div>
      </div>
      </div>
      <div className="item">
      <div className="item-head">GETTING STARTED</div>
      <div className="item-a">
        <div>Introduction</div>
        <div>Documenttation</div>
        <div>Usage</div>
        <div>Globals</div>
        <div>Elements</div>
        <div>Collections</div>
        <div>Themes</div>
      </div>
        
      </div>
      <div className="item">
      <div className="item-head">RECOURCES</div>
      <div className='item-a'>
        <div>API</div>
        <div>Form ValidationProduct</div>
        <div>Visbitty</div>
        <div>AccesBiltty</div>
        <div>Community</div>
        <div>Design Defined</div>
        <div>Market Place</div>
      </div>

      </div>
    </div>
    <div className="bot">
      <div>@2023 flow-ui . All rights reseved</div>
      <div style={{display:'flex'}}>
        <div style={{padding:'0 10px'}}>Tems of Services</div>
        <div style={{padding:'0 10px'}}>Privacy Policy</div>
        <div style={{padding:'0 10px'}}>Security</div>
        <div style={{padding:'0 10px'}}>Sitemap</div>
      </div>
      <div>
      <FaFacebook style={{fontSize:22 , padding:'0 5px'}}/>
      <AiFillInstagram style={{fontSize:22 , padding:'0 5px'}}/>
      <FaGithub style={{fontSize:22 , padding:'0 5px'}}/>
      <FaTwitterSquare style={{fontSize:22 , padding:'0 5px'}}/>
      </div>
    </div>
    </div>
  )
}

export default FooterPage