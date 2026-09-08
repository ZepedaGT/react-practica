import { useState } from 'react';
import FormField from './FormField';
import type { Employee, Department, EmployeeStatus, EmployeeRole } from '../types';

interface EmployeeFormProps {
  onSave: (data: Omit<Employee, 'id'>) => void;
  onCancel: () => void;
}

export default function EmployeeForm({ onSave, onCancel }: EmployeeFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState<Department>('Tecnología');
  const [salary, setSalary] = useState<string>('');
  const [hireDate, setHireDate] = useState('');
  const [status, setStatus] = useState<EmployeeStatus>('active');
  const [role, setRole] = useState<EmployeeRole>('employee');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const departments: Department[] = ['Tecnología', 'Recursos Humanos', 'Finanzas', 'Operaciones', 'Ventas'];
  const statuses: EmployeeStatus[] = ['active', 'inactive', 'on_leave'];
  const statusLabels: Record<EmployeeStatus, string> = { active: 'Activo', inactive: 'Inactivo', on_leave: 'En permiso' };
  const roles: EmployeeRole[] = ['employee', 'hr', 'admin'];
  const roleLabels: Record<EmployeeRole, string> = { employee: 'Empleado', hr: 'Recursos Humanos', admin: 'Administrador' };

  const formFieldStyle = {
    padding: '8px 12px', border: '1px solid #cbd5e1',
    borderRadius: '6px', fontSize: '14px', color: '#1e293b', background: 'white', width: '100%',
    boxSizing: 'border-box' as const,
  };

  const handleSave = () => {
    if (!name.trim() || !email.trim() || !position.trim() || !hireDate) return;

    const payload: Omit<Employee, 'id'> = {
      name: name.trim(),
      email: email.trim(),
      position: position.trim(),
      department,
      salary: Number(salary) || 0,
      hireDate,
      status,
      role,
      ...(phone.trim() && { phone: phone.trim() }),
      ...(avatarUrl.trim() && { avatarUrl: avatarUrl.trim() }),
    };

    onSave(payload);
    // reset local form
    setName(''); setEmail(''); setPosition(''); setDepartment('Tecnología'); setSalary(''); setHireDate(''); setStatus('active'); setRole('employee'); setPhone(''); setAvatarUrl('');
  };

  return (
    <div>
      <p style={{ margin: '0 0 12px', fontWeight: 600, color: '#1e293b' }}>Nuevo empleado</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '16px' }}>
        <FormField label="Nombre completo *">
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ej. Juan Pérez" style={formFieldStyle} />
        </FormField>
        <FormField label="Correo electrónico *">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Ej. juan.perez@empresa.com" style={formFieldStyle} />
        </FormField>
        <FormField label="Cargo *">
          <input type="text" value={position} onChange={e => setPosition(e.target.value)} placeholder="Ej. Analista" style={formFieldStyle} />
        </FormField>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Departamento *</label>
          <select value={department} onChange={e => setDepartment(e.target.value as Department)} style={formFieldStyle}>
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Salario mensual *</label>
          <input type="number" min="0" value={salary} onChange={e => setSalary(e.target.value)} placeholder="Ej. 8500" style={formFieldStyle} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Fecha de ingreso *</label>
          <input type="date" value={hireDate} onChange={e => setHireDate(e.target.value)} style={formFieldStyle} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Estado *</label>
          <select value={status} onChange={e => setStatus(e.target.value as EmployeeStatus)} style={formFieldStyle}>
            {statuses.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Rol *</label>
          <select value={role} onChange={e => setRole(e.target.value as EmployeeRole)} style={formFieldStyle}>
            {roles.map(r => <option key={r} value={r}>{roleLabels[r]}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Teléfono (opcional)</label>
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Ej. 5555-5555" style={formFieldStyle} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>URL de foto (opcional)</label>
          <input type="text" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} placeholder="https://..." style={formFieldStyle} />
        </div>

      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={handleSave} style={{ padding: '8px 16px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Guardar</button>
        <button onClick={onCancel} style={{ padding: '8px 16px', background: '#e2e8f0', color: '#475569', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancelar</button>
      </div>
    </div>
  );
}
