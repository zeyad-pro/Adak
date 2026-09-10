export default function Footer() {
  return (
    <footer className="w-full mt-auto border-t border-white/10 bg-black/40 py-6 px-4 md:px-8 text-xs text-muted-foreground">
      <div className="max-w-7xl mx-auto flex flex-col items-center md:items-start justify-between gap-4">
        {/* LocalStorage Note */}
        <p className="text-white/60 text-center md:text-left">
          Your data is stored locally in your browser (LocalStorage). It will not be synced if you switch browsers or devices.
        </p>

        {/* Branding Credit */}
        <div className="flex items-center gap-1">
          <span>Powered by</span>
          <a
            href="https://prex-sand.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white transition-opacity hover:opacity-80"
          >
            PREX
          </a>
        </div>
      </div>
    </footer>
  );
}