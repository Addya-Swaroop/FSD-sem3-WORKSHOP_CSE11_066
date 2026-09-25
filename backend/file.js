import fs from "node:fs/promises";

const filePath = "userData.json";

async function createFile(content) {
    try {
        await fs.writeFile(filePath, content, "utf-8");
        console.log("File Created Successfully");
    } catch (err) {
        console.log("Error found:", err);
    }
}

// Read file function
async function readFile() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        console.log(data);
    } catch (err) {
        console.log("Error found:", err);
    }

    console.log("File Reading Completed");
}

async function appendFile(content) {
    try {
        await fs.appendFile(filePath, content, "utf-8");
        console.log("File Appended Successfully");
    } catch (err) {
        console.log("Error found:", err);
    }
}

async function deleteFile() {
    try {
        await fs.unlink(filePath);
        console.log("File Deleted Successfully");
    } catch (err) {
        console.log("Error found:", err);
    }
}

async function sequence() {
    await createFile("First Line\n");
    await appendFile("Appending Second Line");
    await readFile();
    await deleteFile();
}

sequence();