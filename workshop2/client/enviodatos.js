function enviarDatos() {
    var comboBox = document.getElementById("comboBox");
    var seleccion = comboBox.options[comboBox.selectedIndex].value;

    // Crear una instancia de XMLHttpRequest o utilizar Fetch API
    var xhr = new XMLHttpRequest();
    
    // Configurar la solicitud POST al servidor
    xhr.open("POST", "http://localhost:3001/paises", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // Enviar los datos al servidor como JSON
    xhr.send(JSON.stringify({ seleccion: seleccion }));

    // Puedes manejar la respuesta del servidor aquí si es necesario
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
        }
    };
}
