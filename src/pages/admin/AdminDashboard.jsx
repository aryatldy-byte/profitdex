import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { addNews, deleteNews, getAllNews, updateNews } from '../../data/newsService'

const CATEGORIES = ['Macro', 'Equities', 'Commodities', 'Mutual Funds', 'General']
const TAGS = [
  { value: 'high', label: 'Priority' },
  { value: 'normal', label: 'Update' },
  { value: 'low', label: 'Minor' },
]

const EMPTY_FORM = {
  headline: '',
  category: 'Macro',
  body: '',
  tag: 'normal',
  date: new Date().toISOString().slice(0, 10),
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('')

  const loadNews = async () => {
    setLoading(true)
    const items = await getAllNews()
    setNews(items)
    setLoading(false)
  }

  useEffect(() => {
    loadNews()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const resetForm = () => {
    setForm(EMPTY_FORM)
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.headline.trim() || !form.body.trim()) return

    if (editingId) {
      await updateNews(editingId, form)
      setStatus('Update saved.')
    } else {
      await addNews({ ...form, author: user?.name || 'Profitdex Admin' })
      setStatus('Market update published.')
    }
    resetForm()
    await loadNews()
    setTimeout(() => setStatus(''), 2500)
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setForm({
      headline: item.headline,
      category: item.category,
      body: item.body,
      tag: item.tag,
      date: item.date,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this market update? This cannot be undone.')) return
    await deleteNews(id)
    if (editingId === id) resetForm()
    await loadNews()
  }

  return (
    <div className="bg-paper-2 min-h-[calc(100vh-64px)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-slate">Admin</p>
            <h1 className="font-display text-2xl sm:text-3xl text-ink">Manage market updates</h1>
          </div>
          <span className="text-xs font-mono text-slate bg-white/70 border border-hairline rounded-full px-3 py-1.5">
            {news.length} published
          </span>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6">
          {/* Publish / edit form */}
          <div className="bg-white/70 border border-hairline rounded-sm p-6 h-fit lg:sticky lg:top-24">
            <h2 className="font-display text-lg text-ink mb-4">
              {editingId ? 'Edit update' : 'Publish new update'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="headline" className="block text-xs uppercase tracking-wide text-slate mb-1.5">
                  Headline
                </label>
                <input
                  id="headline"
                  name="headline"
                  required
                  value={form.headline}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-hairline bg-paper px-3 py-2.5 text-sm text-ink focus:border-emerald"
                  placeholder="e.g. RBI holds repo rate steady at 6.5%"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="category" className="block text-xs uppercase tracking-wide text-slate mb-1.5">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-hairline bg-paper px-3 py-2.5 text-sm text-ink focus:border-emerald"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="tag" className="block text-xs uppercase tracking-wide text-slate mb-1.5">
                    Priority
                  </label>
                  <select
                    id="tag"
                    name="tag"
                    value={form.tag}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-hairline bg-paper px-3 py-2.5 text-sm text-ink focus:border-emerald"
                  >
                    {TAGS.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="date" className="block text-xs uppercase tracking-wide text-slate mb-1.5">
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-hairline bg-paper px-3 py-2.5 text-sm text-ink focus:border-emerald"
                />
              </div>

              <div>
                <label htmlFor="body" className="block text-xs uppercase tracking-wide text-slate mb-1.5">
                  Details
                </label>
                <textarea
                  id="body"
                  name="body"
                  required
                  rows={5}
                  value={form.body}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-hairline bg-paper px-3 py-2.5 text-sm text-ink focus:border-emerald resize-none"
                  placeholder="Write the update as clients will read it..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 rounded-sm bg-emerald px-4 py-2.5 text-sm font-medium text-paper hover:bg-emerald-light transition-colors"
                >
                  {editingId ? 'Save changes' : 'Publish update'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-sm border border-hairline px-4 py-2.5 text-sm text-slate hover:border-ink hover:text-ink transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
              {status && <p className="text-xs text-emerald pt-1">{status}</p>}
            </form>
          </div>

          {/* Published list */}
          <div>
            <h2 className="font-display text-lg text-ink mb-4">Published updates</h2>
            {loading ? (
              <p className="text-sm text-slate">Loading…</p>
            ) : news.length === 0 ? (
              <div className="bg-white/70 border border-hairline rounded-sm p-8 text-center text-sm text-slate">
                No updates published yet. Use the form to publish your first one.
              </div>
            ) : (
              <div className="space-y-3">
                {news.map((item) => (
                  <div key={item.id} className="bg-white/70 border border-hairline rounded-sm p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate mb-1.5">
                          <span className="font-mono">{item.date}</span>
                          <span>·</span>
                          <span className="uppercase tracking-wide">{item.category}</span>
                        </div>
                        <h3 className="font-display text-base text-ink">{item.headline}</h3>
                        <p className="text-sm text-slate mt-1 line-clamp-2">{item.body}</p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-xs rounded-sm border border-hairline px-3 py-1.5 text-slate hover:border-ink hover:text-ink transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-xs rounded-sm border border-rose/30 px-3 py-1.5 text-rose hover:bg-rose/10 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
