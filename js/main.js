/* JS para proyector de sliders */

const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const slider = document.querySelector('.slider');
let slideIndex = 0;
let timer;
let touchStartX = 0;
let touchEndX = 0;

function showSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove('active');
  });
  slides[index].classList.add('active');
}

function nextSlide() {
  slideIndex++;
  if (slideIndex > slides.length - 1) {
    slideIndex = 0;
  }
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }
  showSlide(slideIndex);
}

function startSlider() {
  timer = setInterval(nextSlide, 5000);
}

function stopSlider() {
  clearInterval(timer);
}

showSlide(slideIndex);
startSlider();

nextBtn.addEventListener('click', () => {
  stopSlider();
  nextSlide();
  startSlider();
});

prevBtn.addEventListener('click', () => {
  stopSlider();
  prevSlide();
  startSlider();
});

slider.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  if (touchEndX < touchStartX) {
    // Deslizar a la izquierda
    stopSlider();
    nextSlide();
    startSlider();
  } else if (touchEndX > touchStartX) {
    // Deslizar a la derecha
    stopSlider();
    prevSlide();
    startSlider();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth <= 768) {
    // Cambiar las imágenes para móvil
    slides[0].innerHTML = `<img src="./assets/images/slider1-mobile.jpg" alt="Imagen 1">`;
    slides[1].innerHTML = `<img src="./assets/images/slider2-mobile.jpg" alt="Imagen 2">`;
    slides[2].innerHTML = `<img src="./assets/images/slider3-mobile.jpg" alt="Imagen 3">`;
  } else {
    // Volver a las imágenes de escritorio
    slides[0].innerHTML = `<img src="./assets/images/slider1-desktop.jpg" alt="Imagen 1">`;
    slides[1].innerHTML = `<img src="./assets/images/slider2-desktop.jpg" alt="Imagen 2">`;
    slides[2].innerHTML = `<img src="./assets/images/slider3-desktop.jpg" alt="Imagen 3">`;
  }
});
/* JS para proyector de sliders */

const usuario = {usuario:"",clave:""}
let msg
let valido
let bandera

//logueado()

/*
// Mensaje sobre el icono del carrito -->
const registrese = document.querySelector(".cart")
registrese.addEventListener("mouseover",() => {
    const on = document.querySelector(".registrese")
    on.classList.remove("on")
})
registrese.addEventListener("mouseout",() => {
    const on = document.querySelector(".registrese")
    on.classList.add("on")
})
// Mensaje sobre el icono del carrito /-->
*/

/*
// Modal -->
const abrir = document.querySelector(".login")
const cerrar = document.querySelector(".cruze")
const modal = document.querySelector(".modal-login")
const modalC = document.querySelector(".modal-container")
const msj = document.querySelector(".msj")


abrir.addEventListener("click", (e) => {
    e.preventDefault()
    modalC.style.visibility = "visible";
    modal.classList.toggle("modal-close");
})

cerrar.addEventListener("click",() => {
    modal.classList.toggle("modal-close");
    setTimeout(() => {
        modalC.style.visibility = "hidden";
        if (bandera == 1) {
            msj.classList.toggle("alert-danger");
            msj.innerText = "Si Usted ya se encuentra registrado, por favor complete su Usuario y Clave.";
            bandera = 0
        }
    },500)
})

window.addEventListener("click", (e) => {
    if (e.target == modalC) {
        modal.classList.toggle("modal-close");
        setTimeout(() => {
            modalC.style.visibility = "hidden";
            if (bandera == 1) {
                msj.classList.toggle("alert-danger");
                msj.innerText = "Si Usted ya se encuentra registrado, por favor complete su Usuario y Clave.";
                bandera = 0
            }
        },500)
    }
})

// Modal /-->
*/

// Login usuario -->

const formLogin = document.querySelector("#formLogin")

formLogin.addEventListener("submit", (e) => {
    e.preventDefault()
    usuario.usuario = formLogin.usuario.value 
    usuario.clave = formLogin.clave.value
    validaUsuarioClave(usuario.usuario,usuario.clave,2)
    if (valido==1) {
        bandera == 1 && msj.classList.toggle("alert-danger");
        msj.classList.toggle("alert-success");
        msj.innerText = "Login Exitoso!";
        setTimeout(() => {
            modal.classList.toggle("modal-close");
        },800)
        setTimeout(() => {
            modalC.style.visibility = "hidden";
        },1300)
        localStorage.setItem('userAct',usuario.usuario)
        window.location.reload()
    }else{
        bandera !== 1 && msj.classList.toggle("alert-danger");
        msj.innerText = "Usuario/Clave incorrecto";
        formLogin.usuario.value = ""
        formLogin.clave.value = ""
        bandera=1
    }
})
// Login usuario /-->

