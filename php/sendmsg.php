<?php

$valid = $input = $errors = array(
    "organisation" => "",
    "email" => "",
    "phone" => "",
    "name" => "",
    "message" => "",
    "privacy" => "",
);

function clean_input($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function test_input($data, $name, $minChar, $charValidation, $isValid) {
    if($data == ""){
        $error = "<span class='error'>verplicht veld</span>";
    }else if(strlen($data) < $minChar){
        $error = "<span class='error'>Dit veld moet minimaal ".$minChar." tekens bevatten.</span>";   
    }else{
        $error = "";
    }

    if($charValidation === 1){
        if(!preg_match($isValid, $data)){
            $error = "<span class='error'>".$name." is niet geldig</span>";
        }
    }
    return $error;
}

if($_SERVER["REQUEST_METHOD"] == "POST"){
    if(isset($_POST['submit'])){
        $input["organisation"] = clean_input($_POST["organisation"]);
        $input["email"] = clean_input($_POST["email"]);
        $input["phone"] = clean_input($_POST["phone"]);
        $input["name"] = clean_input($_POST["name"]);
        $input["message"] = clean_input($_POST["message"]);

        $errors["email"] = test_input($_POST["email"], "mailadres", 5, 1, '/^[^\s@]+@[^\s@]+\.[^\s@]+$/');
        $valid["email"] = ($errors["email"] == "") ? "" : "notValid";
        $errors["phone"] = test_input($_POST["phone"], "telefoonnummer", 9, 1, '/^[0-9 ]+$/');
        $valid["phone"] = ($errors["phone"] == "") ? "" : "notValid";
        $errors["name"] = test_input($_POST["name"], "contactpersoon", 4, 1, "/^([A-Za-zÀ-ÖØ-öø-ÿ _]+[\-\']?)+$/");
        $valid["name"] = ($errors["name"] == "") ? "" : "notValid";
        $errors["message"] = test_input($_POST["message"], "bericht", 4, 0, "");
        $valid["message"] = ($errors["message"] == "") ? "" : "notValid";

        if(!isset($_POST['privacy'])){
            $errors["privacy"] = "<span class='error'>Sorry, dit moet. GDPR enzo.</span>";
        }else{
            if($_POST['privacy'] != "privacy"){
                $errors["privacy"] = "<span class='error'>Sorry, dit moet. GDPR enzo.</span>";
            }
        };

        $clearToSend = 1;

        foreach($errors as $error){
            if($error != ""){
                $clearToSend = 0;
            }
        }

        if($clearToSend === 1){
            $success = '<p><span class="error">Je bericht werd goed verzonden! Ik neem zo snel mogelijk contact met je op.</span></p>';
            $to      = 'jana.verlinde@hotmail.com';
            $subject = 'Portfolio: contactbericht van '.$input["name"];
            $message = '|| organisatie: ||'."\r\n".$input["organisation"]."\r\n".'|| e-mail: ||'."\r\n".$input["email"]."\r\n".'|| telefoon: ||'."\r\n".$input["phone"]."\r\n".'|| contactpersoon: ||'."\r\n".$input["name"]."\r\n".'|| bericht: ||'."\r\n".$input["message"];
            $headers = array(
                'From'      => 'no-reply@janaverlinde.be',
                'Reply-To'  => $input["email"],
                'X-Mailer'  => 'PHP/' . phpversion()
            );
            @mail($to, $subject, $message, $headers);
    

            $input = array(
                "organisation" => "",
                "email" => "",
                "phone" => "",
                "name" => "",
                "message" => "",
                "privacy" => "",
            );

        }else{
            $success = '<p><span class="noError">Je bericht werd nog niet verzonden.</span></p>';
        }
    }
}
?>