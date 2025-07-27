import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/explore.css'

function Explore() {
  const [users, setUsers] = useState([])
  const [goal, setGoal] = useState('')
  const [gender, setGender] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigate = useNavigate()
  const User = localStorage.getItem('user_id') 

  const handleSearch = async () => {
    const res = await fetch('https://lzznm.app.n8n.cloud/webhook/60051b67-108a-4d15-8623-8c0ffa9571ce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal, gender, User })
    })

    const data = await res.json()

    if (Array.isArray(data)) {
      setUsers(data)
      setCurrentIndex(0)
    } else {
      setUsers([])
    }
  }

  const handleLike = async (liked) => {
    const fromUser = localStorage.getItem('user_id') 
    const toUser = users[currentIndex].user_id

    await fetch('https://lzznm.app.n8n.cloud/webhook/b985dc6f-d0ff-4418-806e-325665291f07', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from_user_id: fromUser,
        to_user_id: toUser,
        liked
      })
    })

    setCurrentIndex(prev => prev + 1)
  }

  const currentUser = users[currentIndex]

  return (
    <div className="explore-container">
      <h2>Поиск пользователей</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <select value={goal} onChange={e => setGoal(e.target.value)}>
          <option value="">Любая цель</option>
          <option value="friendship">Дружба</option>
          <option value="relationship">Отношения</option>
          <option value="teammate">Тиммейт</option>
        </select>

        <select value={gender} onChange={e => setGender(e.target.value)}>
          <option value="">Любой пол</option>
          <option value="M">Мужчины</option>
          <option value="F">Женщины</option>
        </select>

        <button onClick={handleSearch}>Поиск</button>
      </div>

      {users.length > 0 && currentIndex < users.length ? (
        <div className="card">
          <h3>{currentUser.name}</h3>
          <p><strong>Группа:</strong> {currentUser.group_name}</p>
          <p><strong>Возраст:</strong> {currentUser.age}</p>
          <p><strong>Описание:</strong> {currentUser.description}</p>
          <p><strong>Цель:</strong> {currentUser.goal}</p>
          <p><strong>Пол:</strong> {currentUser.gender === 'M' ? 'Мужской' : 'Женский'}</p>
          <p><strong>Специальность:</strong> {currentUser.specialty}</p>
          {currentUser.photo && typeof currentUser.photo === 'string' && (
            <img
              src={`https://твоя_ссылка_к_фото/${currentUser.photo}`}
              alt="Фото"
              style={{ maxWidth: '200px', marginTop: '1rem' }}
            />
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={() => handleLike(true)}><svg width="24" height="24" viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
</svg></button>
            <button onClick={() => alert('Функция сообщений в разработке')}>💬 Сообщение</button>
            <button onClick={() => handleLike(false)}>💔</button>
          </div>
        </div>
      ) : (
        <p>Нет подходящих анкет</p>
      )}

      <button onClick={() => navigate('/')} style={{ marginTop: '2rem' }}>
        ← Назад
      </button>
    </div>
    
  )
}

export default Explore
