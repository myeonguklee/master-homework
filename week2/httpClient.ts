// 퍼사드 패턴
import axios, {AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig} from 'axios';

type CacheKey = string;

interface CachedResponse<T = any> {
  data: T;
  timestamp: number;
}

class HttpClient {
  private axiosInstance: AxiosInstance;
  private cache: Map<CacheKey, CachedResponse> = new Map();
  private readonly cacheTimeout: number = 5 * 60 * 1000; // 5분

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 5000,
      headers: {'Content-Type': 'application/json'},
    });

    this.axiosInstance.interceptors.request.use(this.requestInterceptor);
    this.axiosInstance.interceptors.response.use(
      this.responseInterceptor,
      this.rejectInterceptor
    );
  }

  private generateCacheKey(config: AxiosRequestConfig): CacheKey {
    return `${config.method?.toUpperCase()}-${config.url}-${JSON.stringify(config.params || {})}`;
  }

  private isCacheValid(cachedResponse: CachedResponse): boolean {
    return Date.now() - cachedResponse.timestamp < this.cacheTimeout;
  }

  private requestInterceptor = (config: InternalAxiosRequestConfig) => {
    // 액세스 토큰 등 추가 처리
    const token = this.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // GET 요청의 경우 캐시 확인
    if (config.method?.toLowerCase() === 'get') {
      const cached = this.checkCache(config);
      if (cached) {
        // 캐시된 데이터를 Promise.reject로 전달하여 실제 요청을 건너뛰고 응답으로 처리
        return Promise.reject({ cached: true, data: cached });
      }
    }

    return config;
  }

  private responseInterceptor = (response: AxiosResponse) => {
    // GET 요청의 경우 캐시에 저장
    if (response.config.method?.toLowerCase() === 'get') {
      const cacheKey = this.generateCacheKey(response.config);
      this.cache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now()
      });
    }

    return response;
  };

  private rejectInterceptor = (error: AxiosError | any) => {
    // 캐시된 응답 처리
    if (error.cached) {
      return Promise.resolve({ data: error.data });
    }

    if (error.response) {
      // 서버 오류 (4xx, 5xx)
      throw {
        status: error.response.status,
        message: error.response.data?.message || "Server Error",
        data: error.response.data
      };
    } else if (error.request) {
      // 네트워크 오류
      throw {
        status: 0,
        message: "Network Error",
        data: null
      };
    } else {
      // 기타 오류
      throw {
        status: -1,
        message: error.message || "Unknown Error",
        data: null
      };
    }
  };

  private getAccessToken(): string | null {
    // 토큰 가져오기 로직 (localStorage, sessionStorage 등)
    return localStorage.getItem('accessToken');
  }

  private checkCache<T>(config: AxiosRequestConfig): T | null {
    const cacheKey = this.generateCacheKey(config);
    const cachedResponse = this.cache.get(cacheKey);

    if (cachedResponse && this.isCacheValid(cachedResponse)) {
      return cachedResponse.data;
    }

    // 만료된 캐시 제거
    if (cachedResponse) {
      this.cache.delete(cacheKey);
    }

    return null;
  }

  // GET 요청 (캐시 지원)
  public async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, { params });
    return response.data;
  }

  // POST 요청
  public async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data);
    return response.data;
  }

  // PUT 요청
  public async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data);
    return response.data;
  }

  // DELETE 요청
  public async delete<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url);
    return response.data;
  }

  // PATCH 요청
  public async patch<T>(url: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data);
    return response.data;
  }

  // 캐시 관리 메서드
  public clearCache(): void {
    this.cache.clear();
  }

  public removeCacheEntry(url: string, params?: any): void {
    const cacheKey = this.generateCacheKey({ method: 'GET', url, params });
    this.cache.delete(cacheKey);
  }
}

// 싱글톤 인스턴스 생성
export const httpClient = new HttpClient('');