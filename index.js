const fs = require('fs')
const path = require('path')
const input = require('./modules/input/input')
const exchange = require('./modules/exchange/exchange')
const parser = require('./modules/parser/parser')

module.exports = class Main{
    constructor(pathTemplate, pathData, pathOutput){
        this.arqModel = null
        this.arqJson = null

        this.loadModel(pathTemplate)
        this.loadData(pathData)

        this.createJSON()
        .then((json)=>{
            let realativePath = path.join(pathOutput,'out.json')
            fs.writeFile(realativePath, json, function(erro) {
                if(erro) {
                    throw erro;
                }
                console.log("modelo json criado");
            }); 
        })


        this.replace()
        .then((finalArq)=>{
            let realativePath = path.join(pathOutput,'out.model')
            fs.writeFile(realativePath, finalArq, function(erro) {
                if(erro) {
                    throw erro;
                }
                console.log("arquivo final criado");
            }); 
        })
        
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