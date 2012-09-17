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
		
		$('#chat_block').click(function() {
		    if ($('#chat_block').width()) {
			$('#chat_block').animate({
			'width':"0"
			}, "slow");			
		    }
		    else {
			$('#chat_block').animate({
			'width':"500",
			'left':$('#chat_block').offset().left-500
			}, "slow");			
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
		    
	    },
	    
	    changeBlockPosition : function() {
		var l = $('.container').offset().left + $('.container').width()-25;    
		
		$('#chat_block').css('left',l+'px')

	    }

		
	};
	
	$(document).ready(function() {
	    Chat.init();
	});
	
    })();



