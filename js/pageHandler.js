//This file is best when kept closed :D
//It contains the functions that populate the pages

function populateIndexMusicList(){
    let loadFinished = 0;
    if(!loadFinished){
        let wait = setInterval(function(){ 
            //Wait until AJAX loads the data we need
            if(Object.keys(MusicListTop).length != 0){
                loadFinished = 1;
                clearInterval(wait);

                //Empty the page in case it has something previously placed there
                $("#top-music-on-main-page").empty();

                //Set a limit for the number of elements shown
                let inLimit = 6;

                for(let x in MusicListTop){
                    if(inLimit){
                        let html = `
                        <div class="main-page-song-tiles">
                            <div class="main-page-music-yt-thumbnail" style="background-image: url(https://img.youtube.com/vi/`+MusicListTop[x].embed+`/0.jpg);"></div>
                            <div class="radiotilestext">
                                <div>
                                    <p class="main-page-song-tiles-label">`+MusicListTop[x].label+`</p>
                                    <p class="main-page-song-tiles-artist">`+MusicListTop[x].artist+`</p>
                                </div>
                                <a href="#listen?s=`+MusicListTop[x].name+`" class="accent-color-1 team-tilesbutton" ttr="listen">Listen</a>
                            </div>
                        </div>
                        `;
                        $("#top-music-on-main-page").append(html);
                        inLimit--;
                    }
                }
            }
        }, 20);
    }
    //Return value so controller knows when it loaded
    return 1;
}

//The other functions for populating pages work pretty much the same way
function populateTeam(){
    //Load DJ
    let loadFinished = 0;
    if(!loadFinished){
        let wait = setInterval(function(){ 
            if(Object.keys(DJList).length != 0){
                loadFinished = 1;
                clearInterval(wait);

                $("#radio-subsection-team1").empty();

                for(let x in DJList){
                    if(DJList[x].name != "autodj"){
                        let html = `
                        <div class="radio-team-tiles">
                            <img src="img/Staff/`+DJList[x].name+`.jpg" alt="DJ" class="radio-team-tilesimg"/>
                            <div class="radiotilestext">
                                <div>
                                    <p class="djplayertext">`+DJList[x].label+`</p>
                                </div>
                                <a href="#djprofile?s=`+DJList[x].name+`" class="accent-color-1 team-tilesbutton" ttr="see_dj">See DJ</a>
                            </div>
                        </div>
                        `;
                        $("#radio-subsection-team1").append(html);
                    }
                }
            }
        }, 20);
    }

    //Load Staff
    loadFinished = 0;
    if(!loadFinished){
        let wait = setInterval(function(){
            if(Object.keys(StaffList).length != 0){
                loadFinished = 1;
                clearInterval(wait);

                $("#radio-subsection-team2").empty();
                $("#radio-subsection-team3").empty();
                $("#radio-subsection-team4").empty();

                for(let x in StaffList){
                    let html = `
                    <div class="radio-team-tiles">
                        <img src="img/Staff/`+StaffList[x].name+`.jpg" alt="DJ" class="radio-team-tilesimg"/>
                        <div class="radiotilestext">
                            <div>
                                <p id="djplayertext">`+StaffList[x].label+`</p>
                            </div>
                        </div>
                    </div>
                    `;

                    if(StaffList[x].staff == "team2"){
                        $("#radio-subsection-team2").append(html);
                    }
                    else if(StaffList[x].staff == "team3"){
                        $("#radio-subsection-team3").append(html);
                    }
                    else if(StaffList[x].staff == "team4"){
                        $("#radio-subsection-team4").append(html);
                    }
                }
            }
        }, 20);
    }
    //Return value so controller knows when it loaded
    return 1;
}

