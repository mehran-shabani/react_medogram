export const generateGeometricAvatar = (username) => {
    // Hash generation functions
    const hashCode = (str) => {
        return str.split('').reduce((acc, char, index) => {
            return char.charCodeAt(0) + ((acc << 5) - acc) + index;
        }, 0);
    };

    const intToRGB = (i) => {
        const c = (i & 0x00FFFFFF).toString(16).toUpperCase();
        return "00000".substring(0, 6 - c.length) + c;
    };

    // Generate multiple colors based on username
    const generateColors = (baseHash) => {
        const colors = [];
        for (let i = 0; i < 3; i++) {
            const newHash = (baseHash * (i + 1)) % 16777215; // 16777215 = FFFFFF in decimal
            colors.push(`#${intToRGB(newHash)}`);
        }
        return colors;
    };

    // Generate random patterns based on username
    const generatePatterns = (hash) => {
        const patterns = [];
        const numPatterns = (hash % 5) + 3; // 3-7 patterns

        for (let i = 0; i < numPatterns; i++) {
            const patternHash = (hash * (i + 1)) % 100;
            patterns.push(patternHash);
        }
        return patterns;
    };

    const hash = hashCode(username);
    const [primaryColor, secondaryColor, accentColor] = generateColors(hash);
    const patterns = generatePatterns(hash);

    // Calculate positions and sizes based on hash
    const calculatePosition = (index, total) => {
        const angle = (360 / total) * index;
        const radius = 25;
        const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
        const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
        return { x, y };
    };

    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Background */}
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: primaryColor, stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: secondaryColor, stopOpacity: 1 }} />
                </linearGradient>

                {/* Pattern definitions */}
                <pattern id="pattern1" patternUnits="userSpaceOnUse" width="10" height="10">
                    <circle cx="5" cy="5" r="1" fill={accentColor} />
                </pattern>

                <filter id="shadow">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                    <feOffset dx="0" dy="1" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3" />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Base background */}
            <rect width="100" height="100" fill="url(#gradient)" />

            {/* Pattern overlay */}
            <rect width="100" height="100" fill="url(#pattern1)" opacity="0.1" />

            {/* Central design */}
            <g filter="url(#shadow)">
                <circle cx="50" cy="50" r="30" fill={secondaryColor} opacity="0.8" />
                {patterns.map((pattern, index) => {
                    const { x, y } = calculatePosition(index, patterns.length);
                    const size = (pattern % 10) + 5;
                    const rotation = pattern * 20;

                    return (
                        <g key={index} transform={`rotate(${rotation}, ${x}, ${y})`}>
                            <circle
                                cx={x}
                                cy={y}
                                r={size}
                                fill={accentColor}
                                opacity="0.8"
                            />
                            <path
                                d={`M ${x} ${y - size} L ${x + size} ${y + size} L ${x - size} ${y + size} Z`}
                                fill={primaryColor}
                                opacity="0.6"
                            />
                        </g>
                    );
                })}
            </g>

            {/* Decorative elements */}
            <circle cx="50" cy="50" r="35"
                    fill="none"
                    stroke={accentColor}
                    strokeWidth="0.5"
                    strokeDasharray="3,3" />

            {/* Initial letter (optional) */}
            {username && (
                <text
                    x="50"
                    y="55"
                    textAnchor="middle"
                    fontSize="20"
                    fontFamily="Arial, sans-serif"
                    fill="#fff"
                    filter="url(#shadow)"
                >
                    {username.charAt(0).toUpperCase()}
                </text>
            )}

            {/* Additional geometric shapes based on username */}
            {patterns.map((pattern, index) => {
                const angle = (360 / patterns.length) * index;
                const radius = 40;
                const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
                const size = (pattern % 5) + 2;

                return (
                    <g key={`shape-${index}`}>
                        <circle
                            cx={x}
                            cy={y}
                            r={size}
                            fill={primaryColor}
                            opacity="0.3"
                        >
                            <animate
                                attributeName="r"
                                values={`${size};${size + 1};${size}`}
                                dur="2s"
                                repeatCount="indefinite"
                            />
                        </circle>
                    </g>
                );
            })}
        </svg>
    );
};