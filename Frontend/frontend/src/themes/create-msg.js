import React, { Component, useEffect } from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import LiveAuctions from "../components/Auctions/AuctionsTwo";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";
import { useParams } from "react-router";

const CreateMsg = () => {
  const { type } = useParams();
  useEffect(() => {
    console.log(type);
  }, []);
  return (
    <div className="main">
      <Header />
      <section>
        <h1>NFT Mint {type}</h1>
      </section>
      <Footer />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default CreateMsg;
