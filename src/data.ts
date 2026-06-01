
import { Project } from './types';

export const projects: Project[] = [
  {
    id: 1,
    title: '数据清洗实战',
    description: '学习如何处理缺失值、异常值和重复数据，掌握数据预处理的核心技巧',
    icon: 'Database',
    topics: ['缺失值处理', '异常值检测', '数据去重', '数据类型转换'],
    knowledge: [
      '使用Pandas的dropna()和fillna()方法',
      '使用describe()和info()查看数据概况',
      '处理重复数据的duplicated()和drop_duplicates()',
      '数据类型转换的astype()方法'
    ],
    codeExample: `import pandas as pd
import numpy as np

# 创建示例数据
data = {
    '姓名': ['张三', '李四', '王五', np.nan, '赵六'],
    '年龄': [25, 30, np.nan, 35, 28],
    '销售额': [1000, 2000, 1500, 3000, 2500],
    '城市': ['北京', '上海', '北京', '广州', '上海']
}

df = pd.DataFrame(data)

print("原始数据:")
print(df)
print("\\n缺失值统计:")
print(df.isnull().sum())

# 填充缺失值
df_clean = df.copy()
df_clean['姓名'] = df_clean['姓名'].fillna('未知')
df_clean['年龄'] = df_clean['年龄'].fillna(df_clean['年龄'].median())

print("\\n清洗后的数据:")
print(df_clean)`,
    exercises: [
      {
        id: 1,
        question: '在Pandas中，用于查看缺失值的方法是？',
        options: ['isnull()', 'dropna()', 'fillna()', 'drop()'],
        correctAnswer: 0,
        explanation: 'isnull()用于检测缺失值，返回布尔值DataFrame'
      },
      {
        id: 2,
        question: '下列哪个方法用于填充缺失值？',
        options: ['dropna()', 'fillna()', 'isna()', 'drop()'],
        correctAnswer: 1,
        explanation: 'fillna()方法用于填充缺失值'
      },
      {
        id: 3,
        question: '处理重复数据时，常用的方法组合是？',
        options: ['duplicated()和drop_duplicates()', 'drop()和dropna()', 'fillna()和drop()', 'isnull()和notnull()'],
        correctAnswer: 0,
        explanation: 'duplicated()检测重复，drop_duplicates()删除重复'
      }
    ],
    exam: [
      {
        id: 1,
        question: '编写一个Python函数，接收一个DataFrame，返回缺失值统计',
        type: 'code',
        codePrompt: 'import pandas as pd\n\ndef count_missing(df):\n    # 你的代码\n    pass\n\n# 测试数据\ndata = {\'A\': [1, 2, None, 4], \'B\': [None, 2, 3, None]}\ndf = pd.DataFrame(data)\nprint(count_missing(df))',
        expectedOutput: 'A    1\nB    2\ndtype: int64'
      },
      {
        id: 2,
        question: '在数据清洗中，不建议使用的方法是？',
        type: 'multiple',
        options: ['使用中位数填充数值型缺失值', '使用众数填充类别型缺失值', '直接删除所有含缺失值的行', '使用插值法填充'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 2,
    title: '分组聚合分析',
    description: '掌握groupby和聚合函数，实现数据分组统计分析',
    icon: 'BarChart3',
    topics: ['分组统计', '聚合函数', '透视表', '交叉表'],
    knowledge: [
      'groupby()的基本用法',
      '常用聚合函数：sum(), mean(), count()',
      'pivot_table()透视表',
      'crosstab()交叉表'
    ],
    codeExample: `import pandas as pd

# 销售数据
data = {
    '产品': ['A', 'B', 'A', 'B', 'A', 'B'],
    '地区': ['华东', '华东', '华北', '华北', '华南', '华南'],
    '销量': [100, 150, 120, 180, 90, 130],
    '销售额': [1000, 2250, 1200, 2700, 900, 1950]
}

df = pd.DataFrame(data)

print("原始数据:")
print(df)

# 按产品分组统计
print("\\n按产品分组的平均销量:")
print(df.groupby('产品')['销量'].mean())

# 多分组聚合
print("\\n按产品和地区分组统计:")
result = df.groupby(['产品', '地区']).agg({
    '销量': ['sum', 'mean'],
    '销售额': 'sum'
})
print(result)`,
    exercises: [
      {
        id: 1,
        question: 'Pandas中用于分组的函数是？',
        options: ['group()', 'groupby()', 'aggregate()', 'pivot()'],
        correctAnswer: 1,
        explanation: 'groupby()是Pandas用于分组操作的核心函数'
      },
      {
        id: 2,
        question: '下列哪个不是常用的聚合函数？',
        options: ['sum()', 'mean()', 'max()', 'add()'],
        correctAnswer: 3,
        explanation: 'add()不是聚合函数，其他都是'
      },
      {
        id: 3,
        question: '创建透视表的函数是？',
        options: ['pivot()', 'pivot_table()', 'table()', 'cross()'],
        correctAnswer: 1,
        explanation: 'pivot_table()用于创建透视表'
      }
    ],
    exam: [
      {
        id: 1,
        question: '使用groupby计算各产品的总销售额',
        type: 'code',
        codePrompt: 'import pandas as pd\n\ndata = {\n    \'产品\': [\'A\', \'B\', \'A\', \'B\'],\n    \'销售额\': [1000, 2000, 1500, 2500]\n}\ndf = pd.DataFrame(data)\n\n# 你的代码\nresult = df.groupby(\'产品\')[\'销售额\'].sum()\nprint(result)',
        expectedOutput: '产品\nA    2500\nB    4500\nName: 销售额, dtype: int64'
      },
      {
        id: 2,
        question: 'agg()方法可以同时应用多个聚合函数',
        type: 'multiple',
        options: ['正确', '错误'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 3,
    title: '购物篮分析',
    description: '学习关联规则挖掘，Apriori算法基础',
    icon: 'ShoppingCart',
    topics: ['关联规则', '支持度', '置信度', '提升度'],
    knowledge: [
      '关联规则基本概念',
      '支持度、置信度、提升度计算',
      '频繁项集挖掘',
      '关联规则解读'
    ],
    codeExample: `import pandas as pd
from itertools import combinations

# 购物篮数据
transactions = [
    ['牛奶', '面包', '啤酒'],
    ['面包', '啤酒', '尿布'],
    ['牛奶', '面包', '尿布', '啤酒'],
    ['牛奶', '面包'],
    ['牛奶', '啤酒']
]

print("购物篮数据:")
for i, t in enumerate(transactions, 1):
    print(f"交易{i}: {t}")

# 简单计算支持度
def support(itemset, transactions):
    count = 0
    for t in transactions:
        if set(itemset).issubset(set(t)):
            count += 1
    return count / len(transactions)

print("\\n支持度:")
print(f"{{啤酒}}: {support(['啤酒'], transactions):.2f}")
print(f"{{牛奶, 面包}}: {support(['牛奶', '面包'], transactions):.2f}")`,
    exercises: [
      {
        id: 1,
        question: '在关联规则中，"如果买了A就买了B"这一规则的支持度是指？',
        options: ['同时买A和B的比例', '买A后买B的条件概率', '规则的强度', '商品A的销量'],
        correctAnswer: 0,
        explanation: '支持度是同时包含A和B的交易占总交易的比例'
      },
      {
        id: 2,
        question: '置信度的计算公式是？',
        options: ['P(A∩B)', 'P(B|A)', 'P(A|B)', 'P(A)+P(B)'],
        correctAnswer: 1,
        explanation: '置信度=P(B|A)=支持度(A→B)/支持度(A)'
      },
      {
        id: 3,
        question: '提升度大于1表示？',
        options: ['A和B负相关', 'A和B正相关', 'A和B独立', '规则无意义'],
        correctAnswer: 1,
        explanation: '提升度>1表示A和B正相关，规则有效'
      }
    ],
    exam: [
      {
        id: 1,
        question: '计算商品组合的支持度',
        type: 'code',
        codePrompt: '# 计算支持度函数\ndef support(itemset, transactions):\n    count = 0\n    for t in transactions:\n        if set(itemset).issubset(set(t)):\n            count += 1\n    return count / len(transactions)\n\ntransactions = [\n    [\'A\', \'B\'], [\'A\', \'C\'], [\'A\', \'B\', \'C\']\n]\nprint(support([\'A\', \'B\'], transactions))',
        expectedOutput: '0.6666666666666666'
      },
      {
        id: 2,
        question: '提升度为1表示A和B',
        type: 'multiple',
        options: ['正相关', '负相关', '独立', '完全相关'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 4,
    title: '客户聚类分析',
    description: '使用K-Means聚类实现客户细分',
    icon: 'Users',
    topics: ['K-Means算法', '特征标准化', '聚类可视化', '客户画像'],
    knowledge: [
      'K-Means聚类原理',
      '数据标准化处理',
      '肘部法则确定K值',
      '聚类结果可视化'
    ],
    codeExample: `import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

# 客户数据
np.random.seed(42)
data = {
    '年度消费': np.random.randint(1000, 10000, 100),
    '消费频率': np.random.randint(1, 50, 100),
    '平均客单价': np.random.randint(50, 500, 100)
}

df = pd.DataFrame(data)

print("客户数据前5行:")
print(df.head())

# 数据标准化
scaler = StandardScaler()
scaled_data = scaler.fit_transform(df)

# K-Means聚类
kmeans = KMeans(n_clusters=3, random_state=42)
df['聚类'] = kmeans.fit_predict(scaled_data)

print("\\n聚类结果统计:")
print(df.groupby('聚类').mean())`,
    exercises: [
      {
        id: 1,
        question: 'K-Means聚类中，K表示？',
        options: ['样本数', '特征数', '聚类数', '迭代次数'],
        correctAnswer: 2,
        explanation: 'K表示要划分的聚类数量'
      },
      {
        id: 2,
        question: '聚类前通常需要对数据进行？',
        options: ['归一化/标准化', '降维', '增加特征', '删除样本'],
        correctAnswer: 0,
        explanation: '不同尺度特征会影响聚类效果'
      },
      {
        id: 3,
        question: '肘部法则用于？',
        options: ['确定K值', '评估聚类质量', '选择特征', '优化算法'],
        correctAnswer: 0,
        explanation: '肘部法则帮助选择合适的聚类数K'
      }
    ],
    exam: [
      {
        id: 1,
        question: '创建简单K-Means聚类',
        type: 'code',
        codePrompt: 'from sklearn.cluster import KMeans\nimport numpy as np\n\nX = np.array([[1, 2], [1, 4], [1, 0],\n                [10, 2], [10, 4], [10, 0]])\n\nkmeans = KMeans(n_clusters=2, random_state=0)\nlabels = kmeans.fit_predict(X)\nprint(labels)',
        expectedOutput: '[1 1 1 0 0 0]'
      },
      {
        id: 2,
        question: 'K-Means对异常值敏感',
        type: 'multiple',
        options: ['正确', '错误'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 5,
    title: '数据可视化',
    description: '使用Matplotlib和Seaborn创建商务图表',
    icon: 'LineChart',
    topics: ['折线图', '柱状图', '散点图', '热力图'],
    knowledge: [
      'Matplotlib基础绘图',
      'Seaborn高级可视化',
      '图表美化技巧',
      '多图表组合'
    ],
    codeExample: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# 设置样式
sns.set_style('whitegrid')
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 销售数据
months = ['1月', '2月', '3月', '4月', '5月', '6月']
sales = [120, 150, 130, 180, 160, 200]

# 创建图表
fig, axes = plt.subplots(1, 2, figsize=(12, 4))

# 折线图
axes[0].plot(months, sales, marker='o', linewidth=2, color='#3b82f6')
axes[0].set_title('月度销售趋势')
axes[0].set_xlabel('月份')
axes[0].set_ylabel('销售额')
axes[0].grid(True, alpha=0.3)

# 柱状图
axes[1].bar(months, sales, color='#10b981', alpha=0.8)
axes[1].set_title('月度销售额对比')
axes[1].set_xlabel('月份')
axes[1].set_ylabel('销售额')

plt.tight_layout()
plt.show()`,
    exercises: [
      {
        id: 1,
        question: 'Matplotlib中用于创建子图的函数是？',
        options: ['plot()', 'subplots()', 'figure()', 'show()'],
        correctAnswer: 1,
        explanation: 'subplots()用于创建子图网格'
      },
      {
        id: 2,
        question: '下列哪个不是Seaborn的图表类型？',
        options: ['scatterplot', 'barplot', 'lineplot', 'dotplot'],
        correctAnswer: 3,
        explanation: 'dotplot不是Seaborn的标准图表类型'
      },
      {
        id: 3,
        question: '显示相关性的热力图使用的函数是？',
        options: ['heatmap()', 'corr()', 'heat()', 'correlation()'],
        correctAnswer: 0,
        explanation: 'sns.heatmap()用于绘制热力图'
      }
    ],
    exam: [
      {
        id: 1,
        question: '绘制简单折线图',
        type: 'code',
        codePrompt: 'import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4]\ny = [10, 20, 15, 25]\n\nplt.plot(x, y)\nplt.title("示例图")\nprint("绘图完成")',
        expectedOutput: '绘图完成'
      },
      {
        id: 2,
        question: 'Seaborn是基于Matplotlib的',
        type: 'multiple',
        options: ['正确', '错误'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 6,
    title: 'A/B测试分析',
    description: '学习假设检验和A/B测试设计与分析',
    icon: 'GitCompare',
    topics: ['假设检验', 't检验', 'p值', '置信区间'],
    knowledge: [
      'A/B测试基本概念',
      '实验设计原则',
      't检验和卡方检验',
      '结果解读与决策'
    ],
    codeExample: `import pandas as pd
import numpy as np
from scipy import stats

# A/B测试数据
np.random.seed(42)
group_a = np.random.normal(loc=100, scale=15, size=100)  # 对照组
group_b = np.random.normal(loc=108, scale=15, size=100)  # 实验组

print("A组均值:", np.mean(group_a).round(2))
print("B组均值:", np.mean(group_b).round(2))

# t检验
t_stat, p_value = stats.ttest_ind(group_a, group_b)
print("\\nt统计量:", t_stat.round(4))
print("p值:", p_value.round(4))

alpha = 0.05
if p_value < alpha:
    print("\\n结论: 两组差异显著 (p < 0.05)")
else:
    print("\\n结论: 两组差异不显著")`,
    exercises: [
      {
        id: 1,
        question: '在A/B测试中，p值<0.05表示？',
        options: ['差异显著', '差异不显著', '实验失败', '实验成功'],
        correctAnswer: 0,
        explanation: 'p<0.05通常认为差异统计显著'
      },
      {
        id: 2,
        question: '原假设(H0)通常是？',
        options: ['两组有差异', '两组无差异', 'A组更好', 'B组更好'],
        correctAnswer: 1,
        explanation: '原假设通常假设无差异或无效'
      },
      {
        id: 3,
        question: '比较两个均值的差异用什么检验？',
        options: ['卡方检验', 't检验', 'F检验', 'Z检验'],
        correctAnswer: 1,
        explanation: 't检验用于比较两组均值'
      }
    ],
    exam: [
      {
        id: 1,
        question: '计算两组数据的t检验',
        type: 'code',
        codePrompt: 'from scipy import stats\nimport numpy as np\n\na = [1, 2, 3, 4, 5]\nb = [2, 3, 4, 5, 6]\n\nt_stat, p_val = stats.ttest_ind(a, b)\nprint(round(p_val, 4))',
        expectedOutput: '0.3466'
      },
      {
        id: 2,
        question: '显著性水平α常用值是',
        type: 'multiple',
        options: ['0.01', '0.05', '0.1', '0.5'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 7,
    title: '时间序列分析',
    description: '时间序列分解、趋势分析和预测',
    icon: 'Clock',
    topics: ['时间序列分解', '移动平均', '趋势分析', '季节性'],
    knowledge: [
      '时间序列基本概念',
      '时间序列分解',
      '移动平均法',
      '指数平滑法'
    ],
    codeExample: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 时间序列数据
dates = pd.date_range(start='2023-01-01', periods=24, freq='M')
sales = np.array([100, 110, 105, 120, 130, 140, 160, 170, 165, 180, 200, 220,
                 110, 120, 115, 130, 140, 150, 170, 180, 175, 190, 210, 230])

df = pd.DataFrame({'日期': dates, '销售额': sales})
df.set_index('日期', inplace=True)

print("时间序列数据:")
print(df.head())

# 移动平均
df['MA3'] = df['销售额'].rolling(window=3).mean()

print("\\n带移动平均:")
print(df.tail())`,
    exercises: [
      {
        id: 1,
        question: '时间序列不包含哪个成分？',
        options: ['趋势', '季节性', '随机性', '离散性'],
        correctAnswer: 3,
        explanation: '时间序列通常包含趋势、季节、周期、随机'
      },
      {
        id: 2,
        question: '移动平均的主要作用是？',
        options: ['预测未来', '消除噪声', '增加趋势', '分解序列'],
        correctAnswer: 1,
        explanation: '移动平均平滑数据，消除短期波动'
      },
      {
        id: 3,
        question: 'rolling()函数的参数window表示？',
        options: ['窗口大小', '滚动方向', '计算方法', '数据类型'],
        correctAnswer: 0,
        explanation: 'window参数指定移动平均窗口大小'
      }
    ],
    exam: [
      {
        id: 1,
        question: '计算3期移动平均',
        type: 'code',
        codePrompt: 'import pandas as pd\n\ndata = [10, 20, 30, 40, 50]\nseries = pd.Series(data)\nma3 = series.rolling(3).mean()\nprint(list(ma3.dropna()))',
        expectedOutput: '[20.0, 30.0, 40.0]'
      },
      {
        id: 2,
        question: '时间序列数据必须有时间索引',
        type: 'multiple',
        options: ['正确', '错误'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 8,
    title: '特征工程',
    description: '特征选择、特征变换和特征构造',
    icon: 'Wrench',
    topics: ['特征选择', '特征变换', '特征构造', '特征缩放'],
    knowledge: [
      '特征工程重要性',
      '特征选择方法',
      '特征缩放(归一化/标准化',
      '特征构造技巧'
    ],
    codeExample: `import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, MinMaxScaler

# 示例数据
data = {
    '年龄': [25, 30, 35, 40, 45],
    '收入': [50000, 60000, 75000, 90000, 100000],
    '经验': [3, 5, 7, 10, 12]
}

df = pd.DataFrame(data)
print("原始数据:")
print(df)

# 标准化
scaler = StandardScaler()
df_standardized = pd.DataFrame(
    scaler.fit_transform(df),
    columns=df.columns
)
print("\\n标准化后:")
print(df_standardized.round(2))

# 归一化
minmax = MinMaxScaler()
df_normalized = pd.DataFrame(
    minmax.fit_transform(df),
    columns=df.columns
)
print("\\n归一化后:")
print(df_normalized.round(2))`,
    exercises: [
      {
        id: 1,
        question: '将数据缩放到[0,1]区间的是？',
        options: ['标准化', '归一化', '正则化', '中心化'],
        correctAnswer: 1,
        explanation: '归一化将数据映射到[0,1]'
      },
      {
        id: 2,
        question: '标准化后数据的均值为？',
        options: ['0', '1', '原均值', '不确定'],
        correctAnswer: 0,
        explanation: '标准化后均值为0，标准差为1'
      },
      {
        id: 3,
        question: '特征工程的目标不包括？',
        options: ['特征选择', '特征变换', '增加数据', '特征构造'],
        correctAnswer: 2,
        explanation: '增加数据不属于特征工程'
      }
    ],
    exam: [
      {
        id: 1,
        question: 'MinMaxScaler归一化',
        type: 'code',
        codePrompt: 'from sklearn.preprocessing import MinMaxScaler\nimport numpy as np\n\ndata = np.array([[1], [2], [3], [4], [5]]).reshape(-1, 1)\nscaler = MinMaxScaler()\nresult = scaler.fit_transform(data)\nprint(result.flatten())',
        expectedOutput: '[0.   0.25 0.5  0.75 1.  ]'
      },
      {
        id: 2,
        question: '标准化对异常值敏感',
        type: 'multiple',
        options: ['正确', '错误'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 9,
    title: '异常值检测',
    description: '检测和处理数据中的异常值',
    icon: 'AlertTriangle',
    topics: ['IQR方法', 'Z-score', '可视化检测', '处理策略'],
    knowledge: [
      '异常值定义和影响',
      'IQR(四分位距)方法',
      'Z-score方法',
      '异常值处理策略'
    ],
    codeExample: `import pandas as pd
import numpy as np

# 示例数据（含异常值）
data = [10, 12, 11, 13, 12, 14, 11, 12, 100, 13, 11, 12]

df = pd.DataFrame({'数值': data})
print("原始数据:")
print(df)

# IQR方法
Q1 = df['数值'].quantile(0.25)
Q3 = df['数值'].quantile(0.75)
IQR = Q3 - Q1

lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

print(f"\\nQ1: {Q1}, Q3: {Q3}, IQR: {IQR}")
print(f"下界: {lower}, 上界: {upper}")

outliers = df[(df['数值'] < lower) | (df['数值'] > upper)]
print("\\n检测到的异常值:")
print(outliers)`,
    exercises: [
      {
        id: 1,
        question: 'IQR方法中，异常值定义为？',
        options: ['< Q1-1.5*IQR 或 > Q3+1.5*IQR', '< Q1-1*IQR 或 > Q3+1*IQR', '<均值-2*标准差 或 >均值+2*标准差', '<最小值或>最大值'],
        correctAnswer: 0,
        explanation: 'IQR方法使用1.5倍IQR作为阈值'
      },
      {
        id: 2,
        question: 'Z-score方法中，Z-score>3通常认为是？',
        options: ['正常', '异常', '均值', '中位数'],
        correctAnswer: 1,
        explanation: 'Z-score绝对值>3常视为异常'
      },
      {
        id: 3,
        question: '处理异常值不推荐的方法是？',
        options: ['删除', '替换为中位数', '保留原样', '替换为均值'],
        correctAnswer: 3,
        explanation: '替换为均值可能引入偏差'
      }
    ],
    exam: [
      {
        id: 1,
        question: '计算IQR',
        type: 'code',
        codePrompt: 'import numpy as np\n\ndata = [1, 2, 3, 4, 5, 100]\nQ1 = np.percentile(data, 25)\nQ3 = np.percentile(data, 75)\nIQR = Q3 - Q1\nprint(IQR)',
        expectedOutput: '3.0'
      },
      {
        id: 2,
        question: '箱线图可以检测异常值',
        type: 'multiple',
        options: ['正确', '错误'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 10,
    title: '多数据集合并',
    description: '掌握merge、concat和join操作',
    icon: 'Link',
    topics: ['merge合并', 'concat连接', 'join连接', '合并技巧'],
    knowledge: [
      'merge()方法',
      'concat()方法',
      'join()方法',
      '不同合并方式'
    ],
    codeExample: `import pandas as pd

# 数据集1: 用户信息
users = pd.DataFrame({
    '用户ID': [1, 2, 3, 4],
    '姓名': ['张三', '李四', '王五', '赵六'],
    '城市': ['北京', '上海', '北京', '广州']
})

# 数据集2: 订单信息
orders = pd.DataFrame({
    '订单ID': [101, 102, 103, 104],
    '用户ID': [1, 2, 1, 3],
    '金额': [100, 200, 150, 300]
})

print("用户信息:")
print(users)
print("\\n订单信息:")
print(orders)

# 内连接
merged = pd.merge(users, orders, on='用户ID', how='inner')
print("\\n合并后:")
print(merged)`,
    exercises: [
      {
        id: 1,
        question: '基于共同键合并两个DataFrame的函数是？',
        options: ['concat()', 'merge()', 'join()', 'combine()'],
        correctAnswer: 1,
        explanation: 'merge()用于基于键合并'
      },
      {
        id: 2,
        question: "默认的合并方式how='inner'表示？",
        options: ['左连接', '右连接', '内连接', '外连接'],
        correctAnswer: 2,
        explanation: 'inner保留共同的键'
      },
      {
        id: 3,
        question: '沿轴连接使用的函数是？',
        options: ['merge()', 'concat()', 'join()', 'append()'],
        correctAnswer: 1,
        explanation: 'concat()用于沿轴连接'
      }
    ],
    exam: [
      {
        id: 1,
        question: '合并两个DataFrame',
        type: 'code',
        codePrompt: 'import pandas as pd\n\ndf1 = pd.DataFrame({\'A\': [1, 2], \'B\': [3, 4]})\ndf2 = pd.DataFrame({\'A\': [1, 2], \'C\': [5, 6]})\nresult = pd.merge(df1, df2, on=\'A\')\nprint(result.to_string(index=False))',
        expectedOutput: ' A  B  C\n 1  3  5\n 2  4  6'
      },
      {
        id: 2,
        question: 'concat()可以沿行或列连接',
        type: 'multiple',
        options: ['正确', '错误'],
        correctAnswer: 0
      }
    ]
  }
];
