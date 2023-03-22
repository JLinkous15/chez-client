const token = localStorage.getItem("authorization_token")

export const postArticle = (body) => {
    return fetch(`http://localhost:8000/articles`, {
        method: "POST",
        headers: {
            "Authorization" : `Token ${localStorage.getItem("authorization_token")}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(res=>res.json())
}

export const getAllArticles = (chez) => {
    return fetch('http://localhost:8000/articles', {
        headers: {
            "Authorization": `Token ${localStorage.getItem('authorization_token')}`
        }
    })
    .then(res=>res.json())
}

export const getSingleArticle = (id) => {
    return fetch(`http://localhost:8000/articles/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem('authorization_token')}`
        }
    })
    .then(res=>res.json())
}

export const deleteArticle = (id) => {
    return fetch(`http://localhost:8000/articles/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem('authorization_token')}`
        }
    })
}

export const editArticle = (id, body) => {
    return fetch(`http://localhost:8000/articles/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem('authorization_token')}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(body)
    })
}