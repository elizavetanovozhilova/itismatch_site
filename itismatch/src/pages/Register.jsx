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
  const [isCheckingName, setIsCheckingName] = useState(false)
  const [isNameAvailable, setIsNameAvailable] = useState(true)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    // Проверка уникальности имени при изменении
    if (name === 'name' && value.trim()) {
      checkNameAvailability(value)
    }
  }

  // Функция проверки доступности имени
  const checkNameAvailability = async (name) => {
    setIsCheckingName(true)
    try {
      const res = await fetch('https://lzznm.app.n8n.cloud/webhook/e5ac2cc4-2a35-4185-a854-a69550de400a', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      })
      const data = await res.json()
      // Инвертируем значение, так как сервер возвращает false если имя занято
      setIsNameAvailable(data) // если data === false (имя занято), то isNameAvailable = false
    } catch (error) {
      console.error('Ошибка проверки имени:', error)
      // В случае ошибки предполагаем, что имя недоступно, чтобы не пропустить дубликаты
      setIsNameAvailable(false)
    } finally {
      setIsCheckingName(false)
    }
  }

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] })
  }

  const handleGoalClick = (goal) => {
    setFormData({ ...formData, goal })
  }

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
    
    if (isNameAvailable) {
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
        const errorData = await res.json()
        setError(errorData.message || 'Ошибка при регистрации')
      }
    } catch (error) {
      console.error('Ошибка отправки формы:', error)
      setError('Ошибка при отправке данных')
    }
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Регистрация</h2>
        
        {/* Поле имени с индикатором проверки */}
        <div className="input-with-status">
          <input 
            name="name" 
            placeholder="Имя" 
            onChange={handleChange} 
            required 
          />
          {isCheckingName && <span className="checking-indicator">Проверка...</span>}
          {!isCheckingName && isNameAvailable && formData.name.trim() && (
            <span className="name-taken">Имя занято</span>
          )}
          {!isCheckingName && !isNameAvailable && formData.name.trim() && (
            <span className="name-available">Имя свободно</span>
          )}
        </div>
        
        <input 
          name="group" 
          placeholder="Группа (формат: 11-X11, где X от 1 до 4)" 
          onChange={handleChange} 
        />
        
        <input name="age" type="number" placeholder="Возраст" onChange={handleChange} />
        <textarea name="description" placeholder="Описание" onChange={handleChange} />
        <input name="social_link" placeholder="tg (например, @yourtg)" onChange={handleChange} />
        
        <div className="goal-selection">
          <p style={{width: '100%', textAlign: 'center', marginBottom: '0.5em'}}>Цель:</p>
          <div style={{color: 'gray', fontSize: '0.9em', marginBottom: '0.5em', width: '100%', textAlign: 'center'}}>
            Текущее значение: {formData.goal || 'не выбрано'}
          </div>
          <div className="goal-buttons-row">
            <button type="button" onClick={() => handleGoalClick('friendship')} className={formData.goal === 'friendship' ? 'selected' : ''}>Дружба</button>
            <button type="button" onClick={() => handleGoalClick('relationship')} className={formData.goal === 'relationship' ? 'selected' : ''}>Отношения</button>
            <button type="button" onClick={() => handleGoalClick('teammate')} className={formData.goal === 'teammate' ? 'selected' : ''}>Команда</button>
          </div>
        </div>
        
        <select name="gender" onChange={handleChange} required>
          <option value="">Пол</option>
          <option value="M">Мужской</option>
          <option value="F">Женский</option>
        </select>
        
        <input name="specialty" placeholder="Специальность" onChange={handleChange} />
        <input name="password" type="password" placeholder="Пароль (мин. 3 символа)" onChange={handleChange} required />
        
        {error && <div className="error-message">{error}</div>}
        
        <button 
          type="submit" 
          disabled={isCheckingName || (isNameAvailable && formData.name.trim())}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  )
}

export default Register