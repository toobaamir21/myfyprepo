import React from "react";
import { FaRegQuestionCircle, FaPhoneAlt, FaInfoCircle } from "react-icons/fa";

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        background: "#f0f0f0",
        marginTop:"3vh",
        color: "#333",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ width: "50%" }}>
          <h2>Customer Care</h2>
          <div>
            <p>
              <FaRegQuestionCircle /> Help Center
            </p>
            <p>
              <FaPhoneAlt /> How to Buy Corporate & Bulk Purchasing
            </p>
            <p>
              <FaInfoCircle /> Returns & Refunds
            </p>
            <p>
              <FaPhoneAlt /> Contact Us
            </p>
          </div>
        </div>
        <div style={{ width: "50%" }}>
          <h2>Artistry</h2>
          <div>
            <p>
              <FaInfoCircle /> About Us
            </p>
            <p>
              <FaRegQuestionCircle /> Terms & Conditions
            </p>
            <p>
              <FaInfoCircle /> Privacy & Policy
            </p>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #ccc", paddingTop: "1rem" }}>
        <p>&copy; 2024 Artistry. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
