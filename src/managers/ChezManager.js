export const getAllChezzes = () => {
    return fetch('http://localhost:8000/chezzes', {
        headers:{
            "Authorization": `Token ${localStorage.getItem("authorization_token")}`
        }
    })
    .then(res=>res.json())    
}

export const getSingleChez = (id) => {
    return fetch(`http://localhost:8000/chezzes/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("authorization_token")}`
        }
    })
    .then(res=>res.json())
}

export const postChez = (chez) => {
    return fetch('http://localhost:8000/chezzes', {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem('authorization_token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(chez)
    })
    .then(res=>res.json())
}

export const deleteChez = (id) => {
    return fetch(`http://localhost:8000/chezzes/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem('authorization_token')}`
        }
    })
}

export const updateChez = (id, chez) => {
    return fetch(`http://localhost:8000/chezzes/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem('authorization_token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(chez)
    })
}