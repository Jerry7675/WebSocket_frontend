import { Message } from "@src/@types/message";
import axiosClient from "@src/@api/axiosClient";
import { io, Socket } from "socket.io-client";

export function connectSocket() {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  return io(BASE_URL);
}

export async function getGroups() {
  const res = await axiosClient.get("/get-group", { withCredentials: true });
  return res.data;
}

export async function getUsers() {
  const res = await axiosClient.get("/users", { withCredentials: true });
  return res.data;
}

export function sendMessage(socket: Socket, msg: Message) {
  socket.emit("message", msg);
}
