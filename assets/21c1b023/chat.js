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
		
		$('#chat_block').click(function() {
		    if ($('#chat_block').width()) {
			$('#chat_block').animate({
			'width':"0"
			}, "slow");
			$('#chat_block').css('background','white url(right.jpg) scroll no-repeat left top');
		    }
		    else {
			$('#chat_block').animate({
			'width':"300"
			}, "slow");
			$('#chat_block').css('background','white url(left.jpg) scroll no-repeat left top');
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
		    
	    }

		
	};
	
	$(document).ready(function() {
	    Chat.init();
	});
	
    })();



