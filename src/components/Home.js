import React from 'react';
import Navbar from './navbar';

function Home() { 
  console.log("home ")
  return (
    <div>
      <Navbar/>
      <div >
          <main>
            <div className="intro">
              <h1>SmartDns manager</h1>
              <p>Here you can do your DNS record enter and zone creation</p>
              {/* <span></span> */}
            </div>
            <div className="achievements">
              <div className="work">
                <i className="fas fa-atom"></i>
                <p className="work-heading">SmartDNS Record</p>
                <p className="work-text">Upon clicking the "Records" option in the navigation bar, you will be directed to the "Record Entry" page. On this page, you will find a form that allows you to input the necessary details for creating a new record. Once you've filled out the form and submitted it, you will receive a confirmation of success.</p>
              </div>
              <div className="work">
                <i className="fas fa-skiing"></i>
                <p className="work-heading">Zone creation</p>
                <p className="work-text">"When you click on 'Zone' in the navigation bar, you will be directed to the 'Zone Creation' page. On this page, you can input your desired zone name. Please note that creating a zone requires a password, which you can obtain by contacting the Infrastructure Build Team."</p>
              </div>
            </div>
            <div className="about-me">
              <div className="about-me-text">
                <h2>Access</h2>
                <p>As the entries will be made on the production DNS server, access is limited and restricted to a small number of authorized users.</p>
              </div>
             <image></image>
            </div>
          </main>
      </div>
    </div>
  );
}

export default Home;
