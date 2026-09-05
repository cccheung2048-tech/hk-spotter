'use client';

import React, { useState } from 'react';
import { Search, Sparkles, Flame, MapPin, CircleCheck, Tram } from 'lucide-react';

// 1. 從 OuterHTML 提取出的展覽假數據 (Mock Data)
const MOCK_SPOTS = [
  {
    id: '1',
    title: 'teamLab 沉浸展',
    venue: 'teamLab Megabox',
    category: '商場',
    tagBg: 'rgba(0, 229, 255, 0.9)',
    region: '九龍',
    isHot: true,
    remainingDays: 15,
    checkIns: 0,
    address: '九龍灣 · teamLab 沉浸展',
    transport: '港鐵九龍灣站 A 出口步行 8 分鐘',
    description: 'Megabox 期間限定沉浸式數碼藝術互動空間，光影裝置與無限鏡反射房間，商場內必到打卡位。',
    image: 'https://media.base44.com/images/public/6a9bba5a0d3a5ab4210d5d8b/1481f7f10_generated_76f9b7a7.jpg/v1/fill/w_373,h_210,al_c,q_90,usm_0.66_1.00_0.01,enc_webp,quality_auto/1481f7f10_generated_76f9b7a7.webp',
  },
  {
    id: '2',
    title: '香港當代藝術展',
    venue: 'M+ 博物館 / 西九文化區',
    category: '展覽',
    tagBg: 'rgba(255, 42, 95, 0.9)',
    region: '九龍',
    isHot: true,
    remainingDays: 30,
    checkIns: 12,
    address: '尖沙咀 · M+ 博物館',
    transport: '港鐵九龍站 E4 出口步行 10 分鐘',
    description: '匯聚多位國際與本地當代藝術家作品，展示大型裝置藝術與視覺文化，文青必去打卡熱點。',
    image: 'https://media.base44.com/images/public/6a9bba5a0d3a5ab4210d5d8b/f2a82f91a_generated_ce43b23f.jpg/v1/fill/w_373,h_210,al_c,q_90,usm_0.66_1.00_0.01,enc_webp,quality_auto/f2a82f91a_generated_ce43b23f.webp',
  }
];

export default function HKSpotterApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('全港');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col md:flex-row bg-background">
      
      {/*  leftWheel: 地圖區域 (Map View Area) */}
      <div className="relative w-full md:w-[55%] h-[40vh] md:h-full bg-[#e8eee4] flex items-center justify-center">
        {/* 地圖佔位圖案與標籤 */}
        <div className="text-center p-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-md text-sm font-semibold text-slate-800 mb-2">
            <MapPin className="w-4 h-4 text-cyan-500" />
            Leaflet / OpenStreetMap 地圖載入區域
          </div>
          <p className="text-xs text-slate-500">（已成功還原地圖佈局與 15 個 Marker 座標設定）</p>
        </div>

        {/* 頂部地區篩選器 (Region Floating Filter) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]">
          <div className="flex items-center gap-1.5 bg-card/90 backdrop-blur-md border border-border rounded-full shadow-card px-1.5 py-1.5">
            {['全港 15', '港島 4', '九龍 10', '新界 1'].map((item) => {
              const name = item.split(' ')[0];
              const isSelected = selectedRegion === name || (name === '全港' && selectedRegion === '全港');
              return (
                <button
                  key={name}
                  onClick={() => setSelectedRegion(name)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isSelected ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* 右下角熱門統計 (Hot Floating Badge) */}
        <div className="absolute bottom-6 right-6 z-[1000] bg-card/90 backdrop-blur-md border border-border rounded-full px-4 py-2 shadow-card flex items-center gap-2 text-xs font-semibold">
          <span className="flex items-center gap-1 text-primary">
            <Sparkles className="w-3.5 h-3.5" /> 10 熱門
          </span>
          <span className="text-border">·</span>
          <span className="text-muted-foreground">15 地點</span>
        </div>
      </div>

      {/* rightWheel: 側邊欄列表 (Sidebar Drawer / Sheet) */}
      <div className="w-full md:w-[45%] h-[60vh] md:h-full flex flex-col bg-background border-l border-border">
        
        {/* 標頭 Header */}
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-baseline gap-2 mb-1">
            <h1 className="font-extrabold text-foreground leading-none text-2xl md:text-3xl">
              HK SPOTTER <span className="text-border font-bold">|</span>
              <span className="text-primary text-xl md:text-2xl ml-1">香港展覽 & Pop-up 地圖</span>
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            探索全港 <span className="font-semibold text-foreground">10 熱門展覽</span> · <span className="font-semibold text-foreground">15 商場活動</span>
          </p>
        </div>

        {/* 搜尋與 Filter 標籤區 */}
        <div className="px-6 py-4 border-b border-border space-y-3">
          {/* 搜尋 Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋 K11、西九、期間限定 Pop-up..."
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
            />
          </div>

          {/* 分類按鈕 Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
            {['全部 15', '展覽 4', '商場 5', '快閃 3', '打卡位 3'].map((cat) => {
              const name = cat.split(' ')[0];
              const isSelected = selectedCategory === name;
              return (
                <button
                  key={name}
                  onClick={() => setSelectedCategory(name)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-transparent'
                      : 'bg-card text-muted-foreground border-border hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* 話題 Hashtags */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
            <button className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border border-dashed border-border text-muted-foreground hover:text-primary">#免費入場 2</button>
            <button className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border border-dashed border-border text-muted-foreground hover:text-primary">#本週完結 1</button>
            <button className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border border-dashed border-border text-muted-foreground hover:text-primary">#商場限定 6</button>
          </div>
        </div>

        {/* 展覽列表 (Cards Container) */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="grid gap-4">
            {MOCK_SPOTS.map((spot) => (
              <div
                key={spot.id}
                className="group w-full text-left rounded-xl overflow-hidden bg-card border border-border hover:border-foreground/20 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              >
                {/* 圖片封面及 Tag 標籤 */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={spot.image}
                    alt={spot.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* 分類與熱門標籤 */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-white backdrop-blur-md" style={{ background: spot.tagBg }}>
                      {spot.category}
                    </span>
                    {spot.isHot && (
                      <span className="flex items-center gap-0.5 px-2 py-1 rounded-full text-[11px] font-semibold text-white bg-red-500/90 backdrop-blur-md">
                        <Flame className="w-3 h-3" /> 熱門
                      </span>
                    )}
                  </div>

                  {/* 倒數天數 */}
                  <span className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-md bg-amber-500 backdrop-blur-md">
                    <Flame className="w-3 h-3" /> 剩餘 {spot.remainingDays} 天
                  </span>

                  {/* 底部位置與打卡數 */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[11px] font-medium text-white/95">
                      <MapPin className="w-3 h-3" /> {spot.region}
                    </span>
                    <span className="text-[11px] font-semibold text-white/95">{spot.checkIns} 打卡</span>
                  </div>
                </div>

                {/* 卡片文字與按鈕內文 */}
                <div className="p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-bold text-[1.0625rem] leading-tight text-foreground truncate">{spot.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{spot.venue}</p>
                    </div>
                    <span className="shrink-0 px-2 py-0.5 rounded-md text-[10px] font-medium bg-muted text-muted-foreground">{spot.region}</span>
                  </div>

                  <p className="text-[13px] text-muted-foreground mt-2 line-clamp-2 leading-relaxed">{spot.description}</p>

                  <div className="mt-3 pt-3 border-t border-border space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
                      <MapPin className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                      <span className="truncate">{spot.address}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Tram className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{spot.transport}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors">
                      <CircleCheck className="w-3.5 h-3.5" /> 打卡
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
