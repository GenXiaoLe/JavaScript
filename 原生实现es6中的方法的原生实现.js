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

  // class原生实现
  let Person = (function() {
    const Person = function(name) {
      
      if (typeof new.target === 'undefined') {
        throw new Error('必须通过实例化调用');
      }
      
      this.name = name;
    }
    
    Object.defineProperty(Person.pertotype, 'sayName', function() {
      value: function() {
        if (typeof new.target !== 'undefined') {
          throw new Error('必须不通过实例化调用');
        }
        
        console.log(this.name);
      },
      enumerable: false,
      writable: true,
      configgurable: true
    });
    
    return Person;
  })();

  let XMing = new Person('XMing');
  XMing.sayName(); // XMing
  
  // es6 class
  let Person2 = class Person2 {
    constructor(name) {
      this.name = name;
    }
    
    sayName() {
      console.log(this.name);
    }
  }
  
  let XHong = new Person2('XHong');
  XHong.sayName(); // XHong

  // new.target只有实例方法内使用 指向实例方法
<script/>
