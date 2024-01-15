const apiUrl = "https://pokeapi.co/api/v2/characteristic/";

export default async function getCharacteristic(id) {
  let response = await fetch(apiUrl + id)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Api response error");
      }
      return response.json();
    })
    .then((r) => {
      return r.descriptions[7].description;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
}
