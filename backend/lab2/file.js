import fs from "node:fs.promises";

const filepath = "user data.txt";

async function createfile(content) {
    try {
        await fs.writeFile(filepath, content);
        console.log("File created");
    } catch (error) {
        console.log("Error creating file");
    }
}

async function readfile() {
    try {
        const data = await fs.readFile(filepath, "utf8");
        console.log(data);
    } catch (error) {
        console.log("Error reading file");
    }
}

await createfile("Hello world!");
await readfile();


//read append delete         