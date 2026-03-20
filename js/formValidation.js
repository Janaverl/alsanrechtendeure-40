$(document).ready(function (){
    let email = new Input("mailadres", ".email", "input", 5, true, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    email.checkIfValid();
    let phone = new Input("telefoonnummer", ".phone", "input", 9, true, /^[0-9 ]+$/);
    phone.checkIfValid();
    let name = new Input("contactpersoon", ".name", "input", 4, true, /^([A-Za-zÀ-ÖØ-öø-ÿ _]+[\-\']?)+$/);
    name.checkIfValid();
    let message = new Input("bericht", ".message", "textarea", 4, false, "");
    message.checkIfValid();


    $( ".privacy input" ).on( "click", function() {
        if($( ".privacy input:checked" ).val() != undefined){
            $('.privacy .errors' ).empty();
        }
      });


    $('.submit').click(function(event){
        email.checkIfEmpty();
        phone.checkIfEmpty();
        name.checkIfEmpty();
        message.checkIfEmpty();

        if($( ".privacy input:checked" ).val() == undefined){
            $('.privacy .errors' ).empty();
            $('.privacy .errors' ).append('<span class="error">Sorry, dit moet. GDPR enzo.</span>');
        }

        if($(".error").length != 0){
            event.preventDefault();
        }
    })

    $('.fa-info-circle').click(function(){
        $('.privacyPolicy').toggle();
    })
})