// ======================initStorage==============================

export function initStorage() {
    window.localStorage.getItem("basket") ?
      window.localStorage.getItem("basket") :
      window.localStorage.setItem("basket", JSON.stringify([]));
}

export function getProducts() {
    return JSON.parse(window.localStorage.getItem("basket"));
}
