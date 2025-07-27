import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/matches.css'
import defaultAvatar from '../assets/Itismatch.png'

function Matches() {
  const [matches, setMatches] = useState([])
  const [selectedUser, setSelectedUser] = useState(null) // Состояние для выбранного пользователя
  const [showPopup, setShowPopup] = useState(false) // Состояние для отображения попапа

  const navigate = useNavigate()
  const userId = localStorage.getItem('user_id')

  useEffect(() => {
    if (!userId) return

    fetch('https://lzznm.app.n8n.cloud/webhook/eb5fdb37-1fb8-4a17-bbe7-1098a592ec3c', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId })
    })
    .then(res => res.json())
    .then(setMatches)
  }, [userId])

  const handleLike = async (toUserId, liked) => {
    await fetch('https://lzznm.app.n8n.cloud/webhook/ae5215a8-f087-452c-b133-0f8642fd3c9f', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from_user_id: userId,
        to_user_id: toUserId,
        liked
      })
    })
  
    if (liked) {
      setMatches(prev =>
        prev.map(u =>
          u.user_id === toUserId ? { ...u, mutual: true } : u
        )
      )
    } else {
      setMatches(prev => prev.filter(u => u.user_id !== toUserId))
    }
  }

  // Функция для открытия попапа с информацией о пользователе
  const openUserPopup = (user) => {
    setSelectedUser(user)
    setShowPopup(true)
  }

  // Функция для закрытия попапа
  const closePopup = () => {
    setShowPopup(false)
  }

  return (
    <div className="matches-container">
      <h2>Мои мэтчи</h2>
      {matches.length > 0 ? matches.map(user => (
        <div key={user.user_id} className="card" onClick={() => openUserPopup(user)}>
            <h3>{user.name}</h3>
            <p>{user.description}</p>
            {user.mutual ? (
            <p><strong>Соцсети:</strong> <a className="link" href={user.social_link} target="_blank" rel="noopener noreferrer">{user.social_link}</a></p>
            ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={(e) => {
                  e.stopPropagation() // Предотвращаем всплытие события
                  handleLike(user.user_id, true)
                }}>👍</button>
                <button onClick={(e) => {
                  e.stopPropagation() // Предотвращаем всплытие события
                  handleLike(user.user_id, false)
                }}>👎</button>
            </div>
            )}
        </div>
      )) : <p>Пока нет мэтчей</p>}

      {/* Попап с информацией о пользователе */}
      {showPopup && selectedUser && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup" onClick={closePopup}>×</button>
            <h3>{selectedUser.name}</h3>
            <div className="avatar-container">
              <img
                src={
                  selectedUser.photo
                    ? (selectedUser.photo.startsWith('data:') ? selectedUser.photo : `https://твоя_ссылка_к_хранению/${selectedUser.photo}`)
                    : defaultAvatar
                }
                alt="Аватар"
                className="avatar-image"
              />
            </div>
            <p><strong>Группа:</strong> {selectedUser.group_name || '—'}</p>
            <p><strong>Возраст:</strong> {selectedUser.age || '—'}</p>
            <p><strong>Описание:</strong> {selectedUser.description || '—'}</p>
            <p><strong>Цель:</strong> {selectedUser.goal || '—'}</p>
            <p><strong>Пол:</strong> {selectedUser.gender === 'M' ? 'Мужской' : selectedUser.gender === 'F' ? 'Женский' : '—'}</p>
            <p><strong>Специальность:</strong> {selectedUser.specialty || '—'}</p>
            <p><strong>Соцсеть:</strong>{' '}
              {selectedUser.social_link
                ? <a href={`https://t.me/${selectedUser.social_link.replace('@', '')}`} className="link" target="_blank" rel="noopener noreferrer">
                    {selectedUser.social_link}
                  </a>
                : '—'}
            </p>
          </div>
        </div>
      )}

      <button onClick={() => navigate('/')}>← Назад</button>
    </div>
  )
}

export default Matches