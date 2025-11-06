在 Next.js App Router 项目中使用 Tailwind CSS 接入 Google Maps，可以分为以下几个步骤。这里以 客户端组件 的方式加载地图为例，因为 Google Maps JavaScript API 需要在浏览器环境中运行。

✅ 步骤概览

1. 获取 Google Maps API Key
2. 在 next.config.mjs 中配置环境变量或直接引入脚本
3. 创建一个用于显示地图的 Client Component
4. 使用 useEffect 和动态脚本加载（可选）来安全加载 Google Maps JS API
5. 渲染地图并应用 Tailwind 样式

🔑 第一步：获取 Google Maps API Key

前往 [Google Cloud Console](https://console.cloud.google.com/)：
创建项目或选择已有项目
启用以下 API：
Maps JavaScript API
Places API（如果需要搜索功能）
创建凭证（API Key）
设置限制（建议设置 HTTP 引用来源以提高安全性）

记下你的 API Key，例如：AIzaSyABC123...

🛠️ 第二步：配置环境变量（推荐）

创建 .env.local 文件：

env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
注意：必须加上 NEXT_PUBLIC_ 前缀才能在前端访问。

💡 第三步：创建地图组件（Client Component）

创建文件 components/GoogleMap.jsx 或 .tsx

jsx
// components/GoogleMap.jsx
'use client';

import { useEffect, useRef } from 'react';

export default function GoogleMap({ center = { lat: 37.7749, lng: -122.4194 }, zoom = 10 }) {
const mapRef = useRef(null);

useEffect(() => {
if (!mapRef.current) return;

const script = document.createElement('script');
script.src = https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap;
script.async = true;
script.defer = true;

// 定义回调函数
window.initMap = function () {
new google.maps.Map(mapRef.current, {
center,
zoom,
mapTypeId: 'roadmap',
});
};

// 插入脚本
document.head.appendChild(script);

// 清理：避免重复加载
return () => {
document.head.removeChild(script);
delete window.initMap;
};
}, [center, zoom]);

return (
<div
ref={mapRef}
className="w-full h-96 rounded-lg shadow-md border"
style={{ minHeight: '400px' }}
/>
);
}
⚠️ 注意：callback=initMap 是必需的，用于异步加载完成后的初始化。

🧱 第四步：在页面中使用地图组件

比如在 app/page.js 中：

jsx
// app/page.js
import GoogleMap from '@/components/GoogleMap';

export default function Home() {
return (
<main className="p-6 max-w-4xl mx-auto">
<h1 className="text-2xl font-bold mb-4">My Google Map</h1>
<GoogleMap
center={{ lat: 40.7128, lng: -74.0060 }} // 纽约
zoom={12}
/>
</main>
);
}

🎨 第五步：Tailwind 样式优化

你可以用 Tailwind 控制容器大小、边框、阴影等：

jsx
<div
ref={mapRef}
className="w-full h-96 md:h-[500px] lg:h-[600px] rounded-xl border-2 border-gray-200 shadow-lg transition-shadow hover:shadow-xl"
/>

✅ 可选改进：防止多次加载 Google Maps 脚本

上面的方法每次渲染都会插入 <script>，可能导致重复加载。可以用一个简单的状态管理避免：

js
// 改进思路：全局标记是否已加载
if (!window.googleMapsLoaded) {
window.googleMapsLoaded = true;
// 动态加载脚本...
}

或者使用更高级的方式，如自定义 Hook：

js
// hooks/useLoadGoogleMaps.js
import { useEffect, useState } from 'react';

export function useLoadGoogleMaps() {
const [loaded, setLoaded] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
if (typeof window === 'undefined') return;

if (window.google && window.google.maps) {
setLoaded(true);
return;
}

if (document.querySelector(script[src*="maps.googleapis.com"])) {
// 已经有脚本在加载
const checkInterval = setInterval(() => {
if (window.google?.maps) {
clearInterval(checkInterval);
setLoaded(true);
}
}, 100);
return () => clearInterval(checkInterval);
}

const script = document.createElement('script');
script.src = https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&v=weekly;
script.async = true;
script.defer = true;

script.onload = () => setLoaded(true);
script.onerror = () => {
setError(new Error('Failed to load Google Maps'));
setLoaded(false);
};

document.head.appendChild(script);

return () => {
document.head.removeChild(script);
};
}, []);

return { loaded, error };
}

然后在组件中使用：

jsx
'use client';
import { useEffect, useRef } from 'react';
import { useLoadGoogleMaps } from '@/hooks/useLoadGoogleMaps';

export default function GoogleMap({ center = { lat: 37.7749, lng: -122.4194 }, zoom = 10 }) {
const mapRef = useRef(null);
const { loaded, error } = useLoadGoogleMaps();

useEffect(() => {
if (!mapRef.current !loaded) return;

new google.maps.Map(mapRef.current, {
center,
zoom,
});
}, [loaded, center, zoom]);

if (error) return <div className="text-red-500">Error loading map</div>;
if (!loaded) return <div className="w-full h-96 flex items-center justify-center">Loading map...</div>;

return (
<div
ref={mapRef}
className="w-full h-96 rounded-lg border shadow"
/>
);
}

📌 总结

步骤 内容
------ ------
✅ 必须 使用 'use client' 声明客户端组件
✅ 必须 提供有效的 NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
✅ 必须 通过 callback 加载 Google Maps JS API
✅ 推荐 使用 useEffect 和 ref 初始化地图
✅ 推荐 使用 Tailwind 设置响应式尺寸和美观样式
✅ 优化 防止重复加载脚本

如果你还需要实现 标记（Markers）、信息窗口（InfoWindow）、地理编码 或 地点搜索（Autocomplete），也可以继续扩展这个组件。

需要我帮你添加这些功能吗？例如添加多个标记或搜索框？
