document.addEventListener('DOMContentLoaded', function() {
	$('#restoreInputDataBtn').on( "click", function() {
		SendMessageToMainScript('restoreInputDataBtnClicked');
	} );

	$('#clearSavedInputDataBtn').on( "click", function() {
		SendMessageToMainScript('clearSavedInputDataBtn');
	} );


	function SendMessageToMainScript(messageForMainScript)
	{
		// Send message to content script
		chrome.tabs.query(
			{active: true, currentWindow: true},
			function(tabs)
			{
				chrome.tabs.sendMessage
				(
					tabs[0].id,
					messageForMainScript,
					function(response)
					{
						//console.log(response.farewell)
					}
				)
			}
		)
		// .END (Send message to content script)
	}

}, false);