import React, { useState, useEffect } from 'react';
import './AdminPanel.scss';
import { useAuth } from '../AuthPage/AuthContext';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://127.0.0.1:8000/api/v1';

const TABS = [
  { id: 'News', label: 'Новости', endpoint: '/admin/news/' },
  { id: 'Courses', label: 'Курсы', endpoint: '/admin/courses/' },
  { id: 'Projects', label: 'Проекты', endpoint: '/admin/projects/' },
  { id: 'Events', label: 'События', endpoint: '/admin/events/' },
];

export default function AdminPanel() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Состояние модального окна редактирования/создания
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  
  // Поля формы
  const [formData, setFormData] = useState({
    title: '',
    digest: '',
    image_url: '',
    url: '', // Ссылка на оригинал
    isActive: true,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('access');
      const res = await fetch(`${API_BASE}${activeTab.endpoint}`, {
        headers: {
          'Authorization': `JWT ${token}`
        }
      });
      if (!res.ok) throw new Error('Ошибка при загрузке данных');
      const data = await res.json();
      setItems(data.results || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту запись?')) return;
    
    try {
      const token = localStorage.getItem('access');
      // Убираем финальный слэш, так как в Django роут Courses/<int:pk> без слэша
      const endpointBase = activeTab.endpoint.endsWith('/') ? activeTab.endpoint.slice(0, -1) : activeTab.endpoint;
      const res = await fetch(`${API_BASE}${endpointBase}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `JWT ${token}`
        }
      });
      if (!res.ok) throw new Error('Ошибка удаления');
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const openCreateModal = () => {
    setEditItem(null);
    setFormData({
      title: '',
      digest: '',
      image_url: '',
      url: '',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setFormData({
      title: item.title || '',
      digest: item.digest || '',
      image_url: item.image_url || '',
      url: item.url || item.news_site_url || item.ev_site_url || item.course_site_url || item.project_site_url || '',
      isActive: item.isActive !== undefined ? item.isActive : true,
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access');
      const method = editItem ? 'PATCH' : 'POST';
      
      const endpointBase = activeTab.endpoint.endsWith('/') ? activeTab.endpoint.slice(0, -1) : activeTab.endpoint;
      const url = editItem 
        ? `${API_BASE}${endpointBase}/${editItem.id}`
        : `${API_BASE}${activeTab.endpoint}`;

      // В зависимости от модели поле URL может называться по-разному,
      // для универсальности отправляем как есть, но бэкенд может ожидать конкретное поле
      const payload = { ...formData };
      
      // Адаптация URL под специфичные поля
      if (activeTab.id === 'News') payload.news_site_url = formData.url;
      if (activeTab.id === 'Courses') payload.course_site_url = formData.url;
      if (activeTab.id === 'Projects') payload.project_site_url = formData.url;
      if (activeTab.id === 'Events') payload.ev_site_url = formData.url;

      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `JWT ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(JSON.stringify(errData));
      }

      setIsModalOpen(false);
      fetchData(); // Обновляем список
    } catch (err) {
      alert('Ошибка при сохранении: ' + err.message);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="admin-panel">
      <h1>Панель Модерации</h1>
      
      <div className="admin-tabs">
        {TABS.map(tab => (
          <button 
            key={tab.id}
            className={`tab-btn ${activeTab.id === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="admin-actions">
        <button className="create-btn" onClick={openCreateModal}>+ Добавить запись</button>
      </div>

      {loading && <p>Загрузка...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Заголовок</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td className="title-cell">{item.title}</td>
                <td>{item.isActive ? 'Активен' : 'Скрыт'}</td>
                <td className="actions-cell">
                  <button className="edit-btn" onClick={() => openEditModal(item)}>✏️ Изменить</button>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>🗑️ Удалить</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan="4" style={{textAlign: 'center'}}>Нет данных</td></tr>
            )}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editItem ? 'Редактировать запись' : 'Новая запись'}</h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Заголовок:</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleFormChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Краткое описание (Digest):</label>
                <textarea 
                  name="digest" 
                  value={formData.digest} 
                  onChange={handleFormChange} 
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>Ссылка на картинку (URL):</label>
                <input 
                  type="text" 
                  name="image_url" 
                  value={formData.image_url} 
                  onChange={handleFormChange} 
                />
              </div>

              <div className="form-group">
                <label>Ссылка на оригинал:</label>
                <input 
                  type="text" 
                  name="url" 
                  value={formData.url} 
                  onChange={handleFormChange} 
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    name="isActive" 
                    checked={formData.isActive} 
                    onChange={handleFormChange} 
                  />
                  Показывать на сайте (Активен)
                </label>
              </div>

              <div className="modal-actions">
                <button type="submit" className="save-btn">Сохранить</button>
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Отмена</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
