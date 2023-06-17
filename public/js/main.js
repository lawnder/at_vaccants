firebase.initializeApp(firebaseConfig);

// Obtener referencia a la base de datos
var database = firebase.database();

// Obtener referencia a la lista HTML
var lista = document.getElementById("lista");

// Escuchar cambios en la base de datos y actualizar la lista
database
  .ref("formularios")
  .orderByChild("fechaHora")
  .on("value", function (snapshot) {
    // Limpiar la lista antes de actualizarla
    lista.innerHTML = "";

    // Recorrer los datos y agregar claves únicas a la lista
    snapshot.forEach(function (childSnapshot) {
      var claveUnica = childSnapshot.key;
      var titulo = childSnapshot.val().titulo;
      var fecha = childSnapshot.val().fechaHora;

      // Crear un elemento de lista y agregar el enlace con el título y la clave única
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "candidatos.html?key=" + claveUnica; // Puedes establecer la URL adecuada aquí
      // a.innerHTML = "<b>" + titulo + "</b><span class=\"\"aasss\"></span>Clave:" + claveUnica;
      a.innerHTML =
        "<i class='fas fa-briefcase i-vacant'></i>" +
        claveUnica +
        "<span class='sp1'></span><b>" +
        titulo +
        "<span class='sp1'></span><b>" +
        convertirFechaMilisegundos(fecha) +
        "</b><span class='sp2'></span>";
      li.appendChild(a);

      // Agregar el elemento de lista a la lista HTML
      lista.appendChild(li);

      var listItems = lista.querySelectorAll("li");
      var listItemsArray = Array.from(listItems).reverse();
      // Vaciar la lista <ul>
      lista.innerHTML = "";

      // Agregar los elementos <li> en orden inverso
      listItemsArray.forEach(function (item) {
        lista.appendChild(item);
      });
    });
  });

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // El usuario está autenticado
    console.log("Usuario autenticado:", user);
    var loginbtn = document.getElementById("loginForm");
    loginbtn.style.display = "none";
    var logoutbtn = document.getElementById("logout-btn");
    logoutbtn.style.display = "block";
    var createbtn = document.getElementById("createbtn");
    createbtn.style.display = "block";
    var lista = document.getElementById("lista");
    lista.style.display = "block";
  } else {
    var loginbtn = document.getElementById("loginForm");
    loginbtn.style.display = "block";
    var logoutbtn = document.getElementById("logout-btn");
    logoutbtn.style.display = "none";
    var createbtn = document.getElementById("createbtn");
    createbtn.style.display = "none";
    var lista = document.getElementById("lista");
    lista.style.display = "none";
  }
});

function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // El usuario ha cerrado sesión exitosamente
      console.log("Sesión cerrada");
    })
    .catch(function (error) {
      // Ha ocurrido un error al cerrar sesión
      console.error("Error al cerrar sesión:", error);
    });
}

// Obtener referencia al formulario de inicio de sesión
var loginForm = document.getElementById("loginForm");

// Manejar el evento de envío del formulario
loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar el envío del formulario por defecto

  // Obtener los valores de los campos de entrada
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Autenticar al usuario utilizando Firebase Authentication
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      // Autenticación exitosa, puedes redirigir o realizar otras acciones
      var user = userCredential.user;
      console.log("Usuario autenticado:", user);
      var divElement = document.getElementById("alertContainer");

      // Eliminar el elemento div
      divElement.remove();
    })
    .catch(function (error) {
      // Error en la autenticación, maneja el error adecuadamente
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error("Error de autenticación:", errorCode, errorMessage);
      var alertContainer = document.getElementById("alertContainer");
      var alertDiv = document.createElement("div");
      alertDiv.className = "alert alert-danger";
      alertDiv.textContent = "Las credenciales proporcionadas son inválidas.";
      alertContainer.appendChild(alertDiv);
    });
});
