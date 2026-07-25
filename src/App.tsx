import Header from "./layouts/Headers";
import EmployeeCard from "./components/EmployeeCard";
import StatsBadge from "./components/StatsBadge";
import { mockEmployees } from "./utils/mockData";
import type { Employee } from "./types";

function App() {
  const handleSelectEmployee = (employee: Employee) => {
    console.log("Empleado seleccionado:", employee.name);
    alert(`Seleccionaste a ${employee.name} — ${employee.position}`);
  };

  const total = mockEmployees.length;

  const active = mockEmployees.filter(
    (employee) => employee.status === "active"
  ).length;

  const onLeave = mockEmployees.filter(
    (employee) => employee.status === "on_leave"
  ).length;

  const inactive = mockEmployees.filter(
    (employee) => employee.status === "inactive"
  ).length;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <Header />

      <main style={{ padding: "24px" }}>
        <h2 style={{ marginBottom: "16px", color: "#1e293b" }}>
          Empleados ({total})
        </h2>

        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          <StatsBadge
            label="Total de empleados"
            value={total}
            color="#2563eb"
          />

          <StatsBadge
            label="Empleados activos"
            value={active}
            color="#22c55e"
          />

          <StatsBadge
            label="Empleados en permiso"
            value={onLeave}
            color="#f59e0b"
          />

          <StatsBadge
            label="Empleados inactivos"
            value={inactive}
            color="#ef4444"
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          {mockEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onSelect={handleSelectEmployee}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;