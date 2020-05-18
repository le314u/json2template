// Converte Json em Tokens
module.exports = class Json2Token{
    constructor(){}
    static roamJson(nameSpace, slices, tokens){
        if(this.isLeaf(nameSpace)){
            let token = this.nameVar2token(slices)
            tokens.push(token)
        } else {
            let pathSlices = Object.keys(nameSpace)
            pathSlices.forEach((pathSlice)=>{
                this.roamJson(nameSpace[pathSlice], [].concat(slices, pathSlice), tokens)
            })
        }
    }
    static isLeaf(node){
        return (typeof node === 'string')
    }
    static nameVar2token(variaveis){
        return `\${${variaveis.join('.')}}`
    }
    static string2Json(string){
        return JSON.parse(string)
    }
    static exchange(json){
        let tokens = []
        this.roamJson(json, [], tokens)
        return tokens
    }
}