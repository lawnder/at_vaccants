// const firebaseConfig = {
//   apiKey: "AIzaSyD3g_eDAkQ2unI0vx7a40kK0hU_OIHUpbc",
//   authDomain: "at-postulaciones.firebaseapp.com",
//   databaseURL: "https://at-postulaciones-default-rtdb.firebaseio.com",
//   projectId: "at-postulaciones",
//   storageBucket: "at-postulaciones.appspot.com",
//   messagingSenderId: "69327211593",
//   appId: "1:69327211593:web:288f6b4e15e08364ae0398",
// };
const firebaseConfig = {
  apiKey: "AIzaSyDQExoqMWRdCNN6QvGb_YuHQaXHH2GWhcY",
  authDomain: "at-vacantes.firebaseapp.com",
  databaseURL: "https://at-vacantes-default-rtdb.firebaseio.com",
  projectId: "at-vacantes",
  storageBucket: "at-vacantes.appspot.com",
  messagingSenderId: "905336209057",
  appId: "1:905336209057:web:6efb30ef638427abeafae0",
};

function convertirFechaMilisegundos(fechaMilisegundos) {
  var fecha = new Date(fechaMilisegundos);

  var dia = fecha.getDate();
  var mes = fecha.getMonth() + 1; // Los meses se indexan desde 0
  var anio = fecha.getFullYear();
  var horas = fecha.getHours();
  var minutos = fecha.getMinutes();
  var ampm = horas >= 12 ? "pm" : "am";

  // Formatear día y mes con dos dígitos (agregar ceros iniciales si es necesario)
  dia = dia < 10 ? "0" + dia : dia;
  mes = mes < 10 ? "0" + mes : mes;

  // Convertir horas a formato de 12 horas
  horas = horas % 12;
  horas = horas ? horas : 12; // 0 se convierte en 12

  // Formatear minutos con dos dígitos (agregar ceros iniciales si es necesario)
  minutos = minutos < 10 ? "0" + minutos : minutos;

  // Construir la cadena de fecha y hora en el formato deseado
  var formatoFechaHora =
    dia + "/" + mes + "/" + anio + " " + horas + ":" + minutos + "" + ampm;

  return formatoFechaHora;
}

function generarClaveUnica(x) {
  var caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var clave = "";

  for (var i = 0; i < x; i++) {
    var indice = Math.floor(Math.random() * caracteres.length);
    clave += caracteres.charAt(indice);
  }

  return clave;
}
