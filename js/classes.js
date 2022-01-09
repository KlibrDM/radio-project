class Staff{
    constructor(name,label,staff){
        this.name = name;
        this.label = label;
        this.staff = staff;
    }


    set name(newName){
        this._name = newName;
    }
    set label(newLabel){
        this._label = newLabel;
    }
    set staff(newStaff){
        this._staff = newStaff;
    }
    

    get name(){
        return this._name;
    }
    get label(){
        return this._label;
    }
    get staff(){
        return this._staff;
    }
}

class DJ extends Staff{
    constructor(name,label,staff,details,program,startHour){
        super(name,label,staff);
        this.details = details;
        this.program = program;
        this.startHour = startHour;
    }


    set details(newDetails){
        this._details = newDetails;
    }
    set program(newProgram){
        this._program = newProgram;
    }
    set startHour(newStartHour){
        this._startHour = newStartHour;
    }


    get details(){
        return this._details;
    }
    get program(){
        return this._program;
    }
    get startHour(){
        return this._startHour;
    }
}

class Program{
    constructor(name, label, day, startHour, stopHour, host){
        this.name = name;
        this.label = label;
        this.day = day;
        this.startHour = startHour;
        this.stopHour = stopHour;
        this.host = host;
    }


    set name(newName){
        this._name = newName;
    }

    set label(newLabel){
        this._label = newLabel;
    }

    set day(newDay){
        this._day = newDay;
    }

    set startHour(newStartHour){
        this._startHour = newStartHour;
    }

    set stopHour(newStopHour){
        this._stopHour = newStopHour;
    }

    set host(newHost){
        this._host = newHost;
    }


    get name(){
        return this._name;
    }

    get label(){
        return this._label;
    }

    get day(){
        return this._day;
    }

    get startHour(){
        return this._startHour;
    }

    get stopHour(){
        return this._stopHour;
    }

    get host(){
        return this._host;
    }
}

class Music{
    constructor(name, label, artist, embed, description, lyrics){
        this.name = name;
        this.label = label;
        this.artist = artist;
        this.embed = embed;
        this.description = description;
        this.lyrics = lyrics;
    }


    set name(newName){
        this._name = newName;
    }

    set label(newLabel){
        this._label = newLabel;
    }

    set artist(newArtist){
        this._artist = newArtist;
    }

    set embed(newEmbed){
        this._embed = newEmbed;
    }

    set description(newDescription){
        this._description = newDescription;
    }

    set lyrics(newLyrics){
        this._lyrics = newLyrics;
    }


    get name(){
        return this._name;
    }

    get label(){
        return this._label;
    }

    get artist(){
        return this._artist;
    }

    get embed(){
        return this._embed;
    }

    get description(){
        return this._description;
    }

    get lyrics(){
        return this._lyrics;
    }
}