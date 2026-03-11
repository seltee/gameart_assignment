export abstract class Scene {
  abstract update(delta: number): void;
  abstract destroy(): void;
}
