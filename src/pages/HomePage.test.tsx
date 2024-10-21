import { render } from "@testing-library/react";

import * as CategoryList from "../components/CategoryList";
import HomePage from "./HomePage";

const categoryListComponentSpy = vi
  .spyOn(CategoryList, "default")
  .mockReturnValue(<div>category list</div>);

test("should render the category list component", function () {
  render(<HomePage />);
  expect(categoryListComponentSpy).toHaveBeenCalledTimes(1);
});
