process.stdout.write('prompt > ');

process.stdin.on('data', function(data){
  const bash = require('./commands.js');
  const input = data.toString().trim().split(' ');
  const cmd = input[0];
  const args = input.slice(1);

  if (cmd === 'date'){
    bash.date();
  }
  if (cmd === 'pwd'){
    bash.pwd();
  }
  if (cmd === 'ls'){
    bash.ls();
  }
  if (cmd == 'echo'){
    bash.echo(args);
  }
});
