import io from "socket.io-client";

const socket = io.connect("https://server-moon-discord.onrender.com/");

export default socket;