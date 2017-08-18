import request from '../common/request';

var api = 'http://api.etherscan.io/api'
function getData(hash,cb) {
  request('https://ipfs.io/ipfs/'+hash,'GET', {
  },true).then(function(data){
    cb(null,data);
  }, function(err){
    cb(err);
  });
}
function getHash(json,cb) {
    request('http://localhost:3001/json2hash','GET', json,true).then(function(data){
    cb(null,data);
  }, function(err){
    cb(err);
  });
}

function hashArray2Array(hashs,cb) {
  var arr = [];
  for (var i = 0; i < hashs.length; i++) {
    var hash = hashs[i];
    getData(hash,function(err,d){
      if (!err) {
        arr.push(d);
      }else{
        cb(err);
      }
      if (arr.length === hashs.length) {
        cb(null,arr);
      };
    })
  };
}


function getListData(address,cb) {
  request('http://api.etherscan.io/api','GET', {
    module:'account',
    action:'txlist',
    address:address,
    startblock:0,
    endblock:99999999,
    sort:'asc',
    apikey:'YourApiKeyToken'
  },true).then(function(data){
    if (data.result) {
      var hashs = [];
      for (var i = 0; i < data.result.length; i++) {
        var t = data.result[i];
        if (t.input && t.input.length > 40) {
          var assic = window.web3.toAscii(t.input);
          if (assic.substring(0,5) === 'hero-') {
            var hash = assic.replace('hero-','');
            hashs.push(hash);
          };
        };
      };
      hashArray2Array(hashs,cb)
    };
  }, function(err){
    cb(err,null);
  });
}


export {
  getListData,getData,getHash
};
window.getHash = getHash;
