document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();

    // Limpiar errores anteriores
    document.querySelectorAll(".error").forEach(e => e.innerText = "");

    let hayErrores = false;

    // Obtener valores del formulario
    const nombres = document.getElementById("Nombre").value.trim();
    const apellidos = document.getElementById("Apellido").value.trim();
    const rut = document.getElementById("RUT").value.trim();
    const fecha = document.getElementById("fecha").value.trim();
    const correo = document.getElementById("Correo").value.trim();
    const taller = document.getElementById("Taller").value.trim();

    // Validar campos obligatorios
    if (!nombres) {
        document.getElementById("errorNombre").innerText = "Campo requerido";
        hayErrores = true;
    }
    if (!apellidos) {
        document.getElementById("errorApellido").innerText = "Campo requerido";
        hayErrores = true;
    }
    if (!rut) {
        document.getElementById("errorRUT").innerText = "Campo requerido";
        hayErrores = true;
    }
    if (!fecha) {
        document.getElementById("errorFecha").innerText = "Campo requerido";
        hayErrores = true;
    }
    if (!correo) {
        document.getElementById("errorCorreo").innerText = "Campo requerido";
        hayErrores = true;
    }
    if (!taller) {
        document.getElementById("errorTaller").innerText = "Selecciona un taller";
        hayErrores = true;
    }

    // Validar formato RUT y dígito verificador
    if (rut && !/^\d{7,8}-[\dkK]$/.test(rut)) {
        document.getElementById("errorRUT").innerText = "Debe ser nnnnnnnn-n";
        hayErrores = true;
    } else if (rut && !validarRut(rut)) {
        document.getElementById("errorRUT").innerText = "Dígito verificador no coincide";
        hayErrores = true;
    }

    // Validar fecha
    if (fecha && !/^\d{2}\/\d{2}\/\d{4}$/.test(fecha)) {
        document.getElementById("errorFecha").innerText = "Formato dd/mm/aaaa";
        hayErrores = true;
    } else if (fecha) {
        const [dd, mm, aaaa] = fecha.split("/").map(num => parseInt(num));

        if (dd < 1 || dd > 31 || mm < 1 || mm > 12 || aaaa < 0 || aaaa > 9999) {
            document.getElementById("errorFecha").innerText = "Fecha fuera de rango";
            hayErrores = true;
        } else {
            // Uso explícito como en el ejemplo
            const hoy = new Date();
            const diaHoy = hoy.getDate();     // Día del mes (1-31)
            const mesHoy = hoy.getMonth() + 1; // Mes (0-11) +1 → 1-12
            const anioHoy = hoy.getFullYear(); // Año con 4 dígitos

            let edad = anioHoy - aaaa;
            if (mesHoy < mm || (mesHoy == mm && diaHoy < dd)) {
                edad--;
            }
            if (edad < 14) {
                document.getElementById("errorFecha").innerText = "Debe tener al menos 14 años";
                hayErrores = true;
            }
        }
    }

    // Validar correo
    if (correo && !/^[a-zA-Z0-9.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9]+$/.test(correo)) {
        document.getElementById("errorCorreo").innerText = "Formato incorrecto";
        hayErrores = true;
    }

    // Si todo está bien
    if (!hayErrores) {
        alert("Formulario enviado correctamente. ¡Gracias por inscribirte!");
        // document.getElementById("formulario").reset(); // si quieres limpiar
    }
});

// Función para calcular dígito verificador RUT
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
    return dvEsperado === dv;
}
