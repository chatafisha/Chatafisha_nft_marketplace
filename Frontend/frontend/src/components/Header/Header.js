import React, { useEffect, useState } from "react";
import { accountId, login } from "../../utils";

const Header = () => {
  const isButtonActive = true;
  const adminAccounts = [
    "chatafisha_marketplace.near",
    "chatafisha_nft_marketplace.testnet",
  ];
  return (
    <header id="header">
      {/* Navbar */}
      <nav
        data-aos="zoom-out"
        data-aos-delay={800}
        className="navbar navbar-expand"
      >
        <div className="container header">
          {/* Navbar Brand*/}
          <a className="navbar-brand" href="/">
            <img
              className="navbar-brand-sticky"
              src="https://chatafisha.com/wp-content/uploads/2023/07/chatafisha-icon.png"
              alt="sticky brand-logo"
            />
          </a>
          <div className="ml-auto" />
          {/* Navbar */}
          <ul className="navbar-nav items mx-auto">
            <li className="nav-item dropdown">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" href="/collection">
                My collection
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" href="/explore">
                Explore
              </a>
            </li>
            {/* <li className="nav-item">
                            <a href="/activity" className="nav-link">Activity</a>
                        </li> */}
            {/* <li className="nav-item dropdown">
              <a className="nav-link" href="#">
                Community <i className="fas fa-angle-down ml-1" />
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <a href="/blog" className="nav-link">
                    Blog
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/blog-single" className="nav-link">
                    Blog Single
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/help-center" className="nav-link">
                    Help Center
                  </a>
                </li>
              </ul>
            </li> */}
            {/* <li className="nav-item dropdown">
              <a className="nav-link" href="#">
                Pages <i className="fas fa-angle-down ml-1" />
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <a href="/authors" className="nav-link">
                    Authors
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/author" className="nav-link">
                    Author
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/wallet-connect" className="nav-link">
                    Wallet Connect
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/create" className="nav-link">
                    Create
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/signup" className="nav-link">
                    Signup
                  </a>
                </li>
              </ul>
            </li> */}
            {adminAccounts.includes(accountId().accountId) ? (
              <li className="nav-item">
                <a href="/nft-claims" className="nav-link">
                  NFT claims
                </a>
              </li>
            ) : (
              <li className="nav-item">
                <a href="/claim-nft" className="nav-link">
                  Claim NFT
                </a>
              </li>
            )}
          </ul>

          {/* Navbar Icons */}
          {/* <ul className="navbar-nav icons">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                data-toggle="modal"
                data-target="#search"
              >
                <i className="fas fa-search" />
              </a>
            </li>
          </ul> */}
          {/* Navbar Toggler */}
          <ul className="navbar-nav toggle">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                data-toggle="modal"
                data-target="#menu"
              >
                <i className="fas fa-bars toggle-icon m-0" />
              </a>
            </li>
          </ul>
          {/* Navbar Action Button */}
          <ul className="navbar-nav action">
            <li className="nav-item ml-3">
              <div
                className="btn ml-lg-auto"
                style={{
                  backgroundColor: "#B3E9A2",
                  color: "rgba(56, 45, 33, 0.7)",
                  maxWidth: "200px", // Truncating long text
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  cursor: "pointer", // Change cursor to pointer on hover
                }}
                onClick={() => login()}
                title={accountId ? accountId().accountId : "Wallet connect"} // Tooltip for full text
              >
                <i className="icon-wallet mr-md-2" />
                {accountId ? accountId().accountId : "Wallet connect"}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
