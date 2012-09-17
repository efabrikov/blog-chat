<!--chat::begin-->
<div id="chat_block">
<div id="chatLines"></div>

<div class="sendBlock">    
    
    <input type="text" id="Message_content" name="Message[content]" maxlength="100" size="60">    
    
    
    <input type="button" value="send" id="sendMessageButton" 
	    getMessagesUrl="<?= Yii::app()->createUrl('/chat/admin/getMessages');?>"
	    addMessageUrl="<?= Yii::app()->createUrl('/chat/admin/createAjax');?>"
	    >    

</div>
</div>

<?php
    $assetUrl = Yii::app()->getAssetManager()->publish(Yii::getPathOfAlias('application.modules.chat.components.views.assets'));
    Yii::app()->clientScript->registerScriptFile($assetUrl.'/chat.js');     
    Yii::app()->clientScript->registerCssFile($assetUrl.'/chat.css');     
?>
<!--chat:end-->