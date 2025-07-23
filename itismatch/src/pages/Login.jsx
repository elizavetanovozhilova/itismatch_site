import { useState } from 'react'
import '../styles/auth.css'
import SHA256 from 'crypto-js/sha256'
import { useNavigate } from 'react-router-dom'


function Login() {
  const [formData, setFormData] = useState({ name: '', password: '' })
  const navigate = useNavigate() 

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const hashedPassword = SHA256(formData.password).toString()
  
    const body = {
      name: formData.name,
      password: hashedPassword
    }
  
    const res = await fetch('https://lzznm.app.n8n.cloud/webhook-test/0a78e9fd-7880-4a66-859b-0700529534bd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
  
    const data = await res.json()
  
    if (data.success) {
      localStorage.setItem('username', data.name)
      navigate('/')
    } else {
      alert('Неверные данные')
    }
    
  }
  



  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{color: 'black'}}>Вход</h2>
      <input name="name" placeholder="Имя" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Пароль" onChange={handleChange} required />
      <button type="submit">Войти</button>
    </form>
  )
}
export default Login