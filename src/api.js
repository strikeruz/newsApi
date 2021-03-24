export const getBitcoinArticles = async () => {
  const response = await fetch(
    `https://gnews.io/api/v4/search?q=bitcoin&token=${process.env.REACT_APP_NEWS_API_KEY}`
  );
  const json = await response.json();
  return json;
};

export const getArticles = async topic => {
  const response = await fetch(
    `https://gnews.io/api/v4/search?q=${topic}&token=${process.env.REACT_APP_NEWS_API_KEY}`
  );
  const json = await response.json();
  return json;
};
