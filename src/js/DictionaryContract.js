class DictionaryContract{

    constructor(contractAssetsPath){
        this.contractAssetsPath = contractAssetsPath;
    }

    async readContractAssets(){
        const rawFile = await fetch(this.contractAssetsPath);
        const contractAssets = await rawFile.json();
        return contractAssets
    }

    async buildContract(){
        // window.web3 = new Web3(window.ethereum);
		// window.ethereum.enable(); // old way

        const contractAssets = await this.readContractAssets();
        this.contractAddress = contractAssets.contractAssets.address;
        this.abi = contractAssets.contractAssets.abi;

        this.contract = new web3.eth.Contract(this.abi, this.contractAddress);
    }


    // ---------- ---------- state changing functions ---------- ----------
    async addPost(word, post){
        // addPost("word", "this is a word description");
        const senderPublicKey = await web3.eth.getAccounts();
        return await this.contract.methods.addPost(word, post).send({from: senderPublicKey[0]});
    }

    async votePost(word, postId, vote){
        // votePost("word", 3, true);
        // true for upVote false for downVote
        const senderPublicKey = await web3.eth.getAccounts();
        return await this.contract.methods.votePost(word, postId, vote).send({from: senderPublicKey[0]});
    }
    // ---------- ---------- ---------- ---------- ----------



    // ---------- ---------- post getters ---------- ----------
    async getPostsByWord(word){ // used
        // getPostsByWord("word");
        // returns post array  
        return await this.contract.methods.getPostsByWord(word).call();
    }

    async getPostsByWords(wordArray){
        // getPostsByWords(["word", "other Word"]);
        // returns word array, that contains posts for multiple words
        return await this.contract.methods.getPostsByWords(wordArray).call();
    }

    async getPostsByWordIndex(index){
        // getPostsByWordIndex(5);
        // returns post array
        return await this.contract.methods.getPostsByWordIndex(index).call();
    }

    async getPostsByWordIndexes(indexArray){
        // getPostsByWordIndexes([1,3,5]);
        // returns word array, that contains posts for multiple words
        return await this.contract.methods.getPostsByWordIndexes(indexArray).call();
    }

    async getPostsBetween(word, start, end){
        // getPostsBetween("word", 5, 10);
        // returns post array
        return await this.contract.methods.getPostsBetween(word, start, end).call();
    }

    // ---------- ---------- ---------- ---------- ----------



    // ---------- ---------- word getters ---------- ----------

    async getWordsBetween(start, end){
        // getWordsBetween(5, 10);
        // returns string array of words
        return await this.contract.methods.getWordsBetween(start, end).call();
    }

    async getLastNWords(n){ // used
        // getLastNWords(5);
        // returns string array of last N words 
        return await this.contract.methods.getLastNWords(n).call();
    }

    async getWordByIndex(index){
        // getWordByIndex(5);
        // returns string array of words
        return await this.contract.methods.getWordByIndex(index).call();
    }

    async getAllWords(){ // used
        // returns string array of all words
        return await this.contract.methods.getAllWords().call();
    }

    async getWordCount(){
        // returns unsigned integer of word count
        return await this.contract.methods.getWordCount().call();
    }

    async isWordExists(word){ // used
        // isWordExists("word");
        // returns true if word exists
        return await this.contract.methods.isWordExists(word).call();
    }
    // ---------- ---------- ---------- ---------- ----------


}

