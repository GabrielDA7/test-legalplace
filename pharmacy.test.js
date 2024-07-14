import {
  DAFALGAN_NAME,
  Drug,
  FERVEX_NAME,
  HERBAL_TEA_NAME,
  MAGIC_PILL_NAME,
  Pharmacy,
} from "./pharmacy";

describe("Pharmacy", () => {
  it("Regular drugs: should decrease the benefit and expiresIn", () => {
    const regularName = "test";
    expect(
      new Pharmacy([
        new Drug(regularName, 2, 3),
        new Drug(regularName, 0, 2),
        new Drug(regularName, 2, 52),
        new Drug(regularName, 1, -1),
      ]).updateBenefitValue(),
    ).toEqual([
      new Drug(regularName, 1, 2),
      new Drug(regularName, -1, 0),
      new Drug(regularName, 1, 49),
      new Drug(regularName, 0, 0),
    ]);
  });

  it("Herbal Tea drugs: should increase the benefit and decrease expiresIn", () => {
    expect(
      new Pharmacy([
        new Drug(HERBAL_TEA_NAME, 2, 3),
        new Drug(HERBAL_TEA_NAME, 0, 2),
        new Drug(HERBAL_TEA_NAME, 2, 52),
        new Drug(HERBAL_TEA_NAME, 1, -1),
      ]).updateBenefitValue(),
    ).toEqual([
      new Drug(HERBAL_TEA_NAME, 1, 4),
      new Drug(HERBAL_TEA_NAME, -1, 4),
      new Drug(HERBAL_TEA_NAME, 1, 50),
      new Drug(HERBAL_TEA_NAME, 0, 1),
    ]);
  });

  it("Magic pill drugs: should not modify benefit and expiresIn", () => {
    expect(
      new Pharmacy([
        new Drug(MAGIC_PILL_NAME, 2, 3),
        new Drug(MAGIC_PILL_NAME, 0, 2),
        new Drug(MAGIC_PILL_NAME, 2, 52),
        new Drug(MAGIC_PILL_NAME, 1, -1),
      ]).updateBenefitValue(),
    ).toEqual([
      new Drug(MAGIC_PILL_NAME, 2, 3),
      new Drug(MAGIC_PILL_NAME, 0, 2),
      new Drug(MAGIC_PILL_NAME, 2, 50),
      new Drug(MAGIC_PILL_NAME, 1, 0),
    ]);
  });

  it("Fervex drugs: should increment the benefit according to expiration levels and set to 0 if the drug expires", () => {
    expect(
      new Pharmacy([
        new Drug(FERVEX_NAME, 10, 2),
        new Drug(FERVEX_NAME, 2, 2),
        new Drug(FERVEX_NAME, 0, 2),
        new Drug(FERVEX_NAME, 2, 52),
        new Drug(FERVEX_NAME, 1, -1),
      ]).updateBenefitValue(),
    ).toEqual([
      new Drug(FERVEX_NAME, 9, 4),
      new Drug(FERVEX_NAME, 1, 5),
      new Drug(FERVEX_NAME, -1, 0),
      new Drug(FERVEX_NAME, 1, 50),
      new Drug(FERVEX_NAME, 0, 3),
    ]);
  });

  it("Dafalgan drugs: should decrease the benefit by 2", () => {
    expect(
      new Pharmacy([
        new Drug(DAFALGAN_NAME, 2, 30),
        new Drug(DAFALGAN_NAME, 2, 52),
        new Drug(DAFALGAN_NAME, 1, -1),
      ]).updateBenefitValue(),
    ).toEqual([
      new Drug(DAFALGAN_NAME, 1, 28),
      new Drug(DAFALGAN_NAME, 1, 48),
      new Drug(DAFALGAN_NAME, 0, 0),
    ]);
  });
});
