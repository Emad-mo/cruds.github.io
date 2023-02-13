const title = document.getElementById("title")
const price = document.getElementById("price")
const taxes = document.getElementById("taxes")
const ads = document.getElementById("ads")
const discount = document.getElementById("discount")
const total = document.getElementById("total")
const create = document.getElementById("submit")
const tbody = document.getElementById("tbodyy")
const count = document.getElementById("count")
const catagory = document.getElementById("catagory")
const delAll = document.getElementById("delAll")
const search = document.getElementById("search")

// get total value
function totalPrice() {
    if (price.value != '') {
        total.textContent = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.style.backgroundColor = "green"
        deletAll()
    }
    else {
        total.style.backgroundColor = "rgb(132, 41, 41)"
        total.innerHTML = ""
    }
}


// save & check data on local storage
let createData;
if (localStorage.craetedData != null) {
    createData = JSON.parse(localStorage.craetedData)

}
else {
    createData = []
}

// create product
function createEle() {
    if (title.value != "" && price.value != "" && catagory.value != "" && count.value <= 100) {
        const createElement = {
            eletitle: title.value,
            eleprice: price.value,
            eletaxes: taxes.value,
            eleads: ads.value,
            elediscount: discount.value,
            eleTotal: total.innerHTML,
            eleCategory: catagory.value,
            count: count.value
        }
        if (createElement.count > 1) {
            for (i = 0; i < createElement.count; i++) {
                createData.push(createElement)
            }
        }
        else {
            createData.push(createElement)

        }
        claerin()
    }


    localStorage.setItem("craetedData", JSON.stringify(createData))
    deletAll()
    readData()
}
// clear inputs
function claerin() {
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    count.value = ""
    total.innerHTML = ""
    catagory.value = ""
    total.style.backgroundColor = "rgb(132, 41, 41)"

}
// read
function readData() {
    let table = ""
    for (let i = 0; i < createData.length; i++) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${createData[i].eletitle}</td>
        <td>${createData[i].eleprice}</td>
         <td>${createData[i].eletaxes}</td>
         <td>${createData[i].eleads}</td>
         <td>${createData[i].elediscount}</td>
        <td>${createData[i].eleTotal}</td>
        <td>${createData[i].eleCategory}</td>
        <td><button onclick="updateEleent(${i})" id="update">update</button></td>
        <td><button onclick="deleteElment(${i})" id="delete">delete</button></td>
        <tr>
       `

    }
    document.getElementById("tbodyy").innerHTML = table

}
readData()

// delete
function deleteElment(i) {
    createData.splice(i, 1)
    localStorage.craetedData = JSON.stringify(createData)
    readData()
}
// deletAll
function deletAll() {
    if (createData.length != 0) {
        delAll.innerHTML = `<button id="deleteAll">Delete All (${createData.length})</button>`
        window.addEventListener('click', (e) => {
            if (e.target.getAttribute("id") === "deleteAll") {
                createData = []
                localStorage.craetedData = JSON.stringify(createData)
                delAll.innerHTML = ""
                readData()
            }
        })
    }
    []
} deletAll()
// update
function updateEleent(i) {
    title.value = Object.values(createData[i])[0]
    price.value = Object.values(createData[i])[1]
    taxes.value = Object.values(createData[i])[2]
    ads.value = Object.values(createData[i])[3]
    discount.value = Object.values(createData[i])[4]
    catagory.value = Object.values(createData[i])[6]
    totalPrice()
    scroll({
        top: 0,
        behavior: "smooth"
    })
    count.style.display = 'none'
    create.style.display = "none"
    let upbtn = document.getElementById("Update")
    upbtn.style.display = "block"
    upbtn.onclick = function () {
        const newvalue = {
            eletitle: title.value,
            eleprice: price.value,
            eletaxes: taxes.value,
            eleads: ads.value,
            elediscount: discount.value,
            eleTotal: total.innerHTML,
            eleCategory: catagory.value,
            count: count.value
        }
        Object.assign((createData[i]), newvalue)
        localStorage.craetedData = JSON.stringify(createData)
        readData()
        claerin()
        upbtn.style.display = "none"
        count.style.display = 'block'
        create.style.display = "block"
    }

}
// search
let searchMood = "title"
function SerachBtn(id) {
    search.focus()
    if (id == "sreachTitle") {
        searchMood = "title"
        search.placeholder = "Search by Title"
    }
    else {
        searchMood = "Category"
        search.placeholder = "Search by Category"
    }
    search.value = ""
    readData()
}
function Search(value) {
    let table = ""
    for (i = 0; i < createData.length; i++) {
        if (searchMood == "title") {
            if (createData[i].eletitle.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i + 1}</td>
                <td>${createData[i].eletitle}</td>
                <td>${createData[i].eleprice}</td>
                <td>${createData[i].eletaxes}</td>
                <td>${createData[i].eleads}</td>
                <td>${createData[i].elediscount}</td>
                <td>${createData[i].eleTotal}</td>
                <td>${createData[i].eleCategory}</td>
                <td><button onclick="updateEleent(${i})" id="update">update</button></td>
                <td><button onclick="deleteElment(${i})" id="delete">delete</button></td>
                <tr>
            `
            }
        }

        else {
            if (createData[i].eleCategory.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i + 1}</td>
                <td>${createData[i].eletitle}</td>
                <td>${createData[i].eleprice}</td>
                <td>${createData[i].eletaxes}</td>
                <td>${createData[i].eleads}</td>
                <td>${createData[i].elediscount}</td>
                <td>${createData[i].eleTotal}</td>
                <td>${createData[i].eleCategory}</td>
                <td><button onclick="updateEleent(${i})" id="update">update</button></td>
                <td><button onclick="deleteElment(${i})" id="delete">delete</button></td>
                <tr>
            `

            }
        }
    }

    document.getElementById("tbodyy").innerHTML = table

}
// clean data
function cleancount() {
    if (count.value > 100) {
        count.style.backgroundColor = "red"
        count.style.opacity = "0.5"
    }
    else {
        count.style.backgroundColor = "#000"
        count.style.opacity = "1"
    }
}
