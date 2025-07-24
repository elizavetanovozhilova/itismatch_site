import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/register.css'

function EditProfile() {
  const [formData, setFormData] = useState({
    name: '',
    group: '',
    age: '',
    description: '',
    goal: '',
    gender: '',
    specialty: '',
    social_link: '',
  })
  const navigate = useNavigate()
  const [error, setError] = useState('')

  useEffect(() => {
    // Заполнить форму текущими данными пользователя из localStorage или API
    const name = localStorage.getItem('username')
    if (!name) {
      navigate('/login')
      return
    }
    // Здесь можно добавить fetch для получения данных профиля с сервера
    setFormData(prev => ({ ...prev, name }))
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleGoalClick = (goal) => {
    setFormData({ ...formData, goal })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!formData.name.trim()) {
      setError('Введите имя')
      return
    }
    if (!formData.gender) {
      setError('Выберите пол')
      return
    }
    if (formData.age && (+formData.age <= 0 || isNaN(+formData.age))) {
      setError('Возраст должен быть положительным числом')
      return
    }
    if (formData.social_link) {
      const tg = formData.social_link.trim()
      if (!/^@[a-zA-Z0-9_]{5,}$/.test(tg)) {
        setError('Введите корректный ник в Telegram: только латиница, цифры, подчёркивание, минимум 5 символов после @')
        return
      }
    }
    // Здесь должен быть запрос на обновление профиля
    alert('Профиль обновлён!')
    navigate('/profile')
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Редактировать профиль</h2>
        <input name="name" placeholder="Имя" value={formData.name} onChange={handleChange} required />
        <input name="group" placeholder="Группа" value={formData.group} onChange={handleChange} />
        <input name="age" type="number" placeholder="Возраст" value={formData.age} onChange={handleChange} />
        <textarea name="description" placeholder="Описание" value={formData.description} onChange={handleChange} />
        <input name="social_link" placeholder="tg (например, @yourtg)" value={formData.social_link} onChange={handleChange} />
        <div className="goal-selection">
          <p>Цель:</p>
          <button type="button" onClick={() => handleGoalClick('friendship')} className={formData.goal === 'friendship' ? 'selected' : ''}>Дружба</button>
          <button type="button" onClick={() => handleGoalClick('relationship')} className={formData.goal === 'relationship' ? 'selected' : ''}>Отношения</button>
          <button type="button" onClick={() => handleGoalClick('teammate')} className={formData.goal === 'teammate' ? 'selected' : ''}>Тиммейт</button>
        </div>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Пол</option>
          <option value="M">Мужской</option>
          <option value="F">Женский</option>
        </select>
        <input name="specialty" placeholder="Специальность" value={formData.specialty} onChange={handleChange} />
        {error && <div style={{color: 'red', marginBottom: '0.5rem'}}>{error}</div>}
        <button type="submit">Сохранить</button>
      </form>
    </div>
  )
}

export default EditProfile 