function getTotalBooksCount(books) { return books.length; }

function getTotalAccountsCount(accounts) { return accounts.length; }

function getBooksBorrowedCount(books) 
{
  return books.filter(({borrows}) => borrows[0].returned == false).length
}

function getMostCommonGenres(books) {}

function getMostPopularBooks(books) {}

function getMostPopularAuthors(books, authors) {}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
