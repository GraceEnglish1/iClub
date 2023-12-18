const vueadmin = Vue.createApp({
    mounted: function(){
      this.getAllClubs();
    },
    data() {
        return {
        user_permissions: 1,
        showUsers: true,
        showClubs: false,
        user_id: 1,
        type: 123,
        isManager: false,
        isAdmin: false,
        has_account: false,
        clubs: [
          {
          id: 0,
          name: '',
          short_bio: '',
          long_bio: '',
          image_reference: '',
          club_type: 0,
          image_alt: ''
        }],
        users: [{
          id: 0,
          permissions: 0,
          first_name: "",
          last_name: ""
        }]
        };
      },
      methods: {
        get_has_account(){
          let req = new XMLHttpRequest();
          req.onreadystatechange = function(){
          if(req.readyState === 4 && req.status === 200){
          // do things
          vueadmin.has_account = true;
          }
          };

          // open connection
          req.open("GET", "/users/has_account", true);

          // send request
          req.send();
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
              vueadmin.clubs.push({
                id: responseConverted[i].id,
                name: responseConverted[i].name,
                short_bio: responseConverted[i].short_bio,
                image_reference: responseConverted[i].image_reference,
                club_type: responseConverted[i].club_type_id,
                image_alt: responseConverted[i].image_alt
                });
            }
            vueadmin.clubs.shift();
            }
          };
          // open connection
          req.open("GET", "/allclubs", true);
          this.getAllUsers();
          this.get_has_account();
          // send request
          req.send();
          },
          getAllUsers(){
            // this.showsClubs = false;
            let req = new XMLHttpRequest();
            let responseConverted;
            req.onreadystatechange = function(){
            if(req.readyState === 4 && req.status === 200){
            // do things
            vueadmin.isAdmin = true;
              responseConverted = JSON.parse(req.response);
              for(let i=0; i< responseConverted.length; i++){
                vueadmin.users.push({
                  id: responseConverted[i].id,
                  permissions: responseConverted[i].permissions,
                  first_name: responseConverted[i].first_name,
                  last_name: responseConverted[i].last_name
                  });
              }
              vueadmin.users.shift();
              }
            };
            // open connection
            req.open("GET", "/admin/allusers", true);
            // send request
            req.send();
            },
          loadClubSearch(){
            window.location.href = "http://localhost:8080/club_info.html";
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
        deleteClubs(params){
          let req = new XMLHttpRequest();
          let responseConverted;
          req.onreadystatechange = function(){
          if(req.readyState === 4 && req.status === 200){
          // do things
          responseConverted = req.response;
          for(let i=0; i< vueadmin.clubs.length; i++){
          if(parseInt(vueadmin.clubs[i].id, 10) === parseInt(responseConverted, 10)){
            vueadmin.clubs.splice(i, 1);
          }
          }
          }
          };
          // open connection
          req.open("DELETE", "/admin/deleteclub", true);
          // send request
          req.send(params);
          },
          setPermissions(person_id, permissions){
          let req = new XMLHttpRequest();
          let responseConverted;
          req.onreadystatechange = function(){
          if(req.readyState === 4 && req.status === 200){
          // do things
          responseConverted = req.response;
          for(let i=0; i< vueadmin.users.length; i++){
          if(parseInt(vueadmin.users[i].id, 10) === parseInt(responseConverted, 10)){
            vueadmin.users[responseConverted-1].permissions = permissions;
          }
          }
          }
          };
          // open connection
          req.open("GET", "/admin/setpermissions?permissions="+encodeURIComponent(permissions)+"&person_id="+encodeURIComponent(person_id), true);
          // send request
          req.send();
          },
          deleteUser(params){
            let req = new XMLHttpRequest();
            let responseConverted;
            req.onreadystatechange = function(){
            if(req.readyState === 4 && req.status === 200){
            // do things
            responseConverted = req.response;
            for(let i=0; i< vueadmin.users.length; i++){
            if(parseInt(vueadmin.users[i].id, 10) === parseInt(responseConverted, 10)){
              vueadmin.users.splice(i, 1);
            }
            }
            }
            };
            // open connection
            req.open("DELETE", "/admin/deleteuser?person_id="+encodeURIComponent(params), true);
            // send request
            req.send(params);
            }
  }
}).mount('#admin');


