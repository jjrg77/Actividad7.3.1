//componentes globales
const inputsForm1 = document.querySelectorAll("#form1 input");
const selectForm1 = document.querySelectorAll("#form1 select");
const inputsForm2 = document.querySelectorAll("#form2 input");
const dataBase = [];
const arrayTemp = [];

//Animación del Formulario
$(".toggle").click(function () {
    $(".formulario").animate({
            height: "toggle",
            "padding-top": "toggle",
            "padding-bottom": "toggle",
            opacity: "toggle",
        },
        "slow"
    );
});

// Creamos objeto EXPRESIONES REGULARES
const regExp = {
    password: /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/, // letras/núm (al menos 1), mín. 8 caracteres
    email: /[a-zA-Z-]+@+[a-zA-ZñÑ-]+\.+[a-zA-Z]{2,3}/, //misma expresión regular realizada en tareas anteriores
    provincia: "Selecciona una ciudad",
};

//Creamos objeto booleano VALIDACIONES
const valida = {
    inputpasswordIni: false,
    inputEmailIni: false,
    inputEmailReg: false,
    inputpasswordReg: false,
    inputpassword2Reg: false,
    provincia: false
};

//creamos objeto para guardar datos form1
const crearObjeto = (email, pass, pass2, provincia) => {
    return {
        'email': email,
        'Contraseña': pass,
        'Contraseña Confirmada': pass2,
        'Provincia': provincia
    }
}

const validarForm1 = (e) => {
    switch (e.target.name) {
        case "emailReg":
            ValidarInputs(regExp.email, e.target, "inputEmailReg");
            break;
        case "passwordReg":
            ValidarInputs(regExp.password, e.target, "inputpasswordReg");
            ValidarPassword();
            break;
        case "password2Reg":
            ValidarInputs(regExp.password, e.target, "inputpassword2Reg");
            ValidarPassword();
            break;
        case "provincia":
            ValidarProvincia();
            break;
    }
};

const validarForm2 = (e) => {
    switch (e.target.name) {
        case "emailIni":
            ValidarInputs(regExp.email, e.target, "inputEmailIni");
            break;
        case "passwordIni":
            ValidarInputs(regExp.password, e.target, "inputpasswordIni");
            break;
    }
};

const ValidarInputs = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(campo).classList.remove("campoIncorrecto");
        document.querySelector("#" + campo + " .verificar").classList.remove("mError");
        document.querySelector("#" + campo + " .verificar").classList.add("mErrorInactivo");
        valida[campo] = true;
    } else {
        document.getElementById(campo).classList.add("campoIncorrecto");
        document.querySelector("#" + campo + " .verificar").classList.add("mError");
        document.querySelector("#" + campo + " .verificar").classList.remove("mErrorInactivo");
        valida[campo] = false;
    }
};

const ValidarPassword = () => {
    if (passwordReg.value !== password2Reg.value) {
        document.getElementById('inputpassword2Reg').classList.add("campoIncorrecto");
        document.querySelector('#inputpassword2Reg .verificar').classList.add("mError");
        document.querySelector('#inputpassword2Reg .verificar').classList.remove("mErrorInactivo");
        valida['passwordReg'] = false;
    } else {
        document.getElementById('inputpassword2Reg').classList.remove("campoIncorrecto");
        document.querySelector('#inputpassword2Reg .verificar').classList.remove("mError");
        document.querySelector('#inputpassword2Reg .verificar').classList.add("mErrorInactivo");
        valida['passwordReg'] = true;
    }
};

const ValidarProvincia = () => {
    let selectedOption = provincia.options[provincia.selectedIndex];
    if (selectedOption.value == '') {
        document.getElementById('selectProvincia').classList.add("campoIncorrecto");
        document.querySelector('#selectProvincia .verificar').classList.add("mError");
        document.querySelector('#selectProvincia .verificar').classList.remove("mErrorInactivo");
        valida['provincia'] = false;
    } else {
        document.getElementById('selectProvincia').classList.remove("campoIncorrecto");
        document.querySelector('#selectProvincia .verificar').classList.remove("mError");
        document.querySelector('#selectProvincia .verificar').classList.add("mErrorInactivo");
        valida['provincia'] = true;
    }
    console.log(selectedOption.value + ': ' + selectedOption.text);
};

