// 37:5
(module, exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (($tag0, $splice1) => <div>
      <$tag0 each={$splice1()}>
        {(order) => (<div>
            <img src={"https://img.example.com/" + order.id + ".png"} alt=""/>
            <span>{order.customer.name}</span>
            <span>{order.customer.city}</span>
            <$tag0 each={order.items}>
              {(item) => <span>{item.sku + " x" + item.qty}</span>}
            </$tag0>
            <span>{"$" + order.total}</span>
          </div>)}
      </$tag0>
    </div>);
}
