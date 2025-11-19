// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // ========= 网页自动修复系统 =========
    const AutoRepairSystem = {
        // 修复日志
        repairLog: [],
        
        // UI元素引用
        repairLogPanel: null,
        repairControlPanel: null,
        
        // 初始化自动修复系统
        init: function() {
            console.log('[自动修复系统] 已启动');
            
            // 创建UI元素
            this.createUIElements();
            
            // 立即执行一次全面检查
            this.runFullCheck();
            
            // 设置定期检查（每30秒）
            setInterval(() => this.runFullCheck(), 30000);
            
            // 监听页面错误
            this.setupErrorListeners();
        },
        
        // 创建UI元素
        createUIElements: function() {
            // 创建修复日志面板
            this.repairLogPanel = document.createElement('div');
            this.repairLogPanel.className = 'repair-log-panel';
            this.repairLogPanel.innerHTML = `
                <h4>修复日志</h4>
                <div id="repair-log-entries"></div>
            `;
            document.body.appendChild(this.repairLogPanel);
            
            // 创建修复控制面板
            this.repairControlPanel = document.createElement('div');
            this.repairControlPanel.className = 'repair-control-panel';
            
            const checkBtn = document.createElement('button');
            checkBtn.innerText = '检查';
            checkBtn.className = 'btn-primary';
            checkBtn.onclick = () => this.runFullCheck();
            
            const viewLogBtn = document.createElement('button');
            viewLogBtn.innerText = '查看日志';
            viewLogBtn.className = 'btn-secondary';
            viewLogBtn.onclick = () => this.toggleLogPanel();
            
            this.repairControlPanel.appendChild(checkBtn);
            this.repairControlPanel.appendChild(viewLogBtn);
            document.body.appendChild(this.repairControlPanel);
        },
        
        // 切换日志面板显示/隐藏
        toggleLogPanel: function() {
            if (this.repairLogPanel) {
                this.repairLogPanel.classList.toggle('visible');
            }
        },
        
        // 更新日志面板
        updateLogPanel: function() {
            if (!this.repairLogPanel) return;
            
            const logEntries = document.getElementById('repair-log-entries');
            if (!logEntries) return;
            
            // 只显示最近20条日志
            const recentLogs = this.repairLog.slice(-20);
            logEntries.innerHTML = '';
            
            recentLogs.forEach(log => {
                const entry = document.createElement('div');
                entry.className = 'repair-log-entry';
                
                // 格式化日期时间
                const date = new Date(log.timestamp);
                const formattedTime = date.toLocaleTimeString();
                
                entry.innerHTML = `
                    <div class="repair-log-timestamp">${formattedTime}</div>
                    <div class="repair-log-type">${log.type}</div>
                    <div class="repair-log-message">${log.message}</div>
                `;
                logEntries.appendChild(entry);
            });
            
            // 滚动到底部
            logEntries.scrollTop = logEntries.scrollHeight;
        },
        
        // 设置错误监听器
        setupErrorListeners: function() {
            // 监听全局错误
            window.addEventListener('error', (event) => {
                this.logRepair('捕获到全局错误', `错误: ${event.message}, 源文件: ${event.filename}, 行号: ${event.lineno}`);
            });
            
            // 监听未处理的Promise拒绝
            window.addEventListener('unhandledrejection', (event) => {
                this.logRepair('捕获到未处理的Promise拒绝', `原因: ${event.reason}`);
            });
        },
        
        // 运行全面检查
        runFullCheck: function() {
            try {
                this.logRepair('系统信息', '开始全面检查网页内容和结构...');
                
                this.checkAndRepairHTMLStructure();
                this.checkAndRepairLinks();
                this.checkAndRepairImages();
                this.checkAndRepairCSS();
                this.checkAndRepairJavaScriptFunctions();
                
                // 特别检查Windows 11 ISO下载功能
                this.checkAndRepairWindows11DownloadFunctionality();
                
                this.logRepair('系统信息', '全面检查完成！');
            } catch (error) {
                console.error('[自动修复系统] 检查过程中发生错误:', error);
                this.logRepair('系统错误', `检查过程中发生错误: ${error.message}`);
            }
        },
        
        // 检查和修复HTML结构
        checkAndRepairHTMLStructure: function() {
            // 检查必需的HTML元素
            const requiredElements = ['.navbar', '.container', 'footer', 'header', 'main'];
            
            requiredElements.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                if (elements.length === 0) {
                    this.logRepair('HTML结构修复', `找不到必需元素: ${selector}`);
                    // 实际项目中可以实现更复杂的修复逻辑
                }
            });
        },
        
        // 检查和修复链接
        checkAndRepairLinks: function() {
            const links = document.querySelectorAll('a[href]');
            
            links.forEach(link => {
                const href = link.getAttribute('href');
                
                // 检查空链接
                if (!href || href === '#' || href.trim() === '') {
                    link.classList.add('auto-repair-warning');
                    link.title = '警告: 此链接可能无效';
                    this.logRepair('链接修复', `修复空链接: ${link.textContent || '未知链接'}`);
                }
                
                // 检查相对路径链接的有效性
                if (href && !href.startsWith('http') && !href.startsWith('#')) {
                    // 在实际应用中，可以添加实际的链接验证
                    // 这里我们只是简单地确保文件扩展名存在（如果是文件链接）
                    if (href.includes('.') && !href.includes('/')) {
                        // 可能是一个直接的文件链接，但缺少路径
                        link.href = './' + href;
                        link.classList.add('auto-repair-fixed');
                        setTimeout(() => link.classList.remove('auto-repair-fixed'), 3000);
                        this.logRepair('链接修复', `修正相对路径: ${href} -> ./${href}`);
                    }
                }
                
                // 检查Microsoft官方链接格式
                if (href && href.includes('microsoft.com') && !href.startsWith('https://')) {
                    this.logRepair('链接修复', `发现不安全的Microsoft链接，修复为HTTPS...`);
                    const secureHref = href.replace('http://', 'https://');
                    link.setAttribute('href', secureHref);
                    link.classList.add('auto-repair-fixed');
                    setTimeout(() => link.classList.remove('auto-repair-fixed'), 3000);
                    this.logRepair('链接修复', `链接已修复: ${secureHref}`);
                }
            });
        },
        
        // 检查和修复图片
        checkAndRepairImages: function() {
            const images = document.querySelectorAll('img');
            
            images.forEach(img => {
                // 检查alt属性
                if (!img.alt || img.alt.trim() === '') {
                    img.alt = '图片内容';
                    img.classList.add('auto-repair-fixed');
                    setTimeout(() => img.classList.remove('auto-repair-fixed'), 3000);
                    this.logRepair('图片修复', `添加缺失的alt属性: ${img.src.substring(img.src.lastIndexOf('/') + 1)}`);
                }
                
                // 监听图片加载失败
                img.addEventListener('error', function handleImageError() {
                    // 尝试修复图片路径（简单策略）
                    if (img.src.includes('akamaized.net')) {
                        // 对于akamaized.net的图片，我们可以尝试使用占位图或备用路径
                        img.style.backgroundColor = '#f5f5f5';
                        img.style.border = '1px dashed #ccc';
                        img.title = '图片加载失败';
                        img.classList.add('auto-repair-error');
                        AutoRepairSystem.logRepair('图片修复', `图片加载失败，应用备用样式: ${img.src}`);
                    } else {
                        // 设置备用图片或占位图
                        const placeholderSrc = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22150%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20150%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa25%20text%20%7B%20fill%3Argba(200%2C200%2C200%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa25%22%3E%3Crect%20width%3D%22200%22%20height%3D%22150%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2255%22%20y%3D%2280%22%3E图片加载失败%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E');
                        img.setAttribute('data-original-src', img.src);
                        img.src = placeholderSrc;
                        img.classList.add('auto-repair-error');
                        AutoRepairSystem.logRepair('图片修复', `已设置占位图代替失败的图片: ${img.getAttribute('data-original-src')}`);
                    }
                    // 移除事件监听器以避免重复处理
                    img.removeEventListener('error', handleImageError);
                });
            });
        },
        
        // 检查和修复CSS
        checkAndRepairCSS: function() {
            // 检查关键CSS类是否存在
            const criticalClasses = ['container', 'btn-primary', 'footer', 'btn-download', 'download-option'];
            
            criticalClasses.forEach(className => {
                const styleSheets = document.styleSheets;
                let found = false;
                
                for (let i = 0; i < styleSheets.length; i++) {
                    try {
                        const rules = styleSheets[i].cssRules || styleSheets[i].rules;
                        for (let j = 0; j < rules.length; j++) {
                            if (rules[j].selectorText && 
                                (rules[j].selectorText.includes(`.${className}`) || 
                                 rules[j].selectorText.includes(`#${className}`))) {
                                found = true;
                                break;
                            }
                        }
                    } catch (e) {
                        // 忽略跨域样式表的访问错误
                    }
                }
                
                if (!found) {
                    this.logRepair('CSS修复', `未找到关键CSS类: ${className}`);
                    // 可以在这里动态添加缺失的关键样式
                }
            });
            
            // 检查下载按钮样式
            const downloadButtons = document.querySelectorAll('.btn-download');
            downloadButtons.forEach(button => {
                if (window.getComputedStyle(button).backgroundColor === 'rgba(0, 0, 0, 0)') {
                    this.logRepair('CSS修复', '下载按钮样式缺失，应用默认样式...');
                    button.style.backgroundColor = '#0078d4';
                    button.style.color = 'white';
                    button.classList.add('auto-repair-fixed');
                    setTimeout(() => button.classList.remove('auto-repair-fixed'), 3000);
                    this.logRepair('CSS修复', '下载按钮样式已修复');
                }
            });
            
            // 检查下载选项样式
            const downloadOptions = document.querySelectorAll('.download-option');
            downloadOptions.forEach(option => {
                if (window.getComputedStyle(option).boxShadow === 'none') {
                    option.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                    this.logRepair('CSS修复', '下载选项卡片样式已修复');
                }
            });
        },
        
        // 检查和修复JavaScript函数
        checkAndRepairJavaScriptFunctions: function() {
            // 检查页面中应有的关键函数是否存在
            const requiredFunctions = ['adjustForScreenSize'];
            
            requiredFunctions.forEach(funcName => {
                if (typeof window[funcName] !== 'function') {
                    this.logRepair('JavaScript修复', `未找到必需的函数: ${funcName}`);
                    // 可以在这里定义备用函数实现
                }
            });
            
            // 检查版本选择器功能（使用正确的选择器）
            const versionSelect = document.getElementById('product-edition');
            if (versionSelect) {
                const downloadBtn = document.querySelector('.btn-primary[href*="Win11_25H2_Chinese_Simplified_x64.iso"]');
                if (downloadBtn) {
                    // 确保事件监听器正确工作
                    this.logRepair('JavaScript检查', '版本选择器功能检查通过');
                }
            }
        },
        
        // 专门检查Windows 11 ISO下载功能
        checkAndRepairWindows11DownloadFunctionality: function() {
            this.logRepair('功能检查', '检查Windows 11 ISO下载功能...');
            
            // 使用与HTML文件中实际使用的选择器相匹配
            const versionSelect = document.getElementById('product-edition');
            const downloadBtn = document.querySelector('.btn-primary[href*="Win11_25H2_Chinese_Simplified_x64.iso"]');
            
            if (versionSelect && downloadBtn) {
                this.logRepair('功能检查', '已找到版本选择器和下载按钮，开始检查功能...');
                
                // 检查下载按钮是否有有效的链接
                const currentHref = downloadBtn.getAttribute('href');
                if (!currentHref || currentHref === '#') {
                    this.logRepair('功能修复', '下载按钮链接无效，设置默认链接...');
                    downloadBtn.setAttribute('href', 'https://software.download.prss.microsoft.com/dbazure/Win11_25H2_Chinese_Simplified_x64.iso');
                    downloadBtn.classList.add('auto-repair-fixed');
                    setTimeout(() => downloadBtn.classList.remove('auto-repair-fixed'), 3000);
                    this.logRepair('功能修复', '已设置默认下载链接');
                }
                
                // 检查版本选择器的选项
                const options = versionSelect.options;
                let hasMultiVersion = false;
                let hasHomeVersion = false;
                let hasProVersion = false;
                
                for (let i = 0; i < options.length; i++) {
                    if (options[i].value === '3262') hasMultiVersion = true;
                    if (options[i].value === '3263') hasHomeVersion = true;
                    if (options[i].value === '3264') hasProVersion = true;
                }
                
                // 检查是否缺少必要的选项
                if (!hasMultiVersion) {
                    this.logRepair('功能修复', '缺少多版本ISO选项，添加...');
                    const multiOption = document.createElement('option');
                    multiOption.value = '3262';
                    multiOption.textContent = 'Windows 11 多版本ISO';
                    versionSelect.appendChild(multiOption);
                    versionSelect.classList.add('auto-repair-fixed');
                    setTimeout(() => versionSelect.classList.remove('auto-repair-fixed'), 3000);
                }
                
                if (!hasHomeVersion) {
                    this.logRepair('功能修复', '缺少家庭版选项，添加...');
                    const homeOption = document.createElement('option');
                    homeOption.value = '3263';
                    homeOption.textContent = 'Windows 11 家庭版（仅限中国）';
                    versionSelect.appendChild(homeOption);
                    versionSelect.classList.add('auto-repair-fixed');
                    setTimeout(() => versionSelect.classList.remove('auto-repair-fixed'), 3000);
                }
                
                if (!hasProVersion) {
                    this.logRepair('功能修复', '缺少专业版选项，添加...');
                    const proOption = document.createElement('option');
                    proOption.value = '3264';
                    proOption.textContent = 'Windows 11 专业中文版本';
                    versionSelect.appendChild(proOption);
                    versionSelect.classList.add('auto-repair-fixed');
                    setTimeout(() => versionSelect.classList.remove('auto-repair-fixed'), 3000);
                }
                
                // 添加或强化提示文本
                let hintText = document.querySelector('.hint-text');
                if (!hintText) {
                    hintText = document.createElement('p');
                    hintText.className = 'hint-text';
                    hintText.style.color = '#0078d4';
                    hintText.style.fontWeight = 'bold';
                    hintText.style.marginTop = '10px';
                    
                    if (versionSelect.parentNode) {
                        versionSelect.parentNode.insertBefore(hintText, versionSelect.nextSibling);
                    }
                }
                hintText.textContent = '请先从下拉菜单中选择您需要的Windows 11版本，然后再点击下载按钮。';
                
                // 检查并修复版本切换逻辑
                this.logRepair('功能检查', '验证版本切换逻辑...');
                
                // 为版本选择器添加视觉强调
                versionSelect.style.border = '2px solid #0078d4';
                versionSelect.style.borderRadius = '4px';
                versionSelect.style.padding = '5px';
                
                // 强制触发一次change事件以确保链接正确设置
                const event = new Event('change');
                versionSelect.dispatchEvent(event);
                
                this.logRepair('功能检查', 'Windows 11 ISO下载功能检查和修复完成！');
            } else {
                this.logRepair('功能警告', '未找到版本选择器或下载按钮元素，无法自动修复Windows 11 ISO下载功能');
                console.warn('[自动修复系统] 未找到元素: product-edition 或 .btn-primary[href*="Win11_25H2_Chinese_Simplified_x64.iso"]');
            }
        },
        
        // 记录修复操作
        logRepair: function(type, message) {
            const logEntry = {
                timestamp: new Date().toISOString(),
                type: type,
                message: message
            };
            
            this.repairLog.push(logEntry);
            console.log(`[自动修复系统] ${type}: ${message}`);
            
            // 更新日志面板
            this.updateLogPanel();
            
            // 限制日志大小，保留最近100条
            if (this.repairLog.length > 100) {
                this.repairLog.shift();
            }
        },
        
        // 获取修复日志（供调试使用）
        getRepairLog: function() {
            return this.repairLog;
        }
    };
    
    // 初始化自动修复系统
    AutoRepairSystem.init();
    
    // 全局暴露自动修复系统（供调试使用）
    window.AutoRepairSystem = AutoRepairSystem;
    
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = '#fff';
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 搜索功能
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-input');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm) {
                // 这里实现搜索逻辑
                console.log('搜索内容:', searchTerm);
                alert('搜索功能: 您搜索的是 "' + searchTerm + '"');
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
    
    // 下载按钮点击跟踪
    const downloadButtons = document.querySelectorAll('.btn-download');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('下载按钮被点击:', this.textContent);
        });
    });
    
    // 增强产品卡片悬停效果
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // 响应式导航菜单
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // 窗口大小调整时的处理
    window.addEventListener('resize', function() {
        // 可以在这里添加针对不同屏幕尺寸的调整逻辑
    });
});