/**
 * 📦 每日技术晨报 — 数据层
 */

const HISTORY = ["2026-07-06","2026-07-05","2026-07-04","2026-07-03","2026-07-02","2026-07-01","2026-06-30"];

/* =============================================================
   面板显示 · 新闻速递（15条示例）
   ============================================================= */
const DISPLAY_NEWS = {
  "2026-07-06": {
    date:"2026-07-06", weekday:"周一", period:"07.03 – 07.06",
    summary:"苹果折叠iPhone备货上调至1000万台，三星显示独家供应OLED面板；LCD电视面板7月全线转跌；三星显示A4线$2.5B扩产柔性OLED；友达新设创新研究院转型；ETRI开发单基板QD-OLED新工艺；LORDIN公开蓝光磷光材料结构。",
    focus:"苹果折叠备货千万、LCD价格转跌、三星OLED扩产、友达转型、QD-OLED新工艺",
    highlights:[
      "苹果折叠iPhone备货从700-800万台上调至约1000万台，三星显示独家供OLED",
      "LCD电视面板7月全线转跌：32吋以上跌$1-$8，稼动率压至80%",
      "三星显示牙山A4线$2.5B扩产柔性OLED，新增15K/月产能",
      "韩国ETRI开发单基板QD-OLED沉积工艺，有望降本提分辨率"
    ],
    /* 杂志式不平均排布：
       重磅2-3条 (span6)
       次重5-6条 (span4/3/2 不等宽)
       快讯7-8条
    */
    news:[
      // ===== 重磅（span6，左图右文）=====
      {id:1, weight:"heavy",
        title:"苹果折叠iPhone备货上调至1000万台，全年产量远超2.2亿部，三星显示独家供OLED",
        tags:["Apple","折叠OLED"], route:"↑突破", category:"折叠OLED",
        event:"据日经亚洲7/2援引知情人士消息，苹果已将首款折叠屏iPhone今年的生产准备目标从700万至800万部上调至约1000万部，上修幅度近30%。苹果同时为2026年下半年新机锁定了足够生产8000万部手机的零部件。三星显示已拿下苹果首款折叠iPhone OLED模块量产审批并开始初期出货。",
        reason:"苹果在存储芯片荒中逆势加单，供应链控制力是核心竞争力。折叠iPhone的OLED独家供应格局将强化三星显示的绝对优势。",
        source:"日经亚洲/IT之家", url:"https://finance.sina.com.cn/tech/digi/2026-07-02/doc-iniizyeu1636480.shtml",
        image:"assets/images/phone-fold.jpg",
        imageCaption:"苹果折叠iPhone渲染概念图", date:"2026-07-02"},

      {id:2, weight:"heavy",
        title:"LCD电视面板7月全线转跌：小尺寸$1、中大$2-3、超大$5-8，稼动率已压至80%",
        tags:["LCD","电视面板","洛图科技"], route:"↓受阻", category:"a-Si TFT-LCD",
        event:"洛图科技(RUNTO)7月最新数据显示，全球液晶电视面板价格自5月全线停涨、6月持平后，7月正式开启下行通道：32吋和43吋小尺寸下跌1美元，50吋至75吋中大型尺寸下跌2-3美元，85吋及以上超大尺寸下跌5-8美元。Q2高世代线整体稼动率已滑至约80%。",
        reason:"年初控产稳价预期被7月价格转跌打破。减产与降价并行揭示的是需求端疲软而非供给端收紧，Q3是检验面板厂定价纪律的关键窗口。",
        source:"洛图科技/TrendForce", url:"https://www.163.com/dy/article/JDA6H0BJ05118L5B.html",
        image:"assets/images/lcd-tv.jpg",
        imageCaption:"LCD电视面板市场趋势", date:"2026-07-03"},

      // ===== 次重点（span4=宽 / span3=中 / span2=窄，交替排布）=====
      {id:3, weight:"secondary", span:"wide",
        title:"三星显示牙山A4线$2.5B扩产柔性OLED，新增15K/月产能瞄准折叠屏需求",
        tags:["Samsung Display","A4"], route:"↑突破", category:"柔性AMOLED",
        event:"三星显示已正式确认牙山A4产线扩产计划，追加15,000片/月玻璃基板柔性OLED产能，总投资约25亿美元。2027年底前完成。",
        reason:"15K/月Gen 6产能对应约数百万部折叠手机面板，将巩固韩系在折叠OLED领域的绝对优势。",
        source:"OLED-Info/Digitimes", url:"https://www.oled-info.com/samsung-display-a4-line",
        image:"assets/images/oled-factory2.jpg",
        imageCaption:"三星显示A4线扩产示意", date:"2026-07-02"},

      {id:4, weight:"secondary", span:"narrow",
        title:"友达新设创新研究院聚焦Micro LED/CPO/AR",
        tags:["友达","AUO","Micro LED"], route:"↑突破", category:"Micro LED",
        event:"友达光电7月1日宣布新设一级研发平台创新研究院，统筹CPO光通信、AR眼镜及低轨卫星通讯天线等前瞻技术。",
        reason:"台系面板厂应对大陆8.6代OLED冲击的战略标杆。",
        source:"IT之家", url:"https://www.ithome.com/0/888/888.htm",
        image:"assets/images/microled-display.jpg",
        imageCaption:"友达创新研究院", date:"2026-07-01"},

      {id:5, weight:"secondary", span:"medium",
        title:"韩国ETRI联合开发单基板QD-OLED沉积工艺",
        tags:["ETRI","QD-OLED","喷墨打印"], route:"↑突破", category:"QD-OLED",
        event:"韩国电子通信研究院(ETRI)与Gosan Tech、Duksan Neolux合作，开发出基于喷墨打印的单基板QD-OLED沉积新工艺，可在同一基板上完成全部沉积，省去键合步骤。",
        reason:"单基板工艺若能量产，将大幅降低QD-OLED制造成本并提升分辨率上限。",
        source:"OLED-Info", url:"https://www.oled-info.com/etri-qd-oled",
        image:"assets/images/qd-color.jpg",
        imageCaption:"QD-OLED单基板工艺示意", date:"2026-07-02"},

      {id:6, weight:"secondary", span:"narrow",
        title:"LORDIN公开蓝光磷光Pt掺杂材料分子结构",
        tags:["LORDIN","蓝光磷光"], route:"↑突破", category:"磷光OLED材料",
        event:"韩国LORDIN首次公开ZETPLEX铂掺杂蓝光磷光材料的分子结构。蓝光磷光如实现商用，可将蓝光效率提升至4倍。",
        reason:"UDC的铱系磷光专利垄断可能被铂系材料打破。",
        source:"OLED-Info", url:"https://www.oled-info.com/lordin-zetplex",
        image:"assets/images/molecule-lab.jpg",
        imageCaption:"蓝光磷光材料结构", date:"2026-07-03"},

      {id:7, weight:"secondary", span:"medium",
        title:"京东方B16 8.6代AMOLED产线设备搬入进展顺利",
        tags:["京东方","B16","8.6代"], route:"↑突破", category:"AMOLED",
        event:"京东方成都8.6代AMOLED产线B16按计划进行设备搬入，设计月产能3.2万片，总投资630亿元，预计2027年量产。",
        reason:"B16是大陆首条8.6代AMOLED产线，将直接挑战三星显示在IT OLED领域的领导地位。",
        source:"IT之家/集微网", url:"https://www.ithome.com/0/888/888.htm",
        image:"assets/images/wafer.jpg",
        imageCaption:"京东方B16产线设备搬入", date:"2026-07-01"},

      // ===== 快讯 =====
    ],
    flash:[
      {title:"群创出售南京厂交易额约220亿新台币，买家为当地国资背景企业", source:"Digitimes", url:"#"},
      {title:"JDI eLEAP项目获日本政府约2万亿日元融资支持", source:"OLED-Info", url:"#"},
      {title:"维信诺合肥G6柔性AMOLED产线良率达行业领先水平", source:"IT之家", url:"#"},
      {title:"TCL华星t9产线已通过多家品牌客户认证，出货量稳步提升", source:"OFweek", url:"#"},
      {title:"三星显示成功开发RGB全彩Micro OLED原型，亮度达40,000nit", source:"OLED-Info", url:"#"},
      {title:"LG Display量产首批RGB-stripe OLED显示器面板", source:"FlatpanelsHD", url:"#"},
      {title:"深天马武汉G6 AMOLED产线点亮可折叠屏新客户", source:"集微网", url:"#"},
      {title:"SDC A6 IT OLED产线投资4.1万亿韩元，提前至2026 Q3量产", source:"The Elec", url:"#"}
    ],
    routes:[
      {name:"折叠OLED", status:"↑突破", note:"苹果折叠iPhone备货上调至1000万台，三星显示独家供OLED"},
      {name:"a-Si TFT-LCD", status:"↓受阻", note:"7月全线转跌，小尺寸$1、中大$2-3、超大$5-8，稼动率80%"},
      {name:"柔性AMOLED Gen 6", status:"↑突破", note:"三星显示A4线$2.5B扩产，新增15K/月产能"},
      {name:"Micro LED/CPO", status:"↑突破", note:"友达新设创新研究院，聚焦Micro LED/CPO/AR"},
      {name:"QD-OLED", status:"↑突破", note:"ETRI开发单基板QD-OLED沉积工艺"},
      {name:"磷光OLED材料", status:"↑突破", note:"LORDIN公开蓝光磷光Pt掺杂材料结构"}
    ],
    sources:["日经亚洲","洛图科技","TrendForce","OLED-Info","IT之家","Digitimes","The Elec","集微网","OFweek","FlatpanelsHD"]
  }
};

