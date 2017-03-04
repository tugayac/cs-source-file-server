import * as server from './server';
import * as debug from 'debug';
import * as http from 'http';

const log: debug.IDebugger = debug('express:server');
log.log = console.log.bind(console);

const httpPort: number | string = normalizePort(process.env.PORT || 8089);
const app = server.Server.bootstrap().app;
app.set('port', httpPort);
app.set('host', '0.0.0.0');
const httpServer = http.createServer(app);

httpServer.listen(httpPort);
httpServer.on("error", onError);
httpServer.on("listening", onListening);

function normalizePort(portValue: string): number | string {
  const port = parseInt(portValue, 10);
  if (isNaN(port)) {
    return portValue;
  }

  if (port >= 1024) {
    return port;
  }

  return -1;
}

function onError(error: any): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof httpPort === "string"
    ? "Pipe " + httpPort
    : "Port " + httpPort;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privilages");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = httpServer.address();
  const bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;
  log("Listening on " + bind);
  console.log("Listening on " + bind);
}
