async function routes(fastify, options) {

  // fångar upp preflights
  fastify.options('*', async (request, reply) => {
    console.log("preflight");
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    reply.header("Access-Control-Allow-Headers", "Authorization");
    return;
  })
}

// eporterar routes
module.exports = routes