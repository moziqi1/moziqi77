
import { useNavigate } from 'react-router-dom';
import { projects } from '../data';
import { useAppStore } from '../store';
import * as Icons from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { completedProjects, userName, logout } = useAppStore();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle, #1e40af 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
      
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Icons.BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-gray-900 text-lg">商务数据分析</span>
              </div>
              {userName ? (
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
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  <Icons.LogIn className="w-5 h-5" />
                  <span>登录</span>
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="pt-16 pb-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-blue-600 rounded-full mb-8 shadow-sm border border-blue-100">
              <Icons.Zap className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold">实战课程 · 无需安装</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-violet-600 bg-clip-text text-transparent mb-6">
              商务数据分析
              <span className="block mt-2 text-center">学习网站</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              专为商务数据分析与应用专业打造，10个精选项目，从基础到进阶，完全在浏览器中运行代码，让你从零开始掌握商务数据分析核心技能。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="group flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Icons.Database className="w-5 h-5" />
                </div>
                <span className="text-gray-700 font-medium">真实数据集</span>
              </div>
              <div className="group flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-cyan-200 hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Icons.Terminal className="w-5 h-5" />
                </div>
                <span className="text-gray-700 font-medium">实时运行代码</span>
              </div>
              <div className="group flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-purple-200 hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Icons.BookOpen className="w-5 h-5" />
                </div>
                <span className="text-gray-700 font-medium">循序渐进</span>
              </div>
              <div className="group flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-amber-200 hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Icons.Award className="w-5 h-5" />
                </div>
                <span className="text-gray-700 font-medium">证书认证</span>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Icons.BookMarked className="w-6 h-6 text-amber-500" />
                <h2 className="text-2xl font-bold text-gray-900">精选项目</h2>
              </div>
              <span className="text-gray-500 bg-white px-3 py-1 rounded-lg border border-gray-200">
                共 {projects.length} 个项目
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => {
                const IconComponent = (Icons as any)[project.icon] || Icons.Circle;
                const isCompleted = completedProjects.includes(project.id);
                const colors = [
                  'from-blue-500 to-indigo-600',
                  'from-green-500 to-emerald-600',
                  'from-purple-500 to-violet-600',
                  'from-orange-500 to-amber-600',
                  'from-pink-500 to-rose-600',
                  'from-cyan-500 to-teal-600',
                  'from-red-500 to-rose-600',
                  'from-indigo-500 to-purple-600',
                  'from-teal-500 to-green-600',
                  'from-amber-500 to-orange-600',
                ];
                const hoverColors = [
                  'hover:border-blue-200',
                  'hover:border-green-200',
                  'hover:border-purple-200',
                  'hover:border-orange-200',
                  'hover:border-pink-200',
                  'hover:border-cyan-200',
                  'hover:border-red-200',
                  'hover:border-indigo-200',
                  'hover:border-teal-200',
                  'hover:border-amber-200',
                ];

                return (
                  <div
                    key={project.id}
                    onClick={() => navigate(`/project/${project.id}`)}
                    className={`group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-md hover:shadow-xl ${hoverColors[index]} hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${colors[index]} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className={`px-3 py-1.5 bg-gradient-to-r ${colors[index]} text-white rounded-full text-sm font-semibold`}>
                          项目{['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][index]}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2 group-hover:from-blue-600 group-hover:to-indigo-600 transition-all">
                        {project.title}
                      </h3>

                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.topics.slice(0, 3).map((topic, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs rounded-full font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                        {project.topics.length > 3 && (
                          <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                            +{project.topics.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Icons.CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-green-500' : 'text-gray-300'}`} />
                          <span>{isCompleted ? '已完成' : '未开始'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-blue-600 font-semibold text-sm group-hover:gap-2 group-hover:text-indigo-600 transition-all">
                          开始学习
                          <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
