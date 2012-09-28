TediousPooler
=============
tedious pooler have the same settings 

Exemple:
----
```javascript
var TediousPooler = require('TediousPooler'),
    config = {
       userName: 'test',
       password: 'test',
       server: '192.168.1.210',
    },
    pooler = new TediousPooler(config),
    Request = require('tedious').Request;

for(var i = 0; i<15; i++)
{
   var request = new Request("select 42, 'hello world'", function(err, rowCount) {
      if (err) {
         console.log(err);
      } 
      else {
         console.log(rowCount + ' rows');
      }
   });
   pooler.execute(function(connection){ connection.callProcedure(request);});
}
```
