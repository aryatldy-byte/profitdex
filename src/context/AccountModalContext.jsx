// src/context/AccountModalContext.jsx
//
// Lets any component (Navbar, Home hero, Footer, etc.) open the
// "Open an account" popup without prop-drilling.

import { createContext, useCallback, useContext, useState } from 'react'

const AccountModalContext = createContext(null)

export function AccountModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  return (
    <AccountModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </AccountModalContext.Provider>
  )
}

export function useAccountModal() {
  const ctx = useContext(AccountModalContext)
  if (!ctx) throw new Error('useAccountModal must be used within an AccountModalProvider')
  return ctx
}
