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
    getAll() {
        return JSON.parse(
            fs.readFileSync(
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
    getUrlForToken(token) {

        /**
         * Fetch all existing rows.
         */
        const urls = this.getAll();

        const urlObject = urls.find(o => o.token === token); 

        return urlObject.urlRequested;
    }

    /**
     * Retrieve token for requested url.
     * @param {string} Requested url
     * @returns {string} Token for requested url
     */

    getTokenForUrl(url) {

        /**
         * Fetch all existing rows.
         */
        const urls = this.getAll();

        const urlObject = urls.find(o => o.urlRequested === url);

        return urlObject;
    }

    /**
     * Append new row to JSON store.
     * @param {object} attrs - JSON object of requested new row.
     * @returns {object} JSON object of requested new row
     */
    create(attrs) {

        /**
         * Fetch all existing rows.
         */
        const urls = this.getAll();
        
        /**
         * Add new row to array and write entire array to disk.
         */
        urls.push(attrs);
        fs.writeFileSync(
            __dirname + '/' + this.filename,
            JSON.stringify(urls, null, 2)
        );

        return attrs;
    }
}

 module.exports =
	new UrlRepository('urls.json')
