import request from '../common/request';
import {getNode} from './heroNodes';
import {merge} from './index';

window.Web3 = require('web3');
if (!window.web3) {
  window.web3 = new window.Web3(new window.Web3.providers.HttpProvider(getNode()+'/eth'));
  if(localStorage.address){
    var bigN = window.web3.eth.getBalance(localStorage.address);
    setTimeout(function(){
      localStorage.balance = bigN.value();
    },1000);
  }
};

var api = 'http://api.etherscan.io/api'
function getTransData(t,cb) {
  request(getNode()+'/ipfs/'+t.hash,'GET', {
  },true).then(function(data){
    merge(t,data)
    cb(null,t);
  }, function(err){
    cb(err);
  });
}
function getHash(json,cb) {
  request(getNode()+'/json2hash','GET', json,true).then(function(data){
    cb(null,data);
  }, function(err){
    cb(err);
  });
}

function transArray2DataArray(trans,cb) {
  var arr = [];
  if (trans.length === 0) {
    cb(null,arr);
  };
  for (var i = 0; i < trans.length; i++) {
    var t = trans[i];
    getTransData(t,function(err,d){
      if (!err) {
        if(Array.isArray(d)){
          arr.concat(d);
        }else{
          arr.push(d);
        }
      }else{
        cb(err);
      }
      if (arr.length === trans.length) {
        cb(null,arr);
      };
    })
  };
}


function getListData(address,cb) {
  request('https://api.etherscan.io/api','GET', {
    module:'account',
    action:'txlist',
    address:address,
    startblock:0,
    endblock:99999999,
    sort:'asc',
    apikey:'YourApiKeyToken'
  },true).then(function(data){
    if (data.result) {
      var trans = [];
      for (var i = 0; i < data.result.length; i++) {
        var t = data.result[i];
        if (t.input && t.input.length > 40) {
          var assic = window.web3.utils.toAscii(t.input);
          if (assic.substring(0,5) === 'hero-') {
            var hash = assic.replace('hero-','');
            trans.push({from:t.from,to:t.to,value:t.value,hash:hash});
          };
        };
      };
      transArray2DataArray(trans,cb)
    };
  }, function(err){
    cb(err,null);
  });
}


export {
  getListData,getTransData,getHash
};
window.getHash = getHash;
