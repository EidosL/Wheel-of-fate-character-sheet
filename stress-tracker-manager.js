/**
 * Stress Tracker Manager for Wheel of Fate Character Sheet
 * Handles independent point toggling and dynamic style updates for all trackers.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 获取所有追踪器的容器
    const trackerContainers = document.querySelectorAll('[data-tracker-type]');
    
    trackerContainers.forEach(container => {
        const circles = container.querySelectorAll('.circle');
        const wrapperElement = container.closest('.tracker, .momentum-tracker');

        if (!wrapperElement) return;

        circles.forEach(circle => {
            // 1. 为每个圆点添加点击事件
            circle.addEventListener('click', () => {
                circle.classList.toggle('filled');
                circle.setAttribute('aria-checked', circle.classList.contains('filled').toString());

                // 每次点击后，更新对应的视觉样式
                updateTrackerStyles(wrapperElement, container);
            });

            // 2. 添加键盘可访问性支持
            circle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    circle.click();
                }
            });
        });

        // 页面加载时初始化一次，确保初始状态正确
        updateTrackerStyles(wrapperElement, container);
    });
});

/**
 * 根据实心点的数量更新追踪器的视觉样式（标题颜色或发光效果）
 * @param {HTMLElement} wrapperElement - 接收状态 class 的父元素 (.tracker or .momentum-tracker)
 * @param {HTMLElement} container - 包含所有圆点的容器 (带有 data-tracker-type)
 */
function updateTrackerStyles(wrapperElement, container) {
    const trackerType = container.dataset.trackerType;
    const filledCount = container.querySelectorAll('.circle.filled').length;

    // 根据追踪器类型，应用不同的样式逻辑
    if (trackerType === 'physical' || trackerType === 'mental') {
        // --- 逻辑分支：处理 Stress Trackers ---
        const stressLevels = {
            0: 'stress-none', 1: 'stress-low', 2: 'stress-medium', 3: 'stress-high', 4: 'stress-critical'
        };
        Object.values(stressLevels).forEach(className => wrapperElement.classList.remove(className));
        const level = Math.min(filledCount, 4);
        wrapperElement.classList.add(stressLevels[level]);

    } else if (trackerType === 'momentum') {
        // --- 逻辑分支：处理 Momentum Tracker ---
        const momentumLevels = {
            0: 'momentum-level-0', // 0-1 点
            1: 'momentum-level-1', // 2-3 点
            2: 'momentum-level-2', // 4-5 点
            3: 'momentum-level-3', // 5 点
            4: 'momentum-level-4'  // 6 点 (最大值)
        };
        // 定义一个更平滑的等级划分
        let level = 0;
        if (filledCount >= 1 && filledCount <= 2) {
            level = 1;
        } else if (filledCount >= 3 && filledCount <= 4) {
            level = 2;
        } else if (filledCount === 5) {
            level = 3;
        } else if (filledCount >= 6) {
            level = 4;
        }
        
        Object.values(momentumLevels).forEach(className => wrapperElement.classList.remove(className));
        wrapperElement.classList.add(momentumLevels[level]);
    }
}