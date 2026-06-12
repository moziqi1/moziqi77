
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
  const [activeTab, setActiveTab] = useState<'learning' | 'exercise' | 'exam'>('learning');

  // Exercise state
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<number, number>>({});
  const [exerciseSubmitted, setExerciseSubmitted] = useState<Record<number, boolean>>({});

  // Exam state
  const [examAnswers, setExamAnswers] = useState<Record<number, number | string>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examCode, setExamCode] = useState<Record<number, string>>({});
  const [examStartTime, setExamStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 minutes in seconds
  const [examStarted, setExamStarted] = useState(false); // Track if exam has started

  // 根据项目ID获取流程概述
  const getProjectFlow = (projectId: number): string[] => {
    const flows: Record<number, string[]> = {
      1: [
        '导入必要的库（pandas、numpy）',
        '使用 pd.read_csv() 读取数据文件',
        '使用 head()、info()、describe() 探索数据',
        '使用 isnull() 检测缺失值',
        '选择合适的策略填充缺失值',
        '使用 IQR 或 Z-score 检测异常值',
        '处理检测到的异常值',
        '验证清洗后的数据质量',
        '保存清洗后的数据'
      ],
      2: [
        '导入必要的库并读取数据',
        '使用 groupby() 按指定列分组',
        '选择聚合函数（sum、mean、count等）',
        '使用 agg() 进行多指标聚合',
        '使用 pivot_table() 创建透视表',
        '筛选和排序聚合结果',
        '可视化展示分析结果',
        '解读业务洞察'
      ],
      3: [
        '将交易数据转换为项集格式',
        '计算每个项集的支持度',
        '筛选频繁项集',
        '生成关联规则',
        '计算置信度和提升度',
        '筛选有价值的规则',
        '可视化展示关联关系',
        '转化为业务建议'
      ],
      4: [
        '收集和整合客户数据',
        '进行数据预处理和标准化',
        '确定聚类数量K',
        '初始化聚类中心',
        '计算距离并分配样本',
        '更新聚类中心',
        '迭代直到收敛',
        '分析和解读聚类结果'
      ],
      5: [
        '整理和清洗可视化数据',
        '选择合适的图表类型',
        '绘制基础图表',
        '添加标题、标签、图例',
        '美化图表样式和颜色',
        '调整布局和比例',
        '添加交互功能',
        '导出和分享图表'
      ],
      6: [
        '设计实验方案',
        '划分对照组和实验组',
        '收集实验数据',
        '进行描述性统计分析',
        '计算t统计量和p值',
        '判断统计显著性',
        '计算置信区间',
        '给出实验结论'
      ],
      7: [
        '整理时间序列数据',
        '绘制时间序列图',
        '计算移动平均',
        '分析趋势和季节性',
        '进行自相关分析',
        '选择合适的预测模型',
        '进行预测',
        '评估预测准确性'
      ],
      8: [
        '理解业务需求',
        '进行数据探索',
        '处理缺失值',
        '进行标准化和归一化',
        '编码类别特征',
        '进行特征选择',
        '构建新特征',
        '验证特征有效性'
      ],
      9: [
        '探索数据分布',
        '计算统计指标',
        '绘制箱线图',
        '使用IQR方法检测',
        '使用Z-score方法检测',
        '分析异常原因',
        '选择处理策略',
        '验证处理效果'
      ],
      10: [
        '理解数据关系',
        '识别主键字段',
        '检查数据质量',
        '选择合并方式',
        '执行合并操作',
        '处理重复列',
        '验证合并结果',
        '保存合并数据'
      ]
    };
    return flows[projectId] || flows[1];
  };

  // 根据项目ID获取注意事项
  const getProjectTips = (projectId: number): string[] => {
    const tips: Record<number, string[]> = {
      1: [
        '删除缺失值会导致数据量减少，应优先考虑填充',
        '数值型缺失值常用均值或中位数填充，偏态数据建议用中位数',
        '类别型缺失值可用众数或"未知"类别填充',
        '删除行前先评估缺失比例，超过30%需谨慎处理',
        '重要字段的缺失值最好用业务逻辑填充而非简单删除',
        '填充后记得检查数据分布是否发生显著变化',
        '异常值不一定是错误，有时反而包含重要信息',
        '不同检测方法可能得到不同结果，需结合业务判断'
      ],
      2: [
        '分组键可以是单列或多列的组合',
        '聚合函数可以同时使用多个，如agg({"col": ["sum", "mean"]})',
        '使用as_index=False可以让分组列不成为索引',
        '透视表支持聚合函数的自定义',
        '交叉表用于统计两个分类变量之间的频数关系',
        'groupby操作会产生新的DataFrame，不影响原数据'
      ],
      3: [
        '支持度表示项集出现的频率，过低的支持度规则可能无实际意义',
        '置信度高不代表因果关系，需结合提升度判断',
        '提升度大于1表示正相关，等于1表示独立，小于1表示负相关',
        '项集过多时需设置最小支持度阈值过滤',
        '关联规则挖掘适合发现频繁出现的模式，不适合稀有事件',
        '结果需结合业务场景解读，避免产生无意义的关联'
      ],
      4: [
        '聚类前必须对数据进行标准化，否则不同量纲会影响结果',
        'K值的选择应结合业务理解和数学方法（肘部法则）',
        'K-Means对离群点敏感，可先用异常值检测处理',
        '多次运行取最优结果，因为初始化会影响最终聚类',
        '聚类结果需要人工解读和标签化',
        '验证聚类质量可用轮廓系数，值越接近1越好'
      ],
      5: [
        '图表类型选择要匹配数据特征：趋势用折线图，比较用柱状图，关系用散点图',
        '避免在一个图表中展示过多数据点，保持简洁清晰',
        '颜色使用要一致且有区分度，避免使用过多颜色',
        '标题和标签要准确描述数据内容',
        '图表比例要适当，避免视觉误导',
        '确保图表在不同设备上都能正常显示'
      ],
      6: [
        '样本量越大，统计检验的功效越高',
        'p值小于0.05通常被认为是统计显著',
        '显著不一定意味着重要，需结合效应量判断',
        'A/B测试需要排除其他干扰因素的影响',
        '实验时间要足够长，覆盖完整周期',
        '多组比较需使用方差分析等方法'
      ],
      7: [
        '时间序列数据必须按时间顺序排列',
        '缺失的时间点需要补充或插值处理',
        '移动平均的窗口大小影响平滑程度和滞后性',
        '趋势分析需区分长期趋势和短期波动',
        '季节性数据需要周期性分解才能准确预测',
        '预测模型需要不断更新和验证'
      ],
      8: [
        '标准化不影响特征间的关系，只是改变了数据的尺度',
        '归一化将数据缩放到[0,1]区间，适合特定算法',
        '独热编码会产生高维稀疏矩阵，需注意维度灾难',
        '特征选择不是越多越好，相关特征可能引入噪声',
        '领域知识在特征工程中非常重要',
        '构造的新特征要有可解释性和业务意义'
      ],
      9: [
        '异常值不一定是错误，有时反而包含重要信息',
        '不同的检测方法可能得到不同的结果',
        'Z-score方法假设数据服从正态分布',
        'IQR方法对数据分布没有要求，但可能遗漏边界附近的异常',
        '删除异常值前要确认其确实是错误的',
        '异常值处理后需重新验证数据分布'
      ],
      10: [
        '不同的合并方式会产生不同的结果，谨慎选择',
        '合并键最好没有重复值和缺失值',
        '合并后可能出现重复列名，需用suffixes参数区分',
        '大数据集合并时注意内存使用',
        '合并顺序会影响结果，特别是外连接',
        '合并后要检查是否有意外的数据丢失'
      ]
    };
    return tips[projectId] || tips[1];
  };

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
      setOutput('正在加载Python环境，请稍候...\n首次加载可能需要10-20秒。');
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

  // Start exam function
  const startExam = () => {
    setExamStarted(true);
    setExamStartTime(Date.now());
    setTimeLeft(15 * 60); // Reset to 15 minutes
  };

  // Reset exam function
  const resetExam = () => {
    setExamAnswers({});
    setExamCode({});
    setExamSubmitted(false);
    setExamStarted(false);
    setExamStartTime(null);
    setTimeLeft(15 * 60); // Reset to 15 minutes
  };

  // Timer effect for exam - only start when examStarted is true
  useEffect(() => {
    if (activeTab === 'exam' && !examSubmitted && examStarted && examStartTime === null) {
      setExamStartTime(Date.now());
      setTimeLeft(15 * 60); // Reset to 15 minutes
    }
  }, [activeTab, examSubmitted, examStarted, examStartTime]);

  useEffect(() => {
    if (activeTab !== 'exam' || examSubmitted || !examStarted || examStartTime === null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit when time runs out
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTab, examSubmitted, examStarted, examStartTime]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
    setExamStartTime(null); // Reset timer state
    setExamStarted(false); // Reset exam started state
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
              { id: 'learning', label: '学习中心', icon: Icons.BookOpen },
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
        {activeTab === 'learning' && (
          <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
            {/* 左侧：知识点 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Icons.BookOpen className="w-5 h-5" />
                  {project.title} - 知识点详解
                </h2>
              </div>
              <div className="flex-1 overflow-auto p-6 space-y-6">
                {/* 流程概述 */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                  <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <Icons.Layers className="w-5 h-5" />
                    流程概述
                  </h3>
                  <div className="space-y-2">
                    {getProjectFlow(project.id).map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 详细说明 */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                  <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                    <Icons.FileText className="w-5 h-5" />
                    详细说明
                  </h3>
                  <div className="space-y-3">
                    {project.knowledge.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 bg-white/60 rounded-lg p-3">
                        <Icons.CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                        <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 注意事项 */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100">
                  <h3 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
                    <Icons.AlertTriangle className="w-5 h-5" />
                    注意事项
                  </h3>
                  <div className="space-y-2">
                    {getProjectTips(project.id).map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Icons.AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                        <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 学习目标 */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
                  <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
                    <Icons.Target className="w-5 h-5" />
                    学习目标
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {project.topics.map((topic, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2">
                        <Icons.CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                        <span className="text-gray-700 text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：代码练习 */}
            <div className="flex flex-col gap-4">
              <div className="bg-gray-900 rounded-2xl overflow-hidden flex flex-col flex-1">
                <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-gray-400 text-sm ml-2">代码练习 - {project.title}</span>
                  </div>
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-4 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    {isRunning ? <Icons.Loader2 className="w-4 h-4 animate-spin" /> : <Icons.Play className="w-4 h-4" />}
                    {isRunning ? '运行中...' : '运行代码'}
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

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-h-[300px]">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <span className="font-medium text-gray-700 flex items-center gap-2">
                    <Icons.Terminal className="w-4 h-4" />
                    运行结果
                  </span>
                  <button
                    onClick={() => setOutput('')}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Icons.Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4 overflow-auto max-h-[240px]">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-gray-50 p-3 rounded-lg">
                    {output || '点击"运行代码"按钮执行代码'}
                  </pre>
                </div>
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
            {/* Start Exam Screen */}
            {!examStarted && !examSubmitted && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icons.Play className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">开始考试</h2>
                <p className="text-gray-600 mb-6">
                  {project.title} - 考试时间15分钟，共{project.exam.length}道题
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
                  <div className="flex items-start gap-3">
                    <Icons.AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <p className="font-medium mb-1">考试规则：</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>点击"开始考试"后计时器开始倒计时</li>
                        <li>考试时间15分钟，满分100分</li>
                        <li>提交后可查看正确答案和解析</li>
                        <li>超时将自动提交</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button
                  onClick={startExam}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                >
                  开始考试
                </button>
              </div>
            )}

            {/* Exam In Progress */}
            {examStarted && !examSubmitted && (
              <>
                {/* Timer Header */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icons.Clock className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700 font-medium">考试倒计时</span>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                    timeLeft <= 60 ? 'bg-red-100 text-red-700 animate-pulse' : 
                    timeLeft <= 300 ? 'bg-amber-100 text-amber-700' : 
                    'bg-green-100 text-green-700'
                  }`}>
                    <Icons.Timer className="w-5 h-5" />
                    <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
                  </div>
                </div>

                {/* Progress Info */}
                <div className="bg-blue-50 rounded-xl p-4 mb-6 flex items-center justify-between">
                  <span className="text-blue-800 font-medium">请完成所有题目</span>
                  <span className="text-blue-600">
                    已答题: {Object.keys(examAnswers).length} / {project.exam.length}
                  </span>
                </div>

                <div className="space-y-6">
                  {project.exam.map((question) => (
                    <div key={question.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        问题 {question.id}: {question.question}
                        {question.type === 'code' && (
                          <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">代码题</span>
                        )}
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
              </>
            )}

            {/* Exam Submitted - Show Results */}
            {examSubmitted && (
              <div className="space-y-6">
                {/* Score Summary */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icons.CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">考试完成!</h2>
                  <p className="text-gray-600 mb-4">你已经完成了{project.title}的考试</p>
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 rounded-xl">
                    <Icons.Star className="w-5 h-5 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-700">
                      {useAppStore.getState().examResults[project.id] || 0}分
                    </span>
                  </div>
                </div>

                {/* Questions Review */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Icons.FileText className="w-5 h-5" />
                    正确答案与解析
                  </h3>
                </div>

                {project.exam.map((question) => {
                  const userAnswer = examAnswers[question.id];
                  const isCorrect = question.type === 'multiple' 
                    ? userAnswer === question.correctAnswer 
                    : true; // Code questions are scored manually or marked correct by default

                  return (
                    <div key={question.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <div className="flex items-start gap-3 mb-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          question.type === 'multiple' && userAnswer === question.correctAnswer
                            ? 'bg-green-100' 
                            : question.type === 'code'
                            ? 'bg-purple-100'
                            : 'bg-red-100'
                        }`}>
                          {question.type === 'multiple' && userAnswer === question.correctAnswer ? (
                            <Icons.Check className="w-5 h-5 text-green-600" />
                          ) : question.type === 'code' ? (
                            <Icons.Code className="w-5 h-5 text-purple-600" />
                          ) : (
                            <Icons.X className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-2">
                            问题 {question.id}: {question.question}
                          </h4>
                          {question.type === 'code' && (
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">代码题</span>
                          )}
                        </div>
                      </div>

                      {/* Show user's answer and correct answer for multiple choice */}
                      {question.type === 'multiple' && question.options && (
                        <div className="space-y-2 ml-11">
                          <div className={`p-3 rounded-lg ${
                            userAnswer === question.correctAnswer 
                              ? 'bg-green-50 border border-green-200' 
                              : 'bg-red-50 border border-red-200'
                          }`}>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">你的答案：</span>
                              {userAnswer !== undefined 
                                ? `${String.fromCharCode(65 + (userAnswer as number))}. ${question.options[userAnswer as number]}`
                                : '未作答'
                              }
                            </p>
                          </div>
                          {userAnswer !== question.correctAnswer && (
                            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium text-green-700">正确答案：</span>
                                {`${String.fromCharCode(65 + question.correctAnswer)}. ${question.options[question.correctAnswer]}`}
                              </p>
                            </div>
                          )}
                          {/* Explanation */}
                          {question.explanation && (
                            <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 mt-3">
                              <p className="text-sm text-blue-800">
                                <span className="font-medium">解析：</span>
                                {question.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Show code question result */}
                      {question.type === 'code' && (
                        <div className="ml-11 space-y-3">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-sm text-gray-600 mb-2">
                              <span className="font-medium">你的代码：</span>
                            </p>
                            <pre className="text-xs text-gray-700 overflow-x-auto">
                              {(examCode[question.id] || question.codePrompt)}
                            </pre>
                          </div>
                          {question.expectedOutput && (
                            <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                              <p className="text-sm text-blue-800">
                                <span className="font-medium">预期输出：</span>
                                {question.expectedOutput}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="flex gap-4">
                  <button
                    onClick={resetExam}
                    className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-colors"
                  >
                    重新考试
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                  >
                    返回项目列表
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
