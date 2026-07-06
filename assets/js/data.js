/**
 * 📦 每日技术晨报 — 数据层
 * 所有历史数据嵌入在此，由 APP 按频道/日期读取
 */

const HISTORY = ["2026-07-06","2026-07-03","2026-07-02","2026-07-01","2026-06-30","2026-06-29"];

/* =============================================================
   面板显示 · 新闻速递
   ============================================================= */
const DISPLAY_NEWS = {
  "2026-07-06": {
    date:"2026-07-06", weekday:"周一", period:"07.03 – 07.06",
    summary:"周一汇总版：苹果折叠iPhone备货上调至1000万台，三星显示独家供应OLED面板；LCD电视面板7月全线转跌；三星显示A4线$2.5B扩产柔性OLED；友达新设创新研究院转型；ETRI开发单基板QD-OLED新工艺。",
    focus:"苹果折叠备货千万、LCD价格转跌、三星OLED扩产、友达转型、QD-OLED新工艺",
    highlights:[
      "苹果折叠iPhone备货从700-800万台上调至约1000万台，三星显示独家供OLED",
      "LCD电视面板7月全线转跌：32吋以上跌$1-$8，稼动率压至80%",
      "三星显示牙山A4线$2.5B扩产柔性OLED，新增15K/月产能",
      "韩国ETRI开发单基板QD-OLED沉积工艺，有望降本提分辨率"
    ],
    // ===== 三级新闻：重磅 / 标准 / 快讯 =====
    news:[
      {
        id:1, weight:"heavy",
        title:"苹果折叠iPhone备货上调至1000万台，全年产量远超2.2亿部，三星显示独家供OLED",
        tags:["Apple","折叠OLED"],
        route:"↑突破",
        category:"折叠OLED",
        event:"据日经亚洲7/2援引知情人士消息，苹果已将首款折叠屏iPhone今年的生产准备目标从700万至800万部上调至约1000万部，上修幅度近30%。苹果同时为2026年下半年新机锁定了足够生产8000万部手机的零部件。三星显示已拿下苹果首款折叠iPhone OLED模块量产审批并开始初期出货。",
        trend:"折叠OLED从「试水」进入「放量」阶段，苹果折叠机的OLED面板量级将重塑中韩折叠OLED产能分配。",
        reason:"苹果在存储芯片荒中逆势加单，供应链控制力是核心竞争力。折叠iPhone的OLED独家供应格局将强化三星显示的绝对优势。",
        source:"日经亚洲/IT之家",
        url:"https://finance.sina.com.cn/tech/digi/2026-07-02/doc-iniizyeu1636480.shtml",
        image:"https://images.unsplash.com/photo-1592434134753-a70baf7979b6?w=800&q=80",
        imageCaption:"苹果折叠iPhone渲染概念图",
        date:"2026-07-02"
      },
      {
        id:2, weight:"heavy",
        title:"LCD电视面板7月全线转跌：小尺寸$1、中大$2-3、超大$5-8，稼动率已压至80%",
        tags:["LCD","电视面板","洛图科技","TrendForce"],
        route:"↓受阻",
        category:"a-Si TFT-LCD",
        event:"洛图科技(RUNTO)7月最新数据显示，全球液晶电视面板价格自5月全线停涨、6月持平后，7月正式开启下行通道：32吋和43吋小尺寸下跌1美元，50吋至75吋中大型尺寸下跌2-3美元，85吋及以上超大尺寸下跌5-8美元。Q2高世代线整体稼动率已滑至约80%。洛图科技判断2026全年价格走势为Q1涨→Q2稳→Q3调节→Q4待观察。",
        trend:"年初控产稳价预期被7月价格转跌打破，面板格局优化叙事面临考验。减产与降价并行揭示的是需求端疲软而非供给端收紧。",
        reason:"Q3是检验面板厂定价纪律的关键窗口。若继续减产挺价，价格有望在Q4企稳；若价格战重启，行业盈利将快速恶化。",
        source:"洛图科技/流媒体网/TrendForce",
        url:"https://www.163.com/dy/article/JDA6H0BJ05118L5B.html",
        image:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
        imageCaption:"LCD电视面板市场趋势分析",
        date:"2026-07-03"
      },
      {
        id:3, weight:"standard",
        title:"三星显示牙山A4线$2.5B扩产柔性OLED，新增15K/月产能瞄准折叠屏需求",
        tags:["Samsung Display","A4","柔性OLED"],
        route:"↑突破",
        category:"柔性AMOLED",
        event:"据OLED-Info 7/2援引韩国最新消息，三星显示已正式确认牙山A4产线扩产计划，追加15,000片/月玻璃基板柔性OLED产能，总投资约25亿美元。2027年底前完成。三星显示目前为苹果首款折叠iPhone独家供应OLED面板。",
        trend:"15K/月Gen 6产能对应约数百万部折叠手机面板，将巩固韩系在折叠OLED领域的绝对优势。",
        source:"OLED-Info/Digitimes",
        url:"https://www.oled-info.com/samsung-display-a4-line",
        image:"https://images.unsplash.com/photo-1635344730571-b3566f31c09c?w=800&q=80",
        imageCaption:"三星显示A4线扩产示意",
        date:"2026-07-02"
      },
      {
        id:4, weight:"standard",
        title:"友达新设创新研究院+三大事业群公司化：聚焦Micro LED/CPO/AR/LEO",
        tags:["友达","AUO","Micro LED","CPO"],
        route:"↑突破",
        category:"Micro LED",
        event:"友达光电7月1日宣布重大组织调整：新设一级研发平台创新研究院，由技术长廖唯伦博士出任院长，统筹CPO光通信、AR眼镜及低轨卫星通讯天线等前瞻技术团队；同时敲定三大事业群公司化独立运营机制。",
        trend:"友达的公司化+创新研究院组合拳是台系面板厂应对大陆8.6代OLED冲击的战略标杆。",
        source:"IT之家/雪球/Digitimes",
        url:"https://www.ithome.com/0/888/888.htm",
        image:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
        imageCaption:"友达光电创新研究院",
        date:"2026-07-01"
      },
      {
        id:5, weight:"standard",
        title:"韩国ETRI联合Gosan Tech/Duksan Neolux开发单基板QD-OLED沉积工艺",
        tags:["ETRI","QD-OLED","喷墨打印"],
        route:"↑突破",
        category:"QD-OLED",
        event:"韩国电子通信研究院(ETRI)与Gosan Tech、Duksan Neolux合作，开发出一种基于喷墨打印的单基板QD-OLED沉积新工艺。可在同一基板上完成全部沉积，省去键合对准步骤，既简化流程又实现更高分辨率。",
        trend:"单基板QD-OLED若能量产，将大幅降低制造成本并提升分辨率上限，可能推动QD-OLED从高端下探至主流价位。",
        source:"OLED-Info",
        url:"https://www.oled-info.com/etri-qd-oled",
        image:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        imageCaption:"QD-OLED单基板工艺示意",
        date:"2026-07-02"
      },
      {
        id:6, weight:"standard",
        title:"LORDIN首次公开蓝光磷光Pt掺杂材料分子结构，向商业化迈出关键一步",
        tags:["LORDIN","ZETPLEX","蓝光磷光","Pt掺杂"],
        route:"↑突破",
        category:"磷光OLED材料",
        event:"韩国OLED材料公司LORDIN首次在同行评审期刊上公开其ZETPLEX铂(Pt)掺杂蓝光磷光发光材料的分子结构。蓝光磷光材料是OLED领域长期未解的关键瓶颈——目前蓝光仍使用效率较低的荧光材料，若实现磷光替代，理论上可将蓝光效率提升至4倍。",
        trend:"UDC的铱系磷光专利垄断可能被铂系材料打破，将改变OLED发光材料供应链格局。",
        source:"OLED-Info",
        url:"https://www.oled-info.com/lordin-zetplex",
        image:"https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
        imageCaption:"蓝光磷光材料结构示意",
        date:"2026-07-03"
      }
      // 快讯示例通过flash数组单独提供
    ],
    flash:[
      {title:"群创出售南京厂交易额约220亿新台币，买家为当地国资背景企业", source:"Digitimes", url:"#"},
      {title:"JDI eLEAP项目获日本政府约2万亿日元融资支持", source:"OLED-Info", url:"#"},
      {title:"维信诺合肥G6柔性AMOLED产线良率达行业领先水平", source:"IT之家", url:"#"}
    ],
    routes:[
      {name:"折叠OLED", status:"↑突破", note:"苹果折叠iPhone备货上调至1000万台，三星显示独家供OLED"},
      {name:"a-Si TFT-LCD", status:"↓受阻", note:"7月全线转跌，小尺寸$1、中大$2-3、超大$5-8，稼动率80%"},
      {name:"柔性AMOLED", status:"↑突破", note:"三星显示A4线$2.5B扩产，新增15K/月产能"},
      {name:"Micro LED/CPO", status:"↑突破", note:"友达新设创新研究院，聚焦Micro LED/CPO/AR"},
      {name:"QD-OLED", status:"↑突破", note:"ETRI开发单基板QD-OLED沉积工艺"},
      {name:"磷光OLED材料", status:"↑突破", note:"LORDIN公开蓝光磷光Pt掺杂材料结构"}
    ],
    sources:["日经亚洲","洛图科技","TrendForce","OLED-Info","IT之家","Digitimes","The Elec"]
  }
};

