// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Obtener referencia a la base de datos de Firebase
var database = firebase.database();

// Escuchar el evento submit del formulario
document
  .getElementById("formulario")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Obtener los valores de los campos del formulario
    var titulo = document.getElementById("titulo").value;
    var perfil = document.getElementById("perfil").value;
    var modalidad = document.getElementById("modalidad").value;
    var descripcion = document.getElementById("descripcion").value;
    var esquemaPago = document.getElementById("esquema").value;

    var fechaActual = new Date().getTime();

    // Crear un objeto con los datos del formulario
    var formularioData = {
      titulo: titulo,
      perfil: perfil,
      modalidad: modalidad,
      descripcion: descripcion,
      fechaHora: fechaActual,
      esquemaPago: esquemaPago,
    };

    // Guardar los datos en la base de datos de Firebase
    // Guardar los datos del formulario en Firebase
    var claveUnica = generarClaveUnica(7);
    database
      .ref("formularios/" + claveUnica)
      .set(formularioData)
      .then(function () {
        console.log("Datos del formulario guardados exitosamente.");
      })
      .catch(function (error) {
        console.error("Error al guardar los datos del formulario:", error);
      });
    // var nuevoFormularioRef = database.ref("formularios").push();
    // nuevoFormularioRef.set(formularioData);

    // Reiniciar el formulario
    // document.getElementById("formulario").reset();

    // Prevenir el envío del formulario
    event.preventDefault();

    // Redireccionar a la URL deseada
    window.location.href = "index.html";
  });
