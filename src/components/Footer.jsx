import { Link } from 'react-router-dom'
import { useAccountModal } from '../context/AccountModalContext'

export default function Footer() {
  const { openModal } = useAccountModal()
  return (
    <footer className="bg-ink text-paper/70 border-t border-hairline-dark">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-gold text-ink font-display font-semibold text-xs">
              PV
            </span>
            <span className="font-display text-base text-paper">Profitdex Ventures</span>
          </div>
          <p className="text-sm max-w-sm leading-relaxed">
            Mutual fund management and trading services built on disciplined research,
            transparent reporting, and a long-term view of client capital.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm text-paper mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-gold">About us</Link></li>
            <li><Link to="/faq" className="hover:text-gold">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li>
              <button onClick={openModal} className="hover:text-gold">
                Open an account
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm text-paper mb-3">Reach us</h3>
          <ul className="space-y-2 text-sm">
            <li>profitdexinvest@gmail.com</li>
            <li>+91 9633776456,+91-4843555877</li>
            <li>Kochi, Kerala, India</li>
          </ul>
        </div>
      </div>

      <div className="rule-dark">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-paper/50">
          <p>&copy; {new Date().getFullYear()} Profitdex Ventures. All rights reserved.</p>
          <p>Mutual fund investments are subject to market risk. Read scheme documents carefully.</p>
        </div>
      </div>
    </footer>
  )
}