function populateSchedule(){
    //Load Schedule
    let loadFinished = 0;
    if(!loadFinished){
        let wait = setInterval(function(){ 
            //Check for both Program and DJ lists because we will have to get the label of the DJs
            if(Object.keys(ProgramList).length != 0 && Object.keys(DJList).length != 0){
                loadFinished = 1;
                clearInterval(wait);

                $("#radio-subsection-day1").empty();
                $("#radio-subsection-day2").empty();
                $("#radio-subsection-day3").empty();
                $("#radio-subsection-day4").empty();
                $("#radio-subsection-day5").empty();
                $("#radio-subsection-day6").empty();
                $("#radio-subsection-day7").empty();

                //Create a copied list to sort it
                let CopyProgramList = [];
                for(let x in ProgramList){
                    CopyProgramList[x] = ProgramList[x].startHour;
                }
                //Change the strings to numbers to be able to sort it
                for(let x in CopyProgramList){
                    let programStartHour = CopyProgramList[x].split(":")[0];
                    let programStartMinutes = CopyProgramList[x].split(":")[1];
                    programStartHour = programStartHour + programStartMinutes;
                    programStartHour = parseInt(programStartHour);
                    if(programStartHour < 400){programStartHour += 2400;}
                    CopyProgramList[x] = programStartHour;
                }

                //Get the keys sorted
                CopyProgramList = getSortedKeys(CopyProgramList);

                for(let y in CopyProgramList){
                    //Parse the data in the sorted order
                    x = CopyProgramList[y]; //This will be the actual key
                    if(ProgramList[x].startHour != 0){ //if 0 it means that the program doesn't run that day
                        let linkDJ = makeLinkForDJS(ProgramList[x].host);
                        
                        let html = `
                        <div class="radio-schedule-tiles">
                            <img src="img/Schedule/`+ProgramList[x].name+`.jpg" alt="DJ" class="radio-schedule-tilesimg"/>
                            <div class="radiotilestext">
                                <div>
                                    <p class="djplayertext">`+ProgramList[x].label+`</p>
                                    <p class="djplayertext">`+ProgramList[x].startHour+` - `+ProgramList[x].stopHour+`</p>
                                </div>
                                <p class="djhost">`+linkDJ+`</p>
                            </div>
                        </div>
                        `;

                        if(ProgramList[x].day == "day1"){
                            $("#radio-subsection-day1").append(html);
                        }
                        else if(ProgramList[x].day == "day2"){
                            $("#radio-subsection-day2").append(html);
                        }
                        else if(ProgramList[x].day == "day3"){
                            $("#radio-subsection-day3").append(html);
                        }
                        else if(ProgramList[x].day == "day4"){
                            $("#radio-subsection-day4").append(html);
                        }
                        else if(ProgramList[x].day == "day5"){
                            $("#radio-subsection-day5").append(html);
                        }
                        else if(ProgramList[x].day == "day6"){
                            $("#radio-subsection-day6").append(html);
                        }
                        else if(ProgramList[x].day == "day7"){
                            $("#radio-subsection-day7").append(html);
                        }
                    }
                }
            }
        }, 20);
    }
    //Return value so controller knows when it loaded
    return 1;
}

function populateMusic(){
    //Load Music
    let loadFinished = 0;
    if(!loadFinished){
        let wait = setInterval(function(){ 
            if(Object.keys(MusicListNew).length != 0){
                loadFinished = 1;
                clearInterval(wait);

                $("#radio-subsection-music1").empty();
                $("#radio-subsection-music2").empty();

                for(let x in MusicListTop){
                    let html = `
                    <div class="radio-music-tiles">
                    <div class="music-list-page-yt-thumbnail" style="background-image: url(https://img.youtube.com/vi/`+MusicListTop[x].embed+`/0.jpg);"></div>
                        <div class="radiotilestext">
                            <div>
                                <p class="music-list-label-text">`+MusicListTop[x].label+`</p>
                                <p class="music-list-artist-text">`+MusicListTop[x].artist+`</p>
                            </div>
                            <a href="#listen?s=`+MusicListTop[x].name+`" class="accent-color-1 team-tilesbutton" ttr="listen">Listen</a>
                        </div>
                    </div>
                    `;
                    $("#radio-subsection-music1").append(html);
                }

                for(let x in MusicListNew){
                    let html = `
                    <div class="radio-music-tiles">
                    <div class="music-list-page-yt-thumbnail" style="background-image: url(https://img.youtube.com/vi/`+MusicListNew[x].embed+`/0.jpg);"></div>
                        <div class="radiotilestext">
                            <div>
                                <p class="music-list-label-text">`+MusicListNew[x].label+`</p>
                                <p class="music-list-artist-text">`+MusicListNew[x].artist+`</p>
                            </div>
                            <a href="#listen?s=`+MusicListNew[x].name+`" class="accent-color-1 team-tilesbutton" ttr="listen">Listen</a>
                        </div>
                    </div>
                    `;
                    $("#radio-subsection-music2").append(html);
                }
            }
        }, 20);
    }
    //Return value so controller knows when it loaded
    return 1;
}