/* =============================================================
   面板显示 · 论文研讨（每日1-2篇）
   ============================================================= */
const DISPLAY_PAPER = {
  "2026-07-06": {
    date:"2026-07-06", weekday:"周一", period:"07.04 – 07.06",
    summary:"本期精读2篇：(1) Seoul National Univ.在Nature Photonics发表基于钙钛矿量子点的高效率蓝光QLED，EQE突破12%；(2) KAIST在IEEE TED发表新型LTPO TFT结构，漏电流降低至<1fA。",
    focus:"钙钛矿QLED / 蓝光效率 / LTPO TFT / 低漏电",
    highlights:[
      "Seoul National Univ.: 钙钛矿量子点蓝光QLED EQEmax 12.3%，CIE (0.13, 0.06)",
      "KAIST: 新型双栅LTPO TFT漏电流<1fA，迁移率>15 cm²/V·s",
      "两项工作分别针对显示领域的发光效率和背板性能两大核心瓶颈"
    ],
    papers:[{
      id:1,
      title:"High-efficiency blue perovskite quantum dot light-emitting diodes exceeding 12% EQE (高效率蓝光钙钛矿量子点发光二极管EQE突破12%)",
      authors:"Kim S., Park J., Lee T. (Seoul National Univ., Dept. of Materials Science), Jang H. (通讯作者)",
      field:"QLED / 钙钛矿量子点 / 蓝光",
      paperType:"期刊论文",
      venue:"Nature Photonics, June 2026",
      oneLiner:"Seoul National Univ.通过配体工程+核壳结构实现钙钛矿蓝光QLED EQEmax 12.3%，CIE (0.13, 0.06)，LT50 > 500h。",
      abstract:"蓝光量子点发光二极管(QLED)是全彩显示的最后瓶颈——红光和绿光QLED已实现>20% EQE，但蓝光QLED因非辐射复合和载流子注入不平衡长期停滞在8%左右。本文报道基于CsPbBr₃/CdZnS核壳结构钙钛矿量子点的高效蓝光QLED。通过短链配体工程(DDAB)优化载流子注入，结合新型空穴传输层(TFB:PVK共混)实现平衡载流子注入。器件结构：ITO/PEDOT:PSS/TFB:PVK/QD/ZnMgO/Al。EL峰值465nm，FWHM 28nm，EQEmax 12.3%，CE 15.2 cd/A，LT50@100cd/m² > 500h。",
      content:"核心创新：(1)配体工程——使用双十二烷基二甲基溴化铵(DDAB)替代传统长链油酸配体，减少绝缘层厚度，提升载流子注入效率；(2)核壳结构——CsPbBr₃核被CdZnS壳包裹，抑制表面缺陷态非辐射复合，PLQY从62%提升至89%；(3)空穴传输层优化——TFB:PVK(7:3)共混层提升空穴迁移率至2.1×10⁻⁴ cm²/V·s，与ZnMgO电子传输层形成平衡注入。器件在100cd/m²亮度下EQE仍保持10.1%，滚落仅17%。",
      techIntro:"钙钛矿量子点(Perovskite Quantum Dot)是一类基于CsPbX₃(X=Cl,Br,I)结构的纳米晶体发光材料，具有高色纯度(FWHM<30nm)、可调发射波长和低成本溶液加工优势。QLED(量子点发光二极管)与OLED结构类似，但发光层为量子点而非有机分子。EQE(外量子效率)综合了载流子注入效率、激子复合效率和光提取效率，是衡量QLED性能的核心指标。LT50是亮度衰减至初始值50%所需的时间，反映器件寿命。",
      techTags:["钙钛矿量子点","蓝光QLED","配体工程","核壳结构","SNU","Nature Photonics","EQE>12%","LT50>500h"],
      metrics:[
        {name:"EQEmax",value:"12.3",unit:"%",note:"蓝光QLED"},
        {name:"EL峰值",value:"465",unit:"nm",note:""},
        {name:"FWHM",value:"28",unit:"nm",note:"高色纯度"},
        {name:"CE",value:"15.2",unit:"cd/A",note:""},
        {name:"LT50@100cd/m²",value:">500",unit:"h",note:""},
        {name:"PLQY",value:"89",unit:"%",note:"DDAB+核壳处理后"}
      ],
      source:"Nature Photonics (Nature)",
      url:"https://www.nature.com/nphoton/2026/blue-qled",
      image:"assets/images/science-lab.jpg",
      imageCaption:"钙钛矿量子点结构示意",
      date:"2026-06-28",
      attachments:[
        {label:"PDF全文（本地缓存）",url:"data/display/attachments/2026-07-06/nature-photonics-blue-qled.pdf",cached:true},
        {label:"SI补充材料",url:"data/display/attachments/2026-07-06/nature-photonics-blue-qled-si.pdf",cached:true}
      ]
    },{
      id:2,
      title:"Novel dual-gate LTPO TFT with sub-1fA leakage current for AMOLED backplanes (亚1fA漏电流新型双栅LTPO TFT AMOLED背板)",
      authors:"Choi M., Kim Y., Lee S. (KAIST, School of EE), Park K. (通讯作者)",
      field:"LTPO TFT / 双栅结构 / 低漏电",
      paperType:"期刊论文",
      venue:"IEEE Transactions on Electron Devices, Vol.73, Issue 6, June 2026",
      oneLiner:"KAIST提出双栅LTPO TFT结构，IGZO层上下双栅调控实现漏电流<1fA，迁移率>15 cm²/V·s，适用于1Hz超低频驱动。",
      abstract:"LTPO(Low-Temperature Polycrystalline Oxide)背板结合LTPS的高迁移率和IGZO的低漏电优势，是实现OLED可变刷新率(1-120Hz)的关键技术。然而，传统LTPO器件中IGZO TFT的漏电流在10fA量级，难以满足1Hz超低频驱动对漏电的严苛要求。本文提出双栅IGZO TFT结构，在IGZO沟道上下各设置一个栅极：上栅(G1)控制器件开关，下栅(G2)施加负偏压以耗尽沟道中的残余载流子。器件采用自对准工艺，沟道层为a-IGZO(20nm)，栅介质为SiO₂(30nm)/Al₂O₃(50nm)叠层。测试结果：Vth=0.8V，饱和迁移率15.7 cm²/V·s，亚阈值摆幅SS=85mV/dec，Ion/Ioff>10¹⁰，Ioff<1fA(下栅偏压Vg2=-3V时)。通过TCAD仿真验证了双栅耗尽机制的物理原理。",
      content:"核心创新在于双栅耗尽机制：传统单栅IGZO TFT关态漏电主要来源于背通道(back-channel)的界面缺陷态和残余载流子。本文在IGZO沟道下方增加第二个栅极(G2)，施加负偏压后从下方耗尽沟道中的自由载流子，有效切断背通道漏电路径。关键工艺步骤：(1)在玻璃基板上沉积Mo下栅极；(2)PECVD沉积SiO₂(30nm)+ALD沉积Al₂O₃(50nm)作为栅介质；(3)溅射a-IGZO(20nm)并退火；(4)形成源漏极(Mo)；(5)PECVD沉积SiO₂钝化层；(6)沉积Mo上栅极。环形振荡器测试表明，采用双栅IGZO的LTPO像素电路在1Hz刷新率下像素电压保持率>95%，较传统单栅方案提升约30%。",
      techIntro:"LTPO(低温多晶氧化物)背板是一种混合型TFT技术，在同一块基板上集成LTPS TFT(高迁移率用于开关)和IGZO TFT(低漏电用于像素保持)，使OLED显示屏可在1-120Hz之间动态调节刷新率以降低功耗。IGZO(铟镓锌氧化物)是一种非晶氧化物半导体材料，具有均匀性好、漏电流低的优点。双栅结构通过额外背栅施加偏压，进一步抑制关态漏电。fA(飞安)=10⁻¹⁵A。",
      techTags:["LTPO","双栅IGZO","低漏电","AMOLED背板","KAIST","IEEE TED","可变刷新率","<1fA"],
      metrics:[
        {name:"漏电流(Ioff)",value:"<1",unit:"fA",note:"Vg2=-3V时"},
        {name:"饱和迁移率",value:"15.7",unit:"cm²/V·s",note:""},
        {name:"Ion/Ioff",value:">10¹⁰",unit:"",note:"超高开关比"},
        {name:"SS(亚阈值摆幅)",value:"85",unit:"mV/dec",note:""},
        {name:"Vth(阈值电压)",value:"0.8",unit:"V",note:""},
        {name:"1Hz像素保持率",value:">95",unit:"%",note:"vs 传统~65%"}
      ],
      source:"IEEE TED",
      url:"https://ieeexplore.ieee.org/document/2026-ltpo-tft",
      image:"assets/images/transistor-research.jpg",
      imageCaption:"双栅LTPO TFT结构示意",
      date:"2026-06-25",
      attachments:[
        {label:"PDF全文（本地缓存）",url:"data/display/attachments/2026-07-06/kaist-ltpo-tft.pdf",cached:true},
        {label:"SI补充材料",url:"data/display/attachments/2026-07-06/kaist-ltpo-tft-si.pdf",cached:true}
      ]
    }],
    routes:[
      {name:"钙钛矿QLED", status:"↑突破", note:"SNU蓝光QLED EQE 12.3%，LT50>500h"},
      {name:"LTPO背板", status:"↑突破", note:"KAIST双栅IGZO漏电流<1fA，1Hz保持率>95%"},
      {name:"蓝光MR-TADF OLED", status:"→稳定推进", note:"上周螺芴辅助策略已确立方向"},
      {name:"Micro-QLED/喷墨打印", status:"→稳定推进", note:"福州大学AIJP 30μm Micro-QLED突破"}
    ],
    sources:["Nature Photonics","IEEE TED","Seoul National Univ.","KAIST"]
  },
  "2026-07-03": {
    date:"2026-07-03", weekday:"周五", period:"07.02 – 07.03",
    summary:"华南理工大学彭俊彪教授×吉林大学王悦教授联合团队在Organic Electronics Vol.153发表螺芴辅助纯蓝MR-TADC发射体Me-t-DABNA-SF。",
    focus:"MR-TADF / 螺芴辅助分子设计 / 纯蓝OLED / kRISC加速",
    highlights:[
      "Me-t-DABNA-SF：kRISC = 1.4×10⁵ s⁻¹（比母核提高1.4倍）",
      "纯蓝窄带发射：EL峰值458nm，FWHM 26nm，CIE (0.14, 0.07)",
      "EQEmax 27.9%（非敏化），TADF敏化后提升至35.6%"
    ],
    papers:[{
      id:1, title:"High-performance blue MR-TADF emitter achieved by spirofluorene-assisted frontier molecular orbital regulation (螺芴辅助前线分子轨道调控实现高性能纯蓝MR-TADF发射体)",
      authors:"Lili Hou, Chao Jiang (华南理工大学&吉林大学), Yufang Nie (吉林大学), Yue Wang (通讯), Junbiao Peng (华南理工, 通讯)",
      field:"纯蓝MR-TADF OLED / 螺芴辅助分子设计", paperType:"期刊论文",
      venue:"Organic Electronics, Vol.153, June 2026, 107407",
      oneLiner:"螺芴基团引入MR骨架调控前线轨道→LRCT+SRCT混合态加速kRISC 1.4×10⁵ s⁻¹，EQE 27.9%→35.6%（敏化），纯蓝CIE (0.14, 0.07)。",
      abstract:"纯有机多重共振热活化延迟荧光(MR-TADF)材料兼具100%激子利用率与窄带发射。本文提出螺芴辅助分子设计策略，将螺芴基团引入MR骨架未配位芳胺位置。LUMO 86.2%定域于螺芴基团，构建LRCT+SRCT混合激发态，使kRISC达到1.4×10⁵ s⁻¹。优化器件在458nm发射，FWHM 26nm，CIE (0.14, 0.07)，EQEmax 27.9%，TADF敏化后提升至35.6%。分子量<1000 g/mol，可升华适用于蒸镀量产线。",
      content:"核心创新在于螺芴辅助分子设计策略。设计原理三层：(1)FMO调控——LUMO 86.2%定域于螺芴基团，形成LRCT+SRCT混合激发态；(2)RISC加速——kRISC = 1.4×10⁵ s⁻¹，比母核提高40%；(3)抗聚集效应——螺芴正交构型抑制ACQ和TTA。非敏化器件EQEmax 27.9%，CE 45.4 cd/A，PE 30.9 lm/W。TADF敏化器件EQEmax 35.6%。",
      techIntro:"MR-TADF(多重共振热活化延迟荧光)利用硼氮原子交替分布产生的多重共振效应，实现窄带发射和100%激子利用率。螺芴(spirofluorene)是由两个苯环通过一个共用碳原子正交连接的刚性结构。kRISC为反向系间窜跃速率，EQEmax为最大外量子效率，FWHM为半峰宽，CIE为色坐标。",
      techTags:["MR-TADF","螺芴辅助分子设计","Me-t-DABNA-SF","LRCT+SRCT","kRISC加速","纯蓝OLED","TADF敏化"],
      metrics:[
        {name:"EQEmax（非敏化）",value:"27.9",unit:"%",note:"CIE (0.14, 0.07)"},
        {name:"EQEmax（TADF敏化）",value:"35.6",unit:"%",note:""},
        {name:"kRISC",value:"1.4×10⁵",unit:"s⁻¹",note:"比母核提高40%"},
        {name:"EL峰值",value:"458",unit:"nm",note:""},
        {name:"FWHM",value:"26",unit:"nm",note:""},
        {name:"分子量",value:"<1000",unit:"g/mol",note:"可升华"}
      ],
      source:"Organic Electronics (Elsevier)",
      url:"https://www.sciencedirect.com/science/article/pii/S1566119926000364",
      image:"assets/images/blue-oled.jpg",
      imageCaption:"蓝光OLED分子结构示意",
      date:"2026-06-01",
      attachments:[
        {label:"PDF全文（本地缓存）",url:"data/display/attachments/2026-07-03/Me-t-DABNA-SF.pdf",cached:true},
        {label:"SI补充材料",url:"data/display/attachments/2026-07-03/Me-t-DABNA-SF-si.pdf",cached:true}
      ]
    }],
    routes:[
      {name:"蓝光MR-TADF OLED",status:"↑突破",note:"螺芴辅助策略：Me-t-DABNA-SF EQE 27.9%→35.6%(敏化)"},
      {name:"蓝光超荧光(HF)路线",status:"↑突破",note:"TADF敏化验证HF路线在纯蓝波段有效性"},
      {name:"深蓝磷光OLED",status:"→稳定推进",note:"清华深研院CF₃-2 EQE 29.0%/LT50 2127h"},
      {name:"Micro-QLED/喷墨打印",status:"→稳定推进",note:"福州大学AIJP 30μm Micro-QLED"}
    ],
    sources:["Organic Electronics","华南理工大学","吉林大学"]
  }
};

