(function($) {
  var screen, input, spinner_id, resultPrompt;
  var spinner = "<div id='%s' style='background: url(%i) no-repeat 0 center; "+
    "vertical-align: middle;'> &nbsp;</div>";

  $.fn.repl = function(options) {
    options = $.extend({
      prompt: '&gt;&gt; ',
      resultPrompt: '=> ',
      loop: $.repl.loop,
      spinner: 'spinner.gif'
    }, options);

    input = $(this);
    input.addClass('repl_input');
    resultPrompt = options.resultPrompt;
    var input_id = this.selector.replace(/^#/, '');
    spinner_id = input_id + '_spinner';
    spinner = spinner.replace('%s', spinner_id);
    spinner = spinner.replace('%i', options.spinner);

    var prompt_id = input_id + '_prompt';
    if (!$('#'+prompt_id).length) {
      input.before('<span id="'+prompt_id+'"></span>');
    }
    var screen_id = input_id + '_screen';
    $('#'+prompt_id).html(options.prompt).
      before("<div id='"+ screen_id +"'></div>");
    screen = $('#'+screen_id);

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
    },
    loop: function(line) {
      var result = resultPrompt + $.repl.eval(line);
      $.repl.logResult(result);
    }
  };
})(jQuery);
