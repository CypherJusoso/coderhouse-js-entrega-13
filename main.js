const calcBtn = document.getElementById("calcBtn");
const result = document.getElementById("result");
const searchInput = document.getElementById("search");
const createBtn = document.getElementById("createBtn");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productsContainer = document.getElementById("productsContainer");
const resetBtn = document.getElementById("resetBtn");
const objectError = document.getElementById("objectError");
let total = 0;

const checkArray = [];

    const calcularTotal = (event) =>{
        event.preventDefault();
        total = 0;
        checkArray.forEach((checkbox) => {
            if(checkbox.checked){
                total += parseFloat(checkbox.value);
            }
        })
        if(total == 0){
            result.textContent = "Por favor, seleccione uno o mas productos."
        }else{
            result.textContent = "US$ "+ total;
        }
       
    };

    calcBtn.addEventListener("click", calcularTotal);

//Filtrado de productos.

const buscarProducto = (event) =>{
const searchTerm = event.target.value.toLowerCase();
const productos = document.querySelectorAll(".product");

productos.forEach((producto) =>{

    const label = producto.querySelector("label").textContent.toLowerCase();
    if (label.includes(searchTerm)){
        producto.style.display = "block";
    }else{
        producto.style.display = "none";
    }
});
};

searchInput.addEventListener("input", buscarProducto);

//Crear un producto
class Product{
    constructor(name, price){
        this.name = name;
        this.price = price;
    }
};
const initialProducts = [
    new Product("Playstation 4", 250),
    new Product("Playstation 5", 500),
    new Product("Xbox One", 250),
    new Product("Xbox Series X", 500),
    new Product("Wii U", 250),
    new Product("Nintendo Switch", 500)
];
const generateProduct = (userProduct) =>{
const productDiv = document.createElement("div");
productDiv.setAttribute("class", "product");
productDiv.setAttribute("id", userProduct.name + "-div")

const productLabel = document.createElement("label");
productLabel.setAttribute("for", userProduct.name);
productLabel.innerHTML = `${userProduct.name} US$ ${userProduct.price}`;

const productCheckbox = document.createElement("input");
productCheckbox.setAttribute("type", "checkbox");
productCheckbox.setAttribute("id", userProduct.name);
productCheckbox.setAttribute("value", userProduct.price);

const deleteBtn = document.createElement("button");
deleteBtn.setAttribute("type", "button");
deleteBtn.setAttribute("id", userProduct.name + "-deleteBtn")
deleteBtn.setAttribute("class", "dangerBtn");
deleteBtn.innerHTML = "Delete";

productDiv.appendChild(productLabel);
productDiv.appendChild(productCheckbox);
productDiv.appendChild(deleteBtn);
productsContainer.appendChild(productDiv);

checkArray.push(productCheckbox);

deleteBtn.addEventListener("click", ()=>{
let products = localStorageProductsLoad();

products = products.filter(product => product.name !== userProduct.name);
localStorageProductsSave(products);

productDiv.remove();

checkArray.splice(checkArray.indexOf(productCheckbox), 1);

result.textContent = "";
});
}
const preConstruct = () =>{
    
    let products = localStorageProductsLoad();
    
    if(products.length === 0){
        products = initialProducts;
        localStorageProductsSave(products);
    }

    products.forEach((product) =>{
        generateProduct(product);
    })
}
const reset = () =>{
    productsContainer.innerHTML = "";

    checkArray.length = 0;

    const products = initialProducts;
    localStorageProductsSave(products);
   
    products.forEach((product) =>{
        generateProduct(product);
    });

}


const localStorageProductsSave = (products) => {
    localStorage.setItem("products", JSON.stringify(products));
};

const localStorageProductsLoad = () => {
const localStorageProducts = localStorage.getItem("products");
if(localStorageProducts){
    return JSON.parse(localStorageProducts);
}
return [];
};

const createProduct = () => {

    if(productName.value.length === 0 || isNaN(productPrice.value) || productPrice.value === ""){
        objectError.textContent = "Por favor, ingrese parametros validos."
        return;
    }
    console.log(productPrice.value);

    const userProduct = new Product(productName.value, productPrice.value);
    let products = localStorageProductsLoad();
    products.push(userProduct);
    localStorageProductsSave(products);
    generateProduct(userProduct);
    productName.value = "";
    productPrice.value = "";
};

preConstruct();

createBtn.addEventListener("click", createProduct);

resetBtn.addEventListener("click", reset);