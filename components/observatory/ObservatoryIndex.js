import Link from 'next/link';

const DIRECTION_COLORS = {
  degraded: 'text-red-600',
  improved: 'text-green-600',
};

export default function ObservatoryIndex({ reports, prompts }) {
  const promptMap = Object.fromEntries((prompts || []).map(p => [p.id, p]));

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Recent runs</h2>
        {reports.length === 0 ? (
          <p className="text-[#333333]">No runs yet — check back after the first weekly cron.</p>
        ) : (
          <ul className="divide-y divide-[#E5E5E5] border border-[#E5E5E5] rounded-lg overflow-hidden">
            {reports.map(r => {
              const fm = r.frontmatter;
              return (
                <li key={r.date}>
                  <Link
                    href={`/observatory/${r.date}`}
                    className="flex items-center justify-between px-5 py-4 hover:bg-[#F9F9F9] transition-colors"
                  >
                    <div>
                      <span className="font-medium text-[#1A1A1A]">{r.date}</span>
                      <span className="ml-3 text-sm text-gray-500">
                        {fm.total_prompts_run} prompts · {fm.total_models} models · {fm.total_calls} calls · ${Number(fm.total_cost_usd).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      {fm.broken && fm.broken.length > 0 && (
                        <span className="text-red-600">{fm.broken.length} broken</span>
                      )}
                      {fm.newly_passing && fm.newly_passing.length > 0 && (
                        <span className="text-green-600">{fm.newly_passing.length} newly passing</span>
                      )}
                      <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Top movers (latest run)</h2>
        {reports[0]?.frontmatter?.top_movers?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#E5E5E5] rounded-lg overflow-hidden">
              <thead className="bg-[#F9F9F9]">
                <tr>
                  <th className="text-left px-4 py-3 text-[#1A1A1A] font-semibold">Prompt</th>
                  <th className="text-left px-4 py-3 text-[#1A1A1A] font-semibold">Model</th>
                  <th className="text-left px-4 py-3 text-[#1A1A1A] font-semibold">Change</th>
                  <th className="text-left px-4 py-3 text-[#1A1A1A] font-semibold">Direction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {reports[0].frontmatter.top_movers.map((m, i) => {
                  const prompt = promptMap[m.prompt_id];
                  return (
                    <tr key={i} className="hover:bg-[#F9F9F9]">
                      <td className="px-4 py-3">
                        <Link
                          href={`/observatory/prompts/${m.prompt_id}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {prompt?.title || m.prompt_id}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">{m.model}</td>
                      <td className="px-4 py-3 font-medium">
                        {m.score_change > 0 ? '+' : ''}{m.score_change}
                      </td>
                      <td className={`px-4 py-3 font-medium capitalize ${DIRECTION_COLORS[m.direction] || ''}`}>
                        {m.direction}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-[#333333]">No significant movers in the latest run.</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Prompt corpus</h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {(prompts || []).map(p => (
            <li key={p.id}>
              <Link
                href={`/observatory/prompts/${p.id}`}
                className="block border border-[#E5E5E5] rounded-lg p-4 hover:bg-[#F9F9F9] transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium text-[#1A1A1A] leading-snug">{p.title}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded capitalize flex-shrink-0">
                    {p.category}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{p.models.length} models · added {p.added_date}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
