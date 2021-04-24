/*
 * An example application to test and benchmark cardio and its overhead.
 *
 * There are three REST routes and their handlers defined here. Each handler
 * is an async function that waits for a pre-defined range of time to delay
 * after which it responds with a given query param.
 * In a real world app, instead of simulating a time delay, you would perform
 * actual operations that take time such as network calls or database lookups.
 *
 * Each handler is passed to or wrapped with `cardioWrapper()`.
 * `cardioWrapper()` takes in three arguments:
 * 1. A name for that function so that cardio and you can track it.
 * 2. The function that you want to pass to cardio to measure and track.
 * 3. A callback with the measurements recorded by cardio after your function
 *    has finished running. The callback gives you three arguments:
 *    1. `cardioName` - The string you passed to `cardioWrapper()` for the
 *        function that has finished running.
 *    2. `invocation` - The object created by cardio containing the metrics
 *        or measurements recorded.
 *    3. `args` - The arguments passed to your function for the current
 *        invocation. Useful for comparing invocations for pure functions.
 *
 * For this sample application, we are running console.log in the callback.
 */

const fastify = require('fastify')({ ignoreTrailingSlash: true });
const { cardioWrapper } = require('cardio-node');
/*
 * If you've cloned this repo for local development, comment out the above
 * line and uncomment the line below. Make sure you've built once before.
 */
// const { cardioWrapper } = require('./dist');

fastify.get(
  '/a',
  cardioWrapper(
    'handler-a',
    async (request, reply) => {
      const input = request.query.input || 'Hello World';
      const delay = Math.floor(Math.random() * (500 - 450 + 1)) + 450; // Picks a random delay from 450 to 500 ms
      await new Promise(resolve => setTimeout(resolve, delay));
      return { response: input, delay: delay };
    },
    (cardioName, invocation, args) => {
      console.log('Cardio log: ', cardioName, invocation);
    }
  )
);

fastify.get(
  '/b',
  cardioWrapper(
    'handler-b',
    async (request, reply) => {
      const input = request.query.input || 'Hello World';
      const delay = Math.floor(Math.random() * (4000 - 3500 + 1)) + 3500; // Picks a random delay from 3500 to 4000 ms
      await new Promise(resolve => setTimeout(resolve, delay));
      return { response: input, delay: delay };
    },
    (cardioName, invocation, args) => {
      console.log('Cardio log: ', cardioName, invocation);
    }
  )
);

fastify.get(
  '/c',
  cardioWrapper(
    'handler-c',
    async (request, reply) => {
      const input = request.query.input || 'Hello World';
      const delay = Math.floor(Math.random() * (2000 - 1750 + 1)) + 1750; // Picks a random delay from 1750 to 2000 ms
      await new Promise(resolve => setTimeout(resolve, delay));
      return { response: input, delay: delay };
    },
    (cardioName, invocation, args) => {
      console.log('Cardio log: ', cardioName, invocation);
    }
  )
);

const start = async () => {
  try {
    const fastifyListener = await fastify.listen(3000);
    console.log('Running sample cardio application');
    console.log(`Try hitting ${fastifyListener}/a?input=hello`);
    console.log(`Or ${fastifyListener}/c?input=test`);
  } catch (err) {
    fastify.log.error(err);
    console.log(err);
    process.exit(1);
  }
};
start();
