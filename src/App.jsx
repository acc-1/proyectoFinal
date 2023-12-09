import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import Elipsis from './assets/Ellipsis-1.1s-44px.gif'
const CotizadorForm = () => {
  const [tipoPropiedad, setTipoPropiedad] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [metrosCuadrados, setMetrosCuadrados] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  
  const opcionesTipoPropiedad = [
    { value: 'piso', label: 'Piso', dataValor: '1.99' },
    { value: 'casa', label: 'Casa', dataValor: '1.32' },
    { value: 'departamento', label: 'Departamento', dataValor: '1.89' },
    { value: 'oficina', label: 'Oficina', dataValor: '1.27' },
    { value: 'p.h', label: 'Ph', dataValor: '1.79' },
    { value: 'quinta', label: 'Quinta', dataValor: '1.98' },
  ];

  const opcionesUbicacion = [
    { value: 'cordoba capital', label: 'Cordoba capital', dataValor: '1.99' },
    { value: 'chivilcoy', label: 'Chivilcoy', dataValor: '1.13' },
    { value: 'microcentro', label: 'Microcentro', dataValor: '1.98' },
    { value: 'barrioNorte', label: 'Barrio Norte', dataValor: '1.97' },
    { value: 'barrioSur', label: 'Barrio Sur', dataValor: '1.12' },
    { value: 'barrioEste', label: 'Barrio Este', dataValor: '1.50' },
    { value: 'barrioOeste', label: 'Barrio Oeste', dataValor: '1.25' },
  ];

  const renderizarOpciones = (opciones) => {
    return opciones.map((opcion) => (
      <option key={opcion.value} value={opcion.value} data-valor={opcion.dataValor}>
        {opcion.label}
      </option>
    ));
  };

  const calcularCotizacion = () => {
    // Validar que se hayan seleccionado opciones en los select
    if (tipoPropiedad === '' || ubicacion === '') {
      alert('Por favor, selecciona el tipo de propiedad y la ubicación antes de cotizar.');
      return;
    }

    // Validar que el número de metros cuadrados sea mayor que 0
    if (metrosCuadrados <= 0) {
      alert('Por favor, ingresa un número de metros cuadrados válido (mayor que 0).');
      return;
    }

    // Ocultar el texto del botón y mostrar el gif de carga
    setLoading(true);

   
    setTimeout(() => {
      // Obtener los valores seleccionados y calcular la cotización
      const valorTipoPropiedad = parseFloat(document.getElementById('tipoPropiedad').options[document.getElementById('tipoPropiedad').selectedIndex].getAttribute('data-valor'));
      const valorUbicacion = parseFloat(document.getElementById('ubicacion').options[document.getElementById('ubicacion').selectedIndex].getAttribute('data-valor'));
      const cotizacion = valorTipoPropiedad * valorUbicacion * metrosCuadrados;

      // Obtener la lista actual de cotizaciones desde sessionStorage
      const cotizaciones = JSON.parse(sessionStorage.getItem('cotizaciones')) || [];

      // Crear un nuevo objeto para esta cotización
      const nuevaCotizacion = {
        tipoPropiedad: tipoPropiedad,
        ubicacion: ubicacion,
        metrosCuadrados: metrosCuadrados,
        cotizacion: cotizacion.toFixed(2),
        fecha: new Date().toLocaleString(),
      };

      // Agregar la nueva cotización a la lista
      cotizaciones.push(nuevaCotizacion);

      // Guardar la lista actualizada en sessionStorage
      sessionStorage.setItem('cotizaciones', JSON.stringify(cotizaciones));

      // Mostrar el resultado en el estado
      setResultado(`La cotización es: $${cotizacion.toFixed(2)}`);

      // Mensaje de cotización guardada con éxito
      setMensajeExito('Cotización guardada con éxito');

      // Después de un tiempo, limpiar el mensaje de éxito
      setTimeout(() => {
        setMensajeExito('');
      }, 3000); //3 segundos

      // Mostrar nuevamente el texto del botón y ocultar el gif de carga
      setLoading(false);
    }, 1000); //1 segundo
  };

  return (
    <div className="formulario-container">
      <h1 className="center">Cotizador de Seguros</h1>
      <form>
        <label htmlFor="tipoPropiedad">Selecciona el tipo de propiedad:</label>
        <select
          id="tipoPropiedad"
          name="tipoPropiedad"
          value={tipoPropiedad}
          onChange={(e) => setTipoPropiedad(e.target.value)}
        >
          <option value="" disabled hidden>
            Selecciona...
          </option>
          {renderizarOpciones(opcionesTipoPropiedad)}
        </select>

        <label htmlFor="ubicacion">Selecciona la ubicación:</label>
        <select
          id="ubicacion"
          name="ubicacion"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
        >
          <option value="" disabled hidden>
            Selecciona...
          </option>
          {renderizarOpciones(opcionesUbicacion)}
        </select>

        <label htmlFor="metrosCuadrados">Ingresa los metros cuadrados:</label>
        <input
          type="number"
          id="metrosCuadrados"
          name="metrosCuadrados"
          placeholder="Ej. 100"
          required
          value={metrosCuadrados}
          onChange={(e) => setMetrosCuadrados(e.target.value)}
        />

        <button type="button" className="button-cotizar" onClick={calcularCotizacion} disabled={loading}>
          {loading ? (
            <img src={Elipsis} alt="Loading" width="20" height="20" />
          ) : (
            'Cotizar'
          )}
        </button>

        <div id="resultado" className="center">
          {resultado && <p>{resultado}</p>}
        </div>
        <div id="mensajeExito" className={`center ${mensajeExito ? 'mostrar' : ''}`}>
          {mensajeExito && <p>{mensajeExito}</p>}
        </div>
      </form>

      <div className="center-separador">
        
          <Link to='/historial' className="button-historial">Ver Historial</Link>
            
    
      </div>
    </div>
  );
};
const Historial = () => {
  useEffect(() => {
    // Obtener la lista de cotizaciones desde sessionStorage
    const cotizaciones = JSON.parse(sessionStorage.getItem('cotizaciones')) || [];

    // Crear una tabla para mostrar los datos
    const table = document.createElement('table');
    table.className = 'resultado-table';

    // Crear encabezados de tabla
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    const headers = ['Fecha de cotización', 'Tipo de Propiedad', 'Ubicación', 'Metros Cuadrados', 'Cotización'];

    headers.forEach((headerText) => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    // Iterar sobre las cotizaciones y agregar filas a la tabla
    cotizaciones.forEach((cotizacion) => {
      const row = table.insertRow();
      const values = [
        cotizacion.fecha,
        cotizacion.tipoPropiedad,
        cotizacion.ubicacion,
        cotizacion.metrosCuadrados,
        cotizacion.cotizacion,
      ];

      values.forEach((value) => {
        const cell = row.insertCell();
        // Convertir la primera letra a mayúscula
        cell.textContent = value.charAt(0).toUpperCase() + value.slice(1);
      });
    });

    // Agregar la tabla al div con la clase 'bodydos'
    const bodydosDiv = document.querySelector('.bodydos');
    bodydosDiv.appendChild(table);

    // Limpiar la tabla al desmontar el componente
    return () => {
      bodydosDiv.removeChild(table);
    };
  }, []);

  return (
    <div className='bodydos'>
      <div className="centercotizador">
        <h1 className="center-separador">Historial 📋</h1>

        <div className="center separador">
          <Link to='/' className="button-volver">VOLVER</Link>
        </div>
      </div>
    </div>
  );
};

function App () {
  return(
   
     <> 
     
     <Routes>
     <Route path='/' element={<CotizadorForm/>} />
     <Route path='/historial' element={<Historial/>} />
     </Routes>
    
  </>
  )
}
export default App;
