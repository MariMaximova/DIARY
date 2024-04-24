import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import the cors middleware
import { access, constants, readFile, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ___filename = fileURLToPath(import.meta.url);
const ___dirname = dirname(___filename);
export const jsonFile = join(___dirname, 'userArray.json');

export async function getData() {
    try {
        await access(jsonFile, constants.F_OK);
    } catch (error) {
        await writeFile(jsonFile, JSON.stringify([]));
    }

    const contents = await readFile(jsonFile, { encoding: 'utf8' });

    return JSON.parse(contents);
}

export async function saveData(usersArray) {
    await writeFile(jsonFile, JSON.stringify(usersArray));
}

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors()); 

app.post('/submit-data', async (req, res) => {
    const { userName, userPassword } = req.body;
    console.log('Received data from client:', userName, userPassword);

    const usersArray = await getData();

    if (usersArray.some(user => user.userName === userName)) {
        console.log("This login exists");
        res.status(400).json({ error: 'Login already exists' });
    } else {
        console.log("This login does not exist");
        usersArray.push(dataUs);
        saveData(usersArray);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


