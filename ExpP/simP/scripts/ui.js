// UI状态管理
class UI {
    constructor() {
        this.currentFile = 'main.c';
        this.files = {
            'main.c': editor.getValue(),
            'led.h': `#ifndef __LED_H
#define __LED_H

// LED控制函数声明
void LED_Init(void);
void LED_ON(int pin);
void LED_OFF(int pin);
void delay_ms(int ms);

#endif`,
            'led.c': `// LED控制函数实现
void LED_Init(void) {
    // 初始化所有LED为关闭状态
    LED_OFF(0);
    LED_OFF(1);
    LED_OFF(2);
    LED_OFF(3);
}

void LED_ON(int pin) {
    LED.on(pin);
}

void LED_OFF(int pin) {
    LED.off(pin);
}

void delay_ms(int ms) {
    delay(ms);
}`
        };

        this.initializeUI();
    }

    // 初始化UI
    initializeUI() {
        // 文件标签切换
        const fileTabs = document.querySelectorAll('.file-tab');
        fileTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const fileName = tab.textContent;
                this.switchFile(fileName);
            });
        });

        // 运行按钮
        const runBtn = document.querySelector('.run-btn');
        if (runBtn) {
            runBtn.addEventListener('click', () => {
                this.files[this.currentFile] = editor.getValue();
                const code = this.getAllCode();
                simulator.runCode(code);
                this.updateUIState(true);
            });
        }

        // 停止按钮
        const stopBtn = document.querySelector('.stop-btn');
        if (stopBtn) {
            stopBtn.addEventListener('click', () => {
                simulator.stop();
                this.updateUIState(false);
            });
        }

        // 按键事件
        document.querySelectorAll('.control-btn').forEach(btn => {
            // 鼠标事件
            btn.addEventListener('mousedown', () => {
                const pin = parseInt(btn.dataset.pin);
                simulator.setButton(pin, true);
            });

            btn.addEventListener('mouseup', () => {
                const pin = parseInt(btn.dataset.pin);
                simulator.setButton(pin, false);
            });

            btn.addEventListener('mouseleave', () => {
                const pin = parseInt(btn.dataset.pin);
                simulator.setButton(pin, false);
            });

            // 触摸事件
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const pin = parseInt(btn.dataset.pin);
                simulator.setButton(pin, true);
            });

            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                const pin = parseInt(btn.dataset.pin);
                simulator.setButton(pin, false);
            });
        });

        // 保存按钮
        const saveBtn = document.querySelector('.save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveProgress());
        }

        // 实验讲解和参考代码标签切换
        const guideTabs = document.querySelectorAll('.guide-tab');
        guideTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                
                // 更新标签状态
                guideTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // 更新内容显示
                const sections = document.querySelectorAll('.guide-section');
                sections.forEach(section => {
                    if (section.classList.contains(targetTab)) {
                        section.classList.add('active');
                    } else {
                        section.classList.remove('active');
                    }
                });
            });
        });

        // 初始化编辑器内容
        this.updateEditor();
    }

    // 切换文件
    switchFile(fileName) {
        // 保存当前文件的内容
        this.files[this.currentFile] = editor.getValue();

        const tabs = document.querySelectorAll('.file-tab');
        tabs.forEach(tab => {
            if (tab.textContent === fileName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        this.currentFile = fileName;
        this.updateEditor();
    }

    // 更新编辑器内容
    updateEditor() {
        const content = this.files[this.currentFile] || '';
        editor.setValue(content);
        editor.refresh();
    }

    // 获取所有代码
    getAllCode() {
        // 更新当前文件的内容
        this.files[this.currentFile] = editor.getValue();

        // 合并所有文件的代码
        return Object.values(this.files).join('\n\n');
    }

    // 更新UI状态
    updateUIState(isRunning) {
        const runBtn = document.querySelector('.run-btn');
        const stopBtn = document.querySelector('.stop-btn');
        const fileTabs = document.querySelectorAll('.file-tab');

        if (runBtn) runBtn.disabled = isRunning;
        if (stopBtn) stopBtn.disabled = !isRunning;
        fileTabs.forEach(tab => tab.disabled = isRunning);

        // 更新编辑器状态
        editor.setOption('readOnly', isRunning);
    }

    // 保存当前进度
    saveProgress() {
        // 保存当前文件的内容
        this.files[this.currentFile] = editor.getValue();

        // 创建保存数据
        const saveData = {
            files: this.files,
            timestamp: new Date().toISOString()
        };

        // 保存到localStorage
        try {
            localStorage.setItem('simulatorProgress', JSON.stringify(saveData));
            simulator.debugLog('进度已保存');
        } catch (error) {
            simulator.debugLog('保存进度失败: ' + error.message);
        }
    }

    // 加载保存的进度
    loadProgress() {
        try {
            const savedData = localStorage.getItem('simulatorProgress');
            if (savedData) {
                const { files } = JSON.parse(savedData);
                this.files = files;
                this.updateEditor();
                simulator.debugLog('进度已加载');
            }
        } catch (error) {
            simulator.debugLog('加载进度失败: ' + error.message);
        }
    }
}

// 等待编辑器初始化完成后创建UI实例
document.addEventListener('DOMContentLoaded', () => {
    // 确保编辑器已经初始化
    if (typeof editor !== 'undefined') {
        window.ui = new UI();
    } else {
        console.error('编辑器未初始化');
    }
}); 