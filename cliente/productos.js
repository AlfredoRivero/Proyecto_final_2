
// Array de productos
const productos = [

   {
      id: 1,
      description: "Spider-man",
      price: 4550,
      quanty: 1,
      img: "/img/Juegos/Spider-man.jpg",
   },
   {
      id: 2,
      description: "Aliens",
      price: 3950,
      quanty: 1,
      img: "/img/Juegos/aliens.jpg",
   },
   {
      id: 3,
      description: "Assasins Creed",
      price: 4530,
      quanty: 1,
      img: "/img/Juegos/Assasins Creed.jpg",
   },
   {
      id: 4,
      description: "Battlefield",
      price: 3720,
      quanty: 1,
      img: "/img/Juegos/Battlefield.jpg",
   },
   {
      id: 5,
      description: "Destiny 2",
      price: 3850,
      quanty: 1,
      img: "/img/Juegos/Destiny 2.jpg",
   },
   {
      id: 6,
      description: "God of War",
      price: 5570,
      quanty: 1,
      img: "/img/Juegos/God of War.jpg",
   },
   {
      id: 7,
      description: "Injustice 2",
      price: 3290,
      quanty: 1,
      img: "/img/Juegos/Injustice 2.jpg",
   },
   {
      id: 8,
      description: "Jump Force",
      price: 3570,
      quanty: 1,
      img: "/img/Juegos/Jump force.jpg",
   },
   {
      id: 9,
      description: "Mass Effect",
      price: 5250,
      quanty: 1,
      img: "/img/Juegos/mask.jpg",
   },
   {
      id: 10,
      description: "Mortal Combat 11",
      price: 4650,
      quanty: 1,
      img: "/img/Juegos/Mortal Combat 11.jpg",
   },
   {
      id: 11,
      description: "Naruto",
      price: 4550,
      quanty: 1,
      img: "/img/Juegos/naruto.jpg",
   },
   {
      id: 12,
      description: "NBA 2K 17",
      price: 5550,
      quanty: 1,
      img: "/img/Juegos/NBA 2K 17.jpg",
   },
   {
      id: 13,
      description: "Niho",
      price: 3350,
      quanty: 1,
      img: "/img/Juegos/nioh.jpg",
   },
   {
      id: 14,
      description: "Pess 2019",
      price: 4550,
      quanty: 1,
      img: "/img/Juegos/pess 2019.jpg",
   },
];

// index.js
const shopContent = document.getElementById("shopContent");
const cart = [];

productos.forEach((producto) => {

   const content = document.createElement("div");
   content.className = "card";
   content.innerHTML = `
   <img src="${producto.img}">
   <h3>${producto.description}</h3>
   <p class="precio">$ ${producto.price}</p>
   `;

   shopContent.append(content);
   

   const buyButton = document.createElement("button");
   buyButton.innerText = "Agregar";
   content.append(buyButton);

   buyButton.addEventListener("click", () => {
      const repeat = cart.some((repeatProducto) => repeatProducto.id === producto.id);
if (repeat){
   cart.map((prod) => {
      if (prod.id === producto.id){
         alert("Este producto ya se encuentra en el carrito");
         return;
      }
   });
} else {
      cart.push({
         id: producto.id,
         description: producto.description,
         price: producto.price,
         quanty: producto.quanty,
         img: producto.img,
      });
   }

   mostrarContadorCarrito();
   });
});

// Creacion del carrito
const carritoContainer = document.getElementById("carrito-container");
const carritoOverlay = document.getElementById("carrito-overlay");
const cartBtn = document.getElementById("cart-btn");
const carritoContador = document.getElementById("carrito-contador");


