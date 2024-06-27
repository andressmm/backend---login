if (!localStorage.getItem('usuario')){
    
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
  
    const formData = new FormData(this);
    const username = formData.get('username');
    const password = formData.get('password');
  
  
    const data = {
      username: username,
      password: password,
    };
  
    console.log(data);
  
    try {
      const respuesta = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Especificar tipo de contenido JSON
        },
        body: JSON.stringify(data), // Convertir objeto a formato JSON
      });
  
      if (!respuesta.ok) {
        throw new Error(`Error al iniciar sesión. Verificar los datos`);
      }
  
      const datosSesion = await respuesta.json();
      console.log('Respuesta del servidor:', datosSesion);
      localStorage.setItem('usuario', datosSesion.message); 
      window.location.href = '/';

    } catch (error) {
      console.error('Error al enviar solicitud:', error.message);
      alert('Error al iniciar sesión. Verificar los datos');
    }
  });
}}else {
    let botonSalir=document.querySelector(".salir");

botonSalir.addEventListener('click', function() {
    // Borrar 'usuario' de localStorage
    localStorage.removeItem('usuario');
    window.location.href = '/';

    console.log('Usuario eliminado de localStorage');
});

}