var mysql = require('mysql');
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'zxcvbnm123456',
  database : 'testnode'
});
 
//pool.connect(function(err){
//	if(err){
//		console.log(err);
//		return;
//	}else{
//		console.log('数据库连接成功')
//	}
//});//链接
// 
////connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
////if (error) throw error;
////console.log('The solution is: ', results[0].solution);
////});
//connection.query( 'SELECT * FROM user', function(err, results, fields) {
//   if (err) {
//          console.log(err);
//    }else{
//          console.log(results);
//    }
//})
function query(sql, inParams, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            return callback(err);
        }
        conn.query(sql, inParams, function (err, res) {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
            conn.release();
        });
    });
}

function realQuery(sql, inParams, callback) {
    try {
        query(sql, inParams, callback);
    } catch (e) {
        console.log('sql:', e);
    }
}

exports.query = realQuery;