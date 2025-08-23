import routes from "@/routes";
import socket from "@/socket";
import server from "@/config/server";

socket();
routes();

server.listen(9000, () => {
    console.log("Server is running on port 9000");
});
