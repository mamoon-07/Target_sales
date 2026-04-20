import React, { useState } from 'react'

export default function TargetForm({ onClose, onSubmit }) {
  const [sale_max, setMax] = useState('')
  const [sale_min, setMin] = useState('')
  const [sale_cur, setCur] = useState('')
  const [sale_his, setHis] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [employeeName, setEmployeeName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    const max = parseFloat(sale_max)
    const min = parseFloat(sale_min)
    const cur = parseFloat(sale_cur)
    const his = parseFloat(sale_his)

    if (isNaN(max) || isNaN(min) || isNaN(cur) || isNaN(his)) {
      alert('Please enter valid numeric values for sales fields.')
      return
    }

    if (!employeeId || String(employeeId).trim() === '' || !employeeName || String(employeeName).trim() === '') {
      alert('Employee ID and Employee Name are required.')
      return
    }

    onSubmit({
      sale_max: max,
      sale_min: min,
      sale_cur: cur,
      sale_his: his,
      employeeId: String(employeeId).trim(),
      employeeName: String(employeeName).trim()
    })
  }

  return (
    <div>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <h3>Generate Sales Target</h3>
        <form onSubmit={handleSubmit} style={{width:420}}>
          <div className="form-row">
            <input className="input" placeholder="Employee ID (optional)" value={employeeId} onChange={e=>setEmployeeId(e.target.value)} />
            <input className="input" placeholder="Employee Name (optional)" value={employeeName} onChange={e=>setEmployeeName(e.target.value)} />
          </div>
          <div className="form-row">
            <input className="input" placeholder="Maximum Sales" value={sale_max} onChange={e=>setMax(e.target.value)} />
            <input className="input" placeholder="Minimum Sales" value={sale_min} onChange={e=>setMin(e.target.value)} />
          </div>
          <div className="form-row">
            <input className="input" placeholder="Current Sales" value={sale_cur} onChange={e=>setCur(e.target.value)} />
            <input className="input" placeholder="Historical Sales" value={sale_his} onChange={e=>setHis(e.target.value)} />
          </div>
          <div style={{display:'flex', justifyContent:'flex-end', gap:8}}>
            <button type="button" className="btn secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn">Generate</button>
          </div>
        </form>
      </div>
    </div>
  )
}
