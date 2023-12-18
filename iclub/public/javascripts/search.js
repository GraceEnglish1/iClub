const vueinst = Vue.createApp({
    mounted: function(){
      this.getAllClubs();
    },
    data() {
        return {
        user_permissions: 1,
        has_account: false,
        type: 123,
        clubs: [
          {
          id: 0,
          name: '',
          short_bio: '',
          long_bio: '',
          image_reference: '',
          club_type: 0,
          image_alt: ''
        }]
        };
      },
      methods: {
        get_has_account(){
          let req = new XMLHttpRequest();
          req.onreadystatechange = function(){
          if(req.readyState === 4 && req.status === 200){
          // do things
          vueinst.has_account = true;
          }
          };
          // open connection
          req.open("GET", "/users/has_account", true);
          // send request
          req.send();
          },
        getClubs(params){
          let req = new XMLHttpRequest();
          let responseConverted;
          req.onreadystatechange = function(){
          if(req.readyState === 4 && req.status === 200){
          // do things
            responseConverted = JSON.parse(req.response);
            for(let i=0; i< vueinst.clubs.length; i++){
                vueinst.clubs.splice(i);
            }
            for(let i=0; i< responseConverted.length; i++){
              vueinst.clubs.push({
                id: responseConverted[i].id,
                name: responseConverted[i].name,
                short_bio: responseConverted[i].short_bio,
                image_reference: responseConverted[i].image_reference,
                club_type: responseConverted[i].club_type_id,
                image_alt: responseConverted[i].image_alt
                });
            }
            }
          };
          // open connection
          req.open("GET", "/clubs?type="+encodeURIComponent(params), true);
          // send request
          req.send(params);
          },
        loadClubSearch(){
          window.location.href = "http://localhost:8080/clubs.html";
          vueinst.type = 1;
          this.getClubs(1);
        },
        getAllClubs(){
          // this.showsClubs = false;
          let req = new XMLHttpRequest();
          let responseConverted;
          req.onreadystatechange = function(){
          if(req.readyState === 4 && req.status === 200){
          // do things
            responseConverted = JSON.parse(req.response);
            for(let i=0; i< responseConverted.length; i++){
              vueinst.clubs.push({
                id: responseConverted[i].id,
                name: responseConverted[i].name,
                short_bio: responseConverted[i].short_bio,
                image_reference: responseConverted[i].image_reference,
                club_type: responseConverted[i].club_type_id,
                image_alt: responseConverted[i].image_alt
                });
            }
            vueinst.clubs.shift();
            }
          };
          // open connection
          req.open("GET", "/allclubs", true);
          this.get_has_account();
          // send request
          req.send();
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
        }
  }
}).mount('#app');


