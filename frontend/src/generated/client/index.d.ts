
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
 * Model Variety
 * 
 */
export type Variety = $Result.DefaultSelection<Prisma.$VarietyPayload>
/**
 * Model Filter
 * 
 */
export type Filter = $Result.DefaultSelection<Prisma.$FilterPayload>
/**
 * Model Spectra
 * 
 */
export type Spectra = $Result.DefaultSelection<Prisma.$SpectraPayload>
/**
 * Model PredictiveModel
 * 
 */
export type PredictiveModel = $Result.DefaultSelection<Prisma.$PredictiveModelPayload>
/**
 * Model SpectrumData
 * 
 */
export type SpectrumData = $Result.DefaultSelection<Prisma.$SpectrumDataPayload>
/**
 * Model TargetData
 * 
 */
export type TargetData = $Result.DefaultSelection<Prisma.$TargetDataPayload>
/**
 * Model Predictions
 * 
 */
export type Predictions = $Result.DefaultSelection<Prisma.$PredictionsPayload>

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
   * `prisma.variety`: Exposes CRUD operations for the **Variety** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Varieties
    * const varieties = await prisma.variety.findMany()
    * ```
    */
  get variety(): Prisma.VarietyDelegate<ExtArgs>;

  /**
   * `prisma.filter`: Exposes CRUD operations for the **Filter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Filters
    * const filters = await prisma.filter.findMany()
    * ```
    */
  get filter(): Prisma.FilterDelegate<ExtArgs>;

  /**
   * `prisma.spectra`: Exposes CRUD operations for the **Spectra** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Spectras
    * const spectras = await prisma.spectra.findMany()
    * ```
    */
  get spectra(): Prisma.SpectraDelegate<ExtArgs>;

  /**
   * `prisma.predictiveModel`: Exposes CRUD operations for the **PredictiveModel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PredictiveModels
    * const predictiveModels = await prisma.predictiveModel.findMany()
    * ```
    */
  get predictiveModel(): Prisma.PredictiveModelDelegate<ExtArgs>;

  /**
   * `prisma.spectrumData`: Exposes CRUD operations for the **SpectrumData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SpectrumData
    * const spectrumData = await prisma.spectrumData.findMany()
    * ```
    */
  get spectrumData(): Prisma.SpectrumDataDelegate<ExtArgs>;

  /**
   * `prisma.targetData`: Exposes CRUD operations for the **TargetData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TargetData
    * const targetData = await prisma.targetData.findMany()
    * ```
    */
  get targetData(): Prisma.TargetDataDelegate<ExtArgs>;

  /**
   * `prisma.predictions`: Exposes CRUD operations for the **Predictions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Predictions
    * const predictions = await prisma.predictions.findMany()
    * ```
    */
  get predictions(): Prisma.PredictionsDelegate<ExtArgs>;
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
    Variety: 'Variety',
    Filter: 'Filter',
    Spectra: 'Spectra',
    PredictiveModel: 'PredictiveModel',
    SpectrumData: 'SpectrumData',
    TargetData: 'TargetData',
    Predictions: 'Predictions'
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
      modelProps: "user" | "variety" | "filter" | "spectra" | "predictiveModel" | "spectrumData" | "targetData" | "predictions"
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
      Variety: {
        payload: Prisma.$VarietyPayload<ExtArgs>
        fields: Prisma.VarietyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VarietyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VarietyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VarietyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VarietyPayload>
          }
          findFirst: {
            args: Prisma.VarietyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VarietyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VarietyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VarietyPayload>
          }
          findMany: {
            args: Prisma.VarietyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VarietyPayload>[]
          }
          create: {
            args: Prisma.VarietyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VarietyPayload>
          }
          createMany: {
            args: Prisma.VarietyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.VarietyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VarietyPayload>
          }
          update: {
            args: Prisma.VarietyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VarietyPayload>
          }
          deleteMany: {
            args: Prisma.VarietyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VarietyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VarietyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VarietyPayload>
          }
          aggregate: {
            args: Prisma.VarietyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVariety>
          }
          groupBy: {
            args: Prisma.VarietyGroupByArgs<ExtArgs>
            result: $Utils.Optional<VarietyGroupByOutputType>[]
          }
          count: {
            args: Prisma.VarietyCountArgs<ExtArgs>
            result: $Utils.Optional<VarietyCountAggregateOutputType> | number
          }
        }
      }
      Filter: {
        payload: Prisma.$FilterPayload<ExtArgs>
        fields: Prisma.FilterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FilterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FilterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterPayload>
          }
          findFirst: {
            args: Prisma.FilterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FilterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterPayload>
          }
          findMany: {
            args: Prisma.FilterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterPayload>[]
          }
          create: {
            args: Prisma.FilterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterPayload>
          }
          createMany: {
            args: Prisma.FilterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FilterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterPayload>
          }
          update: {
            args: Prisma.FilterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterPayload>
          }
          deleteMany: {
            args: Prisma.FilterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FilterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FilterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilterPayload>
          }
          aggregate: {
            args: Prisma.FilterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFilter>
          }
          groupBy: {
            args: Prisma.FilterGroupByArgs<ExtArgs>
            result: $Utils.Optional<FilterGroupByOutputType>[]
          }
          count: {
            args: Prisma.FilterCountArgs<ExtArgs>
            result: $Utils.Optional<FilterCountAggregateOutputType> | number
          }
        }
      }
      Spectra: {
        payload: Prisma.$SpectraPayload<ExtArgs>
        fields: Prisma.SpectraFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SpectraFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpectraPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SpectraFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpectraPayload>
          }
          findFirst: {
            args: Prisma.SpectraFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpectraPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SpectraFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpectraPayload>
          }
          findMany: {
            args: Prisma.SpectraFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpectraPayload>[]
          }
          create: {
            args: Prisma.SpectraCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpectraPayload>
          }
          createMany: {
            args: Prisma.SpectraCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SpectraDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpectraPayload>
          }
          update: {
            args: Prisma.SpectraUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpectraPayload>
          }
          deleteMany: {
            args: Prisma.SpectraDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SpectraUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SpectraUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpectraPayload>
          }
          aggregate: {
            args: Prisma.SpectraAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpectra>
          }
          groupBy: {
            args: Prisma.SpectraGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpectraGroupByOutputType>[]
          }
          count: {
            args: Prisma.SpectraCountArgs<ExtArgs>
            result: $Utils.Optional<SpectraCountAggregateOutputType> | number
          }
        }
      }
      PredictiveModel: {
        payload: Prisma.$PredictiveModelPayload<ExtArgs>
        fields: Prisma.PredictiveModelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PredictiveModelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictiveModelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PredictiveModelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictiveModelPayload>
          }
          findFirst: {
            args: Prisma.PredictiveModelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictiveModelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PredictiveModelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictiveModelPayload>
          }
          findMany: {
            args: Prisma.PredictiveModelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictiveModelPayload>[]
          }
          create: {
            args: Prisma.PredictiveModelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictiveModelPayload>
          }
          createMany: {
            args: Prisma.PredictiveModelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PredictiveModelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictiveModelPayload>
          }
          update: {
            args: Prisma.PredictiveModelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictiveModelPayload>
          }
          deleteMany: {
            args: Prisma.PredictiveModelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PredictiveModelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PredictiveModelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictiveModelPayload>
          }
          aggregate: {
            args: Prisma.PredictiveModelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePredictiveModel>
          }
          groupBy: {
            args: Prisma.PredictiveModelGroupByArgs<ExtArgs>
            result: $Utils.Optional<PredictiveModelGroupByOutputType>[]
          }
          count: {
            args: Prisma.PredictiveModelCountArgs<ExtArgs>
            result: $Utils.Optional<PredictiveModelCountAggregateOutputType> | number
          }
        }
      }
      SpectrumData: {
        payload: Prisma.$SpectrumDataPayload<ExtArgs>
        fields: Prisma.SpectrumDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SpectrumDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpectrumDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SpectrumDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpectrumDataPayload>
          }
          findFirst: {
            args: Prisma.SpectrumDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpectrumDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SpectrumDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpectrumDataPayload>
          }
          findMany: {
            args: Prisma.SpectrumDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpectrumDataPayload>[]
          }
          create: {
            args: Prisma.SpectrumDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpectrumDataPayload>
          }
          createMany: {
            args: Prisma.SpectrumDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SpectrumDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpectrumDataPayload>
          }
          update: {
            args: Prisma.SpectrumDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpectrumDataPayload>
          }
          deleteMany: {
            args: Prisma.SpectrumDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SpectrumDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SpectrumDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpectrumDataPayload>
          }
          aggregate: {
            args: Prisma.SpectrumDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpectrumData>
          }
          groupBy: {
            args: Prisma.SpectrumDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpectrumDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.SpectrumDataCountArgs<ExtArgs>
            result: $Utils.Optional<SpectrumDataCountAggregateOutputType> | number
          }
        }
      }
      TargetData: {
        payload: Prisma.$TargetDataPayload<ExtArgs>
        fields: Prisma.TargetDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TargetDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TargetDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetDataPayload>
          }
          findFirst: {
            args: Prisma.TargetDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TargetDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetDataPayload>
          }
          findMany: {
            args: Prisma.TargetDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetDataPayload>[]
          }
          create: {
            args: Prisma.TargetDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetDataPayload>
          }
          createMany: {
            args: Prisma.TargetDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TargetDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetDataPayload>
          }
          update: {
            args: Prisma.TargetDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetDataPayload>
          }
          deleteMany: {
            args: Prisma.TargetDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TargetDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TargetDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TargetDataPayload>
          }
          aggregate: {
            args: Prisma.TargetDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTargetData>
          }
          groupBy: {
            args: Prisma.TargetDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<TargetDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.TargetDataCountArgs<ExtArgs>
            result: $Utils.Optional<TargetDataCountAggregateOutputType> | number
          }
        }
      }
      Predictions: {
        payload: Prisma.$PredictionsPayload<ExtArgs>
        fields: Prisma.PredictionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PredictionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PredictionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionsPayload>
          }
          findFirst: {
            args: Prisma.PredictionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PredictionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionsPayload>
          }
          findMany: {
            args: Prisma.PredictionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionsPayload>[]
          }
          create: {
            args: Prisma.PredictionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionsPayload>
          }
          createMany: {
            args: Prisma.PredictionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PredictionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionsPayload>
          }
          update: {
            args: Prisma.PredictionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionsPayload>
          }
          deleteMany: {
            args: Prisma.PredictionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PredictionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PredictionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PredictionsPayload>
          }
          aggregate: {
            args: Prisma.PredictionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePredictions>
          }
          groupBy: {
            args: Prisma.PredictionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PredictionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PredictionsCountArgs<ExtArgs>
            result: $Utils.Optional<PredictionsCountAggregateOutputType> | number
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
   * Model Variety
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
     * Filter which Variety to aggregate.
     */
    where?: VarietyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Varieties to fetch.
     */
    orderBy?: VarietyOrderByWithRelationInput | VarietyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VarietyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Varieties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Varieties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Varieties
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




  export type VarietyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VarietyWhereInput
    orderBy?: VarietyOrderByWithAggregationInput | VarietyOrderByWithAggregationInput[]
    by: VarietyScalarFieldEnum[] | VarietyScalarFieldEnum
    having?: VarietyScalarWhereWithAggregatesInput
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

  type GetVarietyGroupByPayload<T extends VarietyGroupByArgs> = Prisma.PrismaPromise<
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


  export type VarietySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    attributes?: boolean
  }, ExtArgs["result"]["variety"]>


  export type VarietySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    attributes?: boolean
  }


  export type $VarietyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Variety"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string
      attributes: Prisma.JsonValue
    }, ExtArgs["result"]["variety"]>
    composites: {}
  }

  type VarietyGetPayload<S extends boolean | null | undefined | VarietyDefaultArgs> = $Result.GetResult<Prisma.$VarietyPayload, S>

  type VarietyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VarietyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VarietyCountAggregateInputType | true
    }

  export interface VarietyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Variety'], meta: { name: 'Variety' } }
    /**
     * Find zero or one Variety that matches the filter.
     * @param {VarietyFindUniqueArgs} args - Arguments to find a Variety
     * @example
     * // Get one Variety
     * const variety = await prisma.variety.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VarietyFindUniqueArgs>(args: SelectSubset<T, VarietyFindUniqueArgs<ExtArgs>>): Prisma__VarietyClient<$Result.GetResult<Prisma.$VarietyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Variety that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VarietyFindUniqueOrThrowArgs} args - Arguments to find a Variety
     * @example
     * // Get one Variety
     * const variety = await prisma.variety.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VarietyFindUniqueOrThrowArgs>(args: SelectSubset<T, VarietyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VarietyClient<$Result.GetResult<Prisma.$VarietyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Variety that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VarietyFindFirstArgs} args - Arguments to find a Variety
     * @example
     * // Get one Variety
     * const variety = await prisma.variety.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VarietyFindFirstArgs>(args?: SelectSubset<T, VarietyFindFirstArgs<ExtArgs>>): Prisma__VarietyClient<$Result.GetResult<Prisma.$VarietyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Variety that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VarietyFindFirstOrThrowArgs} args - Arguments to find a Variety
     * @example
     * // Get one Variety
     * const variety = await prisma.variety.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VarietyFindFirstOrThrowArgs>(args?: SelectSubset<T, VarietyFindFirstOrThrowArgs<ExtArgs>>): Prisma__VarietyClient<$Result.GetResult<Prisma.$VarietyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Varieties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VarietyFindManyArgs} args - Arguments to filter and select certain fields only.
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
    findMany<T extends VarietyFindManyArgs>(args?: SelectSubset<T, VarietyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VarietyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Variety.
     * @param {VarietyCreateArgs} args - Arguments to create a Variety.
     * @example
     * // Create one Variety
     * const Variety = await prisma.variety.create({
     *   data: {
     *     // ... data to create a Variety
     *   }
     * })
     * 
     */
    create<T extends VarietyCreateArgs>(args: SelectSubset<T, VarietyCreateArgs<ExtArgs>>): Prisma__VarietyClient<$Result.GetResult<Prisma.$VarietyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Varieties.
     * @param {VarietyCreateManyArgs} args - Arguments to create many Varieties.
     * @example
     * // Create many Varieties
     * const variety = await prisma.variety.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VarietyCreateManyArgs>(args?: SelectSubset<T, VarietyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Variety.
     * @param {VarietyDeleteArgs} args - Arguments to delete one Variety.
     * @example
     * // Delete one Variety
     * const Variety = await prisma.variety.delete({
     *   where: {
     *     // ... filter to delete one Variety
     *   }
     * })
     * 
     */
    delete<T extends VarietyDeleteArgs>(args: SelectSubset<T, VarietyDeleteArgs<ExtArgs>>): Prisma__VarietyClient<$Result.GetResult<Prisma.$VarietyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Variety.
     * @param {VarietyUpdateArgs} args - Arguments to update one Variety.
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
    update<T extends VarietyUpdateArgs>(args: SelectSubset<T, VarietyUpdateArgs<ExtArgs>>): Prisma__VarietyClient<$Result.GetResult<Prisma.$VarietyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Varieties.
     * @param {VarietyDeleteManyArgs} args - Arguments to filter Varieties to delete.
     * @example
     * // Delete a few Varieties
     * const { count } = await prisma.variety.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VarietyDeleteManyArgs>(args?: SelectSubset<T, VarietyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Varieties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VarietyUpdateManyArgs} args - Arguments to update one or more rows.
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
    updateMany<T extends VarietyUpdateManyArgs>(args: SelectSubset<T, VarietyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Variety.
     * @param {VarietyUpsertArgs} args - Arguments to update or create a Variety.
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
    upsert<T extends VarietyUpsertArgs>(args: SelectSubset<T, VarietyUpsertArgs<ExtArgs>>): Prisma__VarietyClient<$Result.GetResult<Prisma.$VarietyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Varieties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VarietyCountArgs} args - Arguments to filter Varieties to count.
     * @example
     * // Count the number of Varieties
     * const count = await prisma.variety.count({
     *   where: {
     *     // ... the filter for the Varieties we want to count
     *   }
     * })
    **/
    count<T extends VarietyCountArgs>(
      args?: Subset<T, VarietyCountArgs>,
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
     * @param {VarietyGroupByArgs} args - Group by arguments.
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
      T extends VarietyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VarietyGroupByArgs['orderBy'] }
        : { orderBy?: VarietyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VarietyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVarietyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Variety model
   */
  readonly fields: VarietyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Variety.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VarietyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Variety model
   */ 
  interface VarietyFieldRefs {
    readonly id: FieldRef<"Variety", 'Int'>
    readonly name: FieldRef<"Variety", 'String'>
    readonly description: FieldRef<"Variety", 'String'>
    readonly attributes: FieldRef<"Variety", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Variety findUnique
   */
  export type VarietyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variety
     */
    select?: VarietySelect<ExtArgs> | null
    /**
     * Filter, which Variety to fetch.
     */
    where: VarietyWhereUniqueInput
  }

  /**
   * Variety findUniqueOrThrow
   */
  export type VarietyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variety
     */
    select?: VarietySelect<ExtArgs> | null
    /**
     * Filter, which Variety to fetch.
     */
    where: VarietyWhereUniqueInput
  }

  /**
   * Variety findFirst
   */
  export type VarietyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variety
     */
    select?: VarietySelect<ExtArgs> | null
    /**
     * Filter, which Variety to fetch.
     */
    where?: VarietyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Varieties to fetch.
     */
    orderBy?: VarietyOrderByWithRelationInput | VarietyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Varieties.
     */
    cursor?: VarietyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Varieties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Varieties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Varieties.
     */
    distinct?: VarietyScalarFieldEnum | VarietyScalarFieldEnum[]
  }

  /**
   * Variety findFirstOrThrow
   */
  export type VarietyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variety
     */
    select?: VarietySelect<ExtArgs> | null
    /**
     * Filter, which Variety to fetch.
     */
    where?: VarietyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Varieties to fetch.
     */
    orderBy?: VarietyOrderByWithRelationInput | VarietyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Varieties.
     */
    cursor?: VarietyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Varieties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Varieties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Varieties.
     */
    distinct?: VarietyScalarFieldEnum | VarietyScalarFieldEnum[]
  }

  /**
   * Variety findMany
   */
  export type VarietyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variety
     */
    select?: VarietySelect<ExtArgs> | null
    /**
     * Filter, which Varieties to fetch.
     */
    where?: VarietyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Varieties to fetch.
     */
    orderBy?: VarietyOrderByWithRelationInput | VarietyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Varieties.
     */
    cursor?: VarietyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Varieties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Varieties.
     */
    skip?: number
    distinct?: VarietyScalarFieldEnum | VarietyScalarFieldEnum[]
  }

  /**
   * Variety create
   */
  export type VarietyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variety
     */
    select?: VarietySelect<ExtArgs> | null
    /**
     * The data needed to create a Variety.
     */
    data: XOR<VarietyCreateInput, VarietyUncheckedCreateInput>
  }

  /**
   * Variety createMany
   */
  export type VarietyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Varieties.
     */
    data: VarietyCreateManyInput | VarietyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Variety update
   */
  export type VarietyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variety
     */
    select?: VarietySelect<ExtArgs> | null
    /**
     * The data needed to update a Variety.
     */
    data: XOR<VarietyUpdateInput, VarietyUncheckedUpdateInput>
    /**
     * Choose, which Variety to update.
     */
    where: VarietyWhereUniqueInput
  }

  /**
   * Variety updateMany
   */
  export type VarietyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Varieties.
     */
    data: XOR<VarietyUpdateManyMutationInput, VarietyUncheckedUpdateManyInput>
    /**
     * Filter which Varieties to update
     */
    where?: VarietyWhereInput
  }

  /**
   * Variety upsert
   */
  export type VarietyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variety
     */
    select?: VarietySelect<ExtArgs> | null
    /**
     * The filter to search for the Variety to update in case it exists.
     */
    where: VarietyWhereUniqueInput
    /**
     * In case the Variety found by the `where` argument doesn't exist, create a new Variety with this data.
     */
    create: XOR<VarietyCreateInput, VarietyUncheckedCreateInput>
    /**
     * In case the Variety was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VarietyUpdateInput, VarietyUncheckedUpdateInput>
  }

  /**
   * Variety delete
   */
  export type VarietyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variety
     */
    select?: VarietySelect<ExtArgs> | null
    /**
     * Filter which Variety to delete.
     */
    where: VarietyWhereUniqueInput
  }

  /**
   * Variety deleteMany
   */
  export type VarietyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Varieties to delete
     */
    where?: VarietyWhereInput
  }

  /**
   * Variety without action
   */
  export type VarietyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Variety
     */
    select?: VarietySelect<ExtArgs> | null
  }


  /**
   * Model Filter
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
     * Filter which Filter to aggregate.
     */
    where?: FilterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Filters to fetch.
     */
    orderBy?: FilterOrderByWithRelationInput | FilterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FilterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Filters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Filters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Filters
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




  export type FilterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FilterWhereInput
    orderBy?: FilterOrderByWithAggregationInput | FilterOrderByWithAggregationInput[]
    by: FilterScalarFieldEnum[] | FilterScalarFieldEnum
    having?: FilterScalarWhereWithAggregatesInput
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

  type GetFilterGroupByPayload<T extends FilterGroupByArgs> = Prisma.PrismaPromise<
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


  export type FilterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    parameters?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["filter"]>


  export type FilterSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    parameters?: boolean
    createdAt?: boolean
  }


  export type $FilterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Filter"
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

  type FilterGetPayload<S extends boolean | null | undefined | FilterDefaultArgs> = $Result.GetResult<Prisma.$FilterPayload, S>

  type FilterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FilterFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FilterCountAggregateInputType | true
    }

  export interface FilterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Filter'], meta: { name: 'Filter' } }
    /**
     * Find zero or one Filter that matches the filter.
     * @param {FilterFindUniqueArgs} args - Arguments to find a Filter
     * @example
     * // Get one Filter
     * const filter = await prisma.filter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FilterFindUniqueArgs>(args: SelectSubset<T, FilterFindUniqueArgs<ExtArgs>>): Prisma__FilterClient<$Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Filter that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FilterFindUniqueOrThrowArgs} args - Arguments to find a Filter
     * @example
     * // Get one Filter
     * const filter = await prisma.filter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FilterFindUniqueOrThrowArgs>(args: SelectSubset<T, FilterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FilterClient<$Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Filter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilterFindFirstArgs} args - Arguments to find a Filter
     * @example
     * // Get one Filter
     * const filter = await prisma.filter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FilterFindFirstArgs>(args?: SelectSubset<T, FilterFindFirstArgs<ExtArgs>>): Prisma__FilterClient<$Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Filter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilterFindFirstOrThrowArgs} args - Arguments to find a Filter
     * @example
     * // Get one Filter
     * const filter = await prisma.filter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FilterFindFirstOrThrowArgs>(args?: SelectSubset<T, FilterFindFirstOrThrowArgs<ExtArgs>>): Prisma__FilterClient<$Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Filters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilterFindManyArgs} args - Arguments to filter and select certain fields only.
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
    findMany<T extends FilterFindManyArgs>(args?: SelectSubset<T, FilterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Filter.
     * @param {FilterCreateArgs} args - Arguments to create a Filter.
     * @example
     * // Create one Filter
     * const Filter = await prisma.filter.create({
     *   data: {
     *     // ... data to create a Filter
     *   }
     * })
     * 
     */
    create<T extends FilterCreateArgs>(args: SelectSubset<T, FilterCreateArgs<ExtArgs>>): Prisma__FilterClient<$Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Filters.
     * @param {FilterCreateManyArgs} args - Arguments to create many Filters.
     * @example
     * // Create many Filters
     * const filter = await prisma.filter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FilterCreateManyArgs>(args?: SelectSubset<T, FilterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Filter.
     * @param {FilterDeleteArgs} args - Arguments to delete one Filter.
     * @example
     * // Delete one Filter
     * const Filter = await prisma.filter.delete({
     *   where: {
     *     // ... filter to delete one Filter
     *   }
     * })
     * 
     */
    delete<T extends FilterDeleteArgs>(args: SelectSubset<T, FilterDeleteArgs<ExtArgs>>): Prisma__FilterClient<$Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Filter.
     * @param {FilterUpdateArgs} args - Arguments to update one Filter.
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
    update<T extends FilterUpdateArgs>(args: SelectSubset<T, FilterUpdateArgs<ExtArgs>>): Prisma__FilterClient<$Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Filters.
     * @param {FilterDeleteManyArgs} args - Arguments to filter Filters to delete.
     * @example
     * // Delete a few Filters
     * const { count } = await prisma.filter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FilterDeleteManyArgs>(args?: SelectSubset<T, FilterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Filters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilterUpdateManyArgs} args - Arguments to update one or more rows.
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
    updateMany<T extends FilterUpdateManyArgs>(args: SelectSubset<T, FilterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Filter.
     * @param {FilterUpsertArgs} args - Arguments to update or create a Filter.
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
    upsert<T extends FilterUpsertArgs>(args: SelectSubset<T, FilterUpsertArgs<ExtArgs>>): Prisma__FilterClient<$Result.GetResult<Prisma.$FilterPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Filters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilterCountArgs} args - Arguments to filter Filters to count.
     * @example
     * // Count the number of Filters
     * const count = await prisma.filter.count({
     *   where: {
     *     // ... the filter for the Filters we want to count
     *   }
     * })
    **/
    count<T extends FilterCountArgs>(
      args?: Subset<T, FilterCountArgs>,
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
     * @param {FilterGroupByArgs} args - Group by arguments.
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
      T extends FilterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FilterGroupByArgs['orderBy'] }
        : { orderBy?: FilterGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FilterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFilterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Filter model
   */
  readonly fields: FilterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Filter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FilterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Filter model
   */ 
  interface FilterFieldRefs {
    readonly id: FieldRef<"Filter", 'Int'>
    readonly name: FieldRef<"Filter", 'String'>
    readonly type: FieldRef<"Filter", 'String'>
    readonly parameters: FieldRef<"Filter", 'Json'>
    readonly createdAt: FieldRef<"Filter", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Filter findUnique
   */
  export type FilterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelect<ExtArgs> | null
    /**
     * Filter, which Filter to fetch.
     */
    where: FilterWhereUniqueInput
  }

  /**
   * Filter findUniqueOrThrow
   */
  export type FilterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelect<ExtArgs> | null
    /**
     * Filter, which Filter to fetch.
     */
    where: FilterWhereUniqueInput
  }

  /**
   * Filter findFirst
   */
  export type FilterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelect<ExtArgs> | null
    /**
     * Filter, which Filter to fetch.
     */
    where?: FilterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Filters to fetch.
     */
    orderBy?: FilterOrderByWithRelationInput | FilterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Filters.
     */
    cursor?: FilterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Filters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Filters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Filters.
     */
    distinct?: FilterScalarFieldEnum | FilterScalarFieldEnum[]
  }

  /**
   * Filter findFirstOrThrow
   */
  export type FilterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelect<ExtArgs> | null
    /**
     * Filter, which Filter to fetch.
     */
    where?: FilterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Filters to fetch.
     */
    orderBy?: FilterOrderByWithRelationInput | FilterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Filters.
     */
    cursor?: FilterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Filters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Filters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Filters.
     */
    distinct?: FilterScalarFieldEnum | FilterScalarFieldEnum[]
  }

  /**
   * Filter findMany
   */
  export type FilterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelect<ExtArgs> | null
    /**
     * Filter, which Filters to fetch.
     */
    where?: FilterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Filters to fetch.
     */
    orderBy?: FilterOrderByWithRelationInput | FilterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Filters.
     */
    cursor?: FilterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Filters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Filters.
     */
    skip?: number
    distinct?: FilterScalarFieldEnum | FilterScalarFieldEnum[]
  }

  /**
   * Filter create
   */
  export type FilterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelect<ExtArgs> | null
    /**
     * The data needed to create a Filter.
     */
    data: XOR<FilterCreateInput, FilterUncheckedCreateInput>
  }

  /**
   * Filter createMany
   */
  export type FilterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Filters.
     */
    data: FilterCreateManyInput | FilterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Filter update
   */
  export type FilterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelect<ExtArgs> | null
    /**
     * The data needed to update a Filter.
     */
    data: XOR<FilterUpdateInput, FilterUncheckedUpdateInput>
    /**
     * Choose, which Filter to update.
     */
    where: FilterWhereUniqueInput
  }

  /**
   * Filter updateMany
   */
  export type FilterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Filters.
     */
    data: XOR<FilterUpdateManyMutationInput, FilterUncheckedUpdateManyInput>
    /**
     * Filter which Filters to update
     */
    where?: FilterWhereInput
  }

  /**
   * Filter upsert
   */
  export type FilterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelect<ExtArgs> | null
    /**
     * The filter to search for the Filter to update in case it exists.
     */
    where: FilterWhereUniqueInput
    /**
     * In case the Filter found by the `where` argument doesn't exist, create a new Filter with this data.
     */
    create: XOR<FilterCreateInput, FilterUncheckedCreateInput>
    /**
     * In case the Filter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FilterUpdateInput, FilterUncheckedUpdateInput>
  }

  /**
   * Filter delete
   */
  export type FilterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelect<ExtArgs> | null
    /**
     * Filter which Filter to delete.
     */
    where: FilterWhereUniqueInput
  }

  /**
   * Filter deleteMany
   */
  export type FilterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Filters to delete
     */
    where?: FilterWhereInput
  }

  /**
   * Filter without action
   */
  export type FilterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Filter
     */
    select?: FilterSelect<ExtArgs> | null
  }


  /**
   * Model Spectra
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
    variety: number | null
  }

  export type SpectraSumAggregateOutputType = {
    id: number | null
    variety: number | null
  }

  export type SpectraMinAggregateOutputType = {
    id: number | null
    name: string | null
    variety: number | null
    datetime: Date | null
    local: string | null
    filter: string | null
    graph: string | null
    createdAt: Date | null
  }

  export type SpectraMaxAggregateOutputType = {
    id: number | null
    name: string | null
    variety: number | null
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
    variety?: true
  }

  export type SpectraSumAggregateInputType = {
    id?: true
    variety?: true
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
     * Filter which Spectra to aggregate.
     */
    where?: SpectraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spectras to fetch.
     */
    orderBy?: SpectraOrderByWithRelationInput | SpectraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SpectraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spectras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spectras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Spectras
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




  export type SpectraGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpectraWhereInput
    orderBy?: SpectraOrderByWithAggregationInput | SpectraOrderByWithAggregationInput[]
    by: SpectraScalarFieldEnum[] | SpectraScalarFieldEnum
    having?: SpectraScalarWhereWithAggregatesInput
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
    variety: number
    datetime: Date
    local: string
    filter: string
    graph: string
    createdAt: Date
    _count: SpectraCountAggregateOutputType | null
    _avg: SpectraAvgAggregateOutputType | null
    _sum: SpectraSumAggregateOutputType | null
    _min: SpectraMinAggregateOutputType | null
    _max: SpectraMaxAggregateOutputType | null
  }

  type GetSpectraGroupByPayload<T extends SpectraGroupByArgs> = Prisma.PrismaPromise<
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


  export type SpectraSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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


  export type SpectraSelectScalar = {
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


  export type $SpectraPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Spectra"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      content: Prisma.JsonValue
      variety: number
      datetime: Date
      local: string
      filter: string
      graph: string
      createdAt: Date
    }, ExtArgs["result"]["spectra"]>
    composites: {}
  }

  type SpectraGetPayload<S extends boolean | null | undefined | SpectraDefaultArgs> = $Result.GetResult<Prisma.$SpectraPayload, S>

  type SpectraCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SpectraFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SpectraCountAggregateInputType | true
    }

  export interface SpectraDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Spectra'], meta: { name: 'Spectra' } }
    /**
     * Find zero or one Spectra that matches the filter.
     * @param {SpectraFindUniqueArgs} args - Arguments to find a Spectra
     * @example
     * // Get one Spectra
     * const spectra = await prisma.spectra.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SpectraFindUniqueArgs>(args: SelectSubset<T, SpectraFindUniqueArgs<ExtArgs>>): Prisma__SpectraClient<$Result.GetResult<Prisma.$SpectraPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Spectra that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SpectraFindUniqueOrThrowArgs} args - Arguments to find a Spectra
     * @example
     * // Get one Spectra
     * const spectra = await prisma.spectra.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SpectraFindUniqueOrThrowArgs>(args: SelectSubset<T, SpectraFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SpectraClient<$Result.GetResult<Prisma.$SpectraPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Spectra that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpectraFindFirstArgs} args - Arguments to find a Spectra
     * @example
     * // Get one Spectra
     * const spectra = await prisma.spectra.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SpectraFindFirstArgs>(args?: SelectSubset<T, SpectraFindFirstArgs<ExtArgs>>): Prisma__SpectraClient<$Result.GetResult<Prisma.$SpectraPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Spectra that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpectraFindFirstOrThrowArgs} args - Arguments to find a Spectra
     * @example
     * // Get one Spectra
     * const spectra = await prisma.spectra.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SpectraFindFirstOrThrowArgs>(args?: SelectSubset<T, SpectraFindFirstOrThrowArgs<ExtArgs>>): Prisma__SpectraClient<$Result.GetResult<Prisma.$SpectraPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Spectras that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpectraFindManyArgs} args - Arguments to filter and select certain fields only.
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
    findMany<T extends SpectraFindManyArgs>(args?: SelectSubset<T, SpectraFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpectraPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Spectra.
     * @param {SpectraCreateArgs} args - Arguments to create a Spectra.
     * @example
     * // Create one Spectra
     * const Spectra = await prisma.spectra.create({
     *   data: {
     *     // ... data to create a Spectra
     *   }
     * })
     * 
     */
    create<T extends SpectraCreateArgs>(args: SelectSubset<T, SpectraCreateArgs<ExtArgs>>): Prisma__SpectraClient<$Result.GetResult<Prisma.$SpectraPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Spectras.
     * @param {SpectraCreateManyArgs} args - Arguments to create many Spectras.
     * @example
     * // Create many Spectras
     * const spectra = await prisma.spectra.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SpectraCreateManyArgs>(args?: SelectSubset<T, SpectraCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Spectra.
     * @param {SpectraDeleteArgs} args - Arguments to delete one Spectra.
     * @example
     * // Delete one Spectra
     * const Spectra = await prisma.spectra.delete({
     *   where: {
     *     // ... filter to delete one Spectra
     *   }
     * })
     * 
     */
    delete<T extends SpectraDeleteArgs>(args: SelectSubset<T, SpectraDeleteArgs<ExtArgs>>): Prisma__SpectraClient<$Result.GetResult<Prisma.$SpectraPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Spectra.
     * @param {SpectraUpdateArgs} args - Arguments to update one Spectra.
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
    update<T extends SpectraUpdateArgs>(args: SelectSubset<T, SpectraUpdateArgs<ExtArgs>>): Prisma__SpectraClient<$Result.GetResult<Prisma.$SpectraPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Spectras.
     * @param {SpectraDeleteManyArgs} args - Arguments to filter Spectras to delete.
     * @example
     * // Delete a few Spectras
     * const { count } = await prisma.spectra.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SpectraDeleteManyArgs>(args?: SelectSubset<T, SpectraDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spectras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpectraUpdateManyArgs} args - Arguments to update one or more rows.
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
    updateMany<T extends SpectraUpdateManyArgs>(args: SelectSubset<T, SpectraUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Spectra.
     * @param {SpectraUpsertArgs} args - Arguments to update or create a Spectra.
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
    upsert<T extends SpectraUpsertArgs>(args: SelectSubset<T, SpectraUpsertArgs<ExtArgs>>): Prisma__SpectraClient<$Result.GetResult<Prisma.$SpectraPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Spectras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpectraCountArgs} args - Arguments to filter Spectras to count.
     * @example
     * // Count the number of Spectras
     * const count = await prisma.spectra.count({
     *   where: {
     *     // ... the filter for the Spectras we want to count
     *   }
     * })
    **/
    count<T extends SpectraCountArgs>(
      args?: Subset<T, SpectraCountArgs>,
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
     * @param {SpectraGroupByArgs} args - Group by arguments.
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
      T extends SpectraGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SpectraGroupByArgs['orderBy'] }
        : { orderBy?: SpectraGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SpectraGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpectraGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Spectra model
   */
  readonly fields: SpectraFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Spectra.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SpectraClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Spectra model
   */ 
  interface SpectraFieldRefs {
    readonly id: FieldRef<"Spectra", 'Int'>
    readonly name: FieldRef<"Spectra", 'String'>
    readonly content: FieldRef<"Spectra", 'Json'>
    readonly variety: FieldRef<"Spectra", 'Int'>
    readonly datetime: FieldRef<"Spectra", 'DateTime'>
    readonly local: FieldRef<"Spectra", 'String'>
    readonly filter: FieldRef<"Spectra", 'String'>
    readonly graph: FieldRef<"Spectra", 'String'>
    readonly createdAt: FieldRef<"Spectra", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Spectra findUnique
   */
  export type SpectraFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spectra
     */
    select?: SpectraSelect<ExtArgs> | null
    /**
     * Filter, which Spectra to fetch.
     */
    where: SpectraWhereUniqueInput
  }

  /**
   * Spectra findUniqueOrThrow
   */
  export type SpectraFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spectra
     */
    select?: SpectraSelect<ExtArgs> | null
    /**
     * Filter, which Spectra to fetch.
     */
    where: SpectraWhereUniqueInput
  }

  /**
   * Spectra findFirst
   */
  export type SpectraFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spectra
     */
    select?: SpectraSelect<ExtArgs> | null
    /**
     * Filter, which Spectra to fetch.
     */
    where?: SpectraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spectras to fetch.
     */
    orderBy?: SpectraOrderByWithRelationInput | SpectraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Spectras.
     */
    cursor?: SpectraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spectras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spectras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Spectras.
     */
    distinct?: SpectraScalarFieldEnum | SpectraScalarFieldEnum[]
  }

  /**
   * Spectra findFirstOrThrow
   */
  export type SpectraFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spectra
     */
    select?: SpectraSelect<ExtArgs> | null
    /**
     * Filter, which Spectra to fetch.
     */
    where?: SpectraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spectras to fetch.
     */
    orderBy?: SpectraOrderByWithRelationInput | SpectraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Spectras.
     */
    cursor?: SpectraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spectras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spectras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Spectras.
     */
    distinct?: SpectraScalarFieldEnum | SpectraScalarFieldEnum[]
  }

  /**
   * Spectra findMany
   */
  export type SpectraFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spectra
     */
    select?: SpectraSelect<ExtArgs> | null
    /**
     * Filter, which Spectras to fetch.
     */
    where?: SpectraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spectras to fetch.
     */
    orderBy?: SpectraOrderByWithRelationInput | SpectraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Spectras.
     */
    cursor?: SpectraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spectras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spectras.
     */
    skip?: number
    distinct?: SpectraScalarFieldEnum | SpectraScalarFieldEnum[]
  }

  /**
   * Spectra create
   */
  export type SpectraCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spectra
     */
    select?: SpectraSelect<ExtArgs> | null
    /**
     * The data needed to create a Spectra.
     */
    data: XOR<SpectraCreateInput, SpectraUncheckedCreateInput>
  }

  /**
   * Spectra createMany
   */
  export type SpectraCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Spectras.
     */
    data: SpectraCreateManyInput | SpectraCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Spectra update
   */
  export type SpectraUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spectra
     */
    select?: SpectraSelect<ExtArgs> | null
    /**
     * The data needed to update a Spectra.
     */
    data: XOR<SpectraUpdateInput, SpectraUncheckedUpdateInput>
    /**
     * Choose, which Spectra to update.
     */
    where: SpectraWhereUniqueInput
  }

  /**
   * Spectra updateMany
   */
  export type SpectraUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Spectras.
     */
    data: XOR<SpectraUpdateManyMutationInput, SpectraUncheckedUpdateManyInput>
    /**
     * Filter which Spectras to update
     */
    where?: SpectraWhereInput
  }

  /**
   * Spectra upsert
   */
  export type SpectraUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spectra
     */
    select?: SpectraSelect<ExtArgs> | null
    /**
     * The filter to search for the Spectra to update in case it exists.
     */
    where: SpectraWhereUniqueInput
    /**
     * In case the Spectra found by the `where` argument doesn't exist, create a new Spectra with this data.
     */
    create: XOR<SpectraCreateInput, SpectraUncheckedCreateInput>
    /**
     * In case the Spectra was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SpectraUpdateInput, SpectraUncheckedUpdateInput>
  }

  /**
   * Spectra delete
   */
  export type SpectraDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spectra
     */
    select?: SpectraSelect<ExtArgs> | null
    /**
     * Filter which Spectra to delete.
     */
    where: SpectraWhereUniqueInput
  }

  /**
   * Spectra deleteMany
   */
  export type SpectraDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Spectras to delete
     */
    where?: SpectraWhereInput
  }

  /**
   * Spectra without action
   */
  export type SpectraDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spectra
     */
    select?: SpectraSelect<ExtArgs> | null
  }


  /**
   * Model PredictiveModel
   */

  export type AggregatePredictiveModel = {
    _count: PredictiveModelCountAggregateOutputType | null
    _avg: PredictiveModelAvgAggregateOutputType | null
    _sum: PredictiveModelSumAggregateOutputType | null
    _min: PredictiveModelMinAggregateOutputType | null
    _max: PredictiveModelMaxAggregateOutputType | null
  }

  export type PredictiveModelAvgAggregateOutputType = {
    id: number | null
  }

  export type PredictiveModelSumAggregateOutputType = {
    id: number | null
  }

  export type PredictiveModelMinAggregateOutputType = {
    id: number | null
    model_name: string | null
    variety: string | null
    attribute: string | null
    model: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PredictiveModelMaxAggregateOutputType = {
    id: number | null
    model_name: string | null
    variety: string | null
    attribute: string | null
    model: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PredictiveModelCountAggregateOutputType = {
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


  export type PredictiveModelAvgAggregateInputType = {
    id?: true
  }

  export type PredictiveModelSumAggregateInputType = {
    id?: true
  }

  export type PredictiveModelMinAggregateInputType = {
    id?: true
    model_name?: true
    variety?: true
    attribute?: true
    model?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PredictiveModelMaxAggregateInputType = {
    id?: true
    model_name?: true
    variety?: true
    attribute?: true
    model?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PredictiveModelCountAggregateInputType = {
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

  export type PredictiveModelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PredictiveModel to aggregate.
     */
    where?: PredictiveModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PredictiveModels to fetch.
     */
    orderBy?: PredictiveModelOrderByWithRelationInput | PredictiveModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PredictiveModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PredictiveModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PredictiveModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PredictiveModels
    **/
    _count?: true | PredictiveModelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PredictiveModelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PredictiveModelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PredictiveModelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PredictiveModelMaxAggregateInputType
  }

  export type GetPredictiveModelAggregateType<T extends PredictiveModelAggregateArgs> = {
        [P in keyof T & keyof AggregatePredictiveModel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePredictiveModel[P]>
      : GetScalarType<T[P], AggregatePredictiveModel[P]>
  }




  export type PredictiveModelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PredictiveModelWhereInput
    orderBy?: PredictiveModelOrderByWithAggregationInput | PredictiveModelOrderByWithAggregationInput[]
    by: PredictiveModelScalarFieldEnum[] | PredictiveModelScalarFieldEnum
    having?: PredictiveModelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PredictiveModelCountAggregateInputType | true
    _avg?: PredictiveModelAvgAggregateInputType
    _sum?: PredictiveModelSumAggregateInputType
    _min?: PredictiveModelMinAggregateInputType
    _max?: PredictiveModelMaxAggregateInputType
  }

  export type PredictiveModelGroupByOutputType = {
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
    _count: PredictiveModelCountAggregateOutputType | null
    _avg: PredictiveModelAvgAggregateOutputType | null
    _sum: PredictiveModelSumAggregateOutputType | null
    _min: PredictiveModelMinAggregateOutputType | null
    _max: PredictiveModelMaxAggregateOutputType | null
  }

  type GetPredictiveModelGroupByPayload<T extends PredictiveModelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PredictiveModelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PredictiveModelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PredictiveModelGroupByOutputType[P]>
            : GetScalarType<T[P], PredictiveModelGroupByOutputType[P]>
        }
      >
    >


  export type PredictiveModelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
  }, ExtArgs["result"]["predictiveModel"]>


  export type PredictiveModelSelectScalar = {
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


  export type $PredictiveModelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PredictiveModel"
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
    }, ExtArgs["result"]["predictiveModel"]>
    composites: {}
  }

  type PredictiveModelGetPayload<S extends boolean | null | undefined | PredictiveModelDefaultArgs> = $Result.GetResult<Prisma.$PredictiveModelPayload, S>

  type PredictiveModelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PredictiveModelFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PredictiveModelCountAggregateInputType | true
    }

  export interface PredictiveModelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PredictiveModel'], meta: { name: 'PredictiveModel' } }
    /**
     * Find zero or one PredictiveModel that matches the filter.
     * @param {PredictiveModelFindUniqueArgs} args - Arguments to find a PredictiveModel
     * @example
     * // Get one PredictiveModel
     * const predictiveModel = await prisma.predictiveModel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PredictiveModelFindUniqueArgs>(args: SelectSubset<T, PredictiveModelFindUniqueArgs<ExtArgs>>): Prisma__PredictiveModelClient<$Result.GetResult<Prisma.$PredictiveModelPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PredictiveModel that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PredictiveModelFindUniqueOrThrowArgs} args - Arguments to find a PredictiveModel
     * @example
     * // Get one PredictiveModel
     * const predictiveModel = await prisma.predictiveModel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PredictiveModelFindUniqueOrThrowArgs>(args: SelectSubset<T, PredictiveModelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PredictiveModelClient<$Result.GetResult<Prisma.$PredictiveModelPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PredictiveModel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictiveModelFindFirstArgs} args - Arguments to find a PredictiveModel
     * @example
     * // Get one PredictiveModel
     * const predictiveModel = await prisma.predictiveModel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PredictiveModelFindFirstArgs>(args?: SelectSubset<T, PredictiveModelFindFirstArgs<ExtArgs>>): Prisma__PredictiveModelClient<$Result.GetResult<Prisma.$PredictiveModelPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PredictiveModel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictiveModelFindFirstOrThrowArgs} args - Arguments to find a PredictiveModel
     * @example
     * // Get one PredictiveModel
     * const predictiveModel = await prisma.predictiveModel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PredictiveModelFindFirstOrThrowArgs>(args?: SelectSubset<T, PredictiveModelFindFirstOrThrowArgs<ExtArgs>>): Prisma__PredictiveModelClient<$Result.GetResult<Prisma.$PredictiveModelPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PredictiveModels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictiveModelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PredictiveModels
     * const predictiveModels = await prisma.predictiveModel.findMany()
     * 
     * // Get first 10 PredictiveModels
     * const predictiveModels = await prisma.predictiveModel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const predictiveModelWithIdOnly = await prisma.predictiveModel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PredictiveModelFindManyArgs>(args?: SelectSubset<T, PredictiveModelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PredictiveModelPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PredictiveModel.
     * @param {PredictiveModelCreateArgs} args - Arguments to create a PredictiveModel.
     * @example
     * // Create one PredictiveModel
     * const PredictiveModel = await prisma.predictiveModel.create({
     *   data: {
     *     // ... data to create a PredictiveModel
     *   }
     * })
     * 
     */
    create<T extends PredictiveModelCreateArgs>(args: SelectSubset<T, PredictiveModelCreateArgs<ExtArgs>>): Prisma__PredictiveModelClient<$Result.GetResult<Prisma.$PredictiveModelPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PredictiveModels.
     * @param {PredictiveModelCreateManyArgs} args - Arguments to create many PredictiveModels.
     * @example
     * // Create many PredictiveModels
     * const predictiveModel = await prisma.predictiveModel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PredictiveModelCreateManyArgs>(args?: SelectSubset<T, PredictiveModelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PredictiveModel.
     * @param {PredictiveModelDeleteArgs} args - Arguments to delete one PredictiveModel.
     * @example
     * // Delete one PredictiveModel
     * const PredictiveModel = await prisma.predictiveModel.delete({
     *   where: {
     *     // ... filter to delete one PredictiveModel
     *   }
     * })
     * 
     */
    delete<T extends PredictiveModelDeleteArgs>(args: SelectSubset<T, PredictiveModelDeleteArgs<ExtArgs>>): Prisma__PredictiveModelClient<$Result.GetResult<Prisma.$PredictiveModelPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PredictiveModel.
     * @param {PredictiveModelUpdateArgs} args - Arguments to update one PredictiveModel.
     * @example
     * // Update one PredictiveModel
     * const predictiveModel = await prisma.predictiveModel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PredictiveModelUpdateArgs>(args: SelectSubset<T, PredictiveModelUpdateArgs<ExtArgs>>): Prisma__PredictiveModelClient<$Result.GetResult<Prisma.$PredictiveModelPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PredictiveModels.
     * @param {PredictiveModelDeleteManyArgs} args - Arguments to filter PredictiveModels to delete.
     * @example
     * // Delete a few PredictiveModels
     * const { count } = await prisma.predictiveModel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PredictiveModelDeleteManyArgs>(args?: SelectSubset<T, PredictiveModelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PredictiveModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictiveModelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PredictiveModels
     * const predictiveModel = await prisma.predictiveModel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PredictiveModelUpdateManyArgs>(args: SelectSubset<T, PredictiveModelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PredictiveModel.
     * @param {PredictiveModelUpsertArgs} args - Arguments to update or create a PredictiveModel.
     * @example
     * // Update or create a PredictiveModel
     * const predictiveModel = await prisma.predictiveModel.upsert({
     *   create: {
     *     // ... data to create a PredictiveModel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PredictiveModel we want to update
     *   }
     * })
     */
    upsert<T extends PredictiveModelUpsertArgs>(args: SelectSubset<T, PredictiveModelUpsertArgs<ExtArgs>>): Prisma__PredictiveModelClient<$Result.GetResult<Prisma.$PredictiveModelPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PredictiveModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictiveModelCountArgs} args - Arguments to filter PredictiveModels to count.
     * @example
     * // Count the number of PredictiveModels
     * const count = await prisma.predictiveModel.count({
     *   where: {
     *     // ... the filter for the PredictiveModels we want to count
     *   }
     * })
    **/
    count<T extends PredictiveModelCountArgs>(
      args?: Subset<T, PredictiveModelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PredictiveModelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PredictiveModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictiveModelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PredictiveModelAggregateArgs>(args: Subset<T, PredictiveModelAggregateArgs>): Prisma.PrismaPromise<GetPredictiveModelAggregateType<T>>

    /**
     * Group by PredictiveModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictiveModelGroupByArgs} args - Group by arguments.
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
      T extends PredictiveModelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PredictiveModelGroupByArgs['orderBy'] }
        : { orderBy?: PredictiveModelGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PredictiveModelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPredictiveModelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PredictiveModel model
   */
  readonly fields: PredictiveModelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PredictiveModel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PredictiveModelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the PredictiveModel model
   */ 
  interface PredictiveModelFieldRefs {
    readonly id: FieldRef<"PredictiveModel", 'Int'>
    readonly model_name: FieldRef<"PredictiveModel", 'String'>
    readonly variety: FieldRef<"PredictiveModel", 'String'>
    readonly attribute: FieldRef<"PredictiveModel", 'String'>
    readonly hyperparameters: FieldRef<"PredictiveModel", 'Json'>
    readonly metrics: FieldRef<"PredictiveModel", 'Json'>
    readonly model: FieldRef<"PredictiveModel", 'String'>
    readonly graph: FieldRef<"PredictiveModel", 'Json'>
    readonly createdAt: FieldRef<"PredictiveModel", 'DateTime'>
    readonly updatedAt: FieldRef<"PredictiveModel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PredictiveModel findUnique
   */
  export type PredictiveModelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictiveModel
     */
    select?: PredictiveModelSelect<ExtArgs> | null
    /**
     * Filter, which PredictiveModel to fetch.
     */
    where: PredictiveModelWhereUniqueInput
  }

  /**
   * PredictiveModel findUniqueOrThrow
   */
  export type PredictiveModelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictiveModel
     */
    select?: PredictiveModelSelect<ExtArgs> | null
    /**
     * Filter, which PredictiveModel to fetch.
     */
    where: PredictiveModelWhereUniqueInput
  }

  /**
   * PredictiveModel findFirst
   */
  export type PredictiveModelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictiveModel
     */
    select?: PredictiveModelSelect<ExtArgs> | null
    /**
     * Filter, which PredictiveModel to fetch.
     */
    where?: PredictiveModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PredictiveModels to fetch.
     */
    orderBy?: PredictiveModelOrderByWithRelationInput | PredictiveModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PredictiveModels.
     */
    cursor?: PredictiveModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PredictiveModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PredictiveModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PredictiveModels.
     */
    distinct?: PredictiveModelScalarFieldEnum | PredictiveModelScalarFieldEnum[]
  }

  /**
   * PredictiveModel findFirstOrThrow
   */
  export type PredictiveModelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictiveModel
     */
    select?: PredictiveModelSelect<ExtArgs> | null
    /**
     * Filter, which PredictiveModel to fetch.
     */
    where?: PredictiveModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PredictiveModels to fetch.
     */
    orderBy?: PredictiveModelOrderByWithRelationInput | PredictiveModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PredictiveModels.
     */
    cursor?: PredictiveModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PredictiveModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PredictiveModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PredictiveModels.
     */
    distinct?: PredictiveModelScalarFieldEnum | PredictiveModelScalarFieldEnum[]
  }

  /**
   * PredictiveModel findMany
   */
  export type PredictiveModelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictiveModel
     */
    select?: PredictiveModelSelect<ExtArgs> | null
    /**
     * Filter, which PredictiveModels to fetch.
     */
    where?: PredictiveModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PredictiveModels to fetch.
     */
    orderBy?: PredictiveModelOrderByWithRelationInput | PredictiveModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PredictiveModels.
     */
    cursor?: PredictiveModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PredictiveModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PredictiveModels.
     */
    skip?: number
    distinct?: PredictiveModelScalarFieldEnum | PredictiveModelScalarFieldEnum[]
  }

  /**
   * PredictiveModel create
   */
  export type PredictiveModelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictiveModel
     */
    select?: PredictiveModelSelect<ExtArgs> | null
    /**
     * The data needed to create a PredictiveModel.
     */
    data: XOR<PredictiveModelCreateInput, PredictiveModelUncheckedCreateInput>
  }

  /**
   * PredictiveModel createMany
   */
  export type PredictiveModelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PredictiveModels.
     */
    data: PredictiveModelCreateManyInput | PredictiveModelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PredictiveModel update
   */
  export type PredictiveModelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictiveModel
     */
    select?: PredictiveModelSelect<ExtArgs> | null
    /**
     * The data needed to update a PredictiveModel.
     */
    data: XOR<PredictiveModelUpdateInput, PredictiveModelUncheckedUpdateInput>
    /**
     * Choose, which PredictiveModel to update.
     */
    where: PredictiveModelWhereUniqueInput
  }

  /**
   * PredictiveModel updateMany
   */
  export type PredictiveModelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PredictiveModels.
     */
    data: XOR<PredictiveModelUpdateManyMutationInput, PredictiveModelUncheckedUpdateManyInput>
    /**
     * Filter which PredictiveModels to update
     */
    where?: PredictiveModelWhereInput
  }

  /**
   * PredictiveModel upsert
   */
  export type PredictiveModelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictiveModel
     */
    select?: PredictiveModelSelect<ExtArgs> | null
    /**
     * The filter to search for the PredictiveModel to update in case it exists.
     */
    where: PredictiveModelWhereUniqueInput
    /**
     * In case the PredictiveModel found by the `where` argument doesn't exist, create a new PredictiveModel with this data.
     */
    create: XOR<PredictiveModelCreateInput, PredictiveModelUncheckedCreateInput>
    /**
     * In case the PredictiveModel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PredictiveModelUpdateInput, PredictiveModelUncheckedUpdateInput>
  }

  /**
   * PredictiveModel delete
   */
  export type PredictiveModelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictiveModel
     */
    select?: PredictiveModelSelect<ExtArgs> | null
    /**
     * Filter which PredictiveModel to delete.
     */
    where: PredictiveModelWhereUniqueInput
  }

  /**
   * PredictiveModel deleteMany
   */
  export type PredictiveModelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PredictiveModels to delete
     */
    where?: PredictiveModelWhereInput
  }

  /**
   * PredictiveModel without action
   */
  export type PredictiveModelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PredictiveModel
     */
    select?: PredictiveModelSelect<ExtArgs> | null
  }


  /**
   * Model SpectrumData
   */

  export type AggregateSpectrumData = {
    _count: SpectrumDataCountAggregateOutputType | null
    _avg: SpectrumDataAvgAggregateOutputType | null
    _sum: SpectrumDataSumAggregateOutputType | null
    _min: SpectrumDataMinAggregateOutputType | null
    _max: SpectrumDataMaxAggregateOutputType | null
  }

  export type SpectrumDataAvgAggregateOutputType = {
    id: number | null
  }

  export type SpectrumDataSumAggregateOutputType = {
    id: number | null
  }

  export type SpectrumDataMinAggregateOutputType = {
    id: number | null
    dataset: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SpectrumDataMaxAggregateOutputType = {
    id: number | null
    dataset: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SpectrumDataCountAggregateOutputType = {
    id: number
    dataset: number
    wavelengths: number
    X: number
    createdAt: number
    updatedAt: number
    image: number
    _all: number
  }


  export type SpectrumDataAvgAggregateInputType = {
    id?: true
  }

  export type SpectrumDataSumAggregateInputType = {
    id?: true
  }

  export type SpectrumDataMinAggregateInputType = {
    id?: true
    dataset?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SpectrumDataMaxAggregateInputType = {
    id?: true
    dataset?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SpectrumDataCountAggregateInputType = {
    id?: true
    dataset?: true
    wavelengths?: true
    X?: true
    createdAt?: true
    updatedAt?: true
    image?: true
    _all?: true
  }

  export type SpectrumDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SpectrumData to aggregate.
     */
    where?: SpectrumDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpectrumData to fetch.
     */
    orderBy?: SpectrumDataOrderByWithRelationInput | SpectrumDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SpectrumDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpectrumData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpectrumData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SpectrumData
    **/
    _count?: true | SpectrumDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SpectrumDataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SpectrumDataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpectrumDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpectrumDataMaxAggregateInputType
  }

  export type GetSpectrumDataAggregateType<T extends SpectrumDataAggregateArgs> = {
        [P in keyof T & keyof AggregateSpectrumData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpectrumData[P]>
      : GetScalarType<T[P], AggregateSpectrumData[P]>
  }




  export type SpectrumDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpectrumDataWhereInput
    orderBy?: SpectrumDataOrderByWithAggregationInput | SpectrumDataOrderByWithAggregationInput[]
    by: SpectrumDataScalarFieldEnum[] | SpectrumDataScalarFieldEnum
    having?: SpectrumDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpectrumDataCountAggregateInputType | true
    _avg?: SpectrumDataAvgAggregateInputType
    _sum?: SpectrumDataSumAggregateInputType
    _min?: SpectrumDataMinAggregateInputType
    _max?: SpectrumDataMaxAggregateInputType
  }

  export type SpectrumDataGroupByOutputType = {
    id: number
    dataset: string
    wavelengths: JsonValue
    X: JsonValue
    createdAt: Date
    updatedAt: Date
    image: JsonValue
    _count: SpectrumDataCountAggregateOutputType | null
    _avg: SpectrumDataAvgAggregateOutputType | null
    _sum: SpectrumDataSumAggregateOutputType | null
    _min: SpectrumDataMinAggregateOutputType | null
    _max: SpectrumDataMaxAggregateOutputType | null
  }

  type GetSpectrumDataGroupByPayload<T extends SpectrumDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpectrumDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpectrumDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpectrumDataGroupByOutputType[P]>
            : GetScalarType<T[P], SpectrumDataGroupByOutputType[P]>
        }
      >
    >


  export type SpectrumDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dataset?: boolean
    wavelengths?: boolean
    X?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    image?: boolean
  }, ExtArgs["result"]["spectrumData"]>


  export type SpectrumDataSelectScalar = {
    id?: boolean
    dataset?: boolean
    wavelengths?: boolean
    X?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    image?: boolean
  }


  export type $SpectrumDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SpectrumData"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      dataset: string
      wavelengths: Prisma.JsonValue
      X: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
      image: Prisma.JsonValue
    }, ExtArgs["result"]["spectrumData"]>
    composites: {}
  }

  type SpectrumDataGetPayload<S extends boolean | null | undefined | SpectrumDataDefaultArgs> = $Result.GetResult<Prisma.$SpectrumDataPayload, S>

  type SpectrumDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SpectrumDataFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SpectrumDataCountAggregateInputType | true
    }

  export interface SpectrumDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SpectrumData'], meta: { name: 'SpectrumData' } }
    /**
     * Find zero or one SpectrumData that matches the filter.
     * @param {SpectrumDataFindUniqueArgs} args - Arguments to find a SpectrumData
     * @example
     * // Get one SpectrumData
     * const spectrumData = await prisma.spectrumData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SpectrumDataFindUniqueArgs>(args: SelectSubset<T, SpectrumDataFindUniqueArgs<ExtArgs>>): Prisma__SpectrumDataClient<$Result.GetResult<Prisma.$SpectrumDataPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SpectrumData that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SpectrumDataFindUniqueOrThrowArgs} args - Arguments to find a SpectrumData
     * @example
     * // Get one SpectrumData
     * const spectrumData = await prisma.spectrumData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SpectrumDataFindUniqueOrThrowArgs>(args: SelectSubset<T, SpectrumDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SpectrumDataClient<$Result.GetResult<Prisma.$SpectrumDataPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SpectrumData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpectrumDataFindFirstArgs} args - Arguments to find a SpectrumData
     * @example
     * // Get one SpectrumData
     * const spectrumData = await prisma.spectrumData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SpectrumDataFindFirstArgs>(args?: SelectSubset<T, SpectrumDataFindFirstArgs<ExtArgs>>): Prisma__SpectrumDataClient<$Result.GetResult<Prisma.$SpectrumDataPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SpectrumData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpectrumDataFindFirstOrThrowArgs} args - Arguments to find a SpectrumData
     * @example
     * // Get one SpectrumData
     * const spectrumData = await prisma.spectrumData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SpectrumDataFindFirstOrThrowArgs>(args?: SelectSubset<T, SpectrumDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__SpectrumDataClient<$Result.GetResult<Prisma.$SpectrumDataPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SpectrumData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpectrumDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SpectrumData
     * const spectrumData = await prisma.spectrumData.findMany()
     * 
     * // Get first 10 SpectrumData
     * const spectrumData = await prisma.spectrumData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const spectrumDataWithIdOnly = await prisma.spectrumData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SpectrumDataFindManyArgs>(args?: SelectSubset<T, SpectrumDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpectrumDataPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SpectrumData.
     * @param {SpectrumDataCreateArgs} args - Arguments to create a SpectrumData.
     * @example
     * // Create one SpectrumData
     * const SpectrumData = await prisma.spectrumData.create({
     *   data: {
     *     // ... data to create a SpectrumData
     *   }
     * })
     * 
     */
    create<T extends SpectrumDataCreateArgs>(args: SelectSubset<T, SpectrumDataCreateArgs<ExtArgs>>): Prisma__SpectrumDataClient<$Result.GetResult<Prisma.$SpectrumDataPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SpectrumData.
     * @param {SpectrumDataCreateManyArgs} args - Arguments to create many SpectrumData.
     * @example
     * // Create many SpectrumData
     * const spectrumData = await prisma.spectrumData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SpectrumDataCreateManyArgs>(args?: SelectSubset<T, SpectrumDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SpectrumData.
     * @param {SpectrumDataDeleteArgs} args - Arguments to delete one SpectrumData.
     * @example
     * // Delete one SpectrumData
     * const SpectrumData = await prisma.spectrumData.delete({
     *   where: {
     *     // ... filter to delete one SpectrumData
     *   }
     * })
     * 
     */
    delete<T extends SpectrumDataDeleteArgs>(args: SelectSubset<T, SpectrumDataDeleteArgs<ExtArgs>>): Prisma__SpectrumDataClient<$Result.GetResult<Prisma.$SpectrumDataPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SpectrumData.
     * @param {SpectrumDataUpdateArgs} args - Arguments to update one SpectrumData.
     * @example
     * // Update one SpectrumData
     * const spectrumData = await prisma.spectrumData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SpectrumDataUpdateArgs>(args: SelectSubset<T, SpectrumDataUpdateArgs<ExtArgs>>): Prisma__SpectrumDataClient<$Result.GetResult<Prisma.$SpectrumDataPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SpectrumData.
     * @param {SpectrumDataDeleteManyArgs} args - Arguments to filter SpectrumData to delete.
     * @example
     * // Delete a few SpectrumData
     * const { count } = await prisma.spectrumData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SpectrumDataDeleteManyArgs>(args?: SelectSubset<T, SpectrumDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SpectrumData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpectrumDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SpectrumData
     * const spectrumData = await prisma.spectrumData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SpectrumDataUpdateManyArgs>(args: SelectSubset<T, SpectrumDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SpectrumData.
     * @param {SpectrumDataUpsertArgs} args - Arguments to update or create a SpectrumData.
     * @example
     * // Update or create a SpectrumData
     * const spectrumData = await prisma.spectrumData.upsert({
     *   create: {
     *     // ... data to create a SpectrumData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SpectrumData we want to update
     *   }
     * })
     */
    upsert<T extends SpectrumDataUpsertArgs>(args: SelectSubset<T, SpectrumDataUpsertArgs<ExtArgs>>): Prisma__SpectrumDataClient<$Result.GetResult<Prisma.$SpectrumDataPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SpectrumData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpectrumDataCountArgs} args - Arguments to filter SpectrumData to count.
     * @example
     * // Count the number of SpectrumData
     * const count = await prisma.spectrumData.count({
     *   where: {
     *     // ... the filter for the SpectrumData we want to count
     *   }
     * })
    **/
    count<T extends SpectrumDataCountArgs>(
      args?: Subset<T, SpectrumDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpectrumDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SpectrumData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpectrumDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SpectrumDataAggregateArgs>(args: Subset<T, SpectrumDataAggregateArgs>): Prisma.PrismaPromise<GetSpectrumDataAggregateType<T>>

    /**
     * Group by SpectrumData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpectrumDataGroupByArgs} args - Group by arguments.
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
      T extends SpectrumDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SpectrumDataGroupByArgs['orderBy'] }
        : { orderBy?: SpectrumDataGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SpectrumDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpectrumDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SpectrumData model
   */
  readonly fields: SpectrumDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SpectrumData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SpectrumDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the SpectrumData model
   */ 
  interface SpectrumDataFieldRefs {
    readonly id: FieldRef<"SpectrumData", 'Int'>
    readonly dataset: FieldRef<"SpectrumData", 'String'>
    readonly wavelengths: FieldRef<"SpectrumData", 'Json'>
    readonly X: FieldRef<"SpectrumData", 'Json'>
    readonly createdAt: FieldRef<"SpectrumData", 'DateTime'>
    readonly updatedAt: FieldRef<"SpectrumData", 'DateTime'>
    readonly image: FieldRef<"SpectrumData", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * SpectrumData findUnique
   */
  export type SpectrumDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpectrumData
     */
    select?: SpectrumDataSelect<ExtArgs> | null
    /**
     * Filter, which SpectrumData to fetch.
     */
    where: SpectrumDataWhereUniqueInput
  }

  /**
   * SpectrumData findUniqueOrThrow
   */
  export type SpectrumDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpectrumData
     */
    select?: SpectrumDataSelect<ExtArgs> | null
    /**
     * Filter, which SpectrumData to fetch.
     */
    where: SpectrumDataWhereUniqueInput
  }

  /**
   * SpectrumData findFirst
   */
  export type SpectrumDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpectrumData
     */
    select?: SpectrumDataSelect<ExtArgs> | null
    /**
     * Filter, which SpectrumData to fetch.
     */
    where?: SpectrumDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpectrumData to fetch.
     */
    orderBy?: SpectrumDataOrderByWithRelationInput | SpectrumDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SpectrumData.
     */
    cursor?: SpectrumDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpectrumData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpectrumData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SpectrumData.
     */
    distinct?: SpectrumDataScalarFieldEnum | SpectrumDataScalarFieldEnum[]
  }

  /**
   * SpectrumData findFirstOrThrow
   */
  export type SpectrumDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpectrumData
     */
    select?: SpectrumDataSelect<ExtArgs> | null
    /**
     * Filter, which SpectrumData to fetch.
     */
    where?: SpectrumDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpectrumData to fetch.
     */
    orderBy?: SpectrumDataOrderByWithRelationInput | SpectrumDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SpectrumData.
     */
    cursor?: SpectrumDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpectrumData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpectrumData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SpectrumData.
     */
    distinct?: SpectrumDataScalarFieldEnum | SpectrumDataScalarFieldEnum[]
  }

  /**
   * SpectrumData findMany
   */
  export type SpectrumDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpectrumData
     */
    select?: SpectrumDataSelect<ExtArgs> | null
    /**
     * Filter, which SpectrumData to fetch.
     */
    where?: SpectrumDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpectrumData to fetch.
     */
    orderBy?: SpectrumDataOrderByWithRelationInput | SpectrumDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SpectrumData.
     */
    cursor?: SpectrumDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpectrumData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpectrumData.
     */
    skip?: number
    distinct?: SpectrumDataScalarFieldEnum | SpectrumDataScalarFieldEnum[]
  }

  /**
   * SpectrumData create
   */
  export type SpectrumDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpectrumData
     */
    select?: SpectrumDataSelect<ExtArgs> | null
    /**
     * The data needed to create a SpectrumData.
     */
    data: XOR<SpectrumDataCreateInput, SpectrumDataUncheckedCreateInput>
  }

  /**
   * SpectrumData createMany
   */
  export type SpectrumDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SpectrumData.
     */
    data: SpectrumDataCreateManyInput | SpectrumDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SpectrumData update
   */
  export type SpectrumDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpectrumData
     */
    select?: SpectrumDataSelect<ExtArgs> | null
    /**
     * The data needed to update a SpectrumData.
     */
    data: XOR<SpectrumDataUpdateInput, SpectrumDataUncheckedUpdateInput>
    /**
     * Choose, which SpectrumData to update.
     */
    where: SpectrumDataWhereUniqueInput
  }

  /**
   * SpectrumData updateMany
   */
  export type SpectrumDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SpectrumData.
     */
    data: XOR<SpectrumDataUpdateManyMutationInput, SpectrumDataUncheckedUpdateManyInput>
    /**
     * Filter which SpectrumData to update
     */
    where?: SpectrumDataWhereInput
  }

  /**
   * SpectrumData upsert
   */
  export type SpectrumDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpectrumData
     */
    select?: SpectrumDataSelect<ExtArgs> | null
    /**
     * The filter to search for the SpectrumData to update in case it exists.
     */
    where: SpectrumDataWhereUniqueInput
    /**
     * In case the SpectrumData found by the `where` argument doesn't exist, create a new SpectrumData with this data.
     */
    create: XOR<SpectrumDataCreateInput, SpectrumDataUncheckedCreateInput>
    /**
     * In case the SpectrumData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SpectrumDataUpdateInput, SpectrumDataUncheckedUpdateInput>
  }

  /**
   * SpectrumData delete
   */
  export type SpectrumDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpectrumData
     */
    select?: SpectrumDataSelect<ExtArgs> | null
    /**
     * Filter which SpectrumData to delete.
     */
    where: SpectrumDataWhereUniqueInput
  }

  /**
   * SpectrumData deleteMany
   */
  export type SpectrumDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SpectrumData to delete
     */
    where?: SpectrumDataWhereInput
  }

  /**
   * SpectrumData without action
   */
  export type SpectrumDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpectrumData
     */
    select?: SpectrumDataSelect<ExtArgs> | null
  }


  /**
   * Model TargetData
   */

  export type AggregateTargetData = {
    _count: TargetDataCountAggregateOutputType | null
    _avg: TargetDataAvgAggregateOutputType | null
    _sum: TargetDataSumAggregateOutputType | null
    _min: TargetDataMinAggregateOutputType | null
    _max: TargetDataMaxAggregateOutputType | null
  }

  export type TargetDataAvgAggregateOutputType = {
    id: number | null
  }

  export type TargetDataSumAggregateOutputType = {
    id: number | null
  }

  export type TargetDataMinAggregateOutputType = {
    id: number | null
    attribute: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TargetDataMaxAggregateOutputType = {
    id: number | null
    attribute: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TargetDataCountAggregateOutputType = {
    id: number
    attribute: number
    y: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TargetDataAvgAggregateInputType = {
    id?: true
  }

  export type TargetDataSumAggregateInputType = {
    id?: true
  }

  export type TargetDataMinAggregateInputType = {
    id?: true
    attribute?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TargetDataMaxAggregateInputType = {
    id?: true
    attribute?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TargetDataCountAggregateInputType = {
    id?: true
    attribute?: true
    y?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TargetDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TargetData to aggregate.
     */
    where?: TargetDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TargetData to fetch.
     */
    orderBy?: TargetDataOrderByWithRelationInput | TargetDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TargetDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TargetData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TargetData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TargetData
    **/
    _count?: true | TargetDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TargetDataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TargetDataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TargetDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TargetDataMaxAggregateInputType
  }

  export type GetTargetDataAggregateType<T extends TargetDataAggregateArgs> = {
        [P in keyof T & keyof AggregateTargetData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTargetData[P]>
      : GetScalarType<T[P], AggregateTargetData[P]>
  }




  export type TargetDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TargetDataWhereInput
    orderBy?: TargetDataOrderByWithAggregationInput | TargetDataOrderByWithAggregationInput[]
    by: TargetDataScalarFieldEnum[] | TargetDataScalarFieldEnum
    having?: TargetDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TargetDataCountAggregateInputType | true
    _avg?: TargetDataAvgAggregateInputType
    _sum?: TargetDataSumAggregateInputType
    _min?: TargetDataMinAggregateInputType
    _max?: TargetDataMaxAggregateInputType
  }

  export type TargetDataGroupByOutputType = {
    id: number
    attribute: string
    y: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: TargetDataCountAggregateOutputType | null
    _avg: TargetDataAvgAggregateOutputType | null
    _sum: TargetDataSumAggregateOutputType | null
    _min: TargetDataMinAggregateOutputType | null
    _max: TargetDataMaxAggregateOutputType | null
  }

  type GetTargetDataGroupByPayload<T extends TargetDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TargetDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TargetDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TargetDataGroupByOutputType[P]>
            : GetScalarType<T[P], TargetDataGroupByOutputType[P]>
        }
      >
    >


  export type TargetDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    attribute?: boolean
    y?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["targetData"]>


  export type TargetDataSelectScalar = {
    id?: boolean
    attribute?: boolean
    y?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $TargetDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TargetData"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      attribute: string
      y: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["targetData"]>
    composites: {}
  }

  type TargetDataGetPayload<S extends boolean | null | undefined | TargetDataDefaultArgs> = $Result.GetResult<Prisma.$TargetDataPayload, S>

  type TargetDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TargetDataFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TargetDataCountAggregateInputType | true
    }

  export interface TargetDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TargetData'], meta: { name: 'TargetData' } }
    /**
     * Find zero or one TargetData that matches the filter.
     * @param {TargetDataFindUniqueArgs} args - Arguments to find a TargetData
     * @example
     * // Get one TargetData
     * const targetData = await prisma.targetData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TargetDataFindUniqueArgs>(args: SelectSubset<T, TargetDataFindUniqueArgs<ExtArgs>>): Prisma__TargetDataClient<$Result.GetResult<Prisma.$TargetDataPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TargetData that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TargetDataFindUniqueOrThrowArgs} args - Arguments to find a TargetData
     * @example
     * // Get one TargetData
     * const targetData = await prisma.targetData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TargetDataFindUniqueOrThrowArgs>(args: SelectSubset<T, TargetDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TargetDataClient<$Result.GetResult<Prisma.$TargetDataPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TargetData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetDataFindFirstArgs} args - Arguments to find a TargetData
     * @example
     * // Get one TargetData
     * const targetData = await prisma.targetData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TargetDataFindFirstArgs>(args?: SelectSubset<T, TargetDataFindFirstArgs<ExtArgs>>): Prisma__TargetDataClient<$Result.GetResult<Prisma.$TargetDataPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TargetData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetDataFindFirstOrThrowArgs} args - Arguments to find a TargetData
     * @example
     * // Get one TargetData
     * const targetData = await prisma.targetData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TargetDataFindFirstOrThrowArgs>(args?: SelectSubset<T, TargetDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__TargetDataClient<$Result.GetResult<Prisma.$TargetDataPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TargetData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TargetData
     * const targetData = await prisma.targetData.findMany()
     * 
     * // Get first 10 TargetData
     * const targetData = await prisma.targetData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const targetDataWithIdOnly = await prisma.targetData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TargetDataFindManyArgs>(args?: SelectSubset<T, TargetDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TargetDataPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TargetData.
     * @param {TargetDataCreateArgs} args - Arguments to create a TargetData.
     * @example
     * // Create one TargetData
     * const TargetData = await prisma.targetData.create({
     *   data: {
     *     // ... data to create a TargetData
     *   }
     * })
     * 
     */
    create<T extends TargetDataCreateArgs>(args: SelectSubset<T, TargetDataCreateArgs<ExtArgs>>): Prisma__TargetDataClient<$Result.GetResult<Prisma.$TargetDataPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TargetData.
     * @param {TargetDataCreateManyArgs} args - Arguments to create many TargetData.
     * @example
     * // Create many TargetData
     * const targetData = await prisma.targetData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TargetDataCreateManyArgs>(args?: SelectSubset<T, TargetDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TargetData.
     * @param {TargetDataDeleteArgs} args - Arguments to delete one TargetData.
     * @example
     * // Delete one TargetData
     * const TargetData = await prisma.targetData.delete({
     *   where: {
     *     // ... filter to delete one TargetData
     *   }
     * })
     * 
     */
    delete<T extends TargetDataDeleteArgs>(args: SelectSubset<T, TargetDataDeleteArgs<ExtArgs>>): Prisma__TargetDataClient<$Result.GetResult<Prisma.$TargetDataPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TargetData.
     * @param {TargetDataUpdateArgs} args - Arguments to update one TargetData.
     * @example
     * // Update one TargetData
     * const targetData = await prisma.targetData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TargetDataUpdateArgs>(args: SelectSubset<T, TargetDataUpdateArgs<ExtArgs>>): Prisma__TargetDataClient<$Result.GetResult<Prisma.$TargetDataPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TargetData.
     * @param {TargetDataDeleteManyArgs} args - Arguments to filter TargetData to delete.
     * @example
     * // Delete a few TargetData
     * const { count } = await prisma.targetData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TargetDataDeleteManyArgs>(args?: SelectSubset<T, TargetDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TargetData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TargetData
     * const targetData = await prisma.targetData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TargetDataUpdateManyArgs>(args: SelectSubset<T, TargetDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TargetData.
     * @param {TargetDataUpsertArgs} args - Arguments to update or create a TargetData.
     * @example
     * // Update or create a TargetData
     * const targetData = await prisma.targetData.upsert({
     *   create: {
     *     // ... data to create a TargetData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TargetData we want to update
     *   }
     * })
     */
    upsert<T extends TargetDataUpsertArgs>(args: SelectSubset<T, TargetDataUpsertArgs<ExtArgs>>): Prisma__TargetDataClient<$Result.GetResult<Prisma.$TargetDataPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TargetData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetDataCountArgs} args - Arguments to filter TargetData to count.
     * @example
     * // Count the number of TargetData
     * const count = await prisma.targetData.count({
     *   where: {
     *     // ... the filter for the TargetData we want to count
     *   }
     * })
    **/
    count<T extends TargetDataCountArgs>(
      args?: Subset<T, TargetDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TargetDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TargetData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TargetDataAggregateArgs>(args: Subset<T, TargetDataAggregateArgs>): Prisma.PrismaPromise<GetTargetDataAggregateType<T>>

    /**
     * Group by TargetData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TargetDataGroupByArgs} args - Group by arguments.
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
      T extends TargetDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TargetDataGroupByArgs['orderBy'] }
        : { orderBy?: TargetDataGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TargetDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTargetDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TargetData model
   */
  readonly fields: TargetDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TargetData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TargetDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the TargetData model
   */ 
  interface TargetDataFieldRefs {
    readonly id: FieldRef<"TargetData", 'Int'>
    readonly attribute: FieldRef<"TargetData", 'String'>
    readonly y: FieldRef<"TargetData", 'Json'>
    readonly createdAt: FieldRef<"TargetData", 'DateTime'>
    readonly updatedAt: FieldRef<"TargetData", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TargetData findUnique
   */
  export type TargetDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TargetData
     */
    select?: TargetDataSelect<ExtArgs> | null
    /**
     * Filter, which TargetData to fetch.
     */
    where: TargetDataWhereUniqueInput
  }

  /**
   * TargetData findUniqueOrThrow
   */
  export type TargetDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TargetData
     */
    select?: TargetDataSelect<ExtArgs> | null
    /**
     * Filter, which TargetData to fetch.
     */
    where: TargetDataWhereUniqueInput
  }

  /**
   * TargetData findFirst
   */
  export type TargetDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TargetData
     */
    select?: TargetDataSelect<ExtArgs> | null
    /**
     * Filter, which TargetData to fetch.
     */
    where?: TargetDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TargetData to fetch.
     */
    orderBy?: TargetDataOrderByWithRelationInput | TargetDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TargetData.
     */
    cursor?: TargetDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TargetData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TargetData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TargetData.
     */
    distinct?: TargetDataScalarFieldEnum | TargetDataScalarFieldEnum[]
  }

  /**
   * TargetData findFirstOrThrow
   */
  export type TargetDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TargetData
     */
    select?: TargetDataSelect<ExtArgs> | null
    /**
     * Filter, which TargetData to fetch.
     */
    where?: TargetDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TargetData to fetch.
     */
    orderBy?: TargetDataOrderByWithRelationInput | TargetDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TargetData.
     */
    cursor?: TargetDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TargetData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TargetData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TargetData.
     */
    distinct?: TargetDataScalarFieldEnum | TargetDataScalarFieldEnum[]
  }

  /**
   * TargetData findMany
   */
  export type TargetDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TargetData
     */
    select?: TargetDataSelect<ExtArgs> | null
    /**
     * Filter, which TargetData to fetch.
     */
    where?: TargetDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TargetData to fetch.
     */
    orderBy?: TargetDataOrderByWithRelationInput | TargetDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TargetData.
     */
    cursor?: TargetDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TargetData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TargetData.
     */
    skip?: number
    distinct?: TargetDataScalarFieldEnum | TargetDataScalarFieldEnum[]
  }

  /**
   * TargetData create
   */
  export type TargetDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TargetData
     */
    select?: TargetDataSelect<ExtArgs> | null
    /**
     * The data needed to create a TargetData.
     */
    data: XOR<TargetDataCreateInput, TargetDataUncheckedCreateInput>
  }

  /**
   * TargetData createMany
   */
  export type TargetDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TargetData.
     */
    data: TargetDataCreateManyInput | TargetDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TargetData update
   */
  export type TargetDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TargetData
     */
    select?: TargetDataSelect<ExtArgs> | null
    /**
     * The data needed to update a TargetData.
     */
    data: XOR<TargetDataUpdateInput, TargetDataUncheckedUpdateInput>
    /**
     * Choose, which TargetData to update.
     */
    where: TargetDataWhereUniqueInput
  }

  /**
   * TargetData updateMany
   */
  export type TargetDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TargetData.
     */
    data: XOR<TargetDataUpdateManyMutationInput, TargetDataUncheckedUpdateManyInput>
    /**
     * Filter which TargetData to update
     */
    where?: TargetDataWhereInput
  }

  /**
   * TargetData upsert
   */
  export type TargetDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TargetData
     */
    select?: TargetDataSelect<ExtArgs> | null
    /**
     * The filter to search for the TargetData to update in case it exists.
     */
    where: TargetDataWhereUniqueInput
    /**
     * In case the TargetData found by the `where` argument doesn't exist, create a new TargetData with this data.
     */
    create: XOR<TargetDataCreateInput, TargetDataUncheckedCreateInput>
    /**
     * In case the TargetData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TargetDataUpdateInput, TargetDataUncheckedUpdateInput>
  }

  /**
   * TargetData delete
   */
  export type TargetDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TargetData
     */
    select?: TargetDataSelect<ExtArgs> | null
    /**
     * Filter which TargetData to delete.
     */
    where: TargetDataWhereUniqueInput
  }

  /**
   * TargetData deleteMany
   */
  export type TargetDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TargetData to delete
     */
    where?: TargetDataWhereInput
  }

  /**
   * TargetData without action
   */
  export type TargetDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TargetData
     */
    select?: TargetDataSelect<ExtArgs> | null
  }


  /**
   * Model Predictions
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
     * Filter which Predictions to aggregate.
     */
    where?: PredictionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Predictions to fetch.
     */
    orderBy?: PredictionsOrderByWithRelationInput | PredictionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PredictionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Predictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Predictions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Predictions
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




  export type PredictionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PredictionsWhereInput
    orderBy?: PredictionsOrderByWithAggregationInput | PredictionsOrderByWithAggregationInput[]
    by: PredictionsScalarFieldEnum[] | PredictionsScalarFieldEnum
    having?: PredictionsScalarWhereWithAggregatesInput
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

  type GetPredictionsGroupByPayload<T extends PredictionsGroupByArgs> = Prisma.PrismaPromise<
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


  export type PredictionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    model_name?: boolean
    spectral_data_id?: boolean
    prediction?: boolean
    createdAt?: boolean
    attribute?: boolean
  }, ExtArgs["result"]["predictions"]>


  export type PredictionsSelectScalar = {
    id?: boolean
    name?: boolean
    model_name?: boolean
    spectral_data_id?: boolean
    prediction?: boolean
    createdAt?: boolean
    attribute?: boolean
  }


  export type $PredictionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Predictions"
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

  type PredictionsGetPayload<S extends boolean | null | undefined | PredictionsDefaultArgs> = $Result.GetResult<Prisma.$PredictionsPayload, S>

  type PredictionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PredictionsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PredictionsCountAggregateInputType | true
    }

  export interface PredictionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Predictions'], meta: { name: 'Predictions' } }
    /**
     * Find zero or one Predictions that matches the filter.
     * @param {PredictionsFindUniqueArgs} args - Arguments to find a Predictions
     * @example
     * // Get one Predictions
     * const predictions = await prisma.predictions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PredictionsFindUniqueArgs>(args: SelectSubset<T, PredictionsFindUniqueArgs<ExtArgs>>): Prisma__PredictionsClient<$Result.GetResult<Prisma.$PredictionsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Predictions that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PredictionsFindUniqueOrThrowArgs} args - Arguments to find a Predictions
     * @example
     * // Get one Predictions
     * const predictions = await prisma.predictions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PredictionsFindUniqueOrThrowArgs>(args: SelectSubset<T, PredictionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PredictionsClient<$Result.GetResult<Prisma.$PredictionsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Predictions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionsFindFirstArgs} args - Arguments to find a Predictions
     * @example
     * // Get one Predictions
     * const predictions = await prisma.predictions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PredictionsFindFirstArgs>(args?: SelectSubset<T, PredictionsFindFirstArgs<ExtArgs>>): Prisma__PredictionsClient<$Result.GetResult<Prisma.$PredictionsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Predictions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionsFindFirstOrThrowArgs} args - Arguments to find a Predictions
     * @example
     * // Get one Predictions
     * const predictions = await prisma.predictions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PredictionsFindFirstOrThrowArgs>(args?: SelectSubset<T, PredictionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PredictionsClient<$Result.GetResult<Prisma.$PredictionsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Predictions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionsFindManyArgs} args - Arguments to filter and select certain fields only.
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
    findMany<T extends PredictionsFindManyArgs>(args?: SelectSubset<T, PredictionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PredictionsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Predictions.
     * @param {PredictionsCreateArgs} args - Arguments to create a Predictions.
     * @example
     * // Create one Predictions
     * const Predictions = await prisma.predictions.create({
     *   data: {
     *     // ... data to create a Predictions
     *   }
     * })
     * 
     */
    create<T extends PredictionsCreateArgs>(args: SelectSubset<T, PredictionsCreateArgs<ExtArgs>>): Prisma__PredictionsClient<$Result.GetResult<Prisma.$PredictionsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Predictions.
     * @param {PredictionsCreateManyArgs} args - Arguments to create many Predictions.
     * @example
     * // Create many Predictions
     * const predictions = await prisma.predictions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PredictionsCreateManyArgs>(args?: SelectSubset<T, PredictionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Predictions.
     * @param {PredictionsDeleteArgs} args - Arguments to delete one Predictions.
     * @example
     * // Delete one Predictions
     * const Predictions = await prisma.predictions.delete({
     *   where: {
     *     // ... filter to delete one Predictions
     *   }
     * })
     * 
     */
    delete<T extends PredictionsDeleteArgs>(args: SelectSubset<T, PredictionsDeleteArgs<ExtArgs>>): Prisma__PredictionsClient<$Result.GetResult<Prisma.$PredictionsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Predictions.
     * @param {PredictionsUpdateArgs} args - Arguments to update one Predictions.
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
    update<T extends PredictionsUpdateArgs>(args: SelectSubset<T, PredictionsUpdateArgs<ExtArgs>>): Prisma__PredictionsClient<$Result.GetResult<Prisma.$PredictionsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Predictions.
     * @param {PredictionsDeleteManyArgs} args - Arguments to filter Predictions to delete.
     * @example
     * // Delete a few Predictions
     * const { count } = await prisma.predictions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PredictionsDeleteManyArgs>(args?: SelectSubset<T, PredictionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Predictions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionsUpdateManyArgs} args - Arguments to update one or more rows.
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
    updateMany<T extends PredictionsUpdateManyArgs>(args: SelectSubset<T, PredictionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Predictions.
     * @param {PredictionsUpsertArgs} args - Arguments to update or create a Predictions.
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
    upsert<T extends PredictionsUpsertArgs>(args: SelectSubset<T, PredictionsUpsertArgs<ExtArgs>>): Prisma__PredictionsClient<$Result.GetResult<Prisma.$PredictionsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Predictions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PredictionsCountArgs} args - Arguments to filter Predictions to count.
     * @example
     * // Count the number of Predictions
     * const count = await prisma.predictions.count({
     *   where: {
     *     // ... the filter for the Predictions we want to count
     *   }
     * })
    **/
    count<T extends PredictionsCountArgs>(
      args?: Subset<T, PredictionsCountArgs>,
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
     * @param {PredictionsGroupByArgs} args - Group by arguments.
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
      T extends PredictionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PredictionsGroupByArgs['orderBy'] }
        : { orderBy?: PredictionsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PredictionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPredictionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Predictions model
   */
  readonly fields: PredictionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Predictions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PredictionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Predictions model
   */ 
  interface PredictionsFieldRefs {
    readonly id: FieldRef<"Predictions", 'Int'>
    readonly name: FieldRef<"Predictions", 'String'>
    readonly model_name: FieldRef<"Predictions", 'String'>
    readonly spectral_data_id: FieldRef<"Predictions", 'Int'>
    readonly prediction: FieldRef<"Predictions", 'Float'>
    readonly createdAt: FieldRef<"Predictions", 'DateTime'>
    readonly attribute: FieldRef<"Predictions", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Predictions findUnique
   */
  export type PredictionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Predictions
     */
    select?: PredictionsSelect<ExtArgs> | null
    /**
     * Filter, which Predictions to fetch.
     */
    where: PredictionsWhereUniqueInput
  }

  /**
   * Predictions findUniqueOrThrow
   */
  export type PredictionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Predictions
     */
    select?: PredictionsSelect<ExtArgs> | null
    /**
     * Filter, which Predictions to fetch.
     */
    where: PredictionsWhereUniqueInput
  }

  /**
   * Predictions findFirst
   */
  export type PredictionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Predictions
     */
    select?: PredictionsSelect<ExtArgs> | null
    /**
     * Filter, which Predictions to fetch.
     */
    where?: PredictionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Predictions to fetch.
     */
    orderBy?: PredictionsOrderByWithRelationInput | PredictionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Predictions.
     */
    cursor?: PredictionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Predictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Predictions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Predictions.
     */
    distinct?: PredictionsScalarFieldEnum | PredictionsScalarFieldEnum[]
  }

  /**
   * Predictions findFirstOrThrow
   */
  export type PredictionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Predictions
     */
    select?: PredictionsSelect<ExtArgs> | null
    /**
     * Filter, which Predictions to fetch.
     */
    where?: PredictionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Predictions to fetch.
     */
    orderBy?: PredictionsOrderByWithRelationInput | PredictionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Predictions.
     */
    cursor?: PredictionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Predictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Predictions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Predictions.
     */
    distinct?: PredictionsScalarFieldEnum | PredictionsScalarFieldEnum[]
  }

  /**
   * Predictions findMany
   */
  export type PredictionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Predictions
     */
    select?: PredictionsSelect<ExtArgs> | null
    /**
     * Filter, which Predictions to fetch.
     */
    where?: PredictionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Predictions to fetch.
     */
    orderBy?: PredictionsOrderByWithRelationInput | PredictionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Predictions.
     */
    cursor?: PredictionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Predictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Predictions.
     */
    skip?: number
    distinct?: PredictionsScalarFieldEnum | PredictionsScalarFieldEnum[]
  }

  /**
   * Predictions create
   */
  export type PredictionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Predictions
     */
    select?: PredictionsSelect<ExtArgs> | null
    /**
     * The data needed to create a Predictions.
     */
    data: XOR<PredictionsCreateInput, PredictionsUncheckedCreateInput>
  }

  /**
   * Predictions createMany
   */
  export type PredictionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Predictions.
     */
    data: PredictionsCreateManyInput | PredictionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Predictions update
   */
  export type PredictionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Predictions
     */
    select?: PredictionsSelect<ExtArgs> | null
    /**
     * The data needed to update a Predictions.
     */
    data: XOR<PredictionsUpdateInput, PredictionsUncheckedUpdateInput>
    /**
     * Choose, which Predictions to update.
     */
    where: PredictionsWhereUniqueInput
  }

  /**
   * Predictions updateMany
   */
  export type PredictionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Predictions.
     */
    data: XOR<PredictionsUpdateManyMutationInput, PredictionsUncheckedUpdateManyInput>
    /**
     * Filter which Predictions to update
     */
    where?: PredictionsWhereInput
  }

  /**
   * Predictions upsert
   */
  export type PredictionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Predictions
     */
    select?: PredictionsSelect<ExtArgs> | null
    /**
     * The filter to search for the Predictions to update in case it exists.
     */
    where: PredictionsWhereUniqueInput
    /**
     * In case the Predictions found by the `where` argument doesn't exist, create a new Predictions with this data.
     */
    create: XOR<PredictionsCreateInput, PredictionsUncheckedCreateInput>
    /**
     * In case the Predictions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PredictionsUpdateInput, PredictionsUncheckedUpdateInput>
  }

  /**
   * Predictions delete
   */
  export type PredictionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Predictions
     */
    select?: PredictionsSelect<ExtArgs> | null
    /**
     * Filter which Predictions to delete.
     */
    where: PredictionsWhereUniqueInput
  }

  /**
   * Predictions deleteMany
   */
  export type PredictionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Predictions to delete
     */
    where?: PredictionsWhereInput
  }

  /**
   * Predictions without action
   */
  export type PredictionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Predictions
     */
    select?: PredictionsSelect<ExtArgs> | null
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


  export const VarietyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    attributes: 'attributes'
  };

  export type VarietyScalarFieldEnum = (typeof VarietyScalarFieldEnum)[keyof typeof VarietyScalarFieldEnum]


  export const FilterScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    parameters: 'parameters',
    createdAt: 'createdAt'
  };

  export type FilterScalarFieldEnum = (typeof FilterScalarFieldEnum)[keyof typeof FilterScalarFieldEnum]


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


  export const PredictiveModelScalarFieldEnum: {
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

  export type PredictiveModelScalarFieldEnum = (typeof PredictiveModelScalarFieldEnum)[keyof typeof PredictiveModelScalarFieldEnum]


  export const SpectrumDataScalarFieldEnum: {
    id: 'id',
    dataset: 'dataset',
    wavelengths: 'wavelengths',
    X: 'X',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    image: 'image'
  };

  export type SpectrumDataScalarFieldEnum = (typeof SpectrumDataScalarFieldEnum)[keyof typeof SpectrumDataScalarFieldEnum]


  export const TargetDataScalarFieldEnum: {
    id: 'id',
    attribute: 'attribute',
    y: 'y',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TargetDataScalarFieldEnum = (typeof TargetDataScalarFieldEnum)[keyof typeof TargetDataScalarFieldEnum]


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

  export type VarietyWhereInput = {
    AND?: VarietyWhereInput | VarietyWhereInput[]
    OR?: VarietyWhereInput[]
    NOT?: VarietyWhereInput | VarietyWhereInput[]
    id?: IntFilter<"Variety"> | number
    name?: StringFilter<"Variety"> | string
    description?: StringFilter<"Variety"> | string
    attributes?: JsonFilter<"Variety">
  }

  export type VarietyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    attributes?: SortOrder
  }

  export type VarietyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VarietyWhereInput | VarietyWhereInput[]
    OR?: VarietyWhereInput[]
    NOT?: VarietyWhereInput | VarietyWhereInput[]
    name?: StringFilter<"Variety"> | string
    description?: StringFilter<"Variety"> | string
    attributes?: JsonFilter<"Variety">
  }, "id">

  export type VarietyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    attributes?: SortOrder
    _count?: VarietyCountOrderByAggregateInput
    _avg?: VarietyAvgOrderByAggregateInput
    _max?: VarietyMaxOrderByAggregateInput
    _min?: VarietyMinOrderByAggregateInput
    _sum?: VarietySumOrderByAggregateInput
  }

  export type VarietyScalarWhereWithAggregatesInput = {
    AND?: VarietyScalarWhereWithAggregatesInput | VarietyScalarWhereWithAggregatesInput[]
    OR?: VarietyScalarWhereWithAggregatesInput[]
    NOT?: VarietyScalarWhereWithAggregatesInput | VarietyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Variety"> | number
    name?: StringWithAggregatesFilter<"Variety"> | string
    description?: StringWithAggregatesFilter<"Variety"> | string
    attributes?: JsonWithAggregatesFilter<"Variety">
  }

  export type FilterWhereInput = {
    AND?: FilterWhereInput | FilterWhereInput[]
    OR?: FilterWhereInput[]
    NOT?: FilterWhereInput | FilterWhereInput[]
    id?: IntFilter<"Filter"> | number
    name?: StringFilter<"Filter"> | string
    type?: StringFilter<"Filter"> | string
    parameters?: JsonFilter<"Filter">
    createdAt?: DateTimeFilter<"Filter"> | Date | string
  }

  export type FilterOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    parameters?: SortOrder
    createdAt?: SortOrder
  }

  export type FilterWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FilterWhereInput | FilterWhereInput[]
    OR?: FilterWhereInput[]
    NOT?: FilterWhereInput | FilterWhereInput[]
    name?: StringFilter<"Filter"> | string
    type?: StringFilter<"Filter"> | string
    parameters?: JsonFilter<"Filter">
    createdAt?: DateTimeFilter<"Filter"> | Date | string
  }, "id">

  export type FilterOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    parameters?: SortOrder
    createdAt?: SortOrder
    _count?: FilterCountOrderByAggregateInput
    _avg?: FilterAvgOrderByAggregateInput
    _max?: FilterMaxOrderByAggregateInput
    _min?: FilterMinOrderByAggregateInput
    _sum?: FilterSumOrderByAggregateInput
  }

  export type FilterScalarWhereWithAggregatesInput = {
    AND?: FilterScalarWhereWithAggregatesInput | FilterScalarWhereWithAggregatesInput[]
    OR?: FilterScalarWhereWithAggregatesInput[]
    NOT?: FilterScalarWhereWithAggregatesInput | FilterScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Filter"> | number
    name?: StringWithAggregatesFilter<"Filter"> | string
    type?: StringWithAggregatesFilter<"Filter"> | string
    parameters?: JsonWithAggregatesFilter<"Filter">
    createdAt?: DateTimeWithAggregatesFilter<"Filter"> | Date | string
  }

  export type SpectraWhereInput = {
    AND?: SpectraWhereInput | SpectraWhereInput[]
    OR?: SpectraWhereInput[]
    NOT?: SpectraWhereInput | SpectraWhereInput[]
    id?: IntFilter<"Spectra"> | number
    name?: StringFilter<"Spectra"> | string
    content?: JsonFilter<"Spectra">
    variety?: IntFilter<"Spectra"> | number
    datetime?: DateTimeFilter<"Spectra"> | Date | string
    local?: StringFilter<"Spectra"> | string
    filter?: StringFilter<"Spectra"> | string
    graph?: StringFilter<"Spectra"> | string
    createdAt?: DateTimeFilter<"Spectra"> | Date | string
  }

  export type SpectraOrderByWithRelationInput = {
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

  export type SpectraWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SpectraWhereInput | SpectraWhereInput[]
    OR?: SpectraWhereInput[]
    NOT?: SpectraWhereInput | SpectraWhereInput[]
    name?: StringFilter<"Spectra"> | string
    content?: JsonFilter<"Spectra">
    variety?: IntFilter<"Spectra"> | number
    datetime?: DateTimeFilter<"Spectra"> | Date | string
    local?: StringFilter<"Spectra"> | string
    filter?: StringFilter<"Spectra"> | string
    graph?: StringFilter<"Spectra"> | string
    createdAt?: DateTimeFilter<"Spectra"> | Date | string
  }, "id">

  export type SpectraOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    variety?: SortOrder
    datetime?: SortOrder
    local?: SortOrder
    filter?: SortOrder
    graph?: SortOrder
    createdAt?: SortOrder
    _count?: SpectraCountOrderByAggregateInput
    _avg?: SpectraAvgOrderByAggregateInput
    _max?: SpectraMaxOrderByAggregateInput
    _min?: SpectraMinOrderByAggregateInput
    _sum?: SpectraSumOrderByAggregateInput
  }

  export type SpectraScalarWhereWithAggregatesInput = {
    AND?: SpectraScalarWhereWithAggregatesInput | SpectraScalarWhereWithAggregatesInput[]
    OR?: SpectraScalarWhereWithAggregatesInput[]
    NOT?: SpectraScalarWhereWithAggregatesInput | SpectraScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Spectra"> | number
    name?: StringWithAggregatesFilter<"Spectra"> | string
    content?: JsonWithAggregatesFilter<"Spectra">
    variety?: IntWithAggregatesFilter<"Spectra"> | number
    datetime?: DateTimeWithAggregatesFilter<"Spectra"> | Date | string
    local?: StringWithAggregatesFilter<"Spectra"> | string
    filter?: StringWithAggregatesFilter<"Spectra"> | string
    graph?: StringWithAggregatesFilter<"Spectra"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Spectra"> | Date | string
  }

  export type PredictiveModelWhereInput = {
    AND?: PredictiveModelWhereInput | PredictiveModelWhereInput[]
    OR?: PredictiveModelWhereInput[]
    NOT?: PredictiveModelWhereInput | PredictiveModelWhereInput[]
    id?: IntFilter<"PredictiveModel"> | number
    model_name?: StringFilter<"PredictiveModel"> | string
    variety?: StringFilter<"PredictiveModel"> | string
    attribute?: StringFilter<"PredictiveModel"> | string
    hyperparameters?: JsonFilter<"PredictiveModel">
    metrics?: JsonFilter<"PredictiveModel">
    model?: StringNullableFilter<"PredictiveModel"> | string | null
    graph?: JsonFilter<"PredictiveModel">
    createdAt?: DateTimeFilter<"PredictiveModel"> | Date | string
    updatedAt?: DateTimeFilter<"PredictiveModel"> | Date | string
  }

  export type PredictiveModelOrderByWithRelationInput = {
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

  export type PredictiveModelWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PredictiveModelWhereInput | PredictiveModelWhereInput[]
    OR?: PredictiveModelWhereInput[]
    NOT?: PredictiveModelWhereInput | PredictiveModelWhereInput[]
    model_name?: StringFilter<"PredictiveModel"> | string
    variety?: StringFilter<"PredictiveModel"> | string
    attribute?: StringFilter<"PredictiveModel"> | string
    hyperparameters?: JsonFilter<"PredictiveModel">
    metrics?: JsonFilter<"PredictiveModel">
    model?: StringNullableFilter<"PredictiveModel"> | string | null
    graph?: JsonFilter<"PredictiveModel">
    createdAt?: DateTimeFilter<"PredictiveModel"> | Date | string
    updatedAt?: DateTimeFilter<"PredictiveModel"> | Date | string
  }, "id">

  export type PredictiveModelOrderByWithAggregationInput = {
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
    _count?: PredictiveModelCountOrderByAggregateInput
    _avg?: PredictiveModelAvgOrderByAggregateInput
    _max?: PredictiveModelMaxOrderByAggregateInput
    _min?: PredictiveModelMinOrderByAggregateInput
    _sum?: PredictiveModelSumOrderByAggregateInput
  }

  export type PredictiveModelScalarWhereWithAggregatesInput = {
    AND?: PredictiveModelScalarWhereWithAggregatesInput | PredictiveModelScalarWhereWithAggregatesInput[]
    OR?: PredictiveModelScalarWhereWithAggregatesInput[]
    NOT?: PredictiveModelScalarWhereWithAggregatesInput | PredictiveModelScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PredictiveModel"> | number
    model_name?: StringWithAggregatesFilter<"PredictiveModel"> | string
    variety?: StringWithAggregatesFilter<"PredictiveModel"> | string
    attribute?: StringWithAggregatesFilter<"PredictiveModel"> | string
    hyperparameters?: JsonWithAggregatesFilter<"PredictiveModel">
    metrics?: JsonWithAggregatesFilter<"PredictiveModel">
    model?: StringNullableWithAggregatesFilter<"PredictiveModel"> | string | null
    graph?: JsonWithAggregatesFilter<"PredictiveModel">
    createdAt?: DateTimeWithAggregatesFilter<"PredictiveModel"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PredictiveModel"> | Date | string
  }

  export type SpectrumDataWhereInput = {
    AND?: SpectrumDataWhereInput | SpectrumDataWhereInput[]
    OR?: SpectrumDataWhereInput[]
    NOT?: SpectrumDataWhereInput | SpectrumDataWhereInput[]
    id?: IntFilter<"SpectrumData"> | number
    dataset?: StringFilter<"SpectrumData"> | string
    wavelengths?: JsonFilter<"SpectrumData">
    X?: JsonFilter<"SpectrumData">
    createdAt?: DateTimeFilter<"SpectrumData"> | Date | string
    updatedAt?: DateTimeFilter<"SpectrumData"> | Date | string
    image?: JsonFilter<"SpectrumData">
  }

  export type SpectrumDataOrderByWithRelationInput = {
    id?: SortOrder
    dataset?: SortOrder
    wavelengths?: SortOrder
    X?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    image?: SortOrder
  }

  export type SpectrumDataWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SpectrumDataWhereInput | SpectrumDataWhereInput[]
    OR?: SpectrumDataWhereInput[]
    NOT?: SpectrumDataWhereInput | SpectrumDataWhereInput[]
    dataset?: StringFilter<"SpectrumData"> | string
    wavelengths?: JsonFilter<"SpectrumData">
    X?: JsonFilter<"SpectrumData">
    createdAt?: DateTimeFilter<"SpectrumData"> | Date | string
    updatedAt?: DateTimeFilter<"SpectrumData"> | Date | string
    image?: JsonFilter<"SpectrumData">
  }, "id">

  export type SpectrumDataOrderByWithAggregationInput = {
    id?: SortOrder
    dataset?: SortOrder
    wavelengths?: SortOrder
    X?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    image?: SortOrder
    _count?: SpectrumDataCountOrderByAggregateInput
    _avg?: SpectrumDataAvgOrderByAggregateInput
    _max?: SpectrumDataMaxOrderByAggregateInput
    _min?: SpectrumDataMinOrderByAggregateInput
    _sum?: SpectrumDataSumOrderByAggregateInput
  }

  export type SpectrumDataScalarWhereWithAggregatesInput = {
    AND?: SpectrumDataScalarWhereWithAggregatesInput | SpectrumDataScalarWhereWithAggregatesInput[]
    OR?: SpectrumDataScalarWhereWithAggregatesInput[]
    NOT?: SpectrumDataScalarWhereWithAggregatesInput | SpectrumDataScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SpectrumData"> | number
    dataset?: StringWithAggregatesFilter<"SpectrumData"> | string
    wavelengths?: JsonWithAggregatesFilter<"SpectrumData">
    X?: JsonWithAggregatesFilter<"SpectrumData">
    createdAt?: DateTimeWithAggregatesFilter<"SpectrumData"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SpectrumData"> | Date | string
    image?: JsonWithAggregatesFilter<"SpectrumData">
  }

  export type TargetDataWhereInput = {
    AND?: TargetDataWhereInput | TargetDataWhereInput[]
    OR?: TargetDataWhereInput[]
    NOT?: TargetDataWhereInput | TargetDataWhereInput[]
    id?: IntFilter<"TargetData"> | number
    attribute?: StringFilter<"TargetData"> | string
    y?: JsonFilter<"TargetData">
    createdAt?: DateTimeFilter<"TargetData"> | Date | string
    updatedAt?: DateTimeFilter<"TargetData"> | Date | string
  }

  export type TargetDataOrderByWithRelationInput = {
    id?: SortOrder
    attribute?: SortOrder
    y?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TargetDataWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TargetDataWhereInput | TargetDataWhereInput[]
    OR?: TargetDataWhereInput[]
    NOT?: TargetDataWhereInput | TargetDataWhereInput[]
    attribute?: StringFilter<"TargetData"> | string
    y?: JsonFilter<"TargetData">
    createdAt?: DateTimeFilter<"TargetData"> | Date | string
    updatedAt?: DateTimeFilter<"TargetData"> | Date | string
  }, "id">

  export type TargetDataOrderByWithAggregationInput = {
    id?: SortOrder
    attribute?: SortOrder
    y?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TargetDataCountOrderByAggregateInput
    _avg?: TargetDataAvgOrderByAggregateInput
    _max?: TargetDataMaxOrderByAggregateInput
    _min?: TargetDataMinOrderByAggregateInput
    _sum?: TargetDataSumOrderByAggregateInput
  }

  export type TargetDataScalarWhereWithAggregatesInput = {
    AND?: TargetDataScalarWhereWithAggregatesInput | TargetDataScalarWhereWithAggregatesInput[]
    OR?: TargetDataScalarWhereWithAggregatesInput[]
    NOT?: TargetDataScalarWhereWithAggregatesInput | TargetDataScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TargetData"> | number
    attribute?: StringWithAggregatesFilter<"TargetData"> | string
    y?: JsonWithAggregatesFilter<"TargetData">
    createdAt?: DateTimeWithAggregatesFilter<"TargetData"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TargetData"> | Date | string
  }

  export type PredictionsWhereInput = {
    AND?: PredictionsWhereInput | PredictionsWhereInput[]
    OR?: PredictionsWhereInput[]
    NOT?: PredictionsWhereInput | PredictionsWhereInput[]
    id?: IntFilter<"Predictions"> | number
    name?: StringFilter<"Predictions"> | string
    model_name?: StringFilter<"Predictions"> | string
    spectral_data_id?: IntFilter<"Predictions"> | number
    prediction?: FloatFilter<"Predictions"> | number
    createdAt?: DateTimeFilter<"Predictions"> | Date | string
    attribute?: StringNullableFilter<"Predictions"> | string | null
  }

  export type PredictionsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    model_name?: SortOrder
    spectral_data_id?: SortOrder
    prediction?: SortOrder
    createdAt?: SortOrder
    attribute?: SortOrderInput | SortOrder
  }

  export type PredictionsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PredictionsWhereInput | PredictionsWhereInput[]
    OR?: PredictionsWhereInput[]
    NOT?: PredictionsWhereInput | PredictionsWhereInput[]
    name?: StringFilter<"Predictions"> | string
    model_name?: StringFilter<"Predictions"> | string
    spectral_data_id?: IntFilter<"Predictions"> | number
    prediction?: FloatFilter<"Predictions"> | number
    createdAt?: DateTimeFilter<"Predictions"> | Date | string
    attribute?: StringNullableFilter<"Predictions"> | string | null
  }, "id">

  export type PredictionsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    model_name?: SortOrder
    spectral_data_id?: SortOrder
    prediction?: SortOrder
    createdAt?: SortOrder
    attribute?: SortOrderInput | SortOrder
    _count?: PredictionsCountOrderByAggregateInput
    _avg?: PredictionsAvgOrderByAggregateInput
    _max?: PredictionsMaxOrderByAggregateInput
    _min?: PredictionsMinOrderByAggregateInput
    _sum?: PredictionsSumOrderByAggregateInput
  }

  export type PredictionsScalarWhereWithAggregatesInput = {
    AND?: PredictionsScalarWhereWithAggregatesInput | PredictionsScalarWhereWithAggregatesInput[]
    OR?: PredictionsScalarWhereWithAggregatesInput[]
    NOT?: PredictionsScalarWhereWithAggregatesInput | PredictionsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Predictions"> | number
    name?: StringWithAggregatesFilter<"Predictions"> | string
    model_name?: StringWithAggregatesFilter<"Predictions"> | string
    spectral_data_id?: IntWithAggregatesFilter<"Predictions"> | number
    prediction?: FloatWithAggregatesFilter<"Predictions"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Predictions"> | Date | string
    attribute?: StringNullableWithAggregatesFilter<"Predictions"> | string | null
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

  export type VarietyCreateInput = {
    name: string
    description: string
    attributes?: JsonNullValueInput | InputJsonValue
  }

  export type VarietyUncheckedCreateInput = {
    id?: number
    name: string
    description: string
    attributes?: JsonNullValueInput | InputJsonValue
  }

  export type VarietyUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    attributes?: JsonNullValueInput | InputJsonValue
  }

  export type VarietyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    attributes?: JsonNullValueInput | InputJsonValue
  }

  export type VarietyCreateManyInput = {
    id?: number
    name: string
    description: string
    attributes?: JsonNullValueInput | InputJsonValue
  }

  export type VarietyUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    attributes?: JsonNullValueInput | InputJsonValue
  }

  export type VarietyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    attributes?: JsonNullValueInput | InputJsonValue
  }

  export type FilterCreateInput = {
    name: string
    type: string
    parameters: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type FilterUncheckedCreateInput = {
    id?: number
    name: string
    type: string
    parameters: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type FilterUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FilterUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FilterCreateManyInput = {
    id?: number
    name: string
    type: string
    parameters: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type FilterUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FilterUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    parameters?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpectraCreateInput = {
    name: string
    content: JsonNullValueInput | InputJsonValue
    variety: number
    datetime: Date | string
    local: string
    filter: string
    graph: string
    createdAt?: Date | string
  }

  export type SpectraUncheckedCreateInput = {
    id?: number
    name: string
    content: JsonNullValueInput | InputJsonValue
    variety: number
    datetime: Date | string
    local: string
    filter: string
    graph: string
    createdAt?: Date | string
  }

  export type SpectraUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    variety?: IntFieldUpdateOperationsInput | number
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    local?: StringFieldUpdateOperationsInput | string
    filter?: StringFieldUpdateOperationsInput | string
    graph?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpectraUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    variety?: IntFieldUpdateOperationsInput | number
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    local?: StringFieldUpdateOperationsInput | string
    filter?: StringFieldUpdateOperationsInput | string
    graph?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpectraCreateManyInput = {
    id?: number
    name: string
    content: JsonNullValueInput | InputJsonValue
    variety: number
    datetime: Date | string
    local: string
    filter: string
    graph: string
    createdAt?: Date | string
  }

  export type SpectraUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    variety?: IntFieldUpdateOperationsInput | number
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    local?: StringFieldUpdateOperationsInput | string
    filter?: StringFieldUpdateOperationsInput | string
    graph?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpectraUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    variety?: IntFieldUpdateOperationsInput | number
    datetime?: DateTimeFieldUpdateOperationsInput | Date | string
    local?: StringFieldUpdateOperationsInput | string
    filter?: StringFieldUpdateOperationsInput | string
    graph?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PredictiveModelCreateInput = {
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

  export type PredictiveModelUncheckedCreateInput = {
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

  export type PredictiveModelUpdateInput = {
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

  export type PredictiveModelUncheckedUpdateInput = {
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

  export type PredictiveModelCreateManyInput = {
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

  export type PredictiveModelUpdateManyMutationInput = {
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

  export type PredictiveModelUncheckedUpdateManyInput = {
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

  export type SpectrumDataCreateInput = {
    dataset: string
    wavelengths?: JsonNullValueInput | InputJsonValue
    X?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    image: JsonNullValueInput | InputJsonValue
  }

  export type SpectrumDataUncheckedCreateInput = {
    id?: number
    dataset: string
    wavelengths?: JsonNullValueInput | InputJsonValue
    X?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    image: JsonNullValueInput | InputJsonValue
  }

  export type SpectrumDataUpdateInput = {
    dataset?: StringFieldUpdateOperationsInput | string
    wavelengths?: JsonNullValueInput | InputJsonValue
    X?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: JsonNullValueInput | InputJsonValue
  }

  export type SpectrumDataUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataset?: StringFieldUpdateOperationsInput | string
    wavelengths?: JsonNullValueInput | InputJsonValue
    X?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: JsonNullValueInput | InputJsonValue
  }

  export type SpectrumDataCreateManyInput = {
    id?: number
    dataset: string
    wavelengths?: JsonNullValueInput | InputJsonValue
    X?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    image: JsonNullValueInput | InputJsonValue
  }

  export type SpectrumDataUpdateManyMutationInput = {
    dataset?: StringFieldUpdateOperationsInput | string
    wavelengths?: JsonNullValueInput | InputJsonValue
    X?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: JsonNullValueInput | InputJsonValue
  }

  export type SpectrumDataUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataset?: StringFieldUpdateOperationsInput | string
    wavelengths?: JsonNullValueInput | InputJsonValue
    X?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: JsonNullValueInput | InputJsonValue
  }

  export type TargetDataCreateInput = {
    attribute: string
    y?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TargetDataUncheckedCreateInput = {
    id?: number
    attribute: string
    y?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TargetDataUpdateInput = {
    attribute?: StringFieldUpdateOperationsInput | string
    y?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TargetDataUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    attribute?: StringFieldUpdateOperationsInput | string
    y?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TargetDataCreateManyInput = {
    id?: number
    attribute: string
    y?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TargetDataUpdateManyMutationInput = {
    attribute?: StringFieldUpdateOperationsInput | string
    y?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TargetDataUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    attribute?: StringFieldUpdateOperationsInput | string
    y?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PredictionsCreateInput = {
    name: string
    model_name: string
    spectral_data_id: number
    prediction: number
    createdAt?: Date | string
    attribute?: string | null
  }

  export type PredictionsUncheckedCreateInput = {
    id?: number
    name: string
    model_name: string
    spectral_data_id: number
    prediction: number
    createdAt?: Date | string
    attribute?: string | null
  }

  export type PredictionsUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    model_name?: StringFieldUpdateOperationsInput | string
    spectral_data_id?: IntFieldUpdateOperationsInput | number
    prediction?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attribute?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PredictionsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    model_name?: StringFieldUpdateOperationsInput | string
    spectral_data_id?: IntFieldUpdateOperationsInput | number
    prediction?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attribute?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PredictionsCreateManyInput = {
    id?: number
    name: string
    model_name: string
    spectral_data_id: number
    prediction: number
    createdAt?: Date | string
    attribute?: string | null
  }

  export type PredictionsUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    model_name?: StringFieldUpdateOperationsInput | string
    spectral_data_id?: IntFieldUpdateOperationsInput | number
    prediction?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attribute?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PredictionsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    model_name?: StringFieldUpdateOperationsInput | string
    spectral_data_id?: IntFieldUpdateOperationsInput | number
    prediction?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attribute?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type VarietyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    attributes?: SortOrder
  }

  export type VarietyAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type VarietyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type VarietyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type VarietySumOrderByAggregateInput = {
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

  export type FilterCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    parameters?: SortOrder
    createdAt?: SortOrder
  }

  export type FilterAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FilterMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type FilterMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type FilterSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type SpectraCountOrderByAggregateInput = {
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

  export type SpectraAvgOrderByAggregateInput = {
    id?: SortOrder
    variety?: SortOrder
  }

  export type SpectraMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    variety?: SortOrder
    datetime?: SortOrder
    local?: SortOrder
    filter?: SortOrder
    graph?: SortOrder
    createdAt?: SortOrder
  }

  export type SpectraMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    variety?: SortOrder
    datetime?: SortOrder
    local?: SortOrder
    filter?: SortOrder
    graph?: SortOrder
    createdAt?: SortOrder
  }

  export type SpectraSumOrderByAggregateInput = {
    id?: SortOrder
    variety?: SortOrder
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

  export type PredictiveModelCountOrderByAggregateInput = {
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

  export type PredictiveModelAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PredictiveModelMaxOrderByAggregateInput = {
    id?: SortOrder
    model_name?: SortOrder
    variety?: SortOrder
    attribute?: SortOrder
    model?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PredictiveModelMinOrderByAggregateInput = {
    id?: SortOrder
    model_name?: SortOrder
    variety?: SortOrder
    attribute?: SortOrder
    model?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PredictiveModelSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type SpectrumDataCountOrderByAggregateInput = {
    id?: SortOrder
    dataset?: SortOrder
    wavelengths?: SortOrder
    X?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    image?: SortOrder
  }

  export type SpectrumDataAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SpectrumDataMaxOrderByAggregateInput = {
    id?: SortOrder
    dataset?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpectrumDataMinOrderByAggregateInput = {
    id?: SortOrder
    dataset?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpectrumDataSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TargetDataCountOrderByAggregateInput = {
    id?: SortOrder
    attribute?: SortOrder
    y?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TargetDataAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TargetDataMaxOrderByAggregateInput = {
    id?: SortOrder
    attribute?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TargetDataMinOrderByAggregateInput = {
    id?: SortOrder
    attribute?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TargetDataSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type PredictionsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    model_name?: SortOrder
    spectral_data_id?: SortOrder
    prediction?: SortOrder
    createdAt?: SortOrder
    attribute?: SortOrder
  }

  export type PredictionsAvgOrderByAggregateInput = {
    id?: SortOrder
    spectral_data_id?: SortOrder
    prediction?: SortOrder
  }

  export type PredictionsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    model_name?: SortOrder
    spectral_data_id?: SortOrder
    prediction?: SortOrder
    createdAt?: SortOrder
    attribute?: SortOrder
  }

  export type PredictionsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    model_name?: SortOrder
    spectral_data_id?: SortOrder
    prediction?: SortOrder
    createdAt?: SortOrder
    attribute?: SortOrder
  }

  export type PredictionsSumOrderByAggregateInput = {
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

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use userDefaultArgs instead
     */
    export type userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = userDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VarietyDefaultArgs instead
     */
    export type VarietyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VarietyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FilterDefaultArgs instead
     */
    export type FilterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FilterDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SpectraDefaultArgs instead
     */
    export type SpectraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SpectraDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PredictiveModelDefaultArgs instead
     */
    export type PredictiveModelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PredictiveModelDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SpectrumDataDefaultArgs instead
     */
    export type SpectrumDataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SpectrumDataDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TargetDataDefaultArgs instead
     */
    export type TargetDataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TargetDataDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PredictionsDefaultArgs instead
     */
    export type PredictionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PredictionsDefaultArgs<ExtArgs>

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