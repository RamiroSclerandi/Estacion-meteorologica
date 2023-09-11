firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

function mostrarUltimaMedicion() {
  // Obtener una referencia a la colección "mediciones"
  const medicionesRef = db.collection('mediciones');
  // Consultar el último documento en la colección "mediciones"
  medicionesRef
    .orderBy('fecha', 'desc')
    .orderBy('hora', 'desc')
    .limit(1)
    .get()
    .then((querySnapshot) => {
      // Verificar si se encontró un documento
      if (!querySnapshot.empty) {
        // Obtener el primer documento encontrado
        const doc = querySnapshot.docs[0];
        // Obtener los valores de los campos "temperatura" y "temperaturaApi"
        const temperatura = doc.data().temperatura;
        const temperaturaApi = doc.data().temperaturaApi;
        const humedad = doc.data().humedad;
        const humedadApi = doc.data().humedadApi;
        const presion = doc.data().presion;
        const presionApi = doc.data().presionApi;
        const fecha = doc.data().fecha;
        const hora = doc.data().hora;

        //const fechaAntigua = fecha.replaceAll('/','-');
        const partesFecha = fecha.split('-');
        const nuevaFecha = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;

        let errorAbsolutoT = temperatura - temperaturaApi;
        let errorAbsolutoH = humedad - humedadApi;
        let errorAbsolutoP = presion - presionApi;
                
        if (errorAbsolutoT < 0) {
          errorAbsolutoT = errorAbsolutoT * (-1);
        }
        if (errorAbsolutoH < 0) {
          errorAbsolutoH = errorAbsolutoH * (-1);
        }  
        if (errorAbsolutoP < 0) {
          errorAbsolutoP = errorAbsolutoP * (-1);
        }

        const errorRelativoT = (errorAbsolutoT / temperaturaApi) * 100;
        const errorRelativoH = (errorAbsolutoH / humedadApi) * 100;
        const errorRelativoP = (errorAbsolutoP / presionApi) * 100;
        // Actualizar el contenido de los elementos span con los valores obtenidos
        document.getElementById('valor_temperatura_sensor').textContent = temperatura + ' °C';
        document.getElementById('valor_temperatura_API').textContent = temperaturaApi + ' °C';
        document.getElementById('valor_humedad_sensor').textContent = humedad + ' %';
        document.getElementById('valor_humedad_API').textContent = humedadApi + ' %';
        document.getElementById('valor_presion_sensor').textContent = presion + ' hPa';
        document.getElementById('valor_presion_API').textContent = presionApi + ' hPa';
        document.getElementById('fecha-hora-medicion').textContent = 'Fecha y hora de la medición: ' + nuevaFecha + ' ' + hora + ' hs';
        document.getElementById('valor_comparacion_temperatura').textContent = errorAbsolutoT.toFixed(2) + ' °C / ' + errorRelativoT.toFixed(2) + ' %'; 
        document.getElementById('valor_comparacion_humedad').textContent = errorAbsolutoH.toFixed(2) + ' % / ' + errorRelativoH.toFixed(2) + ' %';
        document.getElementById('valor_comparacion_presion').textContent = errorAbsolutoP.toFixed(2) + ' hPa / ' + errorRelativoP.toFixed(2) + ' %';
      }
    });
}
document.addEventListener('DOMContentLoaded', mostrarUltimaMedicion);

function cargarHoraMediciones() {
  const selectorFecha = document.getElementById('fecha');
  const fechaInput = selectorFecha.value;
  const fechaAntigua = fechaInput.replaceAll('/','-');
  const partesFecha = fechaAntigua.split('-');
  const nuevaFecha = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;
  const db = firebase.firestore();
  const medicionesRef = db.collection('mediciones');

  medicionesRef
    .where('fecha', '==', nuevaFecha)
    .get()
    .then((querySnapshot) => {
      const horas = [];
      querySnapshot.forEach((doc) => {
        const hora = parseInt(doc.data().hora);
        horas.push(hora);
      });

      const selectorHora = document.getElementById('hora');
      selectorHora.innerHTML = '';

      horas.forEach((hora) => {
        const option = document.createElement('option');
        option.value = hora;
        option.text = hora;
        selectorHora.appendChild(option);
      });
    })
    .catch((error) => {
      console.log('Ha ocurrido un error: ', error)
    });
}

