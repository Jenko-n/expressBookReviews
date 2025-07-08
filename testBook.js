const axios = require('axios');

async function getBooks() {
    try {
        const res = await axios.get('http://localhost:5000/');
        console.log("Books available in the shop:");
        console.log(res.data);
    } catch (err) {
        console.error("Error fetching books:", err.message);
    }
}

getBooks();


async function getBookDetails(isbn) {
    try {
        const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
            console.log(`Details for book ISBN ${ isbn }:`);
        console.log(response.data);
    } catch (error) {
        console.error(`Error fetching book details for ISBN ${isbn}:`, error.message);
    }
}

getBookDetails('1'); 

async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        console.log(`Books by author "${author}":`);
        console.log(response.data);
    } catch (error) {
        console.error(`Error fetching books by author "${author}":`, error.message);
    }
}

getBooksByAuthor('Unknown');

async function getBooksByTitle(title) {
    try {
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        console.log(`Books by author "${title}":`);
        console.log(response.data);
    } catch (error) {
        console.error(`Error fetching books by author "${title}":`, error.message);
    }
}

getBooksByTitle('The Epic Of Gilgamesh');