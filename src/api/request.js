async function getMovie(title) {
  console.log(title)
  const result = await fetch(
    `http://www.omdbapi.com/?apikey=4f6b0cb1&t=${title}`,
    {
      method: "GET",
    }
  );
  const data = result.json();
  return data;
}

export { getMovie };
