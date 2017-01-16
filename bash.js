process.stdout.write('prompt > ');

process.stdin.on('data', function(data){
  const bash = require('./commands.js');
  const input = data.toString().trim().split(' ');
  const cmd = input[0];
  const args = input.slice(1);

  if (cmd in bash){
    bash[cmd](args, done = function(string){
      process.stdout.write(string);
      process.stdout.write('\nprompt > ');
    });
  } else {
    console.error('Invalid command: ' + cmd);
    process.stdout.write('\nprompt > ');
    return;
  }
});
