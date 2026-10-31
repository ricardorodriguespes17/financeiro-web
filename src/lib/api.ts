// Cliente HTTP do frontend. Todas as chamadas à API passam por aqui:
// - URL base vem de VITE_API_URL (variável de ambiente do build)
// - token JWT, quando existir, é enviado no header Authorization: Bearer

const BASE_URL = import.meta.env.VITE_API_URL;

const TOKEN_KEY = 'financeiro.token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null): void {
  if (token === null) {
    localStorage.removeItem(TOKEN_KEY);
  } else {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const headers = new Headers(options.headers);
  const token = getToken();
  if (token !== null) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return fetch(`${BASE_URL}${path}`, { ...options, headers }).then((res) => {
    // 401 com sessão existente significa token expirado ou inválido:
    // limpa a sessão e volta ao login. 401 sem token (ex.: tentativa
    // de login com credenciais erradas) fica para a tela exibir.
    if (res.status === 401 && getToken() !== null) {
      setToken(null);
      window.location.assign('/login');
    }
    return res;
  });
}
