async function routes(fastify, options) {

  // körs innan schema validering
  fastify.addHook('preValidation', convertBody);

  // gjorde en middelware för att konvertera body i formatet string till ett object
  function convertBody(request, reply, next) {
    if (typeof request.body === "string") {
      request.body = JSON.parse(request.body);
    }
    next();
  }

  // fångar upp preflights
  fastify.options('*', async (request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    reply.header("Access-Control-Allow-Headers", "Authorization");
    return;
  })
}

// eporterar routes
module.exports = routes