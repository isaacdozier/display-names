//helper functions
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function oneWordUpper(oneWord){
  var Caps;
  Caps = oneWord.charAt(0).toUpperCase();
  Caps = Caps.concat(oneWord.slice(1,oneWord.length));
  return Caps;  
}

function arrayStartsValue(array, value){
  var tmp = false;
  for(var i=0; i < array.length;i++){
    if(value.startsWith(array[i])){
      tmp = true;
    }
  }
  return tmp;
}

//Builder function
function capFullName(full_name){
  var clean_name_arr = full_name.toLowerCase().split(" ");
  var new_name;
  
  var surNameM = ["mc","mac"];
  var surNameY = "y";
  var apo = "'";
  var apoNoCap = "aeiouy";
  
  var new_arr = clean_name_arr.map(function(a){
    
    var tmp;
    var frontName;
    var backName;
    
    if(arrayStartsValue(surNameM,a)){
      
      for(var i = 0;i < surNameM.length;i++){
        if(a.startsWith(surNameM[i])){
          backName = a.slice(surNameM[i].length, a.length);
          tmp = a.replace(surNameM[i], oneWordUpper(surNameM[i]));
        } 
      }
      
      tmp = tmp.replace(backName, oneWordUpper(backName));
      
    } else if(a.includes(apo)){
      var before = a.search(apo)-1;
      var after = a.search(apo)+1;
      
      frontName = a.slice(0, a.search(apo));
      backName = a.slice(a.search(apo)+1, a.length);
      
      tmp = a.replace(frontName, oneWordUpper(frontName));
      
      if(a.charAt(before) !== a.charAt(after)){
        tmp = tmp.replace(backName, oneWordUpper(backName));
      }
       
    } else if(a === surNameY){
      
      tmp = a;
      
    } else {
      
      tmp = oneWordUpper(a);
      
    }
    return tmp;
  }); 
  
  new_name = new_arr.join(" ");
  
  return new_name;
}
