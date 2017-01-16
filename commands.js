const fs = require('fs');

module.exports = {
  date: function(files){
    let date = new Date();
    process.stdout.write(date.toString());
    process.stdout.write('\nprompt > ');
  },
  pwd: function(files){
    process.stdout.write(process.env.PWD);
    process.stdout.write('\nprompt > ');
  },
  ls: function(files){
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
  echo: function(files){
    let string = '';
    files.forEach(function(file){
      string += file + ' ';
    });
    process.stdout.write(string.trim());
    process.stdout.write('\nprompt > ');
  },

  cat: function (files){
    //get access to file using fs
    //output the contents of the file
    let counter = 0;
    let contentsArr = [];

    for (var i = 0; i < files.length; i++){
      fs.readFile(files[i], function (err, contents) {
        if (err) return console.error(err);
        contentsArr[i] = contents;
        counter++;
        if (counter === files.length){
          process.stdout.write(contentsArr.join('').toString());
          process.stdout.write('\nprompt > ');
        }
      });
    }
  },

  head: function (files){
    fs.readFile(files[0], function(err, contents){
      if (err) throw err;
      let output = contents.toString().split('\n');
      output = output.slice(0, 5);
      process.stdout.write(output.join('\n').toString());
      process.stdout.write('\nprompt > ');
    });
  },

  tail: function (files){
    fs.readFile(files[0], function(err, contents){
      if (err) throw err;
      let output = contents.toString().split('\n');
      output = output.slice(-5);
      process.stdout.write(output.join('\n').toString());
      process.stdout.write('\nprompt > ');
    });
  },

  sort: function (files){
    fs.readFile(files[0], function(err, contents){
      if (err) throw err;
       let output = contents.toString().split('\n');
      output = output.sort();
      process.stdout.write(output.join('\n').toString());
      process.stdout.write('\nprompt > ');
    });
  }
};
