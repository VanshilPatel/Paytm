const jwt = require('jsonwebtoken');
import { JWT_SECRET } from "../config";


function authMiddleware(req,res,next){
    let authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }
    try{
        token = authHeader.replace('Bearer', '');
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;

        next();
    }
    catch{
        res.json({message : "Invalid token"}).status(401);
    }


  module.exports = {
    authMiddleware
}

}