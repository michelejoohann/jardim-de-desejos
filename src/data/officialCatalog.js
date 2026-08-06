import { gardenProducts } from './catalog.js';

const productOverrides = {
  'workstation-branca-130': {
    description: 'Workstation em MDF 15 mm com espaço de trabalho de 1,30 m, três gavetas, gabinete lateral com duas prateleiras removíveis e box elevado para monitor.',
    dimensions: '130 x 60 x 90 cm',
    material: 'MDF 15 mm',
    color: 'Branco',
    price: 3600.50,
    priceLabel: 'R$ 3.600,50 no Pix',
    installmentPrice: 'R$ 3.790,00 em até 10x de R$ 379,00 sem juros',
    imageUrl: 'https://meumaridomarceneiro.cdn.magazord.com.br/img/2025/05/produto/702/workstation-br-ambientada-aberta.png?ims=600x600',
    url: 'https://www.meumaridomarceneiro.com.br/workstation-branco'
  },
  'tapete-boho-jacquard-branco-marrom': {
    name: 'Tapete Geométrico Estilo Boho Jacquard',
    description: 'Tapete geométrico estilo boho jacquard para ambientes residenciais, com base EVA antiderrapante. Variação desejada: 3,00 x 2,00 m.',
    color: 'Obra Arte Branco/Cinza',
    dimensions: '3,00 x 2,00 m',
    price: 327.35,
    priceLabel: 'R$ 327,35',
    imageUrl: 'https://m.media-amazon.com/images/I/71PLyKKNd5L._AC_SX679_.jpg',
    url: 'https://www.amazon.com.br/dp/B0H18GQLFQ?th=1&psc=1'
  },
  'suporte-planta-macrame-boho-cru': {
    imageUrl: 'https://m.media-amazon.com/images/I/51DXVVqTIuL._AC_SY879_.jpg'
  },
  'caixa-areia-jelplast-sandbox-premium': {
    imageUrl: 'https://p16-oec-sg.ibyteimg.com/tos-alisg-i-aphluv4xwc-sg/ca562803bd6e4292b9af295b1690346e~tplv-aphluv4xwc-crop-webp:1024:1024.webp?dr=15592&t=555f072d&ps=933b5bde&shp=8dbd94bf&shcp=e1be8f53&idc=my2&from=2378011839'
  },
  'kit-lencol-soft-plush-felpudo-4-cores': {
    imageUrl: 'https://p16-oec-sg.ibyteimg.com/tos-alisg-i-aphluv4xwc-sg/002a1160be61439d9cd984bf5b11c6a2~tplv-aphluv4xwc-crop-webp:1333:1333.webp?dr=15592&t=555f072d&ps=933b5bde&shp=8dbd94bf&shcp=e1be8f53&idc=my2&from=2378011839'
  },
  'kit-cortador-grama-sem-fio-2-baterias': {
    imageUrl: 'https://p16-oec-sg.ibyteimg.com/tos-alisg-i-aphluv4xwc-sg/921fb05e2d034e46b6d734bb38afe376~tplv-aphluv4xwc-crop-webp:1024:1024.webp?dr=15592&t=555f072d&ps=933b5bde&shp=8dbd94bf&shcp=e1be8f53&idc=my2&from=2378011839'
  }
};

export const officialGardenProducts = gardenProducts.map(product => ({
  ...product,
  ...(productOverrides[product.id] || {})
}));
