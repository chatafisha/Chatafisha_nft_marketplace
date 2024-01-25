import React, { Component } from "react";
import axios from "axios";

const BASE_URL =
  "https://my-json-server.typicode.com/themeland/netstorm-json-2/footer";

class Footer extends Component {
  state = {
    data: {
      img: "https://chatafisha.com/wp-content/uploads/2023/07/chatafisha-icon.png",
      content: "Welcome to Chatafisha NFT Marketplace.",
      widget_1: "Useful Links",
      widget_2: "Community",
      widget_3: "Subscribe Us",
    },
    socialData: [
      {
        id: 2,
        link: "https://x.com/chatafisha?s=11&t=hj2iETJ0AG45JhGdjSLNcg",
        icon: "fab fa-twitter",
      },

      {
        id: 4,
        link: "https://discord.gg/qF3uVxtb3d",
        icon: "fab fa-discord",
      },
    ],
    widgetData_1: [
      {
        id: 1,
        text: "All NFTs",
        link: "/explore",
      },

      {
        id: 2,
        text: "Get Started",
        link: "/claim-nft",
      },
      {
        id: 3,
        text: "Explore",
        link: "/explore",
      },
      {
        id: 4,
        text: "www.chatafisha.com",
        link: "http://www.chatafisha.com",
      },
    ],
    widgetData_2: [
      {
        id: 1,
        text: "Help Center",
      },
      {
        id: 2,
        text: "Partners",
      },
      {
        id: 3,
        text: "Suggestions",
      },
      {
        id: 4,
        text: "Blog",
      },
      {
        id: 5,
        text: "Newsletter",
      },
    ],
  };

  render() {
    return (
      <footer className="footer-area">
        {/* Footer Top */}
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6 res-margin">
                {/* Footer Items */}
                <div className="footer-items">
                  {/* Footer Title */}
                  <h4 className="footer-title">{this.state.data.widget_1}</h4>
                  <ul>
                    {this.state.widgetData_1.map((item, idx) => {
                      return (
                        <li key={`wdo_${idx}`}>
                          <a href={item.link}>{item.text}</a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                {/* Footer Items */}
                <div className="footer-items">
                  {/* Logo */}
                  <a className="navbar-brand" href="/">
                    <img src={this.state.data.img} alt="" />
                  </a>
                  {/* Social Icons */}
                  <div className="social-icons d-flex">
                    {this.state.socialData.map((item, idx) => {
                      return (
                        <a
                          key={`sd_${idx}`}
                          className={item.link}
                          href={item.link}
                        >
                          <i className={item.icon} />
                          <i className={item.icon} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* Copyright Area */}
                <div className="copyright-area d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4">
                  {/* Copyright Left */}
                  <a
                    className="copyright-left"
                    href="https://www.chatafisha.com"
                  >
                    www.chatafisha.com
                  </a>
                  {/* Copyright Right */}
                  {/* <div className="copyright-right">
                    Made with <i className="fas fa-heart" /> By{" "}
                    <a href="#">Themeland</a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
