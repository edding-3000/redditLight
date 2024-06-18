
const Reddit = {
    _url: "https://www.reddit.com/",
    _searchUrl: "https://www.reddit.com/search",
    _timer: false,
    _fetches: localStorage.getItem("numOfFetches") || 0,

    get rateLimitTime() {
        return localStorage.getItem("rateLimitTime") ? 60000 - (Date.now() - localStorage.getItem("rateLimitTime")) : false;
    },

    set rateLimitTime(time) {
        if (!this.rateLimitTime) {
            localStorage.setItem("rateLimitTime", time);
            localStorage.setItem("rateLimitSet", new Date());
        }
    },

    get numOfFetches() {
        this._fetches++;
        localStorage.setItem("numOfFetches", this._fetches);
        return this._fetches;
    },

    async getSubReddit(subReddit = "") {
        if (this.numOfFetches >= 10) {
            console.log("Reached Reddits rate limit.");
            return;
        }
        try {
            const json = require("./mockData.json");
            // const response = await fetch(`${this._url}${subReddit}.json`, { method: 'GET', });

            // if (!response.ok) {
            //     throw new Error(`HTTP error! Status: ${response.status} Message: ${response.message}`);
            // }

            this.rateLimitTime = Date.now();
            this.numOfFetches;
            // const json = await response.json();
            return json.data.children.map((post) => post.data);
        } catch (error) {
            console.error('Error while fetching subreddit with name ' + subReddit + ' from Reddit:', error);
            throw new Error(error);
        }
    },

    async getSubReddits() {
        try {
            const response = await fetch(`${this._url}/subreddits.json`, { method: 'GET', });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} Message: ${response.message}`);
            }

            this.rateLimitTime = Date.now();
            this.numOfFetches;
            const json = await response.json();
            return json.data.children.map((subreddit) => subreddit.data);
        } catch (error) {
            console.error('Error while fetching Subreddits from Reddit:', error);
            throw new Error(error);
        }
    },

    async getComments(permalink) {
        try {
            const response = await fetch(`${this._url}/r/${permalink}.json`, { method: 'GET', });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} Message: ${response.message}`);
            }

            this.rateLimitTime = Date.now();
            this.numOfFetches;
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error while fetching comments from Reddit:', error);
            throw new Error(error);
        }
    },

    async searchRequest(searchQuery) {
        try {
            const response = await fetch(`${this._searchUrl}.json?${encodeURIComponent(searchQuery)}`, { method: 'GET', });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} Message: ${response.message}`);
            }

            this.rateLimitTime = Date.now();
            this.numOfFetches;
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error while fetching searchdata from Reddit:', error);
            throw new Error(error);
        }
    }
}

export default Reddit;