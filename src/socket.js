import { io } from "socket.io-client";

const SERVER_IP = "wss://smeruxa.tw1.ru";
export const socket = io(SERVER_IP, {
    path: "/socket.io/",
    transports: ["websocket"],
    secure: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000
});