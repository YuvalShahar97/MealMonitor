import axios from 'axios';

// כתובת הבקשה לשרת
const API_URL = 'http://localhost:5555';


// בקשה להתחברות
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        return response.data;  // הנתונים שיחזרו מהשרת (כולל ה-JWT)
    } catch (error) {
        if (error.response.status == 401) {
            console.error('Login failed:', error.response.data.error);
            alert('Invalid username or password. Please try again.'); // Inform the user about invalid credentials
        } else {
            console.error('Unexpected error:', error.response.data.error);
            alert('An unexpected error occurred.'); // Handle other errors
        }
    }
};

// רישום משתמש חדש
export const register = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { username, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
