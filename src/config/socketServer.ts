import server from '@/config/server';
import { Server as SocketServer } from 'socket.io';

export default new SocketServer(server, {
	cors: {
		origin: '*',
	},
});
