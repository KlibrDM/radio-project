$(document).ready(function(){
    //Only translate if allowed by configuration
    if(config_allowTranslation){
        loadTranslation(config_locale);
        translate();
    }
});

let translation = {}

async function loadTranslation(lang){
    translation = await fetchTranslationsFor(lang);
}

async function translate(){
    let loadFinished = 0;
    if(!loadFinished){
        let wait = setInterval(function(){ 
            if(Object.keys(translation).length != 0){
                loadFinished = 1;
                clearInterval(wait);

                //Translate everything with the ttr attribute
                $('[ttr]').each(function(){
                    let key = $(this).attr('ttr');
                    if(translation[key]!==undefined){
                        $(this).html(translation[key]);
                    }
                });
            }
        }, 20);
    }
}

async function fetchTranslationsFor(lang) {
    const response = await fetch('locale/'+lang+'.json');
    return await response.json();
}

//Used by play button | should be fine, user won't press Play before the page loads
function getTranslation(key){
    if(translation[key]!==undefined){
        return translation[key];
    }
    return "Listening to";
}