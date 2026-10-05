// 37:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($splice0, $splice1) => <div>
      {($For => <$For each={$splice1()}>
        {(order) => (<div>
            <img src={"https://img.example.com/" + order.id + ".png"} alt=""/>
            <span>{order.customer.name}</span>
            <span>{order.customer.city}</span>
            {($For => <$For each={order.items}>
              {(item) => <span>{item.sku + " x" + item.qty}</span>}
            </$For>)($splice0())}
            <span>{"$" + order.total}</span>
          </div>)}
      </$For>)($splice0())}
    </div>);
}
