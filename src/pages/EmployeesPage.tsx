import Modal from '../components/Modal';
import EmployeeForm from '../components/EmployeeForm';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Employee, Department, EmployeeStatus } from '../types';
import { mockEmployees } from '../utils/mockData';
import EmployeeCard from '../components/EmployeeCard';
import StatsBadge from '../components/StatsBadge';
import FormField from '../components/FormField';

const formFieldClass = 'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';

function EmployeesPage() {
  // Estado de la lista completa (simulando datos del servidor)
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Estado de los filtros
  const [search, setSearch] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | ''>('');
  const [selectedStatus, setSelectedStatus] = useState<EmployeeStatus | ''>('');

  // Estado del modal de alta
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
    alert(`Empleado: ${employee.name}\nCargo: ${employee.position}\nDepartamento: ${employee.department}`);
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
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Encabezado */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gestión de Empleados</h2>
          <p className="text-slate-500 mt-1">
            {filteredEmployees.length} de {employees.length} empleados
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-brand-800 hover:bg-brand-700 text-white
                    rounded-lg text-sm font-medium transition-colors"
        >
          + Agregar empleado
        </button>
      </div>

      {/* Estadísticas */}
      <div className="flex flex-wrap gap-4 mb-6">
        <StatsBadge label="Total de empleados" value={totalEmployees} variant="blue" />
        <StatsBadge label="Empleados activos" value={activeEmployees} variant="green" />
        <StatsBadge label="Empleados en permiso" value={onLeaveEmployees} variant="yellow" />
        <StatsBadge label="Empleados inactivos" value={inactiveEmployees} variant="red" />
      </div>

      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <EmployeeForm onSave={handleAddEmployeeFromForm} onCancel={() => setShowForm(false)} />
        </Modal>
      )}

      {/* Barra de filtros */}
      <div className="flex flex-wrap items-end gap-4 mb-6 p-4
                      bg-white rounded-lg border border-slate-200">
        {/* Búsqueda por texto */}
        <FormField label="Buscar" className="flex-1 min-w-[220px]">
          <input
            type="text"
            placeholder="Buscar por nombre, email o cargo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={formFieldClass}
          />
        </FormField>

        {/* Filtro por departamento */}
        <FormField label="Departamento" className="min-w-[180px]">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value as Department | '')}
            className={formFieldClass}
          >
            <option value="">Todos los departamentos</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </FormField>

        {/* Filtro por estado */}
        <FormField label="Estado" className="min-w-[160px]">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as EmployeeStatus | '')}
            className={formFieldClass}
          >
            <option value="">Todos los estados</option>
            {statuses.map(status => (
              <option key={status} value={status}>{statusLabels[status]}</option>
            ))}
          </select>
        </FormField>

        {/* Botón limpiar filtros */}
        {(search || selectedDepartment || selectedStatus) && (
          <button
            onClick={() => { setSearch(''); setSelectedDepartment(''); setSelectedStatus(''); }}
            className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600
                      rounded-lg text-sm transition-colors"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Estado de carga */}
      {loading && (
        <div className="text-center py-12 text-slate-500">
          <p>Cargando empleados...</p>
        </div>
      )}

      {/* Sin resultados */}
      {!loading && filteredEmployees.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p>No se encontraron empleados con los filtros aplicados.</p>
        </div>
      )}

      {/* Lista de empleados */}
      {!loading && filteredEmployees.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                        xl:grid-cols-4 gap-4">
          {filteredEmployees.map(employee => (
            <div key={employee.id} className="relative">
              <button
                onClick={() => handleDeleteEmployee(employee.id)}
                aria-label="Eliminar empleado"
                title="Eliminar empleado"
                className="absolute -top-2.5 -right-2.5 z-10 w-6 h-6
                          rounded-full border-2 border-white bg-red-500
                          text-white cursor-pointer text-sm leading-5
                          shadow-md"
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