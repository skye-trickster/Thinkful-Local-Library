

function findAuthorById(authors, id) 
{
  return authors.find((author) => author.id == id)
}

function findBookById(books, id) 
{
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) 
{
  const borrowed = []
  const returned = []
  
  books.forEach((book) => book.borrows[0].returned ? returned.push(book) : borrowed.push(book))

  return [borrowed, returned]
}

function getBorrowersForBook(book, accounts) 
{
  const embedReturnStatus = (borrower, returnStatus) => borrower["returned"] = returnStatus

  const borrowList = []
  for(let instance in book.borrows)
  {
    const findAccountById = require("./accounts.js").findAccountById
    const account = findAccountById(accounts, book.borrows[instance].id)

    embedReturnStatus(account, book.borrows[instance].returned)

    borrowList.push(account)
    
    if (borrowList.length >= 10) break;
  }
  return borrowList
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
