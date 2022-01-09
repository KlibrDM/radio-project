$(document).ready(function(){
    getBannersForCycle();
});

/*---Banner---*/
let banner = [];
let activebanner = 0;

function getBannersForCycle(){
    banner[1] = document.getElementById("banner1");
    banner[2] = document.getElementById("banner2");
    banner[3] = document.getElementById("banner3");

    cycleBanners();
}

function cycleBanners(){
    for(let i = 1; i <= 3; i++){
        banner[i].style.display = "none";
    }
    activebanner += 1;

    //Go back to 1 if the next number exceeds the number of banners
    if(activebanner == 4){
        activebanner = 1;
    }
    
    banner[activebanner].style.display = "block";
}

//Cycle banners at an interval
setInterval(function(){ 
    cycleBanners();
}, 5000);


/*---Hide volume slider on mobile---*/
if(window.devicePixelRatio > 2.1 && window.innerHeight * 1.5 > window.innerWidth){
    $(".radio-volume-box").hide();
}