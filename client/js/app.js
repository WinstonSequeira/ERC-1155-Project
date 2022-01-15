var Web3 = require('web3');
var TruffleContract = require('truffle-contract');
window.ethereum.on('networkChanged', function(networkId){
    if(networkId == "4" || networkId == "80001" || networkId == "5777"){
        App.init();
        $("#tok").fadeIn();
        $("#tok_error").fadeOut();


    } else {
        $("#tok").fadeOut();
        $("#tok_error").fadeIn();
        console.log("Please switch network to RinkBy Test Network or Polygon Test Network")
    }
});
App = {
    web3Provider: null,
    contracts: {},
    currentAccount:{},
    initWeb3 : async function (){
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
          } else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            web3 = new Web3(App.web3Provider);
          }
          let network = await web3.eth.net.getId()
          if(network == 4 || network == 80001 || network == 5777){
            $("#tok").fadeIn();
            $("#tok_error").fadeOut();
            return  await App.initContract(); 

          } else {
            $("#tok").fadeOut()
            $("#tok_error").fadeIn();

          }
    },
    initContract : async function (){
        const data = await $.getJSON('Tokens.json')
        var Tokens = data;
        App.contracts.Tokens = TruffleContract(Tokens);
        App.contracts.Tokens.setProvider(App.web3Provider)
        App.instance = await App.contracts.Tokens.deployed()
        return App.bindEvents();
    },
    Interv:function(){
        setInterval(async ()=>{
            let accounts = await web3.eth.getAccounts()
            $('#account').text(`${accounts}`)
            
        },1000)
        return App.bindEvents();

    },
    bindEvents: function() { 
        $("#createToken").on('click',App.createToken)
        $("#checkToken").on('click',App.checkToken)
        $("#createNFT").on('click',App.createNFT)
        $("#getNFT").on('click',App.getNFT)
    },
    createToken: async function(){
        let amount = $("#ID").val()
        let tokenID = $("#amount").val()
        let accounts = await web3.eth.getAccounts()
        await App.instance.mintCoins(amount,tokenID,{
            from:accounts[0]
        })   
    },
    checkToken: async function(){
        let accounts = await web3.eth.getAccounts()
        let tokenID = $("#tokenID").val()
        let result = await App.instance.balance(tokenID,{
            from:accounts[0]
        })
        $("#tokenbalance").text(result)
    },
    createNFT:async function (){
        let nftID = $("#nftId").val()
        let nftMessage = $("#nftMessage").val()
        console.log(nftID,nftMessage)
        let accounts = await web3.eth.getAccounts()
        await App.instance.mintNFT(nftID,nftMessage,{
            from:accounts[0]
        })
    },
    getNFT: async function(){
        let accounts = await web3.eth.getAccounts()
        let tokenID = $("#nftID").val()
        let result = await App.instance.getNFT(tokenID,{
            from:accounts[0]
        })
        $("#nftmessage").text(result)
    },
    init : async function (){
        await App.initWeb3();                 
    }
}  

$(function() {
    $(window).load(function() {
        App.init();
    });
  });

