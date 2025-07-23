import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const name = localStorage.getItem('username')
    if (!name) {
      navigate('/login')
      return
    }

    const fetchUser = async () => {
      const res = await fetch('https://lzznm.app.n8n.cloud/webhook-test/b47bad99-e009-462e-a7ee-ee69fadbc72a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
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
          photo: data.photo
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
    <div style={{ padding: '2rem' }}>
      <h2>Личный кабинет</h2>
      <p><strong>Имя:</strong> {user.name}</p>
      <p><strong>Группа:</strong> {user.group_name}</p>
      <p><strong>Возраст:</strong> {user.age}</p>
      <p><strong>Описание:</strong> {user.description}</p>
      <p><strong>Цель:</strong> {user.goal}</p>
      <p><strong>Пол:</strong> {user.gender === 'M' ? 'Мужской' : 'Женский'}</p>
      <p><strong>Специальность:</strong> {user.specialty}</p>

      {user.photo && typeof user.photo === 'string' && (
        <img
          src={user.photo.startsWith('data:') ? user.photo : `https://твоя_ссылка_к_хранению/${user.photo}`}
          alt="Фото профиля"
          style={{ maxWidth: '200px', marginTop: '1rem' }}
        />
      )}

      <button onClick={() => navigate('/')} style={{ marginTop: '2rem' }}>
        ← Назад
      </button>
    </div>
  )
}

export default Profile
