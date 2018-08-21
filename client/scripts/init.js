$(document).ready(function() {

    $('.addComment').on('click', function(event) {
        

        let message = {};
        message.username = window.location.search.split("=")[1];
        message.text = document.getElementById("textbox").value;
        message.roomname = window.roomName;


        
        console.log(message)
        app.send(message);
    }) 

    $('.roomSelect').on('change', function() {
        var selectedEventType = $(this).val();
        $('#chats div').removeClass('hidden');
        $('#chats div').addClass('hidden');
        $(`.${selectedEventType}`).removeClass('hidden');
        console.log(typeof selectedEventType)
        window.roomName = $(this).val();
    })

    // $('.p').on('click', function(event){
    //     alert('u clicked me1');
    // })
})