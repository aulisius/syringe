interface InjectionRef {
  name: string;
}

interface Injection<T> {
  name: string;
  uses: InjectionRefs[];
  injectFn(): T;
}

interface SyringeSolution {
  fill(injections: Injection<T>[]): void;
  inject<T>(name: string): T;
}

export function createSyringe(): SyringeSolution;

export const Syringe: SyringeSolution;
