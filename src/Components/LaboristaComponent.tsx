import { useState, useEffect } from 'react';
import '../Styles/ClienteProfile.css';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Iconos SVG
const UserIcon = () => (
  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Botón personalizado
const Button = ({ children, onClick, className = '' }) => (
  <button onClick={onClick} className={`btn ${className}`}>
    {children}
  </button>
);

// Card personalizados
const Card = ({ children, className = '' }) => (
  <div className={`card ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`card-header ${className}`}>{children}</div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`card-content ${className}`}>{children}</div>
);

export default function LaboristaProfile() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState('');
  const email = localStorage.getItem('email');
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    if (email) {
      obtenerUsuario(email);
    }

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    setCurrentDate(today.toLocaleDateString('es-ES', options));
  }, []);

  const obtenerUsuario = async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuario/consultarEmail/${email}`);
      if (!response.ok) throw new Error('Error al obtener usuario');
      const json = await response.json();
      setUsuario(json);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-grid">
          {/* Panel lateral con foto, estado y datos */}
          <aside className="profile-sidebar">
            <div className="profile-info">
              <div className="profile-avatar-large">
                <UserIcon />
              </div>
              <h1>{usuario ? usuario.nombre : 'Cargando...'}</h1>
              <p className="profile-role">{usuario ? usuario.tipo : ''}</p>
              <div className="status-pill active">🟢 Activo</div>
            </div>

            <div className="profile-divider-line"></div>

            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-icon user-icon">
                  <UserIcon />
                </div>
                <div className="stat-content">
                  <p className="stat-label">Email</p>
                  <p className="stat-value">{usuario ? usuario.email : 'N/A'}</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Contenido principal */}
          <main className="profile-main">
            {/* Tarjeta de bienvenida */}
            <Card className="welcome-card">
              <CardHeader className="welcome-header">
                <div className="welcome-info">
                  <div className="welcome-avatar">
                    <UserIcon />
                  </div>
                  <div>
                    <h2 className="welcome-title">
                      Bienvenido, {usuario ? usuario.nombre : 'Cargando...'}{' '}
                    </h2>
                    <p className="welcome-subtitle">Nos alegra verte de nuevo</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="welcome-content">
                <p className="welcome-description">
                  Desde aquí puedes gestionar y modificar las reservas y materiales.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <Button
                    onClick={() => navigate('/laborista/gestionReservas')}
                    className="reservation-btn"
                  >
                    <span>Gestiona las reservas</span>
                    <ArrowRightIcon />
                  </Button>
                  <Button
                    onClick={() => navigate('/laborista/gestionMateriales')}
                    className="reservation-btn"
                  >
                    <span>Gestiona los materiales</span>
                    <ArrowRightIcon />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sección de información */}
            <div className="info-grid">
              <Card className="info-card">
                <CardContent className="info-content">
                  <div className="info-item">
                    <div className="info-icon date-icon">
                      <CalendarIcon />
                    </div>
                    <div>
                      <h3 className="info-title">Fecha Actual</h3>
                      <p className="info-value">{currentDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}