function populateDJProfile(searchedName){
    //Populate the profile of the DJ we looked for
    let loadFinished = 0;
    if(!loadFinished){
        let wait = setInterval(function(){ 
            if(Object.keys(DJList).length != 0){
                loadFinished = 1;
                clearInterval(wait);

                let match = 0;
                
                $("#pdj_ilm").empty();
                $("#pdj_ilt").empty();
                $("#pdj_ildi").empty();
                $("#pdj_ildt").empty();
                $("#pdj_irm").empty();

                for(let x in DJList){
                    if(DJList[x].name == searchedName){
                        match = 1;
                        let html = ``;

                        //Main picture
                        html = `<img src="img/Staff/`+DJList[x].name+`_profile.jpg" alt="DJ"/>`;
                        $("#pdj_ilm").append(html);

                        //Title
                        html = `<p>`+DJList[x].label+`</p>`;
                        $("#pdj_ilt").append(html);

                        //Description Image
                        html = `<img src="img/Staff/`+DJList[x].name+`_desc.jpg" alt="DJ"/>`;
                        $("#pdj_ildi").append(html);

                        //Description Text
                        html = `<p>`+DJList[x].details+`</p>`;
                        $("#pdj_ildt").append(html);
                        
                        let programTitleDiv =   `<div class="pdj_irm_box" id="pdj_irm_box_schedule">
                                                    <p class="pdj_irm_box_title accent-color-1" ttr="dj_schedule">Schedule</p>
                                                </div>`;
                        $("#pdj_irm").append(programTitleDiv);

                        for(let day in DJList[x].startHour){
                            if(DJList[x].startHour[day] != "0"){
                                let bigDiv = `<div class="pdj_irm_box" id="pdj_irm_box_`+day+`"></div>`;
                                $("#pdj_irm").append(bigDiv);
                                
                                let content = ``;
                                content = `<p class="pdj_irm_box_title accent-color-1">`+getCurrentDayFromJSONID(day)+`</p>`;
                                $("#pdj_irm_box_"+day).append(content);

                                content = `<p class="pdj_irm_box_content" id="pdj_irm_content_text">`+DJList[x].startHour[day]+`</p>`;
                                $("#pdj_irm_box_"+day).append(content);
                            }
                        }
                    }
                }
                if(!match){
                    window.location.href = "#error";
                }
            }
        }, 20);
    }
    //Return value so controller knows when it loaded
    return 1;
}

function populateListen(searchedName){
    //Populate the listening page with what we're looking for
    let loadFinished = 0;
    if(!loadFinished){
        let wait = setInterval(function(){ 
            if(Object.keys(MusicListNew).length != 0){
                loadFinished = 1;
                clearInterval(wait);

                let match = 0;
                
                $("#pm_ilm").empty();
                $("#pm_ilt").empty();
                $("#pm_ildi").empty();
                $("#pm_ildt").empty();
                $("#pm_irm").empty();

                for(let x in MusicListTop){
                    if(MusicListTop[x].name == searchedName){
                        match = 1;
                        fillMusicPageWith(MusicListTop[x]);
                    }
                }
                if(!match){
                    for(let x in MusicListNew){
                        if(MusicListNew[x].name == searchedName){
                            match = 1;
                            fillMusicPageWith(MusicListNew[x]);
                        }
                    }
                }
                if(!match){
                    window.location.href = "#error";
                }
            }
        }, 20);
    }
    //Return value so controller knows when it loaded
    return 1;
}

