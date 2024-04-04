import { render } from "@testing-library/react-native";
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
    const { getByText } = render(
      <HomeScreen navigation={{ navigate: jest.fn() }} />
    );
    const parkButton = getByText("Test Park");
    expect(parkButton).toBeDefined();
  });
});
