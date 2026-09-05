import json
import requests
from bs4 import BeautifulSoup

def fetch_exhibitions():
    exhibitions = [
        {
            "id": "1",
            "title": "巨型哥基「Mochi 麻糬」打卡展覽",
            "venue": "MegaBox",
            "category": "商場",
            "region": "九龍",
            "isHot": True,
            "address": "九龍灣 MegaBox L18 Mega Sky 空中花園",
            "transport": "港鐵九龍灣站 A 出口轉乘穿梭巴士",
            "description": "場內設有 10 米闊的巨型吹氣哥基「Mochi 麻糬」，造型笑咪咪面向日落。免費入場！",
            "image": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80"
        },
        {
            "id": "2",
            "title": "香港當代藝術展",
            "venue": "M+ 博物館 / 西九文化區",
            "category": "展覽",
            "region": "九龍",
            "isHot": False,
            "address": "西九文化區 M+ 博物館",
            "transport": "港鐵九龍站 E4 出口步行 10 分鐘",
            "description": "展出多位本地及國際當代藝術家作品，涵蓋視覺藝術、設計與建築。",
            "image": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
        }
    ]

    try:
        url = "https://www.hk-aga.org/exhibitions"
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=10)

        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            items = soup.select('.exhibition-item')

            for idx, item in enumerate(items[:3], start=3):
                title = item.select_one('.title').text.strip() if item.select_one('.title') else "最新當代展覽"
                venue = item.select_one('.venue').text.strip() if item.select_one('.venue') else "畫廊空間"

                exhibitions.append({
                    "id": str(idx),
                    "title": title,
                    "venue": venue,
                    "category": "展覽",
                    "region": "港島",
                    "isHot": False,
                    "address": f"{venue} (詳情見展覽官網)",
                    "transport": "請參考場館交通指引",
                    "description": f"最新藝術展覽《{title}》，歡迎前往參觀。",
                    "image": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
                })
    except Exception as e:
        print(f"爬蟲狀態訊息: {e}")

    with open('spots.json', 'w', encoding='utf-8') as f:
        json.dump(exhibitions, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    fetch_exhibitions()
