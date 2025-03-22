// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动功能
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
                
                // 添加活动导航项高亮效果
                document.querySelectorAll('nav a').forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // 导航栏滚动效果
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 添加滚动阴影效果
        if (scrollTop > 10) {
            nav.classList.add('nav-shadow');
        } else {
            nav.classList.remove('nav-shadow');
        }
        
        // 根据滚动位置高亮当前导航项
        highlightNavOnScroll();
        
        lastScrollTop = scrollTop;
    });
    
    // 根据滚动位置高亮导航项
    function highlightNavOnScroll() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('nav a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === current) {
                item.classList.add('active');
            }
        });
    }
    
    // 初始调用以设置初始活动导航项
    highlightNavOnScroll();
    
    // 添加卡片悬停效果
    const cards = document.querySelectorAll('.section-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('card-hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('card-hover');
        });
    });
    
    // 为联系方式添加复制功能
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('p').textContent.split('：')[1];
            navigator.clipboard.writeText(text)
                .then(() => {
                    // 创建并显示提示消息
                    const tooltip = document.createElement('div');
                    tooltip.className = 'copy-tooltip';
                    tooltip.textContent = '已复制到剪贴板';
                    this.appendChild(tooltip);
                    
                    // 动画显示并消失
                    setTimeout(() => {
                        tooltip.classList.add('show');
                        setTimeout(() => {
                            tooltip.classList.remove('show');
                            setTimeout(() => {
                                tooltip.remove();
                            }, 300);
                        }, 1500);
                    }, 10);
                })
                .catch(err => {
                    console.error('无法复制: ', err);
                });
        });
    });
}); 