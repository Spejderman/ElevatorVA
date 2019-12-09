var readBtn = document.querySelector('#phpread');
var writeBtn = document.querySelector('#phpwrite');
var countBtn = document.querySelector('#phpcount');
var testResult = document.querySelector('#testresult');

readBtn.addEventListener('click', function(){
   GetCultData();
});

writeBtn.addEventListener('click', function(){
   var value = "This is a story that I made earlier that ends with the random number " + Math.random();
   SetCultData(value);
});

countBtn.addEventListener('click', function(){
   GetCount();
});
