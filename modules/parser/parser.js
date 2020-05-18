// Pega o Texto inteiro e retira os Tokens
module.exports = class Parser{
    constructor(){}
    static getInit(string){
        let  init = new RegExp(/\$\{(([a-z]|[A-Z])([a-z]|[A-Z])*(\.?([a-z]|[A-Z])([a-z]|[A-Z])*)*)\}/);
        return string.search(init)
    };
    static getEnd(string, init){
        const  end = new RegExp(/}/);
        let subString = string.slice(init)
        return init + subString.search(end)
    };
    static validInterval(init, end){
        return  ( (init < end) && (init != -1 && end != -1) )
    };
    static getChunk(string, init, end){
        return string.slice(init, end+1)
    };
    static *getToken(string){
        let init = this.getInit(string)
        let end = this.getEnd(string, init)
        let subString = string
        while(this.validInterval(init, end)){
            yield this.getChunk(subString, init, end)
            subString = subString.slice(end+1)
            init = this.getInit(subString)
            end = this.getEnd(subString, init)
        }
    };
}