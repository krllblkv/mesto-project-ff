const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
    headers: {
        authorization: 'cf159fac-216e-4f7a-809b-0911f6a7d413',
        'Content-Type': 'application/json'
    }
};

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(checkResponse);
}

export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(checkResponse);
}

export function updateUserInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about
        })
    })
        .then(checkResponse);
}

export function addNewCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name,
            link
        })
    })
        .then(checkResponse);
}

export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkResponse);
}

export function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(checkResponse);
}

export function unlikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkResponse);
}

export function updateAvatar(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar })
    })
        .then(checkResponse);
}