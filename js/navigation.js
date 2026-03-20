document.addEventListener("DOMContentLoaded", function(){
    var hamburgerButton = document.querySelector('.hamburger');
    var navbar = document.querySelector('.navbar');

    hamburgerButton.addEventListener('click', openMobile);
    navbar.addEventListener('click', closeMobile);

    function openMobile(){
        navbar.classList.add('open');
    }

    function closeMobile(){
        navbar.classList.remove('open');
    }

    //Get the button:
    mybutton = document.querySelector('.goUp');

    // When the user scrolls down 500px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
    mybutton.addEventListener("click", function(){
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
});