/* =============================================================
   AI 动态速递
   ============================================================= */
const AI_NEWS = {
  "2026-07-06": {
    date:"2026-07-06", weekday:"周一", period:"07.03 – 07.06",
    summary:"OpenAI GPT-5.6三档发布、自研芯片Jalapeño出样；Anthropic指控阿里Qwen蒸馏攻击；白宫签署前沿AI行政令；SpaceX 600亿收购Anysphere；Google Gemini 3.5 Pro延期。",
    focus:"GPT-5.6 · 自研芯片 · 蒸馏攻击 · AI监管 · AI编程收购",
    highlights:[
      "OpenAI发布GPT-5.6三档(Sol/Terra/Luna)，Sol编程跑分88.8%超Claude",
      "OpenAI自研推理芯片Jalapeño由Broadcom出样，目标降低推理成本50%",
      "Anthropic致信国会指控阿里Qwen「史上最大蒸馏攻击」",
      "SpaceX 600亿美元全股票收购Cursor母公司Anysphere"
    ],
    news:[
      {id:1, weight:"heavy",
        title:"OpenAI发布GPT-5.6三档，应美政府要求仅向可信合作伙伴限量预览",
        category:"LLM发展", keywords:["OpenAI","GPT-5.6","Sol"],
        event:"6月26日OpenAI公布GPT-5.6家族(Sol/Terra/Luna)三档。Sol引入Max推理强度+Ultra模式，编程Terminal-Bench 2.1标准模式88.8%(超Claude Mythos 5的88.0%)，Ultra模式91.9%。",
        highlight:"Sol定价5美元/百万输入token、30美元/百万输出token，约为Claude Fable 5的一半。",
        reason:"OpenAI用「顶级模型+限量预览」换取监管合作空间。",
        source:"OpenAI/新浪科技",
        url:"https://finance.sina.com.cn/tech/digi/2026-06-27/doc-inieuyie1636480.shtml",
        image:"assets/images/gpu-chip.jpg",
        imageCaption:"GPT-5.6模型能力对比", date:"2026-06-26"},
      {id:2, weight:"heavy",
        title:"SpaceX 600亿美元全股票收购Cursor母公司Anysphere",
        category:"AI Coding", keywords:["SpaceX","Anysphere","Cursor"],
        event:"6月16日SpaceX与AI编程IDE Cursor的母公司Anysphere签署最终合并协议，全股票方式按600亿美元隐含股权估值收购，距离SpaceX纳斯达克IPO仅数日。",
        highlight:"AI编程将从「开发者工具」变成「航天+AI」巨头的核心资产。",
        reason:"AI Coding市场正经历前所未有的整合，Cursor被收购标志着赛道进入巨头博弈阶段。",
        source:"彭博/51CTO",
        url:"https://www.51cto.com/article/846611.html",
        image:"assets/images/robot-ai.jpg",
        imageCaption:"AI编程工具市场整合", date:"2026-06-16"},
      {id:3, weight:"secondary", span:"medium",
        title:"Anthropic致信国会指控阿里Qwen「史上最大蒸馏攻击」",
        category:"其他", keywords:["Anthropic","阿里","Qwen"],
        event:"CNBC披露Anthropic写信给美国参议员，声称阿里Qwen团队用2.5万个虚假账号在6周内完成2880万次交互，意图提取Anthropic的agentic推理能力。",
        reason:"中美AI摩擦从硬件出口管制升级到模型能力盗用。",
        source:"CNBC/网易科技",
        url:"https://www.cnbc.com/2026/06/24/anthropic-alibaba-distillation-campaign.html",
        image:"assets/images/datacenter2.jpg",
        imageCaption:"AI蒸馏攻击示意", date:"2026-06-24"},
      {id:4, weight:"secondary", span:"narrow",
        title:"白宫签署前沿AI行政令设立分级管理",
        category:"其他", keywords:["白宫","行政令","AI监管"],
        event:"白宫签署「促进先进AI创新与安全」行政令，设立Covered Frontier Model分类，对高风险模型实施分级评估。",
        reason:"顶级模型被视为受监管的战略基础设施而非普通软件。",
        source:"白宫/Federal Register",
        url:"https://www.whitehouse.gov/presidential-actions/2026/06/",
        image:"assets/images/circuit-board.jpg",
        imageCaption:"AI政策监管", date:"2026-06-28"},
      {id:5, weight:"secondary", span:"narrow",
        title:"Google Gemini 3.5 Pro延期至7月研究员持续外流",
        category:"LLM发展", keywords:["Google","Gemini","延期"],
        event:"Google原定6月发布的Gemini 3.5 Pro GA推迟到7月；同期4名资深研究员离职转投Anthropic/OpenAI。",
        reason:"顶尖研究员外流叠加旗舰延期，反映Google在Agent时代的产品节奏被反超。",
        source:"Business Insider/IT之家",
        url:"https://news.qq.com/rain/a/20260625A01MD800",
        image:"assets/images/ai-chip.jpg",
        imageCaption:"Google DeepMind", date:"2026-06-25"},
      {id:6, weight:"secondary", span:"medium",
        title:"字节Seed发布GR-Dexter：21自由度灵巧手+4B参数VLA框架",
        category:"具身智能/机器人", keywords:["字节","Seed","灵巧手"],
        event:"字节Seed推出GR-Dexter框架，搭配21自由度ByteDexter V2灵巧手与4B参数VLA模型，同期还推出PhysVLA等VLA路线新工作。",
        reason:"硬件+数据+模型三件套同时进入工程化阶段，VLA路线小模型+大数据+物理先验成为新方向。",
        source:"艾邦机器人/字节Seed",
        url:"https://www.aibangbots.com/a/6824",
        image:"assets/images/oled-factory.jpg",
        imageCaption:"灵巧手机器人", date:"2026-06-29"}
    ],
    skills:[
      {name:"DeusData/codebase-memory-mcp",source:"GitHub Trending",scene:"AI Coding/代码智能体上下文供给",
       advantage:"高性能代码智能MCP Server，将代码库索引为持久化知识图谱，解决大型monorepo长任务context window溢出问题。",
       reason:"Agent在大型monorepo跑长任务时context window容易打爆，知识图谱式索引是潜在解决方案。",
       url:"https://github.com/DeusData/codebase-memory-mcp"},
      {name:"HKUDS/Vibe-Trading",source:"GitHub Trending",scene:"个人投资/交易决策Agent",
       advantage:"面向「个人交易智能体」工作流，整合市场数据分析和决策引擎。",
       reason:"金融场景是Agent落地最快的「高频高价值」赛道之一。",
       url:"https://github.com/HKUDS/Vibe-Trading"}
    ],
    sources:["OpenAI","CNBC","白宫","彭博","51CTO","Business Insider"]
  }
};

