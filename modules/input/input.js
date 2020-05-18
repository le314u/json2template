const fs = require('fs')

module.exports = class Input{
    constructor(path){
        this.content = this.readFile(path)
        this.init =  new Promise( (resolve) => {resolve(this.content) })
    };

    async readFile(path){
        return await new Promise( (resolve, reject) => {
            fs.readFile(path, "utf8", function(err, data){
                if(err) {
                    reject(err)
                }
                resolve(data)
            });
        })
    };
}