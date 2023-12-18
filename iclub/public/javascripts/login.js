const vuelogin = Vue.createApp({
    data() {
        return {
        email: '',
        pass: '',
        signing_up: false,
        signed_up: false,
        loggedin: false,
        new_user: {
          permissions: 0,
          first_name: "",
          last_name: "",
          pass: '',
          email: '',
          degree: 1,
          year_level: 1
        },
        degrees: [{
          id: 0,
          name: ''
          }]
        };
      },
      methods: {
      login(){
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
        req.send(JSON.stringify({
        user_email: this.email,
        pass: this.pass
        }));
      },
      getDegrees(){
        let req = new XMLHttpRequest();
        let responseConverted;
        req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
        // do things
        responseConverted = JSON.parse(req.response);
        for(let i=0; i< responseConverted.length; i++){
        vuelogin.degrees.push({
        id: responseConverted[i].id,
        name: responseConverted[i].description
        });
        }
        vuelogin.degrees.shift();
        }
        };

        // open connection
        req.open("GET", "/degrees", true);

        // send request
        req.send();
        },
        signup(){
          let req = new XMLHttpRequest();
          // open connection
          req.open("POST", "/signup", true);
          req.setRequestHeader("Content-Type", "application/json");

          // send request
          req.send(JSON.stringify({
            permissions: this.new_user.permissions,
            first_name: this.new_user.first_name,
            last_name: this.new_user.last_name,
            pass: this.new_user.pass,
            email: this.new_user.email,
            degree: this.new_user.degree,
            year_level: this.new_user.year_level
            }));
        },
        loadHomePage(){
          window.location.href = "http://localhost:8080/home.html";
        }
  }
}).mount('#login');


