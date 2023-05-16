const fs = require('fs');

/**
 * Respository creates and maintains data in JSON store on local file 
 * system.
 * @class
 */
class UrlRepository {

    /**
     * @constructor
     * @public
     * @param {string} filename - Name of file to be created and used
     */
    constructor(filename) {

        if(!filename) {
            throw new Error(
                'Filename is required to create a datastore!'
                );
        }

        this.filename = filename;

        /**
         * Create file with empty array if it doesn't exist.
         */
        try {
            fs.accessSync(__dirname + '/' + this.filename);
        } catch(err) {
            fs.writeFileSync(__dirname + '/' + this.filename, '[]');
        }
    }

    /**
     * Retrieve all rows from data store.
     * @returns {object} JSON obj containing array of JSON store data
     */
    async getAll() {
        return JSON.parse(
            await fs.promises.readFile(
                __dirname + '/' + this.filename, { 
                    encoding : 'utf8' 
                }
            )
        );
    }

    /**
     * Retrieve url for requested token.
     * @param {string} Token to be decoded
     * @returns {string} Decoded url for requested token
     */
    async getUrlForToken(token) {

        /**
         * Fetch all existing rows.
         */
        const urls = await this.getAll();

        const urlObject = urls.find(o => o.token === token); 

        return urlObject.url;
    }

    /**
     * Retrieve token for requested url.
     * @param {string} Requested url
     * @returns {string} Token for requested url
     */
    async getTokenForUrl(url) {

        /**
         * Fetch all existing rows.
         */
        const urls = await this.getAll();

        const urlObject = urls.find(o => o.url === url); 

        return urlObject;
    }

    /**
     * Append new row to JSON store.
     * @param {object} attrs - JSON object of requested new row.
     * @returns {object} JSON object of requested new row
     */
    async create(attrs) {

        /**
         * Fetch all existing rows.
         */
        const urls = await this.getAll();
        
        /**
         * Add new row to array and write entire array to disk.
         */
        urls.push(attrs);
        await fs.promises.writeFile(
            __dirname + '/' + this.filename,
            JSON.stringify(urls, null, 2)
        );

        return attrs;
    }
}

 module.exports =
	new UrlRepository('urls.json')
