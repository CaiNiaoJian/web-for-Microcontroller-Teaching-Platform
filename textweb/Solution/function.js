document.addEventListener('DOMContentLoaded', () => {
    const dynamicTextContainer = document.createElement('div');
    dynamicTextContainer.className = 'dynamic-text';

    const modules = [
        {
            name: '博客',
            description: '博客板块负责发布教学和演示的文章，未来甚至会包含视频内容。博客内容涵盖单片机的基础知识、项目案例、技术教程等，帮助用户快速掌握单片机技术。',
            features: [
                '详细的单片机教程和文档',
                '丰富的项目案例和代码示例',
                '实时更新的行业新闻和技术动态',
                '用户评论和互动功能'
            ]
        },
        {
            name: '论坛',
            description: '论坛板块类似于贴吧，访问者可以发布问题和讨论问题。论坛提供了一个开放的交流平台，用户可以在这里提问、分享经验、讨论技术问题，促进知识的交流和共享。',
            features: [
                '用户发帖和回帖功能',
                '问题分类和标签功能',
                '热门话题和推荐功能',
                '用户积分和等级系统'
            ]
        },
        {
            name: '管理者中心',
            description: '管理者中心负责网站的管理工作，包括审核和发布文章、删除或拉黑访问者、管理用户权限等。管理者中心确保网站内容的准确性和安全性，维护良好的社区环境。',
            features: [
                '文章审核和发布功能',
                '用户管理和权限设置',
                '内容管理和分类功能',
                '数据统计和分析功能'
            ]
        }
    ];

    modules.forEach(module => {
        const moduleElement = document.createElement('div');
        moduleElement.className = 'module';

        const moduleTitle = document.createElement('h3');
        moduleTitle.textContent = module.name;

        const moduleDescription = document.createElement('p');
        moduleDescription.textContent = module.description;

        const moduleFeatures = document.createElement('ul');
        module.features.forEach(feature => {
            const featureItem = document.createElement('li');
            featureItem.textContent = feature;
            moduleFeatures.appendChild(featureItem);
        });

        moduleElement.appendChild(moduleTitle);
        moduleElement.appendChild(moduleDescription);
        moduleElement.appendChild(moduleFeatures);

        dynamicTextContainer.appendChild(moduleElement);
    });

    const mainContent = document.querySelector('.main-content');
    mainContent.appendChild(dynamicTextContainer);
});