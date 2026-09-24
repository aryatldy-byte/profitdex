// src/components/AccountModal.jsx
//
<<<<<<< HEAD
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
=======
// "Get started / Open account" popup. Presents four paths:
//   a) Trading / Demat  -> opens the Motilal Oswal account-opening link
//   b) SIP / Mutual Fund -> lead form, saved to Supabase + forwarded on WhatsApp
//   c) Insurance         -> same lead form flow
//   d) Hedging            -> same lead form flow
//
// Trading/Demat is an external partner link, so it's excluded from
// the site's dark theme intentionally — everything else stays in the
// Profitdex ledger palette.

import { useState } from 'react'
import { useAccountModal } from '../context/AccountModalContext'
import { submitLead, buildWhatsAppForwardUrl } from '../data/leadsService'

const TRADING_DEMAT_URL = 'https://mosl.co/MOSWEB/oLz0Yca1cJ'

const CONTACT_EMAIL = 'profitdexinvest@gmail.com'
const CONTACT_PHONES = ['+91 9633776456', '+91-4843555877']

const OPTIONS = [
  {
    key: 'trading',
    label: 'Trading / Demat Account',
    desc: 'Open a trading and demat account to invest in stocks, IPOs, F&O and more.',
    type: 'redirect',
    url: TRADING_DEMAT_URL,
  },
  {
    key: 'sip',
    label: 'SIP / Mutual Fund',
    desc: 'Start a systematic investment plan or invest a lump sum in mutual funds.',
    type: 'form',
    interest: 'SIP/Mutual Fund',
  },
  {
    key: 'insurance',
    label: 'Insurance',
    desc: 'Life, health and general insurance solutions for you and your family.',
    type: 'form',
    interest: 'Insurance',
  },
  {
    key: 'hedging',
    label: 'Commodity Hedging',
    desc: 'Risk-management solutions for jewellers, bullion dealers and manufacturers.',
    type: 'form',
    interest: 'Hedging',
  },
]

const INITIAL_FORM = { name: '', email: '', mobile: '', pan: '' }

export default function AccountModal() {
  const { isOpen, closeModal } = useAccountModal()
  const [step, setStep] = useState('choose') // choose | form | done
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | error
>>>>>>> 068ee71 (Initial commit of updated Profitdex project)
  const [errorMsg, setErrorMsg] = useState('')

  if (!isOpen) return null

<<<<<<< HEAD
=======
  const resetAndClose = () => {
    closeModal()
    setStep('choose')
    setSelected(null)
    setForm(INITIAL_FORM)
    setErrors({})
    setStatus('idle')
    setErrorMsg('')
  }

  const handleOptionClick = (option) => {
    if (option.type === 'redirect') {
      window.open(option.url, '_blank', 'noopener,noreferrer')
      resetAndClose()
      return
    }
    setSelected(option)
    setStep('form')
  }

>>>>>>> 068ee71 (Initial commit of updated Profitdex project)
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Enter your name.'
<<<<<<< HEAD
    if (!form.phone.trim()) next.phone = 'Enter your phone number.'
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address.'
    }
=======
    if (!form.mobile.trim()) next.mobile = 'Enter your mobile number.'
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address.'
    }
    if (form.pan.trim() && !/^[A-Za-z]{5}\d{4}[A-Za-z]$/.test(form.pan.trim())) {
      next.pan = 'Enter a valid PAN (e.g. ABCDE1234F), or leave it blank.'
    }
>>>>>>> 068ee71 (Initial commit of updated Profitdex project)
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    setErrorMsg('')
    try {
<<<<<<< HEAD
      await submitAccountRequest(form)
      setStatus('sent')
      setForm(INITIAL_FORM)
=======
      const payload = { ...form, interest: selected.interest }
      await submitLead(payload)
      window.open(buildWhatsAppForwardUrl(payload), '_blank', 'noopener,noreferrer')
      setStep('done')
      setStatus('idle')
>>>>>>> 068ee71 (Initial commit of updated Profitdex project)
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err.message || 'Something went wrong. Please try again, or reach us directly below.'
      )
    }
  }

<<<<<<< HEAD
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
=======
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8"
      onClick={resetAndClose}
>>>>>>> 068ee71 (Initial commit of updated Profitdex project)
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
<<<<<<< HEAD
              Open an account
            </h2>
          </div>
          <button
            onClick={handleClose}
