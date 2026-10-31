import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

interface HealthResponse {
  status: string;
}

type Estado =
  | { situacao: 'carregando' }
  | { situacao: 'sucesso'; status: string }
  | { situacao: 'erro'; detalhe: string };

export default function HealthPage() {
  const [estado, setEstado] = useState<Estado>({ situacao: 'carregando' });

  useEffect(() => {
    apiFetch('/health')
      .then(async (res) => {
        if (res.status !== 200) {
          throw new Error(`HTTP ${res.status}`);
        }
        const body = (await res.json()) as HealthResponse;
        setEstado({ situacao: 'sucesso', status: body.status });
      })
      .catch((erro: unknown) => {
        setEstado({ situacao: 'erro', detalhe: String(erro) });
      });
  }, []);

  return (
    <main>
      <h1>Gestor Financeiro</h1>
      <p>Tela de verificação da tarefa 5.1 (setup) — consome /health da API.</p>
      {estado.situacao === 'carregando' && <p>Consultando a API…</p>}
      {estado.situacao === 'sucesso' && (
        <p>
          /health OK — API respondeu: {estado.status}
        </p>
      )}
      {estado.situacao === 'erro' && (
        <p role="alert">
          Falha ao consultar /health da API. Verifique se o backend está rodando. ({estado.detalhe})
        </p>
      )}
    </main>
  );
}
