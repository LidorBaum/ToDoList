'use strict';

var gUsers;
var gSortBy = 'name'

function _createUsers() {

    var users = loadFromStorage('Users')

    if (!users || users.length === 0) {
        var names = ['Guy', 'Yaron', 'Avi']
        var users = names.map(function (userName) {
            return _createUser(userName)
        })
        gUsers = users;
    }
    gUsers = users;
    users.push(_createUser("Lidor", "1234", true))
    _saveUsers();

}


function _createUser(userName, pwd = '1234', isAdmin = false) {
    var user = {
        id: makeId(),
        userName: userName,
        password: pwd,
        lastLoginTime: 'N/A',
        isAdmin: isAdmin
    }
    return user;
}

function _saveUsers() {
    saveToStorage('Users', gUsers)
}

function loginTry(userName, password) {
    var loggedUser = gUsers.find(user => {
        return (user.userName === userName && user.password === password)
    })
    console.log(loggedUser)
    if (loggedUser === undefined) return null
    else {
        loggedUser.lastLoginTime = (Date.now())
        saveToStorage('user', loggedUser)
        return loggedUser
    }
}

function saveUsersToDB() {
    _saveUsers()
}

function getUsersFromStorageToVar() {
    gUsers = loadFromStorage('Users')
    console.log(gUsers, "FRESH")
    return gUsers

}

function getUsersRenderOrder() {
    var users = gUsers
    switch (gSortBy) {
        case 'userName':
            users = sortByName(users)
            break;
        case 'lastLoginTime':
            users = sortByLastLogin(users)
            break;
    }
    return users
}

function sortByName(users){
    return users.sort(function (a,b){
        if(a.userName.toUpperCase() > b.userName.toUpperCase()) return 1
        return -1
    })
}

function sortByLastLogin(users){
    return users.sort(function (a,b){
    
        return b.lastLoginTime - a.lastLoginTime
    })
}



function setSort(sortBy) {
    gSortBy = sortBy
}