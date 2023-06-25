export const BASE_URL = 'https://auth.nomoreparties.co';

const makeRequest = (url, method, body, token) => {
    const options = {
        method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    if (token) {
        options.headers.Authorization = `Bearer ${token}`;
    }

    return fetch(`${BASE_URL}${url}`, options)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`Ошибка код ${response.status}`);
        });
}

export const registerUser = (data) => {
    return makeRequest('/signup', 'POST', data);
}

export const authorizeUser = (data) => {
    return makeRequest('/signin', 'POST', data);
}

export const getUserData = (token) => {
    return makeRequest('/users/me', 'GET', null, token);
}