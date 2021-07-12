'use strict'
function onInit() {
    console.log('Init');
    if (loadFromStorage('Users') === null) {
        console.log("No databse, creating new one")
        _createUsers()
    }
    getUsersFromStorageToVar()
    if (loadFromStorage("user") !== null) {
        onSuccessfullLogin(loadFromStorage("user"))
    }
}


function onLoginTry() {
    var elInvalid = document.querySelector(".invalid")
    var elUserName = document.querySelector('.username');
    var elPassword = document.querySelector('.password');
    var userName = elUserName.value
    var password = elPassword.value
    if (userName === "" || password === "") return
    var loggedUser = loginTry(userName, password)
    console.log(loggedUser)
    if (!loggedUser) {
        elUserName.value = null
        elPassword.value = null
        console.log("NOT LOGGED IN")    //TODELETE
        elInvalid.classList.remove("hide-item")
    }
    else {
        elInvalid.classList.add("hide-item")
        onSuccessfullLogin(loggedUser)
    }

}

function onSuccessfullLogin(loggedUser) {
    var elName = document.querySelector('.welcome')
    elName.innerText = loggedUser.userName
    var elContent = document.querySelector('.content-div')
    elContent.classList.remove('hide-item')
    var elLogin = document.querySelector('.login')
    elLogin.classList.add('hide-item')
    var isAdmin = loggedUser.isAdmin
    saveUsersToDB()
    if (isAdmin) addAdminFeatures(loggedUser)
}

function onLogOut() {
    removeFromStorage('user')
    window.location.reload(false);
}

function addAdminFeatures(loggedUser) {
    var elAdminButton = document.querySelector('.admin')
    elAdminButton.classList.remove('hide-item')
}

function loadAdmin() {
    var userIdentity = loadFromStorage('user')
    console.log(userIdentity)
    if (!userIdentity || !userIdentity.isAdmin) {
        window.location = "index.html";
    }
    document.querySelector('.table').classList.remove('hide-item')
    var users = getUsersFromStorageToVar()
    var keysArray = Object.keys(users[0])
    var strTableHeadHTML = "<tr>"
    keysArray.forEach(key => {
            if(key === "userName" || key === "lastLoginTime"){
                strTableHeadHTML += `<th class="head sort" onclick="onSortBy('${key}')" > ${key} </th>`
            }
            else{
            strTableHeadHTML += `<th class="head" onclick="" > ${key} </th>`
            }
    })
    strTableHeadHTML += "</tr>"
    console.log(strTableHeadHTML)
    var elTableHead = document.querySelector('.table-head')
    console.log(elTableHead)
    elTableHead.innerHTML = strTableHeadHTML
    // renderUsers(users)
    onSortBy('name')
}

function onSortBy(sortBy) {
    console.log("SORTING BY")
    console.log(sortBy)
    setSort(sortBy)
    renderUsers(getUsersRenderOrder())
}

function renderUsers(users) {
    var strContentHTML = "<tr>"
    users.forEach(user => {
        var userValues = Object.values(user)
        userValues.forEach(value => {
            if (typeof (value) === typeof(1)) {
                strContentHTML += `<td> ${makeDate(value)} </td>`
            }
            else {
                strContentHTML += `<td> ${value} </td>`
            }
        })
        strContentHTML += '</tr>'
    })
    document.querySelector('.table-body').innerHTML = strContentHTML
}