// 模拟器状态
const SimulatorState = {
    STOPPED: 'stopped',
    RUNNING: 'running',
    PAUSED: 'paused'
};

// 模拟器类
class Simulator {
    constructor() {
        this.state = SimulatorState.STOPPED;
        this.leds = Array(4).fill(false);
        this.buttons = Array(2).fill(false);
        this.worker = null;
        this.initializeHardware();
    }

    // 初始化硬件
    initializeHardware() {
        // 初始化LED
        this.leds.forEach((_, index) => {
            const led = document.querySelector(`.led[data-pin="${index}"] .led-light`);
            if (led) {
                led.classList.remove('on');
            }
        });

        // 初始化按键
        document.querySelectorAll('.control-btn').forEach((btn, index) => {
            btn.addEventListener('mousedown', () => this.setButton(index, true));
            btn.addEventListener('mouseup', () => this.setButton(index, false));
            btn.addEventListener('mouseleave', () => this.setButton(index, false));
        });
    }

    // LED控制
    setLED(pin, state) {
        if (pin >= 0 && pin < this.leds.length) {
            this.leds[pin] = state;
            const led = document.querySelector(`.led[data-pin="${pin}"] .led-light`);
            if (led) {
                if (state) {
                    led.classList.add('on');
                } else {
                    led.classList.remove('on');
                }
            }
        }
    }

    // 按键控制
    setButton(pin, state) {
        if (pin >= 0 && pin < this.buttons.length) {
            this.buttons[pin] = state;
            this.debugLog(`Button ${pin} ${state ? 'pressed' : 'released'}`);
        }
    }

    // 获取按键状态
    getButton(pin) {
        return pin >= 0 && pin < this.buttons.length ? this.buttons[pin] : false;
    }

    // 延时函数
    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 运行代码
    runCode(code) {
        if (this.state === SimulatorState.RUNNING) {
            this.debugLog('代码已在运行中');
            return;
        }

        this.state = SimulatorState.RUNNING;
        this.debugLog('开始运行代码...');

        // 创建Web Worker来执行代码
        const blob = new Blob([`
            // 模拟硬件API
            const LED = {
                on: function(pin) { postMessage({ type: 'led', pin: pin, state: true }); },
                off: function(pin) { postMessage({ type: 'led', pin: pin, state: false }); }
            };

            const Button = {
                isPressed: async function(pin) { 
                    postMessage({ type: 'button', pin: pin });
                    return new Promise((resolve) => {
                        self.addEventListener('message', function handler(e) {
                            if (e.data.type === 'buttonState' && e.data.pin === pin) {
                                self.removeEventListener('message', handler);
                                resolve(e.data.state);
                            }
                        });
                    });
                }
            };

            async function delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            // LED控制函数
            function LED_Init() {
                LED.off(0);
                LED.off(1);
                LED.off(2);
                LED.off(3);
            }

            function LED_ON(pin) {
                LED.on(pin);
            }

            function LED_OFF(pin) {
                LED.off(pin);
            }

            async function delay_ms(ms) {
                await delay(ms);
            }

            // 移除预处理指令
            const processedCode = \`${code}\`.replace(/#.*\\n/g, '\\n');

            // 执行主程序
            async function runMain() {
                try {
                    eval(processedCode);
                    if (typeof main === 'function') {
                        await main();
                    } else {
                        throw new Error('找不到main函数');
                    }
                } catch (error) {
                    postMessage({ type: 'error', message: error.message });
                }
            }

            runMain();
        `], { type: 'application/javascript' });

        const workerUrl = URL.createObjectURL(blob);
        this.worker = new Worker(workerUrl);

        // 处理Worker消息
        this.worker.onmessage = (e) => {
            const { type, pin, state, message } = e.data;
            switch (type) {
                case 'led':
                    this.setLED(pin, state);
                    this.debugLog(`LED${pin} ${state ? '点亮' : '熄灭'}`);
                    break;
                case 'button':
                    const buttonState = this.getButton(pin);
                    this.worker.postMessage({ type: 'buttonState', pin, state: buttonState });
                    break;
                case 'error':
                    this.debugLog(`错误: ${message}`);
                    this.stop();
                    break;
            }
        };

        // 清理URL
        URL.revokeObjectURL(workerUrl);
    }

    // 停止代码执行
    stop() {
        if (this.worker) {
            this.worker.terminate();
            this.worker = null;
        }
        this.state = SimulatorState.STOPPED;
        this.debugLog('代码执行已停止');
        
        // 重置所有LED
        this.leds.forEach((_, index) => this.setLED(index, false));
    }

    // 调试输出
    debugLog(message) {
        const debugOutput = document.getElementById('debug-output');
        if (debugOutput) {
            const timestamp = new Date().toLocaleTimeString();
            const logEntry = document.createElement('div');
            logEntry.textContent = `[${timestamp}] ${message}`;
            debugOutput.appendChild(logEntry);
            debugOutput.scrollTop = debugOutput.scrollHeight;
        }
    }
}

// 创建模拟器实例
const simulator = new Simulator();

// 导出模拟器实例
window.simulator = simulator; 