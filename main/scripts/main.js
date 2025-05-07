       // Script para el menú móvil
       const mobileMenuButton = document.getElementById('mobile-menu-button');
       const mobileMenu = document.getElementById('mobile-menu');
       const mobileMenuIcon = mobileMenuButton.querySelector('i'); // Icono dentro del botón

       mobileMenuButton.addEventListener('click', () => {
           mobileMenu.classList.toggle('hidden');
           // Cambiar icono de barras a X y viceversa
           if (mobileMenu.classList.contains('hidden')) {
               mobileMenuIcon.classList.remove('fa-times');
               mobileMenuIcon.classList.add('fa-bars');
           } else {
               mobileMenuIcon.classList.remove('fa-bars');
               mobileMenuIcon.classList.add('fa-times');
           }
       });

       // Cerrar menú móvil al hacer clic en un enlace (para páginas de una sola sección)
       const mobileNavLinks = mobileMenu.querySelectorAll('a');
       mobileNavLinks.forEach(link => {
           link.addEventListener('click', () => {
               mobileMenu.classList.add('hidden');
               mobileMenuIcon.classList.remove('fa-times');
               mobileMenuIcon.classList.add('fa-bars');
           });
       });

       // Script para el año actual en el footer
       document.getElementById('current-year').textContent = new Date().getFullYear();

       // Script para resaltar enlace activo en el menú (opcional, básico)
       const navLinks = document.querySelectorAll('nav a'); // Selecciona enlaces de nav principal y móvil
       const sections = document.querySelectorAll('main section[id]'); // Secciones con ID

       window.addEventListener('scroll', () => {
           let current = '';
           sections.forEach( section => {
               const sectionTop = section.offsetTop;
               const sectionHeight = section.clientHeight;
               // Damos un margen para activar la sección un poco antes de llegar
               if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                   current = section.getAttribute('id');
               }
           });

           navLinks.forEach( link => {
               link.classList.remove('nav-link-active');
               // Comprueba si el href del enlace (sin el #) coincide con la sección actual
               if (link.getAttribute('href') === `#${current}`) {
                   link.classList.add('nav-link-active');
               }
           });
           // Asegurar que 'Inicio' esté activo si no hay otra sección detectada (al principio)
            if (!current && window.pageYOffset < 200) {
                document.querySelector('nav a[href="#inicio"]').classList.add('nav-link-active');
            }
       });

