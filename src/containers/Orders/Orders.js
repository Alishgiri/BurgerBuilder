import React from "react";
import Axios from "../../axios";

import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends React.Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    Axios.get("/orders.json")
      .then(response => {
        const fetchedData = [];
        for (let key in response.data) {
          fetchedData.push({
            ...response.data[key],
            id: key
          });
        }
        this.setState({ loading: false, orders: fetchedData });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order key={order.id} price={order.price} ingredients={order.ingredients} />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, Axios);
