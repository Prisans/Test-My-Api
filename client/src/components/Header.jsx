import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, LogOut, User } from 'lucide-react';

const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <header className="h-14 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="bg-primary p-1.5 rounded-lg">
                    <Send className="h-5 w-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                    Test-My-Api
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{user.name}</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
};

export default Header;
