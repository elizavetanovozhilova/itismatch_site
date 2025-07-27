import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import defaultAvatar from '../assets/itismatch.png'
import { useRef } from 'react'
import '../styles/profile.css'


function Profile() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const fileInputRef = useRef()

  const handleAvatarClick = () => {
    fileInputRef.current.click()
  }

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const form = new FormData()
    form.append('user_id', localStorage.getItem('user_id'))
    form.append('photo', file)

    const res = await fetch('https://lzznm.app.n8n.cloud/webhook-test/e05eceaf-6c6b-426d-b897-047f03bfae77', {
      method: 'POST',
      body: form
    })

    if (res.ok) {
  
      window.location.reload()
    } else {
      alert('Ошибка при загрузке фотографии')
    }
  }

  useEffect(() => {
    const name = localStorage.getItem('username')
    if (!name) {
      navigate('/login')
      return
    }

    const fetchUser = async () => {
      const res = await fetch('https://lzznm.app.n8n.cloud/webhook/b47bad99-e009-462e-a7ee-ee69fadbc72a', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      })

      const data = await res.json()
      if (data.success) {
        setUser({
          name: data.name,
          age: data.age,
          goal: data.goal,
          gender: data.gender,
          specialty: data.specialty,
          group_name: data.group_name,
          description: data.description,
          photo: data.photo,
          social_link: data.social_link || ''
        })
      } else {
        alert('Пользователь не найден')
        navigate('/login')
      }
    }

    fetchUser()
  }, [navigate])

  if (!user) return <p>Загрузка...</p>

  return (
    <div className="profile-container">
      <h2>Личный кабинет</h2>
      <div className="avatar-container" onClick={handleAvatarClick}>
        <img
          src={
            user.photo
              ? (user.photo.startsWith('data:') ? user.photo : `https://твоя_ссылка_к_хранению/${user.photo}`)
              : defaultAvatar
          }
          alt="Аватар"
          className="avatar-image"
        />
        <div className="avatar-overlay">📷</div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handlePhotoChange}
        />
      </div>
      <p><strong>Имя:</strong> {user.name}</p>
      <p><strong>Группа:</strong> {user.group_name}</p>
      <p><strong>Возраст:</strong> {user.age}</p>
      <p><strong>Описание:</strong> {user.description}</p>
      <p><strong>Цель:</strong> {user.goal}</p>
      <p><strong>Пол:</strong> {user.gender === 'M' ? 'Мужской' : 'Женский'}</p>
      <p><strong>Специальность:</strong> {user.specialty}</p>
      <p><strong>Соцсеть:</strong>{' '}
        {user.social_link
          ? <a href={`https://t.me/${user.social_link.replace('@', '')}`} className="link" target="_blank" rel="noopener noreferrer">
              {user.social_link}
            </a>
          : '—'}
      </p>




      <button onClick={() => navigate('/')}>← Назад</button>
      <button onClick={() => navigate('/edit-profile')} style={{marginTop: '1rem'}}>Редактировать профиль</button>
    </div>
  )
}

export default Profile
