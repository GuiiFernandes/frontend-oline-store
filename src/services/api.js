export async function getCategories() {
  // armazeneo endpoint com  as categorias em uma variável no escopo desta função
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';

  // faz um fetch para buscar as categorias no Mercado Livre
  const response = await fetch(URL);
  // transforma a resposta do fetch em JSON
  const data = await response.json();

  // retorna as categorias
  return data;
}

export async function getProductsFromCategoryAndQuery(/* categoryId, query */) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
