// src/components/AccountModal.jsx
//
// "Open an account" popup — collects name/phone/email, saves it to
// Supabase, and then shows the company's contact details so the
// visitor can reach out directly too.

import { useState } from 'react'
import { useAccountModal } from '../context/AccountModalContext'
import { submitAccountRequest } from '../data/accountService'

const CONTACT_EMAIL = 'profitdexinvest@gmail.com'
const CONTACT_PHONES = ['+91 9633776456', '+91-4843555877']
const WHATSAPP_NUMBER = '919633776456'

const INITIAL_FORM = { name: '', phone: '', email: '', message: '' }

export default function AccountModal() {
  const { isOpen, closeModal } = useAccountModal()
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | sent | error
  const [errorMsg, setErrorMsg] = useState('')

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Enter your name.'
    if (!form.phone.trim()) next.phone = 'Enter your phone number.'
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    setErrorMsg('')
    try {
      await submitAccountRequest(form)
      setStatus('sent')
      setForm(INITIAL_FORM)
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err.message || 'Something went wrong. Please try again, or reach us directly below.'
      )
    }
  }

  const handleClose = () => {
    closeModal()
    setStatus('idle')
    setErrors({})
    setErrorMsg('')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md bg-ink-2 border border-hairline-dark rounded-sm p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-modal-title"
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-1">
              Get started
            </p>
            <h2 id="account-modal-title" className="font-display text-xl text-paper">
              Open an account
            </h2>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="text-paper/50 hover:text-paper text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {status === 'sent' ? (
          <div className="text-center py-2">
            <p className="font-display text-lg text-paper mb-2">
              Thanks — we've got your details.
            </p>
            <p className="text-sm text-paper/70 mb-6 leading-relaxed">
              Our desk will reach out shortly. You can also contact us directly:
            </p>
            <div className="bg-ink border border-hairline-dark rounded-sm p-4 text-left text-sm space-y-1 mb-6">
              <p className="text-paper/60 text-xs uppercase tracking-wide">Email</p>
              <p className="text-paper mb-2">{CONTACT_EMAIL}</p>
              <p className="text-paper/60 text-xs uppercase tracking-wide">Phone</p>
              {CONTACT_PHONES.map((p) => (
                <p key={p} className="text-paper">
                  {p}
                </p>
              ))}
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block w-full rounded-sm bg-gold px-4 py-2.5 text-sm font-medium text-ink hover:bg-gold/90 transition-colors mb-3"
            >
              Chat on WhatsApp
            </a>
            <button onClick={handleClose} className="text-sm text-paper/60 hover:text-paper">
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-paper/70 mb-5 leading-relaxed">
              Share your details and our team will get in touch to set up your account.
            </p>
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {status === 'error' && (
                <p className="text-sm text-rose bg-rose/10 border border-rose/30 rounded-sm px-3 py-2">
                  {errorMsg}
                </p>
              )}

              <div>
                <label
                  htmlFor="am-name"
                  className="block text-xs uppercase tracking-wide text-paper/60 mb-1.5"
                >
                  Full name
                </label>
                <input
                  id="am-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-hairline-dark bg-ink px-3 py-2.5 text-sm text-paper focus:border-gold"
                  placeholder="Your full name"
                />
                {errors.name && <p className="mt-1 text-xs text-rose">{errors.name}</p>}
              </div>

              <div>
                <label
                  htmlFor="am-phone"
                  className="block text-xs uppercase tracking-wide text-paper/60 mb-1.5"
                >
                  Phone number
                </label>
                <input
                  id="am-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-hairline-dark bg-ink px-3 py-2.5 text-sm text-paper focus:border-gold"
                  placeholder="+91 XXXXX XXXXX"
                />
                {errors.phone && <p className="mt-1 text-xs text-rose">{errors.phone}</p>}
              </div>

              <div>
                <label
                  htmlFor="am-email"
                  className="block text-xs uppercase tracking-wide text-paper/60 mb-1.5"
                >
                  Email <span className="normal-case text-paper/40">(optional)</span>
                </label>
                <input
                  id="am-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-hairline-dark bg-ink px-3 py-2.5 text-sm text-paper focus:border-gold"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-rose">{errors.email}</p>}
              </div>

              <div>
                <label
                  htmlFor="am-message"
                  className="block text-xs uppercase tracking-wide text-paper/60 mb-1.5"
                >
                  What are you interested in? <span className="normal-case text-paper/40">(optional)</span>
                </label>
                <textarea
                  id="am-message"
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-hairline-dark bg-ink px-3 py-2.5 text-sm text-paper focus:border-gold resize-none"
                  placeholder="Mutual funds, trading, or both"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full rounded-sm bg-gold px-4 py-2.5 text-sm font-medium text-ink hover:bg-gold/90 transition-colors disabled:opacity-60"
              >
                {status === 'submitting' ? 'Submitting…' : 'Submit details'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
