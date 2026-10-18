import { describe, it, expect } from "vitest";
import { exerciseDatabase } from "./exerciseDatabase";
import { pathPlacements, blockPlacements, getPlacesForExercise, getExercisesForPath } from "./placements";

describe("exercise placements", () => {
  it("every exercise has at least one home", () => {
    const orphans = exerciseDatabase.filter((e) => getPlacesForExercise(e.slug).length === 0).map((e) => e.slug);
    expect(orphans).toEqual([]);
  });
  it("every placed slug exists", () => {
    const slugs = new Set(exerciseDatabase.map((e) => e.slug));
    const all = [...Object.values(pathPlacements).flatMap((p) => p.slugs), ...Object.values(blockPlacements).flat()];
    expect(all.filter((s) => !slugs.has(s))).toEqual([]);
  });
  it("no duplicates within a place", () => {
    for (const list of [...Object.values(pathPlacements).map((p) => p.slugs), ...Object.values(blockPlacements)]) {
      expect(new Set(list).size).toBe(list.length);
    }
  });
  it("ring exercises live in Rings Mastery", () => {
    const rings = getExercisesForPath("rings-mastery").map((e) => e.slug);
    expect(rings).toEqual(expect.arrayContaining(["ring-dip", "ring-push-up", "ring-row", "iron-cross"]));
  });
  it("no duplicate Crow Pose entries", () => {
    expect(exerciseDatabase.filter((e) => e.name.startsWith("Crow Pose")).length).toBe(1);
  });
});
