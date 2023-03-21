export const postChatGPT = ( body) => {
    return fetch(`http://localhost:8000/chatGPT/chatGPT`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem('authorization_token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(res=>res.json())
}