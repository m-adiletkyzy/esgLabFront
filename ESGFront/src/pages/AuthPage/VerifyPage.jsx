import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyPage = () => {
  const { uid, token } = useParams();
  const [status, setStatus] = useState("loading"); // success | error | loading
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`http://127.0.0.1:8000/auth/users/activation/`, {
        uid,
        token,
      })
      .then(() => {
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
  }, [uid, token]);

  return (
    <div style={styles.container}>
      {status === "loading" && <p>Проверка...</p>}
      {status === "success" && (
        <>
          <h2>🎉 Аккаунт подтверждён!</h2>
          <p>Теперь вы можете войти в систему.</p>
          <button onClick={() => navigate("/auth")} style={styles.button}>Перейти к входу</button>
        </>
      )}
      {status === "error" && (
        <>
          <h2>❌ Ошибка подтверждения</h2>
          <p>Ссылка может быть устаревшей или уже использованной.</p>
        </>
      )}
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

export default VerifyPage;
