//variables

const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');


eventListeners();

function eventListeners(){
    //cuando la app arranca
    document.addEventListener('DOMContentLoaded',iniciarApp);

    //Campos del formulario

    //blur es el evento que se acciona cuando sales del input
    email.addEventListener('blur',validarFormulario);
    asunto.addEventListener('blur',validarFormulario);
    mensaje.addEventListener('blur',validarFormulario);

    // Enviar Email

    formulario.addEventListener('submit', enviarEmail);

    // reiniciar formulario

    btnReset.addEventListener('click', reseteaFormulario);


}

//funciones

function iniciarApp(){
    //btnEnviar.disabled = true; hace que no se haga interacción con el botón
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e){


    if(e.target.value.length > 0){

        // elimina los errores

        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');

    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    // console.log(e.target.type);
    if(e.target.type === 'email'){
        
        if(er.test(e.target.value)){
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
           
    
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');

        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no valido');
        }
    }

    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== '' ){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }

}

function mostrarError(mensaje){

    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');

    if(errores.length === 0){

        //MENSAJE SE MUESTRA AL FINAL 
        formulario.appendChild(mensajeError);
        // formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));
    }
}

function enviarEmail(e){

    e.preventDefault();

    // MOstrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //despues de 3 segundos ocultar spinner
    setTimeout( () =>{

        spinner.style.display = 'none';

        //Mensaje enviado

        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase' )

        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();

            reseteaFormulario();
        }, 3000);

    }, 3000 );

    // hace la ejecución por intervalos definidos
    // setInterval(() => {
    //     console.log('esta funcion se ejecuta despues de 3 segundos')
    // }, 3000);

}

// function que resetea formulario
function reseteaFormulario(){

    formulario.reset();

    iniciarApp();

}
