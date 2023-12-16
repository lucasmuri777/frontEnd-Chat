import {reqSocket} from './app/api/socketUrl';
import {io} from 'socket.io-client'
export const socket = () => io(reqSocket as string);