const mostrarCarrito = () => {
      //limpiar carrito
   carritoContainer.innerHTML = "";
      //mostrar carrito
   carritoContainer.style.display = "block";
   carritoOverlay.style.display = "block";

   // header carrito
   const carritoHeader = document.createElement("div");

   // creacion de ocultar carrito
   const carritoOcultar = document.createElement("div");
   carritoOcultar.innerText = "❌"
   carritoOcultar.className = "carrito-ocultar";
   carritoHeader.append(carritoOcultar);

   // funcion ocultar carrito
   carritoOcultar.addEventListener("click", () => {
      // ocultar carrito
   carritoContainer.style.display = "none";
   carritoOverlay.style.display = "none";
   });

   // creacion de titulo del carrito
   const carritoTitulo = document.createElement("div");
   carritoTitulo.innerText = "Carrito de Compra";
   carritoTitulo.className = "carrito-titulo";
   carritoHeader.append(carritoTitulo);

   carritoContainer.append(carritoHeader);

   // body carrito
   if (cart.length > 0) {
   cart.forEach((producto) => {
      carritoBody = document.createElement("div");
      carritoBody.className = "carrito-body"
      carritoBody.innerHTML = `
   <div class="producto">
      <img class="producto-img" src="${producto.img}" />
   <div class="producto-informacion">
      <h4>${producto.description}</h4>
   </div>
   <div class="quantity">
      <span class="quantity-btn-restar"> ➖ </span>
      <span class="quantity-input">${producto.quanty }</span>
      <span class="quantity-btn-sumar">➕</span>
   </div>
      <div class="precio">$ ${producto.price * producto.quanty}</div>
      <div class="borrar-producto">❌</div>
   </div>

      `;
      carritoContainer.append(carritoBody);

      
      // boton restar productos
      const restar = carritoBody.querySelector(".quantity-btn-restar");
      restar.addEventListener("click", () => {
         if(producto.quanty !==1){
            producto.quanty--;
            mostrarCarrito();
            mostrarContadorCarrito();
         }
      });
      
      // boton sumar productos
      const sumar = carritoBody.querySelector(".quantity-btn-sumar");
      sumar.addEventListener("click", () => {
            producto.quanty++;
            mostrarCarrito();
            mostrarContadorCarrito();
      });

      // boton eliminar productos
      const borrarProducto = carritoBody.querySelector(".borrar-producto");
      borrarProducto.addEventListener ("click", () => {
         borrarProductoCarrito(producto.id);
      });
   });


   // footer carrito
   const total = cart.reduce((acc, el) => acc + el.price * el.quanty, 0);

   const carritoFooter = document.createElement("div");
   carritoFooter.className = "carrito-footer"
   carritoFooter.innerHTML = `
   <div class="total-precio"> Total a Pagar: $ ${total}</div>
   <button class="btn-primary" id="checkout-btn"> Pagar </button>
   <div id="button-checkout"></div>
   `;
   carritoContainer.append(carritoFooter);

      // mercado pago
      // Add SDK credentials
      // REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel

   const mercadopago = new MercadoPago('TEST-02d4208d-7139-439f-8162-96ee34befe9e', {
      locale: 'es-AR' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
   });

   const checkoutButton = carritoFooter.querySelector("#checkout-btn");

   checkoutButton.addEventListener("click", function () {
         // eliminar boton despues de utilizarlo
      checkoutButton.remove();

         // creacion de la orden de compra
      const orderData = {
            quantity: 1,
            description: "Orden de compra",
            price: total,
      };

      fetch("http://localhost:8080/create_preference", {
         method: "POST",
         headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
   })
      .then(function (response) {
         return response.json();
   })
      .then(function (preference) {
         createCheckoutButton(preference.id);
   })
      .catch(function () {
         alert("Unexpected error");
   });
});

function createCheckoutButton(preferenceId) {
   // Initialize the checkout
   const bricksBuilder = mercadopago.bricks();

   const renderComponent = async (bricksBuilder) => {
      // if (window.checkoutButton) checkoutButton.unmount();
      await bricksBuilder.create(
      'wallet',
      'button-checkout', // class/id where the payment button will be displayed
      {
         initialization: {
         preferenceId: preferenceId
      },
      callbacks: {
         onError: (error) => console.error(error),
         onReady: () => {}
      },
      }
   );
   };
   window.checkoutButton =  renderComponent(bricksBuilder);
}

   } else {
      const carritoTexto = document.createElement("h2")
      carritoTexto.className = "carrito-body";
      carritoTexto.innerText = "Tu Carrito esta Vacio";
      carritoContainer.append(carritoTexto);
   };
};

// mostrar carrito
cartBtn.addEventListener("click", mostrarCarrito);

// funcionalidad de borrar producto
const borrarProductoCarrito = (id) => {
   const encontrarId = cart.findIndex((element) => element.id === id);
   cart.splice(encontrarId, 1);
   mostrarCarrito();
   mostrarContadorCarrito();
};


// contador del carrito
const mostrarContadorCarrito = () => {
   const carritoLength = cart.reduce((acc, el) => acc + el.quanty, 0);
   if (carritoLength > 0){
      carritoContador.style.display = "block";
      carritoContador.innerText = carritoLength;
   } else {
      carritoContador.style.display = "none";
   }
};




























