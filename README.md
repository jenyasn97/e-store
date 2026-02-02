# E-Store

Интернет-магазин электроники на React + TypeScript + Vite. Дизайн ориентирован на Figma-макет, контейнер — Full HD (1920px).

## Технологии

- **React 18** + **TypeScript**
- **Vite 5** — сборка и dev-сервер
- **React Router DOM 7** — маршрутизация
- **Axios** — запросы к API товаров
- **Sass (SCSS)** — стили, BEM-подход, общие переменные

## Структура проекта

```
e-store/
├── public/
│   └── images/           # Статика: логотипы, иконки категорий, превью товаров
├── src/
│   ├── api/
│   │   └── products.ts   # API товаров, типы Product, getProductImageUrl, fetchProducts
│   ├── components/
│   │   ├── Banner/       # Главный баннер (iPhone 14 Pro)
│   │   ├── BannersSection/
│   │   ├── Button/       # Кнопки (white/black stroke, fill-small), поддержка to="/..."
│   │   ├── Category/    # «Browse By Category» — слайдер категорий с ссылками в каталог
│   │   ├── DiscountProducts/
│   │   ├── Footer/
│   │   ├── Header/       # Логотип, поиск, навигация, избранное, корзина, профиль
│   │   ├── MainLayout/   # Header + Outlet + Footer, скролл вверх при смене route
│   │   ├── ProductCard/  # Карточка товара (цена, oldPrice, лайк, Buy Now)
│   │   ├── Products/     # Блок товаров на главной (табы, сетка 4 колонки)
│   │   ├── SmallerBanners/
│   │   └── SummerBanner/
│   ├── context/
│   │   ├── FavoritesContext.tsx  # Избранное: Set<id>, localStorage, toggleFavorite
│   │   └── ProductsContext.tsx  # Товары с API + доп. комментарии/рейтинг из data/products.json
│   ├── data/
│   │   └── products.json # Локальные комментарии и рейтинги для мержа с API
│   ├── pages/
│   │   ├── CartPage/     # Корзина (заглушка)
│   │   ├── CatalogPage/ # Каталог: фильтры (категория, бренд), сортировка, пагинация 12/страница
│   │   ├── FavoritesPage/
│   │   ├── Home/         # Главная: баннеры, категории, товары, скидки, летний баннер
│   │   ├── ProductDetailsPage/  # Карточка товара: фото, опции, детали, отзывы, похожие
│   │   └── ProfilePage/  # Профиль (заглушка)
│   ├── styles/
│   │   ├── _base.scss    # Сброс, .app-container (max-width: 1920px)
│   │   └── _variables.scss # Цвета, шрифт Inter, отступы, радиусы
│   ├── App.tsx           # Роуты и провайдеры
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts        # alias @ → src
```

## Запуск

```bash
npm install
npm run dev
```

Открыть в браузере адрес, указанный в терминале (обычно `http://localhost:5173`).

## Сборка

```bash
npm run build
npm run preview   # просмотр production-сборки
```
