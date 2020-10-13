const { authorize } = require('./spreadsheet');
const { MessageEmbed } = require('discord.js');
const { google } = require('googleapis');
const { loadCharacterFile, saveCharacters } = require('./characters.file');

const nameRegex = /(.*) \("{0,1}(.*)"{0,1}\)/;

function getAllStyles({
   startRow = 7,
   startCol = 0,
   numberRows = 994,
   roles = ['Fighter', 'Mage', 'Defender', 'Jammer', 'Support'],
   categories = ['Award/UDX', 'Seasonal', 'Common'],
} = {}) {
   const cacheCharacters = loadCharacterFile();
   if (
      !cacheCharacters ||
      cacheCharacters.isError ||
      cacheCharacters.data.length === 0 ||
      cacheCharacters.outdated
   ) {
      const auth = authorize();

      const length = 13;
      const firstCol = String.fromCharCode(startCol + 65);
      let lastIndex = startCol + length * categories.length - 2;
      let lastCol = '';
      let lastColFirstLetter = -1;
      while (lastIndex > 26) {
         lastIndex -= 26;
         lastColFirstLetter++;
      }
      if (lastColFirstLetter >= 0) {
         lastCol += String.fromCharCode(65 + lastColFirstLetter);
      }
      lastCol += String.fromCharCode(65 + lastIndex);

      const getRequest = (sheetName) => {
         return {
            spreadsheetId: '1AUquzPB0vDKYxOHC1uU4G7CNrNSNwLr89MOTWjQBNu0',
            range: `${sheetName}!${firstCol}${startRow}:${lastCol}${
               numberRows + startRow
            }`,

            auth,
         };
      };
      const sheets = google.sheets({ version: 'v4', auth });

      return [
         Promise.all(
            roles.map(async (role) => {
               try {
                  const request = getRequest(role);
                  const response = (
                     await sheets.spreadsheets.values.get(request)
                  ).data;
                  if (!response || !response.values) {
                     return [];
                  }
                  const values = response.values;
                  let result = [];

                  categories.forEach((cat, colIndex) => {
                     let row = 0,
                        col = colIndex * length;
                     while (
                        values[row] &&
                        values[row][col] &&
                        values[row][col].length > 0
                     ) {
                        const nameMatch = nameRegex.exec(
                           values[row][col].trim()
                        );
                        result.push({
                           role: role,
                           category: cat,
                           name: nameMatch[1],
                           style: nameMatch[2] && nameMatch[2].replace('"', ''),
                           stats: {
                              str: values[row + 1][col + 3],
                              end: values[row + 2][col + 3],
                              dex: values[row + 3][col + 3],
                              agi: values[row + 4][col + 3],
                              wil: values[row + 5][col + 3],
                              lov: values[row + 6][col + 3],
                              cha: values[row + 7][col + 3],
                           },
                           abilities: [
                              {
                                 name: values[row + 1][col + 4].trim(),
                                 desc: values[row + 1][col + 5].trim(),
                              },
                              {
                                 name: values[row + 3][col + 4].trim(),
                                 desc: values[row + 3][col + 5].trim(),
                              },
                              {
                                 name: values[row + 5][col + 4].trim(),
                                 desc: values[row + 5][col + 5].trim(),
                              },
                           ],
                           skills: [
                              {
                                 name: values[row + 1][col + 8].trim(),
                                 desc: values[row + 1][col + 9]
                                    .trim()
                                    .replace('||', '-'),
                              },
                              {
                                 name: values[row + 3][col + 8].trim(),
                                 desc: values[row + 3][col + 9]
                                    .trim()
                                    .replace('||', '-'),
                              },
                              {
                                 name: values[row + 5][col + 8].trim(),
                                 desc: values[row + 5][col + 9]
                                    .trim()
                                    .replace('||', '-'),
                              },
                           ],
                           desc: values[row + 10][col].trim(),
                           tips: values[row + 10][col + 6].trim(),
                        });
                        row += 18;
                     }
                  });
                  return [result];
               } catch (e) {
                  console.error(e);
                  return [cacheCharacters && cacheCharacters.data, true];
               }
            })
         ).then((results) => {
            let invalid = false;
            const data = [];
            results.forEach(([d, e]) => {
               invalid = invalid || e;
               data.push(d);
            });
            !invalid && saveCharacters(data.flat());
            return [data.flat(), invalid];
         }),
         cacheCharacters && cacheCharacters.outdated,
         cacheCharacters && cacheCharacters.isError,
      ];
   } else {
      return [
         new Promise((r) => {
            r([cacheCharacters.data]);
         }),
         false,
         false,
      ];
   }
}

