//Default language - choose only what is available in the locale folder.
//You can make your own locale files for your own language
var config_locale = "en";

//You can enable or disable translation. Set to true to allow translations. Translations use the locale files
//If set to false, the page will use the hardcoded texts
var config_allowTranslation = false;

//Radio name
var config_radioName = "Radio Project";

//Radio live stream source
var config_radioSource = "https://live.kissfm.ro/kissfm.aacp";

//Radio timezone | You can find a list of timezones in utils/timezones.txt
var config_timezone = 'Europe/Bucharest';

//If the user is in a different timezone, show him a warning
//Set to false if you do not want to warn the user
var config_showTimezoneWarning = true;

//Email to deliver contact messages to
var config_email = "insert_your_email@domain.com"; //change this to your own email address

//Link to the php mailer. The default setting works but it will send an email from proiectpiu@gmail.com
//You can use the utils/sendmail.php file if your server is running PHP and you've set up your SMTP settings
var config_ajaxSendMailFrom = "http://patrickcc.go.ro:81/utils/sendmail.php";
//Comment out the line above and uncomment the line below to use the file provided for your own SMTP
//var config_ajaxSendMailFrom = "utils/sendmail.php";

//Banner Links
//Use #index if you don't want the banners to redirect anywhere
//As of right now the banners are hardcoded, if you want to change their number, modify the HTML and index.js
var config_bannerLink1 = "#index";
var config_bannerLink2 = "#index";
var config_bannerLink3 = "#index";

//Social media links
//Use #index if you don't want the images to redirect anywhere
var config_social1 = "https://instagram.com";
var config_social2 = "https://spotify.com";
var config_social3 = "https://facebook.com";
var config_social4 = "https://youtube.com";

//list of valid pages
//Pages won't update auto-magically. As of right now, these are hardcoded into HTML. Feel free to change anything as you wish!!
var config_pages = ["index","schedule","team","music","contact","djprofile","listen","aboutus","terms","cookiepolicy","error"];


//NOTES

//Accent colors can be changed in css/style.css | lines: 32 -> 43

//Image files can be added in the img folder (and into img/Schedule and img/Staff based on needs)
//The image name must match the "name" of the dj/staff/program
//All images are jpg (except logo.png and logo_alternative.png)

//Data about DJs, Staff, Songs, Programs can be added in the data folder, in their specific JSON files
//DJ startHour must contain 7 values, if the DJ doesn't play in a day, set the value to "0"
//Same with Program startHour and stopHour

//To embed songs from Youtube, you need the song id. Basically what is after "watch?v=" in the youtube link
//Example: for "https://www.youtube.com/watch?v=orJSJGHjBLI" your id would be "orJSJGHjBLI"

/*------------------------------------------------------------------------------------*/

//In the following part you will have the text for about us, terms and conditions, cookie policy and the custom section on main
//In these sections you can include HTML tags too, just be careful pls.

//About us page
var config_aboutUs = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt aliquet eros in suscipit. Cras tristique molestie ligula, nec vestibulum nibh varius ut. Donec libero dui, lobortis sed porta non, consectetur eget felis. Nunc sollicitudin massa ex, ultrices convallis dolor fringilla vitae. Ut vestibulum id eros ac interdum. Quisque quis condimentum tortor, vel ornare sapien. Donec hendrerit, nunc euismod blandit tristique, ante mauris imperdiet purus, id auctor mauris nisl ac arcu. Nam fermentum libero metus, sed posuere dui pharetra sit amet. Nam accumsan, ante nec lobortis consectetur, velit mi consectetur mauris, eu sodales mauris ipsum nec diam. Nam rhoncus mi ut pretium lacinia. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla quis ipsum in quam aliquet aliquet. Donec augue lectus, pretium non malesuada at, euismod vel velit. Proin cursus diam id diam luctus blandit. Ut velit leo, rhoncus id aliquam at, cursus et dolor.
<br><br>
Nam nulla augue, malesuada a nulla accumsan, pulvinar tempor turpis. Vivamus aliquam nisl ac nisl consequat, et gravida est suscipit. Sed porta lacus at maximus elementum. Nunc at magna lacus. Nunc pellentesque luctus nisi, at mollis enim rutrum a. Praesent vel odio sed arcu tempus porttitor. Quisque quis faucibus diam.
<br><br>
Curabitur tincidunt augue quis nisl aliquet vulputate et venenatis lorem. Nunc eu pretium magna. Cras pulvinar elit risus, et congue nulla aliquet eget. Aliquam ac quam in erat auctor viverra ut ac orci. Cras quam neque, blandit ut mattis vel, gravida at elit. Duis semper purus nec ipsum sollicitudin efficitur. Donec commodo est lacus, consequat porta ligula porttitor sit amet. Donec varius risus ut eleifend accumsan. Aliquam feugiat nibh sit amet ante laoreet, et tincidunt nibh ornare.
`

//Terms and conditions page
var config_termsAndConditions = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt aliquet eros in suscipit. Cras tristique molestie ligula, nec vestibulum nibh varius ut. Donec libero dui, lobortis sed porta non, consectetur eget felis. Nunc sollicitudin massa ex, ultrices convallis dolor fringilla vitae. Ut vestibulum id eros ac interdum. Quisque quis condimentum tortor, vel ornare sapien. Donec hendrerit, nunc euismod blandit tristique, ante mauris imperdiet purus, id auctor mauris nisl ac arcu. Nam fermentum libero metus, sed posuere dui pharetra sit amet. Nam accumsan, ante nec lobortis consectetur, velit mi consectetur mauris, eu sodales mauris ipsum nec diam. Nam rhoncus mi ut pretium lacinia. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla quis ipsum in quam aliquet aliquet. Donec augue lectus, pretium non malesuada at, euismod vel velit. Proin cursus diam id diam luctus blandit. Ut velit leo, rhoncus id aliquam at, cursus et dolor.
<br><br>
Nam nulla augue, malesuada a nulla accumsan, pulvinar tempor turpis. Vivamus aliquam nisl ac nisl consequat, et gravida est suscipit. Sed porta lacus at maximus elementum. Nunc at magna lacus. Nunc pellentesque luctus nisi, at mollis enim rutrum a. Praesent vel odio sed arcu tempus porttitor. Quisque quis faucibus diam.
<br><br>
Curabitur tincidunt augue quis nisl aliquet vulputate et venenatis lorem. Nunc eu pretium magna. Cras pulvinar elit risus, et congue nulla aliquet eget. Aliquam ac quam in erat auctor viverra ut ac orci. Cras quam neque, blandit ut mattis vel, gravida at elit. Duis semper purus nec ipsum sollicitudin efficitur. Donec commodo est lacus, consequat porta ligula porttitor sit amet. Donec varius risus ut eleifend accumsan. Aliquam feugiat nibh sit amet ante laoreet, et tincidunt nibh ornare.
`