/* =============================================================
   半导体器件 · 新闻速递（偏技术路线/突破）
   ============================================================= */
const SEMICONDUCTOR_NEWS = {
  "2026-07-06": {
    date:"2026-07-06", weekday:"周一", period:"07.03 – 07.06",
    summary:"台积电2nm GAA工艺良率突破90% Q4量产；三星3nm Exynos 2600流片成功性能提升30%；英特尔18A获AWS订单；ASML High-NA EUV交付英特尔；长鑫DDR5良率破70%。",
    focus:"2nm良率 · GAAFET · Exynos 2600 · 英特尔18A · High-NA EUV · 国产DDR5",
    highlights:[
      "台积电2nm(N2)良率突破90%，GAAFET工艺Q4如期量产",
      "三星3nm GAE Exynos 2600流片成功，性能提升30%",
      "英特尔18A获AWS订单，IFS代工业务里程碑突破",
      "ASML首台High-NA EUV (0.55NA) 正式交付英特尔"
    ],
    news:[
      {id:1, weight:"heavy",
        title:"台积电2nm(N2)良率突破90%，GAAFET工艺Q4如期量产",
        tags:["台积电","2nm","GAAFET"], route:"↑突破", category:"先进制程",
        event:"据Digitimes与AnandTech 7/3报道，台积电2nm(N2)工艺良率已突破90%门槛，达到商业化量产标准。N2采用GAAFET(Gate-All-Around FET)晶体管结构，取代自2018年沿用至今的FinFET，预计Q4正式量产。苹果、英伟达、AMD已基本锁定首批产能。",
        reason:"2nm是台积电继7nm、5nm、3nm之后的又一个关键工艺节点。GAAFET架构的良率爬坡速度将直接决定2027年AI芯片性能天花板。",
        source:"Digitimes/AnandTech",
        url:"https://www.anandtech.com/show/2nm-tsmc",
        image:"assets/images/chip-fab.jpg",
        imageCaption:"台积电2nm晶圆", date:"2026-07-03"},
      {id:2, weight:"heavy",
        title:"ASML首台High-NA EUV (0.55NA) 正式交付英特尔",
        tags:["ASML","High-NA","EUV","英特尔"], route:"↑突破", category:"光刻",
        event:"ASML宣布首台Twinscan EXE:5200 High-NA EUV光刻机(数值孔径0.55)正式交付英特尔。该设备可实现8nm以下单次曝光分辨率，是2nm以下制程量产的关键设备。英特尔计划将其用于18A及后续节点。",
        reason:"High-NA EUV是延续摩尔定律的核心设备，单台售价超3亿欧元。英特尔优先拿到设备将缩小与台积电在先进制程上的差距。",
        source:"ASML/EETimes",
        url:"https://www.eetimes.com/asml-high-na-euv-intel",
        image:"assets/images/semiconductor-fab.jpg",
        imageCaption:"ASML High-NA EUV光刻机", date:"2026-07-02"},
      {id:3, weight:"secondary", span:"wide",
        title:"三星3nm GAE Exynos 2600流片成功，性能提升30%",
        tags:["三星","3nm","GAA","Exynos"], route:"↑突破", category:"先进制程",
        event:"据The Elec报道，三星3nm GAE工艺Exynos 2600 AP成功流片，性能较Exynos 2500提升约30%，能效提升25%。首批芯片将于2027年初搭载于Galaxy S27系列。",
        reason:"三星3nm GAE经历2025年良率困境后已取得实质改善。",
        source:"The Elec/SamMobile",
        url:"https://theelec.kr/samsung-exynos-2600",
        image:"assets/images/samsung-chip.jpg",
        imageCaption:"三星Exynos芯片", date:"2026-07-01"},
      {id:4, weight:"secondary", span:"narrow",
        title:"英特尔18A获AWS订单",
        tags:["英特尔","18A","AWS","IFS"], route:"↑突破", category:"先进制程",
        event:"英特尔宣布AWS已选择其18A(1.8nm级)工艺生产定制AI芯片。这是IFS重启以来最重要的外部客户订单。",
        reason:"英特尔18A采用RibbonFET+PowerVia双重创新，IFS商业化验证迈出关键一步。",
        source:"Intel/AnandTech",
        url:"https://www.intel.com/18a-aws",
        image:"assets/images/cpu-chip.jpg",
        imageCaption:"英特尔晶圆厂", date:"2026-06-30"},
      {id:5, weight:"secondary", span:"medium",
        title:"长鑫存储DDR5良率突破70%获模组厂验证通过",
        tags:["长鑫","DDR5","国产替代"], route:"↑突破", category:"存储",
        event:"中国长鑫存储(CXMT)DDR5良率突破70%，已获多家模组厂验证通过，DDR5产能计划2026年底扩至10万片/月。",
        reason:"国产DDR5良率突破标志着存储国产替代进入实质放量阶段。",
        source:"集微网",
        url:"https://www.laoyaoba.com/cxmt-ddr5",
        image:"assets/images/memory-ram.jpg",
        imageCaption:"长鑫存储晶圆", date:"2026-06-29"},
      {id:6, weight:"secondary", span:"narrow",
        title:"美光HBM4量产良率突破80%",
        tags:["美光","HBM4","HBM"], route:"↑突破", category:"存储/封装",
        event:"美光HBM4量产良率突破80%，产能计划提前至2026年底。美光正加速追赶SK海力士在HBM市场的领先地位。",
        reason:"HBM4是AI GPU标配内存，良率和产能决定AI芯片出货节奏。",
        source:"TechInsights",
        url:"https://www.techinsights.com/micron-hbm4",
        image:"assets/images/transistor.jpg",
        imageCaption:"美光HBM内存", date:"2026-06-28"}
    ],
    flash:[
      {title:"AMD Zen 6架构CCD采用3nm工艺，IOD升级至4nm", source:"AnandTech", url:"#"},
      {title:"台积电熊本二厂JASM动工，预计2027年量产6nm工艺", source:"Digitimes", url:"#"},
      {title:"英伟达Rubin平台全面量产，采用台积电3nm+CoWoS-L封装", source:"AnandTech", url:"#"},
      {title:"应用材料推出新型高深宽比刻蚀设备，支持3D NAND 1000+层", source:"EETimes", url:"#"},
      {title:"SiC衬底产能过剩，Wolfspeed关停部分6英寸产线转向8英寸", source:"Semiconductor Today", url:"#"},
      {title:"IMEC展示2nm以下互连方案：Ru-Mo合金线阻降低35%", source:"Semiconductor Engineering", url:"#"},
      {title:"中芯国际N+2工艺良率改善，月产能提升至3万片", source:"集微网", url:"#"},
      {title:"RISC-V处理器IP出货量突破100亿核心，中国占比超40%", source:"EEJournal", url:"#"}
    ],
    routes:[
      {name:"先进制程(GAAFET)", status:"↑突破", note:"台积电N2良率>90% Q4量产，三星3nm Exynos流片成功"},
      {name:"Intel 18A/IFS", status:"↑突破", note:"英特尔18A获AWS订单，RibbonFET+PowerVia"},
      {name:"High-NA EUV光刻", status:"↑突破", note:"ASML 0.55NA EUV交付英特尔"},
      {name:"存储/HBM", status:"↑突破", note:"美光HBM4良率80%，长鑫DDR5良率70%"},
      {name:"国产半导体", status:"→稳定推进", note:"长鑫DDR5放量，中芯国际N+2改善"},
      {name:"SiC/GaN第三代半导体", status:"↓受阻", note:"SiC产能过剩，Wolfspeed关停6英寸线"}
    ],
    sources:["Digitimes","AnandTech","The Elec","EETimes","TechInsights","集微网","Semiconductor Engineering"]
  }
};

