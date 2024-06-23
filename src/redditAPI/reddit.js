import * as mockJson from "./mockData.json";

const Reddit = {
    _url: "https://www.reddit.com/",
    _fetches: JSON.parse(localStorage.getItem("numOfFetches")) || 0,

    get rateLimitTime() {
        const rateLimitTime = JSON.parse(localStorage.getItem("rateLimitTime"));
        return rateLimitTime ? 60000 - (Date.now() - rateLimitTime) : false;
    },

    set rateLimitTime(time) {
        if (!this.rateLimitTime) {
            localStorage.setItem("rateLimitTime", JSON.stringify(time));
            localStorage.setItem("rateLimitSet", new Date());
        }
    },

    get numOfFetches() {
        return this._fetches;
    },

    set numOfFetches(val) {
        this._fetches = val;
        localStorage.setItem("numOfFetches", JSON.stringify(this._fetches));
    },

    _incrementFetches() {
        this.numOfFetches = this.numOfFetches + 1;
    },

    _checkRateLimit() {
        this.rateLimitTime = Date.now();
        if (this.numOfFetches >= 10) {
            console.log("Reached Reddit's rate limit.");
            return true;
        }
        return false;
    },

    async getSubReddit(subReddit = "") {
        this._incrementFetches();
        if (this._checkRateLimit()) return;

        try {

            // const response = await fetch(`${this._url}${subReddit}.json?sr_detail=1`, { method: 'GET', });

            // if (!response.ok) {
            //     throw new Error(`HTTP error! Status: ${response.status} Message: ${response.message}`);
            // }

            // const json = await response.json();
            // return json.data.children.map((post) => post.data);
            return mockJson.data.children.map((post) => post.data);
        } catch (error) {
            console.error('Error while fetching subreddit with name ' + subReddit + ' from Reddit:', error);
            throw new Error(error);
        }
    },

    async getSubReddits() {
        try {
            const response = await fetch(`${this._url}subreddits/popular.json?sr_detail=1`, { method: 'GET', });

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
            const response = await fetch(`${this._url}r/${permalink}.json?sr_detail=1`, { method: 'GET', });

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
            const response = await fetch(`${this._url}search.json?${encodeURIComponent(searchQuery)}?sr_detail=1`, { method: 'GET', });

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