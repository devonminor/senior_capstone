const API_URL = 'http://localhost:5002';

export const getCourses = () => {
    return fetch(`${API_URL}/courses`)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
        });
}