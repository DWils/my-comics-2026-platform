import { useState } from 'react';
import type { SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/userApi';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await loginApi({ email, password });
            login(response);
            navigate('/');
        } catch (err) {
            setError('Email ou mot de passe incorrect');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p role="alert">{error}</p>}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Connexion...' : 'Se connecter'}
                </button>
            </form>
        </section>
    );
}

export default Login;