const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define o caminho da pasta de origem e destino
const pasta_origem = 'C:/Users/wylke/Pictures/fotosSelecionadas';
const pasta_destino = 'C:/Users/wylke/Pictures/fotosSelecionadasJPG';

// Verifica se a pasta de destino existe, caso contrário, cria ela
if (!fs.existsSync(pasta_destino)) {
  fs.mkdirSync(pasta_destino);
  console.log('PASTA CRIADA COM SUCESSO!')
} else console.log('A PASTA DE DESTINO JA EXISTE...')

// Percorre todos os arquivos da pasta de origem
fs.readdir(pasta_origem, (err, arquivos) => {
  if (err) {
    console.error(err);
    return;
  }

  let tamanho_pasta_origem = undefined
  let tamanho_pasta_destino = undefined

  arquivos.forEach((nome_arquivo, index) => {
    // Verifica se o arquivo é um arquivo de imagem JFIF
    if (path.extname(nome_arquivo).toLowerCase() === '.jfif') {

      // Define o caminho completo do arquivo de origem e destino
      const caminho_origem = path.join(pasta_origem, nome_arquivo);
      const caminho_destino = path.join(pasta_destino, nome_arquivo.replace('.jfif', '.jpg'));

      // Converte o arquivo JFIF para JPG e salva na pasta de destino
      sharp(caminho_origem)
        .jpeg()
        .toFile(caminho_destino, err => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`Arquivo ${nome_arquivo} convertido para JPG e salvo em ${caminho_destino}`);

          fs.readdir(pasta_origem, (err, files) => { tamanho_pasta_origem = files.length });
          fs.readdir(pasta_destino, (err, files) => { tamanho_pasta_destino = files.length });
          
          // Verifica se e o ultimo loop e exibe a menssagem de sucesso!
          if (index + 1 === arquivos.length) {
            if (tamanho_pasta_origem === tamanho_pasta_destino && tamanho_pasta_origem != undefined && tamanho_pasta_destino != undefined) 
            { 
              console.warn('\nARQUIVOS CONVERTIDOS COM SUCESSO!')
              
              // const resposta = prompt('\nDeseja abrir a pasta com os novos arquivos, sim(S) ou nao(N)?: ')

              readline.question('\nDeseja abrir a pasta com os novos arquivos, sim(S) ou nao(N)?: ', resposta => {
                if (resposta != undefined && (resposta.toLowerCase() === 'sim' || resposta.toLowerCase() === 's')) {
                  require('child_process').exec(`start "" "${pasta_destino}"`);
                } else {
                  console.log('Bye Bye :)')
                }
                readline.close();
              });
            }
          }

        });
    }
  });
});


