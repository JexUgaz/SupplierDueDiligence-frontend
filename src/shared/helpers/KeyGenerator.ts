export class KeyGenerator {
  public static generate(n: number) {
    return Array.from({ length: n }, (_, i) => `random-key-${i}-${Date.now()}`);
  }
}
