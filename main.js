const checkPs4 = document.getElementById("ps4");
const checkPs5 = document.getElementById("ps5");
const checkXboxOne = document.getElementById("xboxone");
const checkXboxSeriesX = document.getElementById("xboxx");
const checkWiiU = document.getElementById("wiiu");
const checkSwitch = document.getElementById("switch");
const calcBtn = document.getElementById("calcBtn");
const result = document.getElementById("result");
const searchInput = document.getElementById("search");

let total = 0;

const checkArray = [checkPs4
    , checkPs5
    , checkXboxOne
    , checkXboxSeriesX
    , checkWiiU
    , checkSwitch];

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
            result.textContent = total;
        }
       
    };

    calcBtn.addEventListener("click", calcularTotal);

//Filtrado de productos.

const buscarProducto = (event) =>{
const searchTerm = event.target.value.toLowerCase();
const productos = document.querySelectorAll(".product");

productos.forEach((producto) =>{

    const label = producto.querySelector("label").textContent.toLocaleLowerCase();
    if (label.includes(searchTerm)){
        producto.style.display = "block";
    }else{
        producto.style.display = "none";
    }
});
};

searchInput.addEventListener("input", buscarProducto);

