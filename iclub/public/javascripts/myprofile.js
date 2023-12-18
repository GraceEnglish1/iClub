const vueprofile = Vue.createApp({
mounted: function(){
this.getMemberships();
},
data() {
return {
user_permissions: 1,
has_account: false,
modalOpen: false,
reload: false,
user_id: 1,
type: 123,
isManager: false,
clubs: [
{
id: 0,
name: '',
short_bio: '',
long_bio: '',
image_reference: '',
club_type: 0,
image_alt: '',
updates_opt_in: false,
events_opt_in: false
}],
user: {
id: 0,
permissions: 1,
first_name: "",
last_name: "",
degree: 0,
degree_name: '',
year_level: 0,
image_reference: ""
},
degrees: [{
id: 0,
name: ''
}]
};
},
methods: {
get_has_account(){
let req = new XMLHttpRequest();
req.onreadystatechange = function(){
if(req.readyState === 4 && req.status === 200){
// do things
vueprofile.has_account = true;
}
};

// open connection
req.open("GET", "/users/has_account", true);

// send request
req.send();
},
getMemberships(){
let req = new XMLHttpRequest();
let responseConverted;
req.onreadystatechange = function(){
if(req.readyState === 4 && req.status === 200){
// do things
responseConverted = JSON.parse(req.response);
for(let i=0; i< responseConverted.length; i++){
vueprofile.clubs.push({
id: responseConverted[i].id,
name: responseConverted[i].name,
short_bio: responseConverted[i].short_bio,
image_reference: responseConverted[i].image_reference,
club_type: responseConverted[i].club_type_id,
image_alt: responseConverted[i].image_alt,
updates_opt_in: responseConverted[i].email_opt_in_updates,
events_opt_in: responseConverted[i].email_opt_in_events
});
}
vueprofile.clubs.shift();
}
};
// open connection
req.open("GET", "/users/memberships", true);
this.getProfile();
this.get_has_account();
// send request
req.send();
},
loadMyProfile(){
window.location.href = "http://localhost:8080/myprofile.html";
},
changeClub(id){
let req = new XMLHttpRequest();
req.onreadystatechange = function(){
if(req.readyState === 4 && req.status === 200){
// do things
}
};
// open connection
req.open("GET", "/session?clubID="+encodeURIComponent(id), true);
// send request
req.send();
},
loadClubSearch(){
window.location.href = "http://localhost:8080/club_info.html";
},
deleteMemberships(){
let req = new XMLHttpRequest();
let responseConverted;
req.onreadystatechange = function(){
if(req.readyState === 4 && req.status === 200){
// do things
responseConverted = JSON.parse(req.response);
for(let i=0; i< vueprofile.clubs.length; i++){
if(parseInt(vueprofile.clubs[i].id, 10) === parseInt(responseConverted, 10)){
vueprofile.clubs.splice(i,1);
}

}
}
};
// open connection
req.open("DELETE", "/users/memberships", true);
// send request
req.send();
},
setUpdatesOptin(updates_opt_in){
let req = new XMLHttpRequest();
let responseConverted;
req.onreadystatechange = function(){
if(req.readyState === 4 && req.status === 200){
// do things
responseConverted = req.response;
for(let i=0; i< vueprofile.clubs.length; i++){
if(parseInt(vueprofile.clubs[i].id, 10) === parseInt(responseConverted, 10)){
vueprofile.clubs[i].updates_opt_in = updates_opt_in;
}
}
}
};
// open connection
req.open("GET", "/users/setupdatesoptin?updates_optin="+encodeURIComponent(updates_opt_in), true);
// send request
req.send();
},
setEventsOptin(events_opt_in){
let req = new XMLHttpRequest();
let responseConverted;
req.onreadystatechange = function(){
if(req.readyState === 4 && req.status === 200){
// do things
responseConverted = req.response;
for(let i=0; i< vueprofile.clubs.length; i++){
if(parseInt(vueprofile.clubs[i].id, 10) === parseInt(responseConverted, 10)){
vueprofile.clubs[i].events_opt_in = events_opt_in;
}
}
}
};
// open connection
req.open("GET", "/users/seteventsoptin?updates_optin="+encodeURIComponent(events_opt_in), true);
// send request
req.send();
},
getDegrees(){
let req = new XMLHttpRequest();
let responseConverted;
req.onreadystatechange = function(){
if(req.readyState === 4 && req.status === 200){
// do things
responseConverted = JSON.parse(req.response);
for(let i=0; i< responseConverted.length; i++){
vueprofile.degrees.push({
id: responseConverted[i].id,
name: responseConverted[i].description
});
}
vueprofile.degrees.shift();
}
};

// open connection
req.open("GET", "/degrees", true);

// send request
req.send();
},
getProfile(){
let req = new XMLHttpRequest();
let responseConverted;
req.onreadystatechange = function(){
if(req.readyState === 4 && req.status === 200){
// do things
responseConverted = JSON.parse(req.response);
vueprofile.user.id = responseConverted[0].id;
vueprofile.user.permissions = responseConverted[0].permissions;
vueprofile.user.first_name = responseConverted[0].first_name;
vueprofile.user.last_name = responseConverted[0].last_name;
vueprofile.user.degree = responseConverted[0].degree;
vueprofile.user.degree_name = responseConverted[0].description;
vueprofile.user.year_level = responseConverted[0].year_level;
}
};

// open connection
req.open("GET", "/users/profile", true);

// send request
req.send();
},
updateProfile(){
let req = new XMLHttpRequest();
// open connection
req.open("POST", "/users/profile", true);
req.setRequestHeader("Content-Type", "application/json");
// send request
req.send(JSON.stringify({
first_name: vueprofile.user.first_name,
last_name: vueprofile.user.last_name,
degree: vueprofile.user.degree,
year_level: vueprofile.user.year_level

}));
}

}
}).mount('#profile');
