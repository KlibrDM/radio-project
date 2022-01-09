$(document).ready(function(){
    loadConfig()
});

function loadConfig(){
    //Radio Name
    document.title = config_radioName;
    
    //Radio Source
    $("#audio-source").attr("src",config_radioSource).appendTo($("#audio-source").parent());
    
    //Set banner links
    $("#banner1").attr("href",config_bannerLink1);
    $("#banner2").attr("href",config_bannerLink2);
    $("#banner3").attr("href",config_bannerLink3);

    //Set social media links
    $("#follow1").attr("href",config_social1);
    $("#follow2").attr("href",config_social2);
    $("#follow3").attr("href",config_social3);
    $("#follow4").attr("href",config_social4);

    //About us
    $("#about-us").html(config_aboutUs);

    //Terms and conditions
    $("#terms-and-conditions").html(config_termsAndConditions);

    //Cookie Policy
    $("#cookie-policy").html(config_cookiePolicy);

    //Custom block
    $("#custom-block").html(config_custom);
}