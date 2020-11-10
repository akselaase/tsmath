import { Decr, Div, EQ, Incr, LT, LTE, Mod, Mul, One, Sub, Unary, Zero } from "./base";

/** Returns all factors of `N`, including 1 and `N` itself. */
type FactorsOf<N extends Unary, C extends Unary = One> = LTE<N, C> extends true ? never :
    (Mod<N, C> extends Zero ? C : never) | FactorsOf<N, Incr<C>>;

/** Returns factors of `N` excluding 1 and `N`. */
type InnerFactorsOf<N extends Unary> = Exclude<FactorsOf<N>, One | N>;

/** Checks whether `N` is prime or not. */
type IsPrime<N extends Unary> = InnerFactorsOf<N> extends never ? true : false;

type Five = [1, 1, 1, 1, 1];
type All = FactorsOf<Five>; // === [1] | [1, 1, 1, 1, 1]
type Inner = InnerFactorsOf<Five>; // === never

type FiveIsPrime = IsPrime<Five>;
type FourIsPrime = IsPrime<Decr<Five>>;