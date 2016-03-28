function capFullName(full_name){
  var clean_name = full_name.toLowerCase();
  var new_name;
  var other = ["'"];
  
  var new_arr = clean_name.split(" ").map(function(a){
    return a.replace(other, other+" ");
  }).join(" ").split(" ");
  
  var new_caps = new_arr.map(function(subName){
    var nameCaps;
    
    nameCaps = subName.charAt(0).toUpperCase();
    nameCaps = nameCaps.concat(subName.slice(1,subName.length));
    
    return nameCaps;
    
  });
  
  new_name = new_caps.join(" ").split("' ");
  new_name = new_name.join("'");
  
  return new_name;
}
