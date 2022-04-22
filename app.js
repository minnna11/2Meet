//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const connectionRoute = require('./routes/connectionRoute');
const userRoutes = require('./routes/userRoutes');
const generalRoutes = require('./routes/generalRoutes');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const flash = require('connect-flash');
//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
let url ='mongodb://localhost:27017/NBAD'
app.set('view engine', 'ejs');

//connect to mongoDB
mongoose.connect('mongodb://localhost:27017/NBAD', 
                {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    //start the server
    app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
})
})
.catch(err=>console.log(err))

//mount middleware
app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/NBAD'}),
        cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());

app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));

//to use methods
app.use(methodOverride('_method'));

//set up routes
// app.get('/',(req,res)=>{
//     res.render('index');
// });
// app.get('/about',(req,res)=>{
//     res.render('about');
// });
// app.get('/contact',(req,res)=>{
//     res.render('contact');
// });

app.use('/',generalRoutes);
app.use('/connections',connectionRoute);
app.use('/users', userRoutes);
//error handling
app.use((req,res,next)=>{
    let err = new Error('The server cannot locate' + req.url);
    err.status = 404;
    next(err);
})

app.use((err,req,res,next)=>{
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error',{error:err});
});

//start the servers
// app.listen(port,host,()=>{
//     console.log('Server is running on port '+port);
// })