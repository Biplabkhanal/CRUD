import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSave } from "@fortawesome/free-solid-svg-icons";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Form.css";

const Table = ({ records, onDelete, onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editableIndex, setEditableIndex] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(records.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = records.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEditClick = (index) => {
    setEditableIndex(index);
    onEdit(index);
  };

  const handleUpdateClick = () => {
    setEditableIndex(null);
  };

  return (
    <div>
      {showTable && (
        <>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((record, index) => (
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
                  <td>
                    {editableIndex === index ? (
                      <button onClick={handleUpdateClick}>
                        <FontAwesomeIcon icon={faSave} />
                      </button>
                    ) : (
                      <button onClick={() => handleEditClick(index)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    )}
                    <button onClick={() => onDelete(index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-container">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              <GrPrevious />
            </button>
            <span>{currentPage}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <GrNext />
            </button>
          </div>
        </>
      )}

      {showTable && (
        <Link to="/profiles" state={records}>
          <button type="button" className="btn btn-success button">
            View Profile
          </button>
        </Link>
      )}
    </div>
  );
};

export default Table;
