const fs = require('fs');

module.exports = {
  date: function(){
    let date = new Date();
    process.stdout.write(date.toString());
    process.stdout.write('\nprompt > ');
  },
  pwd: function(){
    process.stdout.write(process.env.PWD);
    process.stdout.write('\nprompt > ');
  },
  ls: function(){
    let directory = process.env.PWD;
    // fs.readdir(path[, options], callback(err, files))

    fs.readdir(directory, function(err, files){
      if (err) throw err;
      files.forEach(function(file){
        process.stdout.write(file.toString() + '\n');
      });
    });
    // let files = fs.readdirSync(directory);
    // files.forEach(function(file){
    //   process.stdout.write(file.toString() + '\n');
    // });
    setTimeout( function(){ process.stdout.write('prompt > ')}, 5 );
  },
  echo: function(args){
    let string = '';
    args.forEach(function(arg){
      string += arg + ' ';
    });
    process.stdout.write(string.trim());
    process.stdout.write('\nprompt > ');
  }
};