//Cookie Policy. Write what you want / have to. By default, the page doesn't use cookies.
var config_cookiePolicy = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt aliquet eros in suscipit. Cras tristique molestie ligula, nec vestibulum nibh varius ut. Donec libero dui, lobortis sed porta non, consectetur eget felis. Nunc sollicitudin massa ex, ultrices convallis dolor fringilla vitae. Ut vestibulum id eros ac interdum. Quisque quis condimentum tortor, vel ornare sapien. Donec hendrerit, nunc euismod blandit tristique, ante mauris imperdiet purus, id auctor mauris nisl ac arcu. Nam fermentum libero metus, sed posuere dui pharetra sit amet. Nam accumsan, ante nec lobortis consectetur, velit mi consectetur mauris, eu sodales mauris ipsum nec diam. Nam rhoncus mi ut pretium lacinia. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla quis ipsum in quam aliquet aliquet. Donec augue lectus, pretium non malesuada at, euismod vel velit. Proin cursus diam id diam luctus blandit. Ut velit leo, rhoncus id aliquam at, cursus et dolor.
<br><br>
Nam nulla augue, malesuada a nulla accumsan, pulvinar tempor turpis. Vivamus aliquam nisl ac nisl consequat, et gravida est suscipit. Sed porta lacus at maximus elementum. Nunc at magna lacus. Nunc pellentesque luctus nisi, at mollis enim rutrum a. Praesent vel odio sed arcu tempus porttitor. Quisque quis faucibus diam.
<br><br>
Curabitur tincidunt augue quis nisl aliquet vulputate et venenatis lorem. Nunc eu pretium magna. Cras pulvinar elit risus, et congue nulla aliquet eget. Aliquam ac quam in erat auctor viverra ut ac orci. Cras quam neque, blandit ut mattis vel, gravida at elit. Duis semper purus nec ipsum sollicitudin efficitur. Donec commodo est lacus, consequat porta ligula porttitor sit amet. Donec varius risus ut eleifend accumsan. Aliquam feugiat nibh sit amet ante laoreet, et tincidunt nibh ornare.
`

//Custom block section on main page
var config_custom = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt aliquet eros in suscipit. Cras tristique molestie ligula, nec vestibulum nibh varius ut. Donec libero dui, lobortis sed porta non, consectetur eget felis. Nunc sollicitudin massa ex, ultrices convallis dolor fringilla vitae. Ut vestibulum id eros ac interdum. Quisque quis condimentum tortor, vel ornare sapien. Donec hendrerit, nunc euismod blandit tristique, ante mauris imperdiet purus, id auctor mauris nisl ac arcu. Nam fermentum libero metus, sed posuere dui pharetra sit amet. Nam accumsan, ante nec lobortis consectetur, velit mi consectetur mauris, eu sodales mauris ipsum nec diam. Nam rhoncus mi ut pretium lacinia. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla quis ipsum in quam aliquet aliquet. Donec augue lectus, pretium non malesuada at, euismod vel velit. Proin cursus diam id diam luctus blandit. Ut velit leo, rhoncus id aliquam at, cursus et dolor.
<br><br>
Nam nulla augue, malesuada a nulla accumsan, pulvinar tempor turpis. Vivamus aliquam nisl ac nisl consequat, et gravida est suscipit. Sed porta lacus at maximus elementum. Nunc at magna lacus. Nunc pellentesque luctus nisi, at mollis enim rutrum a. Praesent vel odio sed arcu tempus porttitor. Quisque quis faucibus diam.
<br><br>
Curabitur tincidunt augue quis nisl aliquet vulputate et venenatis lorem. Nunc eu pretium magna. Cras pulvinar elit risus, et congue nulla aliquet eget. Aliquam ac quam in erat auctor viverra ut ac orci. Cras quam neque, blandit ut mattis vel, gravida at elit. Duis semper purus nec ipsum sollicitudin efficitur. Donec commodo est lacus, consequat porta ligula porttitor sit amet. Donec varius risus ut eleifend accumsan. Aliquam feugiat nibh sit amet ante laoreet, et tincidunt nibh ornare.
`