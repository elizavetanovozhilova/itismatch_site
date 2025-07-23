import { useState } from 'react'
import SHA256 from 'crypto-js/sha256'
import '../styles/auth.css'
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
    password: ''
  })

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

    // Хэшируем пароль
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

    if (formData.photo) {
      form.append('photo', formData.photo)
    }

    try {
      const res = await fetch('https://lzznm.app.n8n.cloud/webhook-test/967df31d-459f-462b-b5a4-ed39bc6eabe6', {
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
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ color: 'black' }}>Регистрация</h2>
      <input name="name" placeholder="Имя" onChange={handleChange} required />
      <input name="group" placeholder="Группа" onChange={handleChange} />
      <input name="age" type="number" placeholder="Возраст" onChange={handleChange} />
      <textarea name="description" placeholder="Описание" onChange={handleChange} />
      <div>
        <p>Цель:</p>
        <button
          type="button"
          onClick={() => handleGoalClick('friendship')}
          className={formData.goal === 'friendship' ? 'selected' : ''}
        >
          Дружба
        </button>
        <button
          type="button"
          onClick={() => handleGoalClick('relationship')}
          className={formData.goal === 'relationship' ? 'selected' : ''}
        >
          Отношения
        </button>
        <button
          type="button"
          onClick={() => handleGoalClick('teammate')}
          className={formData.goal === 'teammate' ? 'selected' : ''}
        >
          Тиммейт
        </button>
      </div>
      <select name="gender" onChange={handleChange} required>
        <option value="">Пол</option>
        <option value="M">Мужской</option>
        <option value="F">Женский</option>
      </select>
      <input name="specialty" placeholder="Специальность" onChange={handleChange} />
      <input name="password" type="password" placeholder="Пароль" onChange={handleChange} required />
      <button type="submit">Зарегистрироваться</button>
    </form>
  )
}

export default Register
