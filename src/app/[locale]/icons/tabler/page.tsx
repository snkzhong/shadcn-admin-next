export default function IconBrowser() {
  return (
    <></>
  )
}

// 'use client';

// import { useState, useMemo } from 'react';
// // 导入所有图标
// import * as TablerIcons from '@tabler/icons-react';

// // 移除非图标组件，并确保导出的是 React 组件
// const {
//   ThemeContext,
//   useTheme,
//   IconContext,
//   createReactComponent,
//   ...iconComponents
// } = TablerIcons;

// // 将图标对象转换为数组 [{ name, Component, displayName }]
// const allIcons = Object.entries(iconComponents)
//   .map(([name, MaybeComponent]) => {
//     const Component = 
//       typeof MaybeComponent === 'object' && MaybeComponent !== null 
//         ? (MaybeComponent as any).render || MaybeComponent 
//         : MaybeComponent;

//     return {
//       name,
//       Component: Component as React.ComponentType<{ className?: string; [key: string]: any }>,
//       displayName: name
//         .replace(/^Icon/, '')
//         .replace(/([a-z])([A-Z])/g, '$1 $2')
//         .trim(),
//     };
//   })
//   // ✅ 再次确保 Component 是函数
//   .filter(({ Component }) => typeof Component === 'function');
// console.log("allIcons:", allIcons);
// // 定义分类及其关键词
// const CATEGORIES = {
//   'All': [],
//   'Arrows & Direction': ['Arrow', 'Chevron', 'Sign', 'Navigate'],
//   'Actions & Commands': ['Add', 'Delete', 'Edit', 'Settings', 'Share', 'Download', 'Upload', 'Copy'],
//   'Users & Social': ['User', 'Friends', 'Message', 'Mail', 'Heart', 'Bell'],
//   'Files & Folders': ['File', 'Folder', 'Document', 'Page'],
//   'Home & Business': ['Home', 'Building', 'Office', 'Bank', 'Store'],
//   'Time & Date': ['Clock', 'Calendar', 'Timer', 'History'],
//   'Media & Devices': ['Camera', 'Video', 'Phone', 'Computer', 'Tv', 'Speaker'],
//   'Finance & Shopping': ['Money', 'Payment', 'Coin', 'Shopping', 'Tag', 'Receipt'],
//   'Development & Code': ['Code', 'Terminal', 'Braces', 'Bug'],
//   'Weather & Nature': ['Sun', 'Moon', 'Cloud', 'Snow', 'Umbrella', 'Tree', 'Wind'],
//   'Maps & Location': ['Map', 'Location', 'Pin', 'Route'],
//   'Alerts & Status': ['Alert', 'Warning', 'Error', 'Check', 'X', 'Info', 'Question'],
//   'Other': [] // 👈 确保 'Other' 被包含，避免 undefined 错误
// };

// export default function TablerIconBrowser() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All');

//   const filteredAndGroupedIcons = useMemo(() => {
//     let filtered = allIcons;

