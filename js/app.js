const API_URL = "http://18.206.163.32/api/devices";

// Variable global
let userIP = "";

// Función para obtener la IP pública
function fetchUserIP() {
    fetch('https://api.ipify.org?format=text')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la IP');
            }
            return response.text();  // ¡Aquí decimos que queremos texto!
        })
        .then(ip => {
            userIP = ip;
            console.log('IP pública obtenida:', userIP);
        })
        .catch(error => {
            console.error('Error al obtener la IP:', error);
        });
}

// Ejecutar cuando cargue toda la página
document.addEventListener('DOMContentLoaded', fetchUserIP);


// Después en cualquier otra función puedes usar directamente "userIP"

function sendCommand(command) {
    const data = {
        ip: userIP,
        name: "Victor Pinedo",
        status: command
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }
        return response.json();
    })
    .then(result => {
        console.log("Respuesta de la API:", result);
        updateMovementStatus(command);
    })
    .catch(error => {
        console.error("Error al enviar el comando:", error);
        alert("No se pudo enviar el comando. Verifica la conexión.");
    });
}

function updateMovementStatus(command) {
    const statusElement = document.getElementById("movement-status");
    statusElement.textContent = command.replace("_", " ");
}
