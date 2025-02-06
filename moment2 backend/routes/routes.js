const { ObjectId } = require('@fastify/mongodb');

async function routes(fastify, options) {
    const collection = fastify.mongo.db.collection('todo')

    // körs innan schema validering
    fastify.addHook('preValidation', convertBody);
  
    // gjorde en middelware för att konvertera body i formatet string till ett object
    function convertBody(request, reply, next) {
      if (typeof request.body === "string") {
        request.body = JSON.parse(request.body);
      }
      next();
    }

    const todoBodyJsonSchema = {
        type: 'object',
        required: ['title', 'status'],
        properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            status: { type: 'integer' }
        },
    }

    const todoSchema = {
        body: todoBodyJsonSchema,
    }

    // testar så backend funkar
    fastify.get('/', async (request, reply) => {
        return { message: "hello world" }
    })

    // hämtar alla todos
    fastify.get('/gettodos', async (request, reply) => {
        reply.header("Access-Control-Allow-Origin", "*");
        const result = await collection.find().toArray()
        if (result.length === 0) {
            return { message: "inga todo hittades" }
        }
        return result
    })

    // skapar en ny todo
    fastify.post('/addtodo', todoSchema, async (request, reply) => {
        reply.header("Access-Control-Allow-Origin", "*");
        let { title, description, status } = request.body;
        if (title.length === 0) {
            return { message: "fältet 'title' får inte lämnas tomt" }
        }
        status = status.toLowerCase();
        if (status == "ej påbörjad" || status == "pågående" || status == "avklarad") {
            // Gör så ej påbörjad sätts till default värde, här var det simplaste sättet jag kom på att göra det på här
        } else {
            status = "ej påbörjad"
        }

        const result = await collection.insertOne({ title: title, description: description, status: status })
        return result
    })

    // uppdaterar en todo
    fastify.put('/updatetodo/:id', async (request, reply) => {
        reply.header("Access-Control-Allow-Origin", "*");
        id = new ObjectId(request.params.id);
        let { title, description, status } = request.body;

        const result = await collection.updateOne({ _id: id }, { $set: { title: title, description: description, status: status } })
        if (result.matchedCount == 0) {
            return { message: "id hittades inte" }
        }
        return { message: "todo uppdaterad" }
    })

    // tar bort en todo
    fastify.delete('/delete/:id', async (request, reply) => {
        reply.header("Access-Control-Allow-Origin", "*");
        id = new ObjectId(request.params.id);

        const result = await collection.deleteOne({ _id: id })
        if (result.deletedCount == 0) {
            return { message: "id hittades inte" }
        }
        return { message: "todo borttagen" }
    })
}

// eporterar routes
module.exports = routes