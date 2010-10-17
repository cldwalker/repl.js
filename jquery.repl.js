(function($) {
  var screen, input, spinner_id;
  var spinner = "<div id='%s' style='background: url(%i) no-repeat 0 center; "+
    "vertical-align: middle;'> &nbsp;</div>";

  $.fn.repl = function(options) {
    options = $.extend({
      screen: '#screen',
      prompt: '&gt;&gt; ',
      loop: function(line) { $.repl.logResult($.repl.eval(line)); },
      spinner: 'spinner.gif'
    }, options);

    input = $(this);
    input.addClass('repl_input');
    screen = $(options.screen);
    spinner_id = (this.selector + '_spinner').replace('#', '');
    spinner = spinner.replace('%s', spinner_id);
    spinner = spinner.replace('%i', options.spinner);

    var prompt_id = (this.selector + '_prompt').replace('#', '');
    if (!$(prompt_id).length) {
      input.before('<span id="'+prompt_id+'"></span>');
    }
    $('#'+prompt_id).html(options.prompt);

    input.focus();
    input.parent('form').submit(function() {
      var line = input.val();
      $.repl.log(options.prompt + line + spinner);
      options.loop(line);
      input.val("").focus();
      return false;
    });
    if ($.hotkeys) {
      input.bind('keydown', 'ctrl+l', function() { screen.html(''); });
    }

    return this;
  };

  $.repl = {
    version: '0.1.0',
    log: function(str) {
      screen.append(str + "<br>");
      return $('body').scrollTop($('body').attr('scrollHeight'));
    },
    logResult: function(str) {
      $('#'+spinner_id).remove();
      $.repl.log(str);
    },
    eval: function(input) {
      try { var result = eval(input); }
      catch(e) { var result = e.name + ': '+ e.message; }
      if (typeof(result) == 'undefined') {
        result = 'undefined';
      } else {
        result = result ? result.toString() : '';
        result = $('<div/>').text(result).html();
      }
      return result;
    }
  };
})(jQuery);
