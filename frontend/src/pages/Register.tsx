import { useState } from 'react'
import type { SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/userApi';


const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        setIsSubmitting(true);
        setError(null);

        try {
            await registerUser({ email, password, username });
            navigate('/login');
        } catch (err) {
            setError("Inscription impossible, vérifie tes informations");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="register">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p role="alert">{error}</p>}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Inscription...' : 'S\'inscrire'}
                </button>
            </form>
        </section>
    )
}

export default Register