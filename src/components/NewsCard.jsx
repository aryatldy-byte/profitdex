const TAG_STYLES = {
  high: 'bg-rose/10 text-rose border-rose/30',
  normal: 'bg-emerald/10 text-emerald border-emerald/30',
  low: 'bg-slate/10 text-slate border-slate/30',
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export default function NewsCard({ item }) {
  return (
    <article className="bg-white/60 border border-hairline rounded-sm p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-3 mb-3 text-xs">
        <span className="font-mono text-slate">{formatDate(item.date)}</span>
        <span className="text-hairline">/</span>
        <span className="uppercase tracking-wide text-slate">{item.category}</span>
        <span
          className={`ml-auto rounded-full border px-2.5 py-0.5 uppercase tracking-wide ${
            TAG_STYLES[item.tag] || TAG_STYLES.normal
          }`}
        >
          {item.tag === 'high' ? 'Priority' : item.tag === 'low' ? 'Minor' : 'Update'}
        </span>
      </div>
      <h3 className="font-display text-lg sm:text-xl text-ink mb-2 leading-snug">
        {item.headline}
      </h3>
      <p className="text-sm text-slate leading-relaxed">{item.body}</p>
      <p className="mt-3 text-xs text-slate-light">— {item.author}</p>
    </article>
  )
}
