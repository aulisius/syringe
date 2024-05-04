export interface DefaultInjections {}

interface InjectionRef<Ref> {
  name: Ref;
}

interface Injection<Injections = DefaultInjections, Ref = keyof Injections> {
  name: Ref;
  uses: InjectionRef<Ref>[];
  injectFn(deps: Injections): Injections[Ref];
}
interface SyringeSolution<Injections> {
  fill(injections: Injection<Injections>[]): void;
  inject<K extends keyof Injections>(name: K): Injections[K];
}

export function createSyringe<Injections>(): SyringeSolution<Injections>;

export const Syringe: SyringeSolution<DefaultInjections>;
