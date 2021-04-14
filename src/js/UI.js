class UI{

    constructor(searchWordFunction, addNewWordFunction, addNewPostFunction, returnToMainPageFunction, showAllWordsFunction){

        this.searchWordFunction = searchWordFunction;
        this.addNewWordFunction = addNewWordFunction;
        this.addNewPostFunction = addNewPostFunction;
        this.returnToMainPageFunction = returnToMainPageFunction;
        this.showAllWordsFunction = showAllWordsFunction;

        this.messageDiv = document.getElementById("messageDiv");
        this.addNewWordForm = document.getElementById("addNewWordForm");
        this.contentDiv = document.getElementById("contentDiv");
        this.searchWordField = document.getElementById("searchWord");

        this.addWordFormDiv = document.getElementById("addWordFormDiv");


        document.getElementById("searchWordForm").addEventListener("submit", this.searchWordFunction);
        document.getElementById("returnToMainPageButton").addEventListener("click", this.returnToMainPageFunction);
        document.getElementById("showAllWordsButton").addEventListener("click", this.showAllWordsFunction);
        document.getElementById("aboutButton").addEventListener("click", this.renderAbout);
    }



    /* ---------- page render functions ---------- */
    renderMainPage(wordsArray){
        // renders main page

        this.contentDiv.innerHTML = `<h2 class="wordHeader">Last added words</h2>`;
        for (let i = 0; i < wordsArray.length; i++) {
            this.contentDiv.innerHTML += `
            <button class="lastAddedWordsButton" onClick="goToWord(this)" id="${wordsArray[i]}">-${wordsArray[i]}</button>
            <br>
            `;
        }
        this.contentDiv.innerHTML += `<hr class="blue">`;
        
        // addNewWordForm
        this.renderAddWordForm();
    }


    renderPosts(word, postsArray){
        // renders a post page
        // post id: postsArray[i][0]
        // post body: postsArray[i][1]
        // post vote: postsArray[i][2]
        // post author: postsArray[i][3]

        this.contentDiv.innerHTML = `<h2 class="wordHeader" id="wordHeader">${word}</h2>`
    
        for (let i = postsArray.length - 1; i >= 0; i--) {
            this.contentDiv.innerHTML += `
    
            <div class="postDiv">
                <h5>Author: ${postsArray[i][3]}</h5>
                <p>${postsArray[i][1]}</p>
                
                <div>
                    <button class="voteButton" onClick="vote(this)" id='{"word":"${word}", "postId":${postsArray[i][0]}, "type":true}'>⇧</button>
                    <button class="voteButton" onClick="vote(this)" id='{"word":"${word}", "postId":${postsArray[i][0]}, "type":false}'>⇩</button> ${postsArray[i][2]}
                </div>
    
                <hr class="blue">
            <div>
            `
        }

        // addNewPostForm
        this.renderAddPostForm();
    }


    /* ---------- ---------- ---------- */



    /* ---------- form functions ---------- */
    renderAddWordForm(){
        // renders add word form

        this.contentDiv.innerHTML += `
        <div>
            <br><br>
            <h2>Add a new Word</h2>
            <br>
            <form id="addNewWordForm" onsubmit="return false;">
                <label for="newWord">New word</label>
                <div class="flexDiv">               
                    <input type="text" id="newWord" name="newWord" placeholder="Word" required>
                </div>

                <br>
                
                <label for="newPost">Meaning</label>
                <div class="flexDiv">    
                    <textarea id="newPost" name="newPost" placeholder="Meaning" required></textarea>
                </div>
                <br><br>
                <input type="checkbox" id="consentCheckBox" name="consentCheckBox" required><label for="consentCheckBox">I understand posts are permanent</label>
                <button class="formButton" id="addNewWord">Add a new word</button> 
                <br><br>
            </form>
        </div>
        `;
        
        document.getElementById("addNewWordForm").addEventListener("submit", this.addNewWordFunction);
    }

    renderAddPostForm(){
        // renders add post form

        this.contentDiv.innerHTML += `
        <div>
            <br><br>
            <h2>Add a new meaning</h2>
            <br>
            <form id="addNewPostForm" onsubmit="return false;">
                <input id="newWord" name="newWord" placeholder="Word" type="hidden">
                <label for="newPost">New meaning</label>
                <div class="flexDiv">   
                    <textarea id="newPost" name="newPost" placeholder="Meaning" required></textarea>
                </div>   
                <br><br>
                <input type="checkbox" id="consentCheckBox" name="consentCheckBox" required><label for="consentCheckBox">I understand posts are permanent</label>
                <button class="formButton" id="addNewWord">Post new meaning</button> 
                <br><br>
            </form>
        </div>
        `;

        document.getElementById("addNewPostForm").addEventListener("submit", this.addNewPostFunction);
    }

    
    clearSearchWordForm(){
        // clear search form
        this.searchWordField.value = "";
    }
    clearConsentCheckBox(){
        // clear Consent CheckBox
        const consentCheckBox = document.getElementById("consentCheckBox");
        consentCheckBox.checked = false;
    }
    /* ---------- ---------- ---------- */



    /* ---------- toast message functions ---------- */
    displayToastMessages(type, delay, isPermanent, message){
        // displays toast message   
        
        const alert = document.createElement("div");

        alert.className = `toastMessage toastMessage-${type}`;
        alert.innerHTML = message;

        this.messageDiv.appendChild(alert);

        // if isPermanent is true add a close button instead of delay
        if(isPermanent){
            const closeButton = document.createElement("div");
            closeButton.className = "toastMessageButton";

            closeButton.innerHTML += `
                <button class="toastMessageButton" onclick="return this.parentNode.parentNode.remove();">X</button>
            `
            alert.appendChild(closeButton);

        }
        // delete massage after delay
        else{
            window.setTimeout(() => {
                alert.remove();
            },delay*1000);
        }

    }
    /* ---------- ---------- ---------- */

}