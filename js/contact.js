function submitToAPI ( e )
{
    e.preventDefault();
    //       var URL = "API Gateway";


    var name = document.getElementById( "name-input" ).value;
    var phone = document.getElementById( "phone-input" ).value;
    var email = document.getElementById( "email-input" ).value;
    var desc = document.getElementById( "description-input" ).value;
    if ( name == "" || phone == "" || email == "" || desc == "" )
    {
        document.getElementById( "form-validation" ).innerHTML = "Please fill all the required fields";
        return false;
    }

    nameRE = /^[A-Z]{1}[a-z]{2,20}[ ]{1}[A-Z]{1}[a-z]{2,20}/;
    if ( !nameRE.test( name ) )
    {
        document.getElementById( "form-validation" ).innerHTML = "Please enter your full name";
        return false;
    }

    phoneRE = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
    if ( !phoneRE.test( phone ) )
    {
        document.getElementById( "form-validation" ).innerHTML = "Phone number entered is not valid";
        return false;
    }

    emailRE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if ( !emailRE.test( email ) )
    {
        document.getElementById( "form-validation" ).innerHTML = "Email entered is not valid";
        return false;
    }
    var data = {
        name: name,
        phone: phone,
        email: email,
        desc: desc
    };

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open( "POST", "https://isb4cl1auk.execute-api.ap-southeast-2.amazonaws.com/Prod/sendemail" );
    xmlhttp.setRequestHeader( "Content-Type", "application/json" );
    xmlhttp.send( JSON.stringify( data ) );
    xmlhttp.onreadystatechange = function ()
    {
        if ( xmlhttp.readyState === 4 )
        {
            var response = JSON.parse( xmlhttp.responseText );
            if ( xmlhttp.status === 200 )
            {
                console.log( 'successful' );
                document.getElementById( "email-message" ).innerHTML = "Thanks for getting in touch. Our team will reply shortly";
            } else
            {
                document.getElementById( "email-message" ).innerHTML = "Failed to send message.";
            }
        }
    }

    document.getElementById( 'rhythm-contact-form' ).reset();

}