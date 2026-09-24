import { useState } from 'react'

const FAQS = [
  {
    q: 'How do I start investing through Profitdex Ventures?',
    a: 'Open an account through the site or book a call through the contact page. Our advisory team will walk you through goal-setting and fund selection before any money moves.',
  },
  {
    q: 'What is the minimum investment amount?',
    a: 'Most mutual fund schemes we offer accept SIPs from ₹500/month, with lump-sum minimums varying by fund. The trading desk requires a minimum account size of ₹1,00,000 to manage risk properly.',
  },
  {
    q: 'How often will I receive market updates?',
    a: 'Daily. We share market news, index moves, and desk commentary with clients every trading day, usually before market open.',
  },
  {
    q: 'Are my funds held by Profitdex Ventures directly?',
    a: 'No. Mutual fund units are held in your name with the respective AMC / registrar, and trading accounts sit with your broker. Profitdex Ventures provides advisory and execution support — we never take custody of client funds.',
  },
  {
    q: 'What fees do you charge?',
    a: 'Advisory fees are a flat percentage of assets advised, disclosed upfront with no hidden loads. Trading services are billed separately as a flat monthly desk fee. Full details are shared before you sign any agreement.',
  },
  {
    q: 'Can I cancel or pause my SIP at any time?',
    a: 'Yes. SIPs can be paused, modified, or cancelled at any time by contacting our desk — there is no lock-in on the SIP mandate itself (individual schemes may carry their own exit load rules).',
  },
]

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="rule">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display text-base sm:text-lg text-ink">{item.q}</span>
        <span
          className={`shrink-0 font-mono text-lg text-gold transition-transform ${isOpen ? 'rotate-45' : ''}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {isOpen && (
        <p className="pb-5 text-sm text-slate leading-relaxed max-w-2xl">{item.a}</p>
      )}
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div>
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-4">FAQ</p>
          <h1 className="font-display text-3xl sm:text-4xl max-w-2xl">
            Common questions from our clients.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
        <div className="border-b border-hairline">
          {FAQS.map((item, i) => (
            <FAQItem
              key={item.q}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
