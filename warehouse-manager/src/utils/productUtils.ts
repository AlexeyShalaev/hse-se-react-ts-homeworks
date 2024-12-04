import { Product, ProductFilter } from '@/types/product';

export const filterProducts = (
  products: Product[],
  filters: ProductFilter
): Product[] => {
  return products.filter((product) => {
    // Search filter
    const matchesSearch = product.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    // Non-zero quantity filter
    const matchesQuantity = filters.showNonZero ? product.quantity > 0 : true;

    // Category filter
    const matchesCategory = filters.category
      ? product.category === filters.category
      : true;

    return matchesSearch && matchesQuantity && matchesCategory;
  });
};

export const paginateProducts = (
  products: Product[],
  page: number,
  itemsPerPage: number
): Product[] => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return products.slice(startIndex, endIndex);
};