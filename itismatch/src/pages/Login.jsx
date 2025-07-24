import { useState } from 'react'
import '../styles/auth.css'
import SHA256 from 'crypto-js/sha256'
import { useNavigate } from 'react-router-dom'


function Login() {
  const [formData, setFormData] = useState({ name: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate() 

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
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
  
    const hashedPassword = SHA256(formData.password).toString()
  
    const body = {
      name: formData.name,
      password: hashedPassword
    }
  
    const res = await fetch('https://lzznm.app.n8n.cloud/webhook/0a78e9fd-7880-4a66-859b-0700529534bd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
  
    const data = await res.json()
  
    if (data.success) {
      localStorage.setItem('username', data.name)
      localStorage.setItem('user_id', data.user_id) 
      navigate('/')
  
    } else {
      alert('Неверные данные')
    }
    
  }
  



  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Вход</h2>
        <input name="name" placeholder="Имя" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Пароль" onChange={handleChange} required />
        {error && <div style={{color: 'red', marginBottom: '0.5rem'}}>{error}</div>}
        <button type="submit">Войти</button>
      </form>
      <button onClick={() => navigate('/register')} style={{marginTop: '1rem', background: 'transparent', color: 'var(--primary)', textDecoration: 'underline', boxShadow: 'none'}}>Не зарегистрированы? Зарегистрироваться</button>
    </div>
  )
}
export default Login