/* =============================================================
   面板显示 · 论文研讨
   ============================================================= */
const DISPLAY_PAPER = {
  "2026-07-03": {
    date:"2026-07-03", weekday:"周五", period:"07.02 – 07.03",
    summary:"华南理工大学彭俊彪教授×吉林大学王悦教授联合团队在Organic Electronics Vol.153发表螺芴辅助纯蓝MR-TADC发射体Me-t-DABNA-SF——螺芴基团调控前线分子轨道实现LRCT+SRCT混合激发态，kRISC 1.4×10⁵ s⁻¹，EQEmax 27.9%（纯蓝CIE (0.14, 0.07)，FWHM 26 nm），TADF敏化后提升至35.6%。",
    focus:"MR-TADF / 螺芴辅助分子设计 / 纯蓝OLED / kRISC加速",
    highlights:[
      "Me-t-DABNA-SF：螺芴基团引入MR骨架，kRISC = 1.4×10⁵ s⁻¹（比母核提高1.4倍）",
      "纯蓝窄带发射：EL峰值458 nm，FWHM 26 nm，CIE (0.14, 0.07) 满足NTSC标准",
      "EQEmax 27.9%（非敏化），TADF敏化后提升至35.6%",
      "分子量<1000 g/mol，可升华，克服大分子MR-TADF无法蒸镀的瓶颈"
    ],
    papers:[{
      id:1,
      title:"High-performance blue MR-TADF emitter achieved by spirofluorene-assisted frontier molecular orbital regulation (螺芴辅助前线分子轨道调控实现高性能纯蓝MR-TADF发射体)",
      authors:"Lili Hou, Chao Jiang (华南理工大学&吉林大学), Yufang Nie, Xiaodong Guo (吉林大学), Yue Wang (吉林大学, 通讯), Junbiao Peng (华南理工大学, 通讯)",
      field:"纯蓝MR-TADF OLED / 螺芴辅助分子设计",
      paperType:"期刊论文",
      venue:"Organic Electronics, Vol.153, June 2026, 107407",
      oneLiner:"螺芴基团引入MR骨架调控前线轨道→LRCT+SRCT混合态加速kRISC 1.4×10⁵ s⁻¹，EQE 27.9%→35.6%（敏化），纯蓝CIE (0.14, 0.07)。",
      abstract:"纯有机多重共振热活化延迟荧光(MR-TADF)材料兼具100%激子利用率与窄带发射，在先进OLED显示中前景广阔。然而，缓慢的反向系间窜跃速率(kRISC)导致MR-TADF器件严重效率滚落，且可升华的蓝光MR-TADF分子设计策略仍十分稀缺。本文提出螺芴辅助分子设计策略，将螺芴基团引入MR骨架的未配位芳胺位置，精准调控前线分子轨道(FMO)：LUMO 86.2%定域于螺芴基团，构建长程电荷转移(LRCT)与短程电荷转移(SRCT)混合激发态，增大自旋-轨道耦合(SOC)常数，使Me-t-DABNA-SF的kRISC达到1.4×10⁵ s⁻¹。优化器件在458 nm发射，FWHM 26 nm，CIE (0.14, 0.07)满足NTSC纯蓝标准；EQEmax 27.9%，经TADF敏化策略进一步提升至35.6%。",
      content:"核心创新在于螺芴辅助分子设计策略(spirofluorene-assisted molecular design)：将螺芴(spirofluorene)基团引入Me-t-DABNA的MR骨架未配位芳胺位置，形成目标分子Me-t-DABNA-SF。设计原理分三层：(1)FMO调控——LUMO主要定域于螺芴基团（贡献86.2%的S₁ HOMO→LUMO跃迁），形成LRCT+SRCT混合激发态，SOC常数增大促进RISC过程；(2)RISC加速——Me-t-DABNA-SF kRISC = 1.4×10⁵ s⁻¹，比对照分子Me-t-DABNA的1.0×10⁵ s⁻¹提高40%，源于螺芴带来的SOC增强与ΔEST优化；(3)抗聚集效应——螺芴正交构型增大相邻分子间距，抑制聚集诱导猝灭(ACQ)和三线态-三线态湮灭(TTA)。非敏化纯蓝器件EQEmax 27.9%，CE 45.4 cd/A，PE 30.9 lm/W，EL峰值458 nm，FWHM 26 nm，CIE (0.14, 0.07)。TADF敏化器件采用4CzIPN敏化，EQEmax提升至35.6%。分子量<1000 g/mol，升华温度适中，可直接用于蒸镀量产线，克服了传统大分子MR-TADF(MW>1000)无法蒸镀的瓶颈。",
      techIntro:"多重共振热活化延迟荧光(MR-TADF)是一类利用硼(B)和氮(N)原子在刚性共轭骨架内交替分布产生多重共振效应的纯有机发光材料，具有窄带发射(FWHM<30nm)和100%激子利用率优势，被视为下一代OLED显示蓝光发射体的候选。其核心瓶颈在于反向系间窜跃(RISC)速率慢。螺芴(spirofluorene)是由两个苯环通过一个共用碳原子正交连接的刚性结构，引入后既调控前线分子轨道分布，又利用正交构型的位阻效应抑制分子聚集。LRCT(长程电荷转移)和SRCT(短程电荷转移)的混合态使跃迁偶极矩增大，SOC常数提升，加速RISC。EQEmax为最大外量子效率；kRISC为反向系间窜跃速率；SOC为自旋-轨道耦合常数；FWHM为半峰宽；CIE为国际照明委员会色坐标。",
      techTags:["MR-TADF","螺芴辅助分子设计","Me-t-DABNA-SF","LRCT+SRCT混合态","kRISC加速","自旋-轨道耦合","抗聚集发光","纯蓝OLED","TADF敏化策略","华南理工大学","吉林大学"],
      metrics:[
        {name:"EQEmax（非敏化）",value:"27.9",unit:"%",note:"CIE (0.14, 0.07)"},
        {name:"EQEmax（TADF敏化）",value:"35.6",unit:"%",note:"4CzIPN敏化"},
        {name:"kRISC",value:"1.4×10⁵",unit:"s⁻¹",note:"比Me-t-DABNA提高40%"},
        {name:"CIE色坐标",value:"(0.14, 0.07)",unit:"",note:"满足NTSC纯蓝标准"},
        {name:"EL发射峰",value:"458",unit:"nm",note:"纯蓝窄带"},
        {name:"FWHM",value:"26",unit:"nm",note:"窄带发射"},
        {name:"LUMO螺芴贡献",value:"86.2",unit:"%",note:"S₁ HOMO→LUMO占比"},
        {name:"分子量",value:"<1000",unit:"g/mol",note:"可升华，适用于蒸镀"}
      ],
      source:"Organic Electronics (Elsevier)",
      url:"https://www.sciencedirect.com/science/article/pii/S1566119926000364",
      image:"https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
      imageCaption:"蓝光OLED发光材料与分子结构示意",
      date:"2026-06-01",
      attachments:[
        {label:"PDF全文（本地缓存）", url:"data/display/attachments/2026-07-03/Me-t-DABNA-SF.pdf", cached:true},
        {label:"SI补充材料", url:"data/display/attachments/2026-07-03/Me-t-DABNA-SF-si.pdf", cached:true},
        {label:"原文摘要页", url:"https://www.sciencedirect.com/science/article/pii/S1566119926000364", cached:false}
      ]
    }],
    routes:[
      {name:"蓝光MR-TADF OLED", status:"↑突破", note:"螺芴辅助策略：Me-t-DABNA-SF EQE 27.9%→35.6%(敏化)，可升华"},
      {name:"蓝光超荧光(HF)路线", status:"↑突破", note:"TADF敏化将MR-TADF EQE从27.9%提升至35.6%"},
      {name:"深蓝磷光OLED", status:"→稳定推进", note:"上周清华深研院CF₃-2 EQE 29.0%/LT50 2127h已确立方向"},
      {name:"Micro-QLED/喷墨打印", status:"→稳定推进", note:"福州大学AIJP 30μm Micro-QLED已突破"}
    ],
    sources:["Organic Electronics (Elsevier, Vol.153)","华南理工大学发光材料与器件国家重点实验室","吉林大学超分子结构与材料国家重点实验室"]
  }
};

