//TEST 1
// var user = {};
// user.name = 'John';
// user.surname = 'Smith';
// user.name = 'Pete';
// console.log(user);

//TEST 2
// var user={};
// console.log('user',isEmpty(user));
// var student = {name:'KK'};
// console.log('student',isEmpty(student));
//
// function isEmpty(x) {
//   for(key in x){
//       return true;
//     }
//         return false;
// }

// TEST 3
// const user = {
//   name: 'Kyaw',
// }
// console.log(user);
// user.name = 'Mg';
// console.log(user);

// TEST 4
// var sal = {
//   John: 100,
//   Ann: 160,
//   Pete: 130
// };
// sum(sal);
// function sum(sal) {
//   var total=0;
//   for(var key in sal){
//     total += sal[key];
//   }
//   console.log(total);
// }

//test
// var menu = {
//   width: 200,
//   height: 300,
//   test :'My menus',
// }
// console.log(multipleNumeric(menu));
// function multipleNumeric(kk) {
//   for(key in kk){
//     if(typeof kk[key] != 'string'){
//       kk[key] *= 2;
//     }
//   }
//   return kk;
// }

// TEST
// var user = {
//   name: "John",
//   go: function() { console.log(this.name); }
// }
//
// user.go();

//TEST
// var obj, method;
//
// obj = {
//   go: function() { console.log(this); }
// };
//
// obj.go();               // (1) [object Object]
//
// (obj.go)();             // (2) [object Object]
//
// (method = obj.go)();    // (3) undefined
//
// (obj.go || obj.stop)(); // (4) undefined


// TEST
// var ladder = {
//   step: 0,
//   up() {
//     this.step++;
//     return this
//   },
//   down() {
//     this.step--;
//   },
//   showStep: function() { // shows the current step
//     console.log( this.step );
//   }
// };
// ladder.up();
// ladder.up();
// ladder.down();
// ladder.showStep(); // 1

// ladder.up().up().down().showStep(); // 1

//TEST
var arr = ['Jazz', 'Bules']; // assign array
arr.push('Rock-n-Roll'); // push value to final index
arr[1]='Classics'; // replace  bules into Classics
arr.shift();  // remove first index
arr.unshift('Rap','Reggae');  // Add new value at the first index
console.log(arr);   //  print value
