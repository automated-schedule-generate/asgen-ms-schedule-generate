import io from '@/config/socketServer';
import { Socket } from 'socket.io';
import generateTimetable from '@/classes/generate-timetable';

export default function () {
	io.on('connection', (socket: Socket) => {
		socket.on('progress', () => {
			socket.emit('progress', {
				progress: generateTimetable.getProgress(),
			});
		});
	});
}
