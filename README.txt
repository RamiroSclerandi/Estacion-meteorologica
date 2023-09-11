Estación meteorológica montada sobre una Raspberry pi para la prueba de los sensores: DHT 11 y BMP 280

Bienvenido al repositorio del proyecto "estación-meteorológica". Este proyecto se centra en la implementación de una pequeña estación meteorológica utilizando una Raspberry Pi para probar y verificar el funcionamiento de los sensores DHT 11 y BMP 280. Las pruebas se llevaron a cabo en un ambiente controlado, en una parte de una casa, por lo que se deben considerar posibles discrepancias al comparar los valores obtenidos con condiciones climáticas en la intemperie.

Características Principales

Captura de Datos de Sensores: La estación recopila datos de humedad relativa, temperatura y presión atmosférica utilizando los sensores DHT 11 y BMP 280 respectivamente.

Visualización en Página Web: Los datos capturados y comparados se presentan en una página web accesible desde cualquier dispositivo con conexión a Internet.

Tecnologías Utilizadas

El proyecto ha sido desarrollado utilizando las siguientes tecnologías:

- Python: para la adquisición y procesamiento de los datos de los sensores.

- HTML: para estructurar la interfaz y el contenido de la aplicación.

- CSS: para el diseño y la presentación visual de la aplicación.

- JavaScript: para la implementación de la lógica y la interactividad de la aplicación.

- Node.js: como entorno de ejecución del servidor para la administración de las mediciones capturadas.

- Firebase Firestore: como Base de datos NoSQL para almacenar y gestionar los datos recopilados.

- Firebase Hosting: para alojar la aplicación web y permitir su acceso desde cualquier lugar.

Instrucciones de Instalación

Para replicar el proyecto se deben congifurar 2 archivos:
- El archivo firebase-configs.js, donde se deben ingresar las credenciales para que se pueda inicializar Firebase y todas sus utilidades. Esto se obtiene ingresando a la configuración del proyecto, en la sección general, dentro de la consola de Firebase.
- El archivo credenciales.json que se encuentra dentro de la carpeta Python, lo cual posibilita que los datos sensados sean subidos a la abse de datos de Firebase. Para encontrar estos datos se debe ingresar a la configuración del proyecto, en la sección cuentas de servicio y tocar el botón generar nueva clave privada, dentro de la consola de Firebase.

Estado del Proyecto

El proyecto está en una versión estable (v1.0.0), lo que significa que las funcionalidades principales están implementadas y listas para ser utilizadas. En futuras actualizaciones se contempla la incorporación de nuevas funcionalidades.

Autoría

El proyecto "Estación meteorológica montada en una raspberry pi para la prueba de sensores" ha sido desarrollado por un equipo de programadores conformado por los siguientes estudiantes:
Ignacio Bertola
Ramiro Sclerandi
Sebastián Baudino

Licencia

El código fuente de este proyecto se comparte públicamente sin ninguna licencia específica. Los usuarios son libres de visualizar, clonar, descargar y modificar el código para uso personal o con fines de aprendizaje. Sin embargo, se prohíbe cualquier uso comercial o redistribución sin el consentimiento explícito de los autores.

Enlaces Relevantes

- Sitio Web: https://estacion-meteorologica-236e9.web.app/

- Repositorio de Github: https://github.com/RamiroSclerandi/estacion-meteorologica

¡Gracias por tu interés en "Estación meteorológica montada en una raspberry pi para la prueba de sensores"! Esperamos que disfrutes utilizando nuestra aplicación web para el análisis de sensores de microcontroladores.