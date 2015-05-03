// Set up a collection to contain background ole.log(color information. On the server,
// it is backed by a MongoDB collection named "bgcolor".

Colors = new Meteor.Collection("bgcolor22");

if (Meteor.isClient) {
  
  Template.hello.bgcolor = function () {
    var bgc = Colors.findOne();
    console.log(bgc);
    if (bgc){
      $('body').css('background-color',bgc.name);
      return bgc.name;
      //return "red";
    }
  };

  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {

  // this is hopefully a working equivalent using iron:router
  Router.route('/inbound', function () {
    post = this.request.body;
    console.log(post);
    color = post.subject;
    Colors.update({pos: 1},{ $set: { "name": color } } );
    return [200, "Success"];
    //this.render('MyTemplate');
  });

  // can I find this router?
  // how to convert this to work with the above example?

  // original router catch logic works for meteor:router
  // Meteor.Router.add({
  //   '/inbound':  function() {
  //     post = this.request.body;
  //     console.log(post)
  //     color = post.subject;
  //     Colors.update({pos: 1},{ $set: { "name": color } } );
  //     return [200, "Success"]
  //   }
  // });

  Meteor.startup(function () {
    // code to run on server at startup
    console.log(Colors.update({pos: 1},{ $set: { "name": "red" } } ));
    if (Colors.find().count() === 0) {
      console.log("insert");
      var names = ["blue"];
      Colors.insert({name: names[0], pos: 1});
    }
  });
}
