// 管理员白名单配置
const adminWhitelist = {
    admins: [
        {
            email: "admin@mculean.com",
            password: "admin123456", // 实际使用时应该使用加密后的密码
            role: "super_admin",
            name: "超级管理员"
        },
        {
            email: "cumtMLP123@163.com",
            password: "manager123456",
            role: "admin",
            name: "网站管理员"
        }
    ],
    
    // 验证管理员账号
    validateAdmin(email, password) {
        const admin = this.admins.find(admin => 
            admin.email === email && admin.password === password
        );
        return admin || null;
    },

    // 检查是否是管理员邮箱
    isAdminEmail(email) {
        return this.admins.some(admin => admin.email === email);
    },

    // 获取管理员信息
    getAdminInfo(email) {
        return this.admins.find(admin => admin.email === email) || null;
    }
};

// 防止直接修改白名单
Object.freeze(adminWhitelist.admins);
Object.freeze(adminWhitelist);

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = adminWhitelist;
} else {
    window.adminWhitelist = adminWhitelist;
} 