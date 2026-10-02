// 37:5
($splice0, $tag1) => <div>
      <$tag1 each={$splice0()}>
        {(order) => (<div>
            <img src={"https://img.example.com/" + order.id + ".png"} alt=""/>
            <span>{order.customer.name}</span>
            <span>{order.customer.city}</span>
            <$tag1 each={order.items}>
              {(item) => <span>{item.sku + " x" + item.qty}</span>}
            </$tag1>
            <span>{"$" + order.total}</span>
          </div>)}
      </$tag1>
    </div>
