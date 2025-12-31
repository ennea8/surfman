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
  error?: JsonRpcError;
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
