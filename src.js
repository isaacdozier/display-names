//
//Copyright: 2016
//Author: Isaac Dozier
//Email: idoz.wow@gmail.com
//


//Builder function
function capFullName(full_name, lang){
  var clean_name_arr = full_name.trim().toLowerCase().split(" ");
  
  var new_name;
  var surBackCaps;
  var surLower;
  
  var apo = ["'"];
  var default_language = "eng";
  
  //language patches in progress
  var surNames = [
    {lang:"eng",
     backCaps:["mc","mac","nic"],
     lower:["y","von","van","de"]},
    
    {lang:"del",
     backCaps:["mc","mac","nic"],
     lower:["y","van","de"]},
  ];
  
  var langIndex = function(){
    var tmp;
    for(var i = 0;i<surNames.length;i++){
      if(default_language === surNames[i].lang){
        tmp = surNames.indexOf(default_language);
      } else {
        //extra backup default language [eng/english]
        tmp = 0;
      }
    } 
    return tmp;
  };
  console.log(langIndex());
  
  var sup = function(){
    
    var tmp = false;
    
    for(var i = 0;i < surNames.length;i++){
      if(surNames[i].lang === lang){
        
        surBackCaps = surNames[i].backCaps;
        surLower = surNames[i].lower;
        tmp = true;
        
      } else if (!lang){
        
        surBackCaps = surNames[langIndex()].backCaps;
        surLower = surNames[langIndex()].lower;
        tmp = true;
        
      }
    }  
    
    return tmp;
    
  };
  
  console.log(sup());
  
  var new_arr = clean_name_arr.map(function(a){
    
    var tmp;
    var frontName;
    var middleName;
    var backName;
    
    var checkLang = function(){
      
    };
    
    if(arrayStartsValue(surBackCaps,a) && sup()){
      
      for(var i = 0;i < surBackCaps.length;i++){
        if(a.startsWith(surBackCaps[i])){
          backName = a.slice(surBackCaps[i].length, a.length);
          tmp = a.replace(surBackCaps[i], oneWordUpper(surBackCaps[i]));
        } 
      }
      
      tmp = tmp.replace(backName, oneWordUpper(backName));
      
    } else if(arrayInValue(apo,a)){
      
      frontName = a.slice(0, a.search(apo));
      backName = a.slice(a.search(apo)+1, a.length);
      
      tmp = a.replace(frontName, oneWordUpper(frontName));
      
      if(a.charAt(a.search(apo)-1) !== a.charAt(a.search(apo)+1)){
        tmp = tmp.replace(backName, oneWordUpper(backName));
      }
       
    } else if(arrayIsValue(surLower,a) && sup()){
      
      tmp = a;
      
    } else {
      
      tmp = oneWordUpper(a);
      
    }
    return tmp;
  }); 
  
  new_name = new_arr.join(" ");
  
  return new_name;
}

//helper functions
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

function arrayInValue(array, value){
  var tmp = false;
  for(var i=0; i < array.length;i++){
    if(value.includes(array[i])){
      tmp = true;
    }
  }
  return tmp;
}

function arrayIsValue(array, value){
  var tmp = false;
  for(var i=0; i < array.length;i++){
    if(value===array[i]){
      tmp = true;
    }
  }
  return tmp;
}
