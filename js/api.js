// This is your bridge to the TMDB database
const API_KEY = '0b3d17a4fe3dd52593a48d9a0dad4bd6'; // Your API Key
const BASE_URL = 'https://api.themoviedb.org/3';

// This function takes an "endpoint" (like '/trending/movie/day') 
// and returns the movie data for you to use.
export async function fetchTMDB(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error('Could not fetch data from TMDB');
        }
        
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("API Error:", error);
        return []; // Return an empty list if there's an error
    }
}
