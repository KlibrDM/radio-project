//Getting everything ready to control the pages
//This relies on pageHandler.js
class Controller{
    constructor(){
        this.validPages = config_pages;
        
        this.currentPage = getCurrentPageName();
        this.currentSearchedPage = getCurrentPageLinkSearchName()
        this.currentSubsection = "";

        this.nextPage = "";
        this.nextSearchedPage = "";
        this.nextSubsection = "";
    }

    //Setters
    set validPages(newValidPages){
        this._validPages = newValidPages;
    }

    set currentPage(newCurrentPage){
        this._currentPage = newCurrentPage;
    }
    set currentSearchedPage(newCurrentSearchedPage){
        this._currentSearchedPage = newCurrentSearchedPage;
    }
    set currentSubsection(newCurrentSubsection){
        this._currentSubsection = newCurrentSubsection;
    }

    set nextPage(newNextPage){
        this._nextPage = newNextPage;
    }
    set nextSearchedPage(newNextSearchedPage){
        this._nextSearchedPage = newNextSearchedPage;
    }
    set nextSubsection(newNextSubsection){
        this._nextSubsection = newNextSubsection;
    }

    //Getters
    get validPages(){
        return this._validPages;
    }

    get currentPage(){
        return this._currentPage;
    }
    get currentSearchedPage(){
        return this._currnetSearchedPage;
    }
    get currentSubsection(){
        return this._currentSubsection;
    }

    get nextPage(){
        return this._nextPage;
    }
    get nextSearchedPage(){
        return this._nextSearchedPage;
    }
    get nextSubsection(){
        return this._nextSubsection;
    }

    //Methods
    changePages(){
        //Check if the new page exists
        if(!this.validPages.includes(this.nextPage)){
            //if not, set the next page to the error page
            this.nextPage = "error";
        }
        //Highlight the new page in navbar
        setActivePageInNavbar(this.currentPage, this.nextPage);

        //Make the change between the pages
        this.hideCurrentPage();
        this.showNextPage();

        //Scroll to top - to simulate actual page change
        window.scrollTo(0, 0);

        //Populate the pages with the specifics of each page
        populatePage(this.nextPage);

        //After everything changed, set current page to the new one
        this.switchCurrentPageToNextPage();
    }

    hideCurrentPage(){
        $("#js-handler-"+this.currentPage).hide();
    }

    showNextPage(){
        $("#js-handler-"+this.nextPage).show();
    }

    //Set an active subsection and remove the old one
    changeSubsection(){
        //Highlight the new subsection in selection-menu
        setSubsectionInSelectionMenu(this.currentSubsection, this.nextSubsection);
        
        //Make the change between the subsections
        this.hideCurrentSubsection();
        this.showNextSubsection();

        //After everything changed, set current subsection to the new one
        this.switchCurrentSubsectionToNextSubsection()
    }

    hideCurrentSubsection(){
        $("#radio-subsection-"+this.currentSubsection).hide();
    }

    showNextSubsection(){
        $("#radio-subsection-"+this.nextSubsection).show();
    }


    //Update the current page to the page we switched to and clear next page
    switchCurrentPageToNextPage(){
        this.currentPage = this.nextPage;
        this.nextPage = "";
    }

    //Update the current subsection to the subsection we switched to and clear next subsection
    switchCurrentSubsectionToNextSubsection(){
        this.currentSubsection = this.nextSubsection;
        this.nextSubsection = "";
    }
}

//Creating the obj
var Pages = new Controller();

//Get some things ready as soon as the page loads
$(document).ready(function(){
    handleLoading(); //Load whatever the current page is on refresh
    setComingUpSchedule(); //need to set the schedule for the currently playing host
    showWarningIfDifferentTimezone(); //Show a warning if the user has a different timezone than the radio
});

//HASHCHANGE - This is where the actual page changes happen
$(window).on('hashchange', function() {
    //Fix youtube playing after page change
    if(Pages.currentPage == "listen"){
        $("#pm_ilm").empty(); //Delete the youtube embeded link to make it stop playing
    }

    handleLoading();
});

//Subsection change
$(".selection-options-text").click(function(e){
    let subsectionName = $(this).attr('redirect_subsection').split("_")[1]; //Get the name from the attribute
    Pages.nextSubsection = subsectionName;
    Pages.changeSubsection();
});

function handleLoading(){
    //By the time this is happening, HTML already changed the url
    Pages.nextPage = getCurrentPageName();
    Pages.changePages();
}

//The functions used here can be found in pageHandler.js
function populatePage(pageName){
    let loaded = 0;
    if(pageName == "index"){
        loaded = populateIndexMusicList();
    }
    else if(pageName == "schedule"){
        let today =  getCurrentDayID(); //Get current day ID to show today's subsection
        let todaySubsection = "day"+today; //ex: day1 / day4
        Pages.nextSubsection = todaySubsection;
        Pages.changeSubsection();
        loaded = populateSchedule();
    }
    else if(pageName == "team"){
        Pages.nextSubsection = "team1"; //Consider team1 (DJ) as the default subsection
        Pages.changeSubsection();
        loaded = populateTeam();
    }
    else if(pageName == "music"){
        Pages.nextSubsection = "music1"; //Consider music1 (TOP) as the default subsection
        Pages.changeSubsection();
        loaded = populateMusic();
    }
    else if(pageName == "djprofile"){
        //This must have a "search" in the link
        let linkSearch = getCurrentPageLinkSearchName();
        Pages.nextSearchedPage = linkSearch;
        loaded = populateDJProfile(linkSearch);
    }
    else if(pageName == "listen"){
        //This must have a "search" in the link
        let linkSearch = getCurrentPageLinkSearchName();
        Pages.nextSearchedPage = linkSearch;
        loaded = populateListen(linkSearch);
    }

    //Once loaded, translate it | if allowed
    if(config_allowTranslation){
        let wait = setInterval(function(){ 
            if(loaded){
                clearInterval(wait);
                translate();
            }
        }, 20);
    }
}

function setActivePageInNavbar(oldPage, newPage){
    //Desktop navbar
    $("#navbar_page_text_"+oldPage).removeClass("text-accent-color-1");
    $("#navbar_page_text_"+newPage).addClass("text-accent-color-1");

    //Mobile navbar
    $("#mobile_navbar_page_text_"+oldPage).removeClass("text-accent-color-1");
    $("#mobile_navbar_page_text_"+newPage).addClass("text-accent-color-1");
}

function setSubsectionInSelectionMenu(oldSubsection, newSubsection){
    //Remove old subsection
    $("#subsection-button-"+oldSubsection).attr('subsection_satus','inactive');
    $("#subsection-button-"+oldSubsection).removeClass("accent-color-1");
    //Add new subsection
    $("#subsection-button-"+newSubsection).attr('subsection_satus','active');
    $("#subsection-button-"+newSubsection).addClass("accent-color-1");
}

function getCurrentPageName(){
    let currentPageLink = window.location.href;
    let currentPage = [];
    if(currentPageLink.includes("#")){
        currentPage = currentPageLink.split("#").pop().split('?')[0];
    }
    else{
        currentPage = "index";
    }
    let currentPageName = currentPage;
    return currentPageName;
}

function getCurrentPageLinkSearchName(){
    let currentPageLink = window.location.href;
    let currentPage = "";
    if(currentPageLink.includes("?s=")){
        currentPage = currentPageLink.split("?s=")[1];
    }
    let currentPageName = currentPage;
    return currentPageName;
}

//Update the schedule every few seconds (in case host changes)
setInterval(function(){ 
    setComingUpSchedule();
}, 20000);