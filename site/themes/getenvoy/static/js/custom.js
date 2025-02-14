$(function() {
  function clipboardMagic() {
    $('pre code.language-sh').append(
      '<button><img src="/images/copy.png" /></button>'
    );

    // find all the "code" blocks and bind click event...
    $('pre code button').on('click', function() {
      var $this = $(this)
        .parent()
        .get(0);

      // set initial state...
      $('pre code .clipboard').remove();
      var $inform = null;

      // if I don't have a $this, I should quit.
      if ($this.length < 1) return false;

      // parse to get the right linebreaks and such...
      var cmd = getCodeCommand($this);
      console.log(cmd);

      // create the dom input element to do the select/copy then remove...
      var $copyArea = $('<textarea class="to-clipboard hide-me" />')
        .appendTo('body')
        .val(cmd);
      $copyArea[0].select();
      document.execCommand('copy');
      $copyArea.remove();
      $copyArea = null;

      // notify the user of the action and set the GUI state...
      $inform = $(
        '<div class="clipboard">Copied command to clipboard</div>'
      ).appendTo($this);
      setTimeout(function() {
        $inform.addClass('fade');
      }, 100);

      // clean-up...
      setTimeout(function() {
        $inform.remove();
      }, 3000);
    });

    function getCodeCommand(block) {
      const inner = block.innerText;
      const lines = inner.split('\n');
      let line = '';
      let cmd = '';
      let arrCmd = []
      let linesLength = lines.length;
      for (let i = 0; i < linesLength; i++) {
        if (lines[i].startsWith('$ ')) {
          line = lines[i].substring(2);
          arrCmd.push(line);
        }
      }
      cmd = arrCmd.join (' && ');
      return cmd;
    }
  }

  clipboardMagic();
});
