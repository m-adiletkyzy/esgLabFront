import React from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyNotice = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>📧 Подтвердите вашу почту</h2>
      <p>На указанный email была отправлена ссылка для подтверждения.</p>
      <p>Проверьте почту и перейдите по ссылке, чтобы активировать аккаунт.</p>
      <button style={styles.button} onClick={() => navigate("/auth")}>
        Вернуться ко входу
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
    fontFamily: 'sans-serif'
  },
  button: {
    marginTop: '20px',
    padding: '10px 24px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#005151',
    color: 'white',
    border: 'none',
    borderRadius: '8px'
  }
};

export default VerifyNotice;
