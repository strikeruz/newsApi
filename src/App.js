import React from "react";
import { getArticles } from "./api";
import ArticleList from "./components/articlesList";
import SearchBar from "./components/searchBar";
import { Container, Header } from "semantic-ui-react";

class App extends React.Component {
  state = {
    articles: [],
    searchTopic: "",
    totalResults: "",
    loading: false,
    apiError: ""
  };

  searchForTopic = async topic => {
    try {
      this.setState({ loading: true });
      const response = await getArticles(topic);

      this.setState({
        articles: response.articles,
        searchTopic: topic,
        totalResults: response.totalArticles
      });
    } catch (error) {
      this.setState({ apiError: "Could not find any articles" });
    }
    this.setState({ loading: false });
  };

  render() {
    const {
      articles,
      apiError,
      loading,
      searchTopic,
      totalResults
    } = this.state;

    return (
      <Container>
        <Header as="h2" style={{ textAlign: "center", margin: 20 }}>
          Поиск новостей по теме (пример: Биткоин)
        </Header>
        <SearchBar searchForTopic={this.searchForTopic} />
        {loading && (
          <p style={{ textAlign: "center" }}>Ищем статьи ...</p>
        )}
        {articles && articles.length > 0 && (
          <Header as="h4" style={{ textAlign: "center", margin: 20 }}>
            Найдено {totalResults} статьи по запросу "{searchTopic}"
          </Header>
        )}
        {articles && articles.length > 0 && <ArticleList articles={articles} />}
        {apiError && <p>Не удалось получить статьи. Пожалуйста, попробуйте еще раз.</p>}
      </Container>
    );
  }
}

export default App;
