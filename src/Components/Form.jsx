import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Form.css";
import Table from "./Table";
import "bootstrap/dist/css/bootstrap.min.css";

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    address: {
      city: "",
      district: "",
      province: "",
      country: "Nepal",
    },
    profilePicture: null,
  });
  const [errors, setErrors] = useState({});
  const [records, setRecords] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [editableIndex, setEditableIndex] = useState(-1); // Index of the record being edited

  // Fetch country list from the provided API
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countries = response.data.map((country) => country.name.common);
        setCountryList(countries);
      })
      .catch((error) => console.error("Error fetching country list:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Real-time validation
    validateField(name, value);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
    // Real-time validation for address fields
    validateField(name, value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profilePicture: file,
    });
    // Real-time validation for file input
    validateFile(file);
  };

  const validateField = (fieldName, value) => {
    const validationErrors = { ...errors };

    switch (fieldName) {
      case "name":
        validationErrors.name = value.trim() ? "" : "Name is required";
        break;
      case "email":
        validationErrors.email = /\S+@\S+\.\S+/.test(value)
          ? ""
          : "Invalid email format";
        break;
      case "phoneNumber":
        validationErrors.phoneNumber = /^\d{7,}$/.test(value)
          ? ""
          : "Phone number must be at least 7 digits";
        break;
      default:
        break;
    }

    setErrors(validationErrors);
  };

  const validateFile = (file) => {
    const validationErrors = { ...errors };

    if (file && !file.name.endsWith(".png")) {
      validationErrors.profilePicture = "Profile picture must be in PNG format";
    } else {
      validationErrors.profilePicture = "";
    }

    setErrors(validationErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const validationErrors = {};
    Object.keys(formData).forEach((fieldName) => {
      validateField(fieldName, formData[fieldName]);
    });

    // Check for validation errors
    const isValid = Object.values(errors).every((error) => !error);

    if (isValid) {
      if (editableIndex !== -1) {
        // Update the record if it's being edited
        const updatedRecords = [...records];
        updatedRecords[editableIndex] = formData;
        setRecords(updatedRecords);
        setEditableIndex(-1);
      } else {
        // Add form data to records if it's a new entry
        setRecords([...records, formData]);
      }

      // Reset form data and errors
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        dob: "",
        address: {
          city: "",
          district: "",
          province: "",
          country: "Nepal",
        },
        profilePicture: null,
      });
      setErrors({});
      setShowTable(true);

      // Scroll to the table
      const tableContainer = document.querySelector(".table-container");
      tableContainer.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDelete = (index) => {
    const updatedRecords = [...records];
    updatedRecords.splice(index, 1);
    setRecords(updatedRecords);
  };

  const handleEdit = (index) => {
    // Populate the form with the data of the selected record
    const selectedRecord = records[index];
    setFormData(selectedRecord);

    // Set the editable index to the selected index
    setEditableIndex(index);
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && (
              <span className="text-danger">{errors.phoneNumber}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={formData.address.city}
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="district" className="form-label">
              District
            </label>
            <input
              type="text"
              className="form-control"
              id="district"
              name="district"
              value={formData.address.district}
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="province" className="form-label">
              Province
            </label>
            <select
              className="form-select"
              id="province"
              name="province"
              value={formData.address.province}
              onChange={handleAddressChange}
              required
              style={{ marginBottom: "6px" }}
            >
              <option value="">Select Province</option>
              {[...Array(7)].map((_, index) => (
                <option key={index} value={index + 1}>
                  Province {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select
              className="form-select"
              id="country"
              name="country"
              value={formData.address.country}
              onChange={handleAddressChange}
              required
              style={{ marginBottom: "6px" }}
            >
              <option value="">Select Country</option>
              {countryList.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="profilePicture" className="form-label">
              Profile Picture
            </label>
            <input
              type="file"
              className="form-control"
              id="profilePicture"
              name="profilePicture"
              accept=".png"
              onChange={handleFileChange}
              required
              style={{ marginBottom: "6px" }}
            />
            {errors.profilePicture && (
              <span className="text-danger">{errors.profilePicture}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            {editableIndex !== -1 ? "Update" : "Submit"}
          </button>
        </form>
      </div>
      {showTable && records.length > 0 && (
        <div className="table-container">
          <Table
            records={records}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      )}
    </>
  );
};

export default Form;
