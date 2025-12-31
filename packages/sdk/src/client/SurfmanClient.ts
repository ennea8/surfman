import type { JsonRpcRequest, JsonRpcResponse, RpcClientConfig } from '../types';

export class SurfmanClient {
  private url: string;
  private timeout: number;
  private headers: Record<string, string>;
  private requestId = 0;

  constructor(config: string | RpcClientConfig) {
    if (typeof config === 'string') {
      this.url = config;
      this.timeout = 30000;
      this.headers = { 'Content-Type': 'application/json' };
    } else {
      this.url = config.url;
      this.timeout = config.timeout ?? 30000;
      this.headers = {
        'Content-Type': 'application/json',
        ...config.headers,
      };
    }
  }

  async request<TParams = any, TResult = any>(
    method: string,
    params: TParams
  ): Promise<TResult> {
    const id = ++this.requestId;
    const body: JsonRpcRequest<TParams> = {
      jsonrpc: '2.0',
      id,
      method,
      params,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json() as JsonRpcResponse<TResult>;

      if (result.error) {
        throw new Error(
          `RPC error [${result.error.code}]: ${result.error.message}`
        );
      }

      return result.result as TResult;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error(`Request timeout after ${this.timeout}ms`);
        }
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  }

  setUrl(url: string): void {
    this.url = url;
  }

  getUrl(): string {
    return this.url;
  }
}
