import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import MarketTicker from './MarketTicker'
import AccountModal from './AccountModal'
import { AccountModalProvider } from '../context/AccountModalContext'

export default function Layout() {
  return (
    <AccountModalProvider>
      <div className="min-h-screen flex flex-col bg-paper">
        <Navbar />
        <MarketTicker />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <AccountModal />
      </div>
    </AccountModalProvider>
  )
}
