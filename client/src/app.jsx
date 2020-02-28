import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./protected";
import "bootstrap/dist/css/bootstrap.min.css";
//////// Pages/////////
import Home from "./page/home";
import Article from "./page/Article";
import Blog from "./page/Blog";
import Essay from "./page/Essay";
import AboutUs from "./page/AboutUs";
import ArticleContent from "./page/contenentPage/articleContent";
import BlogContent from "./page/contenentPage/blogContent";
import EssayContent from "./page/contenentPage/essayContent";
import Create from "./page/create";
// page update container
import EssayUpdate from "./container/Update/essayUpdate";
import BlogUpdate from "./container/Update/blogUpdate";
import ArticleUpdate from "./container/Update/articleUpdate";
// containters
import Nav from "./container/Nav";
import NavLogin from "./container/NavLogin";
import NavAdmin from "./container/NavAdmin";
import Footer from "./container/footer";

class app extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logIn: false,
      role: "user",
    };
  }

  componentDidMount() {
    if (
      JSON.parse(sessionStorage.getItem("logIn")) &&
      JSON.parse(sessionStorage.getItem("logIn")).role === "admin"
    ) {
      this.setState({ logIn: true, role: "admin" });
    } else if (JSON.parse(sessionStorage.getItem("logIn"))) {
      this.setState({ logIn: true });
    }
  }

  render() {
    return (
      <>
        <Router>
          {this.state.logIn && this.state.role === "admin" ? (
            <NavAdmin />
          ) : this.state.logIn ? (
            <NavLogin />
          ) : (
            <Nav />
          )}

          <Switch>
            <Route exact path='/' component={Home} />

            <Route exact path='/About' component={AboutUs} />

            <Route exact path='/Essay' component={Essay} />

            <Route exact path='/Blog' component={Blog} />
            <Route exact path='/Article' component={Article} />
            <PrivateRoute path='/Create'>
              <Create />
            </PrivateRoute>
            <Route
              exact
              path='/ArticleUpdate/:id'
              render={rout => <ArticleUpdate id={rout.match.params.id} />}
            />
            <Route
              exact
              path='/EssayUpdate/:id'
              render={rout => <EssayUpdate id={rout.match.params.id} />}
            />
            <Route
              exact
              path='/BlogUpdate/:id'
              render={rout => <BlogUpdate id={rout.match.params.id} />}
            />
            <Route
              exact
              path='/ArticlePage/:id'
              render={rout => <ArticleContent id={rout.match.params.id} />}
            />

            <Route
              exact
              path='/EssayPage/:id'
              render={rout => (
                <EssayContent id={rout.match.params.id} />
              )}></Route>
            <Route
              exact
              path='/BlogPage/:id'
              render={rout => <BlogContent id={rout.match.params.id} />}
            />
            <Route path='/*' component={Home} />
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default app;
