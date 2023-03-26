const jwt = require('jsonwebtoken');


const authentication = (req,res,next) => {
    const token = req.headers.authorization
        if(token){
            jwt.verify(token,"pranay",(err,decode)=>{
                if(decode){
                    req.body.userID=decode.userID
                    next();
                }else{
                    res.send('login Require');
                }
            })
        }else{
            res.send('Login Required!')
        }
        
}


module.exports = {authentication};