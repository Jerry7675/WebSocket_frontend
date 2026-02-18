import { Message } from "@src/@types/message";

const BASE_URL = process.env.BACKEND_URL || "http://localhost:8000";

export function connectSocket(): WebSocket {
  return new window.WebSocket(`${BASE_URL}/socket`);
}

export async function getGroups() {
  const res = await fetch(`${BASE_URL}/get-group`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch groups");
  return res.json();
}

export async function getUsers() {
  const res = await fetch(`${BASE_URL}/users`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export function sendMessage(ws: WebSocket, msg: Message) {
  ws.send(JSON.stringify(msg));
}
