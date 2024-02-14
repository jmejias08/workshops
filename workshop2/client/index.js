// Esta función maneja los errores que pueden ocurrir durante la solicitud de información.
const error = () => console.log(this.responseText);


// Esta funcion toma los datos del api de paises y los carga en combo box
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


// Esta función se encarga de enviar información sobre el país seleccionado
// ademas, al finaliza llama la funcion de obtner los datos del tipo de cambio.
async function sendCurrency() {
  // se obtiene el pais seleccionado
  const comboBox = document.getElementById("countries");
  const selection = comboBox.options[comboBox.selectedIndex].value;

  try {
      // Se solicita al servidor informacion deln pais seleccionado
      const response = await fetch("http://localhost:3001/paises", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ selection: selection }),
      });

      // En caso de error
      if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
      }

      
      const responseData = await response.json(); // respuesta es en formato JSON.
      console.log("Response data:", responseData);

      
  } catch (error) {
      console.error("Error sending currency:", error);
  }
  // se llama a la funcion de obtener el tipo de cambio  
  getCurrencyValue();
}


async function getCurrencyValue() {
  try {
    // solicitud de datos utilizando fetch.
    const response = await fetch('http://localhost:3001/result');


    if (response.ok) {
      // Se convierten los datos en json
      const data = await response.json();

      // se obtiene los valores de dólar y euro.
      const dolarValue = data.dolarValue;
      const eurValue = data.eurValue;
      console.log('Dólar:', dolarValue);

      // se imprimen los datos de los valores
      document.getElementById('result').innerHTML = `
          <p>Dólar: ${dolarValue}</p>
          <p>Euro: ${eurValue}</p>
      `;
    } else {
      console.error('Error al obtener datos. Código de estado:', response.status);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}






