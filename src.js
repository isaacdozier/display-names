//
//Copyright: 2016
//Author: Isaac Dozier
//Email: idoz.wow@gmail.com
//


//Builder function
function capFullName(full_name, lang){
  var clean_name = full_name.trim().toLowerCase();
  var clean_name_arr = clean_name.split(" ");
  
  var new_name_arr;
  var new_name;
  
  var apo;
  var surBackCaps;
  var surLower;
  var surLowerBoth;
  var surLowerBefore;
   
  var default_language = "eng";
  var surNames = [
    {lang:"eng",
     apo:["'"],
     upperSur:["mc","mac","nic"],
     lower:["y","von"],
     lowerBoth:["van de","van der","van den","van het","van 't"],
     lowerBefore:["de la"]},
    
    {lang:"fre",
     apo:["'"],
     upperSur:["mc","mac","nic"],
     lower:["y","von"],
     lowerBoth:["van de","van der","van den"],
     lowerBefore:["de la"]}
  ];
  
  //call to check for language argument
  var langIndex = function(){ 
    var tmp;
    
    for(var i=0;i<surNames.length;i++){
      if(surNames[i].lang === lang){
        tmp = i;
      }
    }
    
    if(!tmp){
      //default language set to 0 for eng/english
      tmp = 0;
    }
    
    return tmp;
  };
  
  //set language surname rules
  var langeSurNames = function(index){
    if(index !== ''){
      apo            = surNames[index].apo;
      surBackCaps    = surNames[index].upperSur;
      surLower       = surNames[index].lower;
      surLowerBoth   = surNames[index].lowerBoth;
      surLowerBefore = surNames[index].lowerBefore;
      return true;
    } else {
      return false;
    }
  };
  
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
  
  var setSurNames = langeSurNames(langIndex());
  
  //final build name array
  new_name_arr = clean_name_arr.map(function(a){
    
    var tmp;
    var frontName;
    var middleName;
    var backName;
    
    var first = clean_name_arr[clean_name_arr.indexOf(a)];
    var second = clean_name_arr[clean_name_arr.indexOf(a)+1];
    var surLowerBefore = arrayIsValue(surNames[langIndex()].lowerBefore,first+" "+second);
    var surLowerBoth = arrayIsValue(surNames[langIndex()].lowerBoth,first+" "+second);
      
    
    if(arrayStartsValue(surBackCaps,a) && setSurNames){
      //Mostly sorts compund names for:
      //Irish ie. McDonald,MacDonald
      //Dutch
      //English
      for(var i = 0;i < surBackCaps.length;i++){
        if(a.startsWith(surBackCaps[i])){
          backName = a.slice(surBackCaps[i].length, a.length);
          tmp = a.replace(surBackCaps[i], oneWordUpper(surBackCaps[i]));
        } 
      }
      
      tmp = tmp.replace(backName, oneWordUpper(backName));
      console.log("1: "+tmp);
      
    } else if(arrayInValue(apo,a) && setSurNames){
      //default for all languages currently [to be patched later]
      //Splits compound names with apostrophe [']
      //French ie. D'Hosier
      frontName = a.slice(0, a.search(apo));
      backName = a.slice(a.search(apo)+1, a.length);
      
      //Cap frontName
      tmp = a.replace(frontName, oneWordUpper(frontName));
      
      //Cap backName
      if(a.charAt(a.search(apo)-1) !== a.charAt(a.search(apo)+1)){
        //BUT only capitalize if before/after chars !==
        //ie. Ma'asara is left alon
        //but D'Hosier is capitalized
        tmp = tmp.replace(backName, oneWordUpper(backName));
      }
      //testing
      console.log("2: "+tmp);
       
    } else if(arrayIsValue(surLower,a) && setSurNames){
      //leaves sur-names lowercase for:
      //Spanish ie. 'y'
      tmp = a;
      //testing
      console.log("3: "+tmp);
      
    } else if(surLowerBefore && setSurNames){
      //leaves leading sur-names lowercase for:
      //french ie. 'de La'    
      tmp = first+" "+oneWordUpper(second);
      new_name_arr = clean_name_arr.shift();
      //testing
      console.log("4: "+tmp);
      
    } else if(surLowerBoth && setSurNames){
      //leaves leading sur-names lowercase for:
      //french ie. 'de La'    
      tmp = first+" "+second;
      new_name_arr = clean_name_arr.shift();
      //testing
      console.log("5: "+tmp);
      
    } else {
      //Default Capitalization
      tmp = oneWordUpper(a);
      //testing
      console.log("6: "+tmp);
      
    }
    
    return tmp;
  }); 
  
  //join final name array
  new_name = new_name_arr.join(" ");
  
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
