//
//    Copyright: 2016
//    Author: Isaac Dozier
//    Email: idoz.wow@gmail.com
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
//


//Main Call functions
function capFullName(full_name, lang){
  var clean_name = full_name.trim().toLowerCase();
  var clean_name_arr = clean_name.split(" ");
  
  var new_name_arr;
  var new_name;
   
  var default_language = "eng";
  var surNames = [
    {lang:"eng",
     apo:["'","-"],
     upperSur:["mc","mac","nic"],
     lower:["y","von"],
     lowerBoth:["van de","van der","van den","van het","van 't"],
     lowerBefore:["de la"]},
    
    {lang:"fre",
     apo:["'","-"],
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
  
  //final build name array
  new_name_arr = clean_name_arr.map(function(a){
    
    var tmp;
    var frontName;
    var middleName;
    var backName;
    
    var first  = clean_name_arr[clean_name_arr.indexOf(a)];
    var second = clean_name_arr[clean_name_arr.indexOf(a)+1];
    
    var surA       = surNames[langIndex()].apo;
    var surU       = surNames[langIndex()].upperSur;
    var surL       = surNames[langIndex()].lower;
    var surLBefore = surNames[langIndex()].lowerBefore;
    var surLBoth   = surNames[langIndex()].lowerBoth;
    
    var surApo         = arrayInValue(surA,a);
    var surUpper       = arrayStartsValue(surU,a);
    var surLower       = arrayIsValue(surL,a);
    var surLowerBefore = arrayIsValue(surLBefore,first+" "+second);
    var surLowerBoth   = arrayIsValue(surLBoth,first+" "+second);
    
     if(surApo){
      //default for all languages currently [to be patched later]
      //Splits compound names with apostrophe and hyphen
      //French ie. D'Hosier
      //Other  ie. Anderson-Johnson
      
      for(var ii = 0; ii < surA.length;ii++){
      
        if(a.includes(surA[ii])){
          frontName = a.slice(0, a.search(surA[ii]));
          backName = a.slice(a.search(surA[ii])+1, a.length);
          //Cap frontName
          tmp = a.replace(frontName, oneWordUpper(frontName));
        
          if(a.charAt(a.search(surA[ii])-1) !== a.charAt(a.search(surA[ii])+1)){
            //BUT only capitalize if before/after chars !==
            //ie. Ma'asara is left alone
            //but D'Hosier is capitalized
            tmp = tmp.replace(backName, oneWordUpper(backName));
          }
        }
      }
      
      //testing
      console.log("1: "+tmp);
       
    } else if(surUpper){
      //Mostly sorts compund names for:
      //Irish ie. McDonald,MacDonald
      //Dutch
      //English
      
      for(var i = 0;i < surU.length;i++){
        if(a.startsWith(surU[i])){
          backName = a.slice(surU[i].length, a.length);
          tmp = a.replace(surU[i], oneWordUpper(surU[i]));
        } 
      }
      
      tmp = tmp.replace(backName, oneWordUpper(backName));
      console.log("2: "+tmp);
      
    } else if(surLower){
      //leaves sur-names lowercase for:
      //Spanish ie. 'y'
      tmp = a;
      //testing
      console.log("3: "+tmp);
      
    } else if(surLowerBefore){
      //leaves leading sur-names lowercase for:
      //french ie. 'de La'    
      tmp = first+" "+oneWordUpper(second);
      new_name_arr = clean_name_arr.shift();
      //testing
      console.log("4: "+tmp);
      
    } else if(surLowerBoth){
      //leaves leading sur-names lowercase for:
      //french ie. 'de La'    
      tmp = first+" "+second;
      new_name_arr = clean_name_arr.splice(clean_name_arr.indexOf(first),2,tmp);
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
