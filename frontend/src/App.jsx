import React, { useState } from 'react'
import TargetForm from './components/TargetForm'
import TargetTable from './components/TargetTable'
import { generateTarget } from './api'

export default function App(){
  const [open, setOpen] = useState(false)
  const [rows, setRows] = useState([])
  const [q, setQ] = useState('')

  const handleGenerate = async (payload) => {
    try{
      const res = await generateTarget(payload)

      // Ensure employee fields are present client-side (fallback to submitted payload)
      if (!res.employeeId || String(res.employeeId).trim() === '') res.employeeId = payload.employeeId
      if (!res.employeeName || String(res.employeeName).trim() === '') res.employeeName = payload.employeeName

      setRows(prev => [...prev, res])
      setOpen(false)
    }catch(err){
      alert(err?.response?.data?.error || err.message)
    }
  }

  const exportCSV = () => {
    const header = "EmployeeID,EmployeeName,Scenario,AdjustNote,WeightCur,WeightHis,WeightMax,Pieces,Grams,PKR";
    const csv = [header, ...rows.map(r=>[
      r.employeeId || '',
      `"${r.employeeName || ''}"`,
      `"${r.scenario}"`,
      `"${r.adjustment_note}"`,
      r.weights?.w_cur ?? '',
      r.weights?.w_his ?? '',
      r.weights?.w_max ?? '',
      r.target_pieces,
      r.target_grams,
      r.target_pkr
    ].join(','))].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a');
    a.href = url; a.download = 'targets.csv'; a.click();
    URL.revokeObjectURL(url)
  }

  const filtered = rows.filter(r => {
    const name = (r.employeeName || '').toString().toLowerCase();
    const id = (r.employeeId || '').toString().toLowerCase();
    return name.includes(q.toLowerCase()) || id.includes(q.toLowerCase()) || r.scenario.toLowerCase().includes(q.toLowerCase()) || r.adjustment_note.toLowerCase().includes(q.toLowerCase())
  })

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 style={{color:'#0ba77a'}}>targets<span style={{color:'#333'}}>live</span></h2>
        <nav style={{marginTop:24}}>
          <div style={{padding:'8px 0'}}>Product</div>
          <div style={{padding:'8px 0'}}>Price</div>
          <div style={{padding:'8px 0'}}>Property</div>
          <div style={{padding:'8px 0'}}>Executions</div>
        </nav>
      </aside>

      <div style={{flex:1}}>
        <header className="header">
          <div>
            <div style={{fontSize:18, fontWeight:600}}>Welcome to Targets Live</div>
            <div className="small-muted">Hello, Demo User</div>
          </div>
          <div style={{display:'flex', gap:12, alignItems:'center'}}>
            <div className="small-muted">Demo@company.com</div>
          </div>
        </header>

        <main className="content">
          <div className="card">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{display:'flex', gap:8, alignItems:'center'}}>
                <input placeholder="Search" className="search" value={q} onChange={e=>setQ(e.target.value)} />
              </div>
              <div className="controls">
                <button className="btn" onClick={()=>setOpen(true)}>+</button>
                <button className="btn secondary" onClick={exportCSV}>Export</button>
              </div>
            </div>

            <TargetTable rows={filtered} />
          </div>
        </main>
      </div>

      {open && <TargetForm onClose={()=>setOpen(false)} onSubmit={handleGenerate} />}
    </div>
  )
}
