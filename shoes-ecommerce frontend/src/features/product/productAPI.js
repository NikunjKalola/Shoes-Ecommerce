// A mock function to mimic making an async request for data


export function fetchProductByID(id) {
  console.log(typeof(id))
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function addProduct(product) {
  console.log(product);
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteProduct(update) {
  console.log("dlelemle",update)
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

// export function fetchColors() {
//   return new Promise(async (resolve) => {
//     const response = await fetch("http://localhost:8080/colors");
//     const data = await response.json();
//     resolve({ data });
//   });
// }

export function fetchProductsByFilters(filter, sort, pagination, price, category) {
  //TO DO : on server we will support multi values
  //filter = {"category":["smartphone","laptops"]}
  //sort = {_sort:"price",_order="desc"}
  //pagination = {_page:1,_limit:10}
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      for (let item in categoryValues)
        queryString += `${key}=${categoryValues[item]}&`;
    }
  }

  for (let key in price) {
    queryString += `${key}=${price[key]}&`;
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  for (let key in category) {
    queryString += `${key}=${category[key]}&`;
  }

  return new Promise(async (resolve) => {
    console.log(queryString)
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    const totalItems = response.headers.get('X-Total-Count');
    console.log("totalItems ",totalItems);
    resolve({ data: { products: data, totalItems: +totalItems } });
    // resolve({ data });
  });
}
