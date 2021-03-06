var mysql = require('mysql');

var database = require('./database');
var pool = mysql.createPool(database.pool);
//var AdminS = database.User;
var DB_NAME = database.name;

pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1'); 
});  

function AdminS(admin){
    this.username = admin.username;
    this.password = admin.password;
    this.age = admin.age;
    this.status = admin.status;
};

module.exports = AdminS;

pool.getConnection(function(err, connection) {

    var useDbSql = "USE " + DB_NAME;
    connection.query(useDbSql, function (err) {
         if (err) {
            console.log("USE Error: " + err.message);
            return;
         }
         console.log('USE succeed');
    });

    //保存数据
    AdminS.prototype.save = function save(admin,callback) {

        console.log(admin.username);
        pool.getConnection(function (err, connection) {

            console.log('??????????????????????????'+admin.userpass+admin.username);
            var insertUser_Sql = "INSERT INTO user_seeker(username,password) VALUES(?,?)";

            connection.query(insertUser_Sql, [admin.username, admin.userpass], function (err, result) {

                connection.release();
                if(err){
                    console.log('[INSERT ERROR] - ',err.message);   
                    return;
                }
           
                console.log('----------INSERT-------------');
                console.log('INSERT affectedRows',result.affectedRows);
                console.log('******************************');
                callback(err,result);
            });
        });
    };

    //修改数据
    AdminS.prototype.updateData = function updateData(username,property,updata,callback){
        pool.getConnection(function(err,connection){

            var updateUser_Sql = "UPDATE user_seeker SET "+property+" = ? WHERE username = ?";
            var userModSql_Params;

            if(updata.password){
                userModSql_Params = [updata.password,username];
            }
            if(updata.age){
                userModSql_Params = [updata.age,username];
            }

            connection.query(updateUser_Sql,userModSql_Params,function (err, result) {

                if(err){
                      console.log('[UPDATE ERROR] - ',err.message);   
                      return;
                }
             
               console.log('----------UPDATE-------------');
               console.log('UPDATE affectedRows',result.affectedRows);
               console.log('******************************');
            })
        })
    }

    //删除数据
    AdminS.prototype.deleteData = function deleteData(username,callback){
        pool.getConnection(function(err,connection){
            var deleteUser_Sql = "DELETE FROM user_seeker WHERE username = ?";
            
            console.log('111111111111111111'+username);

            connection.query(deleteUser_Sql, [username] , function (err, result) {
                
                if(err){
                    console.log('[DELETE ERROR] - ',err.message);
                    return;
                }

                callback(err,result);
           
                console.log('----------DELETE-------------');
                console.log('DELETE affectedRows',result.affectedRows);
                console.log('******************************');
                connection.release();
            });
        })
    }

    //根据用户名得到用户数量
    AdminS.getUserNumByName = function getUserNumByName(username, callback) {

        pool.getConnection(function (err, connection) {

            var getUserNumByName_Sql = "SELECT COUNT(1) AS num FROM user_seeker WHERE username = ?";

            connection.query(getUserNumByName_Sql, [username], function (err, result) {
                callback(err,result);

                connection.release();
                if (err) {
                    console.log("getUserNumByName Error: " + err.message);
                    return;
                }

                console.log("invoked[getUserNumByName]");
                //callback(err, result);
            });
        });
    };

    //根据用户名得到用户信息
    AdminS.getUserByUserName = function getUserNumByName(username, callback) {
        console.log('use database admin-seeker');
        pool.getConnection(function (err, connection) {
            var getUserByUserName_Sql = "SELECT * FROM user_seeker WHERE username = ?";
            var getUserByUserName_Sql1 = "SELECT * FROM user_seeker";

            //如果username存在，则返回相关用户信息
            if(username != undefined){
                connection.query(getUserByUserName_Sql, [username], function (err, result) {  
                    if (err) {
                        console.log("getUserByUserName Error: " + err.message);
                        return;
                    }
                    console.log("invoked[getUserByUserName]");
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
            //如果username不存在，则返回全部用户信息
            if(username == undefined){
                console.log('undefined!!!!!!!!!!11');
                connection.query(getUserByUserName_Sql1, function (err, result) {  
                    if (err) {
                        console.log("getUserByUserName Error: " + err.message);
                        return;
                    }
                    console.log("invoked[getUserByUserName]");
                    callback(err, result);
    
                    //当连接不再使用时，用connection对象的release方法将其归还到连接池中
                    connection.release();
                });
            }
        });
    };
 
});