import * as mockJson from "./mockData.json";

const Reddit = {
    _url: "https://www.reddit.com/",

    async getSubReddit(subReddit = "") {
        try {
            console.log(`${this._url}${subReddit}.json?sr_detail=1`);
            const response = await fetch(`${this._url}${subReddit}.json?sr_detail=1`, { method: 'GET', });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} Message: ${response.message}`);
            }

            const json = await response.json();
            return json.data.children.map((post) => post.data);
            // return mockJson.data.children.map((post) => post.data);
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

            const json = await response.json();
            return json.data.children.map((post) => post.data);
        } catch (error) {
            console.error('Error while fetching comments from Reddit:', error);
            throw new Error(error);
        }
    },

    async searchRequest(searchQuery) {
        try {
            const response = await fetch(`${this._url}search.json?q=${encodeURIComponent(searchQuery)}&sr_detail=1`, { method: 'GET', });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} Message: ${response.message}`);
            }

            const json = await response.json();
            console.log("?", json);
            return json.data.children.map((post) => post.data);
        } catch (error) {
            console.error('Error while fetching searchdata from Reddit:', error);
            throw new Error(error);
        }
    }
}

export default Reddit;