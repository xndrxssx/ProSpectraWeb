
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model user
 * 
 */
export type user = $Result.DefaultSelection<Prisma.$userPayload>
/**
 * Model filter
 * 
 */
export type filter = $Result.DefaultSelection<Prisma.$filterPayload>
/**
 * Model predictions
 * 
 */
export type predictions = $Result.DefaultSelection<Prisma.$predictionsPayload>
/**
 * Model predictivemodel
 * 
 */
export type predictivemodel = $Result.DefaultSelection<Prisma.$predictivemodelPayload>
/**
 * Model spectra
 * 
 */
export type spectra = $Result.DefaultSelection<Prisma.$spectraPayload>
/**
 * Model spectrumdata
 * 
 */
export type spectrumdata = $Result.DefaultSelection<Prisma.$spectrumdataPayload>
/**
 * Model targetdata
 * 
 */
export type targetdata = $Result.DefaultSelection<Prisma.$targetdataPayload>
/**
 * Model variety
 * 
 */
export type variety = $Result.DefaultSelection<Prisma.$varietyPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<ExtArgs>;

  /**
   * `prisma.filter`: Exposes CRUD operations for the **filter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Filters
    * const filters = await prisma.filter.findMany()
    * ```
    */
  get filter(): Prisma.filterDelegate<ExtArgs>;

  /**
   * `prisma.predictions`: Exposes CRUD operations for the **predictions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Predictions
    * const predictions = await prisma.predictions.findMany()
    * ```
    */
  get predictions(): Prisma.predictionsDelegate<ExtArgs>;

  /**
   * `prisma.predictivemodel`: Exposes CRUD operations for the **predictivemodel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Predictivemodels
    * const predictivemodels = await prisma.predictivemodel.findMany()
    * ```
    */
  get predictivemodel(): Prisma.predictivemodelDelegate<ExtArgs>;

  /**
   * `prisma.spectra`: Exposes CRUD operations for the **spectra** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Spectras
    * const spectras = await prisma.spectra.findMany()
    * ```
    */
  get spectra(): Prisma.spectraDelegate<ExtArgs>;

  /**
   * `prisma.spectrumdata`: Exposes CRUD operations for the **spectrumdata** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Spectrumdata
    * const spectrumdata = await prisma.spectrumdata.findMany()
    * ```
    */
  get spectrumdata(): Prisma.spectrumdataDelegate<ExtArgs>;

  /**
   * `prisma.targetdata`: Exposes CRUD operations for the **targetdata** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Targetdata
    * const targetdata = await prisma.targetdata.findMany()
    * ```
    */
  get targetdata(): Prisma.targetdataDelegate<ExtArgs>;

  /**
   * `prisma.variety`: Exposes CRUD operations for the **variety** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Varieties
    * const varieties = await prisma.variety.findMany()
    * ```
    */
  get variety(): Prisma.varietyDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 393aa359c9ad4a4bb28630fb5613f9c281cde053
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    user: 'user',
    filter: 'filter',
    predictions: 'predictions',
    predictivemodel: 'predictivemodel',
    spectra: 'spectra',
    spectrumdata: 'spectrumdata',
    targetdata: 'targetdata',
    variety: 'variety'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "filter" | "predictions" | "predictivemodel" | "spectra" | "spectrumdata" | "targetdata" | "variety"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      user: {
        payload: Prisma.$userPayload<ExtArgs>
        fields: Prisma.userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findFirst: {
            args: Prisma.userFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findMany: {
            args: Prisma.userFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          create: {
            args: Prisma.userCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          createMany: {
            args: Prisma.userCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.userDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          update: {
            args: Prisma.userUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          deleteMany: {
            args: Prisma.userDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.userUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.userUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.userGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.userCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      filter: {
        payload: Prisma.$filterPayload<ExtArgs>
        fields: Prisma.filterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.filterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$filterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.filterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$filterPayload>
          }
          findFirst: {
            args: Prisma.filterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$filterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.filterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$filterPayload>
          }
          findMany: {
            args: Prisma.filterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$filterPayload>[]
          }
          create: {
            args: Prisma.filterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$filterPayload>
          }
          createMany: {
            args: Prisma.filterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.filterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$filterPayload>
          }
          update: {
            args: Prisma.filterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$filterPayload>
          }
          deleteMany: {
            args: Prisma.filterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.filterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.filterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$filterPayload>
          }
          aggregate: {
            args: Prisma.FilterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFilter>
          }
          groupBy: {
            args: Prisma.filterGroupByArgs<ExtArgs>
            result: $Utils.Optional<FilterGroupByOutputType>[]
          }
          count: {
            args: Prisma.filterCountArgs<ExtArgs>
            result: $Utils.Optional<FilterCountAggregateOutputType> | number
          }
        }
      }
      predictions: {
        payload: Prisma.$predictionsPayload<ExtArgs>
        fields: Prisma.predictionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.predictionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.predictionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictionsPayload>
          }
          findFirst: {
            args: Prisma.predictionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.predictionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictionsPayload>
          }
          findMany: {
            args: Prisma.predictionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictionsPayload>[]
          }
          create: {
            args: Prisma.predictionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictionsPayload>
          }
          createMany: {
            args: Prisma.predictionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.predictionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictionsPayload>
          }
          update: {
            args: Prisma.predictionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictionsPayload>
          }
          deleteMany: {
            args: Prisma.predictionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.predictionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.predictionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictionsPayload>
          }
          aggregate: {
            args: Prisma.PredictionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePredictions>
          }
          groupBy: {
            args: Prisma.predictionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PredictionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.predictionsCountArgs<ExtArgs>
            result: $Utils.Optional<PredictionsCountAggregateOutputType> | number
          }
        }
      }
      predictivemodel: {
        payload: Prisma.$predictivemodelPayload<ExtArgs>
        fields: Prisma.predictivemodelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.predictivemodelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictivemodelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.predictivemodelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictivemodelPayload>
          }
          findFirst: {
            args: Prisma.predictivemodelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictivemodelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.predictivemodelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictivemodelPayload>
          }
          findMany: {
            args: Prisma.predictivemodelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictivemodelPayload>[]
          }
          create: {
            args: Prisma.predictivemodelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictivemodelPayload>
          }
          createMany: {
            args: Prisma.predictivemodelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.predictivemodelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictivemodelPayload>
          }
          update: {
            args: Prisma.predictivemodelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictivemodelPayload>
          }
          deleteMany: {
            args: Prisma.predictivemodelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.predictivemodelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.predictivemodelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$predictivemodelPayload>
          }
          aggregate: {
            args: Prisma.PredictivemodelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePredictivemodel>
          }
          groupBy: {
            args: Prisma.predictivemodelGroupByArgs<ExtArgs>
            result: $Utils.Optional<PredictivemodelGroupByOutputType>[]
          }
          count: {
            args: Prisma.predictivemodelCountArgs<ExtArgs>
            result: $Utils.Optional<PredictivemodelCountAggregateOutputType> | number
          }
        }
      }
      spectra: {
        payload: Prisma.$spectraPayload<ExtArgs>
        fields: Prisma.spectraFieldRefs
        operations: {
          findUnique: {
            args: Prisma.spectraFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spectraPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.spectraFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spectraPayload>
          }
          findFirst: {
            args: Prisma.spectraFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spectraPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.spectraFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spectraPayload>
          }
          findMany: {
            args: Prisma.spectraFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spectraPayload>[]
          }
          create: {
            args: Prisma.spectraCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spectraPayload>
          }
          createMany: {
            args: Prisma.spectraCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.spectraDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spectraPayload>
          }
          update: {
            args: Prisma.spectraUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spectraPayload>
          }
          deleteMany: {
            args: Prisma.spectraDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.spectraUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.spectraUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spectraPayload>
          }
          aggregate: {
            args: Prisma.SpectraAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpectra>
          }
          groupBy: {
            args: Prisma.spectraGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpectraGroupByOutputType>[]
          }
          count: {
            args: Prisma.spectraCountArgs<ExtArgs>
            result: $Utils.Optional<SpectraCountAggregateOutputType> | number
          }
        }
      }
      spectrumdata: {
        payload: Prisma.$spectrumdataPayload<ExtArgs>
        fields: Prisma.spectrumdataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.spectrumdataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spectrumdataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.spectrumdataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spectrumdataPayload>
          }
          findFirst: {
            args: Prisma.spectrumdataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spectrumdataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.spectrumdataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spectrumdataPayload>
          }
          findMany: {
            args: Prisma.spectrumdataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spectrumdataPayload>[]
          }
          create: {
            args: Prisma.spectrumdataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spectrumdataPayload>
          }
          createMany: {
            args: Prisma.spectrumdataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.spectrumdataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spectrumdataPayload>
          }
          update: {
            args: Prisma.spectrumdataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spectrumdataPayload>
          }
          deleteMany: {
            args: Prisma.spectrumdataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.spectrumdataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.spectrumdataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$spectrumdataPayload>
          }
          aggregate: {
            args: Prisma.SpectrumdataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpectrumdata>
          }
          groupBy: {
            args: Prisma.spectrumdataGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpectrumdataGroupByOutputType>[]
          }
          count: {
            args: Prisma.spectrumdataCountArgs<ExtArgs>
            result: $Utils.Optional<SpectrumdataCountAggregateOutputType> | number
          }
        }
      }
      targetdata: {
        payload: Prisma.$targetdataPayload<ExtArgs>
        fields: Prisma.targetdataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.targetdataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$targetdataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.targetdataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$targetdataPayload>
          }
          findFirst: {
            args: Prisma.targetdataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$targetdataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.targetdataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$targetdataPayload>
          }
          findMany: {
            args: Prisma.targetdataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$targetdataPayload>[]
          }
          create: {
            args: Prisma.targetdataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$targetdataPayload>
          }
          createMany: {
            args: Prisma.targetdataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.targetdataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$targetdataPayload>
          }
          update: {
            args: Prisma.targetdataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$targetdataPayload>
          }
          deleteMany: {
            args: Prisma.targetdataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.targetdataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.targetdataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$targetdataPayload>
          }
          aggregate: {
            args: Prisma.TargetdataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTargetdata>
          }
          groupBy: {
            args: Prisma.targetdataGroupByArgs<ExtArgs>
            result: $Utils.Optional<TargetdataGroupByOutputType>[]
          }
          count: {
            args: Prisma.targetdataCountArgs<ExtArgs>
            result: $Utils.Optional<TargetdataCountAggregateOutputType> | number
          }
        }
      }
      variety: {
        payload: Prisma.$varietyPayload<ExtArgs>
        fields: Prisma.varietyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.varietyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$varietyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.varietyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$varietyPayload>
          }
          findFirst: {
            args: Prisma.varietyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$varietyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.varietyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$varietyPayload>
          }
          findMany: {
            args: Prisma.varietyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$varietyPayload>[]
          }
          create: {
            args: Prisma.varietyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$varietyPayload>
          }
          createMany: {
            args: Prisma.varietyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.varietyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$varietyPayload>
          }
          update: {
            args: Prisma.varietyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$varietyPayload>
          }
          deleteMany: {
            args: Prisma.varietyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.varietyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.varietyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$varietyPayload>
          }
          aggregate: {
            args: Prisma.VarietyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVariety>
          }
          groupBy: {
            args: Prisma.varietyGroupByArgs<ExtArgs>
            result: $Utils.Optional<VarietyGroupByOutputType>[]
          }
          count: {
            args: Prisma.varietyCountArgs<ExtArgs>
            result: $Utils.Optional<VarietyCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model user
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    userType: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    userType: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    userType: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    userType?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    userType?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    userType?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type userGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
    orderBy?: userOrderByWithAggregationInput | userOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    username: string
    password: string
    userType: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends userGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type userSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    userType?: boolean
  }, ExtArgs["result"]["user"]>


  export type userSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    userType?: boolean
  }


  export type $userPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      password: string
      userType: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type userGetPayload<S extends boolean | null | undefined | userDefaultArgs> = $Result.GetResult<Prisma.$userPayload, S>

  type userCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<userFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface userDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user'], meta: { name: 'user' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userFindUniqueArgs>(args: SelectSubset<T, userFindUniqueArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs>(args: SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userFindFirstArgs>(args?: SelectSubset<T, userFindFirstArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userFindFirstOrThrowArgs>(args?: SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends userFindManyArgs>(args?: SelectSubset<T, userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends userCreateArgs>(args: SelectSubset<T, userCreateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {userCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends userCreateManyArgs>(args?: SelectSubset<T, userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends userDeleteArgs>(args: SelectSubset<T, userDeleteArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends userUpdateArgs>(args: SelectSubset<T, userUpdateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends userDeleteManyArgs>(args?: SelectSubset<T, userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends userUpdateManyArgs>(args: SelectSubset<T, userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends userUpsertArgs>(args: SelectSubset<T, userUpsertArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userGroupByArgs['orderBy'] }
        : { orderBy?: userGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user model
   */
  readonly fields: userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user model
   */ 
  interface userFieldRefs {
    readonly id: FieldRef<"user", 'Int'>
    readonly username: FieldRef<"user", 'String'>
    readonly password: FieldRef<"user", 'String'>
    readonly userType: FieldRef<"user", 'String'>
  }
    

  // Custom InputTypes
  /**
   * user findUnique
   */
  export type userFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findUniqueOrThrow
   */
  export type userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findFirst
   */
  export type userFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findFirstOrThrow
   */
  export type userFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findMany
   */
  export type userFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user create
   */
  export type userCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * The data needed to create a user.
     */
    data: XOR<userCreateInput, userUncheckedCreateInput>
  }

  /**
   * user createMany
   */
  export type userCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user update
   */
  export type userUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * The data needed to update a user.
     */
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     */
    where: userWhereUniqueInput
  }

  /**
   * user updateMany
   */
  export type userUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
  }

  /**
   * user upsert
   */
  export type userUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
  }

  /**
   * user delete
   */
  export type userDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Filter which user to delete.
     */
    where: userWhereUniqueInput
  }

  /**
   * user deleteMany
   */
  export type userDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: userWhereInput
  }

  /**
   * user without action
   */
  export type userDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
  }


  /**
   * Model filter
   */

  export type AggregateFilter = {
    _count: FilterCountAggregateOutputType | null
    _avg: FilterAvgAggregateOutputType | null
    _sum: FilterSumAggregateOutputType | null
    _min: FilterMinAggregateOutputType | null
    _max: FilterMaxAggregateOutputType | null
  }

  export type FilterAvgAggregateOutputType = {
    id: number | null
  }

  export type FilterSumAggregateOutputType = {
    id: number | null
  }

  export type FilterMinAggregateOutputType = {
    id: number | null
    name: string | null
    type: string | null
    createdAt: Date | null
  }

  export type FilterMaxAggregateOutputType = {
    id: number | null
    name: string | null
    type: string | null
    createdAt: Date | null
  }

  export type FilterCountAggregateOutputType = {
    id: number
    name: number
    type: number
    parameters: number
    createdAt: number
    _all: number
  }


  export type FilterAvgAggregateInputType = {
    id?: true
  }

  export type FilterSumAggregateInputType = {
    id?: true
  }

  export type FilterMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    createdAt?: true
  }

  export type FilterMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    createdAt?: true
  }

  export type FilterCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    parameters?: true
    createdAt?: true
    _all?: true
  }

  export type FilterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which filter to aggregate.
     */
    where?: filterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of filters to fetch.
     */
    orderBy?: filterOrderByWithRelationInput | filterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: filterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` filters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` filters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned filters
    **/
    _count?: true | FilterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FilterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FilterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FilterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FilterMaxAggregateInputType
  }

  export type GetFilterAggregateType<T extends FilterAggregateArgs> = {
        [P in keyof T & keyof AggregateFilter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFilter[P]>
      : GetScalarType<T[P], AggregateFilter[P]>
  }




  export type filterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: filterWhereInput
    orderBy?: filterOrderByWithAggregationInput | filterOrderByWithAggregationInput[]
    by: FilterScalarFieldEnum[] | FilterScalarFieldEnum
    having?: filterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FilterCountAggregateInputType | true
    _avg?: FilterAvgAggregateInputType
    _sum?: FilterSumAggregateInputType
    _min?: FilterMinAggregateInputType
    _max?: FilterMaxAggregateInputType
  }

  export type FilterGroupByOutputType = {
    id: number
    name: string
    type: string
    parameters: JsonValue
    createdAt: Date
    _count: FilterCountAggregateOutputType | null
    _avg: FilterAvgAggregateOutputType | null
    _sum: FilterSumAggregateOutputType | null
    _min: FilterMinAggregateOutputType | null
    _max: FilterMaxAggregateOutputType | null
  }

  type GetFilterGroupByPayload<T extends filterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FilterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FilterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FilterGroupByOutputType[P]>
            : GetScalarType<T[P], FilterGroupByOutputType[P]>
        }
      >
    >


  export type filterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    parameters?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["filter"]>


  export type filterSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    parameters?: boolean
    createdAt?: boolean
  }


  export type $filterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "filter"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      type: string
      parameters: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["filter"]>
    composites: {}
  }

  type filterGetPayload<S extends boolean | null | undefined | filterDefaultArgs> = $Result.GetResult<Prisma.$filterPayload, S>

  type filterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<filterFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FilterCountAggregateInputType | true
    }

  export interface filterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['filter'], meta: { name: 'filter' } }
    /**
     * Find zero or one Filter that matches the filter.
     * @param {filterFindUniqueArgs} args - Arguments to find a Filter
     * @example
     * // Get one Filter
     * const filter = await prisma.filter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends filterFindUniqueArgs>(args: SelectSubset<T, filterFindUniqueArgs<ExtArgs>>): Prisma__filterClient<$Result.GetResult<Prisma.$filterPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Filter that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {filterFindUniqueOrThrowArgs} args - Arguments to find a Filter
     * @example
     * // Get one Filter
     * const filter = await prisma.filter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends filterFindUniqueOrThrowArgs>(args: SelectSubset<T, filterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__filterClient<$Result.GetResult<Prisma.$filterPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Filter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {filterFindFirstArgs} args - Arguments to find a Filter
     * @example
     * // Get one Filter
     * const filter = await prisma.filter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends filterFindFirstArgs>(args?: SelectSubset<T, filterFindFirstArgs<ExtArgs>>): Prisma__filterClient<$Result.GetResult<Prisma.$filterPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Filter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {filterFindFirstOrThrowArgs} args - Arguments to find a Filter
     * @example
     * // Get one Filter
     * const filter = await prisma.filter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends filterFindFirstOrThrowArgs>(args?: SelectSubset<T, filterFindFirstOrThrowArgs<ExtArgs>>): Prisma__filterClient<$Result.GetResult<Prisma.$filterPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Filters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {filterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Filters
     * const filters = await prisma.filter.findMany()
     * 
     * // Get first 10 Filters
     * const filters = await prisma.filter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const filterWithIdOnly = await prisma.filter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends filterFindManyArgs>(args?: SelectSubset<T, filterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$filterPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Filter.
     * @param {filterCreateArgs} args - Arguments to create a Filter.
     * @example
     * // Create one Filter
     * const Filter = await prisma.filter.create({
     *   data: {
     *     // ... data to create a Filter
     *   }
     * })
     * 
     */
    create<T extends filterCreateArgs>(args: SelectSubset<T, filterCreateArgs<ExtArgs>>): Prisma__filterClient<$Result.GetResult<Prisma.$filterPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Filters.
     * @param {filterCreateManyArgs} args - Arguments to create many Filters.
     * @example
     * // Create many Filters
     * const filter = await prisma.filter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends filterCreateManyArgs>(args?: SelectSubset<T, filterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Filter.
     * @param {filterDeleteArgs} args - Arguments to delete one Filter.
     * @example
     * // Delete one Filter
     * const Filter = await prisma.filter.delete({
     *   where: {
     *     // ... filter to delete one Filter
     *   }
     * })
     * 
     */
    delete<T extends filterDeleteArgs>(args: SelectSubset<T, filterDeleteArgs<ExtArgs>>): Prisma__filterClient<$Result.GetResult<Prisma.$filterPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Filter.
     * @param {filterUpdateArgs} args - Arguments to update one Filter.
     * @example
     * // Update one Filter
     * const filter = await prisma.filter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends filterUpdateArgs>(args: SelectSubset<T, filterUpdateArgs<ExtArgs>>): Prisma__filterClient<$Result.GetResult<Prisma.$filterPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Filters.
     * @param {filterDeleteManyArgs} args - Arguments to filter Filters to delete.
     * @example
     * // Delete a few Filters
     * const { count } = await prisma.filter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends filterDeleteManyArgs>(args?: SelectSubset<T, filterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Filters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {filterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Filters
     * const filter = await prisma.filter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends filterUpdateManyArgs>(args: SelectSubset<T, filterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Filter.
     * @param {filterUpsertArgs} args - Arguments to update or create a Filter.
     * @example
     * // Update or create a Filter
     * const filter = await prisma.filter.upsert({
     *   create: {
     *     // ... data to create a Filter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Filter we want to update
     *   }
     * })
     */
    upsert<T extends filterUpsertArgs>(args: SelectSubset<T, filterUpsertArgs<ExtArgs>>): Prisma__filterClient<$Result.GetResult<Prisma.$filterPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Filters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {filterCountArgs} args - Arguments to filter Filters to count.
     * @example
     * // Count the number of Filters
     * const count = await prisma.filter.count({
     *   where: {
     *     // ... the filter for the Filters we want to count
     *   }
     * })
    **/
    count<T extends filterCountArgs>(
      args?: Subset<T, filterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FilterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FilterAggregateArgs>(args: Subset<T, FilterAggregateArgs>): Prisma.PrismaPromise<GetFilterAggregateType<T>>

    /**
     * Group by Filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {filterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends filterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: filterGroupByArgs['orderBy'] }
        : { orderBy?: filterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, filterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFilterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the filter model
   */
  readonly fields: filterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for filter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__filterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the filter model
   */ 
  interface filterFieldRefs {
    readonly id: FieldRef<"filter", 'Int'>
    readonly name: FieldRef<"filter", 'String'>
    readonly type: FieldRef<"filter", 'String'>
    readonly parameters: FieldRef<"filter", 'Json'>
    readonly createdAt: FieldRef<"filter", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * filter findUnique
   */
  export type filterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the filter
     */
    select?: filterSelect<ExtArgs> | null
    /**
     * Filter, which filter to fetch.
     */
    where: filterWhereUniqueInput
  }

  /**
   * filter findUniqueOrThrow
   */
  export type filterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the filter
     */
    select?: filterSelect<ExtArgs> | null
    /**
     * Filter, which filter to fetch.
     */
    where: filterWhereUniqueInput
  }

  /**
   * filter findFirst
   */
  export type filterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the filter
     */
    select?: filterSelect<ExtArgs> | null
    /**
     * Filter, which filter to fetch.
     */
    where?: filterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of filters to fetch.
     */
    orderBy?: filterOrderByWithRelationInput | filterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for filters.
     */
    cursor?: filterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` filters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` filters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of filters.
     */
    distinct?: FilterScalarFieldEnum | FilterScalarFieldEnum[]
  }

  /**
   * filter findFirstOrThrow
   */
  export type filterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the filter
     */
    select?: filterSelect<ExtArgs> | null
    /**
     * Filter, which filter to fetch.
     */
    where?: filterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of filters to fetch.
     */
    orderBy?: filterOrderByWithRelationInput | filterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for filters.
     */
    cursor?: filterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` filters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` filters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of filters.
     */
    distinct?: FilterScalarFieldEnum | FilterScalarFieldEnum[]
  }

  /**
   * filter findMany
   */
  export type filterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the filter
     */
    select?: filterSelect<ExtArgs> | null
    /**
     * Filter, which filters to fetch.
     */
    where?: filterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of filters to fetch.
     */
    orderBy?: filterOrderByWithRelationInput | filterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing filters.
     */
    cursor?: filterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` filters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` filters.
     */
    skip?: number
    distinct?: FilterScalarFieldEnum | FilterScalarFieldEnum[]
  }

  /**
   * filter create
   */
  export type filterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the filter
     */
    select?: filterSelect<ExtArgs> | null
    /**
     * The data needed to create a filter.
     */
    data: XOR<filterCreateInput, filterUncheckedCreateInput>
  }

  /**
   * filter createMany
   */
  export type filterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many filters.
     */
    data: filterCreateManyInput | filterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * filter update
   */
  export type filterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the filter
     */
    select?: filterSelect<ExtArgs> | null
    /**
     * The data needed to update a filter.
     */
    data: XOR<filterUpdateInput, filterUncheckedUpdateInput>
    /**
     * Choose, which filter to update.
     */
    where: filterWhereUniqueInput
  }

  /**
   * filter updateMany
   */
  export type filterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update filters.
     */
    data: XOR<filterUpdateManyMutationInput, filterUncheckedUpdateManyInput>
    /**
     * Filter which filters to update
     */
    where?: filterWhereInput
  }

  /**
   * filter upsert
   */
  export type filterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the filter
     */
    select?: filterSelect<ExtArgs> | null
    /**
     * The filter to search for the filter to update in case it exists.
     */
    where: filterWhereUniqueInput
    /**
     * In case the filter found by the `where` argument doesn't exist, create a new filter with this data.
     */
    create: XOR<filterCreateInput, filterUncheckedCreateInput>
    /**
     * In case the filter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<filterUpdateInput, filterUncheckedUpdateInput>
  }

  /**
   * filter delete
   */
  export type filterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the filter
     */
    select?: filterSelect<ExtArgs> | null
    /**
     * Filter which filter to delete.
     */
    where: filterWhereUniqueInput
  }

  /**
   * filter deleteMany
   */
  export type filterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which filters to delete
     */
    where?: filterWhereInput
  }

  /**
   * filter without action
   */
  export type filterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the filter
     */
    select?: filterSelect<ExtArgs> | null
  }


  /**
   * Model predictions
   */

  export type AggregatePredictions = {
    _count: PredictionsCountAggregateOutputType | null
    _avg: PredictionsAvgAggregateOutputType | null
    _sum: PredictionsSumAggregateOutputType | null
    _min: PredictionsMinAggregateOutputType | null
    _max: PredictionsMaxAggregateOutputType | null
  }

  export type PredictionsAvgAggregateOutputType = {
    id: number | null
    spectral_data_id: number | null
    prediction: number | null
  }

  export type PredictionsSumAggregateOutputType = {
    id: number | null
    spectral_data_id: number | null
    prediction: number | null
  }

  export type PredictionsMinAggregateOutputType = {
    id: number | null
    name: string | null
    model_name: string | null
    spectral_data_id: number | null
    prediction: number | null
    createdAt: Date | null
    attribute: string | null
  }

  export type PredictionsMaxAggregateOutputType = {
    id: number | null
    name: string | null
    model_name: string | null
    spectral_data_id: number | null
    prediction: number | null
    createdAt: Date | null
    attribute: string | null
  }

  export type PredictionsCountAggregateOutputType = {
    id: number
    name: number
    model_name: number
    spectral_data_id: number
    prediction: number
    createdAt: number
    attribute: number
    _all: number
  }


  export type PredictionsAvgAggregateInputType = {
    id?: true
    spectral_data_id?: true
    prediction?: true
  }

  export type PredictionsSumAggregateInputType = {
    id?: true
    spectral_data_id?: true
    prediction?: true
  }

  export type PredictionsMinAggregateInputType = {
    id?: true
    name?: true
    model_name?: true
    spectral_data_id?: true
    prediction?: true
    createdAt?: true
    attribute?: true
  }

  export type PredictionsMaxAggregateInputType = {
    id?: true
    name?: true
    model_name?: true
    spectral_data_id?: true
    prediction?: true
    createdAt?: true
    attribute?: true
  }

  export type PredictionsCountAggregateInputType = {
    id?: true
    name?: true
    model_name?: true
    spectral_data_id?: true
    prediction?: true
    createdAt?: true
    attribute?: true
    _all?: true
  }

  export type PredictionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which predictions to aggregate.
     */
    where?: predictionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of predictions to fetch.
     */
    orderBy?: predictionsOrderByWithRelationInput | predictionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: predictionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` predictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` predictions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned predictions
    **/
    _count?: true | PredictionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PredictionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PredictionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PredictionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PredictionsMaxAggregateInputType
  }

  export type GetPredictionsAggregateType<T extends PredictionsAggregateArgs> = {
        [P in keyof T & keyof AggregatePredictions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePredictions[P]>
      : GetScalarType<T[P], AggregatePredictions[P]>
  }




  export type predictionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: predictionsWhereInput
    orderBy?: predictionsOrderByWithAggregationInput | predictionsOrderByWithAggregationInput[]
    by: PredictionsScalarFieldEnum[] | PredictionsScalarFieldEnum
    having?: predictionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PredictionsCountAggregateInputType | true
    _avg?: PredictionsAvgAggregateInputType
    _sum?: PredictionsSumAggregateInputType
    _min?: PredictionsMinAggregateInputType
    _max?: PredictionsMaxAggregateInputType
  }

  export type PredictionsGroupByOutputType = {
    id: number
    name: string
    model_name: string
    spectral_data_id: number
    prediction: number
    createdAt: Date
    attribute: string | null
    _count: PredictionsCountAggregateOutputType | null
    _avg: PredictionsAvgAggregateOutputType | null
    _sum: PredictionsSumAggregateOutputType | null
    _min: PredictionsMinAggregateOutputType | null
    _max: PredictionsMaxAggregateOutputType | null
  }

  type GetPredictionsGroupByPayload<T extends predictionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PredictionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PredictionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PredictionsGroupByOutputType[P]>
            : GetScalarType<T[P], PredictionsGroupByOutputType[P]>
        }
      >
    >


  export type predictionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    model_name?: boolean
    spectral_data_id?: boolean
    prediction?: boolean
    createdAt?: boolean
    attribute?: boolean
  }, ExtArgs["result"]["predictions"]>


  export type predictionsSelectScalar = {
    id?: boolean
    name?: boolean
    model_name?: boolean
    spectral_data_id?: boolean
    prediction?: boolean
    createdAt?: boolean
    attribute?: boolean
  }


  export type $predictionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "predictions"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      model_name: string
      spectral_data_id: number
      prediction: number
      createdAt: Date
      attribute: string | null
    }, ExtArgs["result"]["predictions"]>
    composites: {}
  }

  type predictionsGetPayload<S extends boolean | null | undefined | predictionsDefaultArgs> = $Result.GetResult<Prisma.$predictionsPayload, S>

  type predictionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<predictionsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PredictionsCountAggregateInputType | true
    }

  export interface predictionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['predictions'], meta: { name: 'predictions' } }
    /**
     * Find zero or one Predictions that matches the filter.
     * @param {predictionsFindUniqueArgs} args - Arguments to find a Predictions
     * @example
     * // Get one Predictions
     * const predictions = await prisma.predictions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends predictionsFindUniqueArgs>(args: SelectSubset<T, predictionsFindUniqueArgs<ExtArgs>>): Prisma__predictionsClient<$Result.GetResult<Prisma.$predictionsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Predictions that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {predictionsFindUniqueOrThrowArgs} args - Arguments to find a Predictions
     * @example
     * // Get one Predictions
     * const predictions = await prisma.predictions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends predictionsFindUniqueOrThrowArgs>(args: SelectSubset<T, predictionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__predictionsClient<$Result.GetResult<Prisma.$predictionsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Predictions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {predictionsFindFirstArgs} args - Arguments to find a Predictions
     * @example
     * // Get one Predictions
     * const predictions = await prisma.predictions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends predictionsFindFirstArgs>(args?: SelectSubset<T, predictionsFindFirstArgs<ExtArgs>>): Prisma__predictionsClient<$Result.GetResult<Prisma.$predictionsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Predictions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {predictionsFindFirstOrThrowArgs} args - Arguments to find a Predictions
     * @example
     * // Get one Predictions
     * const predictions = await prisma.predictions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends predictionsFindFirstOrThrowArgs>(args?: SelectSubset<T, predictionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__predictionsClient<$Result.GetResult<Prisma.$predictionsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Predictions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {predictionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Predictions
     * const predictions = await prisma.predictions.findMany()
     * 
     * // Get first 10 Predictions
     * const predictions = await prisma.predictions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const predictionsWithIdOnly = await prisma.predictions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends predictionsFindManyArgs>(args?: SelectSubset<T, predictionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$predictionsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Predictions.
     * @param {predictionsCreateArgs} args - Arguments to create a Predictions.
     * @example
     * // Create one Predictions
     * const Predictions = await prisma.predictions.create({
     *   data: {
     *     // ... data to create a Predictions
     *   }
     * })
     * 
     */
    create<T extends predictionsCreateArgs>(args: SelectSubset<T, predictionsCreateArgs<ExtArgs>>): Prisma__predictionsClient<$Result.GetResult<Prisma.$predictionsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Predictions.
     * @param {predictionsCreateManyArgs} args - Arguments to create many Predictions.
     * @example
     * // Create many Predictions
     * const predictions = await prisma.predictions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends predictionsCreateManyArgs>(args?: SelectSubset<T, predictionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Predictions.
     * @param {predictionsDeleteArgs} args - Arguments to delete one Predictions.
     * @example
     * // Delete one Predictions
     * const Predictions = await prisma.predictions.delete({
     *   where: {
     *     // ... filter to delete one Predictions
     *   }
     * })
     * 
     */
    delete<T extends predictionsDeleteArgs>(args: SelectSubset<T, predictionsDeleteArgs<ExtArgs>>): Prisma__predictionsClient<$Result.GetResult<Prisma.$predictionsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Predictions.
     * @param {predictionsUpdateArgs} args - Arguments to update one Predictions.
     * @example
     * // Update one Predictions
     * const predictions = await prisma.predictions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends predictionsUpdateArgs>(args: SelectSubset<T, predictionsUpdateArgs<ExtArgs>>): Prisma__predictionsClient<$Result.GetResult<Prisma.$predictionsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Predictions.
     * @param {predictionsDeleteManyArgs} args - Arguments to filter Predictions to delete.
     * @example
     * // Delete a few Predictions
     * const { count } = await prisma.predictions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends predictionsDeleteManyArgs>(args?: SelectSubset<T, predictionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Predictions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {predictionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Predictions
     * const predictions = await prisma.predictions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends predictionsUpdateManyArgs>(args: SelectSubset<T, predictionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Predictions.
     * @param {predictionsUpsertArgs} args - Arguments to update or create a Predictions.
     * @example
     * // Update or create a Predictions
     * const predictions = await prisma.predictions.upsert({
     *   create: {
     *     // ... data to create a Predictions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Predictions we want to update
     *   }
     * })
     */
    upsert<T extends predictionsUpsertArgs>(args: SelectSubset<T, predictionsUpsertArgs<ExtArgs>>): Prisma__predictionsClient<$Result.GetResult<Prisma.$predictionsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Predictions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {predictionsCountArgs} args - Arguments to filter Predictions to count.
     * @example
     * // Count the number of Predictions
     * const count = await prisma.predictions.count({
     *   where: {
     *     // ... the filter for the Predictions we want to count
     *   }
     * })
    **/
    count<T extends predictionsCountArgs>(
      args?: Subset<T, predictionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PredictionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Predictions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PredictionsAggregateArgs>(args: Subset<T, PredictionsAggregateArgs>): Prisma.PrismaPromise<GetPredictionsAggregateType<T>>

    /**
     * Group by Predictions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {predictionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends predictionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: predictionsGroupByArgs['orderBy'] }
        : { orderBy?: predictionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, predictionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPredictionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the predictions model
   */
  readonly fields: predictionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for predictions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__predictionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the predictions model
   */ 
  interface predictionsFieldRefs {
    readonly id: FieldRef<"predictions", 'Int'>
    readonly name: FieldRef<"predictions", 'String'>
    readonly model_name: FieldRef<"predictions", 'String'>
    readonly spectral_data_id: FieldRef<"predictions", 'Int'>
    readonly prediction: FieldRef<"predictions", 'Float'>
    readonly createdAt: FieldRef<"predictions", 'DateTime'>
    readonly attribute: FieldRef<"predictions", 'String'>
  }
    

  // Custom InputTypes
  /**
   * predictions findUnique
   */
  export type predictionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictions
     */
    select?: predictionsSelect<ExtArgs> | null
    /**
     * Filter, which predictions to fetch.
     */
    where: predictionsWhereUniqueInput
  }

  /**
   * predictions findUniqueOrThrow
   */
  export type predictionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictions
     */
    select?: predictionsSelect<ExtArgs> | null
    /**
     * Filter, which predictions to fetch.
     */
    where: predictionsWhereUniqueInput
  }

  /**
   * predictions findFirst
   */
  export type predictionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictions
     */
    select?: predictionsSelect<ExtArgs> | null
    /**
     * Filter, which predictions to fetch.
     */
    where?: predictionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of predictions to fetch.
     */
    orderBy?: predictionsOrderByWithRelationInput | predictionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for predictions.
     */
    cursor?: predictionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` predictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` predictions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of predictions.
     */
    distinct?: PredictionsScalarFieldEnum | PredictionsScalarFieldEnum[]
  }

  /**
   * predictions findFirstOrThrow
   */
  export type predictionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictions
     */
    select?: predictionsSelect<ExtArgs> | null
    /**
     * Filter, which predictions to fetch.
     */
    where?: predictionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of predictions to fetch.
     */
    orderBy?: predictionsOrderByWithRelationInput | predictionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for predictions.
     */
    cursor?: predictionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` predictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` predictions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of predictions.
     */
    distinct?: PredictionsScalarFieldEnum | PredictionsScalarFieldEnum[]
  }

  /**
   * predictions findMany
   */
  export type predictionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictions
     */
    select?: predictionsSelect<ExtArgs> | null
    /**
     * Filter, which predictions to fetch.
     */
    where?: predictionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of predictions to fetch.
     */
    orderBy?: predictionsOrderByWithRelationInput | predictionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing predictions.
     */
    cursor?: predictionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` predictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` predictions.
     */
    skip?: number
    distinct?: PredictionsScalarFieldEnum | PredictionsScalarFieldEnum[]
  }

  /**
   * predictions create
   */
  export type predictionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictions
     */
    select?: predictionsSelect<ExtArgs> | null
    /**
     * The data needed to create a predictions.
     */
    data: XOR<predictionsCreateInput, predictionsUncheckedCreateInput>
  }

  /**
   * predictions createMany
   */
  export type predictionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many predictions.
     */
    data: predictionsCreateManyInput | predictionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * predictions update
   */
  export type predictionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictions
     */
    select?: predictionsSelect<ExtArgs> | null
    /**
     * The data needed to update a predictions.
     */
    data: XOR<predictionsUpdateInput, predictionsUncheckedUpdateInput>
    /**
     * Choose, which predictions to update.
     */
    where: predictionsWhereUniqueInput
  }

  /**
   * predictions updateMany
   */
  export type predictionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update predictions.
     */
    data: XOR<predictionsUpdateManyMutationInput, predictionsUncheckedUpdateManyInput>
    /**
     * Filter which predictions to update
     */
    where?: predictionsWhereInput
  }

  /**
   * predictions upsert
   */
  export type predictionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictions
     */
    select?: predictionsSelect<ExtArgs> | null
    /**
     * The filter to search for the predictions to update in case it exists.
     */
    where: predictionsWhereUniqueInput
    /**
     * In case the predictions found by the `where` argument doesn't exist, create a new predictions with this data.
     */
    create: XOR<predictionsCreateInput, predictionsUncheckedCreateInput>
    /**
     * In case the predictions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<predictionsUpdateInput, predictionsUncheckedUpdateInput>
  }

  /**
   * predictions delete
   */
  export type predictionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictions
     */
    select?: predictionsSelect<ExtArgs> | null
    /**
     * Filter which predictions to delete.
     */
    where: predictionsWhereUniqueInput
  }

  /**
   * predictions deleteMany
   */
  export type predictionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which predictions to delete
     */
    where?: predictionsWhereInput
  }

  /**
   * predictions without action
   */
  export type predictionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictions
     */
    select?: predictionsSelect<ExtArgs> | null
  }


  /**
   * Model predictivemodel
   */

  export type AggregatePredictivemodel = {
    _count: PredictivemodelCountAggregateOutputType | null
    _avg: PredictivemodelAvgAggregateOutputType | null
    _sum: PredictivemodelSumAggregateOutputType | null
    _min: PredictivemodelMinAggregateOutputType | null
    _max: PredictivemodelMaxAggregateOutputType | null
  }

  export type PredictivemodelAvgAggregateOutputType = {
    id: number | null
  }

  export type PredictivemodelSumAggregateOutputType = {
    id: number | null
  }

  export type PredictivemodelMinAggregateOutputType = {
    id: number | null
    model_name: string | null
    variety: string | null
    attribute: string | null
    model: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PredictivemodelMaxAggregateOutputType = {
    id: number | null
    model_name: string | null
    variety: string | null
    attribute: string | null
    model: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PredictivemodelCountAggregateOutputType = {
    id: number
    model_name: number
    variety: number
    attribute: number
    hyperparameters: number
    metrics: number
    model: number
    graph: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PredictivemodelAvgAggregateInputType = {
    id?: true
  }

  export type PredictivemodelSumAggregateInputType = {
    id?: true
  }

  export type PredictivemodelMinAggregateInputType = {
    id?: true
    model_name?: true
    variety?: true
    attribute?: true
    model?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PredictivemodelMaxAggregateInputType = {
    id?: true
    model_name?: true
    variety?: true
    attribute?: true
    model?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PredictivemodelCountAggregateInputType = {
    id?: true
    model_name?: true
    variety?: true
    attribute?: true
    hyperparameters?: true
    metrics?: true
    model?: true
    graph?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PredictivemodelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which predictivemodel to aggregate.
     */
    where?: predictivemodelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of predictivemodels to fetch.
     */
    orderBy?: predictivemodelOrderByWithRelationInput | predictivemodelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: predictivemodelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` predictivemodels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` predictivemodels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned predictivemodels
    **/
    _count?: true | PredictivemodelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PredictivemodelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PredictivemodelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PredictivemodelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PredictivemodelMaxAggregateInputType
  }

  export type GetPredictivemodelAggregateType<T extends PredictivemodelAggregateArgs> = {
        [P in keyof T & keyof AggregatePredictivemodel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePredictivemodel[P]>
      : GetScalarType<T[P], AggregatePredictivemodel[P]>
  }




  export type predictivemodelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: predictivemodelWhereInput
    orderBy?: predictivemodelOrderByWithAggregationInput | predictivemodelOrderByWithAggregationInput[]
    by: PredictivemodelScalarFieldEnum[] | PredictivemodelScalarFieldEnum
    having?: predictivemodelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PredictivemodelCountAggregateInputType | true
    _avg?: PredictivemodelAvgAggregateInputType
    _sum?: PredictivemodelSumAggregateInputType
    _min?: PredictivemodelMinAggregateInputType
    _max?: PredictivemodelMaxAggregateInputType
  }

  export type PredictivemodelGroupByOutputType = {
    id: number
    model_name: string
    variety: string
    attribute: string
    hyperparameters: JsonValue
    metrics: JsonValue
    model: string | null
    graph: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: PredictivemodelCountAggregateOutputType | null
    _avg: PredictivemodelAvgAggregateOutputType | null
    _sum: PredictivemodelSumAggregateOutputType | null
    _min: PredictivemodelMinAggregateOutputType | null
    _max: PredictivemodelMaxAggregateOutputType | null
  }

  type GetPredictivemodelGroupByPayload<T extends predictivemodelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PredictivemodelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PredictivemodelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PredictivemodelGroupByOutputType[P]>
            : GetScalarType<T[P], PredictivemodelGroupByOutputType[P]>
        }
      >
    >


  export type predictivemodelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    model_name?: boolean
    variety?: boolean
    attribute?: boolean
    hyperparameters?: boolean
    metrics?: boolean
    model?: boolean
    graph?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["predictivemodel"]>


  export type predictivemodelSelectScalar = {
    id?: boolean
    model_name?: boolean
    variety?: boolean
    attribute?: boolean
    hyperparameters?: boolean
    metrics?: boolean
    model?: boolean
    graph?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $predictivemodelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "predictivemodel"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      model_name: string
      variety: string
      attribute: string
      hyperparameters: Prisma.JsonValue
      metrics: Prisma.JsonValue
      model: string | null
      graph: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["predictivemodel"]>
    composites: {}
  }

  type predictivemodelGetPayload<S extends boolean | null | undefined | predictivemodelDefaultArgs> = $Result.GetResult<Prisma.$predictivemodelPayload, S>

  type predictivemodelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<predictivemodelFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PredictivemodelCountAggregateInputType | true
    }

  export interface predictivemodelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['predictivemodel'], meta: { name: 'predictivemodel' } }
    /**
     * Find zero or one Predictivemodel that matches the filter.
     * @param {predictivemodelFindUniqueArgs} args - Arguments to find a Predictivemodel
     * @example
     * // Get one Predictivemodel
     * const predictivemodel = await prisma.predictivemodel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends predictivemodelFindUniqueArgs>(args: SelectSubset<T, predictivemodelFindUniqueArgs<ExtArgs>>): Prisma__predictivemodelClient<$Result.GetResult<Prisma.$predictivemodelPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Predictivemodel that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {predictivemodelFindUniqueOrThrowArgs} args - Arguments to find a Predictivemodel
     * @example
     * // Get one Predictivemodel
     * const predictivemodel = await prisma.predictivemodel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends predictivemodelFindUniqueOrThrowArgs>(args: SelectSubset<T, predictivemodelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__predictivemodelClient<$Result.GetResult<Prisma.$predictivemodelPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Predictivemodel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {predictivemodelFindFirstArgs} args - Arguments to find a Predictivemodel
     * @example
     * // Get one Predictivemodel
     * const predictivemodel = await prisma.predictivemodel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends predictivemodelFindFirstArgs>(args?: SelectSubset<T, predictivemodelFindFirstArgs<ExtArgs>>): Prisma__predictivemodelClient<$Result.GetResult<Prisma.$predictivemodelPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Predictivemodel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {predictivemodelFindFirstOrThrowArgs} args - Arguments to find a Predictivemodel
     * @example
     * // Get one Predictivemodel
     * const predictivemodel = await prisma.predictivemodel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends predictivemodelFindFirstOrThrowArgs>(args?: SelectSubset<T, predictivemodelFindFirstOrThrowArgs<ExtArgs>>): Prisma__predictivemodelClient<$Result.GetResult<Prisma.$predictivemodelPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Predictivemodels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {predictivemodelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Predictivemodels
     * const predictivemodels = await prisma.predictivemodel.findMany()
     * 
     * // Get first 10 Predictivemodels
     * const predictivemodels = await prisma.predictivemodel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const predictivemodelWithIdOnly = await prisma.predictivemodel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends predictivemodelFindManyArgs>(args?: SelectSubset<T, predictivemodelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$predictivemodelPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Predictivemodel.
     * @param {predictivemodelCreateArgs} args - Arguments to create a Predictivemodel.
     * @example
     * // Create one Predictivemodel
     * const Predictivemodel = await prisma.predictivemodel.create({
     *   data: {
     *     // ... data to create a Predictivemodel
     *   }
     * })
     * 
     */
    create<T extends predictivemodelCreateArgs>(args: SelectSubset<T, predictivemodelCreateArgs<ExtArgs>>): Prisma__predictivemodelClient<$Result.GetResult<Prisma.$predictivemodelPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Predictivemodels.
     * @param {predictivemodelCreateManyArgs} args - Arguments to create many Predictivemodels.
     * @example
     * // Create many Predictivemodels
     * const predictivemodel = await prisma.predictivemodel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends predictivemodelCreateManyArgs>(args?: SelectSubset<T, predictivemodelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Predictivemodel.
     * @param {predictivemodelDeleteArgs} args - Arguments to delete one Predictivemodel.
     * @example
     * // Delete one Predictivemodel
     * const Predictivemodel = await prisma.predictivemodel.delete({
     *   where: {
     *     // ... filter to delete one Predictivemodel
     *   }
     * })
     * 
     */
    delete<T extends predictivemodelDeleteArgs>(args: SelectSubset<T, predictivemodelDeleteArgs<ExtArgs>>): Prisma__predictivemodelClient<$Result.GetResult<Prisma.$predictivemodelPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Predictivemodel.
     * @param {predictivemodelUpdateArgs} args - Arguments to update one Predictivemodel.
     * @example
     * // Update one Predictivemodel
     * const predictivemodel = await prisma.predictivemodel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends predictivemodelUpdateArgs>(args: SelectSubset<T, predictivemodelUpdateArgs<ExtArgs>>): Prisma__predictivemodelClient<$Result.GetResult<Prisma.$predictivemodelPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Predictivemodels.
     * @param {predictivemodelDeleteManyArgs} args - Arguments to filter Predictivemodels to delete.
     * @example
     * // Delete a few Predictivemodels
     * const { count } = await prisma.predictivemodel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends predictivemodelDeleteManyArgs>(args?: SelectSubset<T, predictivemodelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Predictivemodels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {predictivemodelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Predictivemodels
     * const predictivemodel = await prisma.predictivemodel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends predictivemodelUpdateManyArgs>(args: SelectSubset<T, predictivemodelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Predictivemodel.
     * @param {predictivemodelUpsertArgs} args - Arguments to update or create a Predictivemodel.
     * @example
     * // Update or create a Predictivemodel
     * const predictivemodel = await prisma.predictivemodel.upsert({
     *   create: {
     *     // ... data to create a Predictivemodel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Predictivemodel we want to update
     *   }
     * })
     */
    upsert<T extends predictivemodelUpsertArgs>(args: SelectSubset<T, predictivemodelUpsertArgs<ExtArgs>>): Prisma__predictivemodelClient<$Result.GetResult<Prisma.$predictivemodelPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Predictivemodels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {predictivemodelCountArgs} args - Arguments to filter Predictivemodels to count.
     * @example
     * // Count the number of Predictivemodels
     * const count = await prisma.predictivemodel.count({
     *   where: {
     *     // ... the filter for the Predictivemodels we want to count
     *   }
     * })
    **/
    count<T extends predictivemodelCountArgs>(
      args?: Subset<T, predictivemodelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PredictivemodelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Predictivemodel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictivemodelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PredictivemodelAggregateArgs>(args: Subset<T, PredictivemodelAggregateArgs>): Prisma.PrismaPromise<GetPredictivemodelAggregateType<T>>

    /**
     * Group by Predictivemodel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {predictivemodelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends predictivemodelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: predictivemodelGroupByArgs['orderBy'] }
        : { orderBy?: predictivemodelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, predictivemodelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPredictivemodelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the predictivemodel model
   */
  readonly fields: predictivemodelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for predictivemodel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__predictivemodelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the predictivemodel model
   */ 
  interface predictivemodelFieldRefs {
    readonly id: FieldRef<"predictivemodel", 'Int'>
    readonly model_name: FieldRef<"predictivemodel", 'String'>
    readonly variety: FieldRef<"predictivemodel", 'String'>
    readonly attribute: FieldRef<"predictivemodel", 'String'>
    readonly hyperparameters: FieldRef<"predictivemodel", 'Json'>
    readonly metrics: FieldRef<"predictivemodel", 'Json'>
    readonly model: FieldRef<"predictivemodel", 'String'>
    readonly graph: FieldRef<"predictivemodel", 'Json'>
    readonly createdAt: FieldRef<"predictivemodel", 'DateTime'>
    readonly updatedAt: FieldRef<"predictivemodel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * predictivemodel findUnique
   */
  export type predictivemodelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictivemodel
     */
    select?: predictivemodelSelect<ExtArgs> | null
    /**
     * Filter, which predictivemodel to fetch.
     */
    where: predictivemodelWhereUniqueInput
  }

  /**
   * predictivemodel findUniqueOrThrow
   */
  export type predictivemodelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictivemodel
     */
    select?: predictivemodelSelect<ExtArgs> | null
    /**
     * Filter, which predictivemodel to fetch.
     */
    where: predictivemodelWhereUniqueInput
  }

  /**
   * predictivemodel findFirst
   */
  export type predictivemodelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictivemodel
     */
    select?: predictivemodelSelect<ExtArgs> | null
    /**
     * Filter, which predictivemodel to fetch.
     */
    where?: predictivemodelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of predictivemodels to fetch.
     */
    orderBy?: predictivemodelOrderByWithRelationInput | predictivemodelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for predictivemodels.
     */
    cursor?: predictivemodelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` predictivemodels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` predictivemodels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of predictivemodels.
     */
    distinct?: PredictivemodelScalarFieldEnum | PredictivemodelScalarFieldEnum[]
  }

  /**
   * predictivemodel findFirstOrThrow
   */
  export type predictivemodelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictivemodel
     */
    select?: predictivemodelSelect<ExtArgs> | null
    /**
     * Filter, which predictivemodel to fetch.
     */
    where?: predictivemodelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of predictivemodels to fetch.
     */
    orderBy?: predictivemodelOrderByWithRelationInput | predictivemodelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for predictivemodels.
     */
    cursor?: predictivemodelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` predictivemodels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` predictivemodels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of predictivemodels.
     */
    distinct?: PredictivemodelScalarFieldEnum | PredictivemodelScalarFieldEnum[]
  }

  /**
   * predictivemodel findMany
   */
  export type predictivemodelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictivemodel
     */
    select?: predictivemodelSelect<ExtArgs> | null
    /**
     * Filter, which predictivemodels to fetch.
     */
    where?: predictivemodelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of predictivemodels to fetch.
     */
    orderBy?: predictivemodelOrderByWithRelationInput | predictivemodelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing predictivemodels.
     */
    cursor?: predictivemodelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` predictivemodels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` predictivemodels.
     */
    skip?: number
    distinct?: PredictivemodelScalarFieldEnum | PredictivemodelScalarFieldEnum[]
  }

  /**
   * predictivemodel create
   */
  export type predictivemodelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictivemodel
     */
    select?: predictivemodelSelect<ExtArgs> | null
    /**
     * The data needed to create a predictivemodel.
     */
    data: XOR<predictivemodelCreateInput, predictivemodelUncheckedCreateInput>
  }

  /**
   * predictivemodel createMany
   */
  export type predictivemodelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many predictivemodels.
     */
    data: predictivemodelCreateManyInput | predictivemodelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * predictivemodel update
   */
  export type predictivemodelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictivemodel
     */
    select?: predictivemodelSelect<ExtArgs> | null
    /**
     * The data needed to update a predictivemodel.
     */
    data: XOR<predictivemodelUpdateInput, predictivemodelUncheckedUpdateInput>
    /**
     * Choose, which predictivemodel to update.
     */
    where: predictivemodelWhereUniqueInput
  }

  /**
   * predictivemodel updateMany
   */
  export type predictivemodelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update predictivemodels.
     */
    data: XOR<predictivemodelUpdateManyMutationInput, predictivemodelUncheckedUpdateManyInput>
    /**
     * Filter which predictivemodels to update
     */
    where?: predictivemodelWhereInput
  }

  /**
   * predictivemodel upsert
   */
  export type predictivemodelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictivemodel
     */
    select?: predictivemodelSelect<ExtArgs> | null
    /**
     * The filter to search for the predictivemodel to update in case it exists.
     */
    where: predictivemodelWhereUniqueInput
    /**
     * In case the predictivemodel found by the `where` argument doesn't exist, create a new predictivemodel with this data.
     */
    create: XOR<predictivemodelCreateInput, predictivemodelUncheckedCreateInput>
    /**
     * In case the predictivemodel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<predictivemodelUpdateInput, predictivemodelUncheckedUpdateInput>
  }

  /**
   * predictivemodel delete
   */
  export type predictivemodelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictivemodel
     */
    select?: predictivemodelSelect<ExtArgs> | null
    /**
     * Filter which predictivemodel to delete.
     */
    where: predictivemodelWhereUniqueInput
  }

  /**
   * predictivemodel deleteMany
   */
  export type predictivemodelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which predictivemodels to delete
     */
    where?: predictivemodelWhereInput
  }

  /**
   * predictivemodel without action
   */
  export type predictivemodelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the predictivemodel
     */
    select?: predictivemodelSelect<ExtArgs> | null
  }


  /**
   * Model spectra
   */

  export type AggregateSpectra = {
    _count: SpectraCountAggregateOutputType | null
    _avg: SpectraAvgAggregateOutputType | null
    _sum: SpectraSumAggregateOutputType | null
    _min: SpectraMinAggregateOutputType | null
    _max: SpectraMaxAggregateOutputType | null
  }

  export type SpectraAvgAggregateOutputType = {
    id: number | null
  }

  export type SpectraSumAggregateOutputType = {
    id: number | null
  }

  export type SpectraMinAggregateOutputType = {
    id: number | null
    name: string | null
    variety: string | null
    datetime: Date | null
    local: string | null
    filter: string | null
    graph: string | null
    createdAt: Date | null
  }

  export type SpectraMaxAggregateOutputType = {
    id: number | null
    name: string | null
    variety: string | null
    datetime: Date | null
    local: string | null
    filter: string | null
    graph: string | null
    createdAt: Date | null
  }

  export type SpectraCountAggregateOutputType = {
    id: number
    name: number
    content: number
    variety: number
    datetime: number
    local: number
    filter: number
    graph: number
    createdAt: number
    _all: number
  }


  export type SpectraAvgAggregateInputType = {
    id?: true
  }

  export type SpectraSumAggregateInputType = {
    id?: true
  }

  export type SpectraMinAggregateInputType = {
    id?: true
    name?: true
    variety?: true
    datetime?: true
    local?: true
    filter?: true
    graph?: true
    createdAt?: true
  }

  export type SpectraMaxAggregateInputType = {
    id?: true
    name?: true
    variety?: true
    datetime?: true
    local?: true
    filter?: true
    graph?: true
    createdAt?: true
  }

  export type SpectraCountAggregateInputType = {
    id?: true
    name?: true
    content?: true
    variety?: true
    datetime?: true
    local?: true
    filter?: true
    graph?: true
    createdAt?: true
    _all?: true
  }

  export type SpectraAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which spectra to aggregate.
     */
    where?: spectraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spectras to fetch.
     */
    orderBy?: spectraOrderByWithRelationInput | spectraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: spectraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spectras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spectras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned spectras
    **/
    _count?: true | SpectraCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SpectraAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SpectraSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpectraMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpectraMaxAggregateInputType
  }

  export type GetSpectraAggregateType<T extends SpectraAggregateArgs> = {
        [P in keyof T & keyof AggregateSpectra]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpectra[P]>
      : GetScalarType<T[P], AggregateSpectra[P]>
  }




  export type spectraGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: spectraWhereInput
    orderBy?: spectraOrderByWithAggregationInput | spectraOrderByWithAggregationInput[]
    by: SpectraScalarFieldEnum[] | SpectraScalarFieldEnum
    having?: spectraScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpectraCountAggregateInputType | true
    _avg?: SpectraAvgAggregateInputType
    _sum?: SpectraSumAggregateInputType
    _min?: SpectraMinAggregateInputType
    _max?: SpectraMaxAggregateInputType
  }

  export type SpectraGroupByOutputType = {
    id: number
    name: string
    content: JsonValue
    variety: string
    datetime: Date
    local: string
    filter: string | null
    graph: string | null
    createdAt: Date
    _count: SpectraCountAggregateOutputType | null
    _avg: SpectraAvgAggregateOutputType | null
    _sum: SpectraSumAggregateOutputType | null
    _min: SpectraMinAggregateOutputType | null
    _max: SpectraMaxAggregateOutputType | null
  }

  type GetSpectraGroupByPayload<T extends spectraGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpectraGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpectraGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpectraGroupByOutputType[P]>
            : GetScalarType<T[P], SpectraGroupByOutputType[P]>
        }
      >
    >


  export type spectraSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    content?: boolean
    variety?: boolean
    datetime?: boolean
    local?: boolean
    filter?: boolean
    graph?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["spectra"]>


  export type spectraSelectScalar = {
    id?: boolean
    name?: boolean
    content?: boolean
    variety?: boolean
    datetime?: boolean
    local?: boolean
    filter?: boolean
    graph?: boolean
    createdAt?: boolean
  }


  export type $spectraPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "spectra"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      content: Prisma.JsonValue
      variety: string
      datetime: Date
      local: string
      filter: string | null
      graph: string | null
      createdAt: Date
    }, ExtArgs["result"]["spectra"]>
    composites: {}
  }

  type spectraGetPayload<S extends boolean | null | undefined | spectraDefaultArgs> = $Result.GetResult<Prisma.$spectraPayload, S>

  type spectraCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<spectraFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SpectraCountAggregateInputType | true
    }

  export interface spectraDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['spectra'], meta: { name: 'spectra' } }
    /**
     * Find zero or one Spectra that matches the filter.
     * @param {spectraFindUniqueArgs} args - Arguments to find a Spectra
     * @example
     * // Get one Spectra
     * const spectra = await prisma.spectra.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends spectraFindUniqueArgs>(args: SelectSubset<T, spectraFindUniqueArgs<ExtArgs>>): Prisma__spectraClient<$Result.GetResult<Prisma.$spectraPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Spectra that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {spectraFindUniqueOrThrowArgs} args - Arguments to find a Spectra
     * @example
     * // Get one Spectra
     * const spectra = await prisma.spectra.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends spectraFindUniqueOrThrowArgs>(args: SelectSubset<T, spectraFindUniqueOrThrowArgs<ExtArgs>>): Prisma__spectraClient<$Result.GetResult<Prisma.$spectraPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Spectra that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spectraFindFirstArgs} args - Arguments to find a Spectra
     * @example
     * // Get one Spectra
     * const spectra = await prisma.spectra.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends spectraFindFirstArgs>(args?: SelectSubset<T, spectraFindFirstArgs<ExtArgs>>): Prisma__spectraClient<$Result.GetResult<Prisma.$spectraPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Spectra that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spectraFindFirstOrThrowArgs} args - Arguments to find a Spectra
     * @example
     * // Get one Spectra
     * const spectra = await prisma.spectra.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends spectraFindFirstOrThrowArgs>(args?: SelectSubset<T, spectraFindFirstOrThrowArgs<ExtArgs>>): Prisma__spectraClient<$Result.GetResult<Prisma.$spectraPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Spectras that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spectraFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Spectras
     * const spectras = await prisma.spectra.findMany()
     * 
     * // Get first 10 Spectras
     * const spectras = await prisma.spectra.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const spectraWithIdOnly = await prisma.spectra.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends spectraFindManyArgs>(args?: SelectSubset<T, spectraFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spectraPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Spectra.
     * @param {spectraCreateArgs} args - Arguments to create a Spectra.
     * @example
     * // Create one Spectra
     * const Spectra = await prisma.spectra.create({
     *   data: {
     *     // ... data to create a Spectra
     *   }
     * })
     * 
     */
    create<T extends spectraCreateArgs>(args: SelectSubset<T, spectraCreateArgs<ExtArgs>>): Prisma__spectraClient<$Result.GetResult<Prisma.$spectraPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Spectras.
     * @param {spectraCreateManyArgs} args - Arguments to create many Spectras.
     * @example
     * // Create many Spectras
     * const spectra = await prisma.spectra.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends spectraCreateManyArgs>(args?: SelectSubset<T, spectraCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Spectra.
     * @param {spectraDeleteArgs} args - Arguments to delete one Spectra.
     * @example
     * // Delete one Spectra
     * const Spectra = await prisma.spectra.delete({
     *   where: {
     *     // ... filter to delete one Spectra
     *   }
     * })
     * 
     */
    delete<T extends spectraDeleteArgs>(args: SelectSubset<T, spectraDeleteArgs<ExtArgs>>): Prisma__spectraClient<$Result.GetResult<Prisma.$spectraPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Spectra.
     * @param {spectraUpdateArgs} args - Arguments to update one Spectra.
     * @example
     * // Update one Spectra
     * const spectra = await prisma.spectra.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends spectraUpdateArgs>(args: SelectSubset<T, spectraUpdateArgs<ExtArgs>>): Prisma__spectraClient<$Result.GetResult<Prisma.$spectraPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Spectras.
     * @param {spectraDeleteManyArgs} args - Arguments to filter Spectras to delete.
     * @example
     * // Delete a few Spectras
     * const { count } = await prisma.spectra.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends spectraDeleteManyArgs>(args?: SelectSubset<T, spectraDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spectras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spectraUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Spectras
     * const spectra = await prisma.spectra.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends spectraUpdateManyArgs>(args: SelectSubset<T, spectraUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Spectra.
     * @param {spectraUpsertArgs} args - Arguments to update or create a Spectra.
     * @example
     * // Update or create a Spectra
     * const spectra = await prisma.spectra.upsert({
     *   create: {
     *     // ... data to create a Spectra
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Spectra we want to update
     *   }
     * })
     */
    upsert<T extends spectraUpsertArgs>(args: SelectSubset<T, spectraUpsertArgs<ExtArgs>>): Prisma__spectraClient<$Result.GetResult<Prisma.$spectraPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Spectras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spectraCountArgs} args - Arguments to filter Spectras to count.
     * @example
     * // Count the number of Spectras
     * const count = await prisma.spectra.count({
     *   where: {
     *     // ... the filter for the Spectras we want to count
     *   }
     * })
    **/
    count<T extends spectraCountArgs>(
      args?: Subset<T, spectraCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpectraCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Spectra.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpectraAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SpectraAggregateArgs>(args: Subset<T, SpectraAggregateArgs>): Prisma.PrismaPromise<GetSpectraAggregateType<T>>

    /**
     * Group by Spectra.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spectraGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends spectraGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: spectraGroupByArgs['orderBy'] }
        : { orderBy?: spectraGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, spectraGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpectraGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the spectra model
   */
  readonly fields: spectraFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for spectra.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__spectraClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the spectra model
   */ 
  interface spectraFieldRefs {
    readonly id: FieldRef<"spectra", 'Int'>
    readonly name: FieldRef<"spectra", 'String'>
    readonly content: FieldRef<"spectra", 'Json'>
    readonly variety: FieldRef<"spectra", 'String'>
    readonly datetime: FieldRef<"spectra", 'DateTime'>
    readonly local: FieldRef<"spectra", 'String'>
    readonly filter: FieldRef<"spectra", 'String'>
    readonly graph: FieldRef<"spectra", 'String'>
    readonly createdAt: FieldRef<"spectra", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * spectra findUnique
   */
  export type spectraFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spectra
     */
    select?: spectraSelect<ExtArgs> | null
    /**
     * Filter, which spectra to fetch.
     */
    where: spectraWhereUniqueInput
  }

  /**
   * spectra findUniqueOrThrow
   */
  export type spectraFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spectra
     */
    select?: spectraSelect<ExtArgs> | null
    /**
     * Filter, which spectra to fetch.
     */
    where: spectraWhereUniqueInput
  }

  /**
   * spectra findFirst
   */
  export type spectraFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spectra
     */
    select?: spectraSelect<ExtArgs> | null
    /**
     * Filter, which spectra to fetch.
     */
    where?: spectraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spectras to fetch.
     */
    orderBy?: spectraOrderByWithRelationInput | spectraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for spectras.
     */
    cursor?: spectraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spectras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spectras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of spectras.
     */
    distinct?: SpectraScalarFieldEnum | SpectraScalarFieldEnum[]
  }

  /**
   * spectra findFirstOrThrow
   */
  export type spectraFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spectra
     */
    select?: spectraSelect<ExtArgs> | null
    /**
     * Filter, which spectra to fetch.
     */
    where?: spectraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spectras to fetch.
     */
    orderBy?: spectraOrderByWithRelationInput | spectraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for spectras.
     */
    cursor?: spectraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spectras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spectras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of spectras.
     */
    distinct?: SpectraScalarFieldEnum | SpectraScalarFieldEnum[]
  }

  /**
   * spectra findMany
   */
  export type spectraFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spectra
     */
    select?: spectraSelect<ExtArgs> | null
    /**
     * Filter, which spectras to fetch.
     */
    where?: spectraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spectras to fetch.
     */
    orderBy?: spectraOrderByWithRelationInput | spectraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing spectras.
     */
    cursor?: spectraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spectras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spectras.
     */
    skip?: number
    distinct?: SpectraScalarFieldEnum | SpectraScalarFieldEnum[]
  }

  /**
   * spectra create
   */
  export type spectraCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spectra
     */
    select?: spectraSelect<ExtArgs> | null
    /**
     * The data needed to create a spectra.
     */
    data: XOR<spectraCreateInput, spectraUncheckedCreateInput>
  }

  /**
   * spectra createMany
   */
  export type spectraCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many spectras.
     */
    data: spectraCreateManyInput | spectraCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * spectra update
   */
  export type spectraUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spectra
     */
    select?: spectraSelect<ExtArgs> | null
    /**
     * The data needed to update a spectra.
     */
    data: XOR<spectraUpdateInput, spectraUncheckedUpdateInput>
    /**
     * Choose, which spectra to update.
     */
    where: spectraWhereUniqueInput
  }

  /**
   * spectra updateMany
   */
  export type spectraUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update spectras.
     */
    data: XOR<spectraUpdateManyMutationInput, spectraUncheckedUpdateManyInput>
    /**
     * Filter which spectras to update
     */
    where?: spectraWhereInput
  }

  /**
   * spectra upsert
   */
  export type spectraUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spectra
     */
    select?: spectraSelect<ExtArgs> | null
    /**
     * The filter to search for the spectra to update in case it exists.
     */
    where: spectraWhereUniqueInput
    /**
     * In case the spectra found by the `where` argument doesn't exist, create a new spectra with this data.
     */
    create: XOR<spectraCreateInput, spectraUncheckedCreateInput>
    /**
     * In case the spectra was found with the provided `where` argument, update it with this data.
     */
    update: XOR<spectraUpdateInput, spectraUncheckedUpdateInput>
  }

  /**
   * spectra delete
   */
  export type spectraDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spectra
     */
    select?: spectraSelect<ExtArgs> | null
    /**
     * Filter which spectra to delete.
     */
    where: spectraWhereUniqueInput
  }

  /**
   * spectra deleteMany
   */
  export type spectraDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which spectras to delete
     */
    where?: spectraWhereInput
  }

  /**
   * spectra without action
   */
  export type spectraDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spectra
     */
    select?: spectraSelect<ExtArgs> | null
  }


  /**
   * Model spectrumdata
   */

  export type AggregateSpectrumdata = {
    _count: SpectrumdataCountAggregateOutputType | null
    _avg: SpectrumdataAvgAggregateOutputType | null
    _sum: SpectrumdataSumAggregateOutputType | null
    _min: SpectrumdataMinAggregateOutputType | null
    _max: SpectrumdataMaxAggregateOutputType | null
  }

  export type SpectrumdataAvgAggregateOutputType = {
    id: number | null
  }

  export type SpectrumdataSumAggregateOutputType = {
    id: number | null
  }

  export type SpectrumdataMinAggregateOutputType = {
    id: number | null
    dataset: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SpectrumdataMaxAggregateOutputType = {
    id: number | null
    dataset: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SpectrumdataCountAggregateOutputType = {
    id: number
    dataset: number
    wavelengths: number
    X: number
    createdAt: number
    updatedAt: number
    image: number
    _all: number
  }


  export type SpectrumdataAvgAggregateInputType = {
    id?: true
  }

  export type SpectrumdataSumAggregateInputType = {
    id?: true
  }

  export type SpectrumdataMinAggregateInputType = {
    id?: true
    dataset?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SpectrumdataMaxAggregateInputType = {
    id?: true
    dataset?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SpectrumdataCountAggregateInputType = {
    id?: true
    dataset?: true
    wavelengths?: true
    X?: true
    createdAt?: true
    updatedAt?: true
    image?: true
    _all?: true
  }

  export type SpectrumdataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which spectrumdata to aggregate.
     */
    where?: spectrumdataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spectrumdata to fetch.
     */
    orderBy?: spectrumdataOrderByWithRelationInput | spectrumdataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: spectrumdataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spectrumdata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spectrumdata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned spectrumdata
    **/
    _count?: true | SpectrumdataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SpectrumdataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SpectrumdataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpectrumdataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpectrumdataMaxAggregateInputType
  }

  export type GetSpectrumdataAggregateType<T extends SpectrumdataAggregateArgs> = {
        [P in keyof T & keyof AggregateSpectrumdata]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpectrumdata[P]>
      : GetScalarType<T[P], AggregateSpectrumdata[P]>
  }




  export type spectrumdataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: spectrumdataWhereInput
    orderBy?: spectrumdataOrderByWithAggregationInput | spectrumdataOrderByWithAggregationInput[]
    by: SpectrumdataScalarFieldEnum[] | SpectrumdataScalarFieldEnum
    having?: spectrumdataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpectrumdataCountAggregateInputType | true
    _avg?: SpectrumdataAvgAggregateInputType
    _sum?: SpectrumdataSumAggregateInputType
    _min?: SpectrumdataMinAggregateInputType
    _max?: SpectrumdataMaxAggregateInputType
  }

  export type SpectrumdataGroupByOutputType = {
    id: number
    dataset: string
    wavelengths: JsonValue
    X: JsonValue
    createdAt: Date
    updatedAt: Date
    image: JsonValue
    _count: SpectrumdataCountAggregateOutputType | null
    _avg: SpectrumdataAvgAggregateOutputType | null
    _sum: SpectrumdataSumAggregateOutputType | null
    _min: SpectrumdataMinAggregateOutputType | null
    _max: SpectrumdataMaxAggregateOutputType | null
  }

  type GetSpectrumdataGroupByPayload<T extends spectrumdataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpectrumdataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpectrumdataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpectrumdataGroupByOutputType[P]>
            : GetScalarType<T[P], SpectrumdataGroupByOutputType[P]>
        }
      >
    >


  export type spectrumdataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dataset?: boolean
    wavelengths?: boolean
    X?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    image?: boolean
  }, ExtArgs["result"]["spectrumdata"]>


  export type spectrumdataSelectScalar = {
    id?: boolean
    dataset?: boolean
    wavelengths?: boolean
    X?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    image?: boolean
  }


  export type $spectrumdataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "spectrumdata"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      dataset: string
      wavelengths: Prisma.JsonValue
      X: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
      image: Prisma.JsonValue
    }, ExtArgs["result"]["spectrumdata"]>
    composites: {}
  }

  type spectrumdataGetPayload<S extends boolean | null | undefined | spectrumdataDefaultArgs> = $Result.GetResult<Prisma.$spectrumdataPayload, S>

  type spectrumdataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<spectrumdataFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SpectrumdataCountAggregateInputType | true
    }

  export interface spectrumdataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['spectrumdata'], meta: { name: 'spectrumdata' } }
    /**
     * Find zero or one Spectrumdata that matches the filter.
     * @param {spectrumdataFindUniqueArgs} args - Arguments to find a Spectrumdata
     * @example
     * // Get one Spectrumdata
     * const spectrumdata = await prisma.spectrumdata.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends spectrumdataFindUniqueArgs>(args: SelectSubset<T, spectrumdataFindUniqueArgs<ExtArgs>>): Prisma__spectrumdataClient<$Result.GetResult<Prisma.$spectrumdataPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Spectrumdata that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {spectrumdataFindUniqueOrThrowArgs} args - Arguments to find a Spectrumdata
     * @example
     * // Get one Spectrumdata
     * const spectrumdata = await prisma.spectrumdata.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends spectrumdataFindUniqueOrThrowArgs>(args: SelectSubset<T, spectrumdataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__spectrumdataClient<$Result.GetResult<Prisma.$spectrumdataPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Spectrumdata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spectrumdataFindFirstArgs} args - Arguments to find a Spectrumdata
     * @example
     * // Get one Spectrumdata
     * const spectrumdata = await prisma.spectrumdata.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends spectrumdataFindFirstArgs>(args?: SelectSubset<T, spectrumdataFindFirstArgs<ExtArgs>>): Prisma__spectrumdataClient<$Result.GetResult<Prisma.$spectrumdataPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Spectrumdata that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spectrumdataFindFirstOrThrowArgs} args - Arguments to find a Spectrumdata
     * @example
     * // Get one Spectrumdata
     * const spectrumdata = await prisma.spectrumdata.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends spectrumdataFindFirstOrThrowArgs>(args?: SelectSubset<T, spectrumdataFindFirstOrThrowArgs<ExtArgs>>): Prisma__spectrumdataClient<$Result.GetResult<Prisma.$spectrumdataPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Spectrumdata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spectrumdataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Spectrumdata
     * const spectrumdata = await prisma.spectrumdata.findMany()
     * 
     * // Get first 10 Spectrumdata
     * const spectrumdata = await prisma.spectrumdata.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const spectrumdataWithIdOnly = await prisma.spectrumdata.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends spectrumdataFindManyArgs>(args?: SelectSubset<T, spectrumdataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$spectrumdataPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Spectrumdata.
     * @param {spectrumdataCreateArgs} args - Arguments to create a Spectrumdata.
     * @example
     * // Create one Spectrumdata
     * const Spectrumdata = await prisma.spectrumdata.create({
     *   data: {
     *     // ... data to create a Spectrumdata
     *   }
     * })
     * 
     */
    create<T extends spectrumdataCreateArgs>(args: SelectSubset<T, spectrumdataCreateArgs<ExtArgs>>): Prisma__spectrumdataClient<$Result.GetResult<Prisma.$spectrumdataPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Spectrumdata.
     * @param {spectrumdataCreateManyArgs} args - Arguments to create many Spectrumdata.
     * @example
     * // Create many Spectrumdata
     * const spectrumdata = await prisma.spectrumdata.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends spectrumdataCreateManyArgs>(args?: SelectSubset<T, spectrumdataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Spectrumdata.
     * @param {spectrumdataDeleteArgs} args - Arguments to delete one Spectrumdata.
     * @example
     * // Delete one Spectrumdata
     * const Spectrumdata = await prisma.spectrumdata.delete({
     *   where: {
     *     // ... filter to delete one Spectrumdata
     *   }
     * })
     * 
     */
    delete<T extends spectrumdataDeleteArgs>(args: SelectSubset<T, spectrumdataDeleteArgs<ExtArgs>>): Prisma__spectrumdataClient<$Result.GetResult<Prisma.$spectrumdataPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Spectrumdata.
     * @param {spectrumdataUpdateArgs} args - Arguments to update one Spectrumdata.
     * @example
     * // Update one Spectrumdata
     * const spectrumdata = await prisma.spectrumdata.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends spectrumdataUpdateArgs>(args: SelectSubset<T, spectrumdataUpdateArgs<ExtArgs>>): Prisma__spectrumdataClient<$Result.GetResult<Prisma.$spectrumdataPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Spectrumdata.
     * @param {spectrumdataDeleteManyArgs} args - Arguments to filter Spectrumdata to delete.
     * @example
     * // Delete a few Spectrumdata
     * const { count } = await prisma.spectrumdata.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends spectrumdataDeleteManyArgs>(args?: SelectSubset<T, spectrumdataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spectrumdata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spectrumdataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Spectrumdata
     * const spectrumdata = await prisma.spectrumdata.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends spectrumdataUpdateManyArgs>(args: SelectSubset<T, spectrumdataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Spectrumdata.
     * @param {spectrumdataUpsertArgs} args - Arguments to update or create a Spectrumdata.
     * @example
     * // Update or create a Spectrumdata
     * const spectrumdata = await prisma.spectrumdata.upsert({
     *   create: {
     *     // ... data to create a Spectrumdata
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Spectrumdata we want to update
     *   }
     * })
     */
    upsert<T extends spectrumdataUpsertArgs>(args: SelectSubset<T, spectrumdataUpsertArgs<ExtArgs>>): Prisma__spectrumdataClient<$Result.GetResult<Prisma.$spectrumdataPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Spectrumdata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spectrumdataCountArgs} args - Arguments to filter Spectrumdata to count.
     * @example
     * // Count the number of Spectrumdata
     * const count = await prisma.spectrumdata.count({
     *   where: {
     *     // ... the filter for the Spectrumdata we want to count
     *   }
     * })
    **/
    count<T extends spectrumdataCountArgs>(
      args?: Subset<T, spectrumdataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpectrumdataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Spectrumdata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpectrumdataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SpectrumdataAggregateArgs>(args: Subset<T, SpectrumdataAggregateArgs>): Prisma.PrismaPromise<GetSpectrumdataAggregateType<T>>

    /**
     * Group by Spectrumdata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {spectrumdataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends spectrumdataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: spectrumdataGroupByArgs['orderBy'] }
        : { orderBy?: spectrumdataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, spectrumdataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpectrumdataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the spectrumdata model
   */
  readonly fields: spectrumdataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for spectrumdata.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__spectrumdataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the spectrumdata model
   */ 
  interface spectrumdataFieldRefs {
    readonly id: FieldRef<"spectrumdata", 'Int'>
    readonly dataset: FieldRef<"spectrumdata", 'String'>
    readonly wavelengths: FieldRef<"spectrumdata", 'Json'>
    readonly X: FieldRef<"spectrumdata", 'Json'>
    readonly createdAt: FieldRef<"spectrumdata", 'DateTime'>
    readonly updatedAt: FieldRef<"spectrumdata", 'DateTime'>
    readonly image: FieldRef<"spectrumdata", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * spectrumdata findUnique
   */
  export type spectrumdataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spectrumdata
     */
    select?: spectrumdataSelect<ExtArgs> | null
    /**
     * Filter, which spectrumdata to fetch.
     */
    where: spectrumdataWhereUniqueInput
  }

  /**
   * spectrumdata findUniqueOrThrow
   */
  export type spectrumdataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spectrumdata
     */
    select?: spectrumdataSelect<ExtArgs> | null
    /**
     * Filter, which spectrumdata to fetch.
     */
    where: spectrumdataWhereUniqueInput
  }

  /**
   * spectrumdata findFirst
   */
  export type spectrumdataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spectrumdata
     */
    select?: spectrumdataSelect<ExtArgs> | null
    /**
     * Filter, which spectrumdata to fetch.
     */
    where?: spectrumdataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spectrumdata to fetch.
     */
    orderBy?: spectrumdataOrderByWithRelationInput | spectrumdataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for spectrumdata.
     */
    cursor?: spectrumdataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spectrumdata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spectrumdata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of spectrumdata.
     */
    distinct?: SpectrumdataScalarFieldEnum | SpectrumdataScalarFieldEnum[]
  }

  /**
   * spectrumdata findFirstOrThrow
   */
  export type spectrumdataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spectrumdata
     */
    select?: spectrumdataSelect<ExtArgs> | null
    /**
     * Filter, which spectrumdata to fetch.
     */
    where?: spectrumdataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spectrumdata to fetch.
     */
    orderBy?: spectrumdataOrderByWithRelationInput | spectrumdataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for spectrumdata.
     */
    cursor?: spectrumdataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spectrumdata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spectrumdata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of spectrumdata.
     */
    distinct?: SpectrumdataScalarFieldEnum | SpectrumdataScalarFieldEnum[]
  }

  /**
   * spectrumdata findMany
   */
  export type spectrumdataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spectrumdata
     */
    select?: spectrumdataSelect<ExtArgs> | null
    /**
     * Filter, which spectrumdata to fetch.
     */
    where?: spectrumdataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of spectrumdata to fetch.
     */
    orderBy?: spectrumdataOrderByWithRelationInput | spectrumdataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing spectrumdata.
     */
    cursor?: spectrumdataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` spectrumdata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` spectrumdata.
     */
    skip?: number
    distinct?: SpectrumdataScalarFieldEnum | SpectrumdataScalarFieldEnum[]
  }

  /**
   * spectrumdata create
   */
  export type spectrumdataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spectrumdata
     */
    select?: spectrumdataSelect<ExtArgs> | null
    /**
     * The data needed to create a spectrumdata.
     */
    data: XOR<spectrumdataCreateInput, spectrumdataUncheckedCreateInput>
  }

  /**
   * spectrumdata createMany
   */
  export type spectrumdataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many spectrumdata.
     */
    data: spectrumdataCreateManyInput | spectrumdataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * spectrumdata update
   */
  export type spectrumdataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spectrumdata
     */
    select?: spectrumdataSelect<ExtArgs> | null
    /**
     * The data needed to update a spectrumdata.
     */
    data: XOR<spectrumdataUpdateInput, spectrumdataUncheckedUpdateInput>
    /**
     * Choose, which spectrumdata to update.
     */
    where: spectrumdataWhereUniqueInput
  }

  /**
   * spectrumdata updateMany
   */
  export type spectrumdataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update spectrumdata.
     */
    data: XOR<spectrumdataUpdateManyMutationInput, spectrumdataUncheckedUpdateManyInput>
    /**
     * Filter which spectrumdata to update
     */
    where?: spectrumdataWhereInput
  }

  /**
   * spectrumdata upsert
   */
  export type spectrumdataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spectrumdata
     */
    select?: spectrumdataSelect<ExtArgs> | null
    /**
     * The filter to search for the spectrumdata to update in case it exists.
     */
    where: spectrumdataWhereUniqueInput
    /**
     * In case the spectrumdata found by the `where` argument doesn't exist, create a new spectrumdata with this data.
     */
    create: XOR<spectrumdataCreateInput, spectrumdataUncheckedCreateInput>
    /**
     * In case the spectrumdata was found with the provided `where` argument, update it with this data.
     */
    update: XOR<spectrumdataUpdateInput, spectrumdataUncheckedUpdateInput>
  }

  /**
   * spectrumdata delete
   */
  export type spectrumdataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spectrumdata
     */
    select?: spectrumdataSelect<ExtArgs> | null
    /**
     * Filter which spectrumdata to delete.
     */
    where: spectrumdataWhereUniqueInput
  }

  /**
   * spectrumdata deleteMany
   */
  export type spectrumdataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which spectrumdata to delete
     */
    where?: spectrumdataWhereInput
  }

  /**
   * spectrumdata without action
   */
  export type spectrumdataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the spectrumdata
     */
    select?: spectrumdataSelect<ExtArgs> | null
  }


  /**
   * Model targetdata
   */

  export type AggregateTargetdata = {
    _count: TargetdataCountAggregateOutputType | null
    _avg: TargetdataAvgAggregateOutputType | null
    _sum: TargetdataSumAggregateOutputType | null
    _min: TargetdataMinAggregateOutputType | null
    _max: TargetdataMaxAggregateOutputType | null
  }

  export type TargetdataAvgAggregateOutputType = {
    id: number | null
  }

  export type TargetdataSumAggregateOutputType = {
    id: number | null
  }

  export type TargetdataMinAggregateOutputType = {
    id: number | null
    attribute: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TargetdataMaxAggregateOutputType = {
    id: number | null
    attribute: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TargetdataCountAggregateOutputType = {
    id: number
    attribute: number
    y: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TargetdataAvgAggregateInputType = {
    id?: true
  }

  export type TargetdataSumAggregateInputType = {
    id?: true
  }

  export type TargetdataMinAggregateInputType = {
    id?: true
    attribute?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TargetdataMaxAggregateInputType = {
    id?: true
    attribute?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TargetdataCountAggregateInputType = {
    id?: true
    attribute?: true
    y?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TargetdataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which targetdata to aggregate.
     */
    where?: targetdataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of targetdata to fetch.
     */
    orderBy?: targetdataOrderByWithRelationInput | targetdataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: targetdataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` targetdata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` targetdata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned targetdata
    **/
    _count?: true | TargetdataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TargetdataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TargetdataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TargetdataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TargetdataMaxAggregateInputType
  }

  export type GetTargetdataAggregateType<T extends TargetdataAggregateArgs> = {
        [P in keyof T & keyof AggregateTargetdata]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTargetdata[P]>
      : GetScalarType<T[P], AggregateTargetdata[P]>
  }




  export type targetdataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: targetdataWhereInput
    orderBy?: targetdataOrderByWithAggregationInput | targetdataOrderByWithAggregationInput[]
    by: TargetdataScalarFieldEnum[] | TargetdataScalarFieldEnum
    having?: targetdataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TargetdataCountAggregateInputType | true
    _avg?: TargetdataAvgAggregateInputType
    _sum?: TargetdataSumAggregateInputType
    _min?: TargetdataMinAggregateInputType
    _max?: TargetdataMaxAggregateInputType
  }

  export type TargetdataGroupByOutputType = {
    id: number
    attribute: string
    y: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: TargetdataCountAggregateOutputType | null
    _avg: TargetdataAvgAggregateOutputType | null
    _sum: TargetdataSumAggregateOutputType | null
    _min: TargetdataMinAggregateOutputType | null
    _max: TargetdataMaxAggregateOutputType | null
  }

  type GetTargetdataGroupByPayload<T extends targetdataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TargetdataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TargetdataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TargetdataGroupByOutputType[P]>
            : GetScalarType<T[P], TargetdataGroupByOutputType[P]>
        }
      >
    >


  export type targetdataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    attribute?: boolean
    y?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["targetdata"]>


  export type targetdataSelectScalar = {
    id?: boolean
    attribute?: boolean
    y?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $targetdataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "targetdata"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      attribute: string
      y: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["targetdata"]>
    composites: {}
  }

  type targetdataGetPayload<S extends boolean | null | undefined | targetdataDefaultArgs> = $Result.GetResult<Prisma.$targetdataPayload, S>

  type targetdataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<targetdataFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TargetdataCountAggregateInputType | true
    }

  export interface targetdataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['targetdata'], meta: { name: 'targetdata' } }
    /**
     * Find zero or one Targetdata that matches the filter.
     * @param {targetdataFindUniqueArgs} args - Arguments to find a Targetdata
     * @example
     * // Get one Targetdata
     * const targetdata = await prisma.targetdata.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends targetdataFindUniqueArgs>(args: SelectSubset<T, targetdataFindUniqueArgs<ExtArgs>>): Prisma__targetdataClient<$Result.GetResult<Prisma.$targetdataPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Targetdata that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {targetdataFindUniqueOrThrowArgs} args - Arguments to find a Targetdata
     * @example
     * // Get one Targetdata
     * const targetdata = await prisma.targetdata.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends targetdataFindUniqueOrThrowArgs>(args: SelectSubset<T, targetdataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__targetdataClient<$Result.GetResult<Prisma.$targetdataPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Targetdata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {targetdataFindFirstArgs} args - Arguments to find a Targetdata
     * @example
     * // Get one Targetdata
     * const targetdata = await prisma.targetdata.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends targetdataFindFirstArgs>(args?: SelectSubset<T, targetdataFindFirstArgs<ExtArgs>>): Prisma__targetdataClient<$Result.GetResult<Prisma.$targetdataPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Targetdata that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {targetdataFindFirstOrThrowArgs} args - Arguments to find a Targetdata
     * @example
     * // Get one Targetdata
     * const targetdata = await prisma.targetdata.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends targetdataFindFirstOrThrowArgs>(args?: SelectSubset<T, targetdataFindFirstOrThrowArgs<ExtArgs>>): Prisma__targetdataClient<$Result.GetResult<Prisma.$targetdataPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Targetdata that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {targetdataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Targetdata
     * const targetdata = await prisma.targetdata.findMany()
     * 
     * // Get first 10 Targetdata
     * const targetdata = await prisma.targetdata.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const targetdataWithIdOnly = await prisma.targetdata.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends targetdataFindManyArgs>(args?: SelectSubset<T, targetdataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$targetdataPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Targetdata.
     * @param {targetdataCreateArgs} args - Arguments to create a Targetdata.
     * @example
     * // Create one Targetdata
     * const Targetdata = await prisma.targetdata.create({
     *   data: {
     *     // ... data to create a Targetdata
     *   }
     * })
     * 
     */
    create<T extends targetdataCreateArgs>(args: SelectSubset<T, targetdataCreateArgs<ExtArgs>>): Prisma__targetdataClient<$Result.GetResult<Prisma.$targetdataPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Targetdata.
     * @param {targetdataCreateManyArgs} args - Arguments to create many Targetdata.
     * @example
     * // Create many Targetdata
     * const targetdata = await prisma.targetdata.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends targetdataCreateManyArgs>(args?: SelectSubset<T, targetdataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Targetdata.
     * @param {targetdataDeleteArgs} args - Arguments to delete one Targetdata.
     * @example
     * // Delete one Targetdata
     * const Targetdata = await prisma.targetdata.delete({
     *   where: {
     *     // ... filter to delete one Targetdata
     *   }
     * })
     * 
     */
    delete<T extends targetdataDeleteArgs>(args: SelectSubset<T, targetdataDeleteArgs<ExtArgs>>): Prisma__targetdataClient<$Result.GetResult<Prisma.$targetdataPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Targetdata.
     * @param {targetdataUpdateArgs} args - Arguments to update one Targetdata.
     * @example
     * // Update one Targetdata
     * const targetdata = await prisma.targetdata.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends targetdataUpdateArgs>(args: SelectSubset<T, targetdataUpdateArgs<ExtArgs>>): Prisma__targetdataClient<$Result.GetResult<Prisma.$targetdataPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Targetdata.
     * @param {targetdataDeleteManyArgs} args - Arguments to filter Targetdata to delete.
     * @example
     * // Delete a few Targetdata
     * const { count } = await prisma.targetdata.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends targetdataDeleteManyArgs>(args?: SelectSubset<T, targetdataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Targetdata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {targetdataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Targetdata
     * const targetdata = await prisma.targetdata.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends targetdataUpdateManyArgs>(args: SelectSubset<T, targetdataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Targetdata.
     * @param {targetdataUpsertArgs} args - Arguments to update or create a Targetdata.
     * @example
     * // Update or create a Targetdata
     * const targetdata = await prisma.targetdata.upsert({
     *   create: {
     *     // ... data to create a Targetdata
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Targetdata we want to update
     *   }
     * })
     */
    upsert<T extends targetdataUpsertArgs>(args: SelectSubset<T, targetdataUpsertArgs<ExtArgs>>): Prisma__targetdataClient<$Result.GetResult<Prisma.$targetdataPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Targetdata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {targetdataCountArgs} args - Arguments to filter Targetdata to count.
     * @example
     * // Count the number of Targetdata
     * const count = await prisma.targetdata.count({
     *   where: {
     *     // ... the filter for the Targetdata we want to count
     *   }
     * })
    **/
    count<T extends targetdataCountArgs>(
      args?: Subset<T, targetdataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TargetdataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Targetdata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetdataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TargetdataAggregateArgs>(args: Subset<T, TargetdataAggregateArgs>): Prisma.PrismaPromise<GetTargetdataAggregateType<T>>

    /**
     * Group by Targetdata.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {targetdataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends targetdataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: targetdataGroupByArgs['orderBy'] }
        : { orderBy?: targetdataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, targetdataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTargetdataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the targetdata model
   */
  readonly fields: targetdataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for targetdata.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__targetdataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the targetdata model
   */ 
  interface targetdataFieldRefs {
    readonly id: FieldRef<"targetdata", 'Int'>
    readonly attribute: FieldRef<"targetdata", 'String'>
    readonly y: FieldRef<"targetdata", 'Json'>
    readonly createdAt: FieldRef<"targetdata", 'DateTime'>
    readonly updatedAt: FieldRef<"targetdata", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * targetdata findUnique
   */
  export type targetdataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the targetdata
     */
    select?: targetdataSelect<ExtArgs> | null
    /**
     * Filter, which targetdata to fetch.
     */
    where: targetdataWhereUniqueInput
  }

  /**
   * targetdata findUniqueOrThrow
   */
  export type targetdataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the targetdata
     */
    select?: targetdataSelect<ExtArgs> | null
    /**
     * Filter, which targetdata to fetch.
     */
    where: targetdataWhereUniqueInput
  }

  /**
   * targetdata findFirst
   */
  export type targetdataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the targetdata
     */
    select?: targetdataSelect<ExtArgs> | null
    /**
     * Filter, which targetdata to fetch.
     */
    where?: targetdataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of targetdata to fetch.
     */
    orderBy?: targetdataOrderByWithRelationInput | targetdataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for targetdata.
     */
    cursor?: targetdataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` targetdata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` targetdata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of targetdata.
     */
    distinct?: TargetdataScalarFieldEnum | TargetdataScalarFieldEnum[]
  }

  /**
   * targetdata findFirstOrThrow
   */
  export type targetdataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the targetdata
     */
    select?: targetdataSelect<ExtArgs> | null
    /**
     * Filter, which targetdata to fetch.
     */
    where?: targetdataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of targetdata to fetch.
     */
    orderBy?: targetdataOrderByWithRelationInput | targetdataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for targetdata.
     */
    cursor?: targetdataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` targetdata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` targetdata.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of targetdata.
     */
    distinct?: TargetdataScalarFieldEnum | TargetdataScalarFieldEnum[]
  }

  /**
   * targetdata findMany
   */
  export type targetdataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the targetdata
     */
    select?: targetdataSelect<ExtArgs> | null
    /**
     * Filter, which targetdata to fetch.
     */
    where?: targetdataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of targetdata to fetch.
     */
    orderBy?: targetdataOrderByWithRelationInput | targetdataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing targetdata.
     */
    cursor?: targetdataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` targetdata from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` targetdata.
     */
    skip?: number
    distinct?: TargetdataScalarFieldEnum | TargetdataScalarFieldEnum[]
  }

  /**
   * targetdata create
   */
  export type targetdataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the targetdata
     */
    select?: targetdataSelect<ExtArgs> | null
    /**
     * The data needed to create a targetdata.
     */
    data: XOR<targetdataCreateInput, targetdataUncheckedCreateInput>
  }

  /**
   * targetdata createMany
   */
  export type targetdataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many targetdata.
     */
    data: targetdataCreateManyInput | targetdataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * targetdata update
   */
  export type targetdataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the targetdata
     */
    select?: targetdataSelect<ExtArgs> | null
    /**
     * The data needed to update a targetdata.
     */
    data: XOR<targetdataUpdateInput, targetdataUncheckedUpdateInput>
    /**
     * Choose, which targetdata to update.
     */
    where: targetdataWhereUniqueInput
  }

  /**
   * targetdata updateMany
   */
  export type targetdataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update targetdata.
     */
    data: XOR<targetdataUpdateManyMutationInput, targetdataUncheckedUpdateManyInput>
    /**
     * Filter which targetdata to update
     */
    where?: targetdataWhereInput
  }

  /**
   * targetdata upsert
   */
  export type targetdataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the targetdata
     */
    select?: targetdataSelect<ExtArgs> | null
    /**
     * The filter to search for the targetdata to update in case it exists.
     */
    where: targetdataWhereUniqueInput
    /**
     * In case the targetdata found by the `where` argument doesn't exist, create a new targetdata with this data.
     */
    create: XOR<targetdataCreateInput, targetdataUncheckedCreateInput>
    /**
     * In case the targetdata was found with the provided `where` argument, update it with this data.
     */
    update: XOR<targetdataUpdateInput, targetdataUncheckedUpdateInput>
  }

  /**
   * targetdata delete
   */
  export type targetdataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the targetdata
     */
    select?: targetdataSelect<ExtArgs> | null
    /**
     * Filter which targetdata to delete.
     */
    where: targetdataWhereUniqueInput
  }

  /**
   * targetdata deleteMany
   */
  export type targetdataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which targetdata to delete
     */
    where?: targetdataWhereInput
  }

  /**
   * targetdata without action
   */
  export type targetdataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the targetdata
     */
    select?: targetdataSelect<ExtArgs> | null
  }


  /**
   * Model variety
   */

  export type AggregateVariety = {
    _count: VarietyCountAggregateOutputType | null
    _avg: VarietyAvgAggregateOutputType | null
    _sum: VarietySumAggregateOutputType | null
    _min: VarietyMinAggregateOutputType | null
    _max: VarietyMaxAggregateOutputType | null
  }

  export type VarietyAvgAggregateOutputType = {
    id: number | null
  }

  export type VarietySumAggregateOutputType = {
    id: number | null
  }

  export type VarietyMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
  }

  export type VarietyMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
  }

  export type VarietyCountAggregateOutputType = {
    id: number
    name: number
    description: number
    attributes: number
    _all: number
  }


  export type VarietyAvgAggregateInputType = {
    id?: true
  }

  export type VarietySumAggregateInputType = {
    id?: true
  }

  export type VarietyMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type VarietyMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type VarietyCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    attributes?: true
    _all?: true
  }

  export type VarietyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which variety to aggregate.
     */
    where?: varietyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of varieties to fetch.
     */
    orderBy?: varietyOrderByWithRelationInput | varietyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: varietyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` varieties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` varieties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned varieties
    **/
    _count?: true | VarietyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VarietyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VarietySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VarietyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VarietyMaxAggregateInputType
  }

  export type GetVarietyAggregateType<T extends VarietyAggregateArgs> = {
        [P in keyof T & keyof AggregateVariety]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVariety[P]>
      : GetScalarType<T[P], AggregateVariety[P]>
  }




  export type varietyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: varietyWhereInput
    orderBy?: varietyOrderByWithAggregationInput | varietyOrderByWithAggregationInput[]
    by: VarietyScalarFieldEnum[] | VarietyScalarFieldEnum
    having?: varietyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VarietyCountAggregateInputType | true
    _avg?: VarietyAvgAggregateInputType
    _sum?: VarietySumAggregateInputType
    _min?: VarietyMinAggregateInputType
    _max?: VarietyMaxAggregateInputType
  }

  export type VarietyGroupByOutputType = {
    id: number
    name: string
    description: string
    attributes: JsonValue
    _count: VarietyCountAggregateOutputType | null
    _avg: VarietyAvgAggregateOutputType | null
    _sum: VarietySumAggregateOutputType | null
    _min: VarietyMinAggregateOutputType | null
    _max: VarietyMaxAggregateOutputType | null
  }

  type GetVarietyGroupByPayload<T extends varietyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VarietyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VarietyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VarietyGroupByOutputType[P]>
            : GetScalarType<T[P], VarietyGroupByOutputType[P]>
        }
      >
    >


  export type varietySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    attributes?: boolean
  }, ExtArgs["result"]["variety"]>


  export type varietySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    attributes?: boolean
  }


  export type $varietyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "variety"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string
      attributes: Prisma.JsonValue
    }, ExtArgs["result"]["variety"]>
    composites: {}
  }

  type varietyGetPayload<S extends boolean | null | undefined | varietyDefaultArgs> = $Result.GetResult<Prisma.$varietyPayload, S>

  type varietyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<varietyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VarietyCountAggregateInputType | true
    }

  export interface varietyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['variety'], meta: { name: 'variety' } }
    /**
     * Find zero or one Variety that matches the filter.
     * @param {varietyFindUniqueArgs} args - Arguments to find a Variety
     * @example
     * // Get one Variety
     * const variety = await prisma.variety.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends varietyFindUniqueArgs>(args: SelectSubset<T, varietyFindUniqueArgs<ExtArgs>>): Prisma__varietyClient<$Result.GetResult<Prisma.$varietyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Variety that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {varietyFindUniqueOrThrowArgs} args - Arguments to find a Variety
     * @example
     * // Get one Variety
     * const variety = await prisma.variety.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends varietyFindUniqueOrThrowArgs>(args: SelectSubset<T, varietyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__varietyClient<$Result.GetResult<Prisma.$varietyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Variety that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {varietyFindFirstArgs} args - Arguments to find a Variety
     * @example
     * // Get one Variety
     * const variety = await prisma.variety.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends varietyFindFirstArgs>(args?: SelectSubset<T, varietyFindFirstArgs<ExtArgs>>): Prisma__varietyClient<$Result.GetResult<Prisma.$varietyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Variety that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {varietyFindFirstOrThrowArgs} args - Arguments to find a Variety
     * @example
     * // Get one Variety
     * const variety = await prisma.variety.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends varietyFindFirstOrThrowArgs>(args?: SelectSubset<T, varietyFindFirstOrThrowArgs<ExtArgs>>): Prisma__varietyClient<$Result.GetResult<Prisma.$varietyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Varieties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {varietyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Varieties
     * const varieties = await prisma.variety.findMany()
     * 
     * // Get first 10 Varieties
     * const varieties = await prisma.variety.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const varietyWithIdOnly = await prisma.variety.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends varietyFindManyArgs>(args?: SelectSubset<T, varietyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$varietyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Variety.
     * @param {varietyCreateArgs} args - Arguments to create a Variety.
     * @example
     * // Create one Variety
     * const Variety = await prisma.variety.create({
     *   data: {
     *     // ... data to create a Variety
     *   }
     * })
     * 
     */
    create<T extends varietyCreateArgs>(args: SelectSubset<T, varietyCreateArgs<ExtArgs>>): Prisma__varietyClient<$Result.GetResult<Prisma.$varietyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Varieties.
     * @param {varietyCreateManyArgs} args - Arguments to create many Varieties.
     * @example
     * // Create many Varieties
     * const variety = await prisma.variety.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends varietyCreateManyArgs>(args?: SelectSubset<T, varietyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Variety.
     * @param {varietyDeleteArgs} args - Arguments to delete one Variety.
     * @example
     * // Delete one Variety
     * const Variety = await prisma.variety.delete({
     *   where: {
     *     // ... filter to delete one Variety
     *   }
     * })
     * 
     */
    delete<T extends varietyDeleteArgs>(args: SelectSubset<T, varietyDeleteArgs<ExtArgs>>): Prisma__varietyClient<$Result.GetResult<Prisma.$varietyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Variety.
     * @param {varietyUpdateArgs} args - Arguments to update one Variety.
     * @example
     * // Update one Variety
     * const variety = await prisma.variety.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends varietyUpdateArgs>(args: SelectSubset<T, varietyUpdateArgs<ExtArgs>>): Prisma__varietyClient<$Result.GetResult<Prisma.$varietyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Varieties.
     * @param {varietyDeleteManyArgs} args - Arguments to filter Varieties to delete.
     * @example
     * // Delete a few Varieties
     * const { count } = await prisma.variety.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends varietyDeleteManyArgs>(args?: SelectSubset<T, varietyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Varieties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {varietyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Varieties
     * const variety = await prisma.variety.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends varietyUpdateManyArgs>(args: SelectSubset<T, varietyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Variety.
     * @param {varietyUpsertArgs} args - Arguments to update or create a Variety.
     * @example
     * // Update or create a Variety
     * const variety = await prisma.variety.upsert({
     *   create: {
     *     // ... data to create a Variety
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Variety we want to update
     *   }
     * })
     */
    upsert<T extends varietyUpsertArgs>(args: SelectSubset<T, varietyUpsertArgs<ExtArgs>>): Prisma__varietyClient<$Result.GetResult<Prisma.$varietyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Varieties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {varietyCountArgs} args - Arguments to filter Varieties to count.
     * @example
     * // Count the number of Varieties
     * const count = await prisma.variety.count({
     *   where: {
     *     // ... the filter for the Varieties we want to count
     *   }
     * })
    **/
    count<T extends varietyCountArgs>(
      args?: Subset<T, varietyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VarietyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Variety.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VarietyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VarietyAggregateArgs>(args: Subset<T, VarietyAggregateArgs>): Prisma.PrismaPromise<GetVarietyAggregateType<T>>

    /**
     * Group by Variety.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {varietyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends varietyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: varietyGroupByArgs['orderBy'] }
        : { orderBy?: varietyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, varietyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVarietyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the variety model
   */
  readonly fields: varietyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for variety.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__varietyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the variety model
   */ 
  interface varietyFieldRefs {
    readonly id: FieldRef<"variety", 'Int'>
    readonly name: FieldRef<"variety", 'String'>
    readonly description: FieldRef<"variety", 'String'>
    readonly attributes: FieldRef<"variety", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * variety findUnique
   */
  export type varietyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the variety
     */
    select?: varietySelect<ExtArgs> | null
    /**
     * Filter, which variety to fetch.
     */
    where: varietyWhereUniqueInput
  }

  /**
   * variety findUniqueOrThrow
   */
  export type varietyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the variety
     */
    select?: varietySelect<ExtArgs> | null
    /**
     * Filter, which variety to fetch.
     */
    where: varietyWhereUniqueInput
  }

  /**
   * variety findFirst
   */
  export type varietyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the variety
     */
    select?: varietySelect<ExtArgs> | null
    /**
     * Filter, which variety to fetch.
     */
    where?: varietyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of varieties to fetch.
     */
    orderBy?: varietyOrderByWithRelationInput | varietyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for varieties.
     */
    cursor?: varietyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` varieties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` varieties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of varieties.
     */
    distinct?: VarietyScalarFieldEnum | VarietyScalarFieldEnum[]
  }

  /**
   * variety findFirstOrThrow
   */
  export type varietyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the variety
     */
    select?: varietySelect<ExtArgs> | null
    /**
     * Filter, which variety to fetch.
     */
    where?: varietyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of varieties to fetch.
     */
    orderBy?: varietyOrderByWithRelationInput | varietyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for varieties.
     */
    cursor?: varietyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` varieties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` varieties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of varieties.
     */
    distinct?: VarietyScalarFieldEnum | VarietyScalarFieldEnum[]
  }

  /**
   * variety findMany
   */
  export type varietyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the variety
     */
    select?: varietySelect<ExtArgs> | null
    /**
     * Filter, which varieties to fetch.
     */
    where?: varietyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of varieties to fetch.
     */
    orderBy?: varietyOrderByWithRelationInput | varietyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing varieties.
     */
    cursor?: varietyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` varieties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` varieties.
     */
    skip?: number
    distinct?: VarietyScalarFieldEnum | VarietyScalarFieldEnum[]
  }

  /**
   * variety create
   */
  export type varietyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the variety
     */
    select?: varietySelect<ExtArgs> | null
    /**
     * The data needed to create a variety.
     */
    data: XOR<varietyCreateInput, varietyUncheckedCreateInput>
  }

  /**
   * variety createMany
   */
  export type varietyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many varieties.
     */
    data: varietyCreateManyInput | varietyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * variety update
   */
  export type varietyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the variety
     */
    select?: varietySelect<ExtArgs> | null
    /**
     * The data needed to update a variety.
     */
    data: XOR<varietyUpdateInput, varietyUncheckedUpdateInput>
    /**
     * Choose, which variety to update.
     */
    where: varietyWhereUniqueInput
  }

  /**
   * variety updateMany
   */
  export type varietyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update varieties.
     */
    data: XOR<varietyUpdateManyMutationInput, varietyUncheckedUpdateManyInput>
    /**
     * Filter which varieties to update
     */
    where?: varietyWhereInput
  }

  /**
   * variety upsert
   */
  export type varietyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the variety
     */
    select?: varietySelect<ExtArgs> | null
    /**
     * The filter to search for the variety to update in case it exists.
     */
    where: varietyWhereUniqueInput
    /**
     * In case the variety found by the `where` argument doesn't exist, create a new variety with this data.
     */
    create: XOR<varietyCreateInput, varietyUncheckedCreateInput>
    /**
     * In case the variety was found with the provided `where` argument, update it with this data.
     */
    update: XOR<varietyUpdateInput, varietyUncheckedUpdateInput>
  }

  /**
   * variety delete
   */
  export type varietyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the variety
     */
    select?: varietySelect<ExtArgs> | null
    /**
     * Filter which variety to delete.
     */
    where: varietyWhereUniqueInput
  }

  /**
   * variety deleteMany
   */
  export type varietyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which varieties to delete
     */
    where?: varietyWhereInput
  }

  /**
   * variety without action
   */
  export type varietyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the variety
     */
    select?: varietySelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    userType: 'userType'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FilterScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    parameters: 'parameters',
    createdAt: 'createdAt'
  };

  export type FilterScalarFieldEnum = (typeof FilterScalarFieldEnum)[keyof typeof FilterScalarFieldEnum]


  export const PredictionsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    model_name: 'model_name',
    spectral_data_id: 'spectral_data_id',
    prediction: 'prediction',
    createdAt: 'createdAt',
    attribute: 'attribute'
  };

  export type PredictionsScalarFieldEnum = (typeof PredictionsScalarFieldEnum)[keyof typeof PredictionsScalarFieldEnum]


  export const PredictivemodelScalarFieldEnum: {
    id: 'id',
    model_name: 'model_name',
    variety: 'variety',
    attribute: 'attribute',
    hyperparameters: 'hyperparameters',
    metrics: 'metrics',
    model: 'model',
    graph: 'graph',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PredictivemodelScalarFieldEnum = (typeof PredictivemodelScalarFieldEnum)[keyof typeof PredictivemodelScalarFieldEnum]


  export const SpectraScalarFieldEnum: {
    id: 'id',
    name: 'name',
    content: 'content',
    variety: 'variety',
    datetime: 'datetime',
    local: 'local',
    filter: 'filter',
    graph: 'graph',
    createdAt: 'createdAt'
  };

  export type SpectraScalarFieldEnum = (typeof SpectraScalarFieldEnum)[keyof typeof SpectraScalarFieldEnum]


  export const SpectrumdataScalarFieldEnum: {
    id: 'id',
    dataset: 'dataset',
    wavelengths: 'wavelengths',
    X: 'X',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    image: 'image'
  };

  export type SpectrumdataScalarFieldEnum = (typeof SpectrumdataScalarFieldEnum)[keyof typeof SpectrumdataScalarFieldEnum]


  export const TargetdataScalarFieldEnum: {
    id: 'id',
    attribute: 'attribute',
    y: 'y',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TargetdataScalarFieldEnum = (typeof TargetdataScalarFieldEnum)[keyof typeof TargetdataScalarFieldEnum]


  export const VarietyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    attributes: 'attributes'
  };

  export type VarietyScalarFieldEnum = (typeof VarietyScalarFieldEnum)[keyof typeof VarietyScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type userWhereInput = {
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    id?: IntFilter<"user"> | number
    username?: StringFilter<"user"> | string
    password?: StringFilter<"user"> | string
    userType?: StringFilter<"user"> | string
  }

  export type userOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    userType?: SortOrder
  }

  export type userWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    password?: StringFilter<"user"> | string
    userType?: StringFilter<"user"> | string
  }, "id" | "username">

  export type userOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    userType?: SortOrder
    _count?: userCountOrderByAggregateInput
    _avg?: userAvgOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
    _sum?: userSumOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    OR?: userScalarWhereWithAggregatesInput[]
    NOT?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"user"> | number
    username?: StringWithAggregatesFilter<"user"> | string
    password?: StringWithAggregatesFilter<"user"> | string
    userType?: StringWithAggregatesFilter<"user"> | string
  }

  export type filterWhereInput = {
    AND?: filterWhereInput | filterWhereInput[]
    OR?: filterWhereInput[]
    NOT?: filterWhereInput | filterWhereInput[]
    id?: IntFilter<"filter"> | number
    name?: StringFilter<"filter"> | string
    type?: StringFilter<"filter"> | string
    parameters?: JsonFilter<"filter">
    createdAt?: DateTimeFilter<"filter"> | Date | string
  }

  export type filterOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    parameters?: SortOrder
    createdAt?: SortOrder
  }

  export type filterWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: filterWhereInput | filterWhereInput[]
    OR?: filterWhereInput[]
    NOT?: filterWhereInput | filterWhereInput[]
    name?: StringFilter<"filter"> | string
    type?: StringFilter<"filter"> | string
    parameters?: JsonFilter<"filter">
    createdAt?: DateTimeFilter<"filter"> | Date | string
  }, "id">

  export type filterOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    parameters?: SortOrder
    createdAt?: SortOrder
    _count?: filterCountOrderByAggregateInput
    _avg?: filterAvgOrderByAggregateInput
    _max?: filterMaxOrderByAggregateInput
    _min?: filterMinOrderByAggregateInput
    _sum?: filterSumOrderByAggregateInput
  }

  export type filterScalarWhereWithAggregatesInput = {
    AND?: filterScalarWhereWithAggregatesInput | filterScalarWhereWithAggregatesInput[]
    OR?: filterScalarWhereWithAggregatesInput[]
    NOT?: filterScalarWhereWithAggregatesInput | filterScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"filter"> | number
    name?: StringWithAggregatesFilter<"filter"> | string
    type?: StringWithAggregatesFilter<"filter"> | string
    parameters?: JsonWithAggregatesFilter<"filter">
    createdAt?: DateTimeWithAggregatesFilter<"filter"> | Date | string
  }

  export type predictionsWhereInput = {
    AND?: predictionsWhereInput | predictionsWhereInput[]
    OR?: predictionsWhereInput[]
    NOT?: predictionsWhereInput | predictionsWhereInput[]
    id?: IntFilter<"predictions"> | number
    name?: StringFilter<"predictions"> | string
    model_name?: StringFilter<"predictions"> | string
    spectral_data_id?: IntFilter<"predictions"> | number
    prediction?: FloatFilter<"predictions"> | number
    createdAt?: DateTimeFilter<"predictions"> | Date | string
    attribute?: StringNullableFilter<"predictions"> | string | null
  }

  export type predictionsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    model_name?: SortOrder
    spectral_data_id?: SortOrder
    prediction?: SortOrder
    createdAt?: SortOrder
    attribute?: SortOrderInput | SortOrder
  }

  export type predictionsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: predictionsWhereInput | predictionsWhereInput[]
    OR?: predictionsWhereInput[]
    NOT?: predictionsWhereInput | predictionsWhereInput[]
    name?: StringFilter<"predictions"> | string
    model_name?: StringFilter<"predictions"> | string
    spectral_data_id?: IntFilter<"predictions"> | number
    prediction?: FloatFilter<"predictions"> | number
    createdAt?: DateTimeFilter<"predictions"> | Date | string
    attribute?: StringNullableFilter<"predictions"> | string | null
  }, "id">

  export type predictionsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    model_name?: SortOrder
    spectral_data_id?: SortOrder
    prediction?: SortOrder
    createdAt?: SortOrder
    attribute?: SortOrderInput | SortOrder
    _count?: predictionsCountOrderByAggregateInput
    _avg?: predictionsAvgOrderByAggregateInput
    _max?: predictionsMaxOrderByAggregateInput
    _min?: predictionsMinOrderByAggregateInput
    _sum?: predictionsSumOrderByAggregateInput
  }

  export type predictionsScalarWhereWithAggregatesInput = {
    AND?: predictionsScalarWhereWithAggregatesInput | predictionsScalarWhereWithAggregatesInput[]
    OR?: predictionsScalarWhereWithAggregatesInput[]
    NOT?: predictionsScalarWhereWithAggregatesInput | predictionsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"predictions"> | number
    name?: StringWithAggregatesFilter<"predictions"> | string
    model_name?: StringWithAggregatesFilter<"predictions"> | string
    spectral_data_id?: IntWithAggregatesFilter<"predictions"> | number
    prediction?: FloatWithAggregatesFilter<"predictions"> | number
    createdAt?: DateTimeWithAggregatesFilter<"predictions"> | Date | string
    attribute?: StringNullableWithAggregatesFilter<"predictions"> | string | null
  }

  export type predictivemodelWhereInput = {
    AND?: predictivemodelWhereInput | predictivemodelWhereInput[]
    OR?: predictivemodelWhereInput[]
    NOT?: predictivemodelWhereInput | predictivemodelWhereInput[]
    id?: IntFilter<"predictivemodel"> | number
    model_name?: StringFilter<"predictivemodel"> | string
    variety?: StringFilter<"predictivemodel"> | string
    attribute?: StringFilter<"predictivemodel"> | string
    hyperparameters?: JsonFilter<"predictivemodel">
    metrics?: JsonFilter<"predictivemodel">
    model?: StringNullableFilter<"predictivemodel"> | string | null
    graph?: JsonFilter<"predictivemodel">
    createdAt?: DateTimeFilter<"predictivemodel"> | Date | string
    updatedAt?: DateTimeFilter<"predictivemodel"> | Date | string
  }

  export type predictivemodelOrderByWithRelationInput = {
    id?: SortOrder
    model_name?: SortOrder
    variety?: SortOrder
    attribute?: SortOrder
    hyperparameters?: SortOrder
    metrics?: SortOrder
    model?: SortOrderInput | SortOrder
    graph?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type predictivemodelWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: predictivemodelWhereInput | predictivemodelWhereInput[]
    OR?: predictivemodelWhereInput[]
    NOT?: predictivemodelWhereInput | predictivemodelWhereInput[]
    model_name?: StringFilter<"predictivemodel"> | string
    variety?: StringFilter<"predictivemodel"> | string
    attribute?: StringFilter<"predictivemodel"> | string
    hyperparameters?: JsonFilter<"predictivemodel">
    metrics?: JsonFilter<"predictivemodel">
    model?: StringNullableFilter<"predictivemodel"> | string | null
    graph?: JsonFilter<"predictivemodel">
    createdAt?: DateTimeFilter<"predictivemodel"> | Date | string
    updatedAt?: DateTimeFilter<"predictivemodel"> | Date | string
  }, "id">

  export type predictivemodelOrderByWithAggregationInput = {
    id?: SortOrder
    model_name?: SortOrder
    variety?: SortOrder
    attribute?: SortOrder
    hyperparameters?: SortOrder
    metrics?: SortOrder
    model?: SortOrderInput | SortOrder
    graph?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: predictivemodelCountOrderByAggregateInput
    _avg?: predictivemodelAvgOrderByAggregateInput
    _max?: predictivemodelMaxOrderByAggregateInput
    _min?: predictivemodelMinOrderByAggregateInput
    _sum?: predictivemodelSumOrderByAggregateInput
  }

  export type predictivemodelScalarWhereWithAggregatesInput = {
    AND?: predictivemodelScalarWhereWithAggregatesInput | predictivemodelScalarWhereWithAggregatesInput[]
    OR?: predictivemodelScalarWhereWithAggregatesInput[]
    NOT?: predictivemodelScalarWhereWithAggregatesInput | predictivemodelScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"predictivemodel"> | number
    model_name?: StringWithAggregatesFilter<"predictivemodel"> | string
    variety?: StringWithAggregatesFilter<"predictivemodel"> | string
    attribute?: StringWithAggregatesFilter<"predictivemodel"> | string
    hyperparameters?: JsonWithAggregatesFilter<"predictivemodel">
    metrics?: JsonWithAggregatesFilter<"predictivemodel">
    model?: StringNullableWithAggregatesFilter<"predictivemodel"> | string | null
    graph?: JsonWithAggregatesFilter<"predictivemodel">
    createdAt?: DateTimeWithAggregatesFilter<"predictivemodel"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"predictivemodel"> | Date | string
  }

  export type spectraWhereInput = {
    AND?: spectraWhereInput | spectraWhereInput[]
    OR?: spectraWhereInput[]
    NOT?: spectraWhereInput | spectraWhereInput[]
    id?: IntFilter<"spectra"> | number
    name?: StringFilter<"spectra"> | string
    content?: JsonFilter<"spectra">
    variety?: StringFilter<"spectra"> | string
    datetime?: DateTimeFilter<"spectra"> | Date | string
    local?: StringFilter<"spectra"> | string
    filter?: StringNullableFilter<"spectra"> | string | null
    graph?: StringNullableFilter<"spectra"> | string | null
    createdAt?: DateTimeFilter<"spectra"> | Date | string
  }

  export type spectraOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    variety?: SortOrder
    datetime?: SortOrder
    local?: SortOrder
    filter?: SortOrderInput | SortOrder
    graph?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type spectraWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: spectraWhereInput | spectraWhereInput[]
    OR?: spectraWhereInput[]
    NOT?: spectraWhereInput | spectraWhereInput[]
    name?: StringFilter<"spectra"> | string
    content?: JsonFilter<"spectra">
    variety?: StringFilter<"spectra"> | string
    datetime?: DateTimeFilter<"spectra"> | Date | string
    local?: StringFilter<"spectra"> | string
    filter?: StringNullableFilter<"spectra"> | string | null
    graph?: StringNullableFilter<"spectra"> | string | null
    createdAt?: DateTimeFilter<"spectra"> | Date | string
  }, "id">

  export type spectraOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    variety?: SortOrder
    datetime?: SortOrder
    local?: SortOrder
    filter?: SortOrderInput | SortOrder
    graph?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: spectraCountOrderByAggregateInput
    _avg?: spectraAvgOrderByAggregateInput
    _max?: spectraMaxOrderByAggregateInput
    _min?: spectraMinOrderByAggregateInput
    _sum?: spectraSumOrderByAggregateInput
  }

  export type spectraScalarWhereWithAggregatesInput = {
    AND?: spectraScalarWhereWithAggregatesInput | spectraScalarWhereWithAggregatesInput[]
    OR?: spectraScalarWhereWithAggregatesInput[]
    NOT?: spectraScalarWhereWithAggregatesInput | spectraScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"spectra"> | number
    name?: StringWithAggregatesFilter<"spectra"> | string
    content?: JsonWithAggregatesFilter<"spectra">
    variety?: StringWithAggregatesFilter<"spectra"> | string
    datetime?: DateTimeWithAggregatesFilter<"spectra"> | Date | string
    local?: StringWithAggregatesFilter<"spectra"> | string
    filter?: StringNullableWithAggregatesFilter<"spectra"> | string | null
    graph?: StringNullableWithAggregatesFilter<"spectra"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"spectra"> | Date | string
  }

  export type spectrumdataWhereInput = {
    AND?: spectrumdataWhereInput | spectrumdataWhereInput[]
    OR?: spectrumdataWhereInput[]
    NOT?: spectrumdataWhereInput | spectrumdataWhereInput[]
    id?: IntFilter<"spectrumdata"> | number
    dataset?: StringFilter<"spectrumdata"> | string
    wavelengths?: JsonFilter<"spectrumdata">
    X?: JsonFilter<"spectrumdata">
    createdAt?: DateTimeFilter<"spectrumdata"> | Date | string
    updatedAt?: DateTimeFilter<"spectrumdata"> | Date | string
    image?: JsonFilter<"spectrumdata">
  }

  export type spectrumdataOrderByWithRelationInput = {
    id?: SortOrder
    dataset?: SortOrder
    wavelengths?: SortOrder
    X?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    image?: SortOrder
  }

  export type spectrumdataWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: spectrumdataWhereInput | spectrumdataWhereInput[]
    OR?: spectrumdataWhereInput[]
    NOT?: spectrumdataWhereInput | spectrumdataWhereInput[]
    dataset?: StringFilter<"spectrumdata"> | string
    wavelengths?: JsonFilter<"spectrumdata">
    X?: JsonFilter<"spectrumdata">
    createdAt?: DateTimeFilter<"spectrumdata"> | Date | string
    updatedAt?: DateTimeFilter<"spectrumdata"> | Date | string
    image?: JsonFilter<"spectrumdata">
  }, "id">

  export type spectrumdataOrderByWithAggregationInput = {
    id?: SortOrder
    dataset?: SortOrder
    wavelengths?: SortOrder
    X?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    image?: SortOrder
    _count?: spectrumdataCountOrderByAggregateInput
    _avg?: spectrumdataAvgOrderByAggregateInput
    _max?: spectrumdataMaxOrderByAggregateInput
    _min?: spectrumdataMinOrderByAggregateInput
    _sum?: spectrumdataSumOrderByAggregateInput
  }

  export type spectrumdataScalarWhereWithAggregatesInput = {
    AND?: spectrumdataScalarWhereWithAggregatesInput | spectrumdataScalarWhereWithAggregatesInput[]
    OR?: spectrumdataScalarWhereWithAggregatesInput[]
    NOT?: spectrumdataScalarWhereWithAggregatesInput | spectrumdataScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"spectrumdata"> | number
    dataset?: StringWithAggregatesFilter<"spectrumdata"> | string
    wavelengths?: JsonWithAggregatesFilter<"spectrumdata">
    X?: JsonWithAggregatesFilter<"spectrumdata">
    createdAt?: DateTimeWithAggregatesFilter<"spectrumdata"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"spectrumdata"> | Date | string
    image?: JsonWithAggregatesFilter<"spectrumdata">
  }

  export type targetdataWhereInput = {
    AND?: targetdataWhereInput | targetdataWhereInput[]
    OR?: targetdataWhereInput[]
    NOT?: targetdataWhereInput | targetdataWhereInput[]
    id?: IntFilter<"targetdata"> | number
    attribute?: StringFilter<"targetdata"> | string
    y?: JsonFilter<"targetdata">
    createdAt?: DateTimeFilter<"targetdata"> | Date | string
    updatedAt?: DateTimeFilter<"targetdata"> | Date | string
  }

  export type targetdataOrderByWithRelationInput = {
    id?: SortOrder
    attribute?: SortOrder
    y?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type targetdataWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: targetdataWhereInput | targetdataWhereInput[]
    OR?: targetdataWhereInput[]
    NOT?: targetdataWhereInput | targetdataWhereInput[]
    attribute?: StringFilter<"targetdata"> | string
    y?: JsonFilter<"targetdata">
    createdAt?: DateTimeFilter<"targetdata"> | Date | string
    updatedAt?: DateTimeFilter<"targetdata"> | Date | string
  }, "id">

  export type targetdataOrderByWithAggregationInput = {
    id?: SortOrder
    attribute?: SortOrder
    y?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: targetdataCountOrderByAggregateInput
    _avg?: targetdataAvgOrderByAggregateInput
    _max?: targetdataMaxOrderByAggregateInput
    _min?: targetdataMinOrderByAggregateInput
    _sum?: targetdataSumOrderByAggregateInput
  }

  export type targetdataScalarWhereWithAggregatesInput = {
    AND?: targetdataScalarWhereWithAggregatesInput | targetdataScalarWhereWithAggregatesInput[]
    OR?: targetdataScalarWhereWithAggregatesInput[]
    NOT?: targetdataScalarWhereWithAggregatesInput | targetdataScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"targetdata"> | number
    attribute?: StringWithAggregatesFilter<"targetdata"> | string
    y?: JsonWithAggregatesFilter<"targetdata">
    createdAt?: DateTimeWithAggregatesFilter<"targetdata"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"targetdata"> | Date | string
  }

  export type varietyWhereInput = {
    AND?: varietyWhereInput | varietyWhereInput[]
    OR?: varietyWhereInput[]
    NOT?: varietyWhereInput | varietyWhereInput[]
    id?: IntFilter<"variety"> | number
    name?: StringFilter<"variety"> | string
    description?: StringFilter<"variety"> | string
    attributes?: JsonFilter<"variety">
  }

  export type varietyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    attributes?: SortOrder
  }

  export type varietyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: varietyWhereInput | varietyWhereInput[]
    OR?: varietyWhereInput[]
    NOT?: varietyWhereInput | varietyWhereInput[]
    name?: StringFilter<"variety"> | string
    description?: StringFilter<"variety"> | string
    attributes?: JsonFilter<"variety">
  }, "id">

  export type varietyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    attributes?: SortOrder
    _count?: varietyCountOrderByAggregateInput
    _avg?: varietyAvgOrderByAggregateInput
    _max?: varietyMaxOrderByAggregateInput
    _min?: varietyMinOrderByAggregateInput
    _sum?: varietySumOrderByAggregateInput
  }

  export type varietyScalarWhereWithAggregatesInput = {
    AND?: varietyScalarWhereWithAggregatesInput | varietyScalarWhereWithAggregatesInput[]
    OR?: varietyScalarWhereWithAggregatesInput[]
    NOT?: varietyScalarWhereWithAggregatesInput | varietyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"variety"> | number
    name?: StringWithAggregatesFilter<"variety"> | string
    description?: StringWithAggregatesFilter<"variety"> | string
    attributes?: JsonWithAggregatesFilter<"variety">
  }

  export type userCreateInput = {
    username: string
    password: string
    userType?: string
  }

  export type userUncheckedCreateInput = {
    id?: number
    username: string
    password: string
    userType?: string
  }

  export type userUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: StringFieldUpdateOperationsInput | string
  }

  export type userUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: StringFieldUpdateOperationsInput | string
  }

  export type userCreateManyInput = {
    id?: number
    username: string
    password: string
    userType?: string
  }

  export type userUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: StringFieldUpdateOperationsInput | string
  }

  export type userUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: StringFieldUpdateOperationsInput | string
  }

  export type filterCreateInput = {
    name: string
    type: string
    parameters: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type filterUncheckedCreateInput = {
    id?: number
    name: string
    type: string
    parameters: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type filterUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type filterUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type filterCreateManyInput = {
    id?: number
    name: string
    type: string
    parameters: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type filterUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type filterUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type predictionsCreateInput = {
    name: string
    model_name: string
    spectral_data_id: number
    prediction: number
    createdAt?: Date | string
    attribute?: string | null
  }

  export type predictionsUncheckedCreateInput = {
    id?: number
    name: string
    model_name: string
    spectral_data_id: number
    prediction: number
    createdAt?: Date | string
    attribute?: string | null
  }

  export type predictionsUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    model_name?: StringFieldUpdateOperationsInput | string
    spectral_data_id?: IntFieldUpdateOperationsInput | number
    prediction?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attribute?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type predictionsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    model_name?: StringFieldUpdateOperationsInput | string
    spectral_data_id?: IntFieldUpdateOperationsInput | number
    prediction?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attribute?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type predictionsCreateManyInput = {
    id?: number
    name: string
    model_name: string
    spectral_data_id: number
    prediction: number
    createdAt?: Date | string
    attribute?: string | null
  }

  export type predictionsUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    model_name?: StringFieldUpdateOperationsInput | string
    spectral_data_id?: IntFieldUpdateOperationsInput | number
    prediction?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attribute?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type predictionsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    model_name?: StringFieldUpdateOperationsInput | string
    spectral_data_id?: IntFieldUpdateOperationsInput | number
    prediction?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attribute?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type predictivemodelCreateInput = {
    model_name: string
    variety: string
    attribute: string
    hyperparameters: JsonNullValueInput | InputJsonValue
    metrics: JsonNullValueInput | InputJsonValue
    model?: string | null
    graph: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type predictivemodelUncheckedCreateInput = {
    id?: number
    model_name: string
    variety: string
    attribute: string
    hyperparameters: JsonNullValueInput | InputJsonValue
    metrics: JsonNullValueInput | InputJsonValue
    model?: string | null
    graph: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type predictivemodelUpdateInput = {
    model_name?: StringFieldUpdateOperationsInput | string
    variety?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    model?: NullableStringFieldUpdateOperationsInput | string | null
    graph?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type predictivemodelUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    model_name?: StringFieldUpdateOperationsInput | string
    variety?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    model?: NullableStringFieldUpdateOperationsInput | string | null
    graph?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type predictivemodelCreateManyInput = {
    id?: number
    model_name: string
    variety: string
    attribute: string
    hyperparameters: JsonNullValueInput | InputJsonValue
    metrics: JsonNullValueInput | InputJsonValue
    model?: string | null
    graph: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type predictivemodelUpdateManyMutationInput = {
    model_name?: StringFieldUpdateOperationsInput | string
    variety?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    model?: NullableStringFieldUpdateOperationsInput | string | null
    graph?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type predictivemodelUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    model_name?: StringFieldUpdateOperationsInput | string
    variety?: StringFieldUpdateOperationsInput | string
    attribute?: StringFieldUpdateOperationsInput | string
    hyperparameters?: JsonNullValueInput | InputJsonValue
    metrics?: JsonNullValueInput | InputJsonValue
    model?: NullableStringFieldUpdateOperationsInput | string | null
    graph?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type spectraCreateInput = {
    name: string
    content: JsonNullValueInput | InputJsonValue
    variety: string
    datetime: Date | string
    local: string
    filter?: string | null
    graph?: string | null
    createdAt?: Date | string
  }

  export type spectraUncheckedCreateInput = {
    id?: number
    name: string
    content: JsonNullValueInput | InputJsonValue
    variety: string
    datetime: Date | string
    local: string
    filter?: string | null
    graph?: string | null
    createdAt?: Date | string
  }

  export type spectraUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    variety?: StringFieldUpdateOperationsInput | string
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    local?: StringFieldUpdateOperationsInput | string
    filter?: NullableStringFieldUpdateOperationsInput | string | null
    graph?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type spectraUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    variety?: StringFieldUpdateOperationsInput | string
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    local?: StringFieldUpdateOperationsInput | string
    filter?: NullableStringFieldUpdateOperationsInput | string | null
    graph?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type spectraCreateManyInput = {
    id?: number
    name: string
    content: JsonNullValueInput | InputJsonValue
    variety: string
    datetime: Date | string
    local: string
    filter?: string | null
    graph?: string | null
    createdAt?: Date | string
  }

  export type spectraUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    variety?: StringFieldUpdateOperationsInput | string
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    local?: StringFieldUpdateOperationsInput | string
    filter?: NullableStringFieldUpdateOperationsInput | string | null
    graph?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type spectraUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    variety?: StringFieldUpdateOperationsInput | string
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    local?: StringFieldUpdateOperationsInput | string
    filter?: NullableStringFieldUpdateOperationsInput | string | null
    graph?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type spectrumdataCreateInput = {
    dataset: string
    wavelengths: JsonNullValueInput | InputJsonValue
    X: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    image: JsonNullValueInput | InputJsonValue
  }

  export type spectrumdataUncheckedCreateInput = {
    id?: number
    dataset: string
    wavelengths: JsonNullValueInput | InputJsonValue
    X: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    image: JsonNullValueInput | InputJsonValue
  }

  export type spectrumdataUpdateInput = {
    dataset?: StringFieldUpdateOperationsInput | string
    wavelengths?: JsonNullValueInput | InputJsonValue
    X?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: JsonNullValueInput | InputJsonValue
  }

  export type spectrumdataUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataset?: StringFieldUpdateOperationsInput | string
    wavelengths?: JsonNullValueInput | InputJsonValue
    X?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: JsonNullValueInput | InputJsonValue
  }

  export type spectrumdataCreateManyInput = {
    id?: number
    dataset: string
    wavelengths: JsonNullValueInput | InputJsonValue
    X: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    image: JsonNullValueInput | InputJsonValue
  }

  export type spectrumdataUpdateManyMutationInput = {
    dataset?: StringFieldUpdateOperationsInput | string
    wavelengths?: JsonNullValueInput | InputJsonValue
    X?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: JsonNullValueInput | InputJsonValue
  }

  export type spectrumdataUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataset?: StringFieldUpdateOperationsInput | string
    wavelengths?: JsonNullValueInput | InputJsonValue
    X?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: JsonNullValueInput | InputJsonValue
  }

  export type targetdataCreateInput = {
    attribute: string
    y: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type targetdataUncheckedCreateInput = {
    id?: number
    attribute: string
    y: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type targetdataUpdateInput = {
    attribute?: StringFieldUpdateOperationsInput | string
    y?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type targetdataUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    attribute?: StringFieldUpdateOperationsInput | string
    y?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type targetdataCreateManyInput = {
    id?: number
    attribute: string
    y: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type targetdataUpdateManyMutationInput = {
    attribute?: StringFieldUpdateOperationsInput | string
    y?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type targetdataUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    attribute?: StringFieldUpdateOperationsInput | string
    y?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type varietyCreateInput = {
    name: string
    description: string
    attributes: JsonNullValueInput | InputJsonValue
  }

  export type varietyUncheckedCreateInput = {
    id?: number
    name: string
    description: string
    attributes: JsonNullValueInput | InputJsonValue
  }

  export type varietyUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    attributes?: JsonNullValueInput | InputJsonValue
  }

  export type varietyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    attributes?: JsonNullValueInput | InputJsonValue
  }

  export type varietyCreateManyInput = {
    id?: number
    name: string
    description: string
    attributes: JsonNullValueInput | InputJsonValue
  }

  export type varietyUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    attributes?: JsonNullValueInput | InputJsonValue
  }

  export type varietyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    attributes?: JsonNullValueInput | InputJsonValue
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type userCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    userType?: SortOrder
  }

  export type userAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    userType?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    userType?: SortOrder
  }

  export type userSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type filterCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    parameters?: SortOrder
    createdAt?: SortOrder
  }

  export type filterAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type filterMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type filterMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type filterSumOrderByAggregateInput = {
    id?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type predictionsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    model_name?: SortOrder
    spectral_data_id?: SortOrder
    prediction?: SortOrder
    createdAt?: SortOrder
    attribute?: SortOrder
  }

  export type predictionsAvgOrderByAggregateInput = {
    id?: SortOrder
    spectral_data_id?: SortOrder
    prediction?: SortOrder
  }

  export type predictionsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    model_name?: SortOrder
    spectral_data_id?: SortOrder
    prediction?: SortOrder
    createdAt?: SortOrder
    attribute?: SortOrder
  }

  export type predictionsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    model_name?: SortOrder
    spectral_data_id?: SortOrder
    prediction?: SortOrder
    createdAt?: SortOrder
    attribute?: SortOrder
  }

  export type predictionsSumOrderByAggregateInput = {
    id?: SortOrder
    spectral_data_id?: SortOrder
    prediction?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type predictivemodelCountOrderByAggregateInput = {
    id?: SortOrder
    model_name?: SortOrder
    variety?: SortOrder
    attribute?: SortOrder
    hyperparameters?: SortOrder
    metrics?: SortOrder
    model?: SortOrder
    graph?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type predictivemodelAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type predictivemodelMaxOrderByAggregateInput = {
    id?: SortOrder
    model_name?: SortOrder
    variety?: SortOrder
    attribute?: SortOrder
    model?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type predictivemodelMinOrderByAggregateInput = {
    id?: SortOrder
    model_name?: SortOrder
    variety?: SortOrder
    attribute?: SortOrder
    model?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type predictivemodelSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type spectraCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    variety?: SortOrder
    datetime?: SortOrder
    local?: SortOrder
    filter?: SortOrder
    graph?: SortOrder
    createdAt?: SortOrder
  }

  export type spectraAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type spectraMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    variety?: SortOrder
    datetime?: SortOrder
    local?: SortOrder
    filter?: SortOrder
    graph?: SortOrder
    createdAt?: SortOrder
  }

  export type spectraMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    variety?: SortOrder
    datetime?: SortOrder
    local?: SortOrder
    filter?: SortOrder
    graph?: SortOrder
    createdAt?: SortOrder
  }

  export type spectraSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type spectrumdataCountOrderByAggregateInput = {
    id?: SortOrder
    dataset?: SortOrder
    wavelengths?: SortOrder
    X?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    image?: SortOrder
  }

  export type spectrumdataAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type spectrumdataMaxOrderByAggregateInput = {
    id?: SortOrder
    dataset?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type spectrumdataMinOrderByAggregateInput = {
    id?: SortOrder
    dataset?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type spectrumdataSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type targetdataCountOrderByAggregateInput = {
    id?: SortOrder
    attribute?: SortOrder
    y?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type targetdataAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type targetdataMaxOrderByAggregateInput = {
    id?: SortOrder
    attribute?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type targetdataMinOrderByAggregateInput = {
    id?: SortOrder
    attribute?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type targetdataSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type varietyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    attributes?: SortOrder
  }

  export type varietyAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type varietyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type varietyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type varietySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use userDefaultArgs instead
     */
    export type userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = userDefaultArgs<ExtArgs>
    /**
     * @deprecated Use filterDefaultArgs instead
     */
    export type filterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = filterDefaultArgs<ExtArgs>
    /**
     * @deprecated Use predictionsDefaultArgs instead
     */
    export type predictionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = predictionsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use predictivemodelDefaultArgs instead
     */
    export type predictivemodelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = predictivemodelDefaultArgs<ExtArgs>
    /**
     * @deprecated Use spectraDefaultArgs instead
     */
    export type spectraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = spectraDefaultArgs<ExtArgs>
    /**
     * @deprecated Use spectrumdataDefaultArgs instead
     */
    export type spectrumdataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = spectrumdataDefaultArgs<ExtArgs>
    /**
     * @deprecated Use targetdataDefaultArgs instead
     */
    export type targetdataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = targetdataDefaultArgs<ExtArgs>
    /**
     * @deprecated Use varietyDefaultArgs instead
     */
    export type varietyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = varietyDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}