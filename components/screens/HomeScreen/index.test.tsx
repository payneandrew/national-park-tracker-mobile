import { render, waitFor } from "@testing-library/react-native";
import HomeScreen from ".";

describe("<StatesScreen />", () => {
  it("renders loading indicator initially", () => {
    const { getByTestId } = render(
      <HomeScreen navigation={{ navigate: jest.fn() }} />
    );
    const loadingIndicator = getByTestId("loading-indicator");
    expect(loadingIndicator).toBeTruthy();
  });

  it("renders park buttons after loading", async () => {
    const { getByText, getByTestId } = render(
      <HomeScreen navigation={{ navigate: jest.fn() }} />
    );
    const loadingIndicator = getByTestId("loading-indicator");
    await waitFor(() => {
      // Wait for the element to disappear
      expect(loadingIndicator).toBeFalsy();
    });
    const parkButton = getByText("Arches National Park");
    expect(parkButton).toBeDefined();
  });
});
