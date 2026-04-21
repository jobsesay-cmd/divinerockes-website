declare const process: {
  env: Record<string, string | undefined>;
  exit(code?: number): never;
};

declare const console: {
  log: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
};

declare const Buffer: {
  from(data: string, encoding?: string): Uint8Array;
};

declare module 'crypto' {
  export function randomBytes(size: number): { toString(encoding: string): string };
  export function scryptSync(password: string, salt: string, keylen: number): { toString(encoding: string): string };
  export function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean;
  export function createHash(algorithm: string): {
    update(value: string): { digest(encoding: string): string };
  };
}

declare module 'sanitize-html' {
  export default function sanitizeHtml(input: string, options?: Record<string, unknown>): string;
}

declare module 'next/server' {
  export class NextRequest {
    headers: { get(name: string): string | null };
    nextUrl: { searchParams: URLSearchParams };
    url: string;
    json(): Promise<unknown>;
  }

  export class NextResponse {
    static json(body: unknown, init?: { status?: number }): Response;
  }
}

declare module 'next/headers' {
  export function cookies(): Promise<{
    get(name: string): { value: string } | undefined;
    set(name: string, value: string, options?: Record<string, unknown>): void;
    delete(name: string): void;
  }>;

  export function headers(): Promise<{
    get(name: string): string | null;
  }>;
}

declare module 'zod' {
  export const z: any;
}
