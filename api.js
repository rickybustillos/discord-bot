const fetch = require("node-fetch");

const get = async (url) => {
  var dados;

  await fetch(url)
    .then(response => response.json())
    .then(json => {
      dados = json;
    });
  
    return dados;
}

exports.get = get;