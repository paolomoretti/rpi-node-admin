express = require 'express'

app = express()
app.use express.static(__dirname + '/public')
app.port = 9898

app.get '/webcam/:action', (req, res)->

  sys = require('sys')
  exec = require('child_process').exec
  sshclient = require "sshclient"

  actions =
    start:
      op: 'exec', command: 'ssh paolo@192.168.0.11 killall webcam', canFail: true
      op: 'exec', command: 'ssh paolo@192.168.0.11 nohup webcam /home/paolo/.webcamrc &'
    stop:
      op: 'exec', command: 'ssh paolo@192.168.0.11 killall webcam'

  raspberryOpts =
    host: 'bitter.kicks-ass.org'
    port: 22
    username: 'xbian'
    password: 'raspberry'
    debug: true
    console: console
    session: []

  raspberryOpts.session.push actions[req.params.action]

  sshclient.session raspberryOpts, (error)->
    if error is null
      res.send "ok"


app.listen app.port

console.log "Node started on port "+app.port+" - yayy"