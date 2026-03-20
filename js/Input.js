class Input {
    constructor(name, htmlClass, field, minChar, charValidation, isValid) {
        this.name = name;
        this.htmlClass = htmlClass;
        this.field = field;
        this.minChar = minChar;
        this.charValidation = charValidation;
        this.isValid = isValid;
    }

    checkIfValid(){
        let name = this.name;
        let htmlClass = this.htmlClass;
        let field = this.field;
        let minChar = this.minChar;
        let charValidation = this.charValidation;
        let isvalid = this.isValid;

        $(this.htmlClass+' '+this.field).change(function() {
            let filledIn = $(htmlClass+' '+field).val();

            $(htmlClass+' .errors' ).empty();
            $(htmlClass+' '+field).removeClass('notValid');

            if(filledIn.length < minChar){
                $(htmlClass+' .errors' ).append('<span class="error">Minimaal '+minChar+' tekens.</span>');
                $(htmlClass+' '+field).addClass('notValid');
            }else if(charValidation === true){
                let filledIn = $(htmlClass+' '+field).val();
                if(!isvalid.test(filledIn)){
                    $(htmlClass+' .errors' ).append('<span class="error">'+name+' is niet geldig</span>');
                    $(htmlClass+' '+field).addClass('notValid');
                }
            }
        });
    }

    checkIfEmpty(){
        let htmlClass = this.htmlClass;
        let field = this.field;

        if($(htmlClass+' '+field).val() == 0){
            $(htmlClass+' .errors' ).empty();
            $(htmlClass+' .errors' ).append('<span class="error">verplicht veld</span>');
            $(htmlClass+' '+field).addClass('notValid');
        }
    }
}