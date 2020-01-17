
const requestLogger = (request, response, next) =>{
  console.log('Method:', request.method);
  console.log('Path:', request.path);
  console.log('Body:', request.body);
  console.log('--------');
  next();
};

const unknownEndpoint= (request, response, next) =>{
  response.status(404).send({
      'error':'Unknown endpoint'
  })
};

const errorHandler = (error, request, response, next) =>{

    if (error.name === 'CastError' && error.kind === 'ObjectId'){
        response.status(400).send({
            'error': 'malformatted Id'
            }
        )
    }
    else if (error.name === 'ConnectionError'){
        response.status(5000).send({
            'error': 'Error Connecting to Database'
        })
    }
    else if( error.name ==='ValidationError'){
        response.status(400).send({
            'error':'validation error'
        })
    }

    next(error);
};

module.exports = {
    requestLogger,
    errorHandler,
    unknownEndpoint
};