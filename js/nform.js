// variables
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const telefono = document.querySelector('#telefono');
const direccion = document.querySelector('#direccion');
const mensaje = document.querySelector('#mensaje');


const btnEnviar = document.querySelector('#enviar');
const formularioEnviar = document.querySelector('#enviar-mail');
const resetBtn = document.querySelector('#resetBtn');



// Valida que el campo tengo algo escrito
function validarFormulario(e) {
    
    if(e.target.value.length > 0 ) {
         //elimina los errores
         const error = document.querySelector('p.error');
         if(error){
           error.remove();
         }          

         e.target.classList.remove('border','border-red-500');
         e.target.classList.add('border','border-green-500');

    } else {
         e.target.classList.remove('border','border-green-500');
         e.target.classList.add('border', 'border-red-500');
         mostrarError('Todos los campos son obligatorios');
    }

    // Validar unicamente el email
    if(e.target.type === 'email') {          
    
         if(er.test(e.target.value)){
           // console.log('Email valido');
           const error = document.querySelector('p.error');
           if(error){
             error.remove();
           }

           e.target.classList.remove('border','border-red-500');
           e.target.classList.add('border','border-green-500');
         } else{
             e.target.classList.remove('border','border-green-500');
             e.target.classList.add('border','border-red-500');
             mostrarError('El email no es valido');
         }

    }
    if( er.test(email.value) && name.value !== '' && telefono.value !== '' && direccion.value !== '' && mensaje.value !== '' ) {
       btnEnviar.disabled = false;        
       btnEnviar.classList.remove('cursor-not-allowed','opacity-50');
       // console.log("pasaste la validacion");
    } 
}

function mostrarError(mensaje)
{
 const mensajeError = document.createElement('p');
 mensajeError.textContent = mensaje;
 mensajeError.classList.add('border','border-red-500', 'background-red-100','text-red-500','p-3','mt-5','text-center','error');

 const errores = document.querySelectorAll('.error');
 if(errores.length === 0){
   formularioEnviar.appendChild(mensajeError);
 }
}

// Cuando se envia el correo
function enviarEmail(e) {

   e.preventDefault();
   // console.log("ejecutado");

   // Spinner al presionar Enviar
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    var datos = $("#enviar-mail").serialize();

    console.log();

    $.ajax({
       method: "POST",
       url:  APIURL,
       data: infoPost,
       success: function(respuesta){
           // Ocultar Spinner y mostrar mensaje
           console.log(respuesta);
          setTimeout( () => {
               spinner.style.display = 'none';

               const parrafo = document.createElement('p');
               parrafo.textContent = 'Pedido generado, se podran en contacto para coordinar entrega';
               parrafo.classList.add('text-center','my-10','p-2','bg-green-500','text-white','font-bold','uppercase')
               
               formularioEnviar.insertBefore(parrafo,spinner);

               setTimeout(() =>  {
                    parrafo.remove();
                    resetearFormulario();               
               }, 5000);
          }, 3000);
       }
   });     
    
}

// Resetear el formulario 
function resetFormulario(e) {
    formularioEnviar.reset();
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
    e.preventDefault();
}

function resetearFormulario(){
 formularioEnviar.reset();
 inicioApp();
}