import React from 'react';
import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'

function Navbar() {
  return <nav className="navbar navbar-expand-lg navbar-dark app-navbar"><div className="container">
    <Link className="navbar-brand brand" to="/"><span className="brand-icon">P</span> PeopleDesk</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
    <div className="collapse navbar-collapse" id="mainNav"><div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
      <NavLink end to="/" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
      <NavLink to="/employee-form" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Employee Form</NavLink>
    </div></div>
  </div></nav>
}

function Dashboard() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    async function loadUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {signal: controller.signal})
        if (!response.ok) throw new Error('Could not load employee data. Please try again.')
        setEmployees(await response.json())
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || 'Unable to load data.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    loadUsers()
    return () => controller.abort()
  }, [])
  return <main className="container page-container">
    <div className="page-heading d-flex flex-wrap align-items-end justify-content-between gap-3"><div><div className="eyebrow">PEOPLEDESK / OVERVIEW</div><h1>Employee dashboard</h1><p className="text-secondary mb-0">A quick overview of people in your organisation.</p></div><Link to="/employee-form" className="btn btn-primary add-button">＋ Add employee</Link></div>
    <div className="row g-3 mb-4">
      <div className="col-12 col-md-4"><div className="stat-card"><div className="stat-label">TOTAL EMPLOYEES</div><div className="stat-value">{loading ? '—' : employees.length}</div><div className="stat-foot">● API directory</div></div></div>
      <div className="col-12 col-md-4"><div className="stat-card"><div className="stat-label">DATA SOURCE</div><div className="stat-value stat-word">JSONPlaceholder</div><div className="stat-foot">External REST API</div></div></div>
      <div className="col-12 col-md-4"><div className="stat-card"><div className="stat-label">DIRECTORY STATUS</div><div className="stat-value stat-word">{error ? 'Unavailable' : loading ? 'Loading…' : 'Connected'}</div><div className="stat-foot">Read-only data</div></div></div>
    </div>
    <section className="content-card">
      <div className="card-heading d-flex justify-content-between align-items-center flex-wrap gap-2"><div><h2>Employee directory</h2><p className="mb-0">Employee ID, name, and contact email</p></div><span className="record-pill">{loading ? 'Loading records' : `${employees.length} records`}</span></div>
      {loading && <div className="empty-state"><div className="spinner-border text-primary mb-3" role="status"><span className="visually-hidden">Loading</span></div><p>Loading employee records…</p></div>}
      {error && !loading && <div className="alert alert-warning m-4">{error} <button className="btn btn-sm btn-outline-dark ms-2" onClick={() => window.location.reload()}>Retry</button></div>}
      {!loading && !error && <div className="table-responsive"><table className="table employee-table align-middle mb-0"><thead><tr><th>ID</th><th>EMPLOYEE</th><th>EMAIL ADDRESS</th><th className="d-none d-md-table-cell">STATUS</th></tr></thead><tbody>
        {employees.map(person => <tr key={person.id}><td><span className="id-chip">#{String(person.id).padStart(3,'0')}</span></td><td><div className="employee-cell"><div className={`employee-avatar avatar-${person.id % 5}`}>{person.name.split(' ').map(p=>p[0]).slice(0,2).join('').toUpperCase()}</div><div><div className="employee-name">{person.name}</div><div className="employee-sub">Employee record</div></div></div></td><td><a className="email-link" href={`mailto:${person.email}`}>{person.email}</a></td><td className="d-none d-md-table-cell"><span className="active-status">● Listed</span></td></tr>)}
      </tbody></table></div>}
      <div className="table-footer"><span>Data returned by JSONPlaceholder</span><span>Updated on page load</span></div>
    </section><p className="page-footnote">Demo project · Directory data is fetched from an external API and is not editable here.</p>
  </main>
}

function EmployeeForm() {
  const [form, setForm] = useState({name:'', designation:'', location:'', salary:''})
  const [message, setMessage] = useState('')
  function update(e) { setForm({...form, [e.target.name]: e.target.value}); setMessage('') }
  function submit(e) { e.preventDefault(); setMessage(`Form validated for ${form.name}. No data was sent or saved, as required.`) }
  function clear() { setForm({name:'', designation:'', location:'', salary:''}); setMessage('') }
  return <main className="container page-container form-page">
    <div className="page-heading"><div className="eyebrow">PEOPLEDESK / PEOPLE</div><h1>Employee form</h1><p className="text-secondary mb-0">Enter employee details below. This is a front-end demo form.</p></div>
    <div className="form-layout"><section className="content-card form-card"><div className="card-heading"><h2>Employee information</h2><p className="mb-0">Fields marked with * are required.</p></div>
      <form className="employee-form" onSubmit={submit}><div className="row g-3">
        <div className="col-12"><label className="form-label" htmlFor="name">Full name <span>*</span></label><input className="form-control" id="name" name="name" value={form.name} onChange={update} placeholder="e.g. Alex Morgan" required minLength="2"/></div>
        <div className="col-12 col-md-6"><label className="form-label" htmlFor="designation">Designation <span>*</span></label><input className="form-control" id="designation" name="designation" value={form.designation} onChange={update} placeholder="e.g. Product Designer" required/></div>
        <div className="col-12 col-md-6"><label className="form-label" htmlFor="location">Location <span>*</span></label><input className="form-control" id="location" name="location" value={form.location} onChange={update} placeholder="e.g. Kochi, India" required/></div>
        <div className="col-12"><label className="form-label" htmlFor="salary">Salary (₹) <span>*</span></label><div className="input-group"><span className="input-group-text">₹</span><input className="form-control" type="number" id="salary" name="salary" value={form.salary} onChange={update} placeholder="e.g. 45000" min="0" required/></div><div className="form-text">Enter a monthly salary amount.</div></div>
      </div><div className="form-actions"><button className="btn btn-light border" type="button" onClick={clear}>Clear form</button><button className="btn btn-primary add-button" type="submit">Validate form →</button></div>
      {message && <div className="alert alert-success mt-3 mb-0" role="status">{message}</div>}</form>
    </section><aside className="form-note"><div className="note-icon">ⓘ</div><h3>About this form</h3><p>This assignment requires only the front-end form. Submitting validates the fields locally and does not make a POST request or save employee details.</p><div className="note-divider"></div><div className="note-row"><span>Fields</span><strong>4 required</strong></div><div className="note-row"><span>Data handling</span><strong>Local only</strong></div><div className="note-row"><span>API submission</span><strong>Not used</strong></div></aside></div>
  </main>
}

export default function App() {
  const location = useLocation()
  useEffect(() => { window.scrollTo({top:0, behavior:'smooth'}) }, [location.pathname])
  return <div className="app-shell"><Navbar/><Routes><Route path="/" element={<Dashboard/>}/><Route path="/employee-form" element={<EmployeeForm/>}/><Route path="*" element={<main className="container page-container"><div className="content-card p-5 text-center"><h1>Page not found</h1><Link to="/" className="btn btn-primary mt-3">Back to dashboard</Link></div></main>}/></Routes><footer className="app-footer"><div className="container d-flex flex-wrap justify-content-between gap-2"><span>© 2026 PeopleDesk · Employee management demo</span><span>Built with React & Bootstrap</span></div></footer></div>
}