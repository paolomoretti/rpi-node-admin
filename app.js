// Generated by CoffeeScript 1.6.3
var app, express;

express = require('express');

app = express();

app.use(express["static"](__dirname + '/public'));

app.get('/webcam/:action', function(req, res) {
  var actions, exec, raspberryOpts, sshclient, sys;
  sys = require('sys');
  exec = require('child_process').exec;
  sshclient = require("sshclient");
  actions = {
    start: {
      op: 'exec',
      command: 'ssh paolo@192.168.0.11 killall webcam',
      canFail: true,
      op: 'exec',
      command: 'ssh paolo@192.168.0.11 nohup webcam /home/paolo/.webcamrc &'
    },
    stop: {
      op: 'exec',
      command: 'ssh paolo@192.168.0.11 killall webcam'
    }
  };
  raspberryOpts = {
    host: 'bitter.kicks-ass.org',
    port: 22,
    username: 'xbian',
    password: 'raspberry',
    debug: true,
    console: console,
    session: []
  };
  raspberryOpts.session.push(actions[req.params.action]);
  return sshclient.session(raspberryOpts, function(error) {
    console.log("Action " + req.params.action + " executed!!!");
    if (error === null) {
      return res.send("ok");
    }
  });
});

app.listen(9999);

console.log("Node started on port 9999!!");
