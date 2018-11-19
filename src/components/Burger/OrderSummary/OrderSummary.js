import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends React.Component {

  componentWillUpdate() {
    // console.log('[Order Summary]: willUpdate')
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {this.props.ingredients[igKey]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>Burger with the following order will be ready shortly: </p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price:</strong> $ {this.props.totalCost}
        </p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.cancel}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.continue}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
