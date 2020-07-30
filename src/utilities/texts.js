module.exports = {
   args: {
      getErrorInteger: (key, min = '-infini', max = '+infini') =>
         `Valeur de \`${key}\` invalide, entrez un entier compris entre \`${min}\` et \`${max}\`.`,
      getPromptInteger: (key, min = '-infini', max = '+infini') =>
         `Entrez la valeur de \`${key}\`: entier compris entre \`${min}\` et \`${max}\`.`,
   },
};
