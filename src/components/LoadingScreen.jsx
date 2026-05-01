export default function LoadingScreen() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.spinner} />
        <h2 style={styles.title}>Analyzing your data...</h2>
        <p style={styles.subtitle}>
          Inferring schema, detecting quality issues,
          and generating AI recommendations.
        </p>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: { textAlign: 'center', padding: '2rem' },
  spinner: {
    width: 48,
    height: 48,
    border: '4px solid #e5e7eb',
    borderTop: '4px solid #4f46e5',
    borderRadius: '50%',
    margin: '0 auto 1.5rem',
    animation: 'spin 0.8s linear infinite',
  },
  title: { fontSize: 22, fontWeight: 600, marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#666', lineHeight: 1.6 },
}

// inject spinner keyframes
const style = document.createElement('style')
style.textContent = '@keyframes spin { to { transform: rotate(360deg) } }'
document.head.appendChild(style)