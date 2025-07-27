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
    const name = localStorage.getItem('username')
    if (!name) {
      navigate('/login')
      return
    }

    const fetchUser = async () => {
      const res = await fetch('https://lzznm.app.n8n.cloud/webhook/0c2ca153-78f9-4a75-a056-b54dd519a29e', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      })

      const data = await res.json()
      if (data.success) {
        setFormData({
          name: data.name || '',
          age: data.age || '',
          goal: data.goal || '',
          gender: data.gender || '',
          specialty: data.specialty || '',
          group: data.group_name || '', 
          description: data.description || '', 
          photo: data.photo || '',
          social_link: data.social_link || ''
        })
        
      } else {
        alert('Пользователь не найден')
        navigate('/login')
      }
    }

    fetchUser()
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

    // Валидация номера группы
  const validateGroup = (group) => {
    if (!group) return true // Разрешаем пустое значение
    const regex = /^11-[1-4]11$/
    return regex.test(group)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Валидация имени
    if (!formData.name.trim()) {
      setError('Введите имя')
      return
    }
    
    if (!isNameAvailable) {
      setError('Это имя уже занято, выберите другое')
      return
    }

    // Валидация пароля
    if (!formData.password || formData.password.length < 3) {
      setError('Пароль должен быть не менее 3 символов')
      return
    }

    // Валидация пола
    if (!formData.gender) {
      setError('Выберите пол')
      return
    }

    // Валидация возраста
    if (formData.age && (+formData.age <= 0 || isNaN(+formData.age))) {
      setError('Возраст должен быть положительным числом')
      return
    }

    // Валидация группы
    if (formData.group && !validateGroup(formData.group)) {
      setError('Номер группы должен быть в формате 11-X11, где X - цифра от 1 до 4')
      return
    }

    // Валидация Telegram
    if (formData.social_link) {
      const tg = formData.social_link.trim()
      if (!/^@[a-zA-Z0-9_]{5,}$/.test(tg)) {
        setError('Введите корректный ник в Telegram: только латиница, цифры, подчёркивание, минимум 5 символов после @')
        return
      }
    }

    // Валидация цели
    if (!formData.goal) {
      setError('Выберите цель')
      return
    }}

    const res = await fetch('https://lzznm.app.n8n.cloud/webhook/791e5ec4-1cc7-439a-ab41-856c50cc70cf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (res.ok) {
      alert('Профиль обновлён!')
      navigate('/profile')
    } else {
      setError('Не удалось сохранить профиль')
    }
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
