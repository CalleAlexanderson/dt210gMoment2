const fastify = require('fastify')({ //importerar fastify
    logger: true
  })
  
  fastify.register(require('./database/db'))
  fastify.register(require('./routes/routes'))
  fastify.register(require('./routes/routeSupport'))
  
  // startar server
  fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })