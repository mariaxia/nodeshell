const fs = require('fs');
const request = require('request');

module.exports = {
  date: function(files, done){
    let date = new Date();
    done(date.toString());
  },

  pwd: function(files, done){
    done(process.env.PWD);
  },

  ls: function(files, done){
    let directory = process.env.PWD;
    let output = '';
    fs.readdir(directory, function(err, files){
      if (err) throw err;
      files.forEach(function(file){
        output += file.toString() + '\n';
      });
    });
    done(output);
  },

  echo: function(files, done){
    let string = '';
    files.forEach(function(file){
      string += file + ' ';
    });
    done(string.trim());
  },

  cat: function (files, done){
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
          done(contentsArr.join('').toString());
        }
      });
    }
  },

  head: function (files, done){
    fs.readFile(files[0], function(err, contents){
      if (err) throw err;
      let output = contents.toString().split('\n');
      output = output.slice(0, 5);
      done(output.join('\n').toString());
    });
  },

  tail: function (files, done){
    fs.readFile(files[0], function(err, contents){
      if (err) throw err;
      let output = contents.toString().split('\n');
      output = output.slice(-5);
      done(output.join('\n').toString());
    });
  },

  // TODO: sort lexicographically, not with [].sort
  sort: function (files, done){
    fs.readFile(files[0], function(err, contents){
      if (err) throw err;
       let output = contents.toString().split('\n');
      output = output.sort();
      done(output.join('\n').toString());
    });
  },

  wc: function (files, done){
    fs.readFile(files[0], function(err, contents){
      if (err) throw err;
      const output = contents.toString().split('\n');
      const lines = output.length;
      done(lines.toString());
    });
  },

  uniq: function (files, done){
    fs.readFile(files[0], function(err, contents){
      if (err) throw err;
      let output = contents.toString().split('\n'),
      i = 1;
      while (i < output.length){
        if (output[i-1] === output[i]){
          output.splice(i-1, 1);
        } else {
          i++;
        }
      }
      done(output.join(''));
    });
  },

  curl: function(files, done){
    let url = files[0];
    request(url, function(err, response, body){
      if (err) throw err;
      if (response.statusCode === 200)
        done(body);
      else {
        process.stdout.write("Error: " + response.statusCode);
      }
    });
  }
};