//     // 搜索过滤
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(icon =>
//         icon.displayName.toLowerCase().includes(term) ||
//         icon.name.toLowerCase().includes(term)
//       );
//     }

//     // 分类过滤（除了 'All' 和 'Other'）
//     if (activeCategory !== 'All') {
//       const keywords = CATEGORIES[activeCategory as keyof typeof CATEGORIES];
//       if (keywords.length > 0) {
//         filtered = filtered.filter(icon =>
//           keywords.some(keyword => icon.name.includes(keyword))
//         );
//       }
//       // 如果是 'Other' 分类，则筛选出不属于任何预定义分类的图标
//       else if (activeCategory === 'Other') {
//         filtered = filtered.filter(icon => {
//           // 检查该图标是否不属于任何一个有关键词的分类
//           return !Object.entries(CATEGORIES).some(([cat, keys]) => {
//             return cat !== 'All' && cat !== 'Other' && Array.isArray(keys) && 
//                    keys.some(keyword => icon.name.includes(keyword));
//           });
//         });
//       }
//     }

//     // 按当前激活的分类分组（仅当显示 'All' 时才分组）
//     const groups: Record<string, typeof filtered> = {};
//     if (activeCategory === 'All') {
//       filtered.forEach(icon => {
//         let category = 'Other';
//         for (const [catName, keywords] of Object.entries(CATEGORIES)) {
//           if (catName === 'All' || catName === 'Other') continue;
//           if (keywords.some(keyword => icon.name.includes(keyword))) {
//             category = catName;
//             break;
//           }
//         }
//         if (!groups[category]) groups[category] = [];
//         groups[category].push(icon);
//       });
//     } else {
//       // 如果是单一分类视图，只显示一个组
//       groups[activeCategory] = filtered;
//     }

//     return groups;
//   }, [searchTerm, activeCategory]);

//   // 用于渲染分类标签的列表（使用 Set 去重，更安全）
//   const categoryList = Array.from(new Set([
//     ...Object.keys(CATEGORIES)
//   ]));

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
//       <div className="mx-auto">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-slate-800 mb-2">Tabler Icons Browser</h1>
//           <p className="text-slate-600 mb-6">Browse over 5000+ free, open-source icons.</p>
//         </div>

//         {/* 搜索栏 */}
//         <div className="max-w-md mx-auto mb-8">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search icons by name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-slate-700 placeholder-slate-400"
//             />
//             <svg className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <circle cx="11" cy="11" r="8" strokeWidth="2"/>
//               <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
//             </svg>
//           </div>
//         </div>

//         {/* 分类索引 */}
//         <div className="mb-8 overflow-x-auto pb-2">
//           <div className="flex flex-wrap gap-2 justify-center">
//             {categoryList.map((category) => {
//               // 计算该分类下的图标数量（仅在 All 视图下）
//               const count = activeCategory === 'All' && category !== 'All'
//                 ? (() => {
//                     const keywords = CATEGORIES[category as keyof typeof CATEGORIES];
//                     if (category === 'Other') {
//                       // 'Other' 的数量是动态计算的
//                       return allIcons.filter(icon => {
//                         return !Object.entries(CATEGORIES).some(([cat, keys]) => {
//                           return cat !== 'All' && cat !== 'Other' && Array.isArray(keys) &&
//                                  keys.some(keyword => icon.name.includes(keyword));
//                         });
//                       }).length;
//                     }
//                     return allIcons.filter(icon =>
//                       keywords.some(keyword => icon.name.includes(keyword))
//                     ).length;
//                   })()
//                 : undefined;

//               return (
//                 <button
//                   key={category}
//                   onClick={() => setActiveCategory(category)}
//                   className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all transform hover:scale-105 ${
//                     activeCategory === category
//                       ? 'bg-blue-500 text-white shadow-lg'
//                       : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-sm'
//                   }`}
//                 >
//                   {category}
//                   {count !== undefined && (
//                     <span className="ml-2 bg-white bg-opacity-20 text-white text-xs px-2 py-0.5 rounded-full">
//                       {count}
//                     </span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* 图标网格 */}
//         <div className="space-y-10">
//           {Object.entries(filteredAndGroupedIcons).map(([category, iconsInGroup]) => (
//             <div key={category}>
//               {activeCategory === 'All' && (
//                 <div className="flex items-center justify-between mb-5">
//                   <h2 className="text-2xl font-semibold text-slate-700 flex items-center">
//                     {category}
//                     <span className="ml-3 inline-flex items-center justify-center w-7 h-7 bg-slate-100 text-slate-500 text-sm font-medium rounded-full">
//                       {iconsInGroup.length}
//                     </span>
//                   </h2>
//                 </div>
//               )}
              
//               <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15 gap-6">
//                 {iconsInGroup.map(({ name, Component, displayName }) => (
//                   // ✅ 正确：作为 JSX 组件渲染
//                   <div 
//                     key={name} 
//                     className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
//                     title={`${displayName} (${name})`}
//                   >
//                     <Component 
//                       className="w-10 h-10 text-slate-700 mb-2 group-hover:text-blue-600 transition-colors duration-200" 
//                     />
//                     <span 
//                       className="text-xs text-center text-slate-600 truncate w-full font-medium"
//                       title={displayName}
//                     >
//                       {displayName}
//                     </span>
//                   </div>
//                 ))}
//               </div>
              
//               {iconsInGroup.length === 0 && (
//                 <p className="text-slate-400 text-center py-12 italic">
//                   No icons match your criteria.
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>

//         {Object.keys(filteredAndGroupedIcons).length === 0 && searchTerm && (
//           <div className="text-center py-16">
//             <p className="text-slate-500 text-lg">No icons found for "{searchTerm}"</p>
//             <button 
//               onClick={() => setSearchTerm('')}
//               className="mt-3 text-blue-600 hover:text-blue-700 font-medium"
//             >
//               Clear search
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }