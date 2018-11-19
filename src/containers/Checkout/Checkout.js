import { connect } from "react-redux";
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import * as actions from "../../store/actions/order";
import ContactData from "../../containers/Checkout/ContactData/ContactData";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     // ['salad', '1'] <= query entries format
  //     if (param[0] === "price") {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, totalPrice: price });
  // }

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  continueCheckoutHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ing) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ing}
            cancelCheckout={this.cancelCheckoutHandler}
            continueCheckout={this.continueCheckoutHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
