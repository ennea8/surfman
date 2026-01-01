export interface JsonRpcRequest<T = any> {
  jsonrpc: '2.0';
  id: number | string;
  method: string;
  params: T;
}

export interface JsonRpcResponse<T = any> {
  jsonrpc: '2.0';
  id: number | string;
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

export interface JsonRpcError {
  code: number;
  message: string;
  data?: any;
}

export interface RpcClientConfig {
  url: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface RpcResponseContext {
  slot: number;
  apiVersion?: string;
}

export interface RpcResponse<T> {
  context: RpcResponseContext;
  value: T;
}
