const json2token = require('./json2token')
const token2json = require('./token2json')

module.exports = class Exchange{
    constructor(){}
    static json2token(json){
        return json2token.exchange(json)
    }
    static token2json(generator){
        return token2json.exchange(generator)
    }

    static token2value(token, nameSpace){
        let pathVar = token2json.token2nameVar(token)

        let pathSlices = pathVar.split('.')
        for ( let slice of pathSlices ){
            nameSpace = nameSpace[slice]
        }
        return nameSpace
    }

    static exchange(string, tokens, nameSpace){
        for ( let token of tokens){
            let value = this.token2value(token, nameSpace)
            let regex = new RegExp("\\"+token,"g")
            string = string.replace(regex, value)
        }
        return string
    }

}