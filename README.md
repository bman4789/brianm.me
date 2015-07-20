brianm.me
=========

A nodejs, express, and handlebars based website.
Foundation is used for the front-end framework.

## Developing

You will need Node and MongoDB installed. To install other dependencies, run ```npm install && bower install```
This project uses [Gulp](http://gulpjs.com) as a build system. To start developing, run ```gulp serve``` and load [localhost:3000](localhost:3000) in a broswer.

## Building

You can run the build task to copy and minify all files over to the /dist directory. This combines all bower scripts and stylesheets into a vendor file, and non bower components in an app file. If you want to run the dist version, run the serve:dist task.

## Attributions
Font Awesome by Dave Gandy - http://fontawesome.io
