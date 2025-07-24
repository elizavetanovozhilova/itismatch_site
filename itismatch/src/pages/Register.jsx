import { useState } from 'react'
import SHA256 from 'crypto-js/sha256'
import '../styles/register.css'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    group: '',
    age: '',
    description: '',
    photo: null,
    goal: '',
    gender: '',
    specialty: '',
    social_link: '',
    password: ''
  })

  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] })
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
    if (!formData.password || formData.password.length < 3) {
      setError('Пароль должен быть не менее 3 символов')
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

    const hashedPassword = SHA256(formData.password).toString()

    const form = new FormData()
    form.append('name', formData.name)
    form.append('group', formData.group)
    form.append('age', formData.age)
    form.append('description', formData.description)
    form.append('goal', formData.goal)
    form.append('gender', formData.gender)
    form.append('specialty', formData.specialty)
    form.append('password', hashedPassword)
    form.append('social_link', formData.social_link)

    if (formData.photo) {
      form.append('photo', formData.photo)
    }

    try {
      const res = await fetch('https://lzznm.app.n8n.cloud/webhook/967df31d-459f-462b-b5a4-ed39bc6eabe6', {
        method: 'POST',
        body: form,
      })

      if (res.ok) {
        navigate('/login')
      } else {
        alert('Ошибка при регистрации')
      }
    } catch (error) {
      console.error('Ошибка отправки формы:', error)
      alert('Ошибка при отправке данных')
    }
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Регистрация</h2>
        <input name="name" placeholder="Имя" onChange={handleChange} required />
        <input name="group" placeholder="Группа" onChange={handleChange} />
        <input name="age" type="number" placeholder="Возраст" onChange={handleChange} />
        <textarea name="description" placeholder="Описание" onChange={handleChange} />
        <input name="social_link" placeholder="tg (например, @yourtg)" onChange={handleChange} />
        <div className="goal-selection">
          <p style={{width: '100%', textAlign: 'center', marginBottom: '0.5em'}}>Цель:</p>
          <div style={{color: 'gray', fontSize: '0.9em', marginBottom: '0.5em', width: '100%', textAlign: 'center'}}>Текущее значение: {formData.goal}</div>
          <div className="goal-buttons-row">
            <button type="button" onClick={() => handleGoalClick('Дружба')} className={formData.goal === 'Дружба' ? 'selected' : ''}>Дружба</button>
            <button type="button" onClick={() => handleGoalClick('Отношения')} className={formData.goal === 'Отношения' ? 'selected' : ''}>Отношения</button>
            <button type="button" onClick={() => handleGoalClick('Команда')} className={formData.goal === 'Команда' ? 'selected' : ''}>Команда</button>
          </div>
        </div>
        <select name="gender" onChange={handleChange} required>
          <option value="">Пол</option>
          <option value="M">Мужской</option>
          <option value="F">Женский</option>
        </select>
        <input name="specialty" placeholder="Специальность" onChange={handleChange} />
        <input name="password" type="password" placeholder="Пароль" onChange={handleChange} required />
        {error && <div style={{color: 'red', marginBottom: '0.5rem'}}>{error}</div>}
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  )
}

export default Register
