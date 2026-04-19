// Translation system for Time Capsule app
const translations = {
  en: {
    // App name
    "app.name": "Time Capsule",
    
    // Common navigation
    "nav.home": "Home",
    "nav.create": "Create",
    "nav.view": "View",
    "nav.logout": "Logout",
    "nav.profile": "Profile",
    "nav.settings": "Settings",
    
    // Auth pages
    "auth.login": "Log In",
    "auth.signup": "Create Account",
    "auth.email": "Email (Optional)",
    "auth.username": "Username",
    "auth.password": "Password",
    "auth.name": "Full Name",
    "auth.confirmPassword": "Confirm Password",
    "auth.createAccount": "Create Account",
    "auth.signIn": "Sign In",
    "auth.forgotPassword": "Forgot Password?",
    "auth.noAccount": "Don't have an account?",
    "auth.haveAccount": "Already have an account?",
    "auth.emailOrUsername": "Email or Username",
    "auth.passwordReq": "At least 8 characters",
    "auth.uppercaseReq": "At least 1 uppercase letter",
    "auth.numberReq": "At least 1 number",
    "auth.agreeTerms": "I agree to the Terms of Service and Privacy Policy",
    "auth.alreadyHaveAccount": "Already have an account?",
    "auth.signUpNow": "Sign Up Now",
    
    // Create capsule
    "create.title": "Create Time Capsule",
    "create.capsuleName": "Capsule Name",
    "create.message": "Message",
    "create.deliveryDate": "Delivery Date",
    "create.recipients": "Add Recipients",
    "create.photos": "Upload Photos",
    "create.videos": "Upload Videos",
    "create.submit": "Create Capsule",
    "create.comingSoon": "Coming Soon",
    "create.selectPhotos": "Select Photos (Coming Soon)",
    "create.selectVideos": "Select Videos",
    "create.dragDrop": "Drag and drop your videos here, or click to select files",
    
    // Capsule view
    "view.title": "My Capsules",
    "view.noCapsules": "No Active Capsules Yet",
    "view.createFirst": "Create Your First Capsule",
    "view.viewArchived": "View Archived Capsules",
    "view.status.sealed": "Sealed",
    "view.status.delivered": "Delivered",
    "view.created": "Created",
    "view.delivery": "Delivery",
    "view.viewBtn": "View",
    "view.deleteBtn": "Delete",
    "view.archiveBtn": "Archive",
    "view.unarchiveBtn": "Unarchive",
    
    // Buttons
    "btn.save": "Save",
    "btn.cancel": "Cancel",
    "btn.delete": "Delete",
    "btn.edit": "Edit",
    "btn.close": "Close",
    "btn.loading": "Loading...",
    
    // Footer
    "footer.privacy": "Privacy & Security",
    "footer.terms": "Terms of Service",
    "footer.about": "About Us",
    "footer.copyright": "© 2025 Time Capsule. All rights reserved.",
    
    // Messages
    "msg.success": "Success!",
    "msg.error": "Error",
    "msg.loading": "Loading capsule...",
    "msg.language": "Language",
  },
  zh: {
    // App name
    "app.name": "时间胶囊",
    
    // Common navigation
    "nav.home": "主页",
    "nav.create": "创建",
    "nav.view": "查看",
    "nav.logout": "登出",
    "nav.profile": "个人资料",
    "nav.settings": "设置",
    
    // Auth pages
    "auth.login": "登录",
    "auth.signup": "创建账户",
    "auth.email": "邮箱（可选）",
    "auth.username": "用户名",
    "auth.password": "密码",
    "auth.name": "姓名",
    "auth.confirmPassword": "确认密码",
    "auth.createAccount": "创建账户",
    "auth.signIn": "登录",
    "auth.forgotPassword": "忘记密码？",
    "auth.noAccount": "还没有账户？",
    "auth.haveAccount": "已有账户？",
    "auth.emailOrUsername": "邮箱或用户名",
    "auth.passwordReq": "至少8个字符",
    "auth.uppercaseReq": "至少1个大写字母",
    "auth.numberReq": "至少1个数字",
    "auth.agreeTerms": "我同意服务条款和隐私政策",
    "auth.alreadyHaveAccount": "已有账户？",
    "auth.signUpNow": "立即注册",
    
    // Create capsule
    "create.title": "创建时间胶囊",
    "create.capsuleName": "胶囊名称",
    "create.message": "消息",
    "create.deliveryDate": "送达日期",
    "create.recipients": "添加收件人",
    "create.photos": "上传照片",
    "create.videos": "上传视频",
    "create.submit": "创建胶囊",
    "create.comingSoon": "即将推出",
    "create.selectPhotos": "选择照片（即将推出）",
    "create.selectVideos": "选择视频",
    "create.dragDrop": "将视频拖放到此处，或点击选择文件",
    
    // Capsule view
    "view.title": "我的胶囊",
    "view.noCapsules": "还没有活跃的胶囊",
    "view.createFirst": "创建您的第一个胶囊",
    "view.viewArchived": "查看已存档的胶囊",
    "view.status.sealed": "已封存",
    "view.status.delivered": "已送达",
    "view.created": "创建于",
    "view.delivery": "送达",
    "view.viewBtn": "查看",
    "view.deleteBtn": "删除",
    "view.archiveBtn": "存档",
    "view.unarchiveBtn": "取消存档",
    
    // Buttons
    "btn.save": "保存",
    "btn.cancel": "取消",
    "btn.delete": "删除",
    "btn.edit": "编辑",
    "btn.close": "关闭",
    "btn.loading": "加载中...",
    
    // Footer
    "footer.privacy": "隐私和安全",
    "footer.terms": "服务条款",
    "footer.about": "关于我们",
    "footer.copyright": "© 2025 Time Capsule。版权所有。",
    
    // Messages
    "msg.success": "成功！",
    "msg.error": "错误",
    "msg.loading": "加载胶囊中...",
    "msg.language": "语言",
  }
};

