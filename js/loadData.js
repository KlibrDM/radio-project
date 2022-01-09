$(document).ready(function(){
    //Global variables
    DJList = load_DJ();
    ProgramList = load_program();
    MusicListTop = load_music_top();
    MusicListNew = load_music_noua();
    StaffList = load_staff();
});

function load_DJ(){
    //Create a list in which we insert all the objects
    let DJList = [];
    $.ajax({ 
        url: 'data/dj.json',
        success: function(result) {
            for(let elements in result){
                //Create the object
                let DJObject = new DJ(result[elements].name, result[elements].label, result[elements].staff, result[elements].details, result[elements].program, result[elements].starthour);
                //Add the object into the list
                DJList[result[elements].name] = DJObject;
            }
        }
    });
    //Return the list
    return DJList;
}

//The others work just like the first
function load_staff(){
    let StaffList = [];
    $.ajax({ 
        url: 'data/staff.json',
        success: function(result) {
            for(let elements in result){
                let StaffObject = new Staff(result[elements].name, result[elements].label, result[elements].staff);
                StaffList[result[elements].name] = StaffObject;
            }
        }
    });
    return StaffList;
}

function load_program(){
    let ProgramList = [];
    $.ajax({ 
        url: 'data/program.json',
        success: function(result) {
            for(let elements in result){
                //Here we add an entry for each day of the week in which the program is running
                for(let hourIndex in result[elements].starthour){
                    let day = "day1";
                    if(hourIndex == 0) {day = "day1";}
                    else if(hourIndex == 1) {day = "day2";}
                    else if(hourIndex == 2) {day = "day3";}
                    else if(hourIndex == 3) {day = "day4";}
                    else if(hourIndex == 4) {day = "day5";}
                    else if(hourIndex == 5) {day = "day6";}
                    else if(hourIndex == 6) {day = "day7";}

                    //If the starthour is 0, that means that the program is not running that day
                    if(result[elements].starthour[hourIndex] != "0"){
                        let ProgramObject = new Program(result[elements].name, result[elements].label, day, result[elements].starthour[hourIndex], result[elements].stophour[hourIndex], result[elements].host);
                        ProgramList[result[elements].name+"_"+day] = ProgramObject;
                    }
                }
            }
        }
    });
    return ProgramList;
}

function load_music_top(){
    let MusicListTop = [];
    $.ajax({ 
        url: 'data/music.json',
        success: function(result) {
            for(let elements in result){;
                if(elements == "top"){
                    for(let x in result[elements]){
                        let MusicObject = new Music(result[elements][x].name, result[elements][x].label, result[elements][x].artist, result[elements][x].embed, result[elements][x].description, result[elements][x].lyrics);
                        MusicListTop[result[elements][x].name] = MusicObject;
                    }
                }
            }
        }
    });
    return MusicListTop;
}

function load_music_noua(){
    let MusicListNew = [];
    $.ajax({ 
        url: 'data/music.json',
        success: function(result) {
            for(let elements in result){;
                if(elements == "new"){
                    for(let x in result[elements]){
                        let MusicObject = new Music(result[elements][x].name, result[elements][x].label, result[elements][x].artist, result[elements][x].embed, result[elements][x].description, result[elements][x].lyrics);
                        MusicListNew[result[elements][x].name] = MusicObject;
                    }
                }
            }
        }
    });
    return MusicListNew;
}