const botones = document.querySelectorAll(".button");
const tabla = document.querySelector('.tabla');
let elementosCarrito = [];

botones.forEach(btn => {
    btn.addEventListener('click', agregarAlCarrito);
});

function agregarAlCarrito(e) {
    const button = e.target;
    const item = button.closest('.card');
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.Precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;

    const newItem = {
        title: itemTitle,
        price: itemPrice,
        img: itemImg,
        cantidad: 1
    };

    agregarItemCarrito(newItem);
    actualizarNumerito(); // Agregado: Actualizar el numerito del carrito
}

function agregarItemCarrito(newItem) {
    const inputElemento = tabla.getElementsByClassName('input__elemento');

    for (let i = 0; i < elementosCarrito.length; i++) {
        if (elementosCarrito[i].title.trim() === newItem.title.trim()) {
            elementosCarrito[i].cantidad++;
            const inputValue = inputElemento[0];
            inputValue.value++;
            calcularTotalCarrito();
            return null;
        }
    }
    elementosCarrito.push(newItem);
    mostrarElementosCarrito();
}

function mostrarElementosCarrito() {
    tabla.innerHTML = '';

    elementosCarrito.map((item, index) => {
        const tr = document.createElement('tr');
        tr.classList.add('CartItem');

        const content = `
      <th scope="row">${index + 1}</th>
      <td class="table__products">
          <img src="${item.img}" alt="">
          <h6 class="title">${item.title}</h6>
      </td>
      <td class="table__price"><p>${item.price}</p></td>
      <td class="table__cantidad">
          <input type="number" min="1" value="${item.cantidad}" class="input__elemento">
          <button class="delete btn btn-danger">x</button>
      </td>
    `;

        tr.innerHTML = content;
        tabla.append(tr);

        tr.querySelector(".delete").addEventListener('click', eliminarElementoCarrito);
        tr.querySelector(".input__elemento").addEventListener('change', actualizarCantidad);
    });

    calcularTotalCarrito();
}

function calcularTotalCarrito() {
    let total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal');

    elementosCarrito.forEach((item) => {
        const price = Number(item.price.replace("$", ''));
        total += price * item.cantidad;
    });

    itemCartTotal.innerHTML = `Total $${total}`;
    guardarLocalStorage();
}

function eliminarElementoCarrito(e) {
    const buttonClicked = e.target;
    const tr = buttonClicked.closest('.CartItem');
    const title = tr.querySelector('.title').textContent;

    for (let i = 0; i < elementosCarrito.length; i++) {
        if (elementosCarrito[i].title.trim() === title.trim()) {
            elementosCarrito.splice(i, 1);
        }
    }

    tr.remove();
    calcularTotalCarrito();
    actualizarNumerito(); // Agregado: Actualizar el numerito del carrito
}

function actualizarCantidad(e) {
    const quantityInput = e.target;
    const tr = quantityInput.closest(".CartItem");
    const title = tr.querySelector('.title').textContent;

    elementosCarrito.forEach(item => {
        if (item.title.trim() === title.trim()) {
            quantityInput.value < 1 ? (quantityInput.value = 1) : quantityInput.value;
            item.cantidad = quantityInput.value;
            calcularTotalCarrito();
            actualizarNumerito(); // Agregado: Actualizar el numerito del carrito
        }
    });
}

function guardarLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(elementosCarrito));
}

function actualizarBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

