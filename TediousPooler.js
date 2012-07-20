var poolModule = require('generic-pool')
  , Connection = require('tedious').Connection;

exports = module.exports = TediousPooler;


function TediousPooler(config) {
	this.pool = poolModule.Pool({
		name     : 'tedious',
		create   : function(callback) {
			var connection = new Connection(config);
			connection.on('connect', function(err) {
				  if (err) {
					cosnole.log(err);
				  }
				  else {
				  	callback(null, connection);
				  }
			});
		},
		destroy  : function(client) { connection.close(); },
		max      : 10,
		idleTimeoutMillis : 30000
	});
}


TediousPooler.prototype.execSql = function(request) {
	this.pool.acquire(function(err, connection) {
		connection.execSql(request);
	});
}

TediousPooler.prototype.execSqlBatch = function(request) {
	this.pool.acquire(function(err, connection) {
		connection.execSqlBatch(request);
	});
}

TediousPooler.prototype.execute = function(request, parameters) {
	this.pool.acquire(function(err, connection) {
		connection.execute(request, parameters);
	});
}

TediousPooler.prototype.prepare = function(request) {
	this.pool.acquire(function(err, connection) {
		connection.prepare(request);
	});
}


TediousPooler.prototype.unprepare = function (request) {
	this.pool.acquire(function(err, connection) {
		connection.unprepare(request);
	});
}

TediousPooler.prototype.callProcedure = function(request) {
	this.pool.acquire(function(err, connection) {
		connection.callProcedure(request);
	});
}


