function google_login(response){
let req = new XMLHttpRequest();
req.onreadystatechange = function(){
if(req.readyState === 4 && req.status === 200){
// do things
vuelogin.loggedin = true;
}
  };
// open connection
req.open("POST", "/login", true);
req.setRequestHeader("Content-Type", "application/json");

// send request
req.send(JSON.stringify(response));
}
