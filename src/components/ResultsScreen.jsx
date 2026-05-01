import './ResultsScreen.css'

export default function ResultsScreen({ results, onReset }) {
  const {
    ai_summary,
    inferred_schema,
    suggested_validations,
    suggested_transformations,
  } = results

  const nullableCols = inferred_schema.filter(c => c.nullable).length
  const totalCols = inferred_schema.length
  const totalRows = inferred_schema[0]?.stats?.rows || 0

  return (
    <div className="results-page">
      <div className="results-container">

        <div className="results-header">
          <div>
            <h1 className="results-title">Analysis Results</h1>
            <p className="results-meta">
              {totalCols} columns · {totalRows} rows · {nullableCols} columns with missing values
            </p>
          </div>
          <button className="reset-btn" onClick={onReset}>
            ← Analyze Another File
          </button>
        </div>

        <div className="summary-card">
          <div className="summary-label">AI Data Quality Summary</div>
          <p className="summary-text">{ai_summary}</p>
        </div>

        <div className="section">
          <h2 className="section-title">Inferred Schema</h2>
          <div className="table-wrap">
            <table className="schema-table">
              <thead>
                <tr>
                  {['Column', 'Type', 'Nullable', 'Nulls', 'Distinct', 'Hints', 'Examples'].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inferred_schema.map(col => (
                  <tr key={col.name}>
                    <td className="col-name">{col.name}</td>
                    <td>
                      <span className={`type-badge type-${col.type}`}>
                        {col.type}
                      </span>
                    </td>
                    <td>{col.nullable ? '⚠️ yes' : '✓ no'}</td>
                    <td>{col.stats?.nulls ?? 0}</td>
                    <td>{col.stats?.distinct ?? '—'}</td>
                    <td>{col.hints?.join(', ') || '—'}</td>
                    <td>{col.examples?.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Suggested Validations</h2>
          <div className="rules-grid">
            {suggested_validations.map((v, i) => (
              <div key={i} className="rule-card">
                <div className="rule-col">{v.column}</div>
                <div className="rule-msg">{v.message}</div>
                <span className="rule-tag validation">{v.rule}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Suggested Transformations</h2>
          <div className="rules-grid">
            {suggested_transformations.map((t, i) => (
              <div key={i} className="rule-card">
                <div className="rule-col">{t.column}</div>
                <div className="rule-msg">{t.description}</div>
                <span className="rule-tag transform">{t.transformation}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}