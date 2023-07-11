// Define tus rutas y sus controladores
const routes = {
    '/home': () => {
      let homePage = document.getElementById('home');
      homePage.style.display = 'block';
    },
    '/playPage': () => {
      let playPage = document.getElementById('playPage');
      playPage.style.display = 'block';
    }
  };
  
  // Función para manejar cambios en la ruta
  function handleRouteChange() {
    // Obtener la ruta actual
    let route = window.location.hash.slice(1);
    // Verificar si la ruta existe y llamar a su controlador
    if (routes[route]) {
      routes[route]();
    } else {
      console.log('Error 404: No se encontró la ruta ' + route);
    }
  }
  
  // Escuchar cambios en la ruta
  window.addEventListener('hashchange', handleRouteChange);
  // Manejar la ruta inicial al cargar la página
  handleRouteChange();
  