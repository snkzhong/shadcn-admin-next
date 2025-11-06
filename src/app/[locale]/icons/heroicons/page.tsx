'use client';

import { useState, useMemo } from 'react';
import * as OutlineIcons from '@heroicons/react/24/outline';
import * as SolidIcons from '@heroicons/react/24/solid';

// 将导入的对象转换为数组，并统一格式
const allIcons = [
  ...Object.entries(OutlineIcons).map(([name, Component]) => ({ 
    name, 
    Component, 
    style: 'outline' as const,
    // 移除后缀 "Icon" 以便更友好地显示
    displayName: name.replace(/Icon$/, '')
  })),
  ...Object.entries(SolidIcons).map(([name, Component]) => ({ 
    name, 
    Component, 
    style: 'solid' as const,
    displayName: name.replace(/Icon$/, '')
  }))
];

// 定义分类关键词（可以根据需要调整）
const CATEGORIES = {
  'All': [],
  'Arrows & Navigation': ['Arrow', 'Backward', 'Forward', 'Chevron', 'Menu'],
  'Actions & Commands': ['Plus', 'Minus', 'Pencil', 'Trash', 'XMark', 'Check', 'Cog', 'Adjustments'],
  'Users & Social': ['User', 'Users', 'Heart', 'Chat', 'Bell'],
  'Media & Devices': ['Camera', 'VideoCamera', 'Phone', 'Computer', 'DevicePhoneMobile'],
  'Files & Documents': ['Document', 'Folder', 'Chart', 'Clipboard'],
  'Home & Business': ['Home', 'Building', 'Office', 'Banknotes'],
  'Time & Alerts': ['Clock', 'Calendar', 'Fire', 'Exclamation'],
  'Finance': ['CurrencyDollar', 'Wallet', 'Receipt'],
  'Development': ['CodeBracket', 'CommandLine', 'Terminal']
};

export default function HeroiconBrowser() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeStyle, setActiveStyle] = useState<'all' | 'outline' | 'solid'>('all');

  // 使用 useMemo 进行性能优化
  const filteredAndGroupedIcons = useMemo(() => {
    let filtered = allIcons;

    // 搜索过滤（基于显示名称）
    if (searchTerm) {
      filtered = filtered.filter(icon =>
        icon.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 风格过滤
    if (activeStyle !== 'all') {
      filtered = filtered.filter(icon => icon.style === activeStyle);
    }

    // 分类过滤
    if (activeCategory !== 'All') {
      const keywords = CATEGORIES[activeCategory as keyof typeof CATEGORIES];
      if (!keywords) filtered = [];
      filtered = filtered.filter(icon =>
        keywords.some(keyword => icon.name.includes(keyword))
      );
    }

    // 按分类分组
    const groups: Record<string, typeof filtered> = {};
    filtered.forEach(icon => {
      let category = 'Other';
      for (const [catName, keywords] of Object.entries(CATEGORIES)) {
        if (catName === 'All' || !keywords) continue;
        if (keywords.some(keyword => icon.name.includes(keyword))) {
          category = catName;
          break;
        }
      }
      
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(icon);
    });

    if (!groups['Other']) {
      groups['Other'] = [];
    }

    return groups;
  }, [searchTerm, activeStyle, activeCategory]);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Heroicons Browser</h1>
        <p className="text-gray-600 mb-8">Browse all icons from @heroicons/react.</p>

        {/* 控制区 */}
        <div className="flex flex-wrap gap-4 mb-8 items-end">
          {/* 搜索栏 */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g., home, user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* 风格选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
            <div className="flex space-x-2">
              {(['all', 'outline', 'solid'] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => setActiveStyle(style)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    activeStyle === style
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {style.charAt(0).toUpperCase() + style.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 分类索引 */}
        <div className="w-full mb-6 pb-2">
          <div className="flex flex-wrap space-x-2">
            {Object.keys(CATEGORIES).concat('Other').map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 mb-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 图标网格 */}
        <div className="space-y-8">
          {Object.entries(filteredAndGroupedIcons).map(([category, iconsInGroup]) => (
            <div key={category}>
              {(activeCategory === 'All') && (
                <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                  <span>{category}</span>
                  <span className="ml-2 px-2 py-1 bg-gray-200 text-gray-600 text-sm rounded-full">
                    {iconsInGroup.length}
                  </span>
                </h2>
              )}
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15 gap-4">
                {iconsInGroup.map(({ name, Component, style, displayName }) => (
                  <div 
                    key={`${name}-${style}`} 
                    className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    title={`${displayName} (${style})`}
                  >
                    <Component className={`w-8 h-8 mb-2 ${
                      style === 'solid' ? 'text-blue-500' : 'text-gray-700 group-hover:text-blue-500'
                    } transition-colors`} />
                    <span className="text-xs text-center text-gray-600 truncate w-full" title={displayName}>
                      {displayName}
                    </span>
                    <span className="text-[10px] text-gray-400">{style}</span>
                  </div>
                ))}
              </div>
              {iconsInGroup.length === 0 && (
                <p className="text-gray-500 text-center py-8">No icons found.</p>
              )}
            </div>
          ))}
        </div>

        {Object.keys(filteredAndGroupedIcons).length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No icons match your filters.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setActiveStyle('all');
                setActiveCategory('All');
              }}
              className="mt-2 text-blue-500 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}