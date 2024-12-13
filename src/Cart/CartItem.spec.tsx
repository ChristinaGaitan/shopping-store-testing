import { fireEvent } from "@testing-library/react";
import { Product } from "../shared/types";
import { CartItem } from "./CartItem";

describe("CartItem", () => {
    const product: Product = {
        name: "Product foo",
        price: 100,
        image: "/image/source.png"
    }

    it("renders correctly", () => {
        const { container, getByAltText } = renderWithRouter(() => (
            <CartItem product={product} removeFromCart={() => {}}/>
        ));

        expect(container.innerHTML).toMatch("Product foo");
        expect(container.innerHTML).toMatch("100 Zm");
        expect(getByAltText("Product foo")).toHaveAttribute("src", "/image/source.png");
    });

    describe("on 'Remove' click", () => {
        it("calls passed in function", () => {
            const removeFromCartMock = jest.fn()

            const { getByText } = renderWithRouter(() => (
                <CartItem product={product} removeFromCart={removeFromCartMock}/>
            ));

            fireEvent.click(getByText("Remove"));
            
            expect(removeFromCartMock).toBeCalledWith(product);
        });
    });
})