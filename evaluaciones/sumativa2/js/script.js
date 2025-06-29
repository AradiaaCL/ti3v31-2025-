document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitamos que se envíe el formulario de inmediato

    // Limpiar mensajes de error anteriores
    document.querySelectorAll(".error").forEach(function(elemento) {
        elemento.innerText = "";
    });

    let hayErrores = false;

    // Obtener valores 
    const Nombres = document.getElementById("Nombre").value.trim();
    const Apellidos = document.getElementById("Apellido").value.trim();
    const RUT = document.getElementById("RUT").value.trim();
    const Fecha = document.getElementById("fecha").value.trim();
    const Correo = document.getElementById("Correo").value.trim();
    const Taller = document.getElementById("Taller").value.trim();

    console.log("Validando formulario...");

    // Validar campos obligatorios
    if (!Nombres) {
        document.getElementById("errorNombre").innerText = "Campo requerido";
        hayErrores = true;
    }
    if (!Apellidos) {
        document.getElementById("errorApellido").innerText = "Campo requerido";
        hayErrores = true;
    }
    if (!RUT) {
        document.getElementById("errorRUT").innerText = "Campo requerido";
        hayErrores = true;
    }
    if (!Fecha) {
        document.getElementById("errorFecha").innerText = "Campo requerido";
        hayErrores = true;
    }
    if (!Correo) {
        document.getElementById("errorCorreo").innerText = "Campo requerido";
        hayErrores = true;
    }
    if (!Taller) {
        document.getElementById("errorTaller").innerText = "Selecciona un taller";
        hayErrores = true;
    }

    
    if (RUT && !/^\d{7,8}-[\dkK]$/.test(RUT)) {
        document.getElementById("errorRUT").innerText = "Debe ser formato nnnnnnnn-n";
        hayErrores = true;
    } else if (RUT && !validarRut(RUT)) {
        document.getElementById("errorRUT").innerText = "Dígito verificador no coincide";
        hayErrores = true;
    }

    // Validar fecha 
    if (Fecha && !/^\d{2}\/\d{2}\/\d{4}$/.test(Fecha)) {
        document.getElementById("errorFecha").innerText = "Debe ser formato dd/mm/aaaa";
        hayErrores = true;
    } else if (campoFecha) {
        const [diaIngresado, mesIngresado, anioIngresado] = campoFecha.split("/").map(function(num) {
            return parseInt(num);
        });

        if (diaIngresado < 1 || diaIngresado > 31 || mesIngresado < 1 || mesIngresado > 12 || anioIngresado < 0 || anioIngresado > 9999) {
            document.getElementById("errorFecha").innerText = "Fecha fuera de rango";
            hayErrores = true;
        } else {
            
            const hoy = new Date();
            const diaHoy = hoy.getDate();
            const mesHoy = hoy.getMonth() + 1;
            const anioHoy = hoy.getFullYear();

            let edadCalculada = anioHoy - anioIngresado;
            if (mesHoy < mesIngresado || (mesHoy === mesIngresado && diaHoy < diaIngresado)) {
                edadCalculada--;
            }

            console.log("Edad calculada:", edadCalculada);

            if (edadCalculada < 14) {
                document.getElementById("errorFecha").innerText = "Debe tener al menos 14 años";
                hayErrores = true;
            }
        }
    }

    // Validar correo 
    if (Correo && !/^[a-zA-Z0-9.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9]+$/.test(Correo)) {
        document.getElementById("errorCorreo").innerText = "Formato incorrecto";
        hayErrores = true;
    }

    
    if (!hayErrores) {
        alert("Formulario enviado correctamente. ¡Gracias por inscribirte!");
        console.log("Formulario válido, se podría enviar al servidor aquí.");
        
    }
});

//rut
function validarRut(rutCompleto) {
    rutCompleto = rutCompleto.replace(/\./g, '').toUpperCase();
    const [rut, dv] = rutCompleto.split('-');
    let suma = 0;
    let multiplo = 2;

    for (let i = rut.length - 1; i >= 0; i--) {
        suma += parseInt(rut.charAt(i)) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    let dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    console.log("Verificando RUT:", rutCompleto, "esperado:", dvEsperado);
    return dvEsperado === dv;
}