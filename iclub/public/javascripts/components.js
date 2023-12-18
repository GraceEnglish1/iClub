const vueinst = Vue.createApp({
    mounted: function(){
      this.getClubInfo();
    },
    data() {
        return {
        user_permissions: 1,
        modalOpen: false,
        updateModalOpen: false,
        has_account: false,
        user_id: 0,
        user_email: 'test@test.com',
        type: 123,
        isManager: false,
        isJoined: false,
        ready: false,
        events_email_list: [],
        updates_email_list: [],
        members: [{
          id: 0,
          first_name: '',
          last_name: '',
          events_opt_in: false,
          updates_opt_in: false,
          email: ''
        }],
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
        clubs_info: [
          {
          id: 100,
          name: '',
          short_bio: '',
          long_bio: '',
          image_reference: '',
          club_type: 0,
          image_alt: ''
        }],
        club_data: {
          name: '',
          short_bio: '',
          image_reference: ''
        },
        events: [
          {
          id: 0,
          post_type_id: 0,
          club_id: 0,
          title: 'Test',
          post_date: '',
          content: '',
          author_id: 0,
          visibility_id: 0,
          rsvp: false,
          can_view: false,
          rsvpListString: ' ',
          rsvpList: [{ person_id: 0, person_first_name: '', person_last_name: '' }]
        }],
        newEvent:
          {
          id: 0,
          post_type_id: 0,
          club_id: 0,
          title: '',
          post_date: '',
          content: '',
          author_id: 0,
          visibility_id: 0,
          rsvp: false,
          rsvpList: [{ person_id: 0, person_name: '' }]
        },
        updates: [
          {
          id: 0,
          post_type_id: 0,
          club_id: 0,
          title: 'Test',
          post_date: '',
          content: '',
          author_id: 0,
          visibility_id: 0,
          can_view: false
        }],
        newUpdate:
          {
          id: 0,
          post_type_id: 0,
          club_id: 0,
          title: '',
          post_date: '',
          content: '',
          author_id: 0,
          visibility_id: 0
        }
        };
      },
      methods: {
        loadClubInfo(){
          window.location.href = "http://localhost:8080/club_info.html";
        },
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
        getEvents(){
          this.isJoinedFunction();
          let req = new XMLHttpRequest();
          let responseConverted;
          req.onreadystatechange = function(){
          if(req.readyState === 4 && req.status === 200){
          // do things
            responseConverted = JSON.parse(req.response);
            for(let i=1; i< vueinst.events.length; i++){
                vueinst.events.splice(i);
            }
            let view = false;
            let date;
            for(let i=0; i< responseConverted.length; i++){
              if(responseConverted[i].visibility_id === 1){
                view = true;
              } else if(vueinst.isJoined === true){
                view = true;
              } else if(vueinst.isJoined !== true){
                view = false;
              }
              date = responseConverted[i].post_date.substring(0, responseConverted[i].post_date.indexOf('T'));
              vueinst.events.push({
                id: responseConverted[i].id,
                post_type_id: responseConverted[i].post_type_id,
                club_id: responseConverted[i].club_id,
                title: responseConverted[i].title,
                post_date: date,
                content: responseConverted[i].content,
                author_id: responseConverted[i].author_id,
                visibility_id: responseConverted[i].visibility_id,
                rsvp: false,
                can_view: view,
                rsvpListString: '',
                rsvpList: ({
                  person_first_name: '',
                  person_last_name: ''
                })
              });
            }
            vueinst.events.shift();
            }
          };
          // open connection
          req.open("GET", "/events", true);
          this.getRsvps(this.user_id);
          // send request
          req.send();
          },
          getUpdates(){
            let req = new XMLHttpRequest();
            let responseConverted;
            req.onreadystatechange = function(){
            if(req.readyState === 4 && req.status === 200){
            // do things
              let date;
              // date = new Date();
              responseConverted = JSON.parse(req.response);
              let view = false;
              for(let i=0; i< responseConverted.length; i++){
                if(responseConverted[i].visibility_id === 1){
                  view = true;
                } else if(vueinst.isJoined === true){
                  view = true;
                }
                vueinst.updates.push({
                  id: responseConverted[i].id,
                  post_type_id: responseConverted[i].post_type_id,
                  club_id: responseConverted[i].club_id,
                  title: responseConverted[i].title,
                  post_date: date,
                  content: responseConverted[i].content,
                  author_id: responseConverted[i].author_id,
                  visibility_id: responseConverted[i].visibility_id,
                  can_view: view
                });
              }
              vueinst.updates.shift();
              }
            };
            // open connection
            req.open("GET", "/updates?is_joined="+encodeURIComponent(this.isJoined), true);
            // send request
            req.send();
            },
      rsvp(post_id){
      let req = new XMLHttpRequest();
      req.onreadystatechange = function(){
      if(req.readyState === 4 && req.status === 200){
      // do things
        for(let i=0; i< vueinst.events.length; i++){
          if(vueinst.events[i].id === post_id) {
            vueinst.events[i].rsvp= true;
          }
        }
        }
      };
      // open connection
      req.open("GET", "/users/rsvp?post_id="+encodeURIComponent(post_id), true);
      // send request
      req.send(JSON.stringify({ post_id: post_id }));
      },
      getRsvps(){
        let req = new XMLHttpRequest();
        let responseConverted;
        req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
        // do things
          responseConverted = JSON.parse(req.response);
          for(let i=0; i< vueinst.events.length; i++){
            for(let j=0; j<responseConverted.length; j++){
              if(vueinst.events[i].id === responseConverted[j].post_id
               ) {
                vueinst.events[i].rsvp= true;
              }
            }
          }
          }
        };
        // open connection
        req.open("GET", "/users/getrsvps", true);
        // send request
        req.send();
      },
      getClubInfo() {
        let req = new XMLHttpRequest();
        let responseConverted;
        req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
        // do things
          responseConverted = JSON.parse(req.response);
          for(let i=1; i< vueinst.clubs_info.length-1; i++){
            vueinst.clubs_info.shift();
          }
          for(let i=0; i< responseConverted.length; i++){
            vueinst.clubs_info.push({
              id: responseConverted[i].id,
              name: responseConverted[i].name,
              short_bio: responseConverted[i].short_bio,
              long_bio: responseConverted[i].long_bio,
              image_reference: responseConverted[i].image_reference,
              club_type: responseConverted[i].club_type_id,
              image_alt: responseConverted[i].image_alt
              });
          }
          vueinst.clubs_info.shift();
          }
        };
        // open connection
        req.open("GET", "/club_info", true);
        this.isJoinedFunction();
        this.getEvents();
        this.getRsvps();
        this.getUpdates();
        this.isManagerFunction();
        this.getGuestList();
        this.getMembers();
        this.get_has_account();
        // this.getPermissions();

        // send request
        req.send();
      },
      getMembers() {
        let req = new XMLHttpRequest();
        let responseConverted;
        req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
        // do things
          responseConverted = JSON.parse(req.response);
          for(let i=0; i< responseConverted.length; i++){
            vueinst.members.push({
              id: responseConverted[i].id,
              first_name: responseConverted[i].first_name,
              last_name: responseConverted[i].last_name,
              events_opt_in: responseConverted[i].email_opt_in_events,
              updates_opt_in: responseConverted[i].email_opt_in_updates,
              email: responseConverted[i].email
            });
            if(responseConverted[i].email_opt_in_events === 1){
              vueinst.events_email_list.push(responseConverted[i].email);
            }
            if(responseConverted[i].email_opt_in_updates === 1){
              vueinst.updates_email_list.push(responseConverted[i].email);
            }
          }
          vueinst.members.shift();
          }
        };
        // open connection
        req.open("GET", "/users/getmembers", true);

        // send request
        req.send();
      },
      isManagerFunction() {
        let req = new XMLHttpRequest();
        let responseConverted;
        req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
        // do things
        if(req.response !== undefined){
          responseConverted = JSON.parse(req.response);
          vueinst.isManager = responseConverted.isManager;
          }
        }
        };
        // open connection
        req.open("GET", "/users/ismanager", true);
        // send request

        req.send();
      },
      isJoinedFunction() {
        let req = new XMLHttpRequest();
        let responseConverted;
        req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
        // do things
          responseConverted = JSON.parse(req.response);
          if(responseConverted !== false){
            vueinst.isJoined = true;
          }
          }
        };
        // open connection
        req.open("GET", "/users/isjoined", true);
        // send request

        req.send();
      },
      joinClub(){
        let req = new XMLHttpRequest();
        // let responseConverted;
        req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
        // do things
          vueinst.isJoined = true;
          }
        };
        req.open("GET", "/users/joinclub", true);

        // send request
        req.send();
    },
      createEvents(){
        // this.modalOpen = false;
        let title = JSON.parse(JSON.stringify(this.newEvent.title));
        let content = JSON.parse(JSON.stringify(this.newEvent.content));
        let visibility_id = JSON.parse(JSON.stringify(this.newEvent.visibility_id));
        let date = JSON.parse(JSON.stringify(this.newEvent.post_date));
        let req = new XMLHttpRequest();

        this.events.push({
          title: title,
          post_date: date,
          content: content,
          visibility_id: visibility_id,
          post_type_id: 1
        });

        // let responseConverted;
        req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
        // do things
      }
    };
    req.open("POST", "/users/addevent", true);
    req.setRequestHeader("Content-Type", "application/json");
        // send request
        req.send(JSON.stringify({
          title: vueinst.newEvent.title,
          content: vueinst.newEvent.content,
          post_date: vueinst.newEvent.post_date,
          visibility_id: vueinst.newEvent.visibility_id
          }));
    },
    createUpdates(){
      let req = new XMLHttpRequest();

      // let responseConverted;
      req.onreadystatechange = function(){
      if(req.readyState === 4 && req.status === 200){
      // do things
      }
      };
      req.open("POST", "/users/addupdate", true);
      req.setRequestHeader("Content-Type", "application/json");
          // send request
          req.send(JSON.stringify({
            title: vueinst.newUpdate.title,
            content: vueinst.newUpdate.content,
            visibility_id: vueinst.newUpdate.visibility_id
            }));

  },
  getGuestList(){
    let req = new XMLHttpRequest();
    let responseConverted;
    req.onreadystatechange = function(){
    if(req.readyState === 4 && req.status === 200){
    // do things
      responseConverted = JSON.parse(req.response);
      for(let i=0; i< responseConverted.length; i++){
        for(let j=0; j< vueinst.events.length; j++){
          if(vueinst.events[j].id === responseConverted[i].post_id){
            vueinst.events[j].rsvpListString += responseConverted[i].first_name + " "
              + responseConverted[i].last_name + " | ";
          }
        }
      }
      }
    };
    // open connection
    req.open("GET", "/users/guestlist", true);
    // send request
    this.getRsvps();
    req.send();
    },
    sendEmail(title_input, date_input, content_input, post_type_id){
      let req = new XMLHttpRequest();
      // open connection
      req.open("POST", "/users/email", true);
      req.setRequestHeader("Content-Type", "application/json");
      let recipientList;
      if(post_type_id === 1){
        recipientList = this.events_email_list;
      } else {
        recipientList = this.updates_email_list;
      }
      // send request
      req.send(JSON.stringify({
      recipient: recipientList,
      subject: 'Notification from ' + this.clubs_info[0].name,
      text: {
        title: title_input,
        date: date_input,
        content: content_input
      }
        }));
      }
  }
}).mount('#app');


