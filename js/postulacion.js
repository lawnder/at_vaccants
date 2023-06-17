// Inicializar la app de Firebase
firebase.initializeApp(firebaseConfig);

// Obtener referencia a la base de datos de Firebase
var database = firebase.database();

// Clave única del formulario en Firebase
var urlParams = new URLSearchParams(window.location.search);
var claveUnica = urlParams.get("key");

// Obtener referencia al formulario específico en la base de datos
var formularioRef = database.ref("formularios/" + claveUnica);

formularioRef.once("value", function (snapshot) {
  var formularioData = snapshot.val();

  // Verificar si la instantánea contiene datos
  if (formularioData !== null) {
    // Verificar si las propiedades existen en el objeto formularioData
    var titulo = formularioData.hasOwnProperty("titulo")
      ? formularioData.titulo
      : "";
    var perfil = formularioData.hasOwnProperty("perfil")
      ? formularioData.perfil
      : "";
    var modalidad = formularioData.hasOwnProperty("modalidad")
      ? formularioData.modalidad
      : "";
    var descripcion = formularioData.hasOwnProperty("descripcion")
      ? formularioData.descripcion
      : "";
    var esquemaPago = formularioData.hasOwnProperty("esquemaPago")
      ? formularioData.esquemaPago
      : "";

    // Reemplazar saltos de línea con etiquetas HTML <br>
    descripcion = descripcion.replace(/\n/g, "<br>");

    // Generar el contenido HTML con la información del formulario
    var contenidoHTML =
      '<div class="info-group"><label>Título:</label><p>' +
      titulo +
      "</p></div>";
    contenidoHTML +=
      '<div class="info-group"><label>Perfil:</label><p>' +
      perfil +
      "</p></div>";
    contenidoHTML +=
      '<div class="info-group"><label>Modalidad:</label><p>' +
      modalidad +
      "</p></div>";
    contenidoHTML +=
      '<div class="info-group"><label>Descripción:</label><p>' +
      descripcion +
      "</p></div>";
    contenidoHTML +=
      '<div class="info-group"><label>Esquema de Pago:</label><p>' +
      esquemaPago +
      "</p></div>";

    // Mostrar el contenido en el elemento con id "formularioInfo"
    document.getElementById("formularioInfo").innerHTML = contenidoHTML;

    var linkform = document.getElementById("info-title");
    linkform.textContent = "Vacante: " + titulo;
  } else {
    // La clave única no existe en la base de datos
    document.getElementById("formularioInfo").innerHTML =
      "El formulario no existe.";
  }
});

var form = document.getElementById("myForm");

// Agregar un evento de escucha para el envío del formulario
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar que se envíe el formulario de manera tradicional

  // Obtener los valores de los campos del formulario
  var nombre = document.getElementById("nombre").value;
  var telefono = document.getElementById("telefono").value;
  var email = document.getElementById("email").value;
  var residencia = document.getElementById("residencia").value;

  // Obtener la fecha y hora actual
  // var now = new Date();
  // var fechaActual = now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
  // var horaActual = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  // var fechaHoraActual = fechaActual + " " + horaActual;

  var fechaActual = new Date().getTime();

  // Crear un nuevo objeto con los datos del formulario
  var formData = {
    nombre: nombre,
    telefono: telefono,
    email: email,
    fechaHora: fechaActual,
    residencia: residencia,
    claveUnica: claveUnica,
  };

  // Guardar los datos en Firebase Realtime Database

  database
    .ref("candidatos/" + claveUnica + "-" + generarClaveUnica(4))
    .set(formData)
    .then(function () {
      var div = document.getElementById("formularioForm");
      var divMessage = document.getElementById("messageForm");
      // Oculta el div
      div.style.display = "none";
      divMessage.style.display = "block";
      alert("¡Formulario enviado con éxito!");
      form.reset(); // Restablecer el formulario
    })
    .catch(function (error) {
      console.error("Error al enviar el formulario:", error);
    });
});
