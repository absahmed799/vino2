/*================== Toggle icone navbar ========================*/
// window.addEventListener("load", function () {
//     let menuIcon = document.querySelector('#menu-icon');
//     let navbar = document.querySelector('.navbar');

//     menuIcon.onclick = () => {
//         menuIcon.classList.toggle('bx-x');
//         navbar.classList.toggle('active');
//     }
// })

window.addEventListener("load", function () {
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');
  
    menuIcon.addEventListener('click', () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
    });
});