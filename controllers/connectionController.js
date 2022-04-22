const model = require('../models/connection');
const user =require('../models/user');
exports.index = (req, res,next)=>{
    //res.send('send all stories');
    let id= req.session.user;
    model.find()
    .then(connections=> 
        user.findById(id)
        .then(user=>  res.render('./connection/index', {connections,user}))
        .catch(err=>next(err))
      )
    .catch(err=>next(err))
 
};


exports.new = (req, res)=>{
    let id = req.session.user;
    user.findById(id)
    .then(user=>res.render('./connection/new',{user}))
    .catch(err=>next(err))
    
};

exports.create = (req, res,next)=>{
    let connection = new model(req.body);//create a new connection document
    connection.author = req.session.user;
    connection.save()//insert the document to the database
    .then(connection=> {
        req.flash('success', 'Connection has been created successfully');
        res.redirect('/connections');
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
        req.flash('error', err.message);
        return res.redirect('/back');
        }
        next(err);
    });
  
};


exports.show = (req, res, next)=>{
    let userid = req.session.user;
   
    let id = req.params.id;
    model.findById(id).populate('author', 'firstName lastName')
    .then(connection=>{
        if(connection) {       
            user.findById(userid)
            .then(user=>  res.render('./connection/show', {connection,user}))
            .catch(err=>next(err));
            
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
   
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    model.findById(id)
    .then(connection=>{
        return res.render('./connection/edit', {connection});
    })
    .catch(err=>next(err));

};


exports.update = (req, res, next)=>{
    let connection = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, connection, {useFindAndModify: false, runValidators: true})
    .then(connection=>{
        req.flash('success', 'Connection has been Updated successfully');
        return res.redirect('/connections/'+id);
    })
    .catch(err=> {
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('/back');
        }
        next(err);
    });

};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(connection =>{
        req.flash('success', 'Connection has been Deleted successfully');
        res.redirect('/connections');
    })
    .catch(err=>next(err));
};
