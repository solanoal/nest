const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply('Hello, world!');
  },
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: (request, reply) => {
    reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
  },
});

server.register({
  register: Good,
  options: {
    reporters: [
      {
        reporter: require('good-console'),
        events: {
          response: '*',
          log: '*',
        },
      },
    ],
  },
}, err => {
  if (err) {
    throw err; // something bad happened loading the plugin
  }

  server.start(() => server.log('info', 'Server running at: ' + server.info.uri));
});
