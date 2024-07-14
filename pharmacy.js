const MIN_BENEFIT_VALUE = 0;
const MAX_BENEFIT_VALUE = 50;
const FERVEX_FIRST_THRESHOLD = 11;
const FERVEX_SECOND_THRESHOLD = 6;

export const HERBAL_TEA_NAME = "Herbal Tea";
export const MAGIC_PILL_NAME = "Magic Pill";
export const FERVEX_NAME = "Fervex";

function clampBenefit(benefit) {
  return Math.max(Math.min(benefit, MAX_BENEFIT_VALUE), MIN_BENEFIT_VALUE);
}

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = clampBenefit(benefit);
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateRegularDrug(drug) {
    let { expiresIn, benefit } = drug;
    if (benefit > MIN_BENEFIT_VALUE) {
      benefit--;
    }
    expiresIn--;

    if (expiresIn < 0 && benefit > MIN_BENEFIT_VALUE) {
      benefit--;
    }

    return new Drug(drug.name, expiresIn, benefit);
  }

  updateHerbalTea(drug) {
    let { expiresIn, benefit } = drug;
    if (benefit < MAX_BENEFIT_VALUE) {
      benefit++;
    }
    expiresIn--;

    if (expiresIn < 0 && benefit < MAX_BENEFIT_VALUE) {
      benefit++;
    }

    return new Drug(drug.name, expiresIn, benefit);
  }

  updateFervex(drug) {
    let { expiresIn, benefit } = drug;
    if (benefit < MAX_BENEFIT_VALUE) {
      benefit++;
      if (expiresIn < FERVEX_FIRST_THRESHOLD) {
        benefit++;
      }
      if (expiresIn < FERVEX_SECOND_THRESHOLD) {
        benefit++;
      }
    }
    expiresIn--;

    if (expiresIn < 0) {
      benefit = MIN_BENEFIT_VALUE;
    }

    return new Drug(drug.name, expiresIn, benefit);
  }

  updateBenefitValue() {
    return this.drugs.map((drug) => {
      switch (drug.name) {
        case HERBAL_TEA_NAME:
          return this.updateHerbalTea(drug);
        case MAGIC_PILL_NAME:
          return drug;
        case FERVEX_NAME:
          return this.updateFervex(drug);
        default:
          return this.updateRegularDrug(drug);
      }
    });
  }
}
