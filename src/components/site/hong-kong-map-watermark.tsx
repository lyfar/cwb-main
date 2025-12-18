import { cn } from "@/lib/utils"

export function HongKongMapWatermark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 640"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]",
        className,
      )}
      fill="none"
    >
      <defs>
        <linearGradient id="hkfade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="currentColor" stopOpacity="0.6" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.25" />
        </linearGradient>
        <radialGradient id="hkhaze" cx="0.5" cy="0.35" r="0.85">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.18" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="640" height="640" fill="url(#hkhaze)" />

      <g
        stroke="url(#hkfade)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M114 392c34-44 68-62 116-78 38-13 68-9 112-3 39 5 63-8 88-30 22-19 38-47 47-85" />
        <path d="M156 452c40-36 70-52 118-62 52-11 89 3 130 18 38 13 75 7 106-18" />
        <path d="M196 250c18-22 40-36 74-42 42-7 76 7 112 18 26 8 58 7 88-4" />
        <path d="M252 506c27-28 62-44 106-48 37-4 67 5 103 14 26 7 52 7 78-2" />

        <path d="M210 304c-18 16-36 31-52 54-20 29-27 65-26 96 1 32 13 59 33 82" />
        <path d="M420 174c12 31 10 63-2 92-10 25-28 46-54 64" />

        <path d="M356 332c0 38-30 68-68 68s-68-30-68-68 30-68 68-68 68 30 68 68Z" />
        <path d="M288 266c22 12 35 34 35 58 0 31-23 58-58 64" />

        <path d="M316 352c0 30 22 55 22 55s22-25 22-55c0-14-9-27-22-27s-22 13-22 27Z" />
        <path d="M338 350a22 22 0 1 1-44 0 22 22 0 0 1 44 0Z" />
      </g>

      <g stroke="currentColor" strokeOpacity="0.25" strokeWidth="1">
        <path d="M80 120h480" />
        <path d="M80 220h480" />
        <path d="M80 320h480" />
        <path d="M80 420h480" />
        <path d="M80 520h480" />
        <path d="M120 80v480" />
        <path d="M220 80v480" />
        <path d="M320 80v480" />
        <path d="M420 80v480" />
        <path d="M520 80v480" />
      </g>
    </svg>
  )
}

