const apiKey = '213327409d384371851777e7c7f78dfe';

class GetNewsPost {
  static getAllNewsPostsWithFilter(source, sortBy) {
    return fetch(`https://newsapi.org/v1/articles?source=${source}&sortBy=${sortBy}&apiKey=${apiKey}`)
        .then(response => response.json())
        .catch(error => error);
  }
  static getAllNewsPostsWithoutFilter(source) {
    return fetch(`https://newsapi.org/v1/articles?source=${source}&apiKey=${apiKey}`)
        .then(response => response.json())
        .catch((error) => {
          throw new Error(error);
        });
  }
}

export default GetNewsPost;
