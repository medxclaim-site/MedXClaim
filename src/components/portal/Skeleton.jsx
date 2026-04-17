export const SkeletonCard = () => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 animate-pulse">
    <div className="h-3 bg-white/10 rounded w-2/3 mb-3" />
    <div className="h-8 bg-white/10 rounded w-1/3" />
  </div>
);

export const SkeletonRow = () => (
  <tr className="animate-pulse">
    {[1, 2, 3, 4, 5].map((i) => (
      <td key={i} className="px-4 py-3">
        <div className="h-3 bg-white/10 rounded" />
      </td>
    ))}
  </tr>
);

export const SkeletonTable = ({ rows = 5 }) => (
  <div className="overflow-x-auto rounded-2xl border border-white/10">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-white/10">
          {['Date', 'Hours', 'Amount', 'Status', 'Actions'].map((h) => (
            <th
              key={h}
              className="text-left px-4 py-3 text-xs uppercase tracking-wider text-slate-500 font-medium"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {Array.from({ length: rows }).map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </tbody>
    </table>
  </div>
);
