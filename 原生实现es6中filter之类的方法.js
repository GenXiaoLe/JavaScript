<script>

  // filter
  Array.prototype.filter = function(result) {
  
    var _array = [];
    
    var _self = this;
    
    for(var i = 0; i < _self.length; i++) {
    
      if (result(_self[i])) {
        _array.push(_self[i]);
      }
    
    }
    
    return _array;
  
  }
  
  var newArray = [1, 2, 3, 4, 5].filter(function(i) {
    return i != 1;
  });
  
  console.log(newArray);
  
  // some
  Array.prototype.some = function(result) {
  
    var item;
    
    var _self = this;
    
    for(var i = 0; i < _self.length; i++) {
    
      if (result(_self[i])) {
        item = _self[i];
      }
    
    }
    
    return item;
  
  }
  
  var newArray2 = [1, 2, 3, 4, 5].some(function(i) {
    return i === 1;
  });
  
  console.log(newArray2);
  
  // find
  Array.prototype.find = function(result) {
  
    var item;
    
    var _self = this;
    
    for(var i = 0; i < _self.length; i++) {
    
      if (result(_self[i])) {
        item = _self[i];
        break;
      }
    
    }
    
    return item;
  
  }
  
  var newArray3 = [1, 2, 3, 4, 5].find(function(i) {
    return i >2;
  });
  
  console.log(newArray3);
  

<script/>
