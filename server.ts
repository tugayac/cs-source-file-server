import * as express from 'express';
import * as morgan from 'morgan';

import { root } from './util';

export class Server {
  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.api();
  }

  public api() {
    // empty for now
  }

  /**
   * Configure Application here
   */
  public config() {
    this.app.use(morgan('combined', {
      immediate: true,
    }));
    this.app.use('/', express.static(root('public')));
  }

  public routes() {
    // empty for now
  }
}