import { Server } from "socket.io";

export const assignMessagesToSocket = (socketServer: Server) => {
    socketServer.on('connection', (socket) => {
        console.log("Клиент подключен:", socket.id);

        socket.on('message', (data) => {
            console.log("Сообщение от клиента:", 
                { data }
            );

            // Отправляем сообщение всем подключенным к нашему сокету
            socketServer.emit('message', data);
        });

        // Обрабатываем отключение
        socket.on("disconnect", () => {
            console.log("Клиент отключился:", 
                socket.id
            );
        });
    });
}