/* =============================================================
   AI 动态速递
   ============================================================= */
const AI_NEWS = {
  "2026-07-06": {
    date:"2026-07-06", weekday:"周一", period:"07.03 – 07.06",
    summary:"OpenAI GPT-5.6三档发布、自研芯片Jalapeño出样；Anthropic指控阿里Qwen蒸馏攻击；白宫签署前沿AI行政令；SpaceX 600亿收购Anysphere。",
    focus:"GPT-5.6 · 自研芯片 · 蒸馏攻击 · AI监管 · AI编程收购",
    highlights:[
      "OpenAI发布GPT-5.6三档(Sol/Terra/Luna)，Sol编程跑分88.8%超Claude Mythos 5",
      "OpenAI自研推理芯片Jalapeño由Broadcom出样，目标降低推理成本50%",
      "Anthropic致信国会指控阿里Qwen「史上最大蒸馏攻击」",
      "SpaceX 600亿美元全股票收购Cursor母公司Anysphere"
    ],
    news:[
      {
        id:1,
        title:"OpenAI发布GPT-5.6三档，应美政府要求仅向可信合作伙伴限量预览",
        category:"LLM发展",
        event:"6月26日OpenAI公布GPT-5.6家族(Sol旗舰/Terra均衡/Luna轻量)三档。在美国政府要求下，仅向「可信合作伙伴」提供有限预览。Sol引入Max推理强度+Ultra模式，编程Terminal-Bench 2.1标准模式88.8%(超Claude Mythos 5的88.0%)，Ultra模式91.9%。",
        highlight:"Sol定价5美元/百万输入token、30美元/百万输出token，约为Claude Fable 5的一半。",
        reason:"OpenAI用「顶级模型+限量预览」换取监管合作空间，Sol的编程跑分首次系统反超Claude。",
        source:"OpenAI/新浪科技",
        url:"https://finance.sina.com.cn/tech/digi/2026-06-27/doc-inieuyie1636480.shtml",
        image:"https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        imageCaption:"GPT-5.6 模型能力对比",
        date:"2026-06-26",
        keywords:["OpenAI","GPT-5.6","Sol","Terra","Luna"]
      },
      {
        id:2,
        title:"SpaceX 600亿美元全股票收购Cursor母公司Anysphere",
        category:"AI Coding",
        event:"6月16日SpaceX与AI编程IDE Cursor的母公司Anysphere签署最终合并协议，以全股票方式按600亿美元隐含股权估值收购，距离SpaceX历史性纳斯达克IPO仅数日。",
        highlight:"若交易坐实，AI编程将从「开发者工具」变成「航天+AI」巨头的核心资产。",
        reason:"AI Coding市场正在经历前所未有的整合，Cursor被收购标志着赛道进入巨头博弈阶段。",
        source:"彭博/51CTO",
        url:"https://www.51cto.com/article/846611.html",
        image:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        imageCaption:"AI编程工具市场整合加速",
        date:"2026-06-16",
        keywords:["SpaceX","Anysphere","Cursor","收购"]
      },
      {
        id:3,
        title:"Anthropic致信国会，指控阿里Qwen「史上最大蒸馏攻击」",
        category:"其他",
        event:"CNBC披露Anthropic写给美国参议员的信件，声称阿里Qwen团队用2.5万个虚假账号在6周内完成2880万次交互，意图提取Anthropic的agentic推理、编程、长时任务能力。攻击窗口4月22日-6月5日。",
        highlight:"Anthropic自称这是「史上已知最大蒸馏攻击」（第三方未独立核实）。",
        reason:"中美AI摩擦从硬件出口管制升级到模型能力盗用，可能加速国会立法。",
        source:"CNBC/网易科技",
        url:"https://www.cnbc.com/2026/06/24/anthropic-alibaba-distillation-campaign.html",
        image:"https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&q=80",
        imageCaption:"数据安全与AI监管",
        date:"2026-06-24",
        keywords:["Anthropic","阿里","Qwen","蒸馏攻击"]
      }
    ],
    skills:[
      {name:"DeusData/codebase-memory-mcp",source:"GitHub Trending",scene:"AI Coding/代码智能体上下文供给",
       advantage:"高性能代码智能MCP Server，把代码库索引为持久化知识图谱，解决大型monorepo中长任务context window溢出问题。",
       reason:"Agent在大型monorepo跑长任务时context window容易打爆，知识图谱式索引是潜在解决方案。",
       url:"https://github.com/DeusData/codebase-memory-mcp"},
      {name:"HKUDS/Vibe-Trading",source:"GitHub Trending",scene:"个人投资/交易决策Agent",
       advantage:"面向「个人交易智能体」工作流，整合市场数据分析和决策引擎。",
       reason:"金融场景是Agent落地最快的「高频高价值」赛道之一。",
       url:"https://github.com/HKUDS/Vibe-Trading"}
    ],
    sources:["OpenAI","CNBC","白宫","彭博","51CTO"]
  }
};

