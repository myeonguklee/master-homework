import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // 에러 상태 업데이트
    return { hasError: true, error: error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 정보 로깅
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ error: error, errorInfo: errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      //에러 발생시 폴백 UI 렌더링
      return (
        <div style={{ padding: '20px', border: '1px solid red', borderRadius: '5px', backgroundColor: '#ffe6e6', color: '#cc0000' }}>
          <h2>😅 이런, 문제가 발생했습니다.</h2>
          <p>애플리케이션을 다시 시도하거나 잠시 후 다시 방문해 주세요.</p>
          {this.state.error && (
            <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
              <summary>자세한 에러 정보</summary>
              <p>{this.state.error.message}</p>
              <p>{this.state.errorInfo?.componentStack}</p>
            </details>
          )}
        </div>
      );
    }

    //자식 컴포넌트 렌더링
    return this.props.children;
  }
}