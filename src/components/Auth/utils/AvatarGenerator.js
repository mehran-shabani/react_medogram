export const generateGeometricAvatar = (username) => {
    const hashCode = (str) => {
        return str.split('').reduce((acc, char, index) => {
            return char.charCodeAt(0) + ((acc << 5) - acc) + index;
        }, 0);
    };
    const generateColors = (baseHash) => {
        const hue = baseHash % 360;
        return [
            `hsl(${hue}, 70%, 45%)`,                    // رنگ اصلی
            `hsl(${(hue + 30) % 360}, 60%, 50%)`,      // رنگ ثانویه
            `hsl(${(hue + 60) % 360}, 50%, 55%)`       // رنگ مکمل
        ];
    };

    // تولید نقاط فیبوناچی
    const generateFibonacciPoints = (count, scale = 1) => {
        const PHI = (1 + Math.sqrt(5)) / 2;
        const points = [];
        for (let i = 0; i < count; i++) {
            const theta = i * PHI * 2 * Math.PI;
            const r = Math.sqrt(i) * scale;
            const x = 50 + r * Math.cos(theta);
            const y = 50 + r * Math.sin(theta);
            points.push({ x, y });
        }
        return points;
    };

    const generateMandalaPattern = (segments, radius) => {
        let path = '';
        for (let i = 0; i < segments; i++) {
            const angle = (i * 360) / segments;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);
            const control1x = radius * 0.5 * Math.cos(((angle + 30) * Math.PI) / 180);
            const control1y = radius * 0.5 * Math.sin(((angle + 30) * Math.PI) / 180);
            const control2x = radius * 0.5 * Math.cos(((angle - 30) * Math.PI) / 180);
            const control2y = radius * 0.5 * Math.sin(((angle - 30) * Math.PI) / 180);

            path += `M 50 50 C ${50 + control1x} ${50 + control1y}, ${50 + control2x} ${50 + control2y}, ${50 + x} ${50 + y}`;
        }
        return path;
    };

    const hash = hashCode(username);
    const colors = generateColors(hash);
    const fiboPoints = generateFibonacciPoints(8, 3);
    const mandalaSegments = 8 + (hash % 6) * 2;

    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <radialGradient id="backgroundGradient">
                    <stop offset="0%" style={{ stopColor: colors[0], stopOpacity: 0.9 }} />
                    <stop offset="100%" style={{ stopColor: colors[1], stopOpacity: 0.7 }} />
                </radialGradient>

                <filter id="glow">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* پس‌زمینه */}
            <rect width="100" height="100" fill="url(#backgroundGradient)" />

            {/* الگوی ماندالا */}
            <g filter="url(#glow)">
                <path
                    d={generateMandalaPattern(mandalaSegments, 35)}
                    fill="none"
                    stroke={colors[2]}
                    strokeWidth="0.5"
                    opacity="0.8"
                />
            </g>

            {/* نقاط فیبوناچی */}
            {fiboPoints.map((point, index) => (
                <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r={1.5}
                    fill={colors[2]}
                    opacity="0.6"
                />
            ))}

            {/* حلقه‌های مرکزی */}
            {[1, 2].map((ring, index) => (
                <circle
                    key={`ring-${index}`}
                    cx="50"
                    cy="50"
                    r={20 + ring * 10}
                    fill="none"
                    stroke={colors[1]}
                    strokeWidth="0.2"
                    opacity="0.3"
                />
            ))}

            {/* حرف مرکزی */}
            <g filter="url(#glow)">
                <text
                    x="50"
                    y="55"
                    textAnchor="middle"
                    fontSize="24"
                    fontFamily="Arial, sans-serif"
                    fill="#FFFFFF"
                    style={{
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                    }}
                >
                    {username.charAt(0)}
                </text>
            </g>
        </svg>
    );
};