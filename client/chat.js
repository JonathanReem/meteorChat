Meteor.Router.add({
	'/': 'home',
	'/rooms/:id': function(id) {
		Session.set('currentRoomId', id);
		return 'room'
	}
})

Template.rooms.helpers({
	rooms: function() { return Rooms.find(); }
});

Template.rooms.events({
	"click #add_room":function(event, template){
		room_name = document.getElementById('new_room_name');
		new_room = {name: room_name.value, members: 0, last_activity: 'Never'};
		Rooms.insert(new_room);
	}
});

Template.room.helpers({
  room: function() { 
  	return Rooms.findOne(Session.get('currentRoomId')); 
  }
});

Template.room.events({
	"submit form":function(event, template) {
		cur_room = Rooms.findOne(Session.get('currentRoomId'), {reactive: false});
		message = document.getElementById('new_message').value;
		message_author = Session.get("username");
		Rooms.update( 
					{_id:Session.get("currentRoomId")},
					{ $push: { messages: 
						{author: message_author, text: message} 
					} }
		);
	}
});

Template.user_info.helpers({
	username: function() { return Session.get("username"); }
});

Template.user_info.events({
	"keydown #username_input":function(event, template){
		if(event.which == 13){
			var username = document.getElementById("username_input").value;
			Session.set("username", username);
		}
	}
});