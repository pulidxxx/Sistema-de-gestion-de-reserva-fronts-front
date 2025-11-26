import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Col, Card, Badge, Button } from "react-bootstrap";
import { GeneralProvider } from "../Utils/GeneralContext";
import Header from "../Classes/Header/Header";
import FiltroGestionReservas from "../Components/FiltroGestionReservas";
import "../Styles/Gestion.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function GestionReserva() {
  const [reservas, setReserva] = useState([]);
  const [filtros, setFiltros] = useState({ email: "", id: "", estado: "" });

  const obtenerReservas = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservas`);
      if (!response.ok)
        throw new Error("Error al obtener espacios reservados");
      const data = await response.json();
      setReserva(data);
    } catch (error) {
      console.error("Error al obtener espacios reservados:", error);
    }
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  // Filtrado visual
  const reservasFiltradas = reservas.filter((reserva) => {
    const coincideEmail =
      filtros.email === "" ||
      reserva.usuario.email.toLowerCase().includes(filtros.email.toLowerCase());
    const coincideId = filtros.id === "" || reserva.id.toString() === filtros.id;
    const coincideEstado =
      filtros.estado === "" || reserva.estado.toLowerCase() === filtros.estado.toLowerCase();
    return coincideEmail && coincideId && coincideEstado;
  });

  return (
    <GeneralProvider>
      <Container fluid className="align-items-center m-0 p-0 containerR">
        <Row className="width-100vw mt-0">
          <Col xs={{ span: 8, offset: 2 }}>
            <Row className="p-5">
              <Col className="centered" data-testid="logo"></Col>
              <Col className="titleR">
                <br />
                <h1>Gestión de Reservas</h1>
                <p className="titleRL text-muted">
                  Visualiza y administra todas las reservas del sistema
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="px-5">
          <Col md={{ span: 10, offset: 1 }}>
            <h4 className="text-center">
              <strong>Instrucciones:</strong> Usa los filtros para buscar reservas por usuario, ID o estado.
            </h4>
            <FiltroGestionReservas onFiltrosChange={setFiltros} />
          </Col>
        </Row>
        <Row className="materiales-lista px-5">
          {reservasFiltradas.length === 0 && (
            <Col className="text-center mt-4">
              <p className="h5 text-muted">No hay reservas que coincidan con los filtros.</p>
            </Col>
          )}
          {reservasFiltradas.map((reserva, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
              <Card className="mb-3 creative-card" style={{ width: "100%", minWidth: "270px", maxWidth: "320px" }}>
                <Card.Header className="text-center" style={{ background: "#4f8cff", color: "#fff", fontWeight: 700 }}>
                  <span>Reserva #{reserva.id}</span>
                </Card.Header>
                <Card.Body>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      background: "#e3edff",
                      borderRadius: "50%",
                      width: "48px",
                      height: "48px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.7rem"
                    }}>
                      🗓️
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: "#4f8cff" }}>{reserva.calendario.espacio.nombre}</div>
                      <div style={{ fontSize: "0.95rem", color: "#2d3a4b" }}>
                        {reserva.calendario.fecha} <br />
                        {reserva.calendario.horaInicio} - {reserva.calendario.horaFin}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div style={{ fontSize: "0.97rem" }}>
                    <strong>Usuario:</strong> {reserva.usuario.nombre} <br />
                    <strong>Email:</strong> {reserva.usuario.email}
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <Badge
                      bg={
                        reserva.estado === "Pendiente"
                          ? "warning"
                          : reserva.estado === "Entregado"
                            ? "success"
                            : "secondary"
                      }
                      style={{
                        fontSize: "0.95rem",
                        padding: "7px 16px",
                        borderRadius: "12px",
                        letterSpacing: "1px",
                        textTransform: "uppercase"
                      }}
                    >
                      {reserva.estado}
                    </Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <br />
        <br />
      </Container>
    </GeneralProvider>
  );
}

export default GestionReserva;