import request from '../common/request';
var defaultNode = 'hero-mobile.com';
var heroNodes = JSON.parse(localStorage.heroNodes||"[]") ;
if (heroNodes.length === 0) {
  heroNodes.push(defaultNode);
};

function searchNodes(i){
  if (heroNodes.length > 20 || i > heroNodes.length-1) {
    return;
  };
  setTimeout(function(){
    var ip = heroNodes[i];
    request('http://'+ip+':3001'+'/heroNodes','GET', {},true).then(function(data){
      heroNodes.concat(data);
      localStorage.heroNodes = JSON.stringify(heroNodes);
    }, function(err){
      var i = heroNodes.indexOf(ip);
      heroNodes.splice(i,1);
    });
    searchNodes(i+1);
  },2000);
}
searchNodes(0);
function getNode(){
  return 'http://'+heroNodes[0]+':3001';
}
export {
  getNode
};
