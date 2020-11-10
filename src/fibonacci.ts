import { Add, Decr, One, Unary, Zero } from "./base";

export type Fib<N extends Unary, N0 extends Unary = Zero, N1 extends Unary = One> =
    N extends Zero
    ? N0
    : N extends One
    ? N1
    : Fib<Decr<N>, N1, Add<N0, N1>>;

// Example
type F6 = Fib<[1, 1, 1, 1, 1, 1, 1]>; // === 13