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
    imageUrl: '/jardim-de-desejos/images/macrame.svg'
  },
  'caixa-areia-jelplast-sandbox-premium': {
    imageUrl: '/jardim-de-desejos/images/caixa-areia.svg'
  },
  'kit-lencol-soft-plush-felpudo-4-cores': {
    imageUrl: '/jardim-de-desejos/images/lencol-plush.svg'
  },
  'kit-cortador-grama-sem-fio-2-baterias': {
    imageUrl: '/jardim-de-desejos/images/cortador-grama.svg'
  }
};

export const officialGardenProducts = gardenProducts.map(product => ({
  ...product,
  ...(productOverrides[product.id] || {})
}));
