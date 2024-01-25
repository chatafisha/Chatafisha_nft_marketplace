import React, { Component, useEffect, useState } from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Explore from "../components/Explore/ExploreFour";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";
import ExploreThree from "../components/Explore/ExploreThree";
import { getTokens } from "../utils";
import { Link } from "react-router-dom";

const initData = {
  pre_heading: "Explore",
  heading: "Exclusive Digital Assets",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
  filter_1: "All",
  filter_2: "Art",
  filter_3: "Music",
  filter_4: "Collectibles",
  filter_5: "Sports",
};

const ExploreThreee = () => {
  const [tokens, setTokens] = useState([]);
  const [isComponentVisible, setComponentVisibility] = useState(false);
  useEffect(() => {
    getNfts();
  }, []);

  const getNfts = async () => {
    getTokens()
      .then((res) => {
        console.log("Tokens fetched:", res);
        setTokens(res);
      })
      .catch((error) => {
        console.error("Error fetching tokens:", error);
      });
    setComponentVisibility(!isComponentVisible);
  };

  // console.log("Tokens:", tokens);
  // console.log("Loading:", loading);

  return (
    <div className="main">
      <Header />
      <Breadcrumb title="Explore" subpage="Explore" page="Chatafisha NFTs" />

      {/* <div className="row justify-content-center">
        <a className="btn btn-bordered-white flex-center" onClick={getNfts}>
          <i className="icon-loop mr-2" />
          Load Nfts if they're not loaded
        </a>
      </div> */}

      {tokens ? (
        isComponentVisible && <ExploreThree tokens={tokens}></ExploreThree>
      ) : (
        <div> No tokens found</div>
      )}
      <Footer />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default ExploreThreee;
