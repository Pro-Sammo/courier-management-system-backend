import { Application } from "express";
import http from "http";
import { Server } from "socket.io";
export let io: Server;

export const SocketServer = (app: Application) => {
	const server = http.createServer(app);
	io = new Server(server, {
	});

	return server;
};

