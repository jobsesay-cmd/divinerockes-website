'use client';

type Point = {
  date: string;
  total: number;
};

function formatDateLabel(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
  return dt.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function DashboardChart({ points }: { points: Point[] }) {
  if (!points.length) return <p className="text-sm text-slate-500">No activity data.</p>;

  const width = 900;
  const height = 260;
  const padding = 28;

  const maxY = Math.max(...points.map((p) => p.total), 1);
  const xStep = points.length > 1 ? (width - padding * 2) / (points.length - 1) : 0;

  const getX = (i: number) => padding + i * xStep;
  const getY = (v: number) => height - padding - (v / maxY) * (height - padding * 2);

  const polyline = points.map((p, i) => `${getX(i)},${getY(p.total)}`).join(' ');

  const area = [
    `M ${getX(0)} ${height - padding}`,
    ...points.map((p, i) => `L ${getX(i)} ${getY(p.total)}`),
    `L ${getX(points.length - 1)} ${height - padding}`,
    'Z',
  ].join(' ');

  const yTicks = [0, Math.ceil(maxY / 2), maxY];

  return (
    <div className="w-full overflow-x-auto rounded-lg border bg-white p-3">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-[260px] w-full min-w-[760px]">
        {yTicks.map((tick) => {
          const y = getY(tick);
          return (
            <g key={tick}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#e2e8f0" strokeWidth="1" />
              <text x={6} y={y + 4} fontSize="11" fill="#64748b">
                {tick}
              </text>
            </g>
          );
        })}

        <path d={area} fill="rgba(37,99,235,0.12)" />
        <polyline fill="none" stroke="#2563eb" strokeWidth="3" points={polyline} />

        {points.map((p, i) => (
          <circle key={p.date} cx={getX(i)} cy={getY(p.total)} r="3.5" fill="#2563eb">
            <title>{`${p.date}: ${p.total}`}</title>
          </circle>
        ))}

        <text x={getX(0)} y={height - 6} fontSize="11" fill="#64748b" textAnchor="start">
          {formatDateLabel(points[0].date)}
        </text>
        <text x={getX(Math.floor((points.length - 1) / 2))} y={height - 6} fontSize="11" fill="#64748b" textAnchor="middle">
          {formatDateLabel(points[Math.floor((points.length - 1) / 2)].date)}
        </text>
        <text x={getX(points.length - 1)} y={height - 6} fontSize="11" fill="#64748b" textAnchor="end">
          {formatDateLabel(points[points.length - 1].date)}
        </text>
      </svg>
    </div>
  );
}