function consultarMediciones(event) {
  // Prevenir el comportamiento predeterminado del formulario
  event.preventDefault();

  // Obtener los valores de los campos "fecha" y "hora"
  const fechaInput = document.getElementById('fecha').value;
  const horaInput = document.getElementById('hora').value;

  // Reemplazar los "/" por "-" y obtener el formato correcto de fecha
  const fechaAntigua = fechaInput.replaceAll('/','-');
  const partesFecha = fechaAntigua.split('-');
  const nuevaFecha = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;
  console.log(nuevaFecha)

  // Obtener una referencia a la colección "mediciones"
  const medicionesRef = db.collection('mediciones');

  // Consultar el documento que coincida con la fecha y hora seleccionadas
  medicionesRef
    .where('fecha', '==', nuevaFecha)
    .where('hora', '==', parseInt(horaInput))
    .get()
    .then((querySnapshot) => {
      // Verificar si se encontró un documento
      if (!querySnapshot.empty) {
        // Obtener el primer documento encontrado
        const doc = querySnapshot.docs[0];

        // Obtener los valores de los campos "temperatura" y "temperaturaApi"
        const temperatura = doc.data().temperatura;
        const temperaturaApi = doc.data().temperaturaApi;
        const humedad = doc.data().humedad;
        const humedadApi = doc.data().humedadApi;
        const presion = doc.data().presion;
        const presionApi = doc.data().presionApi;
        const fecha = doc.data().fecha;
        const hora = doc.data().hora;
        
        let errorAbsolutoT = temperatura - temperaturaApi;
        let errorAbsolutoH = humedad - humedadApi;
        let errorAbsolutoP = presion - presionApi;
                
        if (errorAbsolutoT < 0) {
          errorAbsolutoT = errorAbsolutoT * (-1);
        }
        if (errorAbsolutoH < 0) {
          errorAbsolutoH = errorAbsolutoH * (-1);
        }  
        if (errorAbsolutoP < 0) {
          errorAbsolutoP = errorAbsolutoP * (-1);
        }

        const errorRelativoT = (errorAbsolutoT / temperaturaApi) * 100;
        const errorRelativoH = (errorAbsolutoH / humedadApi) * 100;
        const errorRelativoP = (errorAbsolutoP / presionApi) * 100;

        // Actualizar el contenido de los elementos span con los valores obtenidos
        document.getElementById('valor_temperatura_sensor').textContent = temperatura + ' °C';
        document.getElementById('valor_temperatura_API').textContent = temperaturaApi + ' °C';
        document.getElementById('valor_humedad_sensor').textContent = humedad + ' %';
        document.getElementById('valor_humedad_API').textContent = humedadApi + ' %';
        document.getElementById('valor_presion_sensor').textContent = presion + ' hPa';
        document.getElementById('valor_presion_API').textContent = presionApi + ' hPa';
        document.getElementById('fecha-hora-medicion').textContent = 'Fecha y hora de la medición: ' + fecha + ' ' + hora + ' hs';
        document.getElementById('valor_comparacion_temperatura').textContent = errorAbsolutoT.toFixed(2) + ' °C / ' + errorRelativoT.toFixed(2) + ' %'; 
        document.getElementById('valor_comparacion_humedad').textContent = errorAbsolutoH.toFixed(2) + ' % / ' + errorRelativoH.toFixed(2) + ' %';
        document.getElementById('valor_comparacion_presion').textContent = errorAbsolutoP.toFixed(2) + ' hPa / ' + errorRelativoP.toFixed(2) + ' %';
      }
    });
}
// Obtener una referencia al formulario
const form = document.querySelector('form');

// Agregar un controlador de eventos para el evento "submit" del formulario
form.addEventListener('submit', consultarMediciones);
