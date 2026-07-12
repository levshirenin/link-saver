import { useState, useEffect } from 'react'
import LinkList from '../components/LinkList'
import { useTheme } from '../components/ThemeContext'

export default function HomePage() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const { dark, toggle } = useTheme()

  useEffect(() => {
    fetch('/links.json')
      .then(res => res.json())
      .then(data => setLinks(data))
      .catch(err => console.error('Error:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#eef0f2] dark:bg-gray-900 flex items-center justify-center transition-colors">
        <div className="text-xl text-gray-500 dark:text-gray-400">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#eef0f2] dark:bg-gray-900 transition-colors">
      <div className="border-b border-gray-200/70 dark:border-gray-800 bg-[#eef0f2]/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <svg className="w-10 h-10 text-blue-600 dark:text-blue-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <div>
              <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-100">Копилка полезных ресурсов</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Коллекция полезных ссылок</p>
            </div>
          </div>
          <button
            onClick={toggle}
            className="p-2.5 rounded-lg border border-gray-300/60 dark:border-gray-700 hover:bg-gray-200/50 dark:hover:bg-gray-800 transition-colors text-lg"
            title={dark ? 'Светлая тема' : 'Тёмная тема'}
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <LinkList links={links} />
      </div>
    </div>
  )
}