const token = localStorage.getItem("token");

if(token){

    window.location.href="../admin/index.html";

}
const formulario = document.getElementById("loginForm");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    mensaje.textContent = "";

    const usuario = document.getElementById("usuario").value.trim();

    const password = document.getElementById("password").value;

    try {

        const respuesta = await fetch("https://vrsoftware.onrender.com/api/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                usuario,

                password

            })

        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            mensaje.textContent = datos.mensaje;

            return;

        }

        localStorage.setItem("token", datos.token);

        localStorage.setItem("usuario", datos.usuario);

        window.location.href = "../admin/index.html";

    } catch (error) {

        console.error(error);

        mensaje.textContent = "No fue posible conectar con el servidor.";

    }

});