function getStylesByName(styleName, callback, config) {
   const sname = styleName && styleName.toLowerCase();
   const [promise, ...rest] = getAllStyles(config);
   return [
      promise.then(([styles, invalid]) => {
         styles
            ? callback(
                 styles
                    .filter(
                       (style) =>
                          style.style &&
                          style.style.toLowerCase().indexOf(sname) > -1
                    )
                    .sort((a, b) =>
                       a.name.length === b.name.length
                          ? a.name === b.name
                             ? a.style.localeCompare(b.style)
                             : a.name.localeCompare(b.name)
                          : a.name.length - b.name.length
                    ),
                 invalid
              )
            : callback([], invalid);
      }),
      ...rest,
   ];
}

function getStylesByCharacterName(charName, callback, config) {
   const cname = charName && charName.toLowerCase();
   const [promise, ...rest] = getAllStyles(config);
   return [
      promise.then(([styles, invalid]) => {
         styles
            ? callback(
                 styles
                    .filter(
                       (style) =>
                          style.name &&
                          style.name.toLowerCase().indexOf(cname) > -1
                    )
                    .sort((a, b) =>
                       a.name.length === b.name.length
                          ? a.name === b.name
                             ? a.style.localeCompare(b.style)
                             : a.name.localeCompare(b.name)
                          : a.name.length - b.name.length
                    ),
                 invalid
              )
            : callback([], invalid);
      }),
      ...rest,
   ];
}

const roleColors = {
   Fighter: '#ff866b',
   Mage: '#99ffb2',
   Defender: '#ffd966',
   Jammer: '#99ffe5',
   Support: '#e6ff99',
};

const formatStyleToEmbed = (st) => {
   const embed = new MessageEmbed()
      .setColor(roleColors[st.role] || '#0099ff')
      .setTitle(`${st.name} [${st.style}]`)
      .setURL(
         'https://docs.google.com/spreadsheets/d/1AUquzPB0vDKYxOHC1uU4G7CNrNSNwLr89MOTWjQBNu0/edit?fbclid=IwAR3_z1fChnhTWIkVIQ5r3Dy9VneQqSq_mk_s3vSNXmiTy6WjyN0SOQEqOwY#gid=892217297'
      )
      //.setDescription(st.desc)
      //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
      .addFields(
         {
            name: 'Role',
            value: st.role,
            inline: true,
         },
         {
            name: 'Category',
            value: st.category,
            inline: true,
         }
      )
      .addField('Abilities', '\u200B')
      .addFields(
         {
            name: st.abilities[0].name,
            value: st.abilities[0].desc,
            inline: true,
         },
         {
            name: st.abilities[1].name,
            value: st.abilities[1].desc,
            inline: true,
         },
         {
            name: st.abilities[2].name,
            value: st.abilities[2].desc,
            inline: true,
         }
      )
      .addField('Skills', '\u200B')
      .addFields(
         {
            name: st.skills[0].name,
            value: st.skills[0].desc,
            inline: true,
         },
         {
            name: st.skills[1].name,
            value: st.skills[1].desc,
            inline: true,
         },
         {
            name: st.skills[2].name,
            value: st.skills[2].desc,
            inline: true,
         }
      )
      .addField('Statistics', '\u200B')
      .addFields(
         {
            name: 'STR',
            value: st.stats.str,
            inline: true,
         },
         {
            name: 'END',
            value: st.stats.end,
            inline: true,
         },
         {
            name: 'DEX',
            value: st.stats.dex,
            inline: true,
         },
         {
            name: 'AGI',
            value: st.stats.agi,
            inline: true,
         },
         {
            name: 'WIL',
            value: st.stats.wil,
            inline: true,
         },
         {
            name: 'LOV',
            value: st.stats.lov,
            inline: true,
         },
         {
            name: 'CHA',
            value: st.stats.cha,
            inline: true,
         }
      )
      .addField('Description', st.desc)
      .addField('Tips', st.tips)
      //.setTimestamp()
      .addField(
         'Data obtained from',
         '[SaGa Re;Universe SS Style Breakdown](https://docs.google.com/spreadsheets/d/1AUquzPB0vDKYxOHC1uU4G7CNrNSNwLr89MOTWjQBNu0)'
      );
   return embed;
};

module.exports = {
   formatStyleToEmbed,
   getAllStyles,
   getStylesByName,
   getStylesByCharacterName,
   roleColors,
};
