export interface MenuItem {
  id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
  type?: 1 | 2 | 3; // 1: MenuCard (default), 2: MenuCard2, 3: MoonCard
  url?: string; // メニュー詳細ページのURL用
}

export const sampleMenuItems = [
  {
    id: "1",
    name: "Blend Matcha",
    image: "/menu/blend-matcha.png",
    price: 580,
    description: "濃厚な抹茶の風味が楽しめる特製ブレンド",
    url: "blend-matcha",
    type: 1,
  },
  {
    id: "2",
    name: "Fresh Banana",
    image: "/menu/fresh-banana.png",
    price: 520,
    description: "新鮮なバナナを使った爽やかなスムージー",
    url: "fresh-banana",
    type: 1,
  },
  {
    id: "3",
    name: "Deep Cacao",
    image: "/menu/deep-cacao.png",
    price: 640,
    description: "リッチなカカオの深い味わいを堪能",
    url: "deep-cacao",
    type: 1,
  },
  {
    id: "4",
    name: "????",
    image: "",
    price: 100,
    description: "新しいメニューを準備中です",
    url: "coming-soon",
    type: 3,
  },
  // ...more items
] as MenuItem[];
