import './LoadingScreen.css'

export default function LoadingScreen() {
  return (
    <div className="loading-page">
      <div className="loading-card">
        <div className="spinner" />
        <h2 className="loading-title">Analyzing your data...</h2>
        <p className="loading-subtitle">
          Inferring schema, detecting quality issues,
          and generating AI recommendations.
        </p>
      </div>
    </div>
  )
}