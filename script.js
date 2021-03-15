async function getItems() {
  let items;
  await fetch("products.json")
    .then((res) => res.json())
    .then((data) => (items = data.items));
  //.then(() => console.log(items));

  return items;
}

let favoritos = [];
let seleccionados = [];

let favImage = document.getElementById("favImage");
favImage.onclick = function () {
  listarFavoritos();
};

const busqueda = document.getElementById("busqueda");
busqueda.onkeyup = function () {
  submitted();
};

async function submitted() {
  let q;
  q = busqueda.value;
  if (q == "") {
    listar();
    return;
  }
  let items;
  await getItems().then((res) => (items = res));
  let flitrados = [];
  items.forEach((element) => {
    if (element.categories.includes(q)) {
      flitrados.push(element);
    }
  });
  listarFiltrados(flitrados);
}

function listarFiltrados(items) {
  let lista = document.getElementById("lista");
  lista.style.visibility = "visible";
  let detail = document.getElementById("detail");
  let parrafo = document.getElementById("parrafo");
  detail.style.visibility = "hidden";
  lista.innerHTML = "";
  detail.innerHTML = "";
  parrafo.innerHTML = "";

  if (items.length == 0) {
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("infoMessage");
    lista.appendChild(messageDiv);
    let messageText = document.createElement("p");
    messageText.classList.add("infoText");
    messageText.innerHTML =
      "Tu busqueda no ha retornado ningún resultado, continúa escribiendo o intenta nuevamente";
    lista.appendChild(messageText);
    return;
  }

  items.forEach((element) => {
    let carta = document.createElement("div");
    carta.classList.add("carta");
    let phoneImg = document.createElement("button");
    phoneImg.classList.add("phoneImg");
    phoneImg.style.backgroundImage = "url(" + element.picture + ")";
    phoneImg.onclick = function () {
      crearDetail(element);
    };
    carta.appendChild(phoneImg);
    let precio = document.createElement("p");
    precio.classList.add("precioCarta");
    precio.innerHTML = "$" + element.price.amount + element.price.currency;
    carta.appendChild(precio);
    if (element.free_shipping == true) {
      let shipping = document.createElement("img");
      shipping.classList.add("shippingImg");
      shipping.setAttribute("src", "/img/shipping.png");
      carta.appendChild(shipping);
    }
    let phoneName = document.createElement("p");
    phoneName.classList.add("phoneName");
    phoneName.innerHTML = element.title;
    carta.appendChild(phoneName);
    let phoneCity = document.createElement("p");
    phoneCity.classList.add("phoneCity");
    phoneCity.innerHTML = element.location;
    carta.appendChild(phoneCity);
    lista.appendChild(carta);
  });
}

async function listar() {
  let items;
  await getItems().then((res) => (items = res));

  let lista = document.getElementById("lista");
  lista.style.visibility = "visible";
  let detail = document.getElementById("detail");
  let parrafo = document.getElementById("parrafo");
  detail.style.visibility = "hidden";
  lista.innerHTML = "";
  detail.innerHTML = "";
  parrafo.innerHTML = "";

  items.forEach((element) => {
    let carta = document.createElement("div");
    carta.classList.add("carta");
    let phoneImg = document.createElement("button");
    phoneImg.classList.add("phoneImg");
    phoneImg.style.backgroundImage = "url(" + element.picture + ")";
    phoneImg.onclick = function () {
      crearDetail(element);
    };
    carta.appendChild(phoneImg);
    let precio = document.createElement("p");
    precio.classList.add("precioCarta");
    precio.innerHTML = "$" + element.price.amount + element.price.currency;
    carta.appendChild(precio);
    if (element.free_shipping == true) {
      let shipping = document.createElement("img");
      shipping.classList.add("shippingImg");
      shipping.setAttribute("src", "/img/shipping.png");
      carta.appendChild(shipping);
    }
    let phoneName = document.createElement("p");
    phoneName.classList.add("phoneName");
    phoneName.innerHTML = element.title;
    carta.appendChild(phoneName);
    let phoneCity = document.createElement("p");
    phoneCity.classList.add("phoneCity");
    phoneCity.innerHTML = element.location;
    carta.appendChild(phoneCity);
    lista.appendChild(carta);
  });
}

