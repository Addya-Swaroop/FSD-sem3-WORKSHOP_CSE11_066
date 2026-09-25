import http from "node:http";

const users = [
    {
        id: 1,
        name: "Aarushi",
        age: 20
    },
    {
        id: 2,
        name: "Rahul",
        age: 21
    }
];

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end("Welcome to my server!");
    }

    else if (req.method === "GET" && req.url === "/users") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(users));
    }

    else if (req.method === "GET" && req.url === "/about") {
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });

        res.end("This is the About page");
    }

    else if (req.method === "POST" && req.url === "/users") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {

            const user = JSON.parse(body);

            const newUser = {
                id: user.id,
                name: user.name,
                age: user.age
            };

            users.push(newUser);

            res.writeHead(201, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "User added successfully",
                user: newUser
            }));
        });
    }

    else {
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("Page not found");
    }
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});