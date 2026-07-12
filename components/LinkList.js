import { useState } from 'react'
import LinkItem from './LinkItem'

export default function LinkList({ links }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const allTags = [...new Set(links.flatMap(link => link.tags || []))].sort()
  const allCategories = [...new Set(links.map(link => link.category).filter(Boolean))].sort()

  const filteredLinks = links.filter(link => {
    const matchesSearch =
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (link.url && link.url.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesTag = selectedTag === '' || (link.tags && link.tags.includes(selectedTag))
    const matchesCategory = selectedCategory === '' || link.category === selectedCategory
    return matchesSearch && matchesTag && matchesCategory
  })

  const groupedLinks = selectedCategory
    ? { [selectedCategory]: filteredLinks }
    : allCategories.reduce((acc, cat) => {
        const catLinks = filteredLinks.filter(l => l.category === cat)
        if (catLinks.length > 0) acc[cat] = catLinks
        return acc
      }, {})

  return (
    <div>
      <div className="bg-white/70 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700 rounded-lg p-4 mb-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-1">Поиск</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300/60 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white/80 dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400"
              placeholder="Найти ссылку..."
            />
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-1">Категория</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300/60 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white/80 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            >
              <option value="">Все категории</option>
              {allCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium mb-1">Тег</label>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300/60 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white/80 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            >
              <option value="">Все теги</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {Object.entries(groupedLinks).map(([category, catLinks]) => (
        <div key={category} className="mb-8">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <h2 className="text-base font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{category}</h2>
            <span className="text-[11px] text-gray-400 dark:text-gray-500 ml-1">{catLinks.length}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {catLinks.map(link => (
              <LinkItem key={link.id} link={link} />
            ))}
          </div>
        </div>
      ))}

      {filteredLinks.length === 0 && (
        <div className="bg-white/70 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700 rounded-lg p-8 text-center text-gray-500 dark:text-gray-400 shadow-sm">
          Ссылки не найдены.
        </div>
      )}
    </div>
  )
}