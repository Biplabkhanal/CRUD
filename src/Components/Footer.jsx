import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          ></a>
          <span className="mb-3 mb-md-0 text-body-secondary">
            © Biplab Khanal. All rights reserved.
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a
              className="text-body-secondary"
              href="https://www.instagram.com/leo_biplab10?igsh=b205eXI2ZnVrYmw%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={24} />
            </a>
          </li>
          <li className="ms-3">
            <a
              className="text-body-secondary"
              href="https://www.facebook.com/biplab.khanal.104"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={24} />
            </a>
          </li>
          <li className="ms-3">
            <a
              className="text-body-secondary"
              href="https://github.com/Biplabkhanal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={24} />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};
export default Footer;
