import NetInfo from '@react-native-community/netinfo';
import { NetworkState } from './networkTypes';
import { logger } from '@core/logging/logger';

export class NetworkService {
  private static instance: NetworkService;
  private currentState: NetworkState = {
    isConnected: true,
    isInternetReachable: true,
    type: 'online',
  };
  private listeners: Array<(state: NetworkState) => void> = [];

  private constructor() {
    this.initialize();
  }

  public static getInstance(): NetworkService {
    if (!NetworkService.instance) {
      NetworkService.instance = new NetworkService();
    }
    return NetworkService.instance;
  }

  private async initialize(): Promise<void> {
    try {
      const state = await NetInfo.fetch();
      this.updateState(state);
      NetInfo.addEventListener(this.handleNetworkChange);
    } catch (error) {
      logger.error('Failed to initialize network service', { error });
    }
  }

  private handleNetworkChange = (state: unknown): void => {
    this.updateState(state);
  };

  private updateState(state: unknown): void {
    const netInfoState = state as {
      isConnected?: boolean;
      isInternetReachable?: boolean;
      type?: string;
    };

    this.currentState = {
      isConnected: netInfoState.isConnected ?? true,
      isInternetReachable: netInfoState.isInternetReachable ?? true,
      type: netInfoState.isConnected ? 'online' : 'offline',
    };

    this.notifyListeners();
  }

  public getState(): NetworkState {
    return { ...this.currentState };
  }

  public isOnline(): boolean {
    return this.currentState.isConnected && this.currentState.isInternetReachable;
  }

  public addListener(listener: (state: NetworkState) => void): () => void {
    this.listeners.push(listener);
    listener(this.getState());

    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.getState());
      } catch (error) {
        logger.error('Network listener error', { error });
      }
    });
  }
}

export const networkService = NetworkService.getInstance();

export default networkService;
