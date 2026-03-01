import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/auth/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.msg || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md space-y-8 glass p-8 rounded-2xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Create Account</h2>
                    <p className="mt-2 text-muted-foreground">Join Test-My-Api and start testing</p>
                </div>
                {error && <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm text-center">{error}</div>}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                required
                                className="w-full bg-secondary/50 border border-border rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                className="w-full bg-secondary/50 border border-border rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                className="w-full bg-secondary/50 border border-border rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Sign Up'}
                        {!loading && <ArrowRight className="h-5 w-5" />}
                    </button>
                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Log in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
