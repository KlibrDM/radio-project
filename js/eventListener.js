/*------------------*/
/*  VOLUME CONTROL  */
/*------------------*/

$(document).ready(function(){
    //Set the volume of the audio player to 35%;
    changeVolume(35);
});

$('#volume-control').on("input", function() {
    changeVolume($(this).val());
});

function changeVolume(vol){
    let radio = document.getElementById("radioaudio");
    radio.volume = vol/100;
}


/*------------------*/
/*   RADIO PLAYER   */
/*------------------*/

//Play the radio when the button is pressed
$("#playbutton").click(function(e){
    playRadio();
});

let isPlaying = 0;
let standardText = ""; //To store the original text of the radio tile

function playRadio(){
    let radio = document.getElementById("radioaudio");
    let radiotext = document.getElementById("playradiotext");
    let radiobutton = document.getElementById("playbutton");
    
    if(standardText == ""){standardText = radiotext.innerHTML}

    if(!isPlaying){
        radio.play();
        isPlaying = 1;

        //Set text and button
        radiotext.innerHTML = getTranslation("listening_to")+" "+config_radioName;
        radiobutton.innerHTML = "Stop";
    }
    else{
        radio.pause();
        isPlaying = 0;

        //Set text and button
        radiotext.innerHTML = standardText;
        radiobutton.innerHTML = "Play";
    }
}


/*------------------*/
/*      NAVBAR      */
/*------------------*/

//When clicked on hamburger button -> Show the mobile menu
$("#burgerbutton").click(function(e){
    showMobileMenu();
});

//When clicked on a button inside the menu (mobile), call the function again
//because that will hide it if it's already shown
//(and it is because you just pressed a button in it)
$(".mobilepageswitchbtn").click(function(e){
    showMobileMenu(); //IT HIDES IT
});

let isMobileMenuOpen = 0;

//If clicking outside of the navbar -> Hide it (mobile)
$("body").click(function(e){
    if(isMobileMenuOpen){
        if(e.target.id == "navbar")
            return;
        if($(e.target).closest('#navbar').length)
            return;
        if(e.target.id == "mobile-navbar")
            return;
        if($(e.target).closest('#mobile-navbar').length)
            return;
        showMobileMenu(); //IT HIDES IT
    }
});

function showMobileMenu(){
    if(!isMobileMenuOpen){ //Menu opening
        $("#mobile-navbar").show();

        //Animations swing IN added
        $("#mobile-navbar").removeClass("swing-out-top-bck");
        $("#mobile-navbar").addClass("swing-in-top-fwd");

        //Set color of the hamburger button when pressed
        $("#burgerbutton").addClass("accent-color-1");
        $("#burgerbutton button i").css("color","white");
        isMobileMenuOpen = 1;
    }
    else{ //Menu closing
        setTimeout(function(){
            $("#mobile-navbar").hide(); //Wait until animations finish
        }, 250);

        //Animation swing OUT added
        $("#mobile-navbar").removeClass("swing-in-top-fwd");
        $("#mobile-navbar").addClass("swing-out-top-bck");

        //Remove color of hamburger button
        $("#burgerbutton").removeClass("accent-color-1");
        $("#burgerbutton button i").css("color","canvastext");
        isMobileMenuOpen = 0;
    }
}


/*------------------*/
/*      CONTACT     */
/*------------------*/

//If submit button is pressed in the contact form
$("#contact-form").submit(function(e){
    //Get the values from the form
    let data = $(this).serializeArray();
    //And send it to the other function that will AJAX to PHP
    sendMail(data);

    //Clear the contents of the inputs after sending the mail
    $("#form_name").val('');
    $("#form_email").val('');
    $("#form_message").val('');

    //Hide the success / failure message after 15 seconds
    setTimeout(function(){
        $(".form-success-message").hide();
        $(".form-failure-message").hide();
    }, 15000);
});

function sendMail(mailDetails){
    let name = escapeHTML(mailDetails[0]['value']);
    let email = escapeHTML(mailDetails[1]['value']);
    let message = escapeHTML(mailDetails[2]['value']);
    message = message.replace(/(?:\r\n|\r|\n)/g, '<br>');
    //Try to sanitize the data before sending the mail

    $.ajax({ 
        url: config_ajaxSendMailFrom,
        type: 'post',
        data: {action: '{"atype": "sendmail", "to": "'+config_email+'", "from": "'+email+'", "name": "'+name+'", "subject":"'+config_radioName+' contact", "message": "'+message+'"}'},
        success: function(result) {
            let ajaxResult = result;

            //We can get sucess from AJAX but error from PHP so we will check everything
            if(ajaxResult.length > 3){
                $(".form-success-message").show();
            }
            //If empty string returned (more exactly one with <= 3 characters) that means we have an error
            else{
                $(".form-failure-message").show();
            }
        },
        error: function() {
            $(".form-failure-message").show();
        }
    });
}

//Sanitizing the data
var entityMap = {'&': '&amp;','<': '&lt;','>': '&gt;','"': '&quot;',"'": '&#39;','/': '&#x2F;','`': '&#x60;','=': '&#x3D;'};
function escapeHTML(string){
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
}