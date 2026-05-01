export default function ResultsScreen({ results, onReset }) {
  const {
    ai_summary,
    inferred_schema,
    suggested_validations,
    suggested_transformations,
    preview_rows,
  } = results

  const nullableCols = inferred_schema.filter(c => c.nullable).length
  const totalCols = inferred_schema.length
  const totalRows = inferred_schema[0]?.stats?.rows || 0

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Analysis Results</h1>
            <p style={styles.meta}>{totalCols} columns · {totalRows} rows · {nullableCols} columns with missing values</p>
          </div>
          <button style={styles.resetBtn} onClick={onReset}>
            ← Analyze Another File
          </button>
        </div>

        {/* AI Summary */}
        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>AI Data Quality Summary</div>
          <p style={styles.summaryText}>{ai_summary}</p>
        </div>

        {/* Schema Table */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Inferred Schema</h2>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {['Column', 'Type', 'Nullable', 'Nulls', 'Distinct', 'Hints', 'Examples'].map(h => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inferred_schema.map((col, i) => (
                  <tr key={col.name} style={i % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                    <td style={styles.tdBold}>{col.name}</td>
                    <td style={styles.td}>
                      <span style={{ ...styles.badge, ...typeBadge(col.type) }}>
                        {col.type}
                      </span>
                    </td>
                    <td style={styles.td}>{col.nullable ? '⚠️ yes' : '✓ no'}</td>
                    <td style={styles.td}>{col.stats?.nulls ?? 0}</td>
                    <td style={styles.td}>{col.stats?.distinct ?? '—'}</td>
                    <td style={styles.td}>{col.hints?.join(', ') || '—'}</td>
                    <td style={styles.td}>{col.examples?.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Validations */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Suggested Validations</h2>
          <div style={styles.grid}>
            {suggested_validations.map((v, i) => (
              <div key={i} style={styles.ruleCard}>
                <div style={styles.ruleCol}>{v.column}</div>
                <div style={styles.ruleMsg}>{v.message}</div>
                <span style={styles.ruleTag}>{v.rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transformations */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Suggested Transformations</h2>
          <div style={styles.grid}>
            {suggested_transformations.map((t, i) => (
              <div key={i} style={styles.ruleCard}>
                <div style={styles.ruleCol}>{t.column}</div>
                <div style={styles.ruleMsg}>{t.description}</div>
                <span style={{ ...styles.ruleTag, background: '#f0fdf4', color: '#16a34a' }}>
                  {t.transformation}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

function typeBadge(type) {
  const map = {
    integer: { background: '#eff6ff', color: '#1d4ed8' },
    float:   { background: '#eff6ff', color: '#1d4ed8' },
    boolean: { background: '#fdf4ff', color: '#7e22ce' },
    date:    { background: '#fff7ed', color: '#c2410c' },
    string:  { background: '#f0fdf4', color: '#15803d' },
  }
  return map[type] || { background: '#f3f4f6', color: '#374151' }
}

const styles = {
  page: { minHeight: '100vh', background: '#f8f9fa', padding: '2rem 1rem' },
  container: { maxWidth: 1100, margin: '0 auto' },
  header: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: 12,
  },
  title: { fontSize: 26, fontWeight: 700 },
  meta: { fontSize: 14, color: '#666', marginTop: 4 },
  resetBtn: {
    padding: '0.5rem 1rem', background: '#fff', border: '1px solid #d0d0d0',
    borderRadius: 8, cursor: 'pointer', fontSize: 14, color: '#444',
  },
  summaryCard: {
    background: '#eef2ff', border: '1px solid #c7d2fe',
    borderRadius: 12, padding: '1.25rem 1.5rem', marginBottom: '1.5rem',
  },
  summaryLabel: { fontSize: 12, fontWeight: 600, color: '#4f46e5', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' },
  summaryText: { fontSize: 15, color: '#1e1b4b', lineHeight: 1.7 },
  section: { background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' },
  sectionTitle: { fontSize: 17, fontWeight: 600, marginBottom: '1rem' },
  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: { textAlign: 'left', padding: '8px 12px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb', fontWeight: 600, color: '#374151', whiteSpace: 'nowrap' },
  td: { padding: '8px 12px', borderBottom: '1px solid #f3f4f6', color: '#444', verticalAlign: 'middle' },
  tdBold: { padding: '8px 12px', borderBottom: '1px solid #f3f4f6', fontWeight: 500, color: '#111', whiteSpace: 'nowrap' },
  rowEven: { background: '#fff' },
  rowOdd: { background: '#fafafa' },
  badge: { display: 'inline-block', padding: '2px 8px', borderRadius: 20, fontSize: 12, fontWeight: 500 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 },
  ruleCard: { background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: '0.75rem 1rem' },
  ruleCol: { fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 2 },
  ruleMsg: { fontSize: 13, color: '#555', marginBottom: 6 },
  ruleTag: { display: 'inline-block', padding: '2px 8px', background: '#eff6ff', color: '#1d4ed8', borderRadius: 20, fontSize: 11, fontWeight: 500 },
}