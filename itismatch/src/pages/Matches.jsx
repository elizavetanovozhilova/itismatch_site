import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Matches() {
  const [matches, setMatches] = useState([])

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

  

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Мои мэтчи</h2>
      {matches.length > 0 ? matches.map(user => (
        <div key={user.user_id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3>{user.name}</h3>
            <p>{user.description}</p>
            {user.mutual ? (
            <p><strong>Соцсети:</strong> <a href={user.social_link} target="_blank">{user.social_link}</a></p>
            ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => handleLike(user.user_id, true)}>👍</button>
                <button onClick={() => handleLike(user.user_id, false)}>👎</button>
            </div>
            )}
        </div>

      )) : <p>Пока нет мэтчей</p>}
      <button onClick={() => navigate('/')} style={{ marginTop: '2rem' }}>
        ← Назад
      </button>
      
    </div>
  )
}
export default Matches
