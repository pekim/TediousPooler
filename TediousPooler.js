var util = require('util'),
    events = require('events'),
    PoolModule = require('generic-pool');
//    Connection = require('tedious').Connection;

function TediousPooler(settings) {
   var self = this;
   this.logger = settings.logger || {log:function(level, message){ console.log(level+':'+message);}};
   
   var param = {
      name: settings.name,
      create: function(callback) {
	 var ref = this,
             connection = new Connection(settings);

         connection.on('connect', function(err) {
            console.log('connected');
            if (err) {
               self.logger.log("TediousPooler :"+err,'error'); 
            }
	    else {
               callback(null, connection);
               connection.on('reusable', function() {
                  self.pool.release(connection);
               });
            }
         });
      },
      destroy: function(client) {
         client.close();
      },
      max: settings.max,
      min: 1,
      idleTimeoutMillis: settings.idleTimeoutMillis
   };

   this.pool = PoolModule.Pool(param);
}
exports = module.exports = TediousPooler;
util.inherits(TediousPooler, events.EventEmitter);


TediousPooler.prototype.execute = function(callback) {
   var ref = this;
   this.pool.acquire(function(err, connection) {
      if(err) {
         self.looger.log("TediousPooler :"+err,'error');
      }
      else {
         callback(connection);
      }
   });
}
