
## 1. Architecture Design
纯前端React应用，使用Vite构建工具，Tailwind CSS进行样式开发，集成代码编辑器和交互组件。

```mermaid
graph TB
    subgraph Frontend
        A[React App] --> B[React Router]
        A --> C[Tailwind CSS]
        A --> D[Lucide Icons]
        A --> E[Code Editor]
    end
    subgraph Services
        F[Pyodide] --> G[Python Runtime]
    end
    Frontend --&gt; Services
```

## 2. Technology Description
- Frontend: React@18 + TypeScript + tailwindcss@3 + vite
- Initialization Tool: vite-init
- Backend: None (纯前端应用)
- Python Runtime: Pyodide (浏览器端Python执行)
- Code Editor: react-simple-code-editor

## 3. Route Definitions
| Route | Purpose |
|-------|---------|
| / | 首页 - 项目概览和平台介绍 |
| /project/:id | 项目详情页 - 知识点、代码编辑器、练习、考试 |

## 4. API Definitions
无后端API，所有功能在前端实现。

## 5. Server Architecture Diagram
不适用（纯前端应用）

## 6. Data Model

### 6.1 项目数据结构
```typescript
interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  topics: string[];
  knowledge: string[];
  codeExample: string;
  exercises: Exercise[];
  exam: ExamQuestion[];
}

interface Exercise {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ExamQuestion {
  id: number;
  question: string;
  type: 'multiple' | 'code';
  options?: string[];
  correctAnswer?: number;
  codePrompt?: string;
  expectedOutput?: string;
}
```

### 6.2 状态管理
使用Zustand进行简单的状态管理，记录学习进度。

```typescript
interface AppState {
  currentProject: number | null;
  completedProjects: number[];
  exerciseResults: Record&lt;number, boolean&gt;;
  examResults: Record&lt;number, number&gt;;
  setCurrentProject: (id: number) =&gt; void;
  markProjectComplete: (id: number) =&gt; void;
  saveExerciseResult: (exerciseId: number, correct: boolean) =&gt; void;
  saveExamResult: (projectId: number, score: number) =&gt; void;
}
```
