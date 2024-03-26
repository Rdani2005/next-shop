export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7)
    return Array.from({ length: totalPages }, (_, i) => i + 1);

  // if actual page is between first 3 pages, then show the first three, ... and the last 2 pages.
  if (currentPage <= 3) return [1, 2, 3, "...", totalPages - 1, totalPages];

  // if current page is between the last three pages, then show first two pages, ... and last pages
  if (currentPage >= totalPages - 2)
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];

  // shows first page, ..., actual page, ... and last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
