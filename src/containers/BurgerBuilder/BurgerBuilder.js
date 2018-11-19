import Axios from "../../axios";
import { connect } from "react-redux";
import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaedState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  hideModalHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // let queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push("price=" + this.props.price);
    // let queryString = queryParams.join("&");
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: "?" + queryString
    // });
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = { ...this.props.ing };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients cannot be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ing) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            disabled={disabledInfo}
            purchase={this.purchaseHandler}
            purchasable={this.updatePurchaedState(this.props.ing)}
            price={this.props.price.toFixed(2)}
            add={type => this.props.onIngredientAdd(type)}
            remove={type => this.props.onIngredientRemove(type)}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          cancel={this.hideModalHandler}
          ingredients={this.props.ing}
          continue={this.purchaseContinueHandler}
          totalCost={this.props.price.toFixed(2)}
        />
      );
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} closeModal={this.hideModalHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
};

const mapDispatchToprops = dispatch => {
  return {
    onIngredientAdd: ingName =>
      dispatch(actions.addIngredients(ingName)),
    onIngredientRemove: ingName =>
      dispatch(actions.removeIngredients(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToprops
)(withErrorHandler(BurgerBuilder, Axios));
