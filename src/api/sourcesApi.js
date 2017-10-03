class GetNewsSources {
  static getAlllNewsSources() {
    return fetch('https://newsapi.org/v1/sources?language=en')
            .then(response => response.json())
            .catch(error => error);
  }
}

export default GetNewsSources;
