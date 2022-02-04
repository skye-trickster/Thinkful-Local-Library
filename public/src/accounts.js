function findAccountById(accounts, id) 
{
  return accounts.find((account) => account.id === id)
}

function sortAccountsByLastName(accounts) 
{
  accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1 : -1)
  return accounts
}

function getBorrows(account, books, checkReturned = false)
{
  const { id } = account

  const bookCheck = function({borrows})
  {
    return borrows.some((borrow) => borrow.id === id && (checkReturned ? !borrow.returned : true))
  } 
  const addBook = (total, book) =>
  {
    total.push(book)
    return total
  }

  return books.reduce((total, book) => bookCheck(book) ? addBook(total, book) : total, [])
}

function getTotalNumberOfBorrows(account, books) 
{
  return getBorrows(account, books).length
}

function getBooksPossessedByAccount(account, books, authors) 
{
  const bookList = getBorrows(account, books, true)
  const embedAuthor = function(book)
  {
    //find author
    const bookFunctions = require("./books.js")
    const author = bookFunctions.findAuthorById(authors, book.authorId)

    //add author information to the book
    if (author) book["author"] = author
    
    //return book
    return book
  }

  bookList.forEach((book) => embedAuthor(book))
  return bookList
}

const acc = require("../data/accounts.js")
const auth = require("../data/authors.js")
const bks = require("../data/books.js")
console.log(getBooksPossessedByAccount(acc[4], bks, auth))//.map((book) => book.author))

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};