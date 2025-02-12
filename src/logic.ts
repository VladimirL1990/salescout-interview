type Product = {
	name: string;
	price: number;
};

function filterAndSortProducts(products: Product[]): Product[] {
	// Используем Map для хранения уникальных продуктов по имени
	const uniqueProducts = new Map<string, Product>();

	for (const product of products) {
			// Если продукта с таким именем ещё нет, добавляем его
			if (!uniqueProducts.has(product.name)) {
					uniqueProducts.set(product.name, product);
			}
	}

	// Преобразуем Map в массив и сортируем по цене
	return Array.from(uniqueProducts.values()).sort((a, b) => a.price - b.price);
}

module.exports = { filterAndSortProducts };