function fillMusicPageWith(x){
    //Created this function to not repeat the code for the 2 music categories
    let html = ``;

    //Main video
    html = `<iframe id="pm_yt_embed" src="https://www.youtube.com/embed/`+x.embed+`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    $("#pm_ilm").append(html);

    //Title
    html = `<p>`+x.artist+` - `+x.label+`</p>`;
    $("#pm_ilt").append(html);

    //Description Text
    html = `<p>`+x.description+`</p>`;
    $("#pm_ildt").append(html);
    
    let lyricsTitleDiv =   `<div class="pdj_irm_box" id="pm_irm_box_lyrics">
                                <p class="pdj_irm_box_title accent-color-1" ttr="song_lyrics">Lyrics</p>
                            </div>`;
    $("#pm_irm").append(lyricsTitleDiv);

    let lyricsTextDiv =   `<div class="pdj_irm_box" id="pm_irm_box_lyrics">
                                <p class="pdj_irm_box_content" id="pm_irm_lyrics_text">`+x.lyrics+`</p>
                            </div>`;
    $("#pm_irm").append(lyricsTextDiv);
}

function setComingUpSchedule(){
    let currentDayName = getCurrentDayName();
    let currentHour = getCurrentHour(); //and minutes
    
    //Wait for the data to load
    let loadFinished = 0;
    if(!loadFinished){
        let wait = setInterval(function(){ 
            //Check for both Program and DJ lists because we will have to get the label of the DJs
            if(Object.keys(ProgramList).length != 0 && Object.keys(DJList).length != 0){
                loadFinished = 1;
                clearInterval(wait);

                let reachedProgramPlayingNow = 0;
                let comingUpFirstIterarion = 1;
                let comingUpCounter = 1;
                let hadToCheckPreviousDay = 0;

                //Create a copied list to sort it
                let CopyProgramList = [];
                for(let x in ProgramList){
                    CopyProgramList[x] = ProgramList[x].startHour;
                }
                //Change the strings to numbers to be able to sort it
                for(let x in CopyProgramList){
                    let programStartHour = CopyProgramList[x].split(":")[0];
                    let programStartMinutes = CopyProgramList[x].split(":")[1];
                    programStartHour = programStartHour + programStartMinutes;
                    programStartHour = parseInt(programStartHour);
                    if(programStartHour < 400){programStartHour += 2400;}
                    CopyProgramList[x] = programStartHour;
                }

                //Get the keys sorted
                CopyProgramList = getSortedKeys(CopyProgramList);

                for(let y in CopyProgramList){
                    //Parse the data in the sorted order
                    x = CopyProgramList[y]; //This will be the actual key
                    if(x.includes(currentDayName)){
                        let programStartHour = ProgramList[x].startHour.split(":")[0];
                        let programStartMinutes = ProgramList[x].startHour.split(":")[1];
                        programStartHour = programStartHour + programStartMinutes;
                        programStartHour = parseInt(programStartHour);
                        if(programStartHour == 0){programStartHour = 2400;}

                        let programStopHour = ProgramList[x].stopHour.split(":")[0];
                        let programStopMinutes = ProgramList[x].stopHour.split(":")[1];
                        programStopHour = programStopHour + programStopMinutes;
                        programStopHour = parseInt(programStopHour);
                        if(programStopHour == 0){programStopHour = 2400;}

                        //IF PROGRAM ENDS THE NEXT DAY
                        if(programStopHour < programStartHour){
                            programStopHour = 2400 + programStopHour;
                        }

                        if(currentHour >= programStartHour && currentHour < programStopHour){
                            $("#mainplayerschedule_title").html(ProgramList[x].label);
                            $("#mainplayerschedule_hours").html(ProgramList[x].startHour + " - " + ProgramList[x].stopHour);
                            $("#mainplayerschedule_host").html(makeLinkForDJS(ProgramList[x].host));
                            $("#mainplayerschedule_image").attr("src","img/Schedule/"+ProgramList[x].name+".jpg");
                            reachedProgramPlayingNow = 1;
                        }

                        if(reachedProgramPlayingNow == 1 && comingUpCounter <= 2){
                            if(!comingUpFirstIterarion){
                                $("#mainpagecomingup_title_"+comingUpCounter).html(ProgramList[x].label);
                                $("#mainpagecomingup_hours_"+comingUpCounter).html(ProgramList[x].startHour + " - " + ProgramList[x].stopHour);
                                $("#mainpagecomingup_host_"+comingUpCounter).html(makeLinkForDJS(ProgramList[x].host));
                                $("#mainpagecomingup_image_"+comingUpCounter).attr("src","img/Schedule/"+ProgramList[x].name+".jpg");
                                comingUpCounter++;
                            }
                            comingUpFirstIterarion = 0;
                        }
                    }
                }

                //IF DIDN'T FIND WHAT'S CURRENTLY PLAYING, GO TO YESTERDAY
                if(!reachedProgramPlayingNow){
                    let previousDayName = getPreviousDayName();
                    //WHAT WE MISS IS GONNA BE THE LAST THING FROM THE PREVIOUS DAY
                    let programStartHour = 0;
                    let programStartMinutes = 0;
                    let programStopHour = 0;
                    let programStopMinutes = 0;
                    let element;
                    for(let y in CopyProgramList){
                        //Parse the data in the sorted order
                        x = CopyProgramList[y]; //This will be the actual key
                        if(x.includes(previousDayName)){
                            programStartHour = ProgramList[x].startHour.split(":")[0];
                            programStartMinutes = ProgramList[x].startHour.split(":")[1];
                            programStartHour = programStartHour + programStartMinutes;
                            programStartHour = parseInt(programStartHour);
                            if(programStartHour == 0){programStartHour = 2400;}
    
                            programStopHour = ProgramList[x].stopHour.split(":")[0];
                            programStopMinutes = ProgramList[x].stopHour.split(":")[1];
                            programStopHour = programStopHour + programStopMinutes;
                            programStopHour = parseInt(programStopHour);
                            if(programStopHour == 0){programStopHour = 2400;}

                            element = x;
                        }
                    }
                    //We parse through everything and store last values
                    $("#mainplayerschedule_title").html(ProgramList[element].label);
                    $("#mainplayerschedule_hours").html(ProgramList[element].startHour + " - " + ProgramList[element].stopHour);
                    $("#mainplayerschedule_host").html(makeLinkForDJS(ProgramList[element].host));
                    $("#mainplayerschedule_image").attr("src","img/Schedule/"+ProgramList[element].name+".jpg");
                    reachedProgramPlayingNow = 1;
                    hadToCheckPreviousDay = 1;
                }

                //IF NOT ENOUGH COMING UP IN CURRENT DAY, GO TO NEXT DAY
                if(comingUpCounter < 3){
                    let nextDayName = '';
                    if(hadToCheckPreviousDay){
                        nextDayName = getCurrentDayName();
                    }
                    else{
                        nextDayName = getNextDayName();
                    }
                    for(let y in CopyProgramList){
                        //Parse the data in the sorted order
                        x = CopyProgramList[y]; //This will be the actual key
                        if(x.includes(nextDayName)){
                            let programStartHour = ProgramList[x].startHour.split(":")[0];
                            let programStartMinutes = ProgramList[x].startHour.split(":")[1];
                            programStartHour = programStartHour + programStartMinutes;
                            programStartHour = parseInt(programStartHour);
                            if(programStartHour == 0){programStartHour = 2400;}
    
                            let programStopHour = ProgramList[x].stopHour.split(":")[0];
                            let programStopMinutes = ProgramList[x].stopHour.split(":")[1];
                            programStopHour = programStopHour + programStopMinutes;
                            programStopHour = parseInt(programStopHour);
                            if(programStopHour == 0){programStopHour = 2400;}
    
                            if(comingUpCounter <= 2){
                                $("#mainpagecomingup_title_"+comingUpCounter).html(ProgramList[x].label);
                                $("#mainpagecomingup_hours_"+comingUpCounter).html(ProgramList[x].startHour + " - " + ProgramList[x].stopHour);
                                $("#mainpagecomingup_host_"+comingUpCounter).html(makeLinkForDJS(ProgramList[x].host));
                                $("#mainpagecomingup_image_"+comingUpCounter).attr("src","img/Schedule/"+ProgramList[x].name+".jpg");
                                comingUpCounter++;
                            }
                            //WHAT WE MISS IS GONNA BE THE FIRST THING FROM THE NEXT DAY
                        }
                    }
                }
            }
        }, 10);
    }
}

function getSortedKeys(obj) {
    var keys = Object.keys(obj);
    return keys.sort(function(a,b){return obj[a]-obj[b]});
}

function makeLinkForDJS(host){
    //This will make links for one or multiple DJs
    let linkdj = '';
    let firstTimeHostIteration = 1;
    host.forEach(element => {
        if(!firstTimeHostIteration){ linkdj = linkdj.concat(" & ");}
        linkdj = linkdj.concat('<a href="#djprofile?s='+element+'">'+DJList[element].label+'</a>');
        firstTimeHostIteration = 0
    });
    return linkdj;
}

function getCurrentDayID(){
    const date = new Date();
    let day = date.getDay();
    let dayID = 0;
    switch(day){
        case 0: dayID=7; break;
        case 1: dayID=1; break;
        case 2: dayID=2; break;
        case 3: dayID=3; break;
        case 4: dayID=4; break;
        case 5: dayID=5; break;
        case 6: dayID=6; break;
    }
    return dayID;
}

function getCurrentDayFromJSONID(id){
    let dayName = "Monday";
    id = parseInt(id);
    switch(id){
        case 0: dayName="Monday"; break;
        case 1: dayName="Tuesday"; break;
        case 2: dayName="Wednesday"; break;
        case 3: dayName="Thursday"; break;
        case 4: dayName="Friday"; break;
        case 5: dayName="Saturday"; break;
        case 6: dayName="Sunday"; break;
    }
    return dayName;
}

function getCurrentDayName(){
    const date = new Date();
    let day = date.getDay();
    let dayName = "day1";
    switch(day){
        case 0: dayName="day7"; break;
        case 1: dayName="day1"; break;
        case 2: dayName="day2"; break;
        case 3: dayName="day3"; break;
        case 4: dayName="day4"; break;
        case 5: dayName="day5"; break;
        case 6: dayName="day6"; break;
    }
    return dayName;
}

function getNextDayName(){
    const date = new Date();
    let day = date.getDay()+1;
    let dayName = "luni";
    switch(day){
        case 0: dayName="day7"; break;
        case 1: dayName="day1"; break;
        case 2: dayName="day2"; break;
        case 3: dayName="day3"; break;
        case 4: dayName="day4"; break;
        case 5: dayName="day5"; break;
        case 6: dayName="day6"; break;
        case 7: dayName="day7"; break;
    }
    return dayName;
}

function getPreviousDayName(){
    const date = new Date();
    let day = date.getDay()-1;
    let dayName = "luni";
    switch(day){
        case 0: dayName="day7"; break;
        case 1: dayName="day1"; break;
        case 2: dayName="day2"; break;
        case 3: dayName="day3"; break;
        case 4: dayName="day4"; break;
        case 5: dayName="day5"; break;
        case 6: dayName="day6"; break;
        case -1: dayName="day7"; break;
    }
    return dayName;
}

function getCurrentHour(){
    let hour = new Date().toLocaleString('en-US', { hour: '2-digit', hour12: false, timeZone: config_timezone });
    hour = parseInt(hour);
    let minutes = new Date().toLocaleString('en-US', { minute: '2-digit', hour12: false, timeZone: config_timezone });
    minutes = parseInt(minutes);
    let hourMinutes = hour * 100 + minutes;
    return hourMinutes;
}

function showWarningIfDifferentTimezone(){
    let radioTime = getCurrentHour();
    let localDate = new Date();
    let localHour = localDate.getHours();
    if (localHour == 0){ localHour = 24};
    let localMinutes = localDate.getMinutes();
    let localTime = localHour * 100 + localMinutes;

    if(config_showTimezoneWarning && radioTime != localTime){
        $("#timezone-warning").show();
        $("#timezone-req").html(config_timezone);
    }
}
