import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.scss';
import { useAuth } from './AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    re_password: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const endpoint = isLogin ? '/auth/jwt/create/' : '/auth/users/';
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          login(data.access, data.refresh); // 👈 глобальная авторизация
          navigate('/');
        } else {
          navigate('/verify-email');
        }
      } else {
        let msg = data.detail || 'Ошибка';
        if (typeof data === 'object') {
          msg = Object.values(data).flat().join(' ');
        }
        setError(msg);
      }
    } catch (err) {
      setError('Ошибка сети. Повторите попытку.');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label>Имя пользователя</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Пароль</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label>Подтвердите пароль</label>
            <input
              type="re_password"
              name="re_password"
              value={formData.re_password}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <button type="submit" className="submit-btn">
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
      <p className="toggle-auth">
        {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Зарегистрироваться' : 'Войти'}
        </span>
      </p>
    </div>
  );
}
