# 과제 설명

```
week3/
├── component/                       
│   ├── ErrorBoundary.tsx            # LLM의 도움을 받아 구현
│   ├── TodoInput.tsx                
│   ├── TodoItem.tsx                 
│   ├── TodoList.tsx                 # 데이터 페칭 및 TodoList 렌더링 
│   ├── TodoListSkeleton.tsx         
│   ├── TodosContainer.tsx           # 컨테이너 컴포넌트(로직 및 상태 관리)
│   └── TodosPresenter.tsx           # 프레젠터 컴포넌트(UI)
│
├── app.jsx                          # query client 설정(suspense, errorboundary 설정 true)
├── assignment.md                    
├── queries.ts                       # API 관련 훅
└── type.ts                          # 공통 타입 정의
```