/*
// Logout usuario -->
const logout = document.querySelector(".logout")
logout.addEventListener("click",() => {
    localStorage.removeItem('userAct');
    location.href = "./index.html"
})
// Logout usuario /-->

*/

// Indicador de articulos en carrito -->
function indexcart (userAct) {
    const cantCarrito = document.querySelector("#cant_carrito")
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []
    let userCantCart = 0
    for (const cart of carrito) {
        userCantCart += cart.idCart == userAct && cart.cantidad
    }
    cantCarrito.innerText = userCantCart
}
// Indicador de articulos en carrito /-->

/*
// Verifica si hay un usuario logueado y prende las opciones de usuario registrado -->
function logueado(){
    let userAct = localStorage.getItem('userAct')
    const logIN = document.querySelector(".in")
    const logOUT = document.querySelector(".out")
    let nombre
    let apellido
    if (userAct !== null){
        logIN.classList.remove("on")
        logOUT.classList.add("on")
        const registrados = JSON.parse(localStorage.getItem('registrados')) || []
        for (const registrado of registrados) {
            if (registrado.email == userAct) { 
                nombre = registrado.nombre;
                apellido = registrado.apellido;
                break;
            }else {
                nombre = userAct
                apellido = ""
            }
        }
        const nombreUsuario = document.querySelector(".nombreUsuario")
        nombreUsuario.innerText = `${nombre} ${apellido}`
        indexcart(userAct)

    }else{
        logIN.classList.add("on")
        logOUT.classList.remove("on")
    }
}
// Verifica si hay un usuario Logueado y prende las opciones de usuario registrado /-->
*/

// Valida usuario o usuario y clave -->
function validaUsuarioClave(user,pass,num) {
    const registrados = obtenerInfoUsuarios()
    valido = 0
    if (num == 1) {
        for (const registrado of registrados) {
            valido = user == registrado.email && 1   
        }
        return (valido);
    }else if (num == 2){
        for (const registrado of registrados) {
            if (user == registrado.email && pass == registrado.clave) {valido = 1}   
        }
        return (valido);
    }
}
// Valida usuario o usuario y clave /-->

// Constructor de usuarios -->
class cliente {
    constructor(nombre, apellido, email, telefono, provincia, pais, clave) {
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.telefono = telefono
        this.provincia = provincia
        this.pais = pais
        this.clave = clave
    }
}
// Constructor de usuarios /-->

// Obtener los usuarios registrados o bien crea el default -->
function obtenerInfoUsuarios(){
    let registrados = JSON.parse(localStorage.getItem('registrados'))
    if (registrados == null) {

        registrados = [
            new cliente ("Administrador","JEC Music","admin@admin","1163536950","Buenos Aires","Argentina","1234")
        ]
        let registradosStrify = JSON.stringify(registrados)
        localStorage.setItem('registrados',registradosStrify)
    }
    return registrados;
}
// Obtener los usuarios registrados o bien crea el default /-->

