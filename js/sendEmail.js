var AWS = require( 'aws-sdk' );
var ses = new AWS.SES();

var RECEIVER = 'debangan.roy700@gmail.com';
var SENDER = 'debangan.roy700@gmail.com';

var response = {
    "isBase64Encoded": false,
    "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    "statusCode": 200,
    "body": "{\"result\": \"Success.\"}"
};

exports.handler = function ( event, context )
{
    console.log( 'Received event:', event );
    sendEmail( event, function ( err, data )
    {
        context.done( err, null );
    } );
};

function sendEmail ( event, done )
{
    var params = {
        Destination: {
            ToAddresses: [
                RECEIVER
            ]
        },
        Message: {
            Body: {
                Text: {
                    Data: 'Please find the details of the admission form submitted from online below : ' + '\n\nFirst Name: ' + event.firstName + '\n\nLast Name: ' + event.lastName + '\n\nParent First Name : ' + event.parentFirstName + '\n\nParent Last Name : ' + event.parentLastName + '\n\nMobile : ' + event.mobile + '\n\nEmail : ' + event.email + '\n\nResidential Address : ' + event.address + '\n\nHow do you hear about us? : ' + event.source + '\n\Why do you want to learn Odissi?: ' + event.reason,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Potential Prospect - Admission Form: ' + event.name,
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    };
    ses.sendEmail( params, done );
}