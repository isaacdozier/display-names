function capFullName(full_name){
  var clean_name_arr = full_name.toLowerCase().split(" ");
  var new_name;
  var surName = "mc";
  var apo = "'";
  
  var new_arr = clean_name_arr.map(function(a){
    var tmp;
    var frontName;
    var backName;
    
    if(a.startsWith(surName)){
      backName = a.slice(surName.length, a.length);
      tmp = a.replace(surName, oneWordUpper(surName));
      tmp = tmp.replace(backName, oneWordUpper(backName));
    } else if(a.includes(apo)){
      frontName = a.slice(0, a.search(apo));
      backName = a.slice(a.search(apo)+1, a.length);
      tmp = a.replace(frontName, oneWordUpper(frontName));
      tmp = tmp.replace(backName, oneWordUpper(backName));
    } else {
      tmp = oneWordUpper(a);
    }
    return tmp;
  }); 
  
  new_name = new_arr.join(" ");
  
  return new_name;
}

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
