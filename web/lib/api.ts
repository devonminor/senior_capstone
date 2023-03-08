const API_URL = 'http://localhost:5002';

export const getCourses = () => {
    return fetch(`${API_URL}/courses`)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
        });
}

export const getCourse = (course_id: string) => {
    return fetch(`${API_URL}/courses/${course_id}`)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
        });
}

export const getLecturesForCourse = (course_id: string) => {
    return fetch(`${API_URL}/courses/${course_id}/lectures`)
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
        });
}