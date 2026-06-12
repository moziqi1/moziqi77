
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
    codeExample: `# 数据清洗实战 - 纯Python标准库
# 创建示例数据（使用列表模拟表格）
data = [
    {'姓名': '张三', '年龄': 25, '销售额': 1000},
    {'姓名': '李四', '年龄': 30, '销售额': 2000},
    {'姓名': '王五', '年龄': None, '销售额': 1500},
    {'姓名': None, '年龄': 35, '销售额': 3000},
    {'姓名': '赵六', '年龄': 28, '销售额': 2500},
]

print("=== 原始数据 ===")
for row in data:
    print(row)

# 检测缺失值
print("\\n=== 缺失值统计 ===")
name_missing = sum(1 for row in data if row['姓名'] is None)
age_missing = sum(1 for row in data if row['年龄'] is None)
print(f"姓名缺失: {name_missing}条")
print(f"年龄缺失: {age_missing}条")

# 填充缺失值
print("\\n=== 清洗后的数据 ===")
cleaned_data = []
ages = [row['年龄'] for row in data if row['年龄'] is not None]
median_age = sorted(ages)[len(ages) // 2]

for row in data:
    new_row = row.copy()
    new_row['姓名'] = new_row['姓名'] if new_row['姓名'] is not None else '未知'
    new_row['年龄'] = new_row['年龄'] if new_row['年龄'] is not None else median_age
    cleaned_data.append(new_row)
    print(new_row)

print("\\n✅ 数据清洗完成！")`,
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
      },
      {
        id: 4,
        question: 'dropna(axis=1)表示什么？',
        options: ['删除包含缺失值的行', '删除包含缺失值的列', '填充缺失值', '标记缺失值'],
        correctAnswer: 1,
        explanation: 'axis=1表示按列操作，删除含有缺失值的列'
      },
      {
        id: 5,
        question: 'fillna()方法中，method参数可以设置为什么？',
        options: ['ffill或bfill', 'mean或median', 'mode或std', 'min或max'],
        correctAnswer: 0,
        explanation: 'method="ffill"前向填充，"bfill"后向填充'
      },
      {
        id: 6,
        question: 'duplicated()方法返回的结果类型是？',
        options: ['Series', 'DataFrame', '布尔值', '列表'],
        correctAnswer: 0,
        explanation: 'duplicated()返回布尔值Series'
      },
      {
        id: 7,
        question: '将字符串"123"转换为整数应使用？',
        options: ['str()', 'int()', 'float()', 'bool()'],
        correctAnswer: 1,
        explanation: 'int()将字符串转换为整数'
      },
      {
        id: 8,
        question: 'astype()方法用于？',
        options: ['数据类型转换', '缺失值填充', '重复值删除', '异常值处理'],
        correctAnswer: 0,
        explanation: 'astype()用于转换数据类型'
      },
      {
        id: 9,
        question: 'describe()方法默认显示哪些统计量？',
        options: ['count, mean, std, min, 25%, 50%, 75%, max', 'sum, mean, median, mode', 'min, max, sum, avg', '全部统计量'],
        correctAnswer: 0,
        explanation: 'describe()默认显示8个基本统计量'
      },
      {
        id: 10,
        question: '处理缺失值时，用中位数填充的优点是？',
        options: ['不受异常值影响', '计算简单', '保持原值', '整数结果'],
        correctAnswer: 0,
        explanation: '中位数对异常值不敏感，比均值更稳健'
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
      },
      {
        id: 3,
        question: 'isnull()和isna()的区别是？',
        type: 'multiple',
        options: ['完全相同', 'isna()是isnull()的别名', 'isnull()是isna()的别名', '针对不同数据类型'],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'drop_duplicates()默认保留的是？',
        type: 'multiple',
        options: ['第一个出现的', '最后一个出现的', '所有重复的', '随机选择'],
        correctAnswer: 0
      },
      {
        id: 5,
        question: 'info()方法主要用于？',
        type: 'multiple',
        options: ['查看数据概况和缺失值', '数据统计', '数据可视化', '数据排序'],
        correctAnswer: 0
      },
      {
        id: 6,
        question: 'fillna(method="ffill")表示？',
        type: 'multiple',
        options: ['用前面的值填充', '用后面的值填充', '用均值填充', '用0填充'],
        correctAnswer: 0
      },
      {
        id: 7,
        question: '将浮点数转换为整数，小数部分会？',
        type: 'multiple',
        options: ['直接截断', '四舍五入', '向上取整', '向下取整'],
        correctAnswer: 0
      },
      {
        id: 8,
        question: 'duplicated()的keep参数可以设置为？',
        type: 'multiple',
        options: ['first/last/False', 'True/False', '0/1', 'max/min'],
        correctAnswer: 0
      },
      {
        id: 9,
        question: 'dropna()中subset参数的作用是？',
        type: 'multiple',
        options: ['指定在哪些列上检查缺失值', '指定删除的行数', '指定填充值', '指定数据类型'],
        correctAnswer: 0
      },
      {
        id: 10,
        question: 'describe()中include参数可以指定？',
        type: 'code',
        codePrompt: 'import pandas as pd\ndf = pd.DataFrame({\'A\': [1, 2, 3], \'B\': [\'a\', \'b\', \'c\']})\nprint(df.describe(include="all"))',
        expectedOutput: 'A          B\ncount  3.0        3\nunique  NaN        3\ntop     NaN        a\nfreq    NaN        1\nmean    2.0      NaN\nstd     1.0      NaN\nmin     1.0      NaN\n25%     1.5      NaN\n50%     2.0      NaN\n75%     2.5      NaN\nmax     3.0      NaN'
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
    codeExample: `# 分组聚合分析 - 纯Python标准库
# 销售数据
data = [
    {'产品': 'A', '地区': '华东', '销量': 100, '销售额': 1000},
    {'产品': 'B', '地区': '华东', '销量': 150, '销售额': 2250},
    {'产品': 'A', '地区': '华北', '销量': 120, '销售额': 1200},
    {'产品': 'B', '地区': '华北', '销量': 180, '销售额': 2700},
    {'产品': 'A', '地区': '华南', '销量': 90, '销售额': 900},
    {'产品': 'B', '地区': '华南', '销量': 130, '销售额': 1950},
]

print("=== 原始数据 ===")
for row in data:
    print(row)

# 按产品分组统计
print("\\n=== 按产品分组的平均销量 ===")
product_groups = {}
for row in data:
    product = row['产品']
    if product not in product_groups:
        product_groups[product] = []
    product_groups[product].append(row['销量'])

for product, sales in product_groups.items():
    avg_sale = sum(sales) / len(sales)
    print(f"{product}: 平均销量 = {avg_sale:.1f}")

# 多分组聚合
print("\\n=== 按产品和地区分组统计 ===")
grouped = {}
for row in data:
    key = (row['产品'], row['地区'])
    if key not in grouped:
        grouped[key] = {'销量': [], '销售额': []}
    grouped[key]['销量'].append(row['销量'])
    grouped[key]['销售额'].append(row['销售额'])

for (product, region), values in grouped.items():
    total_sales = sum(values['销量'])
    avg_sales = sum(values['销量']) / len(values['销量'])
    total_revenue = sum(values['销售额'])
    print(f"{product}-{region}: 销量={total_sales}, 平均={avg_sales:.1f}, 销售额={total_revenue}")`,
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
      },
      {
        id: 4,
        question: 'groupby().agg()可以同时使用多个聚合函数吗？',
        options: ['可以', '不可以', '只能两个', '只能同类'],
        correctAnswer: 0,
        explanation: 'agg()可以传入列表使用多个聚合函数'
      },
      {
        id: 5,
        question: 'crosstab()用于创建？',
        options: ['交叉表', '透视表', '统计表', '分组表'],
        correctAnswer: 0,
        explanation: 'crosstab()用于创建交叉表（列联表）'
      },
      {
        id: 6,
        question: 'groupby后使用size()返回的是？',
        options: ['每组元素数量', '每组求和', '每组均值', '每组最大值'],
        correctAnswer: 0,
        explanation: 'size()返回每组包含的元素数量'
      },
      {
        id: 7,
        question: 'pivot_table中index参数的作用是？',
        options: ['指定行索引', '指定列索引', '指定数据', '指定聚合方式'],
        correctAnswer: 0,
        explanation: 'index参数指定作为行索引的列'
      },
      {
        id: 8,
        question: 'value_counts()返回的是？',
        options: ['各值出现的次数', '累计次数', '百分比', '排名'],
        correctAnswer: 0,
        explanation: 'value_counts()统计每个值出现的次数'
      },
      {
        id: 9,
        question: 'agg()的另一种写法是？',
        options: ['aggregate()', 'apply()', 'transform()', 'filter()'],
        correctAnswer: 0,
        explanation: 'agg()和aggregate()是同一个函数'
      },
      {
        id: 10,
        question: '分组后要计算每组的方差应使用？',
        options: ['var()', 'std()', 'mean()', 'median()'],
        correctAnswer: 0,
        explanation: 'var()计算方差，std()计算标准差'
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
      },
      {
        id: 3,
        question: 'groupby().count()和groupby().size()的区别是？',
        type: 'multiple',
        options: ['count()排除NaN，size()包含NaN', 'size()排除NaN，count()包含NaN', '两者完全相同', 'count()用于数值，size()用于所有类型'],
        correctAnswer: 0
      },
      {
        id: 4,
        question: 'pivot_table的aggfunc默认是？',
        type: 'multiple',
        options: ['mean', 'sum', 'count', 'median'],
        correctAnswer: 0
      },
      {
        id: 5,
        question: 'crosstab的normalize参数可以设置为？',
        type: 'multiple',
        options: ['all/index/columns', 'sum/mean/count', 'row/col/total', 'true/false/auto'],
        correctAnswer: 0
      },
      {
        id: 6,
        question: 'groupby对象可以直接迭代，迭代元素是？',
        type: 'multiple',
        options: ['(组名, 数据)元组', '数据', '组名', '索引'],
        correctAnswer: 0
      },
      {
        id: 7,
        question: '使用多个列分组时，groupby应传入？',
        type: 'multiple',
        options: ['列表', '字符串', '数字', '元组'],
        correctAnswer: 0
      },
      {
        id: 8,
        question: 'pivot_table中columns参数的作用是？',
        type: 'multiple',
        options: ['指定列名', '指定行索引', '指定数据列', '指定聚合函数'],
        correctAnswer: 0
      },
      {
        id: 9,
        question: 'groupby().nunique()返回的是？',
        type: 'code',
        codePrompt: 'import pandas as pd\ndf = pd.DataFrame({\'A\': [1, 1, 2, 2, 2], \'B\': [\'x\', \'x\', \'y\', \'x\', \'y\']})\nprint(df.groupby(\'A\')[\'B\'].nunique())',
        expectedOutput: 'A\n1    1\n2    2\nName: B, dtype: int64'
      },
      {
        id: 10,
        question: 'agg()传入字典时，键名对应什么？',
        type: 'multiple',
        options: ['列名', '组名', '函数名', '索引'],
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
    codeExample: `# 购物篮分析 - 纯Python标准库
from itertools import combinations

# 购物篮数据
transactions = [
    ['牛奶', '面包', '啤酒'],
    ['面包', '啤酒', '尿布'],
    ['牛奶', '面包', '尿布', '啤酒'],
    ['牛奶', '面包'],
    ['牛奶', '啤酒']
]

print("=== 购物篮数据 ===")
for i, t in enumerate(transactions, 1):
    print(f"交易{i}: {t}")

# 计算支持度
def support(itemset, transactions):
    count = 0
    for t in transactions:
        if set(itemset).issubset(set(t)):
            count += 1
    return count / len(transactions)

# 计算置信度
def confidence(antecedent, consequent, transactions):
    both = support(antecedent + consequent, transactions)
    antecedent_support = support(antecedent, transactions)
    return both / antecedent_support if antecedent_support > 0 else 0

print("\\n=== 支持度计算 ===")
print(f"{'啤酒'}: {support(['啤酒'], transactions):.2f}")
print(f"{'牛奶, 面包'}: {support(['牛奶', '面包'], transactions):.2f}")

print("\\n=== 置信度计算 ===")
print(f"牛奶 → 面包: {confidence(['牛奶'], ['面包'], transactions):.2f}")
print(f"啤酒 → 尿布: {confidence(['啤酒'], ['尿布'], transactions):.2f}")

print("\\n✅ 关联规则分析完成！")`,
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
      },
      {
        id: 4,
        question: '提升度的计算公式是？',
        options: ['置信度/支持度(B)', '支持度/置信度', '支持度(A∩B)/支持度(A)', '置信度-支持度'],
        correctAnswer: 0,
        explanation: '提升度=置信度/支持度(B)'
      },
      {
        id: 5,
        question: 'Apriori算法的主要目的是？',
        options: ['找出频繁项集', '计算关联规则', '聚类分析', '分类预测'],
        correctAnswer: 0,
        explanation: 'Apriori算法用于挖掘频繁项集'
      },
      {
        id: 6,
        question: '最小支持度阈值的作用是？',
        options: ['筛选频繁项集', '计算置信度', '排序规则', '生成图表'],
        correctAnswer: 0,
        explanation: '低于最小支持度的项集被视为不频繁'
      },
      {
        id: 7,
        question: '关联规则"面包→啤酒"中，面包是？',
        options: ['前项', '后项', '支持度', '提升度'],
        correctAnswer: 0,
        explanation: '箭头左侧是前项(antecedent)，右侧是后项(consequent)'
      },
      {
        id: 8,
        question: '支持度(A∩B)和置信度(A→B)的关系是？',
        options: ['置信度=支持度(A∩B)/支持度(A)', '支持度=置信度(A∩B)', '两者相等', '无关'],
        correctAnswer: 0,
        explanation: '置信度(A→B)=支持度(A∩B)/支持度(A)'
      },
      {
        id: 9,
        question: '最小置信度阈值用于？',
        options: ['筛选强关联规则', '找出频繁项集', '计算提升度', '数据预处理'],
        correctAnswer: 0,
        explanation: '置信度低于阈值的规则被认为是弱规则'
      },
      {
        id: 10,
        question: '如果提升度等于1，说明？',
        options: ['A和B独立', 'A和B正相关', 'A和B负相关', '无法判断'],
        correctAnswer: 0,
        explanation: '提升度=1表示A和B相互独立'
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
      },
      {
        id: 3,
        question: '支持度表示的是？',
        type: 'multiple',
        options: ['商品出现的频率', '规则的可信程度', '商品间的相关性', '交易的数量'],
        correctAnswer: 0
      },
      {
        id: 4,
        question: '置信度表示的是？',
        type: 'multiple',
        options: ['规则的可靠程度', '商品的流行度', '交易总额', '商品种类数'],
        correctAnswer: 0
      },
      {
        id: 5,
        question: 'Apriori算法的核心思想是？',
        type: 'multiple',
        options: ['如果项集频繁，则子集也频繁', '支持度越高越好', '置信度越高越好', '提升度必须大于2'],
        correctAnswer: 0
      },
      {
        id: 6,
        question: '频繁项集是指？',
        type: 'multiple',
        options: ['支持度大于阈值的项集', '所有出现的项集', '唯一的项集', '有序的项集'],
        correctAnswer: 0
      },
      {
        id: 7,
        question: '强关联规则是指？',
        type: 'multiple',
        options: ['同时满足最小支持度和最小置信度', '置信度最高的规则', '支持度最高的规则', '提升度大于1的规则'],
        correctAnswer: 0
      },
      {
        id: 8,
        question: '购物篮分析不能应用于？',
        type: 'multiple',
        options: ['疾病诊断', '商品推荐', '网站导航优化', '库存管理'],
        correctAnswer: 0
      },
      {
        id: 9,
        question: '计算置信度',
        type: 'code',
        codePrompt: 'def support(itemset, transactions):\n    count = 0\n    for t in transactions:\n        if set(itemset).issubset(set(t)):\n            count += 1\n    return count / len(transactions)\n\ndef confidence(A, B, transactions):\n    return support(A + B, transactions) / support(A, transactions)\n\ntransactions = [[\'牛奶\', \'面包\'], [\'牛奶\', \'啤酒\'], [\'牛奶\', \'面包\', \'啤酒\']]\nprint(round(confidence([\'牛奶\'], [\'面包\'], transactions), 2))',
        expectedOutput: '0.67'
      },
      {
        id: 10,
        question: '计算提升度',
        type: 'multiple',
        options: ['confidence(A→B)/support(B)', 'support(B)/confidence(A→B)', 'support(A∩B)-support(A)', 'confidence(A→B)-support(B)'],
        correctAnswer: 0
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
    codeExample: `# 客户聚类分析 - 纯Python标准库
import random
import math

# 客户数据
data = [
    {'客户ID': 1, '年度消费': 1200, '消费频率': 15, '客单价': 80},
    {'客户ID': 2, '年度消费': 8500, '消费频率': 45, '客单价': 450},
    {'客户ID': 3, '年度消费': 2100, '消费频率': 20, '客单价': 100},
    {'客户ID': 4, '年度消费': 9000, '消费频率': 48, '客单价': 480},
    {'客户ID': 5, '年度消费': 1500, '消费频率': 18, '客单价': 90},
    {'客户ID': 6, '年度消费': 7800, '消费频率': 42, '客单价': 420},
]

print("=== 客户数据 ===")
for row in data:
    print(row)

# 数据标准化
def normalize(data_list, key):
    values = [d[key] for d in data_list]
    mean_val = sum(values) / len(values)
    std_val = math.sqrt(sum((v - mean_val) ** 2 for v in values) / len(values))
    return [(v - mean_val) / std_val if std_val > 0 else 0 for v in values]

keys = ['年度消费', '消费频率', '客单价']
normalized_data = []
for d in data:
    norm = {'客户ID': d['客户ID']}
    for key in keys:
        norm[key] = normalize(data, key)[data.index(d)]
    normalized_data.append(norm)

print("\\n=== 标准化后的数据 ===")
for row in normalized_data[:3]:
    print(row)

# 简单的聚类（基于年度消费分组）
print("\\n=== 客户分群 ===")
high_value = [d for d in data if d['年度消费'] > 5000]
medium_value = [d for d in data if 3000 < d['年度消费'] <= 5000]
low_value = [d for d in data if d['年度消费'] <= 3000]

print(f"高价值客户 ({len(high_value)}人): {[d['客户ID'] for d in high_value]}")
print(f"中等价值客户 ({len(medium_value)}人): {[d['客户ID'] for d in medium_value]}")
print(f"低价值客户 ({len(low_value)}人): {[d['客户ID'] for d in low_value]}")

print("\\n✅ 客户聚类分析完成！")`,
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
      },
      {
        id: 4,
        question: 'K-Means算法中，中心点的更新方式是？',
        options: ['该簇所有样本的均值', '随机选取', '最大值', '最小值'],
        correctAnswer: 0,
        explanation: '中心点更新为该簇所有样本的均值'
      },
      {
        id: 5,
        question: '轮廓系数的范围是？',
        options: ['[-1, 1]', '[0, 1]', '[-1, 0]', '[0, 2]'],
        correctAnswer: 0,
        explanation: '轮廓系数范围[-1, 1]，越接近1越好'
      },
      {
        id: 6,
        question: 'K-Means对异常值敏感是因为？',
        options: ['使用欧氏距离', '基于均值计算', '迭代次数有限', 'K值固定'],
        correctAnswer: 1,
        explanation: '均值对异常值敏感，影响中心点计算'
      },
      {
        id: 7,
        question: '肘部法则中，"肘部"出现在？',
        type: 'multiple',
        options: ['SSE下降速度明显减缓处', 'SSE最小值处', 'SSE最大值处', '任意位置'],
        correctAnswer: 0,
        explanation: '肘部是SSE下降速度由快转慢的转折点'
      },
      {
        id: 8,
        question: 'DBSCAN相比K-Means的优点是？',
        options: ['可以发现任意形状的簇', '不需要指定K值', '对异常值不敏感', '以上都是'],
        correctAnswer: 3,
        explanation: 'DBSCAN具有这三个优点'
      },
      {
        id: 9,
        question: '聚类结果评估指标不包括？',
        options: ['准确率', '轮廓系数', 'CH指数', 'SSE'],
        correctAnswer: 0,
        explanation: '准确率是分类指标，聚类用轮廓系数等'
      },
      {
        id: 10,
        question: 'K-Means的缺点是？',
        options: ['易陷入局部最优', '对初始中心点敏感', '需要预先确定K值', '以上都是'],
        correctAnswer: 3,
        explanation: 'K-Means有这三个主要缺点'
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
      },
      {
        id: 3,
        question: 'K-Means的目标是最小化？',
        type: 'multiple',
        options: ['SSE(簇内平方和)', '轮廓系数', 'CH指数', 'DB指数'],
        correctAnswer: 0
      },
      {
        id: 4,
        question: 'K-Means的初始化方式有？',
        type: 'multiple',
        options: ['k-means++和随机', '层次聚类', 'DBSCAN', '凝聚聚类'],
        correctAnswer: 0
      },
      {
        id: 5,
        question: 'sklearn中KMeans的n_init参数作用是？',
        type: 'multiple',
        options: ['运行次数', '聚类数', '迭代次数', '特征数'],
        correctAnswer: 0
      },
      {
        id: 6,
        question: '轮廓系数越接近1表示？',
        type: 'multiple',
        options: ['聚类越紧凑', '聚类越分散', '聚类数越多', '聚类数越少'],
        correctAnswer: 0
      },
      {
        id: 7,
        question: '层次聚类的特点是？',
        type: 'multiple',
        options: ['不需要预先指定K值', '对异常值更敏感', '计算复杂度低', '只能凸形簇'],
        correctAnswer: 0
      },
      {
        id: 8,
        question: '标准化后数据的均值和标准差是？',
        type: 'multiple',
        options: ['0和1', '0和0', '1和0', '1和1'],
        correctAnswer: 0
      },
      {
        id: 9,
        question: '计算SSE',
        type: 'code',
        codePrompt: 'import numpy as np\n\npoints = np.array([[1, 2], [2, 2], [10, 10]])\ncenter = np.array([1, 2])\nsse = sum(np.sum((p - center) ** 2) for p in points)\nprint(sse)',
        expectedOutput: '100'
      },
      {
        id: 10,
        question: 'Calinski-Harabasz指数越大表示？',
        type: 'multiple',
        options: ['簇间分离度越高，簇内紧凑度越好', '聚类数越多越好', '算法运行越快', '数据量越大越好'],
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
    codeExample: `# 数据可视化实战 - 纯Python标准库
import math

# 销售数据
months = ['1月', '2月', '3月', '4月', '5月', '6月']
sales = [120, 150, 130, 180, 160, 200]

print("=" * 50)
print("月度销售数据可视化")
print("=" * 50)

# 文本柱状图
print("\\n柱状图 (文本模式):")
for m, s in zip(months, sales):
    bar = '█' * (s // 5)
    print(f"{m}: {s:>4} {bar}")

# 计算统计信息
total = sum(sales)
average = total / len(sales)
max_sales = max(sales)
min_sales = min(sales)

print(f"\\n总计: {total}")
print(f"平均: {average:.2f}")
print(f"最高: {max_sales}")
print(f"最低: {min_sales}")

# 趋势分析
print("\\n趋势分析:")
for i in range(1, len(sales)):
    change = sales[i] - sales[i-1]
    trend = "↑" if change > 0 else "↓" if change < 0 else "→"
    print(f"{months[i-1]} → {months[i]}: {trend} {abs(change)}")

# 简单相关性计算
x = list(range(1, 7))
n = len(x)
sum_x = sum(x)
sum_y = sum(sales)
sum_xy = sum(x[i] * sales[i] for i in range(n))
sum_x2 = sum(xi ** 2 for xi in x)
sum_y2 = sum(yi ** 2 for yi in sales)

numerator = n * sum_xy - sum_x * sum_y
denominator = math.sqrt((n * sum_x2 - sum_x**2) * (n * sum_y2 - sum_y**2))
correlation = numerator / denominator if denominator != 0 else 0

print(f"\\n月份与销售的相关系数: {correlation:.4f}")
print("\\n注: 使用纯Python计算，不依赖外部库")`,
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
      },
      {
        id: 4,
        question: 'plt.figure(figsize=(10, 6))中10和6的单位是？',
        options: ['英寸', '厘米', '像素', '毫米'],
        correctAnswer: 0,
        explanation: 'matplotlib中figsize单位是英寸'
      },
      {
        id: 5,
        question: '设置图表标题的函数是？',
        options: ['plt.title()', 'plt.xlabel()', 'plt.legend()', 'plt.grid()'],
        correctAnswer: 0,
        explanation: 'plt.title()设置图表标题'
      },
      {
        id: 6,
        question: 'plt.show()的作用是？',
        options: ['显示图表', '保存图表', '清空图表', '关闭图表'],
        correctAnswer: 0,
        explanation: 'show()用于显示生成的图表'
      },
      {
        id: 7,
        question: 'Seaborn的style参数可以设置？',
        options: ['图表样式主题', '线条粗细', '颜色映射', '图例位置'],
        correctAnswer: 0,
        explanation: 'style参数设置Seaborn的样式主题'
      },
      {
        id: 8,
        question: '散点图使用的函数是？',
        options: ['scatter()', 'plot()', 'bar()', 'hist()'],
        correctAnswer: 0,
        explanation: 'plt.scatter()用于绘制散点图'
      },
      {
        id: 9,
        question: 'plt.legend()的作用是？',
        options: ['显示图例', '显示网格', '设置标题', '保存图片'],
        correctAnswer: 0,
        explanation: 'legend()用于显示图例'
      },
      {
        id: 10,
        question: 'Seaborn是基于什么的可视化库？',
        options: ['Matplotlib', 'Pandas', 'Numpy', 'Scipy'],
        correctAnswer: 0,
        explanation: 'Seaborn构建在Matplotlib之上'
      }
    ],
    exam: [
      {
        id: 1,
        question: '绘制简单折线图',
        type: 'code',
        codePrompt: 'print("图表已生成")\nprint([1, 2, 3, 4])',
        expectedOutput: '图表已生成\n[1, 2, 3, 4]'
      },
      {
        id: 2,
        question: 'Seaborn是基于Matplotlib的',
        type: 'multiple',
        options: ['正确', '错误'],
        correctAnswer: 0
      },
      {
        id: 3,
        question: 'plt.savefig()的作用是？',
        type: 'multiple',
        options: ['保存图表到文件', '显示图表', '创建新图表', '关闭图表'],
        correctAnswer: 0
      },
      {
        id: 4,
        question: '设置x轴标签的函数是？',
        type: 'multiple',
        options: ['xlabel()', 'xticks()', 'xlim()', 'xlabel和xticks都行'],
        correctAnswer: 0
      },
      {
        id: 5,
        question: '柱状图使用的函数是？',
        type: 'multiple',
        options: ['bar()或barh()', 'plot()', 'scatter()', 'hist()'],
        correctAnswer: 0
      },
      {
        id: 6,
        question: 'Seaborn中hue参数的作用是？',
        type: 'multiple',
        options: ['根据类别变量分组着色', '设置图表大小', '设置标题', '设置图例'],
        correctAnswer: 0
      },
      {
        id: 7,
        question: '直方图使用的函数是？',
        type: 'multiple',
        options: ['hist()', 'bar()', 'plot()', 'scatter()'],
        correctAnswer: 0
      },
      {
        id: 8,
        question: 'plt.grid(True)的作用是？',
        type: 'multiple',
        options: ['显示网格', '隐藏网格', '设置图例', '保存图表'],
        correctAnswer: 0
      },
      {
        id: 9,
        question: '饼图使用的函数是？',
        type: 'code',
        codePrompt: 'import matplotlib.pyplot as plt\n\nsizes = [25, 35, 25, 15]\nlabels = [\'A\', \'B\', \'C\', \'D\']\n# 注意：这里不需要实际显示\nprint(f"饼图数据: {dict(zip(labels, sizes))}")',
        expectedOutput: '饼图数据: {\'A\': 25, \'B\': 35, \'C\': 25, \'D\': 15}'
      },
      {
        id: 10,
        question: 'Matplotlib中RGB颜色值的范围是？',
        type: 'multiple',
        options: ['[0, 1]', '[0, 255]', '[0, 100]', '任意值'],
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
    codeExample: `# A/B测试分析实战 - 纯Python标准库
import math
import random

# 模拟A/B测试数据
random.seed(42)
group_a = [100 + random.gauss(0, 15) for _ in range(100)]
group_b = [108 + random.gauss(0, 15) for _ in range(100)]

mean_a = sum(group_a) / len(group_a)
mean_b = sum(group_b) / len(group_b)

print("=" * 50)
print("A/B测试结果分析")
print("=" * 50)
print(f"A组均值: {mean_a:.2f}")
print(f"B组均值: {mean_b:.2f}")
print(f"均值差异: {mean_b - mean_a:.2f}")

# 手动计算t统计量
def variance(data):
    mean = sum(data) / len(data)
    return sum((x - mean) ** 2 for x in data) / (len(data) - 1)

def t_test(group1, group2):
    n1, n2 = len(group1), len(group2)
    var1, var2 = variance(group1), variance(group2)
    se = math.sqrt(var1/n1 + var2/n2)
    t_stat = (sum(group1)/n1 - sum(group2)/n2) / se
    return t_stat

t_stat = t_test(group_a, group_b)

# 近似p值计算
df = len(group_a) + len(group_b) - 2
p_value = math.exp(-0.5 * t_stat ** 2) * 2 if t_stat > 0 else math.exp(-0.5 * t_stat ** 2) * 2

print(f"\\nt统计量: {t_stat:.4f}")
print(f"p值(近似): {p_value:.4f}")

alpha = 0.05
if p_value < alpha:
    print(f"\\n结论: 两组差异显著 (p < {alpha})")
    print("建议: 采纳B方案")
else:
    print(f"\\n结论: 两组差异不显著 (p >= {alpha})")
    print("建议: 继续观察或调整实验")`,
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
      },
      {
        id: 4,
        question: 'p值越小表示？',
        options: ['越显著', '越不显著', '无意义', '结果错误'],
        correctAnswer: 0,
        explanation: 'p值越小越倾向于拒绝原假设'
      },
      {
        id: 5,
        question: '置信区间通常设置为？',
        options: ['95%', '50%', '99%', '100%'],
        correctAnswer: 0,
        explanation: '95%置信区间最常用'
      },
      {
        id: 6,
        question: '备择假设(H1)是？',
        options: ['我们想证明的假设', '默认成立的假设', '一定错误的假设', '无意义的假设'],
        correctAnswer: 0,
        explanation: '备择假设是研究者想要证明的假设'
      },
      {
        id: 7,
        question: 'Z检验适用于？',
        options: ['大样本', '小样本', '任意样本', '配对样本'],
        correctAnswer: 0,
        explanation: 'Z检验适用于大样本(n>30)'
      },
      {
        id: 8,
        question: '第一类错误是？',
        options: ['拒真错误', '取伪错误', '计算错误', '抽样错误'],
        correctAnswer: 0,
        explanation: '第一类错误是拒绝了真实的原假设'
      },
      {
        id: 9,
        question: '样本量越大，p值越容易？',
        options: ['变小', '变大', '不变', '随机变化'],
        correctAnswer: 0,
        explanation: '大样本使检验更敏感'
      },
      {
        id: 10,
        question: 'A/B测试中，样本量计算取决于？',
        options: ['预期效应量、显著性水平、统计功效', '时间成本', '用户总数', '开发成本'],
        correctAnswer: 0,
        explanation: '样本量由这三个统计因素决定'
      }
    ],
    exam: [
      {
        id: 1,
        question: '计算两组数据的均值差异',
        type: 'code',
        codePrompt: 'a = [1, 2, 3, 4, 5]\nb = [2, 3, 4, 5, 6]\nprint(round(sum(b)/len(b) - sum(a)/len(a), 2))',
        expectedOutput: '1.0'
      },
      {
        id: 2,
        question: '显著性水平α常用值是',
        type: 'multiple',
        options: ['0.01', '0.05', '0.1', '0.5'],
        correctAnswer: 1
      },
      {
        id: 3,
        question: '第二类错误是？',
        type: 'multiple',
        options: ['取伪错误', '拒真错误', '计算错误', '系统错误'],
        correctAnswer: 0
      },
      {
        id: 4,
        question: '统计功效power等于？',
        type: 'multiple',
        options: ['1-β', '1-α', 'α+β', 'α-β'],
        correctAnswer: 0
      },
      {
        id: 5,
        question: '配对t检验适用于？',
        type: 'multiple',
        options: ['同一组样本前后对比', '两组独立样本', '多组样本', '任意数据'],
        correctAnswer: 0
      },
      {
        id: 6,
        question: '卡方检验用于？',
        type: 'multiple',
        options: ['分类变量的独立性检验', '连续变量的均值比较', '数据的标准化', '相关性分析'],
        correctAnswer: 0
      },
      {
        id: 7,
        question: '效应量(effect size)衡量的是？',
        type: 'multiple',
        options: ['实际差异的大小', '样本量的大小', 'p值的大小', '显著性水平'],
        correctAnswer: 0
      },
      {
        id: 8,
        question: 't检验中，自由度df约等于？',
        type: 'multiple',
        options: ['n1+n2-2', 'n1+n2', 'n1*n2', 'n1/n2'],
        correctAnswer: 0
      },
      {
        id: 9,
        question: '计算方差',
        type: 'code',
        codePrompt: 'data = [2, 4, 4, 4, 5, 5, 7, 9]\nmean = sum(data) / len(data)\nvariance = sum((x - mean) ** 2 for x in data) / (len(data) - 1)\nprint(round(variance, 2))',
        expectedOutput: '4.57'
      },
      {
        id: 10,
        question: '当p值大于α时，我们应该？',
        type: 'multiple',
        options: ['不拒绝原假设', '拒绝原假设', '接受原假设', '重新抽样'],
        correctAnswer: 0
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
    codeExample: `# 时间序列分析实战 - 纯Python标准库

# 时间序列数据（24个月）
sales = [100, 110, 105, 120, 130, 140, 160, 170, 165, 180, 200, 220,
         110, 120, 115, 130, 140, 150, 170, 180, 175, 190, 210, 230]
months = [f"2023-{i+1:02d}" for i in range(24)]

print("=" * 50)
print("时间序列数据（前12期）")
print("=" * 50)
for i in range(12):
    print(f"{months[i]}: 销售额={sales[i]}")

# 简单移动平均（MA3）
def moving_average(data, window):
    result = []
    for i in range(len(data) - window + 1):
        avg = sum(data[i:i+window]) / window
        result.append(round(avg, 2))
    return result

ma3 = moving_average(sales, 3)

print("\\n" + "=" * 50)
print("3期移动平均")
print("=" * 50)
for i, ma in enumerate(ma3[:12]):
    print(f"{months[i+2]}: MA3={ma}")

# 计算趋势（线性回归斜率）
def linear_trend(data):
    n = len(data)
    x = list(range(n))
    sum_x = sum(x)
    sum_y = sum(data)
    sum_xy = sum(x[i] * data[i] for i in range(n))
    sum_x2 = sum(xi ** 2 for xi in x)
    slope = (n * sum_xy - sum_x * sum_y) / (n * sum_x2 - sum_x ** 2)
    return slope

trend = linear_trend(sales)
print(f"\\n整体趋势斜率: {trend:.4f}")
print(f"每月平均变化: {trend:.2f} 单位")`,
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
      },
      {
        id: 4,
        question: '时间序列平稳性是指？',
        options: ['均值和方差随时间保持不变', '数据持续增长', '数据持续下降', '季节性变化'],
        correctAnswer: 0,
        explanation: '平稳性指统计特性不随时间变化'
      },
      {
        id: 5,
        question: 'ARIMA模型中的I表示？',
        options: ['差分', '自回归', '移动平均', '季节性'],
        correctAnswer: 0,
        explanation: 'I表示差分阶数，使序列平稳'
      },
      {
        id: 6,
        question: '指数平滑法中，α越大表示？',
        options: ['越重视近期数据', '越重视远期数据', '数据不变', '趋势越强'],
        correctAnswer: 0,
        explanation: 'α越大，对近期数据越敏感'
      },
      {
        id: 7,
        question: '时间序列预测中，训练集和测试集通常？',
        options: ['按时间顺序划分', '随机划分', '交叉划分', '按值划分'],
        correctAnswer: 0,
        explanation: '时间序列必须按时间顺序划分'
      },
      {
        id: 8,
        question: '季节性分解中，STL是指？',
        options: ['季节性趋势分解', '简单移动平均', '指数平滑', '自回归'],
        correctAnswer: 0,
        explanation: 'STL是Seasonal and Trend decomposition using Loess'
      },
      {
        id: 9,
        question: '滞后算子lag在时间序列中的作用是？',
        options: ['引用前一期数据', '引用后一期数据', '计算差分', '计算均值'],
        correctAnswer: 0,
        explanation: 'lag用于访问之前的数据点'
      },
      {
        id: 10,
        question: '自相关函数(ACF)用于？',
        options: ['衡量与自身滞后值的相关性', '平滑数据', '分解季节性', '预测未来'],
        correctAnswer: 0,
        explanation: 'ACF衡量不同滞后阶之间的相关性'
      }
    ],
    exam: [
      {
        id: 1,
        question: '计算3期移动平均',
        type: 'code',
        codePrompt: 'data = [10, 20, 30, 40, 50]\nwindow = 3\nresult = []\nfor i in range(len(data) - window + 1):\n    result.append(sum(data[i:i+window]) / window)\nprint(result)',
        expectedOutput: '[20.0, 30.0, 40.0]'
      },
      {
        id: 2,
        question: '时间序列数据必须有时间索引',
        type: 'multiple',
        options: ['正确', '错误'],
        correctAnswer: 0
      },
      {
        id: 3,
        question: '移动平均的window越大，曲线越？',
        type: 'multiple',
        options: ['平滑', '陡峭', '不变', '波动大'],
        correctAnswer: 0
      },
      {
        id: 4,
        question: '季节性成分的周期通常根据什么确定？',
        type: 'multiple',
        options: ['业务周期和数据特征', '数据量大小', '计算能力', '存储空间'],
        correctAnswer: 0
      },
      {
        id: 5,
        question: 'ARIMA中d=0表示？',
        type: 'multiple',
        options: ['不进行差分', '一阶差分', '二阶差分', '季节性差分'],
        correctAnswer: 0
      },
      {
        id: 6,
        question: '简单指数平滑适用于？',
        type: 'multiple',
        options: ['无趋势无季节性的序列', '有趋势的序列', '有季节性的序列', '任意序列'],
        correctAnswer: 0
      },
      {
        id: 7,
        question: '残差成分是指？',
        type: 'multiple',
        options: ['无法被解释的随机成分', '趋势成分', '季节成分', '确定成分'],
        correctAnswer: 0
      },
      {
        id: 8,
        question: '时间序列分解通常包括？',
        type: 'multiple',
        options: ['趋势、季节、残差', '均值、方差、协方差', '线性、非线性、随机', '短期、中期、长期'],
        correctAnswer: 0
      },
      {
        id: 9,
        question: '计算加权移动平均',
        type: 'code',
        codePrompt: 'data = [10, 20, 30, 40]\nweights = [0.1, 0.2, 0.3, 0.4]\nwma = sum(d * w for d, w in zip(data, weights))\nprint(wma)',
        expectedOutput: '30.0'
      },
      {
        id: 10,
        question: '偏自相关函数(PACF)衡量的是？',
        type: 'multiple',
        options: ['排除中间滞后影响后的相关性', '所有滞后阶的相关性', '季节性相关性', '随机性'],
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
      '特征缩放(归一化/标准化)',
      '特征构造技巧'
    ],
    codeExample: `# 特征工程实战 - 纯Python标准库
import math

# 示例数据
data = {
    '年龄': [25, 30, 35, 40, 45],
    '收入': [50000, 60000, 75000, 90000, 100000],
    '经验': [3, 5, 7, 10, 12]
}

print("=" * 50)
print("原始数据")
print("=" * 50)
for i in range(5):
    print(f"样本{i+1}: 年龄={data['年龄'][i]}, 收入={data['收入'][i]}, 经验={data['经验'][i]}")

# 标准化 (Z-score)
def standardize(values):
    mean = sum(values) / len(values)
    std = math.sqrt(sum((x - mean) ** 2 for x in values) / len(values))
    return [(x - mean) / std for x in values]

# 归一化 (Min-Max)
def normalize(values):
    min_val = min(values)
    max_val = max(values)
    return [(x - min_val) / (max_val - min_val) for x in values]

print("\\n" + "=" * 50)
print("标准化 (Z-score)")
print("=" * 50)
for col, values in data.items():
    standardized = standardize(values)
    print(f"{col}: {[round(v, 2) for v in standardized]}")

print("\\n" + "=" * 50)
print("归一化 (Min-Max [0,1])")
print("=" * 50)
for col, values in data.items():
    normalized = normalize(values)
    print(f"{col}: {[round(v, 2) for v in normalized]}")`,
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
      },
      {
        id: 4,
        question: '标准化(Z-score)公式是？',
        options: ['(x-μ)/σ', '(x-min)/(max-min)', 'x/σ', 'x-μ'],
        correctAnswer: 0,
        explanation: 'Z-score标准化公式'
      },
      {
        id: 5,
        question: '归一化后数据的范围是？',
        options: ['[0, 1]', '[-1, 1]', '[-∞, ∞]', '均值附近'],
        correctAnswer: 0,
        explanation: 'Min-Max归一化后数据在[0,1]'
      },
      {
        id: 6,
        question: '特征选择方法不包括？',
        options: ['增加特征', '过滤法', '包装法', '嵌入法'],
        correctAnswer: 0,
        explanation: '特征选择是减少特征，不是增加'
      },
      {
        id: 7,
        question: '方差过滤法的原理是？',
        options: ['去除方差为0的特征', '去除方差小的特征', '保留方差大的特征', '所有选项'],
        correctAnswer: 3,
        explanation: '方差过滤去除无用的低方差特征'
      },
      {
        id: 8,
        question: '树模型（如随机森林）不需要？',
        options: ['特征缩放', '特征选择', '特征编码', '特征构造'],
        correctAnswer: 0,
        explanation: '树模型对特征缩放不敏感'
      },
      {
        id: 9,
        question: 'one-hot编码用于处理？',
        options: ['类别特征', '数值特征', '连续特征', '时序特征'],
        correctAnswer: 0,
        explanation: 'one-hot将类别特征转为数值'
      },
      {
        id: 10,
        question: '标签编码(label encoding)会引入？',
        options: [' ordinality（顺序关系）', '非线性', '稀疏性', '缺失值'],
        correctAnswer: 0,
        explanation: '标签编码会让模型误以为存在顺序'
      }
    ],
    exam: [
      {
        id: 1,
        question: 'MinMax归一化计算',
        type: 'code',
        codePrompt: 'data = [1, 2, 3, 4, 5]\nmin_val, max_val = min(data), max(data)\nresult = [(x - min_val) / (max_val - min_val) for x in data]\nprint([round(v, 2) for v in result])',
        expectedOutput: '[0.0, 0.25, 0.5, 0.75, 1.0]'
      },
      {
        id: 2,
        question: '标准化对异常值敏感',
        type: 'multiple',
        options: ['正确', '错误'],
        correctAnswer: 0
      },
      {
        id: 3,
        question: '归一化(min-max)对异常值？',
        type: 'multiple',
        options: ['敏感', '不敏感', '取决于α', '无影响'],
        correctAnswer: 0
      },
      {
        id: 4,
        question: 'one-hot编码后特征数量？',
        type: 'multiple',
        options: ['增加', '减少', '不变', '不确定'],
        correctAnswer: 0
      },
      {
        id: 5,
        question: '互信息(Mutual Information)用于？',
        type: 'multiple',
        options: ['特征选择', '特征缩放', '特征构造', '降维'],
        correctAnswer: 0
      },
      {
        id: 6,
        question: 'L1正则化会产生？',
        type: 'multiple',
        options: ['稀疏特征矩阵', '密集特征矩阵', '特征相关性', '特征重要性排序'],
        correctAnswer: 0
      },
      {
        id: 7,
        question: '类别型特征优先使用？',
        type: 'multiple',
        options: ['one-hot编码', '标签编码', '数值替换', '直接使用'],
        correctAnswer: 0
      },
      {
        id: 8,
        question: '连续特征离散化的好处是？',
        type: 'multiple',
        options: ['增强模型鲁棒性', '减少过拟合', '处理非线性关系', '所有选项'],
        correctAnswer: 3
      },
      {
        id: 9,
        question: 'Z-score标准化计算',
        type: 'code',
        codePrompt: 'import math\ndata = [10, 20, 30]\nmean = sum(data) / len(data)\nstd = math.sqrt(sum((x - mean) ** 2 for x in data) / len(data))\nstandardized = [(x - mean) / std for x in data]\nprint([round(v, 2) for v in standardized])',
        expectedOutput: '[-1.0, 0.0, 1.0]'
      },
      {
        id: 10,
        question: 'Embedded方法（如Lasso）的特点？',
        type: 'multiple',
        options: ['训练过程中自动选择特征', '需要先选特征再训练', '效果不如过滤法', '无法处理高维数据'],
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
    codeExample: `# 异常值检测实战 - 纯Python标准库
import math

# 示例数据（含异常值）
data = [10, 12, 11, 13, 12, 14, 11, 12, 100, 13, 11, 12]

print("=" * 50)
print("原始数据")
print("=" * 50)
print(data)

# 计算分位数
def percentile(data, p):
    sorted_data = sorted(data)
    n = len(sorted_data)
    k = (n - 1) * p / 100
    f = math.floor(k)
    c = math.ceil(k)
    if f == c:
        return sorted_data[int(k)]
    return sorted_data[f] * (c - k) + sorted_data[c] * (k - f)

# IQR方法
Q1 = percentile(data, 25)
Q3 = percentile(data, 75)
IQR = Q3 - Q1

lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

print("\\n" + "=" * 50)
print("IQR异常值检测")
print("=" * 50)
print(f"Q1 (25%): {Q1}")
print(f"Q3 (75%): {Q3}")
print(f"IQR: {IQR}")
print(f"下界: {lower}")
print(f"上界: {upper}")

# 检测异常值
outliers = [x for x in data if x < lower or x > upper]
normal = [x for x in data if lower <= x <= upper]

print(f"\\n正常值: {normal}")
print(f"异常值: {outliers}")

# Z-score方法
def zscore(data):
    mean = sum(data) / len(data)
    std = math.sqrt(sum((x - mean) ** 2 for x in data) / len(data))
    return [(x - mean) / std for x in data]

z_scores = zscore(data)
print("\\n" + "=" * 50)
print("Z-score检测 (|Z| > 2.5)")
print("=" * 50)
for i, z in enumerate(z_scores):
    flag = " <-- 异常" if abs(z) > 2.5 else ""
    print(f"数据{data[i]}: Z={z:.2f}{flag}")`,
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
      },
      {
        id: 4,
        question: 'IQR是指？',
        options: ['Q3-Q1', 'Q3+Q1', 'Q3/Q1', 'Q3-Q3'],
        correctAnswer: 0,
        explanation: 'IQR是四分位距，Q3-Q1'
      },
      {
        id: 5,
        question: '箱线图中，超过须线的数据点为？',
        options: ['异常值', '正常值', '缺失值', '重复值'],
        correctAnswer: 0,
        explanation: '箱线图须线外的点视为异常'
      },
      {
        id: 6,
        question: 'Z-score方法中，通常使用的阈值是？',
        options: ['2.5或3', '0.5', '1', '10'],
        correctAnswer: 0,
        explanation: '通常|Z|>2.5或3视为异常'
      },
      {
        id: 7,
        question: '异常值对哪些统计量影响最大？',
        options: ['均值', '中位数', '众数', '四分位数'],
        correctAnswer: 0,
        explanation: '均值对异常值敏感，中位数稳健'
      },
      {
        id: 8,
        question: 'Isolation Forest是基于？',
        options: ['异常点容易被隔离', '密度聚类', '距离计算', '回归分析'],
        correctAnswer: 0,
        explanation: 'Isolation Forest利用异常点的隔离性质'
      },
      {
        id: 9,
        question: 'DBSCAN可用于异常值检测是因为？',
        options: ['噪声点被视为异常', '密度不均匀', '聚类结果不稳定', '需要指定K值'],
        correctAnswer: 0,
        explanation: 'DBSCAN将噪声点（不属于任何簇的点）视为异常'
      },
      {
        id: 10,
        question: 'LOF（局部离群因子）基于？',
        options: ['局部密度偏差', '全局距离', '均值偏差', '聚类中心'],
        correctAnswer: 0,
        explanation: 'LOF通过比较局部密度来检测异常'
      }
    ],
    exam: [
      {
        id: 1,
        question: '计算IQR',
        type: 'code',
        codePrompt: 'data = [1, 2, 3, 4, 5, 100]\nsorted_data = sorted(data)\nQ1_idx = int(len(sorted_data) * 0.25) - 1\nQ3_idx = int(len(sorted_data) * 0.75) - 1\nQ1 = sorted_data[Q1_idx]\nQ3 = sorted_data[Q3_idx]\nIQR = Q3 - Q1\nprint(IQR)',
        expectedOutput: '3'
      },
      {
        id: 2,
        question: '箱线图可以检测异常值',
        type: 'multiple',
        options: ['正确', '错误'],
        correctAnswer: 0
      },
      {
        id: 3,
        question: 'Z-score标准化后，均值和标准差是？',
        type: 'multiple',
        options: ['0和1', '1和0', '0和0', '1和1'],
        correctAnswer: 0
      },
      {
        id: 4,
        question: 'Q1是数据的？',
        type: 'multiple',
        options: ['25%分位数', '50%分位数', '75%分位数', '最大值'],
        correctAnswer: 0
      },
      {
        id: 5,
        question: '基于密度的方法（如LOF）检测异常值依赖于？',
        type: 'multiple',
        options: ['局部邻域密度', '全局密度', '固定阈值', '排序位置'],
        correctAnswer: 0
      },
      {
        id: 6,
        question: 'Grubbs检验用于检测？',
        type: 'multiple',
        options: ['单个异常值', '多个异常值', '缺失值', '重复值'],
        correctAnswer: 0
      },
      {
        id: 7,
        question: '异常值检测后，我们应该？',
        type: 'multiple',
        options: ['根据业务场景决定处理方式', '直接删除所有异常值', '保留所有异常值', '将异常值改为均值'],
        correctAnswer: 0
      },
      {
        id: 8,
        question: '多变量异常值检测考虑？',
        type: 'multiple',
        options: ['多个变量之间的关系', '单个变量', '变量顺序', '变量数量'],
        correctAnswer: 0
      },
      {
        id: 9,
        question: '马氏距离(Mahalanobis distance)可用于？',
        type: 'code',
        codePrompt: '# 简化的2D马氏距离概念\nimport math\n\ndef euclidean_distance(p1, p2):\n    return math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)\n\npoint = [10, 10]\ncenter = [5, 5]\ndist = euclidean_distance(point, center)\nprint(round(dist, 2))',
        expectedOutput: '7.07'
      },
      {
        id: 10,
        question: 'iforest（隔离森林）的核心思想是？',
        type: 'multiple',
        options: ['异常点更容易被随机切分隔离', '异常点密度更高', '异常点距离更近', '异常点方差更小'],
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
    codeExample: `# 多数据集合并实战 - 纯Python标准库

# 数据集1: 用户信息
users = {
    '用户ID': [1, 2, 3, 4],
    '姓名': ['张三', '李四', '王五', '赵六'],
    '城市': ['北京', '上海', '北京', '广州']
}

# 数据集2: 订单信息
orders = {
    '订单ID': [101, 102, 103, 104],
    '用户ID': [1, 2, 1, 3],
    '金额': [100, 200, 150, 300]
}

print("=" * 50)
print("用户信息表")
print("=" * 50)
for i in range(len(users['用户ID'])):
    print(f"ID:{users['用户ID'][i]} 姓名:{users['姓名'][i]} 城市:{users['城市'][i]}")

print("\\n" + "=" * 50)
print("订单信息表")
print("=" * 50)
for i in range(len(orders['订单ID'])):
    print(f"订单:{orders['订单ID'][i]} 用户ID:{orders['用户ID'][i]} 金额:{orders['金额'][i]}")

# 内连接实现
def inner_join(dict1, dict2, key):
    result = []
    for i, k1 in enumerate(dict1[key]):
        for j, k2 in enumerate(dict2[key]):
            if k1 == k2:
                row = {k: dict1[k][i] for k in dict1.keys()}
                row.update({k: dict2[k][j] for k in dict2.keys() if k != key})
                result.append(row)
    return result

merged = inner_join(users, orders, '用户ID')

print("\\n" + "=" * 50)
print("内连接合并结果")
print("=" * 50)
for row in merged:
    print(row)

# 左连接实现
def left_join(dict1, dict2, key):
    result = []
    for i in range(len(dict1[key])):
        row = {k: dict1[k][i] for k in dict1.keys()}
        matched = False
        for j, k2 in enumerate(dict2[key]):
            if dict1[key][i] == k2:
                row.update({k: dict2[k][j] for k in dict2.keys() if k != key})
                matched = True
                break
        if not matched:
            row.update({k: None for k in dict2.keys() if k != key})
        result.append(row)
    return result

left_merged = left_join(users, orders, '用户ID')
print("\\n" + "=" * 50)
print("左连接合并结果（含NULL）")
print("=" * 50)
for row in left_merged:
    print(row)`,
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
      },
      {
        id: 4,
        question: '左连接(left join)保留？',
        options: ['左表所有记录', '右表所有记录', '两表所有记录', '交集'],
        correctAnswer: 0,
        explanation: '左连接保留左表的全部记录'
      },
      {
        id: 5,
        question: '外连接(outer join)保留？',
        options: ['两表所有记录', '左表记录', '右表记录', '交集'],
        correctAnswer: 0,
        explanation: '外连接保留两表的所有记录'
      },
      {
        id: 6,
        question: 'concat()中axis=0表示？',
        options: ['按行拼接', '按列拼接', '删除行', '删除列'],
        correctAnswer: 0,
        explanation: 'axis=0沿行方向拼接'
      },
      {
        id: 7,
        question: 'join()默认使用的合并方式是？',
        options: ['左连接', '内连接', '右连接', '外连接'],
        correctAnswer: 0,
        explanation: 'DataFrame.join()默认左连接'
      },
      {
        id: 8,
        question: '合并时处理重复列名使用什么参数？',
        options: ['suffixes', 'names', 'levels', 'keys'],
        correctAnswer: 0,
        explanation: 'suffixes参数处理重复列名'
      },
      {
        id: 9,
        question: 'right_on参数用于指定？',
        options: ['右表连接键', '左表连接键', '新列名', '连接方式'],
        correctAnswer: 0,
        explanation: 'right_on指定右表中的连接键'
      },
      {
        id: 10,
        question: 'concat()中ignore_index=True的作用是？',
        options: ['重置索引', '保留原索引', '删除索引', '创建新索引'],
        correctAnswer: 0,
        explanation: 'ignore_index=True会重置索引'
      }
    ],
    exam: [
      {
        id: 1,
        question: '合并两个数据集',
        type: 'code',
        codePrompt: '# 简单的内连接\nusers = {1: \'张三\', 2: \'李四\'}\norders = {1: 100, 2: 200}\nmerged = [(u, orders[u]) for u in users if u in orders]\nprint(merged)',
        expectedOutput: '[(1, 100), (2, 200)]'
      },
      {
        id: 2,
        question: 'concat()可以沿行或列连接',
        type: 'multiple',
        options: ['正确', '错误'],
        correctAnswer: 0
      },
      {
        id: 3,
        question: 'merge()和join()的主要区别是？',
        type: 'multiple',
        options: ['merge基于列，join基于索引', 'join基于列，merge基于索引', '两者完全相同', 'merge更快'],
        correctAnswer: 0
      },
      {
        id: 4,
        question: 'concat()的join参数默认是？',
        type: 'multiple',
        options: ['outer', 'inner', 'left', 'right'],
        correctAnswer: 0
      },
      {
        id: 5,
        question: '当合并的键名不同但含义相同时，使用？',
        type: 'multiple',
        options: ['left_on和right_on', 'on参数', 'how参数', 'sort参数'],
        correctAnswer: 0
      },
      {
        id: 6,
        question: 'merge时sort=True的作用是？',
        type: 'multiple',
        options: ['对结果按键排序', '删除重复', '填充缺失值', '重置索引'],
        correctAnswer: 0
      },
      {
        id: 7,
        question: '右连接(right join)保留？',
        type: 'multiple',
        options: ['右表所有记录', '左表所有记录', '两表交集', '两表并集'],
        correctAnswer: 0
      },
      {
        id: 8,
        question: 'DataFrame.append()的作用是？',
        type: 'multiple',
        options: ['按行拼接', '按列拼接', '合并键', '删除重复'],
        correctAnswer: 0
      },
      {
        id: 9,
        question: '使用concat合并Series',
        type: 'code',
        codePrompt: 'import pandas as pd\ns1 = pd.Series([1, 2, 3])\ns2 = pd.Series([4, 5, 6])\nresult = pd.concat([s1, s2])\nprint(result.tolist())',
        expectedOutput: '[1, 2, 3, 4, 5, 6]'
      },
      {
        id: 10,
        question: 'indicator参数在merge中的作用是？',
        type: 'multiple',
        options: ['添加合并来源列', '删除重复列', '排序结果', '重置索引'],
        correctAnswer: 0
      }
    ]
  }
];
