import { authSelectors } from "../selectors";
import { fromJS } from "immutable";

const initialState = {
    auth: fromJS({
        isAuthenticated: false,
        isInitialized:   true,
    }),
};

describe("auth selectors", () => {
    test("should select is authenticated", () => {
        expect(
            authSelectors.selectIsAuthenticated(initialState)
        ).toMatchInlineSnapshot(`false`);
    });

    test("should select is initialized", () => {
        expect(
            authSelectors.selectIsInitialized(initialState)
        ).toMatchInlineSnapshot(`true`);
    });
});
