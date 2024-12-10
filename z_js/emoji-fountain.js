// 表情数组
const emojis = ['😀', '😎', '🤓', '🤖', '💻', '⚡', '💡', '🔧', '🛠️', '📱'];

// 创建表情元素
function createEmoji(startX, startY) {
    const emoji = document.createElement('div');
    emoji.className = 'floating-emoji';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    // 随机生成初始速度和角度
    const angle = (Math.random() * 60 - 30) * Math.PI / 180; // -30度到30度
    const initialVelocity = 12 + Math.random() * 8; // 12-20的初始速度
    const vx = Math.sin(angle) * initialVelocity; // x方向速度
    const vy = -Math.cos(angle) * initialVelocity; // y方向速度（向上为负）
    const rotateSpeed = (Math.random() - 0.5) * 720; // 随机旋转速度
    const scale = 0.8 + Math.random() * 0.4; // 随机大小 0.8-1.2

    emoji.style.cssText = `
        position: fixed;
        font-size: ${24 * scale}px;
        user-select: none;
        z-index: 1000;
        transform-origin: center;
        left: ${startX}px;
        top: ${startY}px;
        opacity: 0;
    `;

    // 存储动画参数
    emoji.dataset.vx = vx;
    emoji.dataset.vy = vy;
    emoji.dataset.rotateSpeed = rotateSpeed;
    emoji.dataset.x = startX;
    emoji.dataset.y = startY;
    emoji.dataset.time = 0;

    return emoji;
}

// 添加动画样式
function addAnimationStyle() {
    if (!document.getElementById('emoji-animation-style')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'emoji-animation-style';
        styleElement.textContent = `
            .floating-emoji {
                pointer-events: none;
                will-change: transform, opacity;
                position: fixed;
                transition: opacity 0.2s ease;
                backface-visibility: hidden;
                -webkit-font-smoothing: antialiased;
            }
        `;
        document.head.appendChild(styleElement);
    }
}

// 更新表情位置
function updateEmojiPosition(emoji, deltaTime) {
    try {
        const gravity = 980; // 重力加速度 (像素/秒²)
        const time = parseFloat(emoji.dataset.time) + deltaTime;
        const vx = parseFloat(emoji.dataset.vx);
        const vy = parseFloat(emoji.dataset.vy);
        const rotateSpeed = parseFloat(emoji.dataset.rotateSpeed);
        
        // 计算新位置
        const x = parseFloat(emoji.dataset.x) + vx * time;
        const y = parseFloat(emoji.dataset.y) + vy * time + 0.5 * gravity * time * time;
        const rotation = rotateSpeed * time;
        
        // 更新位置和旋转
        emoji.style.transform = `translate(${x - parseFloat(emoji.dataset.x)}px, ${y - parseFloat(emoji.dataset.y)}px) rotate(${rotation}deg)`;
        
        // 渐入渐出效果
        if (time < 0.2) {
            emoji.style.opacity = time / 0.2; // 渐入
        } else if (y > window.innerHeight - 100) {
            emoji.style.opacity = Math.max(0, 1 - (y - (window.innerHeight - 100)) / 100); // 渐出
        } else {
            emoji.style.opacity = 1;
        }
        
        // 更新数据
        emoji.dataset.time = time;
        
        // 如果表情飞出屏幕或完全透明，则结束动画
        return y < window.innerHeight && parseFloat(emoji.style.opacity) > 0;
    } catch (error) {
        console.error('更新表情位置时发生错误:', error);
        return false;
    }
}

// 初始化表情喷泉
function initEmojiFountain() {
    console.log('初始化表情喷泉...');
    
    const container = document.getElementById('emojiFountain');
    const trigger = document.getElementById('triggerEmoji');
    
    if (!container || !trigger) {
        console.error('找不到必要的DOM元素:', {
            container: !!container,
            trigger: !!trigger
        });
        return;
    }

    let isActive = false;
    let activeEmojis = new Set();
    let lastTime = performance.now();
    let animationFrame;

    // 确保动画样式已添加
    addAnimationStyle();

    // 动画循环
    function animate(currentTime) {
        try {
            const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1); // 限制最大时间步长
            lastTime = currentTime;

            // 更新所有活动的表情
            for (let emoji of activeEmojis) {
                if (!updateEmojiPosition(emoji, deltaTime)) {
                    if (emoji.parentNode) {
                        emoji.parentNode.removeChild(emoji);
                    }
                    activeEmojis.delete(emoji);
                }
            }

            if (isActive || activeEmojis.size > 0) {
                animationFrame = requestAnimationFrame(animate);
            }
        } catch (error) {
            console.error('动画循环中发生错误:', error);
            // 清理所有活动的表情
            for (let emoji of activeEmojis) {
                if (emoji.parentNode) {
                    emoji.parentNode.removeChild(emoji);
                }
            }
            activeEmojis.clear();
            isActive = false;
        }
    }

    function createFountainEmoji() {
        try {
            const buttonRect = trigger.getBoundingClientRect();
            const startX = buttonRect.left + Math.random() * buttonRect.width;
            const startY = buttonRect.top;

            const emoji = createEmoji(startX, startY);
            document.body.appendChild(emoji);
            activeEmojis.add(emoji);
        } catch (error) {
            console.error('创建表情时发生错误:', error);
        }
    }

    function startFountain(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        if (!isActive) {
            isActive = true;
            lastTime = performance.now();
            
            // 开始喷发动画
            let emojisCreated = 0;
            const maxEmojis = 20; // 最大表情数量
            const burstInterval = setInterval(() => {
                if (emojisCreated >= maxEmojis || !isActive) {
                    clearInterval(burstInterval);
                    isActive = false;
                    return;
                }
                createFountainEmoji();
                emojisCreated++;
            }, 40); // 每40ms创建一个表情

            if (!animationFrame) {
                animationFrame = requestAnimationFrame(animate);
            }
        }
    }

    // 清理和重新绑定事件监听器
    function cleanup() {
        trigger.removeEventListener('click', startFountain);
        trigger.removeEventListener('touchstart', startFountain);
        // 清理所有活动的表情
        for (let emoji of activeEmojis) {
            if (emoji.parentNode) {
                emoji.parentNode.removeChild(emoji);
            }
        }
        activeEmojis.clear();
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
    }

    // 移除旧事件监听器并添加新的
    cleanup();
    trigger.addEventListener('click', startFountain);
    trigger.addEventListener('touchstart', startFountain, { passive: false });

    // 导出清理函数
    window.cleanupEmojiFountain = cleanup;

    console.log('表情喷泉初始化完成');
}

// 确保DOM完全加载后再初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmojiFountain);
} else {
    initEmojiFountain();
}

// 导出函数供外部使用
window.reinitEmojiFountain = initEmojiFountain; 