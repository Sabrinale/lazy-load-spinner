import React, { Component } from "react";
import Header from "./Components/Header";
import User from "./Components/User";
import Loader from "./Components/Loader";
import Title from "./Components/Title";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      input: "",
      sortType: "id",
      lastIndex: 3,
      loader: true,
      shouldLoad: false 
    };
  }

  handleInput = e => {
    this.setState({
      input: e.target.value
    });
  };

  handleSort = e => {
    this.setState({
      sortType: e.target.id
    });
  };

  resetIndex = () => {
    this.setState({
      lastIndex: 3
    });
  };

  increaseIndex = () => {
    this.setState(prevState => ({
      lastIndex: prevState.lastIndex + 3
    }));
  };

  generatePromises = () => {
    const urlArray = [];
    const baseUrl =
      "https://reqres.in/api/users?page=";

    for (let i = 0; i < 12; i++) {
      urlArray.push(baseUrl + `${i + 1}`); 
    }

    return urlArray.map(url => fetch(url));
  };

  sort = (array, category) => {
    let renderData = [...array];

    switch (category) {
      case "first name": {
        renderData.sort(function(a, b) {
          const nameA = a.first_name.toUpperCase();
          const nameB = b.first_name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        });
        break;
      }
      case "last name": {
        // eslint-disable-next-line
        renderData.sort(function(a, b) {
          const nameA = a.last_name.toUpperCase();
          const nameB = b.last_name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        });
        break;
      }
      default: {
        renderData.sort(function(a, b) {
          return a.id - b.id;
        });
      }
    }
    return renderData;
  };

  filter = (array, value) => {
    const filterArray = array.filter(function(element) {
      return element.last_name.toLowerCase().includes(value.toLowerCase()) || element.last_name.toLowerCase().includes(value.toLowerCase()) 
      || element.id.toString().includes(value.toLowerCase()) ;
    });
    return filterArray;
  };

  componentDidMount() {
    Promise.all(this.generatePromises())
      .then(response => {
        return Promise.all(response.map(response => response.json()));
      })
      .then(response => {
        return response.reduce(
          (acc, element) => acc.concat(...element.data),
          []
        );
      })
      .then(response => {
        setTimeout(() => {
          this.setState({
            data: response,
            loader: false
          });
        }, 3000);
      });
  }
 
  render() {
    const { data, input, sortType, lastIndex, loader } = this.state;

    const renderData = this.sort(data, sortType);
    const filterArray = this.filter(renderData, input);

    const listUsers = filterArray
      .slice(0, lastIndex)
      .map((e, i) => <User data={e} key={i} />);
      let loadMore;
      let header;
      let title;
      if (!loader){
         header = (
          <Header
          handleSort={this.handleSort}
          handleInput={this.handleInput}
          resetIndex={this.resetIndex}
        />
        )
         title = (
          <Title length={filterArray.length} />
        )
        if (filterArray.length > lastIndex){
          loadMore= this.increaseIndex();
          loadMore =(
            <h1>Loading</h1>) 
          
        }else {
          loadMore =(
          <h5>End of the page</h5>)
        }
      } 

    return (
      <div>
        { header}
        <div>
          {loader && <Loader />}
         <div>
         {title}
         </div>
          <div className="container">
            {listUsers}
            {loadMore}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