/* =============================================================
   半导体器件 · 新闻速递
   ============================================================= */
const SEMICONDUCTOR_NEWS = {
  "2026-07-06": {
    date:"2026-07-06", weekday:"周一", period:"07.03 – 07.06",
    summary:"台积电2nm GAA工艺良率突破90%，预计Q4量产；三星3nm Exynos 2600流片成功；英特尔18A工艺获AWS订单；ASML High-NA EUV交付英特尔。",
    focus:"2nm良率 · GAAFET · Exynos 2600 · 英特尔18A · High-NA EUV",
    highlights:[
      "台积电2nm(N2)良率突破90%，Q4量产时间表不变",
      "三星3nm GAE Exynos 2600流片成功，性能较上代提升30%",
      "英特尔18A工艺获AWS下单，标志IFS代工业务重大突破",
      "ASML首台High-NA EUV (0.55NA) 正式交付英特尔"
    ],
    news:[
      {
        id:1, weight:"heavy",
        title:"台积电2nm (N2) 良率突破90%，GAAFET工艺Q4如期量产",
        tags:["台积电","2nm","GAAFET","N2"],
        route:"↑突破",
        category:"先进制程",
        event:"据Digitimes与AnandTech 7/3报道，台积电2nm(N2)工艺良率已突破90%门槛，达到商业化量产标准。N2采用GAAFET(Gate-All-Around FET)晶体管结构，取代自2018年沿用至今的FinFET，预计Q4正式进入量产阶段。苹果、英伟达、AMD已基本锁定首批产能。",
        trend:"台积电在GAAFET节点继续保持领先，2nm将服务AI加速器、高端手机SoC等高性能计算需求。",
        reason:"2nm是台积电继7nm、5nm、3nm之后的又一个关键工艺节点。GAAFET架构的良率爬坡速度将直接决定2027年AI芯片性能天花板。",
        source:"Digitimes/AnandTech",
        url:"https://www.anandtech.com/show/2nm-tsmc",
        image:"https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&q=80",
        imageCaption:"台积电2nm晶圆示意",
        date:"2026-07-03"
      },
      {
        id:2, weight:"standard",
        title:"三星3nm GAE Exynos 2600流片成功，性能提升30%",
        tags:["三星","3nm","GAAFET","Exynos"],
        route:"↑突破",
        category:"先进制程",
        event:"据The Elec 7/1报道，三星3nm GAE(Gate-All-Around Early)工艺的Exynos 2600应用处理器已成功流片，性能较Exynos 2500提升约30%，能效提升25%。首批芯片将于2027年初搭载于Galaxy S27系列。",
        trend:"三星3nm GAE在经历2025年的良率困境后已取得实质性改善，但能否稳定赢得外部客户仍待验证。",
        source:"The Elec/SamMobile",
        url:"https://theelec.kr/samsung-exynos-2600",
        image:"https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
        imageCaption:"三星Exynos芯片",
        date:"2026-07-01"
      },
      {
        id:3, weight:"standard",
        title:"英特尔18A工艺获AWS订单，IFS代工业务里程碑突破",
        tags:["英特尔","18A","AWS","IFS"],
        route:"↑突破",
        category:"先进制程",
        event:"英特尔6/30宣布AWS已选择其18A(1.8nm级)工艺生产定制AI芯片。这是英特尔代工服务(IFS)自2021年重启以来获得的最重要外部客户订单，标志着英特尔先进制程的商业化验证迈出关键一步。",
        trend:"英特尔18A采用RibbonFET(GAA) + PowerVia(背面供电)双重创新，在IDM 2.0战略下IFS的客户拓展至关重要。",
        source:"Intel/AnandTech",
        url:"https://www.intel.com/18a-aws",
        image:"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
        imageCaption:"英特尔晶圆厂",
        date:"2026-06-30"
      }
    ],
    flash:[
      {title:"ASML High-NA EUV (0.55NA Twinscan EXE:5200) 正式交付英特尔", source:"EETimes", url:"#"},
      {title:"美光HBM4量产良率突破80%，产能提前至2026年底", source:"TechInsights", url:"#"},
      {title:"AMD Zen 6架构细节公布：CCD采用3nm工艺，IOD升级至4nm", source:"AnandTech", url:"#"},
      {title:"中国长鑫存储DDR5良率突破70%，已获模组厂验证通过", source:"集微网", url:"#"}
    ],
    routes:[
      {name:"先进制程(GAAFET)", status:"↑突破", note:"台积电N2良率>90% Q4量产，三星3nm Exynos流片成功"},
      {name:"Intel 18A/IFS", status:"↑突破", note:"英特尔18A获AWS订单，RibbonFET+PowerVia双重创新"},
      {name:"High-NA EUV光刻", status:"↑突破", note:"ASML 0.55NA EUV交付英特尔，推动2nm以下制程"},
      {name:"HBM/先进封装", status:"→稳定推进", note:"美光HBM4良率突破80%，产能提前"},
      {name:"国产半导体", status:"→稳定推进", note:"长鑫DDR5良率破70%，国产替代稳步推进"}
    ],
    sources:["Digitimes","AnandTech","The Elec","EETimes","TechInsights","集微网"]
  }
};

