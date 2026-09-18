import http from 'http';
const port = 3000;

const users = [  
    {   id: "1",
        name: "xyz",
        phone: "7827536087",
        email: "xyz@gmail.com"
    },
    {   id: "2",
        name: "abc",
        phone: "7827536087",
        email: "abc@gmail.com"
    },
    {   id: "3",
        name: "lmn",
        phone: "7827536087",
        email: "lmn@gmail.com"
    },
    {   id: "4",
        name: "pqr",
        phone: "7827536087",
        email: "pqr@gmail.com"
    }
];

const server = http.createServer(async (req, res) => {

    const url = req.url;
    const method = req.method;

    
    if (url === "/msg" && method === "GET") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");

        res.end("Hello World");
    }

  
    else if (url === "/sys" && method === "GET") {

        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");

        res.end("Page not found");
    }

   
    else if (url === "/users" && method === "GET") {

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify(users));
    }
    else if (url.startsWith("/users/") && method === "GET") {
      const id=url.split("/")[2];
      console.log(id);
      const user=users.find((usery)=>user.id===id);
        if(!user){
        return res.statusCode=404,res.end("User not found");
        }
        res.end(JSON.stringify(user));
    }
    
    else if (url === "/create" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk;
    });
    req.on("data", (content) => {
        body += content;
    });

    req.on("end", () => {
         const data = JSON.parse(body);
         const newUser = {
            id: (users.length + 1).toString(),
            name: data.name,
            phone: data.phone,
            email: data.email
         }
         users.push(newUser);
         res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
            user: newUser
        }));

        // const newUser = JSON.parse(body);
        // users.push(newUser);

        // res.statusCode = 201;
        // res.setHeader("Content-Type", "application/json");

        // res.end(JSON.stringify({
        //     user: newUser
        // }));
}
    )}
   
    else {

        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");

        res.end("Route not found");
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});