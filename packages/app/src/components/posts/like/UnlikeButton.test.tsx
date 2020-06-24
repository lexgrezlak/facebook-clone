import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UnlikeButton from "./UnlikeButton";

describe("UnlikeButton", () => {
  it("clicking the button should call the event handler once", () => {
    const mockHandler = jest.fn();
    const component = render(<UnlikeButton handleClick={mockHandler} />);
    const button = component.container.querySelector(
      "button"
    ) as HTMLButtonElement;
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
  });
});
