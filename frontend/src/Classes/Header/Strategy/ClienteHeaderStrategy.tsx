import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../../Styles/SidebarMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShop,
  faUser,
  faCartShopping,
  faSignOut,
  faStar,
  faArrowPointer,
} from "@fortawesome/free-solid-svg-icons";

const ClienteHeaderStrategy: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>

        <ul>
          <li>
            <Link to="/pagUsuario/usuario" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faUser} /> {localStorage.getItem("username")}
            </Link>
          </li>

          <li>
            <Link to="/pagUsuario/reserva" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faShop} /> Reservar Espacio
            </Link>
          </li>

          <li>
            <Link to="/pagUsuario/reservaMaterial" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faStar} /> Reservar Material
            </Link>
          </li>

          <li>
            <Link to="/pagUsuario/externo" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faArrowPointer} /> Recursos Externos
            </Link>
          </li>

          <li>
            <Link to="/pagUsuario/misReservas" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faCartShopping} /> Mis Reservas
            </Link>
          </li>

          <li onClick={handleLogout}>
            <Link to="/">
              <FontAwesomeIcon icon={faSignOut} /> Cerrar sesión
            </Link>
          </li>
        </ul>

      </div>

      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
};

export default ClienteHeaderStrategy;
