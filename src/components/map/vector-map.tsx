'use client';

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Card, CardContent } from '~/components/ui/card';

interface VectorMapProps {
  styleUrl: string; // 矢量地图样式地址（如 MapTiler、Mapbox 等）
  center?: [number, number]; // 初始中心点 [lng, lat]
  zoom?: number; // 初始缩放级别
}

export function VectorMap({
  styleUrl,
  center = [116.39, 39.9], // 默认北京
  zoom = 10,
}: VectorMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  // 初始化地图
  useEffect(() => {
    if (mapContainer.current && !map.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: styleUrl, // 矢量地图样式
        center,
        zoom,
        attributionControl: false, // 可自定义版权信息
      });

      // 添加地图控件
      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    }

    // 清理函数
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [styleUrl, center, zoom]);

  return (
    <Card className="h-[600px] w-full py-0">
      <CardContent className="p-0 h-full">
        <div ref={mapContainer} className="h-full w-full" />
      </CardContent>
    </Card>
  );
}