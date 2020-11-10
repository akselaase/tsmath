import { Unary, Zero, Two, Parity, Incr, Decr, Mul, Div } from './base';

type Three = Incr<Two>;

/**
 * Performs one iteration of the collatz sequence
 */
export type Iter<N extends Unary> = Parity<N,
    Div<N, Two>,
    Incr<Mul<N, Three>>
>;

/**
 * Performs `I` iterations of the collatz sequence starting at number `N`.
 */
export type Collatz<N extends Unary, I extends Unary> = I extends Zero
    ? N
    : Collatz<Iter<N>, Decr<I>>;

// Examples
type C12_2 = Collatz<[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1]>; // === 3
type C12_3 = Collatz<[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1]>; // === 10