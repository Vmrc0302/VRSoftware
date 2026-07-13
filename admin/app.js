const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "../login/login.html";

}

const usuarioActivo = document.getElementById("usuarioActivo");

if (usuarioActivo) {

    usuarioActivo.textContent = `Bienvenido, ${localStorage.getItem("usuario")} 👋`;

}

const tabla = document.getElementById("tablaContactos");
const total = document.getElementById("totalContactos");
const buscar = document.getElementById("buscar");

let contactos = [];

async function cargarContactos() {

    try {

        const respuesta = await fetch("https://vrsoftware.onrender.com/api/contactos", {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        if (respuesta.status === 401) {

            localStorage.clear();

            window.location.href = "../login/login.html";

            return;

        }

        contactos = await respuesta.json();

        total.textContent = contactos.length;

        mostrarContactos(contactos);

    } catch (error) {

        console.error(error);

        alert("No fue posible cargar los contactos.");

    }

}

function mostrarContactos(lista) {

    tabla.innerHTML = "";

    lista.forEach(contacto => {

        tabla.innerHTML += `

        <tr>

            <td>${contacto.nombre}</td>

            <td>${contacto.correo}</td>

            <td>${contacto.empresa || "-"}</td>

            <td>${contacto.mensaje}</td>

            <td>${new Date(contacto.fecha).toLocaleString("es-CO")}</td>

            <td>

                <button onclick="eliminar(${contacto.id})">

                    🗑 Eliminar

                </button>

            </td>

        </tr>

        `;

    });

}

buscar.addEventListener("input", () => {

    const texto = buscar.value.toLowerCase();

    const filtrados = contactos.filter(contacto =>

        contacto.nombre.toLowerCase().includes(texto) ||

        contacto.correo.toLowerCase().includes(texto) ||

        (contacto.empresa || "").toLowerCase().includes(texto)

    );

    mostrarContactos(filtrados);

});

async function eliminar(id) {

    if (!confirm("¿Deseas eliminar este contacto?")) return;

    try {

        const respuesta = await fetch(

            `https://vrsoftware.onrender.com/api/contactos/${id}`,

            {

                method: "DELETE",

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        if (respuesta.status === 401) {

            localStorage.clear();

            window.location.href = "../login/login.html";

            return;

        }

        cargarContactos();

    } catch (error) {

        console.error(error);

        alert("No fue posible eliminar el contacto.");

    }

}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("token");

        localStorage.removeItem("usuario");

        window.location.href = "../login/login.html";

    });

}

cargarContactos();