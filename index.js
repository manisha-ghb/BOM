let container = document.querySelector(".container");
let submitbtn = document.querySelector(".submitbtn");
let input = document.getElementById("category");

let url = "https://silk-righteous-geometry.glitch.me"
async function getData() {
    try{
        let response = await fetch(`${url}`);
        if(!response.ok){
            throw new Error("HTTP Request Error " , response.status)
        }
        let data = await response.json()
        localStorage.setItem("products", JSON.stringify(data))
        let products = JSON.parse(localStorage.getItem("products"))
        displayData(products);
    }
    catch(err){
        console.error(err);
    }
}

function displayData(products){
    container.innerHTML = ``;
    if(products == null){
        container.innerHTML = ` <h1> No Data Available </h1>`;
    }
    else{
        products.forEach(obj => {
            let item = document.createElement("div");
            let {id,image,title,price,rating,category} = obj;
            item.innerHTML=`
            <img src = "${image}">
            <p> Title : ${title}</p>
            <p> Price : ${price} , Rating : ${rating.rate}</p>
            <p> Category : ${category}</p>
            <button onclick=deleteData(${id})> Delete </button>
            `;
            container.appendChild(item);
        });
    }
}

submitbtn.addEventListener("click" , function(){
    if(input.value == ''){
        displayData();
    }
    else{
        filterData(input.value);
    }
})

function filterData(ele){
    let products = JSON.parse(localStorage.getItem("products"))
    let categoryArr = products.filter(obj => obj.category == ele)    
    displayData(categoryArr);
}
async function deleteData(id) {
    try{
        let response = await fetch(`${url}/${id}`,{"method" : "DELETE"});
        if(response.ok){
            alert("Data Deleted");
            getData();
        }
    }
    catch(err){
        console.error(err);
    }
}

getData();