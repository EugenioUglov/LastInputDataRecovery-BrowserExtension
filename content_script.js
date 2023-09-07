// When page is loaded
window.addEventListener("load", function(){
	const inputs = document.getElementsByTagName('input');
	const selects = document.getElementsByTagName('select');
	const textareas = document.getElementsByTagName('textarea');

	for (index = 0; index < inputs.length; ++index) {
		inputs[index].addEventListener('input', ()=>{
			saveInputValues();
		});
	}

	for (index = 0; index < selects.length; ++index) {
		selects[index].addEventListener('input', ()=>{
			saveInputValues();
		});
	}

	for (index = 0; index < textareas.length; ++index) {
		textareas[index].addEventListener('input', ()=>{
			saveInputValues();
		});
	}

});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request === 'restoreInputDataBtnClicked') {
			restoreLastSavedInputValues();
			return true;
		}

		if (request === 'clearSavedInputDataBtn') {
			clearAllSavedInputData();
			return true;
		}
	}
);


function saveInputValues() {
	const inputValues = [];
	const selectValues = [];
	const textareaValues = [];

	const lastSavedInputData = {};

	const inputs = document.getElementsByTagName('input');
	const selects = document.getElementsByTagName('select');
	const textareas = document.getElementsByTagName('textarea');
	

	for (index = 0; index < inputs.length; ++index) {
		inputValues[index] = inputs[index].value;
	}

	for (index = 0; index < selects.length; ++index) {
		selectValues[index] = selects[index].value;
	}

	for (index = 0; index < textareas.length; ++index) {
		textareaValues[index] = textareas[index].value;
	}

	// console.log(inputValues, selectValues, textareaValues);

	lastSavedInputData['inputValues'] = inputValues;
	lastSavedInputData['selectValues'] = selectValues;
	lastSavedInputData['textareaValues'] = textareaValues;


	chrome.storage.sync.get(['lastSavedInputData'], function(dataFromStorage){
		if (dataFromStorage === undefined) {
			dataFromStorage = {};
		}
				
		if (dataFromStorage['lastSavedInputData'] === undefined) {
			dataFromStorage['lastSavedInputData'] = {};
		}

		dataFromStorage['lastSavedInputData'][location.hostname] = lastSavedInputData;
	
		// Save in extension.
		chrome.storage.sync.set(dataFromStorage, function(){
			//  A data saved callback omg so fancy
			console.log('Last input data has been saved');
		});
	});



	// Save in localstorage.
	// JSON.stringify(lastSavedInputData);
	// localStorage.setItem('lastSavedInputData', JSON.stringify(lastSavedInputData));
}

function clearAllSavedInputData() {
	const savedInputDataByHost = {};
	savedInputDataByHost['lastSavedInputData'] = {};

	chrome.storage.sync.set(savedInputDataByHost, function(){
		//  A data saved callback omg so fancy
		alert('All saved input data has been removed');
	});
}

function restoreLastSavedInputValues() {
	chrome.storage.sync.get(['lastSavedInputData'], function(dataFromStorage){
		if (dataFromStorage['lastSavedInputData'] === undefined) {
			alert('No data to restore for this page.');
			return false;
		}
		
		const inputToRestore = dataFromStorage['lastSavedInputData'][location.hostname];
		
		if (inputToRestore === undefined) {
			alert('No data to restore for this page.');
			return false;
		}
		// console.log(dataFromStorage['lastSavedInputData'][location.hostname]);

		// Get from localstorage.
		// const inputToRestore = JSON.parse(localStorage.getItem('lastSavedInputData'));

		const inputs = document.getElementsByTagName('input');
		const selects = document.getElementsByTagName('select');
		const textareas = document.getElementsByTagName('textarea');
		

		for (index = 0; index < inputs.length; ++index) {
			if (inputs[index].value === undefined) continue;

			inputs[index].value = inputToRestore['inputValues'][index];
		}

		for (index = 0; index < selects.length; ++index) {
			if (selects[index].value === undefined) continue;

			selects[index].value = inputToRestore['selectValues'][index];
		}

		for (index = 0; index < textareas.length; ++index) {
			if (textareas[index].value === undefined) continue;

			textareas[index].value = inputToRestore['textareaValues'][index];
		}

		console.log('Last input data has been restored');
	});
}

