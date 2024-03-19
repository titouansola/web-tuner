import { START_F, RANGE_F } from "./constants";

export function frequencyToPercentage(frequency) {
  return ((frequency - START_F) * 100) / RANGE_F;
}
