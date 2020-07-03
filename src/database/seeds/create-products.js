exports.seed = (knex) => knex('products').del().then(() => knex('products').insert([
  {
    id: 1, name: 'Skol Latão', points: 2, url_image: 'https://cdn.awsli.com.br/600x450/206/206916/produto/27132811/2827df0a8d.jpg',
  },
  {
    id: 2, name: 'Skol Litrão', points: 3, url_image: 'https://d26lpennugtm8s.cloudfront.net/stores/455/258/products/cerveja-skol-litrao-com-casco11-f1e6dc50b21d1d1b1415370345016438-640-0.jpg',
  },
  {
    id: 3, name: 'Skol Latinha', points: 1, url_image: 'https://static.carrefour.com.br/medias/sys_master/images/images/h4c/ha1/h00/h00/14684792487966.jpg',
  },
]));
