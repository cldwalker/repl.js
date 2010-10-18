Description
===========
Jquery plugin which turns any input element into a repl(shell). Provides a basic javascript
repl by default. Goal is to mimic a commandline shell while providing html/js enhancements.

Setup
=====
* Add css and javascript tags

    <link href='jquery.repl.css' rel='stylesheet' type='text/css'>
    <script src='http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js' type='text/javascript'></script>
    <script src='jquery.repl.js' type='text/javascript'></script>

* Assuming you have an input tag with id #input (wrapped in a form of course):

    <script type='text/javascript'>
      $(document).ready( function(){ $('#input').repl() });
    </script>

* For options to pass to $.fn.repl(), see documentation in the source.

Features
========
* Prints executed commands and their outputs to a separate div while browser focus is kept on
  repl prompt.
* Autoscrolls on long output to keep repl prompt visible (tested on Chrome only).
* Displays spinner while commands are executing (handy for long execution).
* Multiple repls (in different forms) can exist on the same page.

Demo
====
For a simple demo, simply open demo.html in a browser and try the basic javascript repl.
For a more advanced example, see jrepl.

Credits
=======
Original css and some js from [brirb](http://github.com/rkh/brirb).

Todo
====
* Toggle input to take multi-line inputs via textarea
* Embed in pages via a bookmarklet
