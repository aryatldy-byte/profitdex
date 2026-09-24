<<<<<<< HEAD
=======
import { Link } from 'react-router-dom'
import ProductsGrid from '../components/ProductsGrid'
import OwnerProfile from '../components/OwnerProfile'

>>>>>>> 068ee71 (Initial commit of updated Profitdex project)
const PRINCIPLES = [
  {
    title: 'Research first',
    body: 'Every recommendation traces back to a written note from our desk. If we can\'t explain a position in plain language, we don\'t take it.',
  },
  {
    title: 'Risk before return',
    body: 'We size positions and fund allocations against a stated risk budget, not against how good an opportunity looks in isolation.',
  },
  {
    title: 'Transparent fees',
    body: 'No hidden loads or trailing commissions dressed up as advice. You see exactly what a service costs before you sign up.',
  },
]

export default function About() {
  return (
    <div>
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-4">About Profitdex Ventures</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight max-w-3xl">
            Built by traders and fund analysts who wanted their own
            statements to make sense.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-2xl text-ink mb-4">Mutual fund services</h2>
          <p className="text-slate leading-relaxed mb-4">
            We help clients build and hold mutual fund portfolios across equity, debt,
            and hybrid categories. That means goal-based fund selection, SIP planning,
            periodic rebalancing, and a quarterly review that walks through performance
            against the original plan — not just against a benchmark.
          </p>
          <ul className="space-y-2 text-sm text-slate">
            <li className="flex gap-2"><span className="text-emerald">—</span> Goal-based portfolio construction</li>
            <li className="flex gap-2"><span className="text-emerald">—</span> SIP and lump-sum planning</li>
            <li className="flex gap-2"><span className="text-emerald">—</span> Quarterly rebalancing reviews</li>
            <li className="flex gap-2"><span className="text-emerald">—</span> Tax-aware redemption guidance</li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl text-ink mb-4">Trading services</h2>
          <p className="text-slate leading-relaxed mb-4">
            Our trading desk runs discretionary and rules-based strategies across cash
            equities and derivatives for clients who want active exposure alongside
            their long-term holdings. Every strategy has a documented entry, exit, and
            stop-loss discipline, published to clients through the daily dashboard.
          </p>
          <ul className="space-y-2 text-sm text-slate">
            <li className="flex gap-2"><span className="text-emerald">—</span> Discretionary equity and derivatives trading</li>
            <li className="flex gap-2"><span className="text-emerald">—</span> Rules-based momentum and swing strategies</li>
            <li className="flex gap-2"><span className="text-emerald">—</span> Daily desk notes and trade rationale</li>
            <li className="flex gap-2"><span className="text-emerald">—</span> Defined stop-loss and position sizing rules</li>
          </ul>
        </div>
      </section>

<<<<<<< HEAD
      <section className="bg-paper-2 rule">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
          <h2 className="font-display text-2xl text-ink mb-8">How we operate</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} className="bg-white/70 border border-hairline rounded-sm p-6">
                <p className="font-mono text-xs text-gold mb-3">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display text-lg text-ink mb-2">{p.title}</h3>
                <p className="text-sm text-slate leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
=======
      {/* Commodity risk-management highlight */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-14">
        <div className="bg-gold/10 border border-gold/40 rounded-sm p-6 sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-3">Specialised solution</p>
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-4 max-w-2xl">
            Commodity risk-management for jewellers, bullion dealers &amp; manufacturers
          </h2>
          <p className="text-slate leading-relaxed max-w-3xl mb-6">
            Gold and silver price swings can move margins overnight for businesses that hold
            physical stock. We design hedging strategies on commodity derivatives — futures and
            options on gold and silver — so jewellers, bullion dealers and manufacturers can lock
            in costs, protect inventory value, and plan pricing with confidence instead of
            reacting to every price move.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            <div className="bg-white/70 border border-hairline rounded-sm p-4">
              <h3 className="font-display text-base text-ink mb-1.5">Inventory hedging</h3>
              <p className="text-sm text-slate leading-relaxed">
                Offset the price risk on physical gold and silver stock held for sale or crafting.
              </p>
            </div>
            <div className="bg-white/70 border border-hairline rounded-sm p-4">
              <h3 className="font-display text-base text-ink mb-1.5">Forward pricing</h3>
              <p className="text-sm text-slate leading-relaxed">
                Lock in input costs ahead of large orders or seasonal manufacturing cycles.
              </p>
            </div>
            <div className="bg-white/70 border border-hairline rounded-sm p-4">
              <h3 className="font-display text-base text-ink mb-1.5">Advisory &amp; execution</h3>
              <p className="text-sm text-slate leading-relaxed">
                Our desk designs the hedge structure and executes it, with plain-language
                reporting on positions and cover ratios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="bg-paper-2 rule">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald mb-3">Our products</p>
              <h2 className="font-display text-2xl sm:text-3xl text-ink">A full desk of investing and trading products.</h2>
            </div>
            <Link to="/products" className="text-sm text-emerald hover:underline whitespace-nowrap">
              View all products →
            </Link>
          </div>
          <ProductsGrid compact />
        </div>
      </section>

      {/* How we operate */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <h2 className="font-display text-2xl text-ink mb-8">How we operate</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {PRINCIPLES.map((p, i) => (
            <div key={p.title} className="bg-white/70 border border-hairline rounded-sm p-6">
              <p className="font-mono text-xs text-gold mb-3">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="font-display text-lg text-ink mb-2">{p.title}</h3>
              <p className="text-sm text-slate leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Owner profile */}
      <section className="bg-paper-2 rule">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald mb-3">Leadership</p>
          <h2 className="font-display text-2xl sm:text-3xl text-ink mb-8">Meet our founder</h2>
          <OwnerProfile />
>>>>>>> 068ee71 (Initial commit of updated Profitdex project)
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <h2 className="font-display text-2xl text-ink mb-4">Regulatory note</h2>
        <p className="text-slate text-sm max-w-2xl leading-relaxed">
          Profitdex Ventures provides mutual fund distribution and advisory services
          along with trading facilitation. Mutual fund investments are subject to
          market risk; please read all scheme-related documents carefully before
<<<<<<< HEAD
          investing. Trading in derivatives carries a high level of risk and may not
          be suitable for every investor.
=======
          investing. Trading in derivatives and commodity hedging carries a high level
          of risk and may not be suitable for every investor.
>>>>>>> 068ee71 (Initial commit of updated Profitdex project)
        </p>
      </section>
    </div>
  )
}
