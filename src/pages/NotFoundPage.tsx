import { useNavigate } from 'react-router-dom';
import { usePageNotFound } from '../hooks/usePageNotFound';

function NotFoundPage() {
  const navigate = useNavigate();
  usePageNotFound();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-slate-100">
      <section className="w-full max-w-xl border-l-2 border-cyan-400 pl-6 sm:pl-10">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-cyan-300">
          Mini RRHH / 404
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
          Esta página no está en el equipo.
        </h1>
        <p className="mt-4 max-w-md text-base leading-7 text-slate-400">
          La dirección que abriste no corresponde a una sección disponible. Vuelve al panel para continuar.
        </p>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="mt-8 rounded-md bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          Ir al dashboard
        </button>
      </section>
    </main>
  );
}

export default NotFoundPage;