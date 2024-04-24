// ProfilePage.jsx

import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation

const Profiles = () => {
  const location = useLocation(); // Get location using useLocation hook
  const { records } = location.state || {};

  // Check if records is undefined or empty
  if (!records || records.length === 0) {
    return <div>No records available</div>;
  }

  return (
    <div>
      <h1>Profiles</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>City</th>
            <th>District</th>
            <th>Province</th>
            <th>Date of Birth</th>
            <th>Profile Photo</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.name}</td>
              <td>{record.email}</td>
              <td>{record.phoneNumber}</td>
              <td>{record.address.city}</td>
              <td>{record.address.district}</td>
              <td>{record.address.province}</td>
              <td>{record.dob}</td>
              <td>
                <img
                  src={
                    record.profilePicture
                      ? URL.createObjectURL(record.profilePicture)
                      : ""
                  }
                  alt="Profile"
                  style={{ width: 50, height: 50 }}
                />
              </td>
              <td>{record.address.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profiles;
