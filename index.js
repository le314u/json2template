const fs = require('fs')
const path = require('path')
const input = require('./modules/input/input')
const exchange = require('./modules/exchange/exchange')
const parser = require('./modules/parser/parser')

module.exports = class Main{
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
    createJSON(pathInputTemplate, pathOutput){
        this.loadModel = pathInputTemplate;
        return this.arqModel.content
        .then((content)=>{
            return parser.getToken(content)
        }).then((tokens)=>{
            return exchange.token2json(tokens)
        }).then((json)=>{
            fs.writeFile(pathOutput, json, function(erro) {
                if(erro) {
                    throw erro;
                }
                return `Modelo json salvo em ${pathOutput}`
            }); 
        })
        
    }
    replace(pathInputTemplate, pathInputJson, pathOutput){
        this.loadData = pathInputJson;
        this.loadModel = pathInputTemplate;
        return this.arqJson.init
        .then((strJson)=>{
            let json = JSON.parse(strJson)
            let tokens = exchange.json2token(json)
            return this.arqModel.content.then((content)=>{
                return exchange.exchange(content, tokens, json)
            })
        }).then((finalArq)=>{
            let realativePath = path.join(pathOutput,'out.model')
            fs.writeFile(realativePath, finalArq, function(erro) {
                if(erro) {
                    throw erro;
                }
                return `Arquivo final salvo em ${pathOutput}`
            }); 
        })     
    }

}