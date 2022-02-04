

function getTotalBooksCount(books) { return books.length; }

function getTotalAccountsCount(accounts) { return accounts.length; }

function getBooksBorrowedCount(books) 
{
  return books.filter(({borrows}) => borrows[0].returned == false).length
}

function addPopularity(popularityList, item, amount = 1)
{
  let listItem = popularityList.find((id) => id.name == item)

  if (!listItem) listItem = popularityList.push({"name" : item, count : amount})
  else listItem.count += amount
  
  return popularityList
}

function getMostPopularItems(books, nameFunction, amountFunction, maxNumber = 5)
{
  let list = books.reduce((_list, book) => addPopularity(_list, nameFunction(book), amountFunction(book)), [])
  list.sort((criteriaA, criteriaB) => criteriaB.count - criteriaA.count)
  return list.slice(0, maxNumber)
}

function getMostCommonGenres(books) 
{
  const getGenre = ({genre}) => genre
  const getAmount = (book) => 1
  return getMostPopularItems(books, getGenre, getAmount)
}

function getMostPopularBooks(books) 
{
  const getBookTitle = ({title}) => title
  const getBookBorrows = (book) => book.borrows.length
  return getMostPopularItems(books, getBookTitle, getBookBorrows)
}

function getMostPopularAuthors(books, authors) 
{
  const getAuthor = function(book)
  {
    const findAuthorById = require("./books.js").findAuthorById
    const {first, last} = findAuthorById(authors, book.authorId).name
    return `${first} ${last}`
  }
  const getBookBorrows = (book) => book.borrows.length
  //return ([{name: "DN Impact", count: 1}])
  return getMostPopularItems(books, getAuthor, getBookBorrows)
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
