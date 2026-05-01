import { useState, useRef } from 'react'
import './UploadScreen.css'

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
    <div className="upload-page">
      <div className="upload-card">

        <div className="upload-header">
          <h1 className="upload-title">AI ETL Copilot</h1>
          <p className="upload-subtitle">
            Upload a CSV file and get instant schema inference,
            data quality analysis, and AI-powered recommendations.
          </p>
        </div>

        <div
          className={`dropzone ${dragging ? 'dragging' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
        >
          <div className="drop-icon">📂</div>
          {selectedFile ? (
            <p className="file-name">{selectedFile.name}</p>
          ) : (
            <>
              <p className="drop-text">Drag & drop a CSV file here</p>
              <p className="drop-hint">or click to browse</p>
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

        {error && <div className="upload-error">{error}</div>}

        <button
          className="upload-btn"
          disabled={!selectedFile}
          onClick={() => onUpload(selectedFile)}
        >
          Analyze File
        </button>

      </div>
    </div>
  )
}