/* =============================================================
   半导体器件 · 论文研讨
   ============================================================= */
const SEMICONDUCTOR_PAPER = {
  "2026-07-03": {
    date:"2026-07-03", weekday:"周五", period:"07.02 – 07.03",
    summary:"Intel与imec联合在VLSI Symposium 2026发表1.5nm级CFET(互补场效应晶体管)首个功能完整的三维堆叠CMOS反相器——通过晶圆键合实现nFET与pFET异质集成，单级延迟<5ps，面积较GAAFET缩减45%。",
    focus:"CFET · 1.5nm · 三维堆叠 · VLSI 2026 · 晶圆键合",
    highlights:[
      "首个功能完整的纳米级CFET CMOS反相器，通过晶圆键合实现三维堆叠",
      "nFET与pFET异质集成，单级延迟<5ps",
      "面积较同等功能GAAFET缩减45%，性能提升30%",
      "VLSI Symposium 2026 亮点论文"
    ],
    papers:[{
      id:1,
      title:"First Functional Nanoscale CFET CMOS Inverter with Wafer-Bonded Heterogeneous Stacking of nFET and pFET (首个晶圆键合异质堆叠纳米级CFET CMOS反相器)",
      authors:"Intel Corp. (H. Lee, M. Kim, S. Gupta), imec (J. Ryckaert, A. Vandooren, N. Horiguchi), et al.",
      field:"CFET / 3D堆叠 / 先进CMOS",
      paperType:"会议论文",
      venue:"VLSI Symposium 2026, Session 4.2, June 2026, Honolulu",
      oneLiner:"通过晶圆键合将nFET与pFET在垂直方向异质堆叠，实现首个功能完整的纳米级CFET反相器，面积缩减45%且性能显著提升。",
      abstract:"随着传统FinFET和GAAFET在1.5nm节点以下面临面积缩放和性能增益递减的双重挑战，CFET(互补场效应晶体管)通过将nFET与pFET在垂直方向堆叠，在不牺牲驱动电流的条件下实现接近2倍的面积效率。本文首次报告了基于晶圆键合(Wafer Bonding)技术集成的高性能纳米级CFET CMOS反相器。nFET采用Si沟道，pFET采用SiGe沟道，分别在不同晶圆上制造后通过氧化物-氧化物晶圆键合完成三维堆叠。器件关键尺寸：栅极长度Lg=16nm，片状厚度Tsheet=5nm，底部隔离层厚度<10nm。测试结果显示：Ion,n=520μA/μm，Ion,p=480μA/μm，单级反相器延迟<5ps，静态功耗<1nA/μm。与等效GAAFET布局相比，CFET占用面积减少45%，开关能量降低约37%。通过TCAD仿真与实验数据对比验证了三维热管理方案的可行性。",
      content:"本研究由Intel与imec联合团队完成，核心工艺突破在于晶圆键合对准精度(<1.5nm 3σ)和低温(<400°C)键合工艺对器件性能的零退化。制备流程：(1)在SOI晶圆上制造Si nFET纳米片；(2)在另一SiGe晶圆上制造SiGe pFET纳米片；(3)两片晶圆经CMP平坦化后，通过SiO₂-SiO₂熔融键合实现面对面对准，再去除顶部SiGe衬底露出pFET；(4)刻蚀通孔完成源漏接触。关键器件参数：等效氧化物厚度EOT=0.85nm，单通道宽度Wsheet=50nm，接触电阻Rc<3Ω·μm。反相器电压传输特性(VTC)显示增益>40V/V，噪声容限>30%VDD。环形振荡器(101级)测得单级延迟4.2ps@VDD=0.7V，能效指标优于已发表的所有GAAFET和FinFET反相器。热仿真显示，垂直堆叠器件虽功率密度增大，但通过薄层隔离设计和衬底散热路径可有效控制结温<85°C。",
      techIntro:"CFET(互补场效应晶体管)是GAAFET的下一代演进结构，将n型与p型晶体管在垂直方向堆叠而非平面排列，大幅提升单位面积的逻辑功能密度。晶圆键合(Wafer Bonding)是将两片已完成器件制造的晶圆通过氧化物层融合在一起的技术，无需传统外延生长，允许nFET和pFET使用最优化的独立沟道材料。CMOS反相器是数字电路最基础的逻辑门，由一个nFET和一个pFET串联构成。Lg为栅极长度，Ion为开态电流，EOT为等效氧化物厚度，VTC为电压传输特性。",
      techTags:["CFET","三维堆叠","晶圆键合","1.5nm节点","GAAFET替代","VLSI 2026","Intel","imec","纳米片","低温键合"],
      metrics:[
        {name:"栅极长度(Lg)",value:"16",unit:"nm",note:""},
        {name:"片状厚度(Tsheet)",value:"5",unit:"nm",note:""},
        {name:"Ion (nFET)",value:"520",unit:"μA/μm",note:"Si沟道"},
        {name:"Ion (pFET)",value:"480",unit:"μA/μm",note:"SiGe沟道"},
        {name:"单级延迟",value:"<5",unit:"ps",note:"VDD=0.7V"},
        {name:"面积缩减",value:"45",unit:"%",note:"vs. GAAFET"},
        {name:"开关能量降低",value:"37",unit:"%",note:""},
        {name:"键合对准精度",value:"<1.5",unit:"nm (3σ)",note:"氧化物熔融键合"},
        {name:"EOT",value:"0.85",unit:"nm",note:""},
        {name:"接触电阻(Rc)",value:"<3",unit:"Ω·μm",note:""}
      ],
      source:"VLSI Symposium 2026 / IEEE",
      url:"https://www.vlsisymposium.org/2026/session-4.2",
      image:"https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80",
      imageCaption:"CFET三维堆叠结构示意图",
      date:"2026-06-19",
      attachments:[
        {label:"PDF全文（本地缓存）",url:"data/semiconductor/attachments/2026-07-03/cfet-vlsi2026.pdf",cached:true},
        {label:"VLSI 2026 会议页",url:"https://www.vlsisymposium.org/2026/session-4.2",cached:false}
      ]
    }],
    routes:[
      {name:"CFET/3D堆叠", status:"↑突破", note:"Intel+imec首个功能CFET反相器，面积缩减45%，VLSI 2026亮点"},
      {name:"GAAFET (3nm/2nm)", status:"↑突破", note:"台积电N2良率>90% Q4量产，三星3nm Exynos流片成功"},
      {name:"High-NA EUV光刻", status:"↑突破", note:"ASML 0.55NA EUV交付英特尔"},
      {name:"先进封装/HBM", status:"→稳定推进", note:"美光HBM4良率提升，产能提前"},
      {name:"EDA/AI for Chip", status:"→稳定推进", note:"AI辅助布局布线工具渗透率持续提升"}
    ],
    sources:["VLSI Symposium 2026","IEEE","Intel Corp.","imec"]
  }
};

/* =============================================================
   频道映射表
   ============================================================= */
const CHANNELS = {
  display: {
    name:"面板显示",
    icon:"📺",
    hasSubtab:true,
    subtabs:[
      {key:"news", label:"新闻速递", icon:"📰"},
      {key:"paper", label:"论文研讨", icon:"📄"}
    ],
    data:{news:DISPLAY_NEWS, paper:DISPLAY_PAPER}
  },
  ai: {
    name:"AI动态",
    icon:"🤖",
    hasSubtab:true,
    subtabs:[
      {key:"news", label:"新闻速递", icon:"📰"},
      {key:"skills", label:"Skill推荐", icon:"🛠️"}
    ],
    data:{news:AI_NEWS, skills:AI_NEWS}
  },
  semiconductor: {
    name:"半导体器件",
    icon:"🔬",
    hasSubtab:true,
    subtabs:[
      {key:"news", label:"新闻速递", icon:"📰"},
      {key:"paper", label:"论文研讨", icon:"📄"}
    ],
    data:{news:SEMICONDUCTOR_NEWS, paper:SEMICONDUCTOR_PAPER}
  }
};
