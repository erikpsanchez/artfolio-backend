const {
  getBooks, 
  createBook
} = require('../controllers')


module.exports = {
  routes: [
    {
      method: 'get',
      path: '/books',
      action: getBooks,
    },
    {
      method: 'post',
      path: '/books',
      action: createBook,
    }
  ]
}