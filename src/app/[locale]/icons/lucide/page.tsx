'use client';

import { icons } from 'lucide-react';
import { useState, useMemo } from 'react';

// 定义分类及其关键词
const CATEGORIES = {
  'All': [],
  'Arrows & Direction': ['arrow', 'chevron', 'corner', 'move', 'rotate'],
  'Actions & Commands': ['add', 'delete', 'edit', 'save', 'send', 'share', 'settings', 'upload', 'download'],
  'Media & Devices': ['camera', 'video', 'mic', 'speaker', 'phone', 'tv', 'monitor'],
  'Files & Folders': ['file', 'folder', 'document'],
  'Users & Social': ['user', 'person', 'group', 'heart', 'message', 'mail'],
  'Home & Navigation': ['home', 'map', 'navigation', 'compass'],
  'Alerts & Status': ['alert', 'warning', 'error', 'check', 'x', 'info'],
  'Time & Date': ['clock', 'calendar'],
  'Finance & Shopping': ['dollar', 'credit', 'shopping', 'tag'],
  'Development & Code': ['code', 'terminal', 'braces', 'bug'],
  'Weather & Nature': ['sun', 'moon', 'cloud', 'snow', 'umbrella', 'tree']
};

// 将 icons 对象转换为数组，并添加分类信息
const allIcons = Object.entries(icons).map(([name, Component]) => ({
  name,
  Component,
  // 尝试根据名称匹配分类
  getCategory: () => {
    for (const [category, keywords] of Object.entries(CATEGORIES)) {
      if (category === 'All') continue;
      if (keywords.some(keyword => name.toLowerCase().includes(keyword))) {
        return category;
      }
    }
    return 'Other';
  }
}));

export default function IconBrowser() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // 使用 useMemo 进行性能优化，避免每次渲染都重新计算
  const filteredAndGroupedIcons = useMemo(() => {
    let filtered = allIcons;

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(icon =>
        icon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 分类过滤
    if (activeCategory !== 'All') {
      filtered = filtered.filter(icon =>
        activeCategory === 'Other' 
          ? icon.getCategory() === 'Other'
          : icon.getCategory() === activeCategory
      );
    }

    // 按分类分组
    const groups: Record<string, typeof filtered> = {};
    filtered.forEach(icon => {
      const category = activeCategory !== 'All' ? activeCategory : icon.getCategory();
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(icon);
    });

    // 确保 "Other" 分类存在
    if (activeCategory === 'All' && !groups['Other']) {
      groups['Other'] = [];
    }

    return groups;
  }, [searchTerm, activeCategory]);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Lucide Icons Browser</h1>
        <p className="text-gray-600 mb-8">Browse and search over 700+ beautiful open-source icons.</p>

        {/* 搜索栏 */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
            />
            <svg 
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
        </div>

        {/* 分类索引 */}
        <div className="mb-6 overflow-x-auto pb-2">
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
                {activeCategory === 'All' && category !== 'All' && (
                  <span className="ml-1 px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full text-xs">
                    {allIcons.filter(icon => icon.getCategory() === category).length}
                  </span>
                )}
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
                {iconsInGroup.map(({ name, Component }) => (
                  <div 
                    key={name} 
                    className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                    title={name}
                  >
                    <Component className="w-8 h-8 text-gray-700 mb-2 group-hover:text-blue-500 transition-colors" />
                    <span className="text-xs text-center text-gray-600 truncate w-full" title={name}>
                      {name}
                    </span>
                  </div>
                ))}
              </div>
              {iconsInGroup.length === 0 && (
                <p className="text-gray-500 text-center py-8">No icons found matching your criteria.</p>
              )}
            </div>
          ))}
        </div>

        {Object.keys(filteredAndGroupedIcons).length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{`No icons match "${searchTerm}"`}</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-2 text-blue-500 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}