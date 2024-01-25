import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const itemsPerPage = 10; // Number of items to display per page

const NFTS = () => {
  const [collections, setCollections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCollections, setFilteredCollections] = useState([]); // Define filteredCollections state

  // Fetch data and filter logic
  useEffect(() => {
    const getColls = async () => {
      try {
        const response = await axios.get(
          "https://marketplace.chatafisha.com:5000/nfts/"
        );
        setCollections(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    getColls();
  }, []); // Empty dependency array ensures that this effect runs once after the initial render

  useEffect(() => {
    const filteredData = collections.filter(
      (item) =>
        (item.accountid &&
          item.accountid.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.email &&
          item.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCollections(filteredData);
  }, [collections, searchTerm]); // Re-run the effect when collections or searchTerm changes

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCollections.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const sortedItems = collections
    .slice() // Create a shallow copy of the array to avoid mutating the original array
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className={styles.container}>
        {/* Filter Input */}
        <input
          type="text"
          placeholder="Search by Account Id or Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.filterInput}
        />
        {/* Table */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Code</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Account Id</th>
              <th className={styles.th}>Description</th>
              <th className={styles.th}>Type of Waste</th>
              <th className={styles.th}>Kgs</th>
              <th className={styles.th}>Date</th>
              <th className={styles.th}>Image</th>
              <th className={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item) => (
              <tr key={item.code} className={styles.tr}>
                <td className={styles.td}>{item.code}</td>
                <td className={styles.td}>{item.name}</td>
                <td className={styles.td}>{item.email}</td>
                <td className={styles.td}>{item.accountid}</td>
                <td className={styles.td}>{item.description}</td>
                <td className={styles.td}>{item.typeofwaste}</td>
                <td className={styles.td}>{item.kgs}</td>
                <td className={styles.td}>{item.date}</td>
                <td className={styles.td}>
                  <div className={styles["image-container"]}>
                    <img
                      className={styles.image}
                      src={item.image}
                      alt={`Image ${item.code}`}
                      onClick={() => window.open(item.image)}
                    />
                  </div>
                </td>
                <td className={styles.td}>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className={styles.pagination}>
          {Array.from(
            { length: Math.ceil(filteredCollections.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                className={styles.paginationButton}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default NFTS;
