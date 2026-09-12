const TICKER_ITEMS = [
  { symbol: 'NIFTY 50', value: '24,812.35', change: '+0.42%', up: true },
  { symbol: 'SENSEX', value: '81,204.10', change: '+0.38%', up: true },
  { symbol: 'BANK NIFTY', value: '51,930.60', change: '-0.15%', up: false },
  { symbol: 'GOLD (10g)', value: '₹73,410', change: '+0.21%', up: true },
  { symbol: 'USD/INR', value: '83.92', change: '-0.06%', up: false },
  { symbol: 'CRUDE OIL', value: '$78.40', change: '-0.63%', up: false },
  { symbol: 'NASDAQ', value: '18,712.55', change: '+0.71%', up: true },
]

function TickerItem({ item }) {
  return (
    <span className="inline-flex items-center gap-2 px-6 whitespace-nowrap font-mono text-xs">
      <span className="text-paper/60">{item.symbol}</span>
      <span className="text-paper">{item.value}</span>
      <span className={item.up ? 'text-emerald-light' : 'text-rose'}>
        {item.up ? '▲' : '▼'} {item.change}
      </span>
    </span>
  )
}

export default function MarketTicker() {
  return (
    <div className="bg-ink-2 border-y border-hairline-dark overflow-hidden" aria-hidden="true">
      <div className="flex ticker-track w-max py-2">
        <div className="flex">
          {TICKER_ITEMS.map((item, i) => (
            <TickerItem key={`a-${i}`} item={item} />
          ))}
        </div>
        <div className="flex">
          {TICKER_ITEMS.map((item, i) => (
            <TickerItem key={`b-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
