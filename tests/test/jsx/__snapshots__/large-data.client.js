// 38:18
($0) => $0()

// 39:10
($0) => (order) => $0(order)

// 43:22
($0) => "https://img.example.com/" + $0.id + ".png"

// 46:22
($0) => $0.customer.name

// 47:22
($0) => $0.customer.city

// 48:26
($0) => $0.items

// 49:18
($0) => (item) => $0(item)

// 50:29
($0) => $0.sku + " x" + $0.qty

// 52:22
($0) => "$" + $0.total
