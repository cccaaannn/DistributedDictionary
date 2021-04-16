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

        // <h2 class="wordHeader">All words</h2>
        // <button class="lastAddedWordsButton" onClick="goToWord(this)" id="${wordsArray[i]}">-${wordsArray[i]}</button>
        // <br>
        // <button class="lastAddedWordsButton" onClick="goToWord(this)" id="${wordsArray[i]}">-${wordsArray[i]}</button>
        // <br>
        // <hr class="blue">

    
        this.contentDiv.innerHTML = ``;
        const wordHeader = document.createElement("h2");
        wordHeader.classList.add("wordHeader");
        wordHeader.appendChild(document.createTextNode("Last added words"));
        this.contentDiv.appendChild(wordHeader);

        for (let i = 0; i < wordsArray.length; i++) {

            // ----- last added words buttons -----
            const lastAddedWordsButton = document.createElement("button");
            lastAddedWordsButton.classList.add("lastAddedWordsButton");
            lastAddedWordsButton.id = wordsArray[i];
            lastAddedWordsButton.setAttribute("onclick", "goToWord(this);");
            lastAddedWordsButton.appendChild(document.createTextNode("-" + wordsArray[i]));

            const br = document.createElement("br");

            this.contentDiv.appendChild(lastAddedWordsButton);
            this.contentDiv.appendChild(br);
            // ----- ----- -----
        }

        const Bluehr = document.createElement("hr");
        Bluehr.classList.add("blue");
        this.contentDiv.appendChild(Bluehr);
        
        // addNewWordForm
        this.renderAddWordForm();
    }

    renderAllWords(allWords){
        // renders all words page

        // <h2 class="wordHeader">All words</h2>
        // <button class="lastAddedWordsButton" onClick="goToWord(this)" id="${allWords[i]}">${i+1}-${allWords[i]}</button>
        // <br>
        // <button class="lastAddedWordsButton" onClick="goToWord(this)" id="${allWords[i]}">${i+1}-${allWords[i]}</button>
        // <br>
        // <hr class="blue">


        this.contentDiv.innerHTML = ``;
        const wordHeader = document.createElement("h2");
        wordHeader.classList.add("wordHeader");
        wordHeader.appendChild(document.createTextNode("All words"));
        this.contentDiv.appendChild(wordHeader);

        // this.contentDiv.innerHTML = ``
        for (let i = 0; i < allWords.length; i++) {

            // ----- all words words buttons -----
            const lastAddedWordsButton = document.createElement("button");
            lastAddedWordsButton.classList.add("lastAddedWordsButton");
            lastAddedWordsButton.id = allWords[i];
            lastAddedWordsButton.setAttribute("onclick", "goToWord(this);");
            lastAddedWordsButton.appendChild(document.createTextNode(i+1 + "-" + allWords[i]));

            const br = document.createElement("br");

            this.contentDiv.appendChild(lastAddedWordsButton);
            this.contentDiv.appendChild(br);
            // ----- ----- -----

        }

        const Bluehr = document.createElement("hr");
        Bluehr.classList.add("blue");
        this.contentDiv.appendChild(Bluehr);

        // addNewWordForm
        this.renderAddWordForm();
    }

    renderPosts(word, postsArray){
        // renders a post page
        // post id: postsArray[i][0]
        // post body: postsArray[i][1]
        // post vote: postsArray[i][2]
        // post author: postsArray[i][3]


        // <div class="postDiv">
        //     <h5>Author: ${postsArray[i][3]}</h5>
        //     <p>${postsArray[i][1]}</p>
        //     <div>
        //         <button class="voteButton" onClick="vote(this)" id='{"word":"${word}", "postId":${postsArray[i][0]}, "type":true}'>⇧</button>
        //         <button class="voteButton" onClick="vote(this)" id='{"word":"${word}", "postId":${postsArray[i][0]}, "type":false}'>⇩</button> ${postsArray[i][2]}
        //     </div>
        //     <hr class="blue">
        // <div>
        // 
        // this.contentDiv.innerHTML += `

        // <div class="postDiv">
        //     <h5>Author: ${postsArray[i][3]}</h5>
        // <div>


        this.contentDiv.innerHTML = ``;

        // h2 wordHeader author
        const wordHeader = document.createElement("h2");
        wordHeader.classList.add("wordHeader");
        wordHeader.id = "wordHeader";
        wordHeader.appendChild(document.createTextNode(word));

        this.contentDiv.appendChild(wordHeader);

        for (let i = postsArray.length - 1; i >= 0; i--) {
            // post div
            const postDiv = document.createElement("div");

            // author h5
            const postAuthor = document.createElement("h5");
            postAuthor.appendChild(document.createTextNode(`Author: ${postsArray[i][3]}`));

            // post p
            const post = document.createElement("p");
            post.appendChild(document.createTextNode(postsArray[i][1]));

            // hr
            const Bluehr = document.createElement("hr");
            Bluehr.classList.add("blue");


            // ----- vote buttons -----
            const voteDiv = document.createElement("div");

            const upVoteButton = document.createElement("button");
            const downVoteButton = document.createElement("button");

            upVoteButton.classList.add("voteButton");
            upVoteButton.id = `{"word":"${word}", "postId":${postsArray[i][0]}, "type":true}`;
            upVoteButton.setAttribute("onclick", "vote(this);");
            upVoteButton.appendChild(document.createTextNode("⇧"));

            downVoteButton.classList.add("voteButton");
            downVoteButton.id = `{"word":"${word}", "postId":${postsArray[i][0]}, "type":false}`;
            downVoteButton.setAttribute("onclick", "vote(this);");
            downVoteButton.addEventListener("click", vote);
            downVoteButton.appendChild(document.createTextNode("⇩"));

            const voteCount = document.createTextNode(postsArray[i][2]);
            // ----- ----- -----

            voteDiv.appendChild(upVoteButton);
            voteDiv.appendChild(downVoteButton);
            voteDiv.appendChild(voteCount);

            postDiv.appendChild(postAuthor);
            postDiv.appendChild(post);
            postDiv.appendChild(voteDiv);
            postDiv.appendChild(Bluehr);

            this.contentDiv.appendChild(postDiv);
        }

        // addNewPostForm
        this.renderAddPostForm();
    }

    renderAbout(){
        const contentDiv = document.getElementById("contentDiv");

        contentDiv.innerHTML = `
        <div class="aboutDiv">
            <h2 class="wordHeader">About</h2> 
            <p>Distributed Dictionary is a user-created dictionary that runs entirely on the blockchain without the need for a centralized backend.</p>
            <p>Adding or voting posts requires payment but posts are permanently saved to the blockchain. Pages can load slower depending on the current blockchain response time.</p>
            <p>To use Distributed Dictionary you need web3 support on your browser, you can use an extension like <a target="_blank" href="https://metamask.io/">metamask</a>.</p>
        </div>
        `;
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
            // button div
            const closeButtonDiv = document.createElement("div");
            closeButtonDiv.classList.add("toastMessageButton");

            // button
            const closeButton = document.createElement("button");
            closeButton.classList.add("toastMessageButton");
            closeButton.setAttribute("onclick", "return this.parentNode.parentNode.remove();");
            closeButton.appendChild(document.createTextNode("X"));

            closeButtonDiv.appendChild(closeButton);
            alert.appendChild(closeButtonDiv);

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