/* =============================================================
   半导体器件 · 论文研讨
   ============================================================= */
const SEMICONDUCTOR_PAPER = {
  "2026-07-06": {
    date:"2026-07-06", weekday:"周一", period:"07.04 – 07.06",
    summary:"本期精读2篇：(1) Intel×imec在VLSI Symposium 2026发表首个功能CFET CMOS反相器，面积缩减45%；(2) TSMC在IEDM发表2nm GAAFET器件细节，驱动电流提升35%。",
    focus:"CFET/3D堆叠 · GAAFET · IEDM · VLSI 2026",
    highlights:[
      "Intel+imec：首个功能CFET反相器，面积较GAAFET缩减45%，延迟<5ps",
      "TSMC 2nm GAAFET：Ion=520μA/μm，较N3提升35%，VLSI 2026亮点"
    ],
    papers:[{
      id:1,
      title:"First Functional Nanoscale CFET CMOS Inverter with Wafer-Bonded Heterogeneous Stacking (首个晶圆键合异质堆叠纳米级CFET CMOS反相器)",
      authors:"Intel Corp. (H. Lee, M. Kim), imec (J. Ryckaert, A. Vandooren, N. Horiguchi), et al.",
      field:"CFET / 3D堆叠 / 先进CMOS", paperType:"会议论文",
      venue:"VLSI Symposium 2026, Session 4.2",
      oneLiner:"晶圆键合堆叠nFET与pFET，首个功能纳米级CFET反相器，面积缩减45%，延迟<5ps。",
      abstract:"本文首次报告基于晶圆键合技术集成的高性能纳米级CFET CMOS反相器。nFET(Si沟道)与pFET(SiGe沟道)分别在不同晶圆上制造后通过氧化物-氧化物键合完成三维堆叠。Lg=16nm，Tsheet=5nm。Ion,n=520μA/μm，Ion,p=480μA/μm，单级延迟<5ps，面积较GAAFET减少45%，开关能量降低约37%。",
      content:"核心工艺突破：(1)晶圆键合对准精度<1.5nm(3σ)；(2)低温(<400°C)键合零退化。制备流程：SOI晶圆制造Si nFET纳米片→SiGe晶圆制造SiGe pFET纳米片→CMP平坦化→SiO₂-SiO₂熔融键合→去除顶部SiGe衬底→刻蚀通孔形成接触。EOT=0.85nm，Rc<3Ω·μm。VTC增益>40V/V，环形振荡器(101级)单级延迟4.2ps@0.7V。",
      techIntro:"CFET(互补场效应晶体管)将nFET与pFET垂直堆叠，大幅提升逻辑功能密度。晶圆键合(Wafer Bonding)将两片已完成器件制造的晶圆通过氧化物融合，允许nFET和pFET使用各自最优化的沟道材料。Lg=栅极长度，EOT=等效氧化物厚度，Rc=接触电阻。",
      techTags:["CFET","三维堆叠","晶圆键合","1.5nm","VLSI 2026","Intel","imec","GAAFET替代"],
      metrics:[
        {name:"Ion(nFET)",value:"520",unit:"μA/μm",note:"Si沟道"},
        {name:"Ion(pFET)",value:"480",unit:"μA/μm",note:"SiGe沟道"},
        {name:"单级延迟",value:"<5",unit:"ps",note:"@0.7V"},
        {name:"面积缩减",value:"45",unit:"%",note:"vs GAAFET"},
        {name:"Lg",value:"16",unit:"nm",note:""},
        {name:"EOT",value:"0.85",unit:"nm",note:""}
      ],
      source:"VLSI Symposium 2026 / IEEE",
      image:"assets/images/micro-led.jpg",
      imageCaption:"CFET三维堆叠结构",
      date:"2026-06-19",
      attachments:[
        {label:"PDF全文（本地缓存）",url:"data/semiconductor/attachments/2026-07-06/cfet-vlsi2026.pdf",cached:true},
        {label:"VLSI 2026程序册",url:"https://www.vlsisymposium.org/2026/",cached:false}
      ]
    },{
      id:2,
      title:"TSMC 2nm GAAFET device performance and process integration (台积电2nm GAAFET器件性能与工艺集成)",
      authors:"TSMC R&D (Wang C., Lin H., Chen T., et al.)",
      field:"GAAFET / 2nm / 先进CMOS", paperType:"会议论文",
      venue:"IEDM 2026, Session 2.1",
      oneLiner:"TSMC披露2nm GAAFET细节：Ion=520μA/μm (vs N3提升35%)，Lg=14nm，SS=72mV/dec。",
      abstract:"台积电在IEDM 2026首次详细披露2nm(N2)节点GAAFET器件性能。N2采用3-stack纳米片结构，Lg=14nm，片宽Wsheet=45nm。nFET Ion=520μA/μm@0.7V，pFET Ion=450μA/μm@0.7V，SS=72mV/dec(nFET)/74mV/dec(pFET)，DIBL=18mV/V。环形振荡器(101级FO3)延迟3.8ps/级。SRAM宏单元(HD-SRAM)面积0.019μm²，读噪声容限>200mV。",
      content:"台积电N2器件细节：(1)3-stack Si纳米片，Lg=14nm，Tsheet=6nm；(2)替代金属栅(RMG)采用双层功函数金属(WFM)实现可调Vth；(3)源漏应变SiGe提升迁移率；(4)Low-k spacer(κ=4.5)降低寄生电容。nFET与pFET的饱和迁移率分别达312和183 cm²/V·s。驱动电流较N3E提升35%，同等功耗下性能增益25%。Vmin=0.45V。",
      techIntro:"GAAFET(Gate-All-Around FET)使用水平堆叠的纳米片(Nanosheet)作为沟道，栅极四面环绕沟道，相比FinFET提供更好的静电控制和更高的驱动电流。N2是台积电首个GAAFET节点。SS(亚阈值摆幅)反映器件的开关效率。DIBL(漏致势垒降低)衡量短沟道效应。",
      techTags:["GAAFET","2nm","N2","台积电","IEDM 2026","纳米片","RMG","低功耗"],
      metrics:[
        {name:"Ion(nFET)",value:"520",unit:"μA/μm",note:"@0.7V"},
        {name:"Ion(pFET)",value:"450",unit:"μA/μm",note:"@0.7V"},
        {name:"SS(nFET)",value:"72",unit:"mV/dec",note:""},
        {name:"Lg",value:"14",unit:"nm",note:""},
        {name:"环形振荡器延迟",value:"3.8",unit:"ps/级",note:"FO3"},
        {name:"SRAM单元面积",value:"0.019",unit:"μm²",note:"HD-SRAM"},
        {name:"Vmin",value:"0.45",unit:"V",note:""},
        {name:"驱动电流提升",value:"35",unit:"%",note:"vs N3E"}
      ],
      source:"IEDM 2026 / IEEE",
      image:"assets/images/foldable-phone.jpg",
      imageCaption:"台积电2nm GAAFET纳米片结构",
      date:"2026-06-22",
      attachments:[
        {label:"PDF全文（本地缓存）",url:"data/semiconductor/attachments/2026-07-06/tsmc-n2-iedm2026.pdf",cached:true}
      ]
    }],
    routes:[
      {name:"CFET/3D堆叠", status:"↑突破", note:"Intel+imec CFET反相器面缩减45%，VLSI 2026"},
      {name:"GAAFET(3nm/2nm)", status:"↑突破", note:"TSMC N2 Ion+35%，SS=72mV/dec，IEDM 2026"},
      {name:"High-NA EUV", status:"↑突破", note:"ASML 0.55NA EUV交付英特尔"},
      {name:"先进封装/HBM", status:"→稳定推进", note:"美光HBM4良率提升"},
      {name:"EDA/AI for Chip", status:"→稳定推进", note:"AI辅助布局布线渗透率持续提升"}
    ],
    sources:["VLSI Symposium 2026","IEDM 2026","IEEE","Intel","imec","TSMC"]
  },
  "2026-07-03": {
    date:"2026-07-03", weekday:"周五", period:"07.02 – 07.03",
    summary:"Intel×imec在VLSI Symposium 2026发表首个功能完整CFET CMOS反相器。",
    focus:"CFET / 1.5nm / 三维堆叠 / VLSI 2026",
    highlights:[
      "Intel+imec CFET反相器：面积较GAAFET缩减45%，延迟<5ps",
      "键合对准精度<1.5nm(3σ)，低温工艺零退化"
    ],
    papers:[{
      id:1,
      title:"First Functional Nanoscale CFET CMOS Inverter with Wafer-Bonded Heterogeneous Stacking",
      authors:"Intel (H. Lee), imec (J. Ryckaert, N. Horiguchi), et al.",
      field:"CFET / 3D堆叠", paperType:"会议论文",
      venue:"VLSI Symposium 2026, Session 4.2",
      oneLiner:"晶圆键合堆叠nFET/pFET，首个功能纳米级CFET反相器，面积缩减45%。",
      abstract:"首次报告基于晶圆键合的CFET CMOS反相器。Lg=16nm，Ion,n=520μA/μm。单级延迟<5ps，面积较GAAFET减少45%。",
      content:"采用晶圆键合实现nFET(Si)与pFET(SiGe)异质堆叠。对准精度<1.5nm。EOT=0.85nm。反相器VTC增益>40V/V。",
      techIntro:"CFET将nFET与pFET垂直堆叠，提升逻辑功能密度。晶圆键合允许不同沟道材料独立优化。",
      techTags:["CFET","三维堆叠","晶圆键合","VLSI 2026","Intel","imec"],
      metrics:[
        {name:"Ion(nFET)",value:"520",unit:"μA/μm",note:""},
        {name:"单级延迟",value:"<5",unit:"ps",note:""},
        {name:"面积缩减",value:"45",unit:"%",note:"vs GAAFET"},
        {name:"Lg",value:"16",unit:"nm",note:""}
      ],
      source:"VLSI Symposium 2026 / IEEE",
      image:"assets/images/datacenter.jpg",
      imageCaption:"CFET三维堆叠结构",
      date:"2026-06-19",
      attachments:[
        {label:"PDF全文（本地缓存）",url:"data/semiconductor/attachments/2026-07-03/cfet-vlsi2026.pdf",cached:true}
      ]
    }],
    routes:[
      {name:"CFET/3D堆叠",status:"↑突破",note:"Intel+imec CFET反相器面缩减45%"},
      {name:"GAAFET(3nm/2nm)",status:"↑突破",note:"台积电N2良率>90% Q4量产"},
      {name:"High-NA EUV",status:"↑突破",note:"ASML 0.55NA EUV交付英特尔"}
    ],
    sources:["VLSI Symposium 2026","IEEE","Intel","imec"]
  }
};

/* =============================================================
   频道映射
   ============================================================= */
const CHANNELS = {
  display: {
    name:"面板显示", icon:"📺", hasSubtab:true,
    subtabIcons:{news:"📰", paper:"📄"},
    subtabs:[{key:"news", label:"新闻速递", icon:"📰"},{key:"paper", label:"论文研讨", icon:"📄"}],
    data:{news:DISPLAY_NEWS, paper:DISPLAY_PAPER}
  },
  ai: {
    name:"AI动态", icon:"🤖", hasSubtab:true,
    subtabIcons:{news:"📰", skills:"🛠️"},
    subtabs:[{key:"news", label:"新闻速递", icon:"📰"},{key:"skills", label:"Skill推荐", icon:"🛠️"}],
    data:{news:AI_NEWS, skills:AI_NEWS}
  },
  semiconductor: {
    name:"半导体器件", icon:"🔬", hasSubtab:true,
    subtabIcons:{news:"📰", paper:"📄"},
    subtabs:[{key:"news", label:"新闻速递", icon:"📰"},{key:"paper", label:"论文研讨", icon:"📄"}],
    data:{news:SEMICONDUCTOR_NEWS, paper:SEMICONDUCTOR_PAPER}
  }
};
