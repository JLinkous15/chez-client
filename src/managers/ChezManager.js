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