//
//Copyright: 2016
//Author: Isaac Dozier
//Email: idoz.wow@gmail.com
//


//Builder function
function capFullName(full_name, lang){
  var clean_name = full_name.trim().toLowerCase();
  var clean_name_arr = clean_name.split(" ");
  
  var new_name;
  var surBackCaps;
  var surLower;
  var surLowerBefore;
   
  var apo = ["'"];
  var default_language = "eng";
  var surNames = [
    {lang:"eng",
     upperSur:["mc","mac","nic"],
     lower:["y","de"],
     lowerBefore:["de la"]},
    
    {lang:"fre",
     upperSur:["mc","mac","nic"],
     lower:["y","van","von","de"],
     lowerBefore:["de la"]},
    
    {lang:"dut",
     upperSur:["mc","mac","nic"],
     lower:["y","van","von","de","den","der"],
     lowerBefore:["de la"]},
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
  
  //find language surname rules
  var langeSurNames = function(){
    var tmp = false;
    for(var i = 0;i < surNames.length;i++){
      if(surNames[i].lang === lang && lang){
        surBackCaps = surNames[i].upperSur;
        surLower = surNames[i].lower;
        surLowerBefore = surNames[i].lowerBefore;
        tmp = true;
      } else if (!lang){
        surBackCaps = surNames[langIndex()].upperSur;
        surLower = surNames[langIndex()].lower;
        surLowerBefore = surNames[langIndex()].lowerBefore;
        tmp = true;
      }
    } 
    return tmp;
  };
  
  langeSurNames();
  
  //match and join surname compund rules 
  //ie. 'de La'
  var compoundIt = function(){
    var tmp;
    var clean_tmp = clean_name_arr;
    for(var i = 0;i<clean_tmp.length;i++){
      var first = clean_tmp[i];
      var second = clean_tmp[i+1];
      
      if(arrayIsValue(surNames[langIndex()].lowerBefore,first+" "+second)){
        tmp = first+" "+oneWordUpper(second);
      }
    }
    return tmp;
  };
  compoundIt();
  
  console.log(compoundIt());
  
  //final build name array
  var new_arr = clean_name_arr.map(function(a){

    var tmp;
    var frontName;
    var middleName;
    var backName;
    
    if(arrayStartsValue(surBackCaps,a) && langeSurNames){
      //
      //Mostly sorts compund names for:
      //Irish ie. McDonald,MacDonald
      //Dutch
      //English
      //
      for(var i = 0;i < surBackCaps.length;i++){
        if(a.startsWith(surBackCaps[i])){
          backName = a.slice(surBackCaps[i].length, a.length);
          tmp = a.replace(surBackCaps[i], oneWordUpper(surBackCaps[i]));
        } 
      }
      
      tmp = tmp.replace(backName, oneWordUpper(backName));
      
    } else if(arrayInValue(apo,a)){
      //
      //default for all languages currently [to be patched later]
      //Splits compound names with apostrophe [']
      //French ie. D'Hosier
      //
      
      frontName = a.slice(0, a.search(apo));
      backName = a.slice(a.search(apo)+1, a.length);
      
      tmp = a.replace(frontName, oneWordUpper(frontName));
      
      if(a.charAt(a.search(apo)-1) !== a.charAt(a.search(apo)+1)){
        //
        //only capitalize if before/after chars !==
        //ie. Ma'asara
        //
        tmp = tmp.replace(backName, oneWordUpper(backName));
      }
       
    } else if(arrayIsValue(surLower,a) && langeSurNames){
      //
      //leaves sur-names lowercase for:
      //Spanish ie. 'y'
      //
      tmp = a;
      
    } else if(surLowerBefore === a && langeSurNames){
      //
      //leaves leading sur-names lowercase for:
      //french ie. 'de LA'
      //
      var low = surLowerBefore[0];
      var up  = oneWordUpper(surLowerBefore[1]);
      
      tmp = a.replace(surLowerBefore, low+up);
      
    } else {
      //
      //Default Capitalization
      //
      tmp = oneWordUpper(a);
      
    }
    return tmp;
  }); 
  
  //join final name array
  new_name = new_arr.join(" ");
  
  //return new name
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
