/**
 * Wheel of Fate Character Sheet - Print Function
 * This file contains the functionality for printing the character sheet
 */

document.addEventListener('DOMContentLoaded', function() {
    // 创建打印按钮
    const printButton = document.createElement('button');
    printButton.id = 'print-button';
    printButton.className = 'print-button';
    printButton.innerHTML = '<span class="print-icon">🖨️</span>';
    printButton.setAttribute('aria-label', '打印角色卡');
    printButton.setAttribute('title', '打印当前角色卡');
    
    // 将按钮添加到页面的右下角
    document.body.appendChild(printButton);
    
    // 添加打印功能
    printButton.addEventListener('click', function() {
        // 使用原生打印功能
        window.print();
    });
    
    // 监听打印媒体查询变化
    const mediaQueryList = window.matchMedia('print');
    mediaQueryList.addEventListener('change', function(mql) {
        if (!mql.matches) {
            // 打印结束后的操作（如果需要）
        }
    });
});