listar();

function crearDetail(elemento) {
  let lista = document.getElementById("lista");
  lista.style.visibility = "hidden";
  let detail = document.getElementById("detail");
  detail.style.visibility = "visible";
  lista.innerHTML = "";
  detail.innerHTML = "";

  let breadcrumbs = document.getElementById("parrafo");
  breadcrumbs.className = "breadcrumbs";
  let textoBreadcrumbs = "";
  elemento.categories.forEach((element) => {
    textoBreadcrumbs = textoBreadcrumbs + element + " > ";
  });
  breadcrumbs.innerHTML = textoBreadcrumbs;

  let detailBox = document.createElement("div");
  detailBox.classList.add("detailBox");
  detail.appendChild(detailBox);
  let detailImg = document.createElement("img");
  detailImg.classList.add("detailImg");
  detailImg.setAttribute("src", elemento.picture);
  detail.appendChild(detailImg);
  let soldUnits = document.createElement("p");
  soldUnits.classList.add("soldUnits");
  let condicion = "";
  if (elemento.condition == "new") {
    condicion = "Nuevo";
  } else {
    condicion = "Usado";
  }
  soldUnits.innerHTML =
    condicion + " | " + elemento.sold_quantity + " unidades";
  detail.appendChild(soldUnits);
  let detailName = document.createElement("p");
  detailName.classList.add("detailName");
  let str = elemento.title;
  if (elemento.title.length > 50) {
    str = str.substring(0, 50);
  }
  detailName.innerText = str;
  detail.appendChild(detailName);
  let detailPrice = document.createElement("p");
  detailPrice.classList.add("detailPrice");
  detailPrice.innerHTML = "$" + elemento.price.amount + elemento.price.currency;
  detail.appendChild(detailPrice);
  let comprarButton = document.createElement("button");
  comprarButton.classList.add("comprarButton");
  comprarButton.onclick = function () {
    let anuncio = createAnuncio(str);
    anuncio.forEach((element) => {
      detail.appendChild(element);
    });
  };
  detail.appendChild(comprarButton);
  let comprarText = document.createElement("p");
  comprarText.classList.add("comprarText");
  comprarText.innerHTML = "Comprar";
  detail.appendChild(comprarText);
  let favoritosButton = document.createElement("button");
  favoritosButton.classList.add("favoritosButton");
  detail.appendChild(favoritosButton);
  let favoritosText = document.createElement("p");
  favoritosText.classList.add("favoritosText");
  if (favoritos.includes(elemento)) {
    favoritosText.innerHTML = "Quitar de favoritos";
  } else {
    favoritosText.innerHTML = "Agregar a favoritos";
  }
  favoritosButton.onclick = function () {
    if (favoritos.includes(elemento)) {
      const index = favoritos.indexOf(elemento);
      if (index > -1) {
        favoritos.splice(index, 1);
      }
      favoritosText.innerHTML = "Agregar a favoritos";
    } else {
      favoritos.push(elemento);
      favoritosText.innerHTML = "Quitar de favoritos";
    }
  };

  detail.appendChild(favoritosText);
  let descripcionTitle = document.createElement("p");
  descripcionTitle.classList.add("descripcionTitle");
  descripcionTitle.innerHTML = "Descripción del producto";
  detail.appendChild(descripcionTitle);
  let descripcionText = document.createElement("p");
  descripcionText.classList.add("descripcionText");
  descripcionText.innerHTML = elemento.description;
  detail.appendChild(descripcionText);
}

function createAnuncio(nombre) {
  let anuncio = [];
  let anuncioDiv = document.createElement("div");
  anuncioDiv.classList.add("anuncioDiv");
  anuncio.push(anuncioDiv);
  let nombreAnuncio = document.createElement("p");
  nombreAnuncio.classList.add("nombreAnuncio");
  nombreAnuncio.innerHTML = nombre;
  anuncio.push(nombreAnuncio);
  let anuncioText = document.createElement("p");
  anuncioText.classList.add("anuncioText");
  anuncioText.innerHTML = "Añadido al carrito de compras";
  anuncio.push(anuncioText);
  let anuncioLinea = document.createElement("div");
  anuncioLinea.classList.add("anuncioLinea");
  anuncio.push(anuncioLinea);
  let anuncioButton = document.createElement("button");
  anuncioButton.classList.add("anuncioButton");
  anuncioButton.onclick = function () {
    listar();
  };
  anuncio.push(anuncioButton);
  let anuncioButtonText = document.createElement("p");
  anuncioButtonText.classList.add("anuncioButtonText");
  anuncioButtonText.innerHTML = "Close";
  anuncio.push(anuncioButtonText);
  return anuncio;
}

