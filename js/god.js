
var linkMyWallet=function(){if(ethereum){web3Provider=ethereum;try{ethereum.enable();}catch(error){tishi("user cancel");return;}}else if(web3){web3Provider=web3.currentProvider;console.log("web3.currentProvider:");}else{web3Provider=new Web3.providers.HttpProvider('http://localhost:8545');console.log("https://http-testnet.hecochain.com");}web3js=new Web3(web3Provider);}
var selectAddress;
var web3jsInit=function(){var Inval=setInterval(function(){linkMyWallet();if(web3js){web3js.eth.getAccounts(function(error,result){if(!error){selectAddress=result[0];contractInstanceInit();window.clearInterval(Inval);}});}},2000);}
web3jsInit();

var gasPrice='50000000000';
var tokenAbi=[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"PEPE","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"bool","name":"excluded","type":"bool"}],"name":"excludeMultipleAccountsFromFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserData","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"minPepeAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"newOwner","type":"address"}],"name":"safeTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"safeTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapV2Pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
var tokenTokenContract='0x12a17FD53f6a55aa1029f9ec0E137d8D7C17168f';
var tokenContractInstance;
var controlContractInstance;
var contractInstanceInit=function(){
tokenContractInstance=new web3js.eth.Contract(tokenAbi,tokenTokenContract,{from:selectAddress,gasPrice:'0'});pageDataInit();}

var withdrawToken=function(amount,backFunction,errorFunction){tokenContractInstance.methods.withdrawToken().send({from:selectAddress,gasPrice:gasPrice},errorFunction).then(backFunction);}

var getUserData=function(backFunction){tokenContractInstance.methods.getUserData(selectAddress).call({from:selectAddress,gasPrice:'0'}).then(backFunction);}

var pageDataInit = function(){
	getUserData(function(res){
	    console.log(res)
		var schedule =  res[2]/3000*100;
		$(".jiatanchu3 span").css('width',schedule+'%');
		document.getElementById('schedule-num').innerText = 414252000000000/3000*res[2]
	})
	document.getElementById('myAddress').innerText = selectAddress;
	var oadd = $(".mega-logo span").text();
    newadd = oadd.slice(0, 2) + '***' + oadd.slice(-3);
    $(".mega-logo span").text(newadd);
}


$(".jiatanchu4 a").click(function(){
    getUserData(function(res){
        if(res[0] < 300000000){
            notanchu('pepe needs to be greater than 300000000');
        }
        
        if(res[1] > 0){
            notanchu('you have already received');
        }
        
        if(res[0] >= 300000000000000000000000000 & res[1] == 0){
            
            withdrawToken(function(res){
		      //  console.log(res)
		        if(res){
		            notanchu('Successfully collect');
		        }
        	},function(error){
        	    if(error){
        	        notanchu('Fail collect');
        	    }
        // 		console.log(error)
        	})
        }

	})
    
})



var withdrawTokenTest = function(){

	withdrawToken(function(res){
		console.log(res)
	},function(error){
		console.log(error)
	})
}