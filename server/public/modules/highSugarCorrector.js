
var bloodSugarInput = // bloodSugarInput from insulinCal.html

var correctionDose = function(){
  return (bloodSugarInput - 120)/50;
}

module.exports = correctionDose;
