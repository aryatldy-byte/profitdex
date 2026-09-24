import { useEffect, useState } from 'react'
import { getOwnerProfile } from '../data/ownerService'

export default function OwnerProfile() {
  const [owner, setOwner] = useState(null)

  useEffect(() => {
    let cancelled = false
    getOwnerProfile().then((data) => {
      if (!cancelled) setOwner(data)
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (!owner) return null

  const expertise = owner.expertise || []
  const certifications = owner.certifications || []

  return (
    <div className="bg-white/70 border border-hairline rounded-sm p-6 sm:p-8 grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-start">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-ink text-paper font-display text-2xl">
        {owner.full_name
          ?.split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)}
      </div>

      <div>
        <h3 className="font-display text-xl text-ink">{owner.full_name}</h3>
        {owner.designation && (
          <p className="text-sm text-gold font-medium mt-0.5 mb-3">{owner.designation}</p>
        )}
        {owner.bio && <p className="text-sm text-slate leading-relaxed mb-4">{owner.bio}</p>}

        {expertise.length > 0 && (
          <div className="mb-4">
            <p className="text-xs uppercase tracking-wide text-slate mb-2">Areas of expertise</p>
            <div className="flex flex-wrap gap-2">
              {expertise.map((item) => (
                <span
                  key={item}
                  className="text-xs rounded-full border border-hairline px-3 py-1 text-ink bg-paper-2"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div className="mb-4">
            <p className="text-xs uppercase tracking-wide text-slate mb-2">Certifications</p>
            <ul className="space-y-1 text-sm text-slate">
              {certifications.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-emerald">—</span> {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {owner.association && (
          <div>
            <p className="text-xs uppercase tracking-wide text-slate mb-1">Current association</p>
            <p className="text-sm text-ink">{owner.association}</p>
          </div>
        )}
      </div>
    </div>
  )
}
