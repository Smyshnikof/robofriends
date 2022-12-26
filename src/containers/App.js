import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css";

class App extends Component {
  //Конструктор для двух компонетов, которы находятся в одном родительском (SearchBox и CardList)
  constructor() {
    super();
    this.state = {
      //robots передается в cardlist robots через this, а не через import {robots}
      robots: [],
      searchfield: "",
    };
  }
  //Получаем данные из json
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));
  }
  //Каждый раз, когда SearchList изменяется, то мы получаем event.
  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };
  //Рендер компонента
  render() {
    const { robots, searchfield } = this.state;
    const filterRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    //По аналогии с ===0, только true, false. Создается загрузочный текст Loading
    return !robots.length ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">Robofriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filterRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;
