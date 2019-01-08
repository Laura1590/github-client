require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');
const fragmentPath = './src/data/fragmentTypes.json';

console.log('Using token', process.env.REACT_APP_GITHUB_TOKEN);

if (fs.existsSync(fragmentPath)) {
  console.log('Fragment file found, aborting');
  return;
}
fetch(process.env.REACT_APP_GRAPHQL_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      type => type.possibleTypes !== null,
    );
    result.data.__schema.types = filteredData;
    fs.writeFile(fragmentPath, JSON.stringify(result.data), err => {
      if (err) {
        console.error('Error writing fragmentTypes file', err);
      } else {
        console.log('Fragment types successfully extracted!');
      }
    });
  })
  .catch(err => console.error(err));