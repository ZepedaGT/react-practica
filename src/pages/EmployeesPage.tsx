import Modal from '../components/Modal';
import EmployeeForm from '../components/EmployeeForm';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Employee, Department, EmployeeStatus } from '../types';
import { mockEmployees } from '../utils/mockData';
import EmployeeCard from '../components/EmployeeCard';
import StatsBadge from '../components/StatsBadge';

function EmployeesPage() {
  // Estado de la lista completa (simulando datos del servidor)
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Estado de los filtros
  const [search, setSearch] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | ''>('');
  const [selectedStatus, setSelectedStatus] = useState<EmployeeStatus | ''>('');

 // Añade este estado al inicio del componente:
const [showForm, setShowForm] = useState<boolean>(false);

// Simular carga de datos (en clases siguientes conectaremos la API real)
useEffect(() => {
const timer = setTimeout(() => {
setEmployees(mockEmployees);
setLoading(false);
}, 800); // Simula latencia de red
return () => clearTimeout(timer); // Cleanup: cancelar si el componente se desmonta
}, []);

// Filtrar empleados según los criterios activos
const filteredEmployees = employees.filter(emp => {
const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) ||
emp.email.toLowerCase().includes(search.toLowerCase()) ||
emp.position.toLowerCase().includes(search.toLowerCase());
const matchesDepartment = !selectedDepartment || emp.department === selectedDepartment;
const matchesStatus = !selectedStatus || emp.status === selectedStatus;
return matchesSearch && matchesDepartment && matchesStatus;
});

// Estadísticas generales (sobre el total de empleados, no sobre el filtro activo)
const totalEmployees = employees.length;
const activeEmployees = employees.filter(emp => emp.status === 'active').length;
const onLeaveEmployees = employees.filter(emp => emp.status === 'on_leave').length;
const inactiveEmployees = employees.filter(emp => emp.status === 'inactive').length;

// Memoizamos el handler para no recrearlo en cada render
const handleSelectEmployee = useCallback((employee: Employee) => {
alert(`Empleado: ${employee.name}\nCargo: ${employee.position}\nDepartamento:
${employee.department}`);
}, []);
const handleDeleteEmployee = useCallback((id: number) => {
if (!confirm('¿Estás seguro de eliminar este empleado?')) return;
setEmployees(prev => prev.filter(emp => emp.id !== id));
}, []);

// Handler para agregar empleado
const navigate = useNavigate();

const handleAddEmployeeFromForm = useCallback((data: Omit<Employee, 'id'>) => {
  const newEmployee: Employee = { id: Date.now(), ...data };
  setEmployees(prev => [...prev, newEmployee]);
  setShowForm(false);
  navigate('/empleados');
}, [navigate]);

const departments: Department[] = ['Tecnología', 'Recursos Humanos', 'Finanzas', 'Operaciones', 'Ventas'];
const statuses: EmployeeStatus[] = ['active', 'inactive', 'on_leave'];
const statusLabels: Record<EmployeeStatus, string> = {
active: 'Activo',
inactive: 'Inactivo',
on_leave: 'En permiso',
};


return (
<div style={{ padding: '24px' }}>
{/* Encabezado */}
<div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
<div>
<h2 style={{ margin: 0, color: '#1e293b' }}>Gestión de Empleados</h2>
<p style={{ margin: '4px 0 0', color: '#64748b' }}>
{filteredEmployees.length} de {employees.length} empleados
</p>
</div>
<button
onClick={() => setShowForm(!showForm)}
style={{
padding: '8px 16px', background: '#1e40af', color: 'white',
border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px'
}}
>
+ Agregar empleado
</button>
</div>

{/* Estadísticas */}
<div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
<StatsBadge label="Total de empleados" value={totalEmployees} color="#2563eb" />
<StatsBadge label="Empleados activos" value={activeEmployees} color="#16a34a" />
<StatsBadge label="Empleados en permiso" value={onLeaveEmployees} color="#ca8a04" />
<StatsBadge label="Empleados inactivos" value={inactiveEmployees} color="#d44444" />
</div>

{showForm && (
  <Modal onClose={() => setShowForm(false)}>
    <EmployeeForm onSave={handleAddEmployeeFromForm} onCancel={() => setShowForm(false)} />
  </Modal>
)}

{/* Barra de filtros */}
<div style={{
display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end',
marginBottom: '24px', padding: '16px',
background: 'white', borderRadius: '8px',
border: '1px solid #e2e8f0'
}}>
{/* Búsqueda por texto */}
<div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: '1', minWidth: '220px' }}>
<label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Buscar</label>
<input
type="text"
placeholder="Buscar por nombre, email o cargo..."
value={search}
onChange={(e) => setSearch(e.target.value)}
style={{
padding: '8px 12px', border: '1px solid #cbd5e1',
borderRadius: '6px', fontSize: '14px', color: '#1e293b', background: 'white'
}}
/>
</div>

{/* Filtro por departamento */}
<div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '180px' }}>
<label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Departamento</label>
<select
value={selectedDepartment}
onChange={(e) => setSelectedDepartment(e.target.value as Department | '')}
style={{
padding: '8px 12px', border: '1px solid #cbd5e1',
borderRadius: '6px', fontSize: '14px', color: '#1e293b', background: 'white'
}}
>
<option value="">Todos los departamentos</option>
{departments.map(dept => (
<option key={dept} value={dept}>{dept}</option>
))}
</select>
</div>

{/* Filtro por estado */}
<div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '160px' }}>
<label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Estado</label>
<select
value={selectedStatus}
onChange={(e) => setSelectedStatus(e.target.value as EmployeeStatus | '')}
style={{
padding: '8px 12px', border: '1px solid #cbd5e1',
borderRadius: '6px', fontSize: '14px', color: '#1e293b', background: 'white'
}}
>
<option value="">Todos los estados</option>
{statuses.map(status => (
<option key={status} value={status}>{statusLabels[status]}</option>
))}
</select>
</div>

{/* Botón limpiar filtros */}
{(search || selectedDepartment || selectedStatus) && (
<button
onClick={() => { setSearch(''); setSelectedDepartment(''); setSelectedStatus(''); }}
style={{
padding: '8px 12px', background: '#fee2e2', color: '#dc2626',
border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px'
}}
>
Limpiar filtros
</button>
)}
</div>

{/* Estado de carga */}
{loading && (
<div style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>
<p>Cargando empleados...</p>
</div>
)}
{/* Sin resultados */}
{!loading && filteredEmployees.length === 0 && (
<div style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>
<p>No se encontraron empleados con los filtros aplicados.</p>
</div>
)}

{/* Lista de empleados */}
{!loading && filteredEmployees.length > 0 && (
<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
{filteredEmployees.map(employee => (
<div key={employee.id} style={{ position: 'relative' }}>
<button
onClick={() => handleDeleteEmployee(employee.id)}
aria-label="Eliminar empleado"
title="Eliminar empleado"
style={{
position: 'absolute', top: '-10px', right: '-10px', zIndex: 1,
width: '24px', height: '24px', borderRadius: '50%',
border: '2px solid white', background: '#ef4444', color: 'white',
cursor: 'pointer', fontSize: '14px', lineHeight: '20px',
boxShadow: '0 1px 3px rgba(0,0,0,0.25)'
}}
>
×
</button>

<EmployeeCard
employee={employee}
onSelect={handleSelectEmployee}
/>
</div>
))}
</div>
)}
</div>
);
}

export default EmployeesPage;