export const getAllChefs = () => {
    return fetch('http://localhost:8000/chefs', {
        headers:{
            "Authorization": `Token ${localStorage.getItem("authorization_token")}`
        }
    })
    .then(res=>res.json())    
}

export const getSingleChef = (id) => {
    return fetch(`http://localhost:8000/chefs/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("authorization_token")}`
        }
    })
    .then(res=>res.json())
}

export const getMe = () => {
    return fetch('http://localhost:8000/chefs/getMe', {
        headers:{
            "Authorization": `Token ${localStorage.getItem("authorization_token")}`
        }
    })
    .then(res=>res.json()) 
}

export const updateMyProfile = (body) => {
    return fetch('http://localhost:8000/chefs/getMe', {
        method: "PUT",
        headers:{
            "Authorization": `Token ${localStorage.getItem("authorization_token")}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(body)
    })
}