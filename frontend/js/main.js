console.log("VRSoftware iniciado correctamente");
const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll("section").forEach(section=>{

    section.classList.add("hidden");

    observer.observe(section);

});
/*==================================
CONTADORES ANIMADOS
==================================*/

const counters = document.querySelectorAll(".counter");

const animateCounter = (counter) => {

    const target = parseFloat(counter.dataset.target);

    const increment = target / 120;

    let current = 0;

    const update = () => {

        current += increment;

        if (current < target) {

            if(target % 1 !== 0){

                counter.textContent = current.toFixed(1);

            }else{

                counter.textContent = Math.floor(current);

            }

            requestAnimationFrame(update);

        } else {

            if(target % 1 !== 0){

                counter.textContent = target + "%";

            }else{

                counter.textContent = target + "+";

            }

        }

    };

    update();

};

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            animateCounter(entry.target);

            counterObserver.unobserve(entry.target);

        }

    });

});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});
/*==================================
BOTÓN VOLVER ARRIBA
==================================*/

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
/*==================================
MENU HAMBURGUESA
==================================*/

const menuToggle = document.querySelector(".menu-toggle");

const menu = document.querySelector(".menu");

menuToggle.addEventListener("click",()=>{

    menu.classList.toggle("active");

});
// ======================================
// FORMULARIO DE CONTACTO
// ======================================

const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const datos = {

            nombre: document.getElementById("nombre").value,

            correo: document.getElementById("correo").value,

            empresa: document.getElementById("empresa").value,

            mensaje: document.getElementById("mensaje").value

        };

        try {

            const respuesta = await fetch("http://localhost:3000/api/contacto", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(datos)

            });

            const resultado = await respuesta.json();

            alert(resultado.mensaje);

            form.reset();

        } catch (error) {

            alert("Error al conectar con el servidor.");

            console.error(error);

        }

    });

}