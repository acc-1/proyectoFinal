Documentación e instrucciones para ejecutarlo localmente.

El proyecto consiste en una aplicación de cotización de seguros con dos componentes principales: CotizadorForm y Historial.


CotizadorForm:

Este componente maneja la entrada de datos del usuario para calcular cotizaciones de seguros.
Utiliza el estado local para rastrear la selección del tipo de propiedad, la ubicación, los metros cuadrados, y el estado de carga.
Ofrece opciones predefinidas para el tipo de propiedad y la ubicación mediante arrays de objetos.
Contiene funciones para calcular cotizaciones, mostrar resultados y mensajes de éxito.


Historial:

Este componente muestra un historial de cotizaciones almacenadas en el sessionStorage.
Se utiliza el ciclo de vida useEffect para crear dinámicamente una tabla HTML y mostrar los datos almacenados.
Al desmontar el componente, se limpia la tabla del DOM.


App:

El componente principal que establece las rutas usando react-router-dom.
Contiene las rutas para CotizadorForm y Historial.


Funcionamiento:

En CotizadorForm, los usuarios ingresan datos y al hacer clic en "Cotizar", se realiza un cálculo simulado y se almacena en el sessionStorage.
En Historial, se lee desde el sessionStorage y se muestra en una tabla.


Instrucciones para Ejecutar Localmente:

Asegúrese de tener Node.js instalado.
Clone el repositorio.
Abra una terminal en la carpeta del proyecto e instale las dependencias con el comando npm install.
Ejecute la aplicación con el comando npm run dev.
La aplicación estará disponible en su navegador en http://localhost:xxxx/.
Notas Adicionales:

Esta documentación proporciona una visión general del proyecto y los pasos para ejecutarlo localmente.
