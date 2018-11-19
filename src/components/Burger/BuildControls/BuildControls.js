import React from "react";

import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>$ {props.price}</strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        more={() => props.add(ctrl.type)}
        less={() => props.remove(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button className={classes.OrderButton} onClick={props.purchase} disabled={!props.purchasable}>
      Place an Order
    </button>
  </div>
);

export default buildControls;
