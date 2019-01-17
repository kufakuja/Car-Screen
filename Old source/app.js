//Import modules
var express = require('express');           //Express for http server
var path = require('path');                 //Path for path concat functions
var swig = require('swig');                 //Swig for templating
var PythonShell = require('python-shell');  //Python-shell to execute python scripts
var bodyParser = require('body-parser');    //Body-Parser to correctly interpret 'post'
var scheduler = require('node-schedule');   //Node-Scheduler to schedule timed events
var fs = require('fs');                     //fs for file system access
var Player = require('play-sound')();       //Player for sound playback

var app = express();    //Initialise http server
var server = require('http').Server(app);
var io = require('socket.io')(server); //Start web socket server

//Page routes
var routes = require('./routes/index');

//Config files
var devices = require('./config/devices.json');
var schedule = require('./config/schedule.json');

var jobs = [];

//Executes an event given a device and function ID
function executeEvent(device, functionId){
    var action = devices[device].functions[functionId];
    if (action && action.type == "python")
    {
        console.log(device + ": " + action.name + " command received");
        var shell = new PythonShell(action.script);
        shell.end(function(err) {
            if(err)
            {
                console.log("Error running python script: " + err);
            }      
        });
    }
    else if(action && action.type == "player")
    {
        console.log(device + ": " + action.name + " command received");
        Player.play(action.src, function(err){
            if(err)
                console.log("Error playing mp3: " + err);
        })
    }
}

//Converts post data to the JSON format and stores it in the file
function addToSchedule(data){
    var addition = {};
    addition.name = data.Name;
    addition.time = data.Time;
    
    if(data.Repeating == 'true' && "days" in data)
        addition.repeating = data.days;
    else
        addition.repeating = "no";

    var x = 0;
    addition.actions = [];

    while("devices"+x.toString() in data) {
        var j = {
            device: data["devices"+x.toString()],
            action: data["actions"+x.toString()],
            delay: data["delay"+x.toString()]
        };
        
        addition.actions.push(j);
        x++;
    }

    schedule.push(addition);

    writeScheduleToFile();

    console.log("New scheduled action added");
}

//Writes Schedule data to the file
function writeScheduleToFile() {
    var json = JSON.stringify(schedule);
    fs.writeFile(path.join(__dirname, 'config/schedule.json'), json, 'utf8');
}

//Removes all scheduled jobs and recalculates them based on the schedule file
function recalculateJobs() {
    //Remove all jobs
    jobs.forEach(function(job){
        job.cancel();
    });
    
    jobs = [];
    
    //Then restart them
    schedule.forEach(function(item, index){
        var hm = item.time.split(":");
        var days = "";
        if (item.repeating == "no")
            days = "*"
        else {
            days += item.repeating.indexOf('Sunday') > -1    ? "0," : '' ;
            days += item.repeating.indexOf('Monday') > -1    ? "1," : '' ;
            days += item.repeating.indexOf('Tuesday') > -1   ? "2," : '' ;
            days += item.repeating.indexOf('Wednesday') > -1 ? "3," : '' ;
            days += item.repeating.indexOf('Thursday') > -1  ? "4," : '' ;
            days += item.repeating.indexOf('Friday') > -1    ? "5," : '' ;
            days += item.repeating.indexOf('Saturday') > -1  ? "6," : '' ;
            days = days.replace(/\,$/g, '');
        }
        
        /*item.actions.forEach(function(action, index) {
            jobs.push(scheduler.scheduleJob(hm[1]+" "+hm[0]+" * * "+days, function(a) {
                console.log("Executing scheduled event: "+hm[0]+":"+hm[1]+" - "+a.device+", "+a.action);
                setTimeout(function(){
                    executeEvent(a.device, a.action);
                }, Number(a.delay));
                
                
                
            }.bind(null,action)));
            
        });*/
        
        jobs.push(scheduler.scheduleJob(hm[1]+" "+hm[0]+" * * "+days, function(a) {
            a.forEach(function(action, index) {
                console.log("Executing scheduled event: "+hm[0]+":"+hm[1]+" - "+action.device+", "+action.action);
                setTimeout(function(){
                    executeEvent(action.device, action.action);
                }, Number(action.delay));
            });
            
            if(days == '*')
                removeJob(item.time, item.name);
        }.bind(null,item.actions)));
    });
    
    console.log("Jobs recalculated");
    
}

//Removes a scheduled job from the list.
function removeJob(time, name) {
    schedule = schedule.filter(function(item){
        return !(item.name == name && item.time == time);
    });
    writeScheduleToFile();
    recalculateJobs();
    io.emit('initialise', {devices: devices, schedule: schedule});
}

io.on('connection', function(socket) {
    socket.emit('initialise', {devices: devices, schedule: schedule});
    
    socket.on('action', function(data) {
        executeEvent(data.device, data.functionId);
    });
    
    socket.on('deleteSchedule', function(data) {
        removeJob(data.time, data.name);
        socket.emit('initialise', {devices: devices, schedule: schedule});
    });
    
    socket.on('editSchedule', function(data) {
        
    })
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Special post command for the schedule submissions
app.post('/schedule/add/submit', function(req, res, next) {
    addToSchedule(req.body);
    res.redirect('/');
    recalculateJobs();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('html', swig.renderFile);

app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

swig.setDefaults({ cache: false });

app.use('/', routes);


// 404 error handling
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Print error if one occurs (debug)
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

recalculateJobs();

server.listen(80);

console.log("Server is now running at 192.168.43.223");
