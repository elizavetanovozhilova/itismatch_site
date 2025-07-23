import { useState } from 'react'

function Explore() {
  const [users, setUsers] = useState([])
  const [goal, setGoal] = useState('')
  const [gender, setGender] = useState('')

  const handleSearch = async () => {
    const res = await fetch('https://lzznm.app.n8n.cloud/webhook-test/60051b67-108a-4d15-8623-8c0ffa9571ce', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ goal, gender })
    })
  
    const data = await res.json()
  
    if (Array.isArray(data)) {
      setUsers(data)
    } else {
      setUsers([])
    }
  }
  

  return (
    <div style={{ padding: '2rem' }}>
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

      <div style={{ display: 'grid', gap: '1rem' }}>
        {users.length > 0 ? (
          users.map((u) => (
            <div
              key={u.user_id}
              style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}
            >
              <h3>{u.name}</h3>
              <p><strong>Группа:</strong> {u.group_name}</p>
              <p><strong>Возраст:</strong> {u.age}</p>
              <p><strong>Описание:</strong> {u.description}</p>
              <p><strong>Цель:</strong> {u.goal}</p>
              <p><strong>Пол:</strong> {u.gender === 'M' ? 'Мужской' : 'Женский'}</p>
              <p><strong>Специальность:</strong> {u.specialty}</p>
              {u.photo && typeof u.photo === 'string' && (
                <img
                  src={`https://твоя_ссылка_к_фото/${u.photo}`}
                  alt="Фото"
                  style={{ maxWidth: '200px', marginTop: '1rem' }}
                />
              )}
            </div>
          ))
        ) : (
          <p>Нет подходящих анкет</p>
        )}
      </div>
    </div>
  )
}

export default Explore