function listarFavoritos() {
  let lista = document.getElementById("lista");
  lista.style.visibility = "visible";
  let detail = document.getElementById("detail");
  let parrafo = document.getElementById("parrafo");
  detail.style.visibility = "hidden";
  lista.innerHTML = "";
  detail.innerHTML = "";
  parrafo.innerHTML = "Favoritos";
  parrafo.className = "favParrafo";
  let boxes = [];

  let cartaEliminar = document.createElement("div");
  cartaEliminar.classList.add("eliminarDiv");
  lista.appendChild(cartaEliminar);

  let check = document.createElement("button");
  check.classList.add("favCheckBoxTodos");
  cartaEliminar.appendChild(check);

  let eliminarButton = document.createElement("button");
  eliminarButton.classList.add("eliminarButton");
  lista.appendChild(eliminarButton);

  let eliminarText = document.createElement("p");
  eliminarText.classList.add("eliminarText");
  eliminarText.innerHTML = "Eliminar";
  lista.appendChild(eliminarText);

  favoritos.forEach((element) => {
    let carta = document.createElement("div");
    carta.classList.add("carta");
    let check = document.createElement("button");
    check.classList.add("favCheckBox");
    check.onclick = function () {
      if (seleccionados.includes(element)) {
        check.style.backgroundImage = "";
        const index = seleccionados.indexOf(element);
        if (index > -1) {
          seleccionados.splice(index, 1);
        }
      } else {
        seleccionados.push(element);
        check.style.backgroundImage = "url(/img/check.png)";
      }
    };
    boxes.push(check);
    carta.appendChild(check);
    let phoneImg = document.createElement("button");
    phoneImg.classList.add("favoritesPhoneImg");
    phoneImg.style.backgroundImage = "url(" + element.picture + ")";
    phoneImg.onclick = function () {
      crearDetail(element);
    };
    carta.appendChild(phoneImg);
    let precio = document.createElement("p");
    precio.classList.add("precioCarta");
    precio.innerHTML = "$" + element.price.amount + element.price.currency;
    carta.appendChild(precio);
    if (element.free_shipping == true) {
      let shipping = document.createElement("img");
      shipping.classList.add("shippingImg");
      shipping.setAttribute("src", "/img/shipping.png");
      carta.appendChild(shipping);
    }
    let phoneName = document.createElement("p");
    phoneName.classList.add("phoneName");
    phoneName.innerHTML = element.title;
    carta.appendChild(phoneName);
    let verArticuloButton = document.createElement("button");
    verArticuloButton.classList.add("verArticuloButton");
    verArticuloButton.onclick = function () {
      crearDetail(element);
    };
    carta.appendChild(verArticuloButton);
    let verArticuloText = document.createElement("p");
    verArticuloText.classList.add("verArticuloText");
    verArticuloText.innerHTML = "Ver Artículo";
    carta.appendChild(verArticuloText);
    lista.appendChild(carta);
  });

  check.onclick = function () {
    if (seleccionados.length < favoritos.length) {
      boxes.forEach((element) => {
        element.style.backgroundImage = "url(/img/check.png)";
      });
      favoritos.forEach((element) => {
        if (!seleccionados.includes(element)) {
          seleccionados.push(element);
        }
      });
    } else {
      seleccionados = [];
      boxes.forEach((element) => {
        element.style.backgroundImage = "";
      });
    }
  };

  eliminarButton.onclick = function () {
    seleccionados.forEach((element) => {
      const index = favoritos.indexOf(element);
      if (index > -1) {
        favoritos.splice(index, 1);
      }
    });
    listarFavoritos();
  };
}
