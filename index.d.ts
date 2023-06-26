interface InjectionRef {
  name: string;
}

interface Injection<T> {
  name: string;
  uses: InjectionRefs[];
  injectFn(): T;
}

export interface SyringeSolution {
  fill(injections: Injection<T>[]): void;
  inject<T>(name: string): T;
}

export const Syringe: SyringeSolution;
