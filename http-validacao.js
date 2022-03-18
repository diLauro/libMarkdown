const fetch = require("node-fetch");

function manejaErros(erro) {
  throw new Error(erro.message);
}
async function checaStatus(arrayURLs) {
  try {
    const arrayStatus = await Promise.all(
      arrayURLs.map(async (url) => {
        const res = await fetch(url);
        return res.status;
      })
    );
    return arrayStatus;
  } catch(erro) {
      manejaErros(erro)
  }
}

function geraArrayURLs(arrayLinks) {
  return arrayLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function validaUrls(arrayLinks) {
  const links = geraArrayURLs(arrayLinks);
  const statusLink = await checaStatus(links);

  const resultado = arrayLinks.map((objeto, indice) => ({ ...objeto, status: statusLink[indice] }));

  return resultado;
}

module.exports = validaUrls;
