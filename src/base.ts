/** Base number type */
export type Unary = ReadonlyArray<1>;

/** The number zero. */
export type Zero = [];
/** The number one. */
export type One = Incr<Zero>;
/** The number two. */
export type Two = Incr<One>;

/** Increments a number. */
export type Incr<N extends Unary> = [1, ...N];

/** Decrements a number, or returns `never` if result would be negative. */
export type Decr<N extends Unary> = N extends Incr<infer U> ? U : never;

/** Adds two numbers. */
export type Add<N1 extends Unary, N2 extends Unary> = [...N1, ...N2];

/** Subtracts two numbers, or returns `never` if result would be negative. */
export type Sub<N1 extends Unary, N2 extends Unary> =
    Decr<N1> extends never
    ? (Decr<N2> extends never ? Zero : never)
    : (Decr<N2> extends never ? N1 : Sub<Decr<N1>, Decr<N2>>);

/** Multiplies two numbers. */
export type Mul<N1 extends Unary, N2 extends Unary> = N2 extends Zero ? Zero : [...N1, ...Mul<N1, Decr<N2>>];

/** Divides two numbers and returns the quotient. */
export type Div<N1 extends Unary, N2 extends Unary, Q extends Unary = Zero> =
    Sub<N1, N2> extends never ? Q : Div<Sub<N1, N2>, N2, Incr<Q>>;

/** Divides two numbers and returns the remainder. */
export type Mod<N1 extends Unary, N2 extends Unary> =
    Sub<N1, N2> extends never ? N1 : Mod<Sub<N1, N2>, N2>;

export type Half<N extends Unary> = Div<N, Two>;
export type Double<N extends Unary> = Mul<N, Two>;

export type Sqr<N extends Unary> = Mul<N, N>;

/** Calculates `N` raised to the power `P`. */
export type Pow<N extends Unary, P extends Unary> = P extends Zero ? One : Mul<Pow<N, Decr<P>>, N>;

/** Checks the parity of a number and returns `E` for even and `O` for odd. */
export type Parity<N extends Unary, E, O> = Mod<N, Two> extends Zero ? E : O;

/** Returns `Y` if `N1 < N2`, else `N`. */
export type LT<N1 extends Unary, N2 extends Unary, Y, N> =
    Sub<N1, N2> extends never ? Y : N;