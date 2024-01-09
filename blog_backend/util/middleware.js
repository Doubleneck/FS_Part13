const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === 'SequelizeDatabaseError') {
      return response.status(400).send({ error: error.message });
    }
    if (error.name === 'SequelizeValidationError') {
      return response.status(400).send({ error: error.message });
    }
    next(error);
  };
  
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
  };
  
  module.exports = {
    errorHandler,
    unknownEndpoint,
  };