import type { User } from '../types';

interface HeaderProps {
    user?: User;
    onLogout?: () => void;
}

function Header({ user, onLogout }: HeaderProps) {
    return (
        <header style={{
            background: '#1e40af',
            color: 'white',
            padding: '0 24px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>👥</span>
                <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>
                    Mini RRHH
                </h1>
            </div>

            {user && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    
                   
                    {onLogout && (
                        <button
                            onClick={onLogout}
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.5)',
                                color: 'white',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px',
                            }}
                        >
                            Cerrar sesión
                        </button>
                    )}
                </div>
            )}
        </header>
    );
}

export default Header;