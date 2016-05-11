var carbCover = require('./carbCover.js');
var highSugarCorrector = require('./highSugarCorrector.js');


var finalCarbCount = function(){
  return carbCover + highSugarCorrector;
}

module.exports = finalCarbCount;
