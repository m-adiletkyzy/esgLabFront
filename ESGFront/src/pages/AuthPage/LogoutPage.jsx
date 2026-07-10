import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import './AuthPage.scss'

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleConfirm = () => {
    logout();
    navigate('/');
  };

  return (
    <section className='logout-section'>
      <div className="logout-confirm">
        <div className='txt-group'>
          <h2>Вы уверены, что хотите выйти?</h2>
        </div>
        <div className="btn-group">
          <button className="logout-btn" onClick={handleConfirm}>Да</button>
          <button className="logout-btn2" onClick={() => navigate(-1)}>Отмена</button>
        </div>
      </div>
    </section>
  );
};

export default LogoutPage;
