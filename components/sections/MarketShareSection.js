import { useState } from 'react';

const SORT_COLS = {
  model: (a, b) => a.model.localeCompare(b.model),
  vendor: (a, b) => a.vendor.localeCompare(b.vendor),
  share_pct: (a, b) => b.share_pct - a.share_pct,
  change_pct: (a, b) => b.change_pct - a.change_pct,
};

function Sparkline({ values }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex items-end gap-px" style={{ height: 24, width: 72 }} aria-hidden="true">
      {values.map((v, i) => (
        <div
          key={i}
          className="flex-1 bg-blue-400 rounded-sm"
          style={{ height: `${Math.round((v / max) * 100)}%`, minHeight: v > 0 ? 2 : 0 }}
        />
      ))}
    </div>
  );
}

function ChangeCell({ value }) {
  if (value === 0) return <span className="text-gray-500 text-sm">0pp</span>;
  const isPos = value > 0;
  return (
    <span className={`text-sm font-medium ${isPos ? 'text-green-600' : 'text-red-500'}`}>
      {isPos ? '+' : ''}{value}pp
    </span>
  );
}

function SortButton({ col, current, dir, onClick, children }) {
  const active = current === col;
  return (
    <button
      onClick={() => onClick(col)}
      className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wide hover:text-blue-600 transition-colors ${active ? 'text-blue-600' : 'text-gray-600'}`}
    >
      {children}
      <span className="text-gray-400">
        {active ? (dir === 'asc' ? '▲' : '▼') : '▼'}
      </span>
    </button>
  );
}

export default function MarketShareSection({ snapshotData }) {
  const { _meta, models } = snapshotData;
  const [sortCol, setSortCol] = useState('share_pct');
  const [sortDir, setSortDir] = useState('desc');

  function handleSort(col) {
    if (sortCol === col) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(col);
      setSortDir('desc');
    }
  }

  const sorted = [...models].sort((a, b) => {
    const result = SORT_COLS[sortCol](a, b);
    return sortDir === 'asc' ? -result : result;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">AI Model Market Share</h2>
        <span className="text-sm text-gray-500">
          Snapshot: {_meta.period} &bull; Source data: {_meta.snapshot_date}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Directional share-of-usage estimates blended from three incommensurate developer-usage
        signals (OpenRouter API calls, Hugging Face downloads, Stack Overflow self-reports). Read
        as a normalized index of developer-facing usage among the tracked models in this snapshot,
        not a precise market-share figure - see methodology below. Click any column header to sort.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="py-3 px-3 text-left">
                <SortButton col="model" current={sortCol} dir={sortDir} onClick={handleSort}>Model</SortButton>
              </th>
              <th className="py-3 px-3 text-left">
                <SortButton col="vendor" current={sortCol} dir={sortDir} onClick={handleSort}>Vendor</SortButton>
              </th>
              <th className="py-3 px-3 text-right">
                <SortButton col="share_pct" current={sortCol} dir={sortDir} onClick={handleSort}>
                  Share signal (est.)
                </SortButton>
              </th>
              <th className="py-3 px-3 text-right">
                <SortButton col="change_pct" current={sortCol} dir={sortDir} onClick={handleSort}>
                  vs Prior Month
                </SortButton>
              </th>
              <th className="py-3 px-3 text-left hidden sm:table-cell">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                  6-Month Trend
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, idx) => (
              <tr
                key={row.id}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? '' : 'bg-gray-50/50'}`}
                title={row.note || undefined}
              >
                <td className="py-3 px-3 font-medium text-gray-900">{row.model}</td>
                <td className="py-3 px-3 text-gray-600">{row.vendor}</td>
                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-1.5 hidden md:block">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full"
                        style={{ width: `${Math.min(row.share_pct * 2.5, 100)}%` }}
                      />
                    </div>
                    <span className="font-semibold text-gray-900 tabular-nums">{row.share_pct}%</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-right">
                  <ChangeCell value={row.change_pct} />
                </td>
                <td className="py-3 px-3 hidden sm:table-cell">
                  <Sparkline values={row.trend} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Methodology</h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-2">
          {_meta.methodology}
        </p>
        <p className="text-xs text-gray-400">
          Sources: {_meta.data_sources.join(' | ')} | Trend months: {_meta.trend_months.join(', ')}
        </p>
      </div>
    </div>
  );
}
