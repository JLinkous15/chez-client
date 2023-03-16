export const getMySubscriptions = () => {
    return fetch(`http://localhost:8000/subscriptions/mySubscriptions`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem('authorization_token')}`
        }
    })
    .then(res=>res.json())
}

export const amISubscribed = (id) => {
    return fetch(`http://localhost:8000/subscriptions/${id}/amISubscribed`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem('authorization_token')}`
        }
    })
    .then(res=>res.json())
}



export const subscribe = (id) => {
    return fetch(`http://localhost:8000/subscriptions/${id}/subscribe`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem('authorization_token')}`
        }
    })
}

export const unsubscribe = (id) => {
    return fetch(`http://localhost:8000/subscriptions/${id}/unsubscribe`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem('authorization_token')}`
        }
    })
}