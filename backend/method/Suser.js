var mysql = require('mysql');
var database = require('../models/database');
var pool = mysql.createPool(database.pool);

module.exports = {
    //获取分类
    getSort:function getSort(){     
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                var getSort_sql = 'select * from label';
                connection.query(getSort_sql,function(err,result){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(result);
                    }
                    connection.release();
                })
            })
        })
    },
    //获取相关商家
    getRecruit:function getRecruit(sort){     
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                var getRecruit_sql = 'select * from msg_recruit where sort =?';
                connection.query(getRecruit_sql,[sort],function(err,result){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(result);
                    }
                    connection.release();
                })
            })
        })
    },
    //获取商家详情
    detail_Recruit:function detail_Recruit(id){     
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                var detail_Recruit_sql = 'select * from msg_recruit where id = ?';
                connection.query(detail_Recruit_sql,[id],function(err,result){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(result);
                    }
                    connection.release();
                })
            })
        })
    },
    //注册信息获取
    set_Recruit:function set_Recruit(username){     
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                var set_Recruit_sql = 'select * from user_seeker where username = ?';
                connection.query(set_Recruit_sql,[username],function(err,result){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(result);
                    }
                    connection.release();
                })
            })
        })
    },
    //注册信息修改
    UpdateSet:function UpdateSet(data,username){     
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                var UpdateSet_sql = 'update user_seeker set password =?,phone=?,email=? where username=?';
                connection.query(UpdateSet_sql,[data.password,data.phone,data.email,username],function(err,result){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(result.affectedRows);
                    }
                    connection.release();
                })
            })
        })
    },
    //个人简历获取
    ResumeMsg:function ResumeMsg(username){     
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                var ResumeMsg_sql = 'select * from msg_seeker where username = ?';
                connection.query(ResumeMsg_sql,[username],function(err,result){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(result);
                    }
                    connection.release();
                })
            })
        })
    },
    //个人简历修改
    UpdateResume:function UpdateResume(data,username){     
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                var UpdateResume_sql = 'update msg_seeker set sex =?,sort=?,job=?,money=?,school=?,tel=?,age=?,detail=?,name=? where username =?';
                connection.query(UpdateResume_sql,[data.sex,data.sort,data.job,data.money,data.school,data.tel,data.age,data.detail,data.name,username],function(err,result){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(result.affectedRows);
                        console.log(result.affectedRows);
                    }
                    connection.release();
                })
            })
        })
    },
    //上传头像
    UpdateImg:function UpdateImg(username,savepath){     
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                var UpdateImg_sql = 'update msg_seeker set img=? where username=?';
                connection.query(UpdateImg_sql,[savepath,username],function(err,result){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(result.affectedRows);
                    }
                    connection.release();
                })
            })
        })
    },
    //获取轮播图
    getImg_seeker:function getImg_seeker(){     
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                var getImg_seeker_sql = 'select * from img_admin';
                connection.query(getImg_seeker_sql,function(err,result){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(result);
                    }
                    connection.release();
                })
            })
        })
    },
    //投递简历
    SendResume:function SendResume(data){     
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                var SendResume_sql = 'insert into resume(r_username,s_username,r_id) values(?,?,?)';
                connection.query(SendResume_sql,[data.r_username,data.s_username,data.r_id],function(err,result){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(result.affectedRows);
                    }
                    connection.release();
                })
            })
        })
    },
    //已投递
    getRid:function getRid(s_username){
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                var getRid_sql = 'select * from resume where s_username=?';
                connection.query(getRid_sql,[s_username],function(err,result){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(result);
                        console.log(result);
                    }
                    connection.release();
                })
            })
        })
    },
    alreadySend:function alreadySend(r_id){
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                var alreadySend_sql = 'select * from msg_recruit where id=?';
                connection.query(alreadySend_sql,[r_id],function(err,result){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(result);
                    }
                    connection.release();
                })
            })
        })
    },
    //收藏
    Collect_seeker:function Collect_seeker(s_username,r_id){
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                var Collect_seeker_sql = 'insert into collect_seeker(s_username,r_id) values(?,?)';
                connection.query(Collect_seeker_sql,[s_username,r_id],function(err,result){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(result.affectedRows);
                    }
                    connection.release();
                })
            })
        })
    },
    //获取收藏列表
    getCollect_seeker:function getCollect_seeker(s_username){
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                var getCollect_seeker_sql = 'select * from collect_seeker where s_username = ?';
                connection.query(getCollect_seeker_sql,[s_username],function(err,result){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(result);
                    }
                    connection.release();
                })
            })
        })
    },
    getCollect_msg:function getCollect_msg(r_id){
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                var getCollect_msg_sql = 'select * from msg_recruit where id = ?';
                connection.query(getCollect_msg_sql,[r_id],function(err,result){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(result);
                    }
                    connection.release();
                })
            })
        })
    },
    //取消收藏
    delCollect:function delCollect(r_id){
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                var delCollect_sql = 'delete from collect_seeker where r_id =?';
                connection.query(delCollect_sql,[r_id],function(err,result){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(result.affectedRows);
                    }
                    connection.release();
                })
            })
        })
    },
    //搜索
    Search:function Search(keyword){
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                var Search_sql = "select * from msg_recruit where username like '%"+keyword+"%' or job like'%"+keyword+"%'";
                connection.query(Search_sql,function(err,result){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(result);
                    }
                    connection.release();
                })
            })
        })
    },
    //获取附近发布
    Getnear:function Getnear(){
        return new Promise(function(resolve,reject){
            pool.getConnection(function(err,connection){
                var Getnear_sql = "select * from near";
                connection.query(Getnear_sql,function(err,result){
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        resolve(result);
                    }
                    connection.release();
                })
            })
        })
    },

}