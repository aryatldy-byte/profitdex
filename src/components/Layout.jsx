import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
<<<<<<< HEAD
import MarketTicker from './MarketTicker'
=======
>>>>>>> 068ee71 (Initial commit of updated Profitdex project)
import AccountModal from './AccountModal'
import { AccountModalProvider } from '../context/AccountModalContext'

export default function Layout() {
  return (
    <AccountModalProvider>
      <div className="min-h-screen flex flex-col bg-paper">
        <Navbar />
<<<<<<< HEAD
        <MarketTicker />
=======
>>>>>>> 068ee71 (Initial commit of updated Profitdex project)
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <AccountModal />
      </div>
    </AccountModalProvider>
  )
}
