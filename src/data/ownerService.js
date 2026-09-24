// src/data/ownerService.js
//
// Data-access layer for the owner profile section on the About page.
// Reads the single row from the `owner_profile` table in Supabase.
// Falls back to this static profile if Supabase isn't configured yet
// — update the real details in Supabase (Table Editor > owner_profile)
// rather than editing the fallback below.

import { supabase } from '../lib/supabaseClient'

export const DEFAULT_OWNER_PROFILE = {
  full_name: 'Vivek Krishna',
  designation: 'Founder & Director, Profitdex Ventures',
  bio: 'Vivek Krishna founded Profitdex Ventures to bring disciplined, research-backed investing and trading to individual and institutional clients across Kerala. His work spans equity and derivatives trading, mutual fund advisory, and commodity risk-management solutions for jewellers, bullion dealers and manufacturers exposed to gold and silver price volatility.',
  expertise: [
    'Equity & Derivatives Trading',
    'Mutual Fund Advisory',
    'Portfolio Management',
    'Commodity Risk Management & Hedging',
    'Client Relationship Management',
  ],
  certifications: ['NISM-certified investment professional', 'AMFI-registered mutual fund distributor'],
  association: 'Authorised Partner, Motilal Oswal Financial Services Ltd.',
  email: 'profitdexinvest@gmail.com',
  phone: '+91 9633776456',
}

export async function getOwnerProfile() {
  if (!supabase) return DEFAULT_OWNER_PROFILE

  const { data, error } = await supabase
    .from('owner_profile')
    .select('*')
    .limit(1)
    .maybeSingle()

  if (error || !data) return DEFAULT_OWNER_PROFILE
  return data
}