// Arma listado de articulos -->
function armaListaProductos (articulos,listarEn) {
    for (const articulo of articulos) {
            const producto = document.createElement("div")
            producto.className = "col-12 col-md-6 col-lg-4 cajasOferta"
            producto.innerHTML = `<div class ="product">
                                        <div class="prod-img d-flex align-items-center">
                                            <img src="./assets/images/${articulo.imagen}" class="img-fluid" alt="${articulo.nombre}"> 
                                        </div>
                                        <div class="prod-nombre d-none">
                                            <h4>${articulo.nombre}</h4>
                                            <span>${articulo.idArt}</span>
                                        </div>
                                        <div class="prod-precio">
                                            <span>$ ${articulo.precio}</span>
                                        </div>
                                        <div class="cant-add mt-2">
                                            <input type="number" name="cantidad" id="cant-${listarEn.classList[0]}-${articulo.idArt}" min="1" class="cantidades mx-2" value="1" required="">
                                            <input type="button" value="Encargar" id="add-${listarEn.classList[0]}-${articulo.idArt}" class="btn btn-danger btn-compra" title="Sumar a su compra">
                                        </div>
                                    </div>`;
            listarEn.appendChild(producto);
            const addProduct = document.querySelector(`#add-${listarEn.classList[0]}-${articulo.idArt}`)
                const cajaCant = document.querySelector(`#cant-${listarEn.classList[0]}-${articulo.idArt}`)
                addProduct.addEventListener("click",() => {
                    let cant = parseInt(cajaCant.value)
                    let carrito = JSON.parse(localStorage.getItem('carrito')) || []
                    if (carrito == "") {
                        carrito =[{item:1,cantidad:cant,idCart:userAct,...articulo}]
                    }else{
                        let itemMax = i = 0
                        let otroIgual
                        for (const cart of carrito) {
                            if (userAct == cart.idCart){
                                if (articulo.idArt == cart.idArt) {
                                    cart.cantidad += cant 
                                    otroIgual=1
                                    break;
                                }else{
                                    itemMax = (itemMax < cart.item) && cart.item
                                    otroIgual = 0
                                }
                            }else{i += 1}
                        }
                        otroIgual == 0 && carrito.push({item:(itemMax + 1),cantidad:cant,idCart:userAct,...articulo})
                        i == carrito.length && carrito.push({item:1,cantidad:cant,idCart:userAct,...articulo})
                    }
                    carritoStrify = JSON.stringify(carrito)
                    localStorage.setItem('carrito',carritoStrify)
                    indexcart(userAct)

                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'center',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                        
                    Toast.fire({
                        icon: 'success',
                        title: `${articulo.nombre}\nAgregado al carrito!`
                    })
                })
    } 
}
// Arma listado de articulos /-->

// Arma listado de articulos segun categoria -->
function cargarArt (listarEn,categoria){
const cargarArti = async () => {
    const arrayArt = await fetch('./data/articulos.json')
    const articulos = await arrayArt.json()
    const catArt = await fetch('./data/cat-articulos.json')
    const catArticulos = await catArt.json()
    artListar = filtraArt(articulos,catArticulos,categoria)
    armaListaProductos(artListar,listarEn)
}
cargarArti()
}
// Arma listado de articulos segun categoria /-->

// Filtra articulos a mostrar del total de articulos -->
function filtraArt (articulos,artFiltrar,categ){
    let articulosMostrar = []
    for (const arti of articulos) {
        for (const articulo of artFiltrar) {
            if (articulo.categoria == categ && arti.idArt == articulo.idArt) {
                articulosMostrar.push(arti)
            }  
        }
    }
    return articulosMostrar
}
// Filtra articulos a mostrar del total de articulos /-->

// Despliegue del menu de categorias -->
const drop = document.querySelector("#drop")
const categMenu = document.querySelector(".categ-menu")
drop.addEventListener("mouseover",()=>{
    categMenu.classList.remove("d-none")
})
categMenu.addEventListener("mouseover",()=>{
    categMenu.classList.remove("d-none")
})
drop.addEventListener("mouseout",()=>{
    categMenu.classList.add("d-none")
})
categMenu.addEventListener("mouseout",()=>{
    categMenu.classList.add("d-none")
})
// Despliegue del menu de categorias /-->

// Sube al localStorage la categoria seleccionada -->
const productosFull = document.querySelector("#productosFull")
const accesorios = document.querySelector("#accesorios")
const baterias = document.querySelector("#baterias")
const bajos = document.querySelector("#bajos")
const guitarras = document.querySelector("#guitarras")
const teclados = document.querySelector("#teclados")
const sonido = document.querySelector("#sonido")
productosFull.addEventListener("click",()=>{localStorage.setItem('categ-activa','productosFull')})
accesorios.addEventListener("click",()=>{localStorage.setItem('categ-activa','accesorios')})
baterias.addEventListener("click",()=>{localStorage.setItem('categ-activa','baterias')})
bajos.addEventListener("click",()=>{localStorage.setItem('categ-activa','bajos')})
guitarras.addEventListener("click",()=>{localStorage.setItem('categ-activa','guitarras')})
teclados.addEventListener("click",()=>{localStorage.setItem('categ-activa','teclados')})
sonido.addEventListener("click",()=>{localStorage.setItem('categ-activa','sonido')})
// Sube al localStorage la categoria seleccionada /-->

// Muestra el menu responsive -->
const btn = document.querySelector("#btn-menu")
btn.addEventListener("click", () => {
    const menu = document.querySelector(".menu")
    menu.classList.toggle("d-block")
})
// Muestra el menu responsive /-->