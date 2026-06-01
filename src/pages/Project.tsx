
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';
import { projects } from '../data';
import { useAppStore } from '../store';
import * as Icons from 'lucide-react';

declare global {
  interface Window {
    loadPyodide: any;
  }
}

export default function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === parseInt(id || '0'));
  const { markProjectComplete, saveExerciseResult, saveExamResult, userName, logout } = useAppStore();

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [pyodide, setPyodide] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'knowledge' | 'code' | 'exercise' | 'exam'>('knowledge');

  // Exercise state
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<number, number>>({});
  const [exerciseSubmitted, setExerciseSubmitted] = useState<Record<number, boolean>>({});

  // Exam state
  const [examAnswers, setExamAnswers] = useState<Record<number, number | string>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examCode, setExamCode] = useState<Record<number, string>>({});

  useEffect(() => {
    if (project) {
      setCode(project.codeExample);
    }
  }, [project]);

  useEffect(() => {
    async function initPyodide() {
      try {
        const pyodideInstance = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/'
        });
        setPyodide(pyodideInstance);
      } catch (error) {
        console.error('Pyodide加载失败:', error);
      }
    }
    initPyodide();
  }, []);

  const runCode = async () => {
    if (!pyodide) {
      setOutput('正在加载Python环境...');
      return;
    }

    setIsRunning(true);
    setOutput('运行中...');

    try {
      pyodide.runPython(`
        import sys
        from io import StringIO
        sys.stdout = StringIO()
      `);

      pyodide.runPython(code);

      const result = pyodide.runPython('sys.stdout.getvalue()');
      setOutput(result || '代码执行完成，无输出。');
    } catch (error: any) {
      setOutput(`错误: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleExerciseAnswer = (exerciseId: number, answerIndex: number) => {
    setExerciseAnswers(prev => ({ ...prev, [exerciseId]: answerIndex }));
  };

  const submitExercise = (exerciseId: number, correctAnswer: number) => {
    const userAnswer = exerciseAnswers[exerciseId];
    const isCorrect = userAnswer === correctAnswer;
    saveExerciseResult(exerciseId, isCorrect);
    setExerciseSubmitted(prev => ({ ...prev, [exerciseId]: true }));
  };

  const handleExamAnswer = (questionId: number, answer: number | string) => {
    setExamAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleExamCode = (questionId: number, code: string) => {
    setExamCode(prev => ({ ...prev, [questionId]: code }));
  };

  const submitExam = async () => {
    if (!project) return;

    let score = 0;
    const totalQuestions = project.exam.length;

    for (const question of project.exam) {
      if (question.type === 'multiple' && question.correctAnswer !== undefined) {
        if (examAnswers[question.id] === question.correctAnswer) {
          score++;
        }
      } else if (question.type === 'code') {
        score++;
      }
    }

    const finalScore = Math.round((score / totalQuestions) * 100);
    saveExamResult(project.id, finalScore);
    markProjectComplete(project.id);
    setExamSubmitted(true);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icons.AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-700 mb-2">项目未找到</h2>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const IconComponent = (Icons as any)[project.icon] || Icons.Circle;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Icons.ArrowLeft className="w-5 h-5" />
              <span>返回</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <IconComponent className="w-4 h-4 text-blue-600" />
              </div>
              <h1 className="font-bold text-gray-900">{project.title}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-xl">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                  {userName?.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700 font-medium">{userName}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Icons.LogOut className="w-5 h-5" />
                <span>退出</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {[
              { id: 'knowledge', label: '知识点', icon: Icons.BookOpen },
              { id: 'code', label: '代码练习', icon: Icons.Terminal },
              { id: 'exercise', label: '练习题', icon: Icons.Pencil },
              { id: 'exam', label: '考试', icon: Icons.Award }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'knowledge' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">项目概述</h2>
                <p className="text-gray-600 leading-relaxed">{project.description}</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">核心知识点</h2>
                <div className="space-y-4">
                  {project.knowledge.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-4">学习目标</h3>
                <ul className="space-y-2 text-sm text-blue-100">
                  {project.topics.map((topic, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Icons.CheckCircle2 className="w-4 h-4" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setActiveTab('code')}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Icons.Code className="w-5 h-5" />
                开始代码练习
              </button>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <div className="bg-gray-900 rounded-2xl overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-gray-400 text-sm ml-2">main.py</span>
                </div>
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-4 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  {isRunning ? <Icons.Loader2 className="w-4 h-4 animate-spin" /> : <Icons.Play className="w-4 h-4" />}
                  {isRunning ? '运行中...' : '运行'}
                </button>
              </div>
              <div className="flex-1 overflow-auto">
                <Editor
                  value={code}
                  onValueChange={setCode}
                  highlight={code => highlight(code, languages.python, 'python')}
                  padding={16}
                  className="font-mono text-sm"
                  style={{
                    fontFamily: '"Fira Code", "Fira Mono", monospace',
                    minHeight: '100%'
                  }}
                  textareaClassName="focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 h-full">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-700">输出</span>
                  <button
                    onClick={() => setOutput('')}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Icons.Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 p-4 overflow-auto">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">{output || '点击"运行"按钮执行代码'}</pre>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Icons.Lightbulb className="w-4 h-4 text-amber-500" />
                  提示
                </h4>
                <p className="text-sm text-gray-500">
                  尝试修改代码，运行查看效果。你可以自由编辑这段代码来探索各种可能性。
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exercise' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {project.exercises.map((exercise) => {
              const isSubmitted = exerciseSubmitted[exercise.id];
              const userAnswer = exerciseAnswers[exercise.id];
              const isCorrect = userAnswer === exercise.correctAnswer;

              return (
                <div key={exercise.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      练习 {exercise.id}: {exercise.question}
                    </h3>
                    {isSubmitted && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {isCorrect ? '正确 ✓' : '错误 ✗'}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 mb-4">
                    {exercise.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => !isSubmitted && handleExerciseAnswer(exercise.id, index)}
                        disabled={isSubmitted}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          isSubmitted
                            ? index === exercise.correctAnswer
                              ? 'border-green-500 bg-green-50'
                              : index === userAnswer
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 bg-gray-50 opacity-50'
                            : userAnswer === index
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <span className="font-medium">{String.fromCharCode(65 + index)}. </span>
                        {option}
                      </button>
                    ))}
                  </div>

                  {isSubmitted && (
                    <div className={`p-4 rounded-xl ${isCorrect ? 'bg-green-50' : 'bg-amber-50'}`}>
                      <p className="text-sm font-medium text-gray-700 mb-1">解析:</p>
                      <p className="text-sm text-gray-600">{exercise.explanation}</p>
                    </div>
                  )}

                  {!isSubmitted && (
                    <button
                      onClick={() => submitExercise(exercise.id, exercise.correctAnswer)}
                      disabled={userAnswer === undefined}
                      className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      提交答案
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'exam' && (
          <div className="max-w-3xl mx-auto">
            {examSubmitted ? (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icons.CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">考试完成!</h2>
                <p className="text-gray-600 mb-8">你已经完成了这个项目的考试</p>
                <button
                  onClick={() => navigate('/')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  返回项目列表
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {project.exam.map((question) => (
                  <div key={question.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      问题 {question.id}: {question.question}
                    </h3>

                    {question.type === 'multiple' && question.options && (
                      <div className="space-y-3">
                        {question.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleExamAnswer(question.id, index)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                              examAnswers[question.id] === index
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <span className="font-medium">{String.fromCharCode(65 + index)}. </span>
                            {option}
                          </button>
                        ))}
                      </div>
                    )}

                    {question.type === 'code' && question.codePrompt && (
                      <div className="space-y-4">
                        <div className="bg-gray-900 rounded-xl overflow-hidden">
                          <Editor
                            value={examCode[question.id] || question.codePrompt}
                            onValueChange={(code) => handleExamCode(question.id, code)}
                            highlight={code => highlight(code, languages.python, 'python')}
                            padding={16}
                            className="font-mono text-sm"
                            style={{ fontFamily: '"Fira Code", "Fira Mono", monospace' }}
                            textareaClassName="focus:outline-none"
                          />
                        </div>
                        {question.expectedOutput && (
                          <p className="text-sm text-gray-500">
                            提示: 预期输出类似 "{question.expectedOutput}"
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                <button
                  onClick={submitExam}
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                >
                  提交考试
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
