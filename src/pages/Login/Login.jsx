import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import './Login.scss'

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [sending, setSending] = useState(false)

  // Allerede logget ind som admin → direkte til backoffice
  if (user?.role === 'admin') return <Navigate to="/backoffice" replace />

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = {}
    if (!/^\S+@\S+\.\S+$/.test(form.email)) found.email = 'Skriv en gyldig email.'
    if (!form.password) found.password = 'Skriv din adgangskode.'
    setErrors(found)
    if (Object.keys(found).length) return

    setSending(true)
    setServerError('')
    try {
      await login(form.email.trim(), form.password)
      navigate('/backoffice')
    } catch (err) {
      setServerError(err.message)
      setSending(false)
    }
  }

  const field = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: handleChange,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  return (
    <div className="login">
      <Link to="/" className="login__back">
        <Icon name="arrowLeft" size={20} /> Tilbage til forsiden
      </Link>

      <h1>Log ind</h1>
      <p className="login__lead">Adgang forbeholdt personale og administratorer</p>

      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">E-mail</label>
        <input type="email" autoComplete="username" placeholder="jens@example.dk" {...field('email')} />
        {errors.email && <p id="email-error" className="login__error">{errors.email}</p>}

        <label htmlFor="password">Adgangskode</label>
        <input type="password" autoComplete="current-password" placeholder="••••••••" {...field('password')} />
        {errors.password && <p id="password-error" className="login__error">{errors.password}</p>}

        {serverError && <p role="alert" className="login__alert">{serverError}</p>}

        <button type="submit" disabled={sending}>{sending ? 'Logger ind…' : 'Log ind'}</button>
      </form>
    </div>
  )
}
