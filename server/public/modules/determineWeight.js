// import variable from insulinCal.html
//
var weightInput = //input from html

 if(weightInput <= 60){
   var ratio = 1/30;
 } if else(weightInput > 60 || weightInput <= 80){
   var ratio = 1/25;
 }if else(weightInput > 80 || weightInput <= 100){
   var ratio = 1/20;
 }
 if else(weightInput > 100 || weightInput <= 120){
   var ratio = 1/18;
 }
 if else(weightInput > 120 || weightInput <= 140){
   var ratio = 1/15;
 }if else(weightInput > 140 || weightInput <= 170){
   var ratio = 1/12;
 }
 if else(weightInput > 170 || weightInput <= 200){
   var ratio = 1/10;
 }
 if else(weightInput > 200 || weightInput <= 230){
   var ratio = 1/8;
 }if else(weightInput > 230 || weightInput <= 270){
   var ratio = 1/6;
 }
 if else(weightInput > 270){
   var ratio = 1/5;
 }
 return ratio;

 module.exports = ratio;
