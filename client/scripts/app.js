// YOUR CODE HERE:
// var app = {
//     'init' : function() {}

// };


var App = function () {
    this.server = 'http://127.0.0.1:3000';
    this.init();
};

App.prototype.init = function () {
    this.fetch();
};

App.prototype.send = function (message) {
    let that = this;
    $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: that.server,
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
            console.log('chatterbox: Message sent');
        },
        error: function (data) {
            // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
            console.error('chatterbox: Failed to send message', data);
        }
    });
};

App.prototype.fetch = function () {
    let that = this;
    let roomName = {};
    $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'http://127.0.0.1:3000',
        type: 'GET',
        data: { order: '-createdAt' },
        success: function (data) {

            console.log('chatterbox: Message sent')
            console.log(data['results'])
            for (let i = 0; i < data['results'].length; i++) {
                that.renderMessage(data['results'][i]);
                if (!roomName[data['results'][i]['roomname']]) {
                    roomName[data['results'][i]['roomname']] = true;
                    that.renderRoom(data['results'][i])
                }
            }

        },
        error: function (data) {
            // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
            console.error('chatterbox: Failed to send message', data);
        }


    });


    // $.get(that.server, function(data) {
    //     // data['results'] = data['results'].sort(function(x,y) {
    //     //     return x.createdAt - y.createdAt;
    //     // });


};

App.prototype.clearMessages = function () {
    $('#chats').empty();
};

App.prototype.renderMessage = function (message) {
    var node = document.createElement('div')
    var newContent = document.createTextNode(message['text']);
    var aEle = document.createElement('p')
    var user = document.createTextNode(message['username'])
    aEle.appendChild(user);
    node.appendChild(aEle);
    node.appendChild(document.createElement('br'));
    node.appendChild(newContent);
    node.setAttribute('class', `${message['roomname']} chats ${message['username']}`)
    $(node).data(message);
    $(node).on('click', function(event) {
       $('.' + message['username']).addClass('friend');
       console.log(message['username'])
    })
    $('#chats').append(node);
};

App.prototype.renderRoom = function (roomName) {
    var node = document.createElement('option')
    $(node).val(roomName['roomname'])
    var newContent = document.createTextNode(roomName['roomname'])
    node.appendChild(newContent)
    node.setAttribute('class', 'roomName')
    // $(node).change(function () {
    //     console.log('blaah')
    // })

    $('#roomSelect').append(node);
};

// App.prototype.handleUsernameClick = function(friend) {
//     friend.addClass('.friend')
// }

var app = new App();