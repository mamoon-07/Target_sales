import React from 'react'

export default function TargetTable({ rows }) {
  return (
    <table className="table card">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Employee ID</th>
          <th>Employee Name</th>
          <th>Scenario</th>
          <th>Notes</th>
          <th>Pieces</th>
          <th>Weight (g)</th>
          <th>Price (PKR)</th>
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 && (
          <tr>
            <td colSpan={8} style={{padding:40, textAlign:'center'}}>No targets generated yet.</td>
          </tr>
        )}
        {rows.map((r, i) => (
          <tr key={i}>
            <td>{i+1}</td>
            <td className="small-muted">{r.employeeId || '-'}</td>
            <td>{r.employeeName || '-'}</td>
            <td>{r.scenario}</td>
            <td className="small-muted">{r.adjustment_note}</td>
            <td>{r.target_pieces} </td>
            <td>{r.target_grams}</td>
            <td>{r.target_pkr.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
