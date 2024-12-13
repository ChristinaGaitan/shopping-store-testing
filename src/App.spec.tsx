import { App } from "./App"
import { createMemoryHistory } from "history"
import { render } from "@testing-library/react"
import { Router } from "react-router-dom"

jest.mock("./Home",()=>({
  Home: () => <div>Home page</div>
}));

jest.mock("./OrderSummary", () => ({
  OrderSummary: () => <div>Order Summary page</div>
}));

jest.mock("./Checkout", () => ({
  Checkout: () => <div>Checkout page</div>
}));

jest.mock("./Cart", () => ({
  Cart: () => <div>Cart page</div>
}));

describe("App", () => {
  it("renders successfully", () => {
    const history = createMemoryHistory()
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    )
    expect(container.innerHTML).toMatch("Goblin Store")
  })
})

describe("routing", () => {
  it("renders home page on '/'", () => {
    const { container } = renderWithRouter(
      () => <App />,
      "/"
    )

    expect(container.innerHTML).toMatch("Home page")
  });

  it ("renders order page on '/order'", () => {
    const { container } = renderWithRouter(
      () => <App />,
      "/order"
    )

    expect(container.innerHTML).toMatch("Order Summary page");
  })

  it ("renders checkout page on '/checkout'", () => {
    const { container } = renderWithRouter(
      () => <App />,
      "/checkout"
    )

    expect(container.innerHTML).toMatch("Checkout page");
  })

  it ("renders cart page on '/cart'", () => {
    const { container } = renderWithRouter(
      () => <App />,
      "/cart"
    )

    expect(container.innerHTML).toMatch("Cart page");
  })

  it ("renders 'page not found' message on nonexistent route", () => {
    const { container } = renderWithRouter(
      () => <App />,
      "/this-route-does-not-exist"
    )

    expect(container.innerHTML).toMatch("Page not found");
  })
})
