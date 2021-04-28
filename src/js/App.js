// options
const mainPageWordCount = 5;
const supportedNetwork = "kovan";
const contractAssetsPath = "src/assets/contractAssets.json";

// instantiate ui and contract
const ui = new UI(searchWord, addNewWord, addNewPost, returnToMainPage, showAllWords);
const dictionaryContract = new DictionaryContract(contractAssetsPath);

document.addEventListener("DOMContentLoaded", init);


async function init(){
	// activate web3 if it is possible

	// check for eth support
	if (window.ethereum) {
		try {

			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			// window.ethereum.enable(); // old way

			// create web3 and init contract object
			window.web3 = new Web3(window.ethereum);
			await dictionaryContract.buildContract();


			// test if user on the supported network
			const type = await web3.eth.net.getNetworkType();
			if(type != supportedNetwork){
				console.log(type);
				ui.displayToastMessages("error", 0, true, `Please switch to ${supportedNetwork} network and reload`);
				return;
			}

			// get last added words for main page
			const wordsArray = await dictionaryContract.getLastNWords(mainPageWordCount);
			ui.renderMainPage(wordsArray);

			// register service worker for pwa
			registerServiceWorker();
		}
		catch (error) {
			if (error.code === 4001) {
				ui.displayToastMessages("error", 0, true, "This site requires permission form metamask.");
				ui.renderAbout();
			}
			else{
				console.log(error);
				ui.displayToastMessages("error", 0, true, "oops something went wrong.");
				ui.renderAbout();
			}
		}
	}
	else{
		ui.displayToastMessages("error", 0, true, "No ethereum support detected");
		ui.renderAbout();
	}
}



/* ---------- page functions ---------- */

async function returnToMainPage(){
	// displays main page
	const wordsArray = await dictionaryContract.getLastNWords(mainPageWordCount);
	ui.renderMainPage(wordsArray);
}

async function showAllWords(){
	// gets all words and displays them
	let allWords = await dictionaryContract.getAllWords();

	// sort words
	allWords = allWords.slice().sort(); 

	ui.renderAllWords(allWords);
}

async function goToWord(button){
	// renders clicked word's page
	const word = button.id;
	const postsArray = await dictionaryContract.getPostsByWord(word);
	ui.renderPosts(word, postsArray);
}

/* ---------- ---------- ---------- */



/* ---------- form functions ---------- */

async function searchWord(){
	// retrieves searched words page if word exists on eth

	const word = document.getElementById("searchWord").value;

	const isExists = await dictionaryContract.isWordExists(word);
	if(!isExists){
		ui.displayToastMessages("error", 2, false, "Word not found");
		return
	}

	ui.displayToastMessages("warning", 1, false, "Searching...");
	const postsArray = await dictionaryContract.getPostsByWord(word);
	ui.renderPosts(word, postsArray);
	ui.clearSearchWordForm();
}


async function addNewWord(){
	// adds new word to the contract and displays new word's page

	const newWord = document.getElementById("newWord").value;
	const newPost = document.getElementById("newPost").value;

	const isExists = await dictionaryContract.isWordExists(newWord);
	if(isExists){

		const postsArray = await dictionaryContract.getPostsByWord(newWord);

		ui.renderPosts(newWord, postsArray);
		ui.displayToastMessages("warning", 2, false, "This word exists");

		document.getElementById("newPost").value = newPost;
	}
	else{
		dictionaryContract.addPost(newWord, newPost)
		.then(async transaction => {

			const postsArray = await dictionaryContract.getPostsByWord(newWord);

			ui.renderPosts(newWord, postsArray);
			ui.displayToastMessages("success", 2, true, `Post added, check the transaction at <a target="_blank" href="https://kovan.etherscan.io/tx/${transaction.transactionHash}">etherscan</a>`);
			
			console.log("Transaction address: ", transaction.transactionHash);
		}).catch(err => {
			ui.clearConsentCheckBox();
			ui.displayToastMessages("error", 2, false, "Transaction cancelled");
		});

		ui.displayToastMessages("warning", 2, false, "Transaction pending");
		console.log("Transaction pending");
	}

}


async function addNewPost(){
	// adds new post to the contract and refreshes word's page

	const word = document.getElementById("wordHeader").textContent;
	const newPost = document.getElementById("newPost").value;

	dictionaryContract.addPost(word, newPost)
	.then(async transaction => {

		const postsArray = await dictionaryContract.getPostsByWord(word);

		ui.renderPosts(word, postsArray);
		ui.displayToastMessages("success", 2, true, `Post added, check the transaction at <a target="_blank" href="https://kovan.etherscan.io/tx/${transaction.transactionHash}">etherscan</a>`);
		
		console.log("Transaction address: ", transaction.transactionHash);
	}).catch(err => {
		ui.clearConsentCheckBox();
		ui.displayToastMessages("error", 2, false, "Transaction cancelled");
	});

	ui.displayToastMessages("warning", 2, false, "Transaction pending");
	console.log("Transaction pending");
	
}


async function vote(button){
	// up or down votes a post, uses button's id to decide

	// get data from button id as json
	const buttonInfo = JSON.parse(button.id);
	const word = buttonInfo.word;
	const postId =  buttonInfo.postId;
	const buttonType = buttonInfo.type;


	// run contract
	dictionaryContract.votePost(word, postId, buttonType)
	.then(async transaction => {

		const postsArray = await dictionaryContract.getPostsByWord(word);
		ui.renderPosts(word, postsArray);
		ui.displayToastMessages("success", 2, true, `Vote saved, check the transaction at <a target="_blank" href="https://kovan.etherscan.io/tx/${transaction.transactionHash}">etherscan</a>`);

		console.log("Transaction address: ", transaction.transactionHash);
		
	}).catch(err => {
		ui.displayToastMessages("error", 2, false, "Transaction cancelled");
	});

	ui.displayToastMessages("warning", 2, false, "Transaction pending");
	console.log("Transaction pending");
}

/* ---------- ---------- ---------- */


/* ---------- SW for pwa ---------- */

function registerServiceWorker(){
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("sw.js", {scope: './'}).then(registration => {

        }).catch(error => {
            console.log("service worker can not registered");
            console.log(error);
        })
    }
}

/* ---------- ---------- ---------- */
