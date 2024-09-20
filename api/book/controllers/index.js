'use strict';

const { Book } = require('@models');

const getBooks = (req, res) => {
  let back = {};

  return Promise.resolve()
    .then(async () => {
      const bookModel = await Book.findAndCountAll();

      res.status(200).json({
        status: 'OK',
        data: bookModel,
      });
    })
    .catch((error) => res.jsonError(error, 'Error al obtener los libros'));
};

const createBook = (req, res) => {
  let back = {};

  return Promise.resolve()
    .then(async () => {
      const { title } = req.body;

      const bookModel = await Book.create({
        title,
      });

      res.status(200).json({
        status: 'OK',
        data: bookModel,
      });
    })
    .catch((error) => res.jsonError(error, 'Error al crear el libro'));
}

module.exports = {
  getBooks,
  createBook
};