//función comprobación campos llenos form1
const ValidaCampos1 = () => {
    if (valida.inputEmailReg && valida.inputpasswordReg && valida.inputpassword2Reg && valida.provincia) {
        const datosFormulario = document.forms['form1Name'];
        const email = datosFormulario[0].value;
        if (arrayTemp == '') {
            arrayTemp.push(email);

            const registro = crearObjeto(
                datosFormulario.elements[0].value, 
                datosFormulario.elements[1].value, 
                datosFormulario.elements[2].value, 
                datosFormulario.elements[3].value
            );

            dataBase.push(registro);
            ImprimirDatosReg();
        } else {
            if (arrayTemp.includes(email)) {
                alert('ERROR DE REGISTRO: Usuario registrado ya en nuestra base de datos')
            } else {
                arrayTemp.push(email);

                const registro = crearObjeto(
                    datosFormulario.elements[0].value,
                    datosFormulario.elements[1].value,
                    datosFormulario.elements[2].value,
                    datosFormulario.elements[3].value
                );

                dataBase.push(registro);
                form1.reset();
            }
        }
    } else if(!valida.provincia){
        ValidarProvincia();
        alert('Selecciona una provincia');
    }
}

//función comprobación campos llenos form2
const ValidaCampos2 = () => {
    if (valida.inputEmailIni && valida.inputpasswordIni) {
        const datosFormulario = document.forms['form2'];
        const email = datosFormulario[0].value;

        console.log(email);
        if (arrayTemp.includes(email)) {
            // console.log('has iniciado sesión');
            ImprimirDatosIni();
        } else {
            alert('No estás registrado');
        }

    } else {
        alert('Debes rellenar todos los campos');
    }
}

//función que se ejecuta por cada input de form1
inputsForm1.forEach((input) => {
    input.addEventListener("change", validarForm1);
    input.addEventListener("blur", validarForm1);
});
//función que se ejecuta por cada select de form1
selectForm1.forEach((select) => {
    select.addEventListener("change", validarForm1);
    select.addEventListener("blur", validarForm1);
});

//envío de datos form1
form1.addEventListener("submit", (e) => {
    e.preventDefault();

    ValidaCampos1();

});
//función que se ejecuta por cada input de form2
inputsForm2.forEach((input) => {
    input.addEventListener("change", validarForm2);
    input.addEventListener("blur", validarForm2);
});

//envío de datos form2
form2.addEventListener("submit", (e) => {
    e.preventDefault();

    ValidaCampos2();
});

//-------------------------------------------------------------------------
//--------------------MODAL------------------------------------------------
const ImprimirDatosIni = () => {
    const modal = document.getElementById('modal1');
    const element = document.createElement('div');
    const datosFormulario = document.forms['form2'];
    element.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content text-center">
                <div class="modal-header">
                    <p>Has iniciado sesión con los siguientes datos:</p>
                </div>
                <div class="modal-body ">
                    <p><small>Tu correo:</small> <strong>${datosFormulario[0].value}</strong></p>
                    <p><small>Tu contraseña:</small> <strong>${datosFormulario[1].value}</strong></p>
                </div>
            </div>
        </div>
    `;
    modal.appendChild(element);
    form2.reset();
    setTimeout(() => {
        element.innerHTML = '';
    }, 5000);

};
const ImprimirDatosReg = () => {
    const modal = document.getElementById('modal2');
    const element = document.createElement('div');
    const datosFormulario = document.forms['form1'];
    element.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content text-center">
                <div class="modal-body ">
                    <p><small>Tu correo:</small> <strong>${datosFormulario[0].value}</strong></p>
                    <p><small>Tu contraseña:</small> <strong>${datosFormulario[1].value}</strong></p>
                    <p><small>Tu ciudad:</small> <strong>${datosFormulario[3].value}</strong></p>
                    </div>
            </div>
        </div>
    `;
    modal.appendChild(element);
    form1.reset();
    setTimeout(() => {
        element.innerHTML = '';
    }, 5000);

};
