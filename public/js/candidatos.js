firebase.initializeApp(firebaseConfig);

// Obtener referencia a la base de datos
var database = firebase.database();

var urlParams = new URLSearchParams(window.location.search);
var key = urlParams.get("key");

// Obtener referencia a la lista HTML
var lista = document.getElementById("lista");
var linkform = document.getElementById("linkform");
linkform.textContent = "at_postulaciones/postulacion.html?key=" + key;

// Escuchar cambios en la base de datos y actualizar la lista

database
  .ref("candidatos")
  .orderByChild("fechaHora")
  .on("value", function (snapshot) {
    // Limpiar la lista antes de actualizarla
    lista.innerHTML = "";

    // Recorrer los datos y agregar claves únicas a la lista
    snapshot.forEach(function (childSnapshot) {
      var claveUnica = childSnapshot.key;
      var nombre = childSnapshot.val().nombre;
      var telefono = childSnapshot.val().telefono;
      var email = childSnapshot.val().email;
      var fecha = childSnapshot.val().fechaHora;
      var residencia = childSnapshot.val().residencia;

      if (claveUnica.includes(key)) {
        console.log("El texto contiene la palabra buscada");
        // Crear un elemento de lista y agregar el enlace con el título y la clave única
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#"; // Puedes establecer la URL adecuada aquí
        // a.innerHTML = "<b>" + titulo + "</b><span class=\"\"aasss\"></span>Clave:" + claveUnica;
        li.innerHTML =
          "Nombre: <b>" +
          nombre +
          "</b><br>Telefono: <b>" +
          telefono +
          "</b></b><br>Email: <b>" +
          email +
          "</b></b><br>Residencia: <b>" +
          residencia +
          "</b></b><br>Fecha: <b>" +
          convertirFechaMilisegundos(fecha) +
          "<span class='sp2'></span>";
        li.appendChild(a);

        // Agregar el elemento de lista a la lista HTML
        lista.appendChild(li);
      } else {
        console.log("El texto no contiene la palabra buscada");
      }
    });

    var listItems = lista.querySelectorAll("li");
    var listItemsArray = Array.from(listItems).reverse();
    // Vaciar la lista <ul>
    lista.innerHTML = "";

    // Agregar los elementos <li> en orden inverso
    listItemsArray.forEach(function (item) {
      lista.appendChild(item);
    });
  });

//   COPIAR TEXTO

function copiarTexto() {
  // Obtiene el valor del input de texto
  var urlParams = new URLSearchParams(window.location.search);
  var texto =
    // "file:///Users/fresendez/LawnderSoft/At_sys/at_postulaciones/postulacion.html?key=" + //DEV
    "https://tuinvitacionweb.com.mx/vacantes/postulacion.html?key=" +
    urlParams.get("key");
  // const texto = document.getElementById('texto').value;

  // Crea un elemento de texto temporal
  const elementoTemporal = document.createElement("textarea");
  elementoTemporal.value = texto;

  // Agrega el elemento al DOM
  document.body.appendChild(elementoTemporal);

  // Selecciona el texto del elemento
  elementoTemporal.select();
  elementoTemporal.setSelectionRange(0, 99999); // Para dispositivos móviles

  // Copia el texto al portapapeles
  document.execCommand("copy");

  // Elimina el elemento temporal del DOM
  document.body.removeChild(elementoTemporal);

  // Mensaje de confirmación
  alert("Enlace copiado: " + texto);
}
