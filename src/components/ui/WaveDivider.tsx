export function WaveDivider({
  flip = false,
  className = "",
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`w-full overflow-hidden leading-none -mt-1 ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-20 w-full md:h-32"
        preserveAspectRatio="none"
      >
        {/* Define gradients and filters */}
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(5, 31, 20, 0.9)" />
            <stop offset="60%" stopColor="rgba(10, 55, 34, 0.95)" />
            <stop offset="100%" stopColor="var(--background)" />
          </linearGradient>

          <linearGradient id="waveGloss" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>

          <filter id="waveBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
          </filter>

          <radialGradient id="glowEffect" cx="50%" cy="0%">
            <stop offset="0%" stopColor="rgba(10, 55, 34, 0.5)" />
            <stop offset="100%" stopColor="rgba(10, 55, 34, 0)" />
          </radialGradient>
        </defs>

        {/* Base smooth wave layer */}
        <path
          d="M0 40C180 20 360 60 540 40C720 20 900 60 1080 40C1260 20 1350 35 1440 45V120H0V40Z"
          fill="url(#waveGradient)"
          filter="url(#waveBlur)"
        />

        {/* Middle flowing wave with curves */}
        <path
          d="M0 50C200 30 400 70 600 50C800 30 1000 70 1200 50C1300 40 1380 48 1440 55V120H0V50Z"
          fill="rgba(10, 60, 38, 0.55)"
          opacity="0.8"
        />

        {/* Glassmorphic surface layer */}
        <path
          d="M0 60C240 45 480 75 720 60C960 45 1200 75 1440 65V120H0V60Z"
          fill="rgba(255, 255, 255, 0.08)"
          opacity="0.6"
        />

        {/* Premium glossy highlight */}
        <path
          d="M0 55C300 40 600 70 900 55C1100 45 1300 52 1440 58V75H0V55Z"
          fill="url(#waveGloss)"
          opacity="0.4"
        />

        {/* Subtle glow accent at the top */}
        <ellipse
          cx="720"
          cy="40"
          rx="500"
          ry="30"
          fill="url(#glowEffect)"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
