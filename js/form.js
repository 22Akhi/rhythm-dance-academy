function submitToAPI ( e )
{
    e.preventDefault();
    //       var URL = "API Gateway";


    var firstName = document.getElementById( "first-name" ).value;
    var lastName = document.getElementById( "last-name" ).value;
    var parentFirstName = document.getElementById( "parent-first-name" ).value;
    var parentLastName = document.getElementById( "parent-last-name" ).value;
    var email = document.getElementById( "email" ).value;
    var mobile = document.getElementById( "mobile" ).value;
    var address = document.getElementById( "address" ).value;
    var source = document.getElementById( "source" ).value;
    var reason = document.getElementById( "reason" ).value;
    if ( firstName == "" || lastName == "" || parentFirstName == "" || parentLastName == "" || mobile == "" || email == "" || address == "" || source == "" || reason == "" )
    {
        document.getElementById( "form-validation" ).innerHTML = "Please fill all the required fields";
        return false;
    }



    phoneRE = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
    if ( !phoneRE.test( mobile ) )
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
        firstName: firstName,
        lastName: lastName,
        parentFirstName: parentFirstName,
        parentLastName: parentLastName,
        mobile: mobile,
        email: email,
        address: address,
        source: source,
        reason: reason
    };

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open( "POST", "https://tvag6xd0s1.execute-api.ap-southeast-2.amazonaws.com/Prod/sendform" );
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
    document.getElementById( "form-validation" ).innerHTML = "";

}