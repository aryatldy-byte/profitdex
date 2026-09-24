import ProductsGrid from '../components/ProductsGrid'
import { useAccountModal } from '../context/AccountModalContext'

export default function Products() {
  const { openModal } = useAccountModal()

  return (
    <div>
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold mb-4">Products</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight max-w-3xl">
            Everything you need under one desk.
          </h1>
          <p className="text-paper/75 text-base sm:text-lg max-w-2xl leading-relaxed mt-5">
            From opening your first trading account to managing commodity price risk, our product
            suite covers the full range of investing, trading and protection needs.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <ProductsGrid />
      </section>

      <section className="bg-ink-2">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl text-paper mb-2">
              Not sure which product fits you?
            </h2>
            <p className="text-paper/70 text-sm max-w-md">
              Share your details and our desk will help you choose the right product to get
              started.
            </p>
          </div>
          <button
            onClick={openModal}
            className="shrink-0 rounded-sm bg-gold px-6 py-3 text-sm font-medium text-ink hover:bg-gold/90 transition-colors"
          >
            Get started
          </button>
        </div>
      </section>
    </div>
  )
}
