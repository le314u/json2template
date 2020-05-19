const input = require('./modules/input/input')
const exchange = require('./modules/exchange/exchange')
const parser = require('./modules/parser/parser')

class Main{
    constructor(){
        this.arqModel = null
        this.arqJson = null
    }
    loadModel(path){
        this.arqModel = new input(path);
    }
    loadData(path){
        this.arqJson = new input(path);
    }
    createJSON(){
        return this.arqModel.content
        .then((content)=>{
            return parser.getToken(content)
        }).then((tokens)=>{
            return exchange.token2json(tokens)
        })
        
    }
    replace(){
        return this.arqJson.init
        .then((strJson)=>{
            let json = JSON.parse(strJson)
            let tokens = exchange.json2token(json)
            return this.arqModel.content.then((content)=>{
                return exchange.exchange(content, tokens, json)
            })
        })
        
        
    }

}

let main = new Main()
main.loadModel('./model/mode1.fodt')
main.loadData('./model/mode1.json')
/*
main.createJSON()
.then((json)=>{
    console.log(json)
})
*/


const fs = require('fs')
main.replace()
.then((finalArq)=>{
    fs.writeFile('./model/final.fodt',finalArq, function(erro) {
        if(erro) {
            throw erro;
        }
        console.log("Arquivo criado");
    }); 

})