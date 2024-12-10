// 元器件数据库
const componentsDB = [
    // 基础元器件
    {
        name: '电阻 (Resistor)',
        category: 'resistor',
        usage_description: '用于限制电流或分压。<br><img src="electronicImages/resistor.png" alt="电阻示意图" style="max-width:100%;">',
        programming_code: '#define RESISTOR_VALUE 1000  // 1kΩ\nint main() {\n    int voltage = 5;  // 5V\n    int current = voltage / RESISTOR_VALUE;\n    printf("Current: %d mA\\n", current);\n    return 0;\n}',
        tags: ['基础元件', '电阻', '分压', '限流']
    },
    // 单片机系列
    {
        name: 'STM32F103C8T6',
        category: 'mcu',
        usage_description: '广泛使用的ARM Cortex-M3单片机，主频72MHz，64KB Flash，20KB RAM。',
        programming_code: '#include "stm32f1xx_hal.h"\n\nint main(void) {\n    HAL_Init();\n    SystemClock_Config();\n    // 用户代码\n    while(1) {}\n}',
        tags: ['STM32', 'ARM', 'Cortex-M3', '单片机']
    },
    {
        name: 'ESP32-WROOM-32',
        category: 'mcu',
        usage_description: '集成WiFi和蓝牙的高性能MCU，双核240MHz，520KB RAM。',
        programming_code: '#include "esp_wifi.h"\n\nvoid app_main() {\n    esp_wifi_init(&wifi_config);\n    // WiFi初始化代码\n}',
        tags: ['ESP32', 'WiFi', '蓝牙', '物联网']
    },
    // 传感器系列
    {
        name: 'DHT11',
        category: 'sensor',
        usage_description: '数字温湿度传感器，测量范围：温度0-50℃，湿度20-90%。',
        programming_code: '#include "DHT.h"\nDHT dht(DHTPIN, DHT11);\n\nvoid setup() {\n    dht.begin();\n}',
        tags: ['传感器', '温度', '湿度', 'DHT11']
    },
    {
        name: 'MPU6050',
        category: 'sensor',
        usage_description: '六轴运动传感器，集成加速度计和陀螺仪。',
        programming_code: '#include "Wire.h"\n#include "MPU6050.h"\nMPU6050 mpu;\n\nvoid setup() {\n    Wire.begin();\n    mpu.initialize();\n}',
        tags: ['传感器', '加速度计', '陀螺仪', 'I2C']
    },
    // 通信模块
    {
        name: 'NRF24L01',
        category: 'communication',
        usage_description: '2.4GHz无线通信模块，支持多通道。',
        programming_code: '#include "RF24.h"\nRF24 radio(CE_PIN, CSN_PIN);\n\nvoid setup() {\n    radio.begin();\n    radio.openWritingPipe(address);\n}',
        tags: ['无线通信', '2.4GHz', 'SPI']
    },
    {
        name: 'HC-05',
        category: 'communication',
        usage_description: '蓝牙串口通信模块，支持主从模式。',
        programming_code: 'void setup() {\n    Serial1.begin(9600);\n    // AT指令配置\n}',
        tags: ['蓝牙', '串口', 'UART']
    },
    // 显示模块
    {
        name: 'SSD1306',
        category: 'display',
        usage_description: '0.96寸OLED显示屏，I2C通信。',
        programming_code: '#include "Adafruit_SSD1306.h"\nAdafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT);\n\nvoid setup() {\n    display.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n}',
        tags: ['OLED', 'I2C', '显示']
    },
    // 电源管理
    {
        name: 'AMS1117-3.3',
        category: 'power',
        usage_description: '3.3V稳压芯片，最大输出电流1A。',
        programming_code: '// 硬件电路，无需编程\n// 输入电压：4.75V-12V\n// 输出电压：3.3V',
        tags: ['稳压', '电源管理', '3.3V']
    }
];

// 搜索引擎类
class ComponentSearch {
    constructor() {
        this.components = componentsDB;
        this.initializeEventListeners();
    }

    // 初始化事件监听
    initializeEventListeners() {
        const searchInput = document.getElementById('componentSearch');
        const searchBtn = document.querySelector('.search-btn');
        const filterTags = document.querySelectorAll('.filter-tag');
        const categorySelect = document.getElementById('componentCategory');
        const popularTags = document.querySelectorAll('.popular-tags .tag');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearchInput(e.target.value);
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.performSearch();
            });
        }

        if (filterTags) {
            filterTags.forEach(tag => {
                tag.addEventListener('click', (e) => {
                    this.handleFilterTag(e.target);
                });
            });
        }

        if (categorySelect) {
            categorySelect.addEventListener('change', () => {
                this.performSearch();
            });
        }

        if (popularTags) {
            popularTags.forEach(tag => {
                tag.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (searchInput) {
                        searchInput.value = tag.textContent;
                        this.performSearch();
                    }
                });
            });
        }
    }

    // 处理搜索输入
    handleSearchInput(value) {
        const suggestions = this.getSuggestions(value);
        this.displaySuggestions(suggestions);
    }

    // 获取搜索建议
    getSuggestions(query) {
        if (!query) return [];
        
        query = query.toLowerCase();
        const suggestions = new Set();
        
        this.components.forEach(component => {
            if (component.name.toLowerCase().includes(query)) {
                suggestions.add(component.name);
            }
            component.tags.forEach(tag => {
                if (tag.toLowerCase().includes(query)) {
                    suggestions.add(tag);
                }
            });
        });
        
        return Array.from(suggestions).slice(0, 5);
    }

    // 显示搜索建议
    displaySuggestions(suggestions) {
        const suggestionsDiv = document.getElementById('searchSuggestions');
        if (!suggestionsDiv) return;

        suggestionsDiv.innerHTML = '';
        
        if (suggestions.length > 0) {
            suggestions.forEach(suggestion => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = suggestion;
                div.addEventListener('click', () => {
                    const searchInput = document.getElementById('componentSearch');
                    if (searchInput) {
                        searchInput.value = suggestion;
                        suggestionsDiv.innerHTML = '';
                        this.performSearch();
                    }
                });
                suggestionsDiv.appendChild(div);
            });
            suggestionsDiv.classList.add('active');
        } else {
            suggestionsDiv.classList.remove('active');
        }
    }

    // 处理筛选标签
    handleFilterTag(tagElement) {
        const wasActive = tagElement.classList.contains('active');
        
        // 移除所有标签的active状态
        document.querySelectorAll('.filter-tag').forEach(tag => {
            tag.classList.remove('active');
        });
        
        // 如果标签之前不是active状态，则激活它
        if (!wasActive) {
            tagElement.classList.add('active');
            const category = tagElement.dataset.type;
            const categorySelect = document.getElementById('componentCategory');
            if (categorySelect) {
                categorySelect.value = category;
            }
        }
        
        this.performSearch();
    }

    // 执行搜索
    performSearch() {
        const searchInput = document.getElementById('componentSearch');
        const categorySelect = document.getElementById('componentCategory');
        
        if (!searchInput || !categorySelect) return;
        
        const query = searchInput.value.toLowerCase();
        const category = categorySelect.value;
        
        const results = this.components.filter(component => {
            const matchesQuery = !query || 
                component.name.toLowerCase().includes(query) ||
                component.tags.some(tag => tag.toLowerCase().includes(query)) ||
                component.usage_description.toLowerCase().includes(query);
                
            const matchesCategory = category === 'all' || component.category === category;
            
            return matchesQuery && matchesCategory;
        });
        
        this.displayResults(results);
    }

    // 显示搜索结果
    displayResults(results) {
        const resultsDiv = document.getElementById('searchResults');
        if (!resultsDiv) return;

        resultsDiv.innerHTML = '';
        
        if (results.length === 0) {
            resultsDiv.innerHTML = '<div class="no-results">没有找到匹配的元器件</div>';
            return;
        }
        
        results.forEach(result => {
            const resultCard = document.createElement('div');
            resultCard.className = 'result-card';
            resultCard.innerHTML = `
                <h3>${result.name}</h3>
                <p>${result.usage_description}</p>
                <div class="tags">
                    ${result.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <pre><code>${result.programming_code}</code></pre>
            `;
            resultsDiv.appendChild(resultCard);
        });
    }
}

// 初始化搜索引擎
document.addEventListener('DOMContentLoaded', () => {
    const componentSearch = new ComponentSearch();
}); 