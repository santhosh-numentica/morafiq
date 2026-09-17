export type NetworkStatus = 'online' | 'offline' | 'unknown';

export interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean;
  type: NetworkStatus;
}
