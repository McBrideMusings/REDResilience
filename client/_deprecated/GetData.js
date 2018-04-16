// I don't actually use this file but it's likely a better way to build out
// API calls. Throw together in 1 file and import where needed
function search() {
  fetch('/', {  
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(function(response) { console.log(response.json()); })
  /*
  return fetch(`api/food?q=${query}`, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
    */
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

// Are these last two lines a react thing or JS thing? I don't know the 
// export default keywords
const Client = { test, search };
export default Client; 