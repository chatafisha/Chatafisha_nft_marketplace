import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// importing all the themes
import ThemeOne from "../themes/theme-one";
import ExploreOne from "../themes/explore-one";
//import ExploreTwo from "../themes/explore-two";
import ExploreTwo from "../themes/explore-three";
import ExploreFour from "../themes/explore-four";
import Auctions from "../themes/auctions";
import ItemDetails from "../themes/item-details";
import Activity from "../themes/activity";
import Blog from "../themes/blog";
import BlogSingle from "../themes/blog-single";
import HelpCenter from "../themes/help-center";
import Authors from "../themes/authors";
import Author from "../themes/author";
import WalletConnect from "../themes/wallet-connect";
import Create from "../themes/create";
import Login from "../themes/login";
import Signup from "../themes/signup";
import Contact from "../themes/contact";
import MyCollection from "../themes/myCollection";
import CreateMsg from "../themes/create-msg";
import TransferMsg from "../themes/transfer-msg";
import ExploreThreee from "../themes/explore-three";
import NFTclaims from "../themes/NFTclaims";
import PrivateRoute from "./PrivateRoute";
import { accountId } from "../utils";

class MyRouts extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={ThemeOne} />
            <Route exact path="/collection" component={MyCollection} />
            <Route exact path="/explore" component={ExploreThreee} />
            <Route path="/item-details/:type" component={ItemDetails} />
            <Route exact path="/transfer-msg/:type" component={TransferMsg} />
            <Route exact path="/claim-nft" component={Contact} />
            <PrivateRoute
              exact
              path="/create"
              component={Create}
              accountId={accountId().accountId}
            />
            <PrivateRoute
              exact
              path="/create-msg/:type"
              component={CreateMsg}
              accountId={accountId().accountId}
            />
            <PrivateRoute
              exact
              path="/nft-claims"
              component={NFTclaims}
              accountId={accountId().accountId}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default MyRouts;
