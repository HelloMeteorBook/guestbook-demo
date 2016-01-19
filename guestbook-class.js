Messages = new Mongo.Collection('messages');

if (Meteor.isClient) {
    Meteor.subscribe("messages");
    
    Template.guestBook.helpers({
      'messages':function() {
        return Messages.find({}, {sort: {createdOn: -1}} ) || {};
      }
    });
    
    Template.guestBook.events({
        'submit form': function(event) {
            event.preventDefault();

            var messageBox = $(event.target).find('textarea[name=guestBookMessage]');
            var messageText = messageBox.val();

            var nameBox = $(event.target).find('input[name=guestName]');
            var name = nameBox.val();
            
            Messages.insert({message: messageText, name: name, createdOn: Date.now() });
            
            messageBox.val('');
            nameBox.val('');
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        // code to run on server at startup
    });
  Meteor.publish("messages", function () {
    return Messages.find();
  });
}
