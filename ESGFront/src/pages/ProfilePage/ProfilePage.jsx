import React, { useEffect, useState } from "react";
import api from "../../api";
import "./profile.scss"; 
import Avatar from '@mui/material/Avatar';

const ProfilePage = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    country: "",
    city: "",
  });

  const [original, setOriginal] = useState({}); // хранит исходные данные профиля
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("user/profile/")
      .then(res => {
        setForm(res.data);
        setOriginal(res.data);
        if (res.data.avatar) {
          setPreview(res.data.avatar);
        }
      })
      .catch(err => {
        console.error(err);
        alert("Ошибка загрузки профиля");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    let hasChanges = false;

    // добавляем только изменённые поля для PATCH
    Object.keys(form).forEach(key => {
      if (form[key] !== original[key]) {
        formData.append(key, form[key] || "");
        hasChanges = true;
      }
    });

    // добавляем аватар, если выбран новый
    if (avatar) {
      formData.append("avatar", avatar);
      hasChanges = true;
    }

    if (!hasChanges) {
      alert("Нет изменений для сохранения");
      setLoading(false);
      return;
    }

    try {
      // PATCH обновит только изменённые поля
      await api.patch("user/profile/", formData, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      });

      alert("Профиль обновлён!");
      setOriginal(form); // обновляем оригинальные данные после успешного сохранения
    } catch (err) {
      console.error(err);
      alert("Ошибка при обновлении");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    setPreview("");
    
    // сразу добавим в форму, чтобы бек понял
    setForm(prev => ({ ...prev, avatar: "" }));
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>Личный профиль</h2>
        <form onSubmit={handleSubmit} className="profile-form" encType="multipart/form-data">
          
          <div className="avatar-section">
            <label htmlFor="avatar-upload" className="avatar-wrapper">
              <Avatar
                src={preview || "/placeholder.jpg"}
                alt="avatar"
                sx={{
                  width: 120,
                  height: 120,
                  border: "3px solid white",
                  transition: "0.3s",
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              />
            </label>
            <input
              type="file"
              id="avatar-upload"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {preview && (
              <button type="button" onClick={handleRemoveAvatar} className="remove-avatar">
                Убрать аватар
              </button>
            )}
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="first_name">Имя</label>
              <input
                id="first_name"
                name="first_name"
                value={form.first_name || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="last_name">Фамилия</label>
              <input
                id="last_name"
                name="last_name"
                value={form.last_name || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email || ""}
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="form-field">
              <label htmlFor="phone_number">Телефон</label>
              <input
                id="phone_number"
                name="phone_number"
                value={form.phone_number || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="country">Страна</label>
              <input
                id="country"
                name="country"
                value={form.country || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="city">Город</label>
              <input
                id="city"
                name="city"
                value={form.city || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="save-button" disabled={loading}>
            {loading ? "Сохраняем..." : "Сохранить изменения"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
