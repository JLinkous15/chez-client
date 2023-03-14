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