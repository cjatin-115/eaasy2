// Re-exporting from cnPracticalsData with JAVA_CODES compatibility
import { PRACTICALS_DATA } from "./cnPracticalsData";

export const JAVA_CODES = PRACTICALS_DATA.map(p => ({
  title: p.title,
  code: p.code
}));

export * from "./cnPracticalsData";
