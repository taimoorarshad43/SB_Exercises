import { render } from "@testing-library/react";
import Card from "./Card";

// Smoke test for Card component
it("renders without crashing", function() {
  render(
    <Card
      caption="Test caption"
      src="test.jpg"
      currNum={1}
      totalNum={3}
    />
  );
});

// Snapshot test for Card component
it("matches snapshot", function() {
  const { container } = render(
    <Card
      caption="Test caption"
      src="test.jpg"
      currNum={1}
      totalNum={3}
    />
  );
  expect(container).toMatchSnapshot();
});
