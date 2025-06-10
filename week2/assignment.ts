//httpClient.ts

// 퍼사드 패턴
import axios, {AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';

export class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 5000,
      headers: {'Content-Type': 'application/json'},
    });

    // 옵저버 패턴
    this.axiosInstance.interceptors.request.use(this.requestInterceptor);
    this.axiosInstance.interceptors.response.use(
      this.responseInterceptor,
      this.rejectInterceptor
    );
  }

  private requestInterceptor = (config: InternalAxiosRequestConfig) => {
    // 요청 인터셉터 처리(액세스 토큰 담기 등)
    return config;
  }

  private responseInterceptor = (response: AxiosResponse) => {
    return Promise.resolve(response);
  };

  private rejectInterceptor = (error: AxiosError) => {
    // 에러 처리
    return Promise.reject(error);
  };

  // GET
  async get<T>(url: string) {
    return this.axiosInstance.get<Promise<T>>(url).then(res => res.data);
  }

  // POST
  async post<T>(url: string, data?: any) {
    return this.axiosInstance.post<Promise<T>>(url, data)
  }

  // 추가 HTTP 메서드...

}

// 싱글톤
export const httpClient = new HttpClient(process.env.API_BASE_URL || '');


// main.tsx
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// 싱글톤 패턴
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 3,
    },
    mutations: {
      retry: 1,
    },
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 앱 컴포넌트 */}
    </QueryClientProvider>
  );
}

// queries.ts
import { useQuery } from '@tanstack/react-query';
// import { httpClient } from './httpClient';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

// 응답 데이터 캐싱
export const todoQueris = {
  getTodos: () => useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: () => httpClient.get<Todo[]>('/todos'),
  }),
  // post 등 todo 관련 tanstack query
}

// component.tsx
const { data: todos, isLoading } = todoQueris.getTodos();