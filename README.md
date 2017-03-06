
# gulp-practice
A project used to practice creating and using Gulp build scripts.

##Gulp Builds
Gulp will build a 'dist' (distribution) directory whuen you run a 'build' command.
The dist directory contains 2 sub-directories;
prod - for production deployments.
  contains minimized files
dev - for development.
  contains expanded (not minimized) files to see you development.

### Sass/CSS files processed by Gulp in this project.
During builds (Sass) SCCS stylesheet files are converted to CSS.
Two trivial JavaScript files are combined into a minimized singl JavaScript module.
The index.html in either the dist directory will load the JavaScript modules and display a test html file.
I developed the test index.html file to help me understand how to layer HTML canvas objects in a web page.
This is just for basic testing.
