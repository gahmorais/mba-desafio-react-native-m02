async function getMovie(title, year = "") {
  console.log(title);
  const result = await fetch(
    `http://www.omdbapi.com/?apikey=4f6b0cb1&t=${title}&y=${year}`,
    {
      method: "GET",
    }
  );
  const data = result.json();
  return data;
}

export { getMovie };
