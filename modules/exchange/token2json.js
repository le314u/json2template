// Pega os Tokens e converte em JSON
module.exports = class Token2Json{
    constructor(){}
    static token2nameVar(token){
        return token.slice(2,-1)
    }
    static addNameSpace(nameSpace, nameVar){
        // Add o Token no nameSpace
        let slices = nameVar.split('.')
        slices.forEach(slice => {
            if(this.isAllocated( nameSpace[slice] ) ){
                nameSpace = nameSpace[slice]
            } else {
                nameSpace[slice] = {}
                nameSpace = nameSpace[slice]
            }
        })
    }
    static isAllocated(nameSpace){
        return (nameSpace!==undefined)
    }
    static strAtLeaf(string){
        // Converte {} das folhas em ""
        return string.replace(/{}/g,'""')
    }
    static exchange(generator){
        let nameSpace = {}
        for (let token of generator){
            let nameVar = this.token2nameVar(token)
            this.addNameSpace(nameSpace, nameVar)
        }
        let string = JSON.stringify(nameSpace)
        return this.strAtLeaf(string)
    }
}