export default function LinkItem({ link }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white/70 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700 rounded-lg p-4 hover:border-blue-400/60 dark:hover:border-blue-500 hover:bg-white dark:hover:bg-gray-800 transition-all block shadow-sm"
    >
      <div className="flex items-start gap-3">
        <img
          src={link.icon}
          alt=""
          className="w-7 h-7 rounded flex-shrink-0 mt-0.5"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-100 truncate">{link.title}</h3>
            {link.requiresVpn && (
              <span className="inline-flex items-center gap-1 text-[10px] bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 px-1.5 py-0.5 rounded flex-shrink-0" title="Требуется VPN для доступа">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                VPN
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{link.description}</p>
          {link.tags && link.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {link.tags.map(tag => (
                <span key={tag} className="bg-gray-200/60 dark:bg-gray-700 text-gray-500 dark:text-gray-300 px-1.5 py-0.5 rounded text-[10px]">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </a>
  )
}