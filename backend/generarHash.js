const bcrypt = require("bcrypt");

async function generarHash() {

    const password = "admin123";

    const hash = await bcrypt.hash(password, 10);

    console.log("\n==============================");
    console.log("Usuario: admin");
    console.log("Contraseña: admin123");
    console.log("Hash:");
    console.log(hash);
    console.log("==============================\n");

}

generarHash();