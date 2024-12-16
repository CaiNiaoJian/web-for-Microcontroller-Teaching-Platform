// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    initializeAOS();
    setupEventListeners();
    setupVoiceSearch();
});

// 初始化AOS动画库
function initializeAOS() {
    AOS.init({
        duration: 800,
        once: true
    });
}

// 设置事件监听器
function setupEventListeners() {
    // 搜索按钮点击事件
    document.querySelector('.search-btn').addEventListener('click', performSearch);
    
    // 搜索输入框回车事件
    document.getElementById('componentSearch').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // 快速筛选标签点击事件
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const searchTerm = this.textContent;
            document.getElementById('componentSearch').value = searchTerm;
            performSearch();
        });
    });

    // 排序选择事件
    document.getElementById('sortResults').addEventListener('change', function() {
        sortSearchResults(this.value);
    });
}

// 切换高级搜索面板
function toggleAdvancedSearch() {
    const panel = document.getElementById('advancedSearch');
    const isHidden = panel.style.display === 'none' || !panel.style.display;
    
    if (isHidden) {
        panel.style.display = 'block';
        setTimeout(() => {
            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
        }, 10);
    } else {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            panel.style.display = 'none';
        }, 300);
    }
}

// 执行搜索
function performSearch() {
    const searchTerm = document.getElementById('componentSearch').value;
    const category = document.getElementById('componentCategory').value;
    
    if (!searchTerm.trim()) {
        showNotification('请输入搜索关键词');
        return;
    }

    // 显示加载动画
    showLoadingState();

    // 模拟API请求
    setTimeout(() => {
        const results = getMockSearchResults(searchTerm, category);
        displaySearchResults(results);
        hideLoadingState();
    }, 1000);
}

// 显示加载状态
function showLoadingState() {
    const resultsSection = document.getElementById('searchResults');
    resultsSection.classList.add('loading');
    document.querySelector('.results-count strong').textContent = '搜索中...';
}

// 隐藏加载状态
function hideLoadingState() {
    const resultsSection = document.getElementById('searchResults');
    resultsSection.classList.remove('loading');
}

// 显示搜索结果
function displaySearchResults(results) {
    const resultsGrid = document.getElementById('resultsGrid');
    const resultsCount = document.querySelector('.results-count strong');
    
    resultsGrid.innerHTML = '';
    resultsCount.textContent = results.length;

    results.forEach(result => {
        const resultCard = createResultCard(result);
        resultsGrid.appendChild(resultCard);
    });

    // 显示结果区域
    document.getElementById('searchResults').classList.add('active');
}

// 创建结果卡片
function createResultCard(result) {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
        <div class="result-content">
            <div class="result-header">
                <div class="result-icon">
                    <i class="fas fa-microchip"></i>
                </div>
                <div class="result-title">
                    <h3>${result.name}</h3>
                    <span class="manufacturer"><i class="fas fa-industry"></i> ${result.manufacturer}</span>
                </div>
            </div>
            <div class="result-body">
                <p class="result-description">${result.description}</p>
                <div class="result-features">
                    ${result.features ? `
                        <ul>
                            ${result.features.map(feature => `
                                <li><i class="fas fa-check"></i> ${feature}</li>
                            `).join('')}
                        </ul>
                    ` : ''}
                </div>
            </div>
            <div class="result-footer">
                <a href="#" class="view-datasheet">查看数据手册</a>
                <a href="#" class="view-details">详细参数</a>
            </div>
        </div>
    `;
    return card;
}

// 排序搜索结果
function sortSearchResults(sortType) {
    const resultsGrid = document.getElementById('resultsGrid');
    const results = Array.from(resultsGrid.children);

    results.sort((a, b) => {
        const nameA = a.querySelector('.result-title h3').textContent.toLowerCase();
        const nameB = b.querySelector('.result-title h3').textContent.toLowerCase();
        const manufacturerA = a.querySelector('.manufacturer').textContent.toLowerCase();
        const manufacturerB = b.querySelector('.manufacturer').textContent.toLowerCase();

        switch (sortType) {
            case 'name-asc':
                return nameA.localeCompare(nameB);
            case 'name-desc':
                return nameB.localeCompare(nameA);
            case 'manufacturer':
                return manufacturerA.localeCompare(manufacturerB);
            default:
                return 0;
        }
    });

    resultsGrid.innerHTML = '';
    results.forEach(result => resultsGrid.appendChild(result));
}

// 设置语音搜索
function setupVoiceSearch() {
    const voiceButton = document.querySelector('.voice-search-btn');
    
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'zh-CN';

        recognition.onresult = function(event) {
            const searchInput = document.getElementById('componentSearch');
            searchInput.value = event.results[0][0].transcript;
            performSearch();
        };

        voiceButton.addEventListener('click', function() {
            recognition.start();
            voiceButton.classList.add('listening');
        });

        recognition.onend = function() {
            voiceButton.classList.remove('listening');
        };
    } else {
        voiceButton.style.display = 'none';
    }
}

// 显示通知
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 模拟搜索结果数据
function getMockSearchResults(searchTerm, category) {
    // 基础元器件数据库
    const components = [
        // 基础单片机/开发板
        {
            name: 'Arduino UNO R3',
            description: '最受欢迎的Arduino开发板，非常适合入门学习。基于ATmega328P，接口丰富，配套资源和教程众多。',
            manufacturer: 'Arduino',
            features: [
                '适合初学者的开发板',
                '使用USB直接编程',
                '14个数字输入/输出引脚',
                '6个模拟输入引脚',
                '丰富的学习资源'
            ]
        },
        {
            name: 'STM32F103C8T6最小系统板',
            description: '入门级32位ARM单片机开发板，性能强大，价格实惠，广泛用于学习和小型项目开发。',
            manufacturer: 'ST',
            features: [
                '72MHz主频，性能强大',
                '64KB程序存储空间',
                '20KB内存',
                '支持ISP下载程序',
                '引出全部IO口'
            ]
        },
        // 基础传感器
        {
            name: 'DHT11温湿度传感器模块',
            description: '入门级数字温湿度传感器，单总线通信，使用简单，适合初学者学习和实验。',
            manufacturer: 'Aosong',
            features: [
                '测量温度和湿度',
                '单总线数据接口，使用简单',
                '工作电压3.3V-5.5V',
                '有现成的库函数',
                '适合新手入门项目'
            ]
        },
        {
            name: 'HC-SR04超声波测距模块',
            description: '常用的超声波测距模块，可以测量2cm-400cm范围内的距离，适合各类避障和测距项目。',
            manufacturer: 'Generic',
            features: [
                '测量范围：2cm-400cm',
                '精度：3mm',
                '工作电压：5V',
                '4个引脚：VCC,Trig,Echo,GND',
                '有大量示例代码'
            ]
        },
        // LED和显示
        {
            name: '5mm LED发光二极管套件',
            description: '基础的LED发光二极管套装，包含多种颜色，是开始学习电子制作的必备元件。',
            manufacturer: 'Generic',
            features: [
                '多种颜色可选',
                '标准5mm封装',
                '工作电压：2V-3.3V',
                '需��限流电阻',
                '适合LED闪烁实验'
            ]
        },
        {
            name: '1602 LCD显示模块',
            description: '经典的字符液晶显示屏，16×2字符显示，支持I2C接口，适合显示简单的文字和数字。',
            manufacturer: 'Generic',
            features: [
                '16列×2行字符显示',
                'I2C接口，只需4根线',
                '蓝底白字',
                '内置背光',
                '有Arduino库支持'
            ]
        },
        // 基础电子元件
        {
            name: '电阻套件(1/4W)',
            description: '常用电阻值套装，包含多种常用阻值，适合各类电子制作和实验。',
            manufacturer: 'Generic',
            features: [
                '常用阻值齐全',
                '功率：1/4W',
                '误差：±5%',
                '标准色环标识',
                '附带电阻色环对照表'
            ]
        },
        {
            name: '电容套件',
            description: '基础电容套装，包含陶瓷电容和电解电容，是电子制作的基本元件。',
            manufacturer: 'Generic',
            features: [
                '包含陶瓷和电解电容',
                '常用容值齐全',
                '工作电压标注清晰',
                '附带电容识别说明',
                '适合滤波和去耦'
            ]
        },
        // 通信模块
        {
            name: 'HC-05蓝牙模块',
            description: '经典蓝牙串口模块，可用于无线串口通信，适合制作手机控制项目。',
            manufacturer: 'Generic',
            features: [
                '主从一体，配置灵活',
                '串口通信，使用简单',
                '工作电压：3.3V-6V',
                '通信距离：10米',
                '支持AT指令配置'
            ]
        },
        {
            name: 'ESP8266 WiFi模块',
            description: '入门级WiFi模块，价格实惠，可用于物联网项目，支持Arduino开发。',
            manufacturer: 'Espressif',
            features: [
                '内置TCP/IP协议栈',
                '支持Arduino开发',
                '工作电压：3.3V',
                '支持STA/AP模式',
                '有大量入门教程'
            ]
        },
        // 电机和驱动
        {
            name: '9G舵机',
            description: '常用的小型舵机，适合机器人、模型制作等项目，转动角度0-180度。',
            manufacturer: 'Generic',
            features: [
                '工作电压：4.8V-6V',
                '转动角度：0-180度',
                '扭矩：1.6kg/cm',
                '重量轻巧',
                '有Arduino库支持'
            ]
        },
        {
            name: 'L298N电机驱动模块',
            description: '双H桥直流电机驱动模块，可以控制两个直流电机的转向和速度。',
            manufacturer: 'Generic',
            features: [
                '驱动电压：5V-35V',
                '最大电流：2A',
                '可控制两个电机',
                '支持PWM调速',
                '散热性能好'
            ]
        },
        // 51单片机系列
        {
            name: 'STC89C52RC单片机',
            description: '经典的51单片机，8位微控制器，Flash容量8K，适合入门学习51单片机开发。',
            manufacturer: 'STC',
            features: [
                '工作频率最高35MHz',
                '8K Flash程序存储器',
                '512字节RAM',
                '支持ISP下载',
                '兼容传统8051指令集'
            ]
        },
        {
            name: 'STC89C51最小系统板',
            description: '51单片机最小系统开发板，包含基本下载电路和复位电路，适合教学和实验。',
            manufacturer: 'Generic',
            features: [
                '标准40脚封装',
                '板载晶振和复位电路',
                'USB下载接口',
                '所有IO口引出',
                '电源指示LED'
            ]
        },
        {
            name: 'STC15F2K60S2开发板',
            description: '增强型51单片机开发板，主频更高，外设更丰富，性能优于传统51。',
            manufacturer: 'STC',
            features: [
                '最高可达48MHz主频',
                '60KB Flash容量',
                '2KB RAM',
                '支持USB下载',
                '内置ADC和PWM'
            ]
        },
        {
            name: '51单片机实验板',
            description: '集成多种常用模块的51教学实验板，包含LED、按键、数码管等，适合完整项目学习。',
            manufacturer: 'Generic',
            features: [
                '8位LED显示',
                '4位数码管',
                '矩阵键盘',
                'DS1302时钟模块',
                '蜂鸣器和继电器'
            ]
        },
        // OpenMV系列
        {
            name: 'OpenMV Cam H7',
            description: '功能强大的机器视觉开发板，支持多种图像处理算法，可用于计算机视觉项目开发。',
            manufacturer: 'OpenMV',
            features: [
                'STM32H7处理器',
                '支持多种图像传感器',
                'MicroPython编程',
                'USB即插即用',
                '内置机器视觉算法'
            ]
        },
        {
            name: 'OpenMV LCD屏幕模块',
            description: 'OpenMV专用LCD显示模块，可实时显示摄像头图像和处理结果。',
            manufacturer: 'OpenMV',
            features: [
                '128x160分辨率',
                'SPI接口',
                '背光可调',
                '即插即用',
                '支持中文显示'
            ]
        },
        {
            name: 'OpenMV WiFi模块',
            description: 'OpenMV官方WiFi扩展模块，支持无线图传和远程控制。',
            manufacturer: 'OpenMV',
            features: [
                'ESP8266芯片',
                '支持AP/STA模式',
                '可进行无线图传',
                '支持WebSocket',
                '配置简单'
            ]
        },
        {
            name: 'OpenMV 舵机云台套件',
            description: '专门为OpenMV设计的二自由度云台，适合视觉追踪等项目。',
            manufacturer: 'Generic',
            features: [
                '双轴舵机云台',
                '金属支架',
                '摄像头固定座',
                '预留接线端子',
                '附带示例代码'
            ]
        },
        {
            name: 'OpenMV 激光测距模块',
            description: 'OpenMV配套的激光测距模块，可用于精确距离测量和3D扫描。',
            manufacturer: 'Generic',
            features: [
                '测量范围：0.1-12m',
                '精度：±1mm',
                'I2C接口',
                '低功耗设计',
                '配套示例程序'
            ]
        },
        // 51单片机配件
        {
            name: 'AT24C02存储模块',
            description: '常用的I2C接口EEPROM模块，用于51单片机数据存储。',
            manufacturer: 'Generic',
            features: [
                '256字节存储空间',
                'I2C接口',
                '掉电数据保持',
                '100万次擦写',
                '配套程序示例'
            ]
        },
        {
            name: 'DS1302时钟模块',
            description: '实时时钟模块，为51单片机提供精确的时间信息。',
            manufacturer: 'Generic',
            features: [
                '年月日时分秒显示',
                '自动闰年调整',
                '电池供电备份',
                '3线接口设计',
                '示例代码丰富'
            ]
        },
        {
            name: '51单片机下载器',
            description: 'USB转TTL下载器，支持多种51系列单片机程序下载。',
            manufacturer: 'Generic',
            features: [
                'CH340芯片方案',
                '支持ISP下载',
                'LED指示灯',
                '兼容多种开发环境',
                '即插即用'
            ]
        },
        // 测量仪器
        {
            name: 'DSO138示波器套件',
            description: '入门级数字示波器DIY套件，单通道，适合学习和基础波形观测。',
            manufacturer: 'JYE Tech',
            features: [
                '带宽：0-200KHz',
                '最大采样率：1Msps',
                '2.4英寸TFT显示屏',
                '内置信号发生器',
                '可组装学习示波器原理'
            ]
        },
        {
            name: 'DSO FNIRSI-1013D数字示波器',
            description: '便携式双通道数字示波器，支持波形存储和USB传输，适合实验室和现场测试。',
            manufacturer: 'FNIRSI',
            features: [
                '双通道，100MHz带宽',
                '1GSa/s采样率',
                '7英寸LCD显示屏',
                '支持波形存储',
                'USB数据传输'
            ]
        },
        {
            name: 'VC97万用表',
            description: '专业数字万用表，可测量电压、电流、电阻等，带背光显示。',
            manufacturer: 'Victor',
            features: [
                '电压/电流/电阻测量',
                '电容/频率/温度测量',
                '二极管/通断测试',
                '数据保持功能',
                '自动量程选择'
            ]
        },
        // 焊接工具
        {
            name: '可调温电烙铁套装',
            description: '数字可调温电烙铁套装，适合电子焊接作业，配件齐全。',
            manufacturer: 'Generic',
            features: [
                '温度范围：200-480℃',
                'LED数字显示',
                '配套烙铁头多个',
                '带清洁海绵',
                '功率：60W'
            ]
        },
        {
            name: '热风枪',
            description: '可调温热风枪，适用于SMD元件焊接和脱焊，温度可调。',
            manufacturer: 'Generic',
            features: [
                '温度范围：100-450℃',
                '风量可调',
                'LED显示屏',
                '过热保护',
                '配套喷嘴多个'
            ]
        },
        {
            name: '焊台套装',
            description: '专业电子焊接工作站，包含电烙铁和热风枪，温度可调。',
            manufacturer: 'Generic',
            features: [
                '双工具：烙铁+热风枪',
                '数字温控',
                '自动休眠功能',
                'ESD防静电设计',
                '配件齐全'
            ]
        },
        // 基础电子元件
        {
            name: '二极管套件',
            description: '常用二极管套装，包含整流、稳压、开关等多种二极管。',
            manufacturer: 'Generic',
            features: [
                '1N4007整流二极管',
                '1N4148开关二极管',
                'LED发光二极管',
                '稳压二极管系列',
                '附带参数手册'
            ]
        },
        {
            name: '三极管套件',
            description: '常用三极管套装，包含NPN和PNP型号，适合各类放大和开关电路。',
            manufacturer: 'Generic',
            features: [
                '9013/9012系列',
                '2N3904/3906对管',
                'S8050/8550系列',
                '场效应管系列',
                '分类收纳盒装'
            ]
        },
        {
            name: '精密电位器套件',
            description: '多种规格的精密可调电阻，适用于各类电路调节。',
            manufacturer: 'Generic',
            features: [
                '常用阻值系列',
                '3296W封装',
                '多圈调节',
                '稳定性好',
                '带调节说明'
            ]
        },
        {
            name: '贴片电容套件',
            description: 'SMD贴��电容套装，包含多种常用容值。',
            manufacturer: 'Generic',
            features: [
                '0603/0805/1206规格',
                '常用容值齐全',
                'X7R/NPO材质',
                '50V耐压',
                '分格收纳盒'
            ]
        },
        // 工具配件
        {
            name: '电烙铁头套装',
            description: '多种规格烙铁头套装，适合不同焊接需求。',
            manufacturer: 'Generic',
            features: [
                '尖头/斜头/刀头',
                '适合各类焊接',
                '镀铁工艺',
                '耐高温设计',
                '通用型号'
            ]
        },
        {
            name: '焊接工具套装',
            description: '电子焊接辅助工具套装，包含镊子、剥线钳等常用工具。',
            manufacturer: 'Generic',
            features: [
                '防静电镊子',
                '剥线钳',
                '尖嘴钳',
                '吸锡器',
                '焊锡丝'
            ]
        },
        {
            name: '电子工具箱套装',
            description: '专业电子维修工具套装，包含常用工具和仪表。',
            manufacturer: 'Generic',
            features: [
                '数字万用表',
                '螺丝刀套装',
                '焊接工具',
                '测试导线',
                '收纳工具箱'
            ]
        }
    ];

    // 搜索逻辑
    let results = components;
    
    // 按类别筛选
    if (category && category !== 'all') {
        results = results.filter(item => {
            switch(category) {
                case 'mcu':
                    return item.name.toLowerCase().includes('arduino') || 
                           item.name.toLowerCase().includes('stm32') ||
                           item.name.toLowerCase().includes('51') ||
                           item.name.toLowerCase().includes('stc');
                case 'sensor':
                    return item.name.toLowerCase().includes('传感器') ||
                           item.name.toLowerCase().includes('sensor') ||
                           item.name.toLowerCase().includes('openmv');
                case 'display':
                    return item.name.toLowerCase().includes('led') ||
                           item.name.toLowerCase().includes('lcd');
                case 'communication':
                    return item.name.toLowerCase().includes('蓝牙') ||
                           item.name.toLowerCase().includes('wifi');
                case 'tools':
                    return item.name.toLowerCase().includes('示波器') ||
                           item.name.toLowerCase().includes('万用表') ||
                           item.name.toLowerCase().includes('焊') ||
                           item.name.toLowerCase().includes('工具');
                case 'components':
                    return item.name.toLowerCase().includes('电阻') ||
                           item.name.toLowerCase().includes('电容') ||
                           item.name.toLowerCase().includes('二极管') ||
                           item.name.toLowerCase().includes('三极管');
                default:
                    return true;
            }
        });
    }

    // 按关键词搜索
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        results = results.filter(item =>
            item.name.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term) ||
            item.features.some(feature => feature.toLowerCase().includes(term))
        );
    }

    return results;
} 