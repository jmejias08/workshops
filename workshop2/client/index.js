
// Función que se ejecuta cuando la petición AJAX para el tipo de cambio se completa
const completed = (response) => {
    const data = JSON.parse(response.target.responseText);
    document.getElementById('result').innerHTML = `Tipo de Cambio Dolares ${data.TipoCompraDolares}`;
};

// Función que maneja errores en la petición AJAX
const error = () => console.log(this.responseText);


  
  // Función para realizar la petición AJAX al hacer clic en el botón
function getExchange() {
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", completed);
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("GET", "http://localhost:3001/tipocambio");
    ajaxRequest.send();
}



function sendCurrency() {
    var comboBox = document.getElementById("countries");
    var selection = comboBox.options[comboBox.selectedIndex].value;

    // Crear una instancia de XMLHttpRequest o utilizar Fetch API
    var xhr = new XMLHttpRequest();

    // Configurar la solicitud POST al servidor
    xhr.open("POST", "http://localhost:3001/paises", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // Enviar los datos al servidor como JSON
    xhr.send(JSON.stringify({ selection: selection }));


    getCurrencyValue();

}

  

// Otra petición AJAX para obtener información sobre todos los países
const ajaxRequestCountries = new XMLHttpRequest();
ajaxRequestCountries.addEventListener("load", (e) => {
    const countries = JSON.parse(e.target.responseText);
    let optionsHtml = "";
    countries.forEach(country => {
        optionsHtml += `<option value="${country.currency}">${country.name}</option>`;
    });
    document.getElementById("countries").innerHTML = optionsHtml;
});
ajaxRequestCountries.addEventListener("error", () => {});
ajaxRequestCountries.open("GET", "http://localhost:3001/paises");
ajaxRequestCountries.send();


function getCurrencyValue() {
    const ajaxRequestResult = new XMLHttpRequest();
    ajaxRequestResult.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          const data = JSON.parse(this.responseText);
  
          const dolarValue = data.dolarValue;
          const eurValue = data.eurValue;
          console.log('dolar: ', dolarValue);
  
          document.getElementById('result').innerHTML = `
            <p>Dólar: ${dolarValue}</p>
            <p>Euro: ${eurValue}</p>
          `; 
        } else if (this.readyState === 4 && this.status !== 200) {
          console.error('Error al obtener datos. Código de estado:', this.status);
        }
      };
  
      ajaxRequestResult.open('GET', 'http://localhost:3001/result', true);
      ajaxRequestResult.send();
}