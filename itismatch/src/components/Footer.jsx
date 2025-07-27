function Footer() {
    return (
      <footer style={{
        width: '100vw',
        padding: '1.5rem',
        backgroundColor: '#d6d6d6',
        color: '#ecf0f1',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #d6d6d6',
        boxSizing: 'border-box'
      }}>
        <div style={{ textAlign: 'left' }}>
          <p style={{ margin: 0, fontWeight: '500' }}>
            © {new Date().getFullYear()} ItIs Match
          </p>
          <p style={{ margin: '0.5rem 0 0', color: '#ffffff', fontSize: '0.9rem' }}>
            Платформа для знакомств и поиска тиммейтов
          </p>
        </div>
  
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <p>Новожилова Елизавета  <a 
              href="https://t.me/lzznm" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: '#3498db',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#1abc9c'}
              onMouseOut={(e) => e.currentTarget.style.color = '#3498db'}
            >
              @lzznm
            </a></p>
            <p>Газизова Амина  <a 
              href="https://t.me/fliwoll" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: '#3498db',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#1abc9c'}
              onMouseOut={(e) => e.currentTarget.style.color = '#3498db'}
            >
               @fliwoll
            </a></p>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;