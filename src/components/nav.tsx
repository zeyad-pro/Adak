export default function Nav({ onAddClick }: { onAddClick?: () => void }) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-black/20 border-b border-white/10 px-4 md:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <svg
            width="32"
            height="32"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
          >
            <g clipPath="url(#clip0_1113_4865)">
              <path
                d="M136 36C136 55.8823 119.882 72 100 72C80.1178 72 64 55.8823 64 36C64 16.1177 80.1178 0 100 0C119.882 0 136 16.1177 136 36Z"
                fill="#ffffff"
              />
              <path
                d="M4.38 62.6699C3.12 62.6699 1.87 62.6699 0.63 62.7699C0.212689 66.4419 0.00235673 70.1344 0 73.8299C0 128.83 44.77 173.45 100 173.45C101.26 173.45 102.5 173.45 103.75 173.36H105C157.91 170.76 200 127.21 200 73.8599C199.997 70.1647 199.79 66.4724 199.38 62.7999C146.47 65.3999 104.38 108.95 104.38 162.3C104.38 107.28 59.61 62.6699 4.38 62.6699Z"
                fill="#f3f4f6"
              />
              <path
                d="M105.1 175.33H103.61C103.031 175.33 102.44 175.35 101.843 175.369C101.233 175.39 100.616 175.41 100 175.41C76.5101 175.416 53.7366 167.322 35.5201 152.491C17.3035 137.661 4.75827 117.003 0 94C1 152.72 45.4 200 100 200C154.56 200 198.91 152.77 200 94.08C195.468 116.247 183.677 136.271 166.49 150.986C149.302 165.701 127.701 174.267 105.1 175.33Z"
                fill="#f5f5f5"
              />
            </g>
            <defs>
              <clipPath id="clip0_1113_4865">
                <rect width="200" height="200" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span className="text-2xl font-bold font-serif tracking-tight text-foreground">
            Adak
          </span>
        </div>

        {/* Action Button */}
        {onAddClick && (
          <button
            onClick={onAddClick}
            className="flex items-center gap-2 bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs md:text-sm font-medium px-4 py-2 rounded-xl border border-emerald-400/30 shadow-lg backdrop-blur-md transition-all active:scale-95"
          >
            <span>+</span>
            <span>New Challenge</span>
          </button>
        )}
      </div>
    </header>
  );
}