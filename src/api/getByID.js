const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

export default async function getByID(id) {
  let response = await fetch(apiUrl + id)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Api response error");
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
}
