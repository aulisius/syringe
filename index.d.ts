export interface DefaultInjections {}

interface InjectionRef<Ref> {
  name: Ref;
}

interface Injection<Name extends keyof Deps, Deps = DefaultInjections> {
  name: Name;
  uses: InjectionRef<Exclude<keyof Deps, Name>>[];
  injectFn(deps: Pick<Deps, Exclude<keyof Deps, Name>>): Deps[Name];
}
interface SyringeSolution<Injections> {
  fill(injections: Injection<any, Injections>[]): void;
  inject<K extends keyof Injections>(name: K): Injections[K];
}

export function createSyringe<Injections>(): SyringeSolution<Injections>;

export const Syringe: SyringeSolution<DefaultInjections>;
