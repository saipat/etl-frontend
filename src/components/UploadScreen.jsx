import { useState, useRef } from 'react'

export default function UploadScreen({ onUpload, error }) {
  const [dragging, setDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const inputRef = useRef()

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) setSelectedFile(file)
  }

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (file) setSelectedFile(file)
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>AI ETL Copilot</h1>
          <p style={styles.subtitle}>
            Upload a CSV file and get instant schema inference,
            data quality analysis, and AI-powered recommendations.
          </p>
        </div>

        <div
          style={{ ...styles.dropzone, ...(dragging ? styles.dropzoneDragging : {}) }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
        >
          <div style={styles.dropIcon}>📂</div>
          {selectedFile ? (
            <p style={styles.fileName}>{selectedFile.name}</p>
          ) : (
            <>
              <p style={styles.dropText}>Drag & drop a CSV file here</p>
              <p style={styles.dropHint}>or click to browse</p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <button
          style={{
            ...styles.button,
            ...(selectedFile ? {} : styles.buttonDisabled)
          }}
          disabled={!selectedFile}
          onClick={() => onUpload(selectedFile)}
        >
          Analyze File
        </button>
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
    padding: '2rem',
  },
  card: {
    background: '#fff',
    borderRadius: 16,
    padding: '2.5rem',
    width: '100%',
    maxWidth: 540,
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  },
  header: { marginBottom: '2rem', textAlign: 'center' },
  title: { fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#1a1a1a' },
  subtitle: { fontSize: 15, color: '#666', lineHeight: 1.6 },
  dropzone: {
    border: '2px dashed #d0d0d0',
    borderRadius: 12,
    padding: '2.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '1.5rem',
    background: '#fafafa',
  },
  dropzoneDragging: {
    borderColor: '#4f46e5',
    background: '#eef2ff',
  },
  dropIcon: { fontSize: 36, marginBottom: 12 },
  dropText: { fontSize: 15, color: '#444', marginBottom: 4 },
  dropHint: { fontSize: 13, color: '#999' },
  fileName: { fontSize: 15, color: '#4f46e5', fontWeight: 500 },
  error: {
    background: '#fef2f2',
    color: '#dc2626',
    padding: '0.75rem 1rem',
    borderRadius: 8,
    fontSize: 14,
    marginBottom: '1rem',
  },
  button: {
    width: '100%',
    padding: '0.875rem',
    background: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
  },
  buttonDisabled: {
    background: '#c7c7c7',
    cursor: 'not-allowed',
  },
}