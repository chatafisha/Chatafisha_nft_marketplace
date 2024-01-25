import React, { Component, useEffect, useState } from "react";
import { getNftTokens, getTokens } from "../../utils";
import { Link } from "react-router-dom";

const initData = {
  pre_heading: "Dar es Salaam Collection",
  heading: "Explore",
  btn_1: "View All",
  btn_2: "Load More",
};
const ExploreThree = ({ tokens }) => {
  const handleLinkClick = (url) => {
    window.location.href = url;
  };
  return (
    <section className="explore-area">
      {tokens ? (
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Intro */}
              <div className="intro d-flex justify-content-between align-items-end m-0">
                <div className="intro-content">
                  <span>{initData.pre_heading}</span>
                  <h3 className="mt-3 mb-0">{initData.heading}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row items explore-items" key={tokens}>
            {tokens.map((item, idx) => {
              return (
                <div
                  key={`edth_${idx}`}
                  className="col-12 col-sm-6 col-lg-3 item explore-item"
                >
                  <div className="card h-100">
                    <div className="image-cover">
                      <Link
                        to={`/item-details/${encodeURIComponent(
                          JSON.stringify(item)
                        )}`}
                        onClick={() => {
                          handleLinkClick(
                            `/item-details/${encodeURIComponent(
                              JSON.stringify(item)
                            )}`
                          );
                        }}
                        state={{ stateParam: item }}
                      >
                        <img
                          className="card-img-top img-fluid"
                          src={item.metadata.media}
                          alt=""
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      </Link>
                    </div>
                    {/* Card Caption */}
                    <div className="card-caption col-12 p-0">
                      {/* Card Body */}
                      <div className="card-body">
                        <Link
                          to={`/item-details/${encodeURIComponent(
                            JSON.stringify(item)
                          )}`}
                          onClick={() => {
                            handleLinkClick(
                              `/item-details/${encodeURIComponent(
                                JSON.stringify(item)
                              )}`
                            );
                          }}
                          state={{ stateParam: item }}
                        >
                          <h5 className="mb-0">{item.metadata.title}</h5>
                        </Link>
                        <div className="seller d-flex align-items-center my-3">
                          <span>Owned By</span>
                          <Link
                            to={`/item-details/${encodeURIComponent(
                              JSON.stringify(item)
                            )}`}
                            onClick={() => {
                              handleLinkClick(
                                `/item-details/${encodeURIComponent(
                                  JSON.stringify(item)
                                )}`
                              );
                            }}
                            state={{ stateParam: item }}
                          >
                            <h6 className="ml-2 mb-0">{item.owner_id}</h6>
                          </Link>
                        </div>

                        <Link
                          to={`/item-details/${encodeURIComponent(
                            JSON.stringify(item)
                          )}`}
                          onClick={() => {
                            handleLinkClick(
                              `/item-details/${encodeURIComponent(
                                JSON.stringify(item)
                              )}`
                            );
                          }}
                          state={{ stateParam: item }}
                          className="btn btn-bordered-white btn-smaller mt-3"
                        >
                          <i className="icon-rocket mr-2" />
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default ExploreThree;
