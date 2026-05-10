import { useState } from 'react';

interface DataPoint {
    week: string;
    value: number;
    deals: number;
}

const chartData: DataPoint[] = [
    { week: 'W15', value: 820, deals: 18 },
    { week: 'W16', value: 1240, deals: 24 },
    { week: 'W17', value: 960, deals: 21 },
    { week: 'W18', value: 1580, deals: 32 },
    { week: 'W19', value: 1420, deals: 28 },
    { week: 'W20', value: 1780, deals: 35 },
    { week: 'W21', value: 1650, deals: 31 },
];

const maxValue = Math.max(...chartData.map((d) => d.value));
const chartW = 300;
const chartH = 100;
const padding = 5;

function getX(i: number): number {
    return padding + (i / (chartData.length - 1)) * (chartW - padding * 2);
}

function getY(val: number): number {
    return chartH - padding - ((val / maxValue) * (chartH - padding * 2));
}

function buildPath(): string {
    return chartData
        .map((d, i) => `${i === 0 ? 'M' : 'L'}${getX(i)},${getY(d.value)}`)
        .join(' ');
}

function buildAreaPath(): string {
    const line = buildPath();

    return `${line} L${getX(chartData.length - 1)},${chartH} L${getX(0)},${chartH} Z`;
}

export default function FundingTrendCard() {
    const [hovered, setHovered] = useState<number | null>(null);
    const totalVolume = chartData.reduce((s, d) => s + d.value, 0);
    const totalDeals = chartData.reduce((s, d) => s + d.deals, 0);
    const avgSize = totalVolume / totalDeals;

    return (
        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg mb-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-title-sm font-semibold">Funding Trend</h3>
                    <p className="text-label-caps font-mono font-bold text-on-surface-variant opacity-60">
                        This Month
                    </p>
                </div>
                <span className="text-secondary font-mono text-data-point font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                    +24%
                </span>
            </div>

            {/* Interactive SVG Chart */}
            <div className="h-32 w-full mb-6 relative">
                <svg
                    className="w-full h-full overflow-visible"
                    viewBox={`0 0 ${chartW} ${chartH}`}
                    preserveAspectRatio="none"
                >
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map((y) => (
                        <line key={y} x1="0" y1={y} x2={chartW} y2={y}
                            stroke="#e0e3e5" strokeWidth="0.5" strokeDasharray="4" />
                    ))}

                    {/* Area fill */}
                    <path d={buildAreaPath()} fill="url(#areaGradient)" opacity="0.15" />

                    {/* Gradient def */}
                    <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#006c49" />
                            <stop offset="100%" stopColor="#006c49" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Main line */}
                    <path d={buildPath()} fill="none" stroke="#006c49"
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ vectorEffect: 'non-scaling-stroke' }} />

                    {/* Interactive data points */}
                    {chartData.map((d, i) => (
                        <g key={i}>
                            {/* Invisible larger hit area */}
                            <circle cx={getX(i)} cy={getY(d.value)} r="12"
                                fill="transparent" cursor="pointer"
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)} />

                            {/* Visible dot */}
                            <circle cx={getX(i)} cy={getY(d.value)}
                                r={hovered === i ? 5 : 3}
                                fill={hovered === i ? '#006c49' : '#ffffff'}
                                stroke="#006c49" strokeWidth="2"
                                style={{
                                    transition: 'r 0.15s ease, fill 0.15s ease',
                                    vectorEffect: 'non-scaling-stroke',
                                }}
                                pointerEvents="none" />

                            {/* Vertical guide line on hover */}
                            {hovered === i && (
                                <line x1={getX(i)} y1={getY(d.value)}
                                    x2={getX(i)} y2={chartH}
                                    stroke="#006c49" strokeWidth="1" strokeDasharray="3"
                                    opacity="0.4"
                                    style={{ vectorEffect: 'non-scaling-stroke' }} />
                            )}
                        </g>
                    ))}
                </svg>

                {/* Tooltip */}
                {hovered !== null && (
                    <div
                        className="absolute bg-primary-container text-on-primary-container text-xs px-3 py-2 rounded-lg shadow-lg pointer-events-none z-10 font-mono whitespace-nowrap"
                        style={{
                            left: `${(getX(hovered) / chartW) * 100}%`,
                            top: `${(getY(chartData[hovered].value) / chartH) * 100 - 12}%`,
                            transform: 'translate(-50%, -100%)',
                        }}
                    >
                        <div className="font-bold text-sm">${chartData[hovered].value}M</div>
                        <div className="opacity-70">{chartData[hovered].deals} deals • {chartData[hovered].week}</div>
                    </div>
                )}

                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1 translate-y-5">
                    {chartData.map((d, i) => (
                        <span
                            key={i}
                            className={`text-[10px] font-mono transition-colors ${
                                hovered === i ? 'text-primary font-bold' : 'opacity-40'
                            }`}
                        >
                            {d.week}
                        </span>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="flex justify-between border-t border-outline-variant pt-4 mt-2">
                <div className="text-center">
                    <p className="text-label-caps font-mono font-bold text-on-surface-variant mb-1">VOLUME</p>
                    <p className="font-mono text-data-point font-medium">${(totalVolume / 1000).toFixed(1)}B</p>
                </div>
                <div className="text-center">
                    <p className="text-label-caps font-mono font-bold text-on-surface-variant mb-1">DEALS</p>
                    <p className="font-mono text-data-point font-medium">{totalDeals}</p>
                </div>
                <div className="text-center">
                    <p className="text-label-caps font-mono font-bold text-on-surface-variant mb-1">AVG SIZE</p>
                    <p className="font-mono text-data-point font-medium">${avgSize.toFixed(1)}M</p>
                </div>
            </div>
        </div>
    );
}
