/*corregir js*/
document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();

    
    document.querySelectorAll(".error").forEach(e => e.innerText = "");

    let hayErrores = false;

    // formulario
    const nombres = document.getElementById("Nombre").value.trim();
    const apellidos = document.getElementById("Apellido").value.trim();
    const rut = document.getElementById("RUT").value.trim();
    const fecha = document.getElementById("fecha").value.trim();
    const correo = document.getElementById("Correo").value.trim();
    const taller = document.getElementById("Taller").value.trim();

}