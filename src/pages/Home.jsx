import { Link } from 'react-router-dom'
import { useAccountModal } from '../context/AccountModalContext'

const SERVICES = [
  {
    name: 'Mutual Fund Advisory',
    desc: 'Curated equity, debt, and hybrid scheme portfolios matched to your time horizon and risk appetite, reviewed every quarter.',
  },
  {
    name: 'Active Trading Desk',
    desc: 'Discretionary and rules-based trading across cash and derivatives, run by a desk that publishes its reasoning, not just its calls.',
  },
  {
    name: 'Commodity Risk Management',
    desc: 'Hedging solutions on gold and silver derivatives for jewellers, bullion dealers, and manufacturers exposed to price swings.',
  },
]

const GET_STARTED_STEPS = [
  { step: '01', title: 'Choose what you need', body: 'Trading & demat, SIP / mutual funds, insurance, or commodity hedging.' },
  { step: '02', title: 'Share your details', body: 'A short form — name, contact number, and (for some products) your PAN.' },
  { step: '03', title: 'Our desk reaches out', body: 'We confirm your requirement over a call or WhatsApp and take it from there.' },
]

export default function Home() {
  const { openModal } = useAccountModal()
  return (
    <div>
      {/* Hero */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-5">
              Profitdex Ventures
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-[3.4rem] leading-[1.08] mb-6">
              Capital, managed like a ledger —
              <span className="text-gold"> every entry accounted for.</span>
            </h1>
            <p className="text-paper/75 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
              We run mutual fund portfolios, active trading strategies, and commodity
              risk-management solutions for individuals, jewellers, bullion dealers and
              institutions who want a clear record of decisions, not just returns.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={openModal}
                className="rounded-sm bg-gold px-6 py-3 text-sm font-medium text-ink hover:bg-gold/90 transition-colors"
              >
                Get Started / Open Account
              </button>
              <Link
                to="/products"
                className="rounded-sm border border-paper/30 px-6 py-3 text-sm text-paper hover:border-gold hover:text-gold transition-colors"
              >
                View products
              </Link>
            </div>
          </div>

          {/* How to get started card — signature ledger element */}
          <div className="bg-ink-2 border border-hairline-dark rounded-sm p-6">
            <div className="flex items-center justify-between pb-3 mb-4 rule-dark">
              <span className="text-paper/60 uppercase text-xs tracking-wide font-mono">Get started in 3 steps</span>
            </div>
            <div className="space-y-5">
              {GET_STARTED_STEPS.map((s) => (
                <div key={s.step} className="flex gap-4">
                  <span className="font-mono text-xs text-gold shrink-0 pt-0.5">{s.step}</span>
                  <div>
                    <p className="text-paper text-sm font-medium mb-0.5">{s.title}</p>
                    <p className="text-paper/60 text-xs leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="max-w-2xl mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald mb-3">What we do</p>
          <h2 className="font-display text-3xl sm:text-4xl text-ink mb-3">
            Three disciplines, one standard of record-keeping.
          </h2>
          <p className="text-slate leading-relaxed">
            Whether your capital sits in a long-term fund, an active trading strategy, or a
            hedge against commodity price risk, you get the same thing: a clear account of what
            was done, and why.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div key={s.name} className="bg-white/60 border border-hairline rounded-sm p-6">
              <p className="font-mono text-xs text-gold mb-3">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="font-display text-lg text-ink mb-2">{s.name}</h3>
              <p className="text-sm text-slate leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink-2">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl text-paper mb-2">
              Ready to get started?
            </h2>
            <p className="text-paper/70 text-sm max-w-md">
              Share your details and our desk will reach out to set up your account.
            </p>
          </div>
          <button
            onClick={openModal}
            className="shrink-0 rounded-sm bg-gold px-6 py-3 text-sm font-medium text-ink hover:bg-gold/90 transition-colors"
          >
            Get Started / Open Account
          </button>
        </div>
      </section>
    </div>
  )
}
