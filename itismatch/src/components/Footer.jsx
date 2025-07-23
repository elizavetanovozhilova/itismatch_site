function Footer() {
    return (
      <footer style={{
        textAlign: 'center',
        padding: '1rem',
        marginTop: '2rem',
        borderTop: '1px solid #ccc',
        color: '#666'
      }}>
        <p>© {new Date().getFullYear()} ItIs Match — Платформа для знакомств и поиска тиммейтов</p>
      </footer>
    )
  }
  
  export default Footer
  