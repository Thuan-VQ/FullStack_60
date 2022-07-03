const userList = document.getElementById('list')
const err = document.getElementById('error')
const container = document.getElementById('container')
const form = document.getElementById('form')


function getData(user){
    const url = `https://api.github.com/users/${user}`
    const data= fetch(url)
                .then((res) => res.json())
                .then((data) => data)
                .catch((err) => err)
    return data
}

function handleData(data){
    if(data.message){
        err.innerHTML = "user can't be found"
        userList.innerHTML = ""
        return
    } else {
        err.innerHTML = ""
        userList.innerHTML = `
            <img src= ${data.avatar_url} style="weight:100px; height:100px" />
            <li> Name: ${data.name} </li>
            <li> Company: ${data.company} </li>
            <li> Email: ${data.email} </li>
            <li> Follower: ${data.followers} </li>
        `
    }
    container.appendChild(userList)
}

form.addEventListener('submit', async function (e) {
    e.preventDefault()
    let nameUser = form.user.value
    let userData = await getData(nameUser)

    form.user.value= ""
    handleData(userData)
})