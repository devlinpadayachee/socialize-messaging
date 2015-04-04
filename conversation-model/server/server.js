ConversationsCollection.allow({
    insert:function (userId) {
        //allow all insertions and let Collection2 and SimpleSchema take care of security
        return userId && true;
    }
});

//Add the creator of the collection as a participant on the conversation
ConversationsCollection.after.insert(function(userId, document){
    ParticipantsCollection.insert({conversationId:document._id, read:true});
});

//When we delete a conversation, clean up the participants and messages that belong to the conversation
ConversationsCollection.after.remove(function(userId, document){
    ParticipantsCollection.remove({conversationId:document._id});
    MessagesCollection.remove({conversationId:document._id});
});