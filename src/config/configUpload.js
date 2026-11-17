//Importa a biblioteca MULTER
const multer = require('multer');

// Diretório onde os arquivos serão salvos
// ATENÇÃO: É necessário manter o diretório 'public' para poder utilizar no front-end
const diretorio = 'public/assets/imgs/galeria/';

//Define o destino do arquivo no disco (HD ou SSD), pois estamos salvando a imagem
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, diretorio) 
  },
  
//Gera um nome aleatorio em hex usando CRYPTO (módulo nativo do node) para evitar nomes identicos
  filename: (req, file, cb) => {
    const extensaoArquivo = file.originalname.split('.')[1]; //pega a extensão da foto

    const novoNomeArquivo = require('crypto')
      .randomBytes(64)
      .toString('hex'); //gera a hash de 64 caracterers


    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`) // Junta o nome do arquivo em formato hash com sua extensão (jpg, png, etc.)
  }
});

module.exports = multer({ storage });

/*
OBS: 
-"cb" significa CallBack. E é uma função de retorno que o multer entrega pro NodeJS;

--Esse arquivo de configuração serve para:

-Importar e configurar a biblioteca multer;
-Registrar as fotos no SSD ou HD do servidor, onde o NodeJS está rodando;
-Gerar um novo caminho para a imagem com o CRYPTO, reatribuindo um novo nome a imagem (mantendo sua extensão);
-Retorna pro NodeJS quando ele finalizar essa função, permitindo que o upload seja concluído e
repassado ao controller. 

*/
