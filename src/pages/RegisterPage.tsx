import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../lib/api';

interface ApiErrorBody {
  error?: { code?: string; message?: string };
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErro(null);
    setEnviando(true);
    try {
      const res = await apiFetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.status === 201) {
        navigate('/login');
        return;
      }
      const body = (await res.json().catch(() => null)) as ApiErrorBody | null;
      setErro(body?.error?.message ?? `Falha no cadastro (HTTP ${res.status}).`);
    } catch {
      setErro('Não foi possível conectar à API. Verifique se o backend está rodando.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main>
      <h1>Cadastrar</h1>
      {erro !== null && <p role="alert">{erro}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label>
          Senha
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </label>
        <button type="submit" disabled={enviando}>
          {enviando ? 'Cadastrando…' : 'Cadastrar'}
        </button>
      </form>
      <p>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </main>
  );
}
