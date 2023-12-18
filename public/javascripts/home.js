const vuehome = Vue.createApp({
    mounted: function(){
      this.get_has_account();
    },
    data() {
        return {
        user_permissions: 1,
        has_account: false
        };
      },
      methods: {
        get_has_account(){
          let req = new XMLHttpRequest();
          req.onreadystatechange = function(){
          if(req.readyState === 4 && req.status === 200){
          // do things
          vuehome.has_account = true;
          }
          };

          // open connection
          req.open("GET", "/users/has_account", true);

          // send request
          req.send();
          },
        loadClubSearch(){
          window.location.href = "http://localhost:8080/clubs.html";
        }
  }
}).mount('#home');


