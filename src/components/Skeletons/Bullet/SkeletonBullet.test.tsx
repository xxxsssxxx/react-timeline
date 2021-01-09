import { render, screen } from "@testing-library/react";
import SkeletonBullet from "./SkeletonBullet";

describe("SkeletonBullet", () => {

  test("Use default pulse animation", () => {
    render(<SkeletonBullet />);

    const skeletons = screen.queryAllByTestId("skeleton-bullet");
    const isPulseAnimation = skeletons[0].classList.contains("animate-pulse");
    expect(isPulseAnimation).toBe(true);
  });

  test("Use pulse animation if send different of declared", () => {
    render(<SkeletonBullet animate={"bouncing-pulse"}/>);

    const skeletons = screen.queryAllByTestId("skeleton-bullet");
    const isPulseAnimation = skeletons[0].classList.contains("animate-pulse");
    expect(isPulseAnimation).toBe(true);
  });
});
