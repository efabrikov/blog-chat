(function()
    {
	var Chat = {

	    /**
		 * initialization
		 *
		 * @return {void}
		 * @access public
		 */
	    init : function()
	    {
		//this._logger('init() called', 'info');
		this.changeBlockPosition();
		
		setInterval((function(oClass){
		    return function() {
			oClass.updateMessages();
		    }
		})(this),5000);
			
		this.updateMessages();
			
		this._registerEvents();

	    },
		

	    /**
		 * register Chat events
		 *
		 * @return {void}
		 * @access private
		 */
	    _registerEvents : function()
	    {	
		var fSentMessage = (function() {
		    var m = $('#Message_content').val();
		    if (m && m.length<100) {
			Chat.onSend(m);			
		    }    
		});
		// bind send button event
		$('#sendMessageButton').click(fSentMessage);
			
		$('#Message_content').keyup(function(event){
		    if(event.keyCode==13){			
			fSentMessage();
		    }
		});
		
		$('#chat_block').click(function(e) {
		    var mouseX = Chat.getMousePos(e)[0];		    
		    var l = $('#chat_block').offset().left;
		    
		    if (mouseX - l < 25) {
			if ($('#chat_block').width()) {
			    $('#chat_block').animate({
			    'width':"0",
			    'left':l+500
			    }, "slow");			
			}
			else {
			    $('#chat_block').animate({
			    'width':"500",
			    'left':l-500
			    }, "slow");			
			}
		    }
		});    

		
	    },

	    onSend : function(message) {
			
		var oPostData = {};
		oPostData['content'] = message;			

		//Loader.show();

		$.post(

		    $("#sendMessageButton").attr('addMessageUrl'),

		    {
			Message:oPostData
		    },

		    function(data)
		    {
				
			if (data && data['status'] == 'success') {			    
			    Chat.updateMessages();
			}
		    },

		    'json'
		    );
			
		$('#Message_content').val('');
			
	    },
		
	    updateMessages : function() {		
		$.get(

		    $("#sendMessageButton").attr('getMessagesUrl'),

		    {},

		    function(data)				{

			if (data && data['status'] == 'success') {
			    Chat.addMessages(data['lastMessages']);
			}
		    },

		    'json'
		    );
	    },
		
	    addMessages : function(oMessages) {		    
		var m = null;
		var line =  '';
		    
		$('#chatLines').html('');    			
		    
		for(var i in oMessages){
		    m = oMessages[i];
		    line = m.date + ' <b>' + m.username + '</b> ' + m.content + '<br>';
		    $('#chatLines').prepend(line);    			
		}
		    
	    },
	    
	    changeBlockPosition : function() {
		var l = $('.container').offset().left + $('.container').width()-25;    
		
		$('#chat_block').css('left',l+'px')

	    },
	    
	    getMousePos : function(e) {
		e = e || window.event
		var html = document.documentElement
		var body = document.body
		var sLeft = (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
		var sTop = (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
		if (e.pageX == null && e.clientX != null) {
		    e.pageX = e.clientX + sLeft
		    e.pageY = e.clientY + sTop
		}
		return  [e.pageX,e.pageY,sLeft,sTop] 
	    },
	
	    onMouseDown : function(e) {
		//avoid second click
		if (Circle.callsCount != 0 ) return;

		var canvasPosition = $(this).offset();
		//var mouseX = e.layerX || 0;
		//var mouseY = e.layerY || 0;	

		var mouseX = Circle.getMousePos(e)[0];
		var mouseY = Circle.getMousePos(e)[1];}

		
	};
	
	$(document).ready(function() {
	    Chat.init();
	});
	
    })();



