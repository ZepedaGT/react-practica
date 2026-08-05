import { useState, type FormEvent } from 'react';
import type { Department, EmployeeRole, EmployeeStatus } from '../types';
import FormField from './FormField';
import StatsBadge from './StatsBadge';

function EmployeeForm() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPosition, setNewPosition] = useState<string>('');
  const [newDepartment, setNewDepartment] = useState<Department>('Tecnología');
  const [newSalary, setNewSalary] = useState<string>('');
  const [newHireDate, setNewHireDate] = useState<string>('');
  const [newStatus, setNewStatus] = useState<EmployeeStatus>('active');
  const [newRole, setNewRole] = useState<EmployeeRole>('employee');
  const [newPhone, setNewPhone] = useState<string>('');
  const [newAvatarUrl, setNewAvatarUrl] = useState<string>('');

  const departments: Department[] = [
    'Tecnología',
    'Recursos Humanos',
    'Finanzas',
    'Operaciones',
    'Ventas',
  ];

  const statuses: EmployeeStatus[] = ['active', 'inactive', 'on_leave'];
  const statusLabels: Record<EmployeeStatus, string> = {
    active: 'Activo',
    inactive: 'Inactivo',
    on_leave: 'En permiso',
  };

  const roles: EmployeeRole[] = ['employee', 'hr', 'admin'];
  const roleLabels: Record<EmployeeRole, string> = {
    employee: 'Empleado',
    hr: 'Recursos Humanos',
    admin: 'Administrador',
  };

  const formFieldStyle = {
    padding: '8px 12px',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#1e293b',
    background: 'white',
    width: '100%',
    boxSizing: 'border-box' as const,
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowForm(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowForm(true)}
        style={{
          padding: '10px 15px',
          borderRadius: '6px',
          border: 'none',
          background: '#2563eb',
          color: 'white',
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        Agregar empleado
      </button>

      {showForm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: '720px',
              maxWidth: '100%',
              background: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(15, 23, 42, 0.2)',
              padding: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <div>
                <p style={{ margin: 0, color: '#64748b', fontSize: '12px', fontWeight: 600 }}>
                  Registro nuevo
                </p>
                <h2 style={{ margin: '6px 0 0', color: '#1e293b' }}>Agregar empleado</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  border: 'none',
                  background: '#e2e8f0',
                  color: '#0f172a',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '18px',
                  lineHeight: '1',
                }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <StatsBadge label="Total" value={0} color="#2563eb" />
              <StatsBadge label="Activos" value={0} color="#16a34a" />
              <StatsBadge label="Nuevos" value={1} color="#ca8a04" />
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <FormField label="Nombre completo *">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Ej. Ana García"
                    style={formFieldStyle}
                  />
                </FormField>

                <FormField label="Correo electrónico *">
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="ana@empresa.com"
                    style={formFieldStyle}
                  />
                </FormField>

                <FormField label="Cargo *">
                  <input
                    type="text"
                    value={newPosition}
                    onChange={(e) => setNewPosition(e.target.value)}
                    placeholder="Ej. Analista de Ventas"
                    style={formFieldStyle}
                  />
                </FormField>

                <FormField label="Departamento *">
                  <select
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value as Department)}
                    style={formFieldStyle}
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Salario *">
                  <input
                    type="number"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    placeholder="45000"
                    style={formFieldStyle}
                  />
                </FormField>

                <FormField label="Fecha de ingreso *">
                  <input
                    type="date"
                    value={newHireDate}
                    onChange={(e) => setNewHireDate(e.target.value)}
                    style={formFieldStyle}
                  />
                </FormField>

                <FormField label="Estado *">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as EmployeeStatus)}
                    style={formFieldStyle}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>{statusLabels[status]}</option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Rol *">
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as EmployeeRole)}
                    style={formFieldStyle}
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>{roleLabels[role]}</option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Teléfono">
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+52 55 1234 5678"
                    style={formFieldStyle}
                  />
                </FormField>

                <FormField label="URL del avatar">
                  <input
                    type="url"
                    value={newAvatarUrl}
                    onChange={(e) => setNewAvatarUrl(e.target.value)}
                    placeholder="https://..."
                    style={formFieldStyle}
                  />
                </FormField>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#fff',
                    color: '#334155',
                    cursor: 'pointer',
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#16a34a',
                    color: '#fff',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Guardar empleado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EmployeeForm;