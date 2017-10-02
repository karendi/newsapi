const apiKey = '213327409d384371851777e7c7f78dfe';

class GetNewsPost {
  static getAllNewsPosts(source) {
    return fetch(`https://newsapi.org/v1/articles?source=${source}&sortBy=latest&apiKey=${apiKey}`)
        .then(response => response.json())
        .catch(error => error);
  }
}

export default GetNewsPost;