function actualizarNumerito() {
    const numerito = document.getElementById('numerito-1');
    const productosEnCarrito = JSON.parse(localStorage.getItem('cartItems')) || [];
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

window.onload = function () {
    const storage = JSON.parse(localStorage.getItem('cartItems'));
    if (storage) {
        elementosCarrito = storage;
        mostrarElementosCarrito();
    }
    actualizarBotonesAgregar(); // Agregado: Actualizar los botones de agregar al carrito
    actualizarNumerito(); // Agregado: Actualizar el numerito del carrito
};
















































































// const botones = document.querySelectorAll(".button");
// const tabla = document.querySelector('.tabla');
// let elementosCarrito = [];

// botones.forEach(btn => {
//     btn.addEventListener('click', agregarAlCarrito);
// });

// function agregarAlCarrito(e) {
//     const button = e.target;
//     const item = button.closest('.card');
//     const itemTitle = item.querySelector('.card-title').textContent;
//     const itemPrice = item.querySelector('.Precio').textContent;
//     const itemImg = item.querySelector('.card-img-top').src;

//     const newItem = {
//         title: itemTitle,
//         price: itemPrice,
//         img: itemImg,
//         cantidad: 1
//     };

//     agregarItemCarrito(newItem);
// }

// function agregarItemCarrito(newItem) {

//     const inputElemento = tabla.getElementsByClassName('input__elemento');

//     for (let i = 0; i < elementosCarrito.length; i++) {
//         if (elementosCarrito[i].title.trim() === newItem.title.trim()) {
//             elementosCarrito[i].cantidad++;
//             const inputValue = inputElemento[0];
//             inputValue.value++;
//             calcularTotalCarrito();
//             return null;
//         }
//     }
//     elementosCarrito.push(newItem);
//     mostrarElementosCarrito();
// }

// function mostrarElementosCarrito() {
//     tabla.innerHTML = '';

//     elementosCarrito.map((item, index) => {
//         const tr = document.createElement('tr');
//         tr.classList.add('CartItem');

//         const content = `
//             <th scope="row">${index + 1}</th>
//             <td class="table__products">
//                 <img src="${item.img}" alt="">
//                 <h6 class="title">${item.title}</h6>
//             </td>
//             <td class="table__price"><p>${item.price}</p></td>
//             <td class="table__cantidad">
//                 <input type="number" min="1" value="${item.cantidad}" class="input__elemento">
//                 <button class="delete btn btn-danger">x</button>
//             </td>
//         `;

//         tr.innerHTML = content;
//         tabla.append(tr);

//         tr.querySelector(".delete").addEventListener('click', eliminarElementoCarrito);
//         tr.querySelector(".input__elemento").addEventListener('change', actualizarCantidad);
//     });

//     calcularTotalCarrito();
// }

// function calcularTotalCarrito() {
//     let total = 0;
//     const itemCartTotal = document.querySelector('.itemCartTotal');

//     elementosCarrito.forEach((item) => {
//         const price = Number(item.price.replace("$", ''));
//         total += price * item.cantidad;
//     });

//     itemCartTotal.innerHTML = `Total $${total}`;
//     guardarLocalStorage();
// }

// function eliminarElementoCarrito(e) {
//     const buttonClicked = e.target;
//     const tr = buttonClicked.closest('.CartItem');
//     const title = tr.querySelector('.title').textContent;

//     for (let i = 0; i < elementosCarrito.length; i++) {
//         if (elementosCarrito[i].title.trim() === title.trim()) {
//             elementosCarrito.splice(i, 1);
//         }
//     }

//     tr.remove();
//     calcularTotalCarrito();
// }

// function actualizarCantidad(e) {
//     const quantityInput = e.target;
//     const tr = quantityInput.closest(".CartItem");
//     const title = tr.querySelector('.title').textContent;

//     elementosCarrito.forEach(item => {
//         if (item.title.trim() === title.trim()) {
//             quantityInput.value < 1 ? (quantityInput.value = 1) : quantityInput.value;
//             item.cantidad = quantityInput.value;
//             calcularTotalCarrito();
//         }
//     });
// }

// function guardarLocalStorage() {
//     localStorage.setItem('cartItems', JSON.stringify(elementosCarrito));
// }

// window.onload = function () {
//     const storage = JSON.parse(localStorage.getItem('cartItems'));
//     if (storage) {
//         elementosCarrito = storage;
//         mostrarElementosCarrito();
//     }
// };

































































































































































/*const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.newItem')
let carrito = []

Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})


function addToCarritoItem(e) {
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;

    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }

    addItemCarrito(newItem)
}


function addItemCarrito(newItem) {

    const alert = document.querySelector('.alert')

    setTimeout(function () {
        alert.classList.add('hide')
    }, 2000)
    alert.classList.remove('hide')

    const InputElemnto = tbody.getElementsByClassName('input__elemento')
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === newItem.title.trim()) {
            carrito[i].cantidad++;
            const inputValue = InputElemnto[i]
            inputValue.value++;
            CarritoTotal()
            return null;
        }
    }

    carrito.push(newItem)

    renderCarrito()
}


function renderCarrito() {
    tbody.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `
        tr.innerHTML = Content;
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    })
    CarritoTotal()
}

function CarritoTotal() {
    let Total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''))
        Total = Total + precio * item.cantidad
    })

    itemCartTotal.innerHTML = `Total $${Total}`
    addLocalStorage()
}

function removeItemCarrito(e) {
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for (let i = 0; i < carrito.length; i++) {

        if (carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1)
        }
    }

    const alert = document.querySelector('.remove')

    setTimeout(function () {
        alert.classList.add('remove')
    }, 2000)
    alert.classList.remove('remove')

    tr.remove()
    CarritoTotal()
}

function sumaCantidad(e) {
    const sumaInput = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        if (item.title.trim() === title) {
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            CarritoTotal()
        }
    })
}

function addLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function () {
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if (storage) {
        carrito = storage;
        renderCarrito()
    }
}*/