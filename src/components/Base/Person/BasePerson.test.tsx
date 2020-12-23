import { render, screen } from "@testing-library/react";
import BasePerson from "./BasePerson";
import { activities } from "../../../mocks/mocks";

describe("BasePerson", () => {
  const personMock = activities[0].assignee;

  test("Renders Person", () => {
    render(<BasePerson person={personMock} />);
    const person = screen.getByTestId("person");
    expect(person).toBeInTheDocument();
  });

  test("Render image if avatar is setted up", () => {
    personMock.avatar = "some image";
    render(<BasePerson person={personMock} />);
    const img = screen.getByAltText(personMock.name);
    expect(img).toBeInTheDocument();
  });

  test("Not render image if avatar is not setted up", () => {
    personMock.avatar = undefined;
    render(<BasePerson person={personMock} />);
    const img = screen.queryByAltText(personMock.name);
    expect(img).toBeNull();
  });
});
