export const getAllCheeses = () => {
    return fetch('http://localhost:8000/cheeses', {
        headers:{
            "Authorization": `Token ${localStorage.getItem("authorization_token")}`
        }
    })
    .then(res=>res.json())    
}

export const getSingleCheese = (id) => {
    return fetch(`http://localhost:8000/cheeses/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("authorization_token")}`
        }
    })
    .then(res=>res.json())
}