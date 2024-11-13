import jsonfile from  'jsonfile';


const DB_FILE_PATH = process.env.DB_FILE_PATH || './data/db.json';

export const readUsersFromFile = async () => {
    try {
        return await jsonfile.readFile(DB_FILE_PATH);
    } catch (err) {
        console.error(err);
        return [];
    }
};

// export const writeUsersToFile = async () => {
//     try {
//         await jsonfile.writeFile(DB_FILE_PATH, );
//     } catch (err) {
//         console.error(err);
//     }
// };