const model = require('../models/connection');
const user =require('../models/user');
exports.index = (req, res,next)=>{
    let id = req.session.user;
    user.findById(id)
    .then(user=>res.render('index',{user}))
    .catch(err=>next(err))
 
};


exports.contact = (req, res)=>{
    //res.render('./general/contact');
    let id = req.session.user;
    user.findById(id)
    .then(user=>res.render('./general/contact',{user}))
    .catch(err=>next(err))
    
};

exports.about = (req, res,next)=>{
    let id = req.session.user;
    user.findById(id)
    .then(user=>res.render('./general/about',{user}))
    .catch(err=>next(err))
  
};

