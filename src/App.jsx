import { useState } from 'react'
import UploadScreen from './components/UploadScreen'
import LoadingScreen from './components/LoadingScreen'
import ResultsScreen from './components/ResultsScreen'
import axios from 'axios'

const API_URL = 'http://localhost:3001/analyze'

export default function App() {
  const [screen, setScreen] = useState('upload') // upload | loading | results
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  async function handleFileUpload(file) {
    setScreen('loading')
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post(API_URL, formData)
      setResults(response.data)
      setScreen('results')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
      setScreen('upload')
    }
  }

  function handleReset() {
    setResults(null)
    setError(null)
    setScreen('upload')
  }

  return (
    <div>
      {screen === 'upload' && (
        <UploadScreen onUpload={handleFileUpload} error={error} />
      )}
      {screen === 'loading' && <LoadingScreen />}
      {screen === 'results' && (
        <ResultsScreen results={results} onReset={handleReset} />
      )}
    </div>
  )
}