// src/data/productsService.js
//
// Data-access layer for the product grid (About page + /products).
// Reads from the `products` table in Supabase. If Supabase isn't
// configured yet, or the table is empty, falls back to this static
// list so the grid never renders blank.

import { supabase } from '../lib/supabaseClient'

export const DEFAULT_PRODUCTS = [
  { slug: 'stocks', name: 'Stocks', description: 'Equity trading in cash and derivatives segments across NSE and BSE, backed by daily desk research.' },
  { slug: 'ipo', name: 'IPO', description: 'Apply for new public issues online, with allotment tracking and desk guidance on upcoming listings.' },
  { slug: 'iap', name: 'IAP', description: 'Investment Advisory Products — curated, advisory-led investment ideas for clients who want expert-guided calls.' },
  { slug: 'mutual-funds', name: 'Mutual Funds', description: 'Goal-based SIP and lump-sum investing across equity, debt and hybrid schemes from leading AMCs.' },
  { slug: 'imp', name: 'IMP', description: 'Investment & Money-market Products — short-tenure, liquidity-focused instruments for parking surplus funds.' },
  { slug: 'pms', name: 'PMS', description: 'Portfolio Management Services for high-net-worth investors who want a professionally managed, customised portfolio.' },
  { slug: 'aif', name: 'AIF', description: 'Alternative Investment Funds offering access to strategies beyond traditional stocks and mutual funds.' },
  { slug: 'insurance', name: 'Insurance', description: 'Life, health and general insurance solutions to protect your family and your capital.' },
  { slug: 'bonds', name: 'Bonds', description: 'Government and corporate bonds for investors seeking predictable, fixed-income returns.' },
  { slug: 'us-stocks', name: 'US Stocks', description: 'Invest in US-listed companies and diversify your portfolio beyond Indian markets.' },
  { slug: 'ofs-buyback', name: 'OFS / Buy Back', description: 'Participate in Offer for Sale and company share buyback opportunities as they open.' },
  { slug: 'dealer-request', name: 'Dealer Request', description: 'Raise a dealer-assisted trade request and have our desk execute it on your behalf.' },
]

export async function getProducts() {
  if (!supabase) return DEFAULT_PRODUCTS

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error || !data || data.length === 0) return DEFAULT_PRODUCTS
  return data
}
