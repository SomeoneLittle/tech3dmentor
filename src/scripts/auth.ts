// Тестовая «авторизация»: пока нет сервера, факт входа хранится в localStorage.
const KEY = 't3d_auth';

export const TEST_USER = { name: 'Alex Vance', email: 'alex.vance@studio-operator.io' };

export function isLoggedIn(): boolean {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

export function login(): void {
  try {
    localStorage.setItem(KEY, '1');
  } catch {}
}

export function logout(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