=======
              {step === 'choose' && 'What would you like to open?'}
              {step === 'form' && selected?.label}
              {step === 'done' && "You're all set"}
            </h2>
          </div>
          <button
            onClick={resetAndClose}
>>>>>>> 068ee71 (Initial commit of updated Profitdex project)
            aria-label="Close"
            className="text-paper/50 hover:text-paper text-2xl leading-none"
          >
            &times;
          </button>
        </div>

<<<<<<< HEAD
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
=======
        {step === 'choose' && (
          <div className="space-y-3">
            {OPTIONS.map((option) => (
              <button
                key={option.key}
                onClick={() => handleOptionClick(option)}
                className="w-full text-left rounded-sm border border-hairline-dark bg-ink px-4 py-3.5 hover:border-gold transition-colors"
              >
                <span className="block font-display text-base text-paper mb-1">
                  {option.label}
                </span>
                <span className="block text-xs text-paper/60 leading-relaxed">{option.desc}</span>
              </button>
            ))}
          </div>
        )}

        {step === 'form' && (
          <>
            <p className="text-sm text-paper/70 mb-5 leading-relaxed">
              Share your details and our desk will get in touch to help you get started with{' '}
              {selected.label.toLowerCase()}.
>>>>>>> 068ee71 (Initial commit of updated Profitdex project)
            </p>
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {status === 'error' && (
                <p className="text-sm text-rose bg-rose/10 border border-rose/30 rounded-sm px-3 py-2">
                  {errorMsg}
                </p>
              )}

              <div>
<<<<<<< HEAD
                <label
                  htmlFor="am-name"
                  className="block text-xs uppercase tracking-wide text-paper/60 mb-1.5"
                >
=======
                <label htmlFor="am-name" className="block text-xs uppercase tracking-wide text-paper/60 mb-1.5">
>>>>>>> 068ee71 (Initial commit of updated Profitdex project)
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
<<<<<<< HEAD
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
=======
                <label htmlFor="am-email" className="block text-xs uppercase tracking-wide text-paper/60 mb-1.5">
>>>>>>> 068ee71 (Initial commit of updated Profitdex project)
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
<<<<<<< HEAD
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
=======
                <label htmlFor="am-mobile" className="block text-xs uppercase tracking-wide text-paper/60 mb-1.5">
                  Mobile number
                </label>
                <input
                  id="am-mobile"
                  name="mobile"
                  type="tel"
                  value={form.mobile}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-hairline-dark bg-ink px-3 py-2.5 text-sm text-paper focus:border-gold"
                  placeholder="+91 XXXXX XXXXX"
                />
                {errors.mobile && <p className="mt-1 text-xs text-rose">{errors.mobile}</p>}
              </div>

              <div>
                <label htmlFor="am-pan" className="block text-xs uppercase tracking-wide text-paper/60 mb-1.5">
                  PAN <span className="normal-case text-paper/40">(optional)</span>
                </label>
                <input
                  id="am-pan"
                  name="pan"
                  value={form.pan}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-hairline-dark bg-ink px-3 py-2.5 text-sm text-paper uppercase focus:border-gold"
                  placeholder="ABCDE1234F"
                />
                {errors.pan && <p className="mt-1 text-xs text-rose">{errors.pan}</p>}
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep('choose')}
                  className="rounded-sm border border-hairline-dark px-4 py-2.5 text-sm text-paper/80 hover:text-paper hover:border-gold transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex-1 rounded-sm bg-gold px-4 py-2.5 text-sm font-medium text-ink hover:bg-gold/90 transition-colors disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Submitting…' : 'Submit details'}
                </button>
              </div>
            </form>
          </>
        )}

        {step === 'done' && (
          <div className="text-center py-2">
            <p className="font-display text-lg text-paper mb-2">
              Thanks — we've got your details.
            </p>
            <p className="text-sm text-paper/70 mb-6 leading-relaxed">
              We've opened WhatsApp so you can send your enquiry straight to our desk. You can
              also reach us directly:
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
            <button
              onClick={resetAndClose}
              className="inline-block w-full rounded-sm bg-gold px-4 py-2.5 text-sm font-medium text-ink hover:bg-gold/90 transition-colors"
            >
              Close
            </button>
          </div>
        )}
>>>>>>> 068ee71 (Initial commit of updated Profitdex project)
      </div>
    </div>
  )
}
