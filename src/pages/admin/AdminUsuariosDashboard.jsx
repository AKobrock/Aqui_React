// src/pages/admin/AdminUsuariosDashboard.jsx
import { useEffect, useState } from "react";
import { getUsers } from "../../services/UserService";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "../../styles/Admin.css";

function AdminUsuariosDashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getUsers();
        setUsuarios(data?.data || data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <div className="spinner-border text-primary mb-3" />
        <p>Cargando estadísticas de usuarios...</p>
      </div>
    );
  }

  const total = usuarios.length;
  const activos = usuarios.filter((u) => u.active).length;
  const inactivos = total - activos;
  const pctActivos = total > 0 ? Math.round((activos / total) * 100) : 0;
  const pctInactivos = total > 0 ? 100 - pctActivos : 0;

  // ==== Pie: Activos vs Inactivos ====
  const pieData = {
    labels: ["Activos", "Inactivos"],
    datasets: [
      {
        data: [activos, inactivos],
        backgroundColor: ["#198754", "#6c757d"],
      },
    ],
  };

  // ==== Bar: Usuarios por mes de última actividad ====
  const activityByMonth = {};

  usuarios.forEach((u) => {
    if (!u.lastActivity) return;
    const d = new Date(u.lastActivity);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    activityByMonth[key] = (activityByMonth[key] || 0) + 1;
  });

  const labelsMes = Object.keys(activityByMonth).sort();
  const dataMes = labelsMes.map((k) => activityByMonth[k]);

  const barData = {
    labels: labelsMes,
    datasets: [
      {
        label: "Usuarios con actividad ese mes",
        data: dataMes,
        backgroundColor: "#0d6efd",
      },
    ],
  };

  return (
    <div className="container mt-5 pt-5 admin-dashboard">
      <h2 className="mb-4 text-center">Dashboard de Usuarios</h2>
      <p className="text-center text-muted mb-5">
        Visión general del estado de las cuentas de usuarios en <strong>Aquí Papá</strong>.
      </p>

      {/* Métricas rápidas */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card admin-card shadow-sm h-100">
            <div className="card-body text-center">
              <h6 className="text-muted mb-2">Total usuarios</h6>
              <p className="display-6 fw-bold mb-0">{total}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card admin-card shadow-sm h-100">
            <div className="card-body text-center">
              <h6 className="text-muted mb-2">Activos</h6>
              <p className="display-6 fw-bold mb-0 text-success">{activos}</p>
              <small className="text-success">{pctActivos}%</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card admin-card shadow-sm h-100">
            <div className="card-body text-center">
              <h6 className="text-muted mb-2">Inactivos</h6>
              <p className="display-6 fw-bold mb-0 text-secondary">{inactivos}</p>
              <small className="text-secondary">{pctInactivos}%</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card admin-card shadow-sm h-100">
            <div className="card-body text-center">
              <h6 className="text-muted mb-2">Ratio actividad</h6>
              <p className="h3 mb-0">
                {total > 0 ? `${activos} / ${total}` : "—"}
              </p>
              <small className="text-muted">
                Usuarios con actividad en el último año (según tu lógica de backend)
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="row g-4">
        <div className="col-md-5">
          <div className="card admin-card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-3">Activos vs Inactivos</h5>
              {total === 0 ? (
                <p className="text-muted">No hay usuarios para mostrar.</p>
              ) : (
                <Pie data={pieData} />
              )}
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div className="card admin-card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-3">Actividad por mes</h5>
              {labelsMes.length === 0 ? (
                <p className="text-muted">No hay registros de actividad.</p>
              ) : (
                <Bar data={barData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsuariosDashboard;
