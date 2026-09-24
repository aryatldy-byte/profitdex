import { useState } from 'react'
import { submitContactMessage } from '../data/contactService'

const INITIAL = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | sent | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Enter your name.'
    if (!form.email.trim()) {
      next.email = 'Enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address.'
    }
    if (!form.message.trim()) next.message = 'Enter a message.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    setErrorMsg('')
    try {
      await submitContactMessage(form)
      setStatus('sent')
      setForm(INITIAL)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <div>
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-4">Contact</p>
          <h1 className="font-display text-3xl sm:text-4xl max-w-2xl">
            Talk to our advisory or trading desk.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 grid md:grid-cols-[1fr_1.3fr] gap-12">
        <div>
          <h2 className="font-display text-xl text-ink mb-5">Company details</h2>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-slate uppercase text-xs tracking-wide mb-1">Registered office</dt>
              <dd className="text-ink">PROFITDEX VENTURES PRIVATE LIMITED.<br />A.M Cross Road, Door No: 8/2186,Mattancherry Kochi, Kerala 682002, India</dd>
            </div>
            <div>
              <dt className="text-slate uppercase text-xs tracking-wide mb-1">Email</dt>
              <dd className="text-ink">profitdexinvest@gmail.com</dd>
            </div>
            <div>
              <dt className="text-slate uppercase text-xs tracking-wide mb-1">Phone</dt>
              <dd className="text-ink">+91 9633776456,+91-4843555877 </dd>
            </div>
            <div>
              <dt className="text-slate uppercase text-xs tracking-wide mb-1">Desk hours</dt>
              <dd className="text-ink">Mon–Fri, 8:30 AM – 11:30 PM IST</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white/60 border border-hairline rounded-sm p-6 sm:p-8">
          {status === 'sent' ? (
            <div className="py-8 text-center">
              <p className="font-display text-xl text-ink mb-2">Message sent.</p>
              <p className="text-sm text-slate mb-6">
                Thanks for reaching out — our desk will get back to you within one
                business day.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-sm text-emerald hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {status === 'error' && (
                <p className="text-sm text-rose bg-rose/10 border border-rose/30 rounded-sm px-3 py-2">
                  {errorMsg}
                </p>
              )}
              <div>
                <label htmlFor="name" className="block text-sm text-ink mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-hairline bg-paper px-3 py-2.5 text-sm text-ink focus:border-gold"
                  placeholder="Your full name"
                />
                {errors.name && <p className="mt-1 text-xs text-rose">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-ink mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-hairline bg-paper px-3 py-2.5 text-sm text-ink focus:border-gold"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-rose">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-ink mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-hairline bg-paper px-3 py-2.5 text-sm text-ink focus:border-gold resize-none"
                  placeholder="Tell us what you'd like to discuss"
                />
                {errors.message && <p className="mt-1 text-xs text-rose">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto rounded-sm bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-ink-2 transition-colors disabled:opacity-60"
              >
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