class TranslationManager {
  constructor() {
    this.currentLanguage = localStorage.getItem('preferredLanguage') || 'en';
    // Wait for DOM to be ready before applying language
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.applyLanguage());
    } else {
      this.applyLanguage();
    }
  }
  
  t(key) {
    const parts = key.split('.');
    let current = translations[this.currentLanguage] || translations.en;
    
    for (let part of parts) {
      if (current && typeof current === 'object') {
        current = current[part];
      } else {
        current = null;
        break;
      }
    }
    
    return current || translations.en[key] || key;
  }
  
  setLanguage(lang) {
    if (lang === 'en' || lang === 'zh') {
      this.currentLanguage = lang;
      localStorage.setItem('preferredLanguage', lang);
      // Apply translation immediately
      this.applyLanguage();
      // Reload page to ensure all content is properly translated
      setTimeout(() => window.location.reload(), 100);
    }
  }
  
  getLanguage() {
    return this.currentLanguage;
  }
  
  applyLanguage() {
    document.documentElement.lang = this.currentLanguage;
    this.translateElements();
  }
  
  translateElements() {
    // Translate all elements with data-i18n attribute
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    
    elementsToTranslate.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);
      
      // Check if element has child elements with their own data-i18n attributes
      const hasChildWithI18n = element.querySelector('[data-i18n]') !== null;
      
      if (hasChildWithI18n) {
        // If child has its own translation, don't replace entire element
        // Just replace the text nodes before the first child with data-i18n
        const childNodes = Array.from(element.childNodes);
        for (let node of childNodes) {
          if (node.nodeType === Node.TEXT_NODE) {
            const trimmedText = node.textContent.trim();
            if (trimmedText.length > 0) {
              node.textContent = translation;
              break;
            }
          } else if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute('data-i18n')) {
            // Found child with i18n, stop here
            break;
          }
        }
      } else {
        // No child with i18n, safe to replace or translate entirely
        const childNodes = Array.from(element.childNodes);
        let textNodeFound = false;
        
        // Try to find and replace text nodes
        for (let i = 0; i < childNodes.length; i++) {
          const node = childNodes[i];
          if (node.nodeType === Node.TEXT_NODE) {
            const trimmedText = node.textContent.trim();
            // If this text node has actual content (not just whitespace), replace it
            if (trimmedText.length > 0) {
              node.textContent = translation;
              textNodeFound = true;
              break;
            }
          }
        }
        
        // If no text node found and element has no children, set textContent
        if (!textNodeFound && element.children.length === 0) {
          element.textContent = translation;
        } else if (!textNodeFound && element.children.length > 0) {
          // Has children but no text node, need to add the translation
          // This handles cases like SVG + text that needs to be added
          const textNode = document.createTextNode(translation);
          element.appendChild(textNode);
        }
      }
    });
    
    // Translate input placeholders
    document.querySelectorAll('input[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      element.setAttribute('placeholder', this.t(key));
    });
    
    // Translate button text
    document.querySelectorAll('button[data-i18n-text]').forEach(element => {
      const key = element.getAttribute('data-i18n-text');
      element.textContent = this.t(key);
    });
  }
}

// Initialize translation manager
window.translationManager = new TranslationManager();

// Re-apply translation when DOM is fully loaded (safety measure)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => window.translationManager.applyLanguage(), 50);
  });
} else {
  setTimeout(() => window.translationManager.applyLanguage(), 50);
}

// Expose translation function globally
window.t = (key) => window.translationManager.t(key);
