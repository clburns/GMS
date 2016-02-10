var fs              = require ('fs'),
    express         = require('express'),
    session         = require('express-session'),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    app             = express(),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    morgan          = require('morgan'),
    server          = require('http').Server(app),
    sharedSession   = require('express-socket.io-session'),
    io              = require('socket.io')(server);

mongoose.connect('mongodb://localhost/gm2');


require('./server/config/passport')(passport);

app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


//var User = require('./server/models/user');
//var Forum = require('./server/models/forum');
//var Thread = require('./server/models/thread');
//var Post = require('./server/models/post');
//
//var bob = new User({local : {username: "bob", email:"bob@test.com", roles: ["admin"] }});
//bob.local.password = bob.generateHash("bob");
//var F = new Forum({title: "Forum 1", description: "General Forum", isVisible: true, urlName: "forum1", displayOrder: 1});
//var F2 = new Forum({title: "Forum 2", description: "General Forum", isVisible: true, urlName: "forum2", displayOrder: 2});
//var T = new Thread({createdBy: bob._id, forumId: F._id, title: "Thread 1 in Forum 1", isVisible: true, urlName:"t1", locked: false, isSticky: false });
//var T2 = new Thread({createdBy: bob._id, forumId: F._id, title: "Thread 2 in Forum 1", isVisible: true, urlName:"t2", locked: false, isSticky: false });
//var T3 = new Thread({createdBy: bob._id, forumId: F2._id, title: "Thread 1 in Forum 2", isVisible: true, urlName:"t3", locked: false, isSticky: false });
//var P = new Post({createdBy: bob._id, threadId: T._id, content: {isQuote: false, message: "Post in Thread 1 in Forum 1"}, isVisible: true});
//var P2 = new Post({createdBy: bob._id, threadId: T2._id, content: {isQuote: false, message: "Post in Thread 2 Forum 1"}, isVisible: true});
//var P3 = new Post({createdBy: bob._id, threadId: T3._id, content: {isQuote: false, message: "Post in Thread 1 Forum 2"}, isVisible: true});
//F.save();
//F2.save();
//T.save();
//T2.save();
//T3.save();
//P.save();
//P2.save();
//P3.save();
//bob.save();
//console.log("save");


//load all files in models dir - models
fs.readdirSync(__dirname + '/server/models').forEach(function(filename){
    if (~filename.indexOf('.js')) require(__dirname + '/server/models/' + filename)
});

//load all files in routes dir - api
fs.readdirSync(__dirname + '/server/routes').forEach(function(filename){
    if (~filename.indexOf('.js')) require(__dirname + '/server/routes/' + filename)(app)
});

app.get('*', function(req, res){
    res.sendFile(__dirname + '/public/views/index.html');
});

server.listen(3000);

io.use(sharedSession(session));
io.on('connection', function(socket){
    console.log("connected");
});