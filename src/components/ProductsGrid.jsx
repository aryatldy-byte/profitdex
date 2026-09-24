import { useEffect, useState } from 'react'
import { getProducts } from '../data/productsService'

export default function ProductsGrid({ compact = false }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    let cancelled = false
    getProducts().then((items) => {
      if (!cancelled) setProducts(items)
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (products.length === 0) return null

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map((p, i) => (
        <div
          key={p.slug || p.id}
          className="bg-white/60 border border-hairline rounded-sm p-5 hover:border-gold/60 transition-colors"
        >
          <p className="font-mono text-xs text-gold mb-2">{String(i + 1).padStart(2, '0')}</p>
          <h3 className="font-display text-base text-ink mb-1.5">{p.name}</h3>
          {!compact && <p className="text-sm text-slate leading-relaxed">{p.description}</p>}
        </div>
      ))}
    </div>
  )
}
