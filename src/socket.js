export const socketList = {
  USER: {},
};

export default (io) => {
  io.on('connection', (socket) => {
    socket.emit("tes-notif", "Tes Socket Berhasil")
  });
};
