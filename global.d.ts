
import { Knex } from 'knex';
import {
  IUserTokenParse,
} from './src/features/public/utils/types/publicCommon.types';

import { Server as SocketIOServer } from 'socket.io';

declare global {
  namespace Express {
    interface Request {
      customer: IUserTokenParse;
      agent: IUserTokenParse;
      admin: IUserTokenParse;
      upFiles: string[];
       io: SocketIOServer;
    }
  }
}
