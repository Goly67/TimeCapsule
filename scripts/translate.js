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
    
    // Forgot password flow
    "forgot.title": "Forgot Password",
    "forgot.description": "Enter your email to receive a verification code",
    "forgot.emailLabel": "Email",
    "forgot.emailPlaceholder": "your@email.com",
    "forgot.sendCode": "Send Verification Code",
    "forgot.backToLogin": "Back to Login",
    "forgot.verifyTitle": "Verify Your Email",
    "forgot.verifyDescription": "Enter the 4-digit code sent to your email",
    "forgot.verificationLabel": "Verification Code",
    "forgot.verifyCode": "Verify Code",
    "forgot.back": "Back",
    "forgot.resetTitle": "Reset Your Password",
    "forgot.resetDescription": "Create a new password for your account",
    "forgot.newPasswordLabel": "New Password",
    "forgot.confirmPasswordLabel": "Confirm Password",
    "forgot.resetPassword": "Reset Password",
    
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
    "view.back": "Back to Home",
    "view.activeCapsules": "Your Active Capsules",
    "view.noCapsules": "No Capsules Yet",
    "view.noCapsulesSub": "You haven't created any time capsules yet.",
    "view.createFirst": "Create Your First Capsule",
    "view.createFirstCapsule": "Create Your First Capsule",
    "view.viewArchived": "View Archived Capsules",
    "view.status.sealed": "Sealed",
    "view.status.delivered": "Delivered",
    "view.sharedBy": "Shared with you by",
    "view.letter": "Letter",
    "view.photos": "Photos", 
    "view.video": "Video",
    "view.viewBtn": "View",
    "view.deleteBtn": "Delete",
    "view.archiveBtn": "Archive",
    "view.archived": "Archived",
    "view.created": "Created",
    "view.delivery": "Delivery",
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
    "footer.copyright": "© 2026 Time Capsule. All rights reserved.",
    
    // Messages
    "msg.success": "Success!",
    "msg.error": "Error",
    "msg.loading": "Loading capsule...",
    "msg.language": "Language",
    "msg.photoLimit": "You can only upload a maximum of 2 photos. Please remove some photos first or select fewer photos.",
    "msg.videoTooLarge": "Video file is too large. Please select a file smaller than 100MB.",
    "msg.loadFailed": "Failed to load your time capsules. Please try again later.",
    "msg.googleSignInFailed": "Google Sign In failed. Please check the console for details.",
    "msg.googleOAuthConfig": "Google OAuth is not properly configured. Please check the console for setup instructions.",
    "msg.uploadFailed": "Upload failed:",
    "msg.archivedLoadFailed": "Failed to load your archived capsules. Please try again later.",
    "msg.archiveSuccess": "Capsule archived successfully",
    "msg.archiveFailed": "Failed to archive capsule. Please try again later.",
    "msg.unarchiveSuccess": "Capsule unarchived successfully",
    "msg.unarchiveFailed": "Failed to unarchive capsule. Please try again later.",
    "msg.titleRequired": "Please provide a title and delivery date.",
    "msg.createSuccess": "Time Capsule created successfully!",
    "msg.createFailed": "Failed to create time capsule. Please try again.",
    "msg.deleteSuccess": "Time Capsule deleted successfully.",
    "msg.deleteFailed": "Failed to delete time capsule. Please try again later.",
    "msg.profileUpdateSuccess": "Profile updated successfully!",

    // Tutorial page
    "tutorial.logo": "Time Capsule",
    "tutorial.welcomeTitle": "Welcome to Time Capsule!",
    "tutorial.welcomeSubtitle": "Let's get you started with creating and managing your time capsules.",
    "tutorial.step1": "Welcome",
    "tutorial.step2": "Features",
    "tutorial.step3": "Get Started",
    "tutorial.cardTitle1": "Welcome to Your Time Capsule Journey",
    "tutorial.cardSubtitle1": "Time Capsule allows you to preserve memories today and rediscover them in the future.",
    "tutorial.card1Paragraph1": "Thank you for joining Time Capsule! We're excited to help you create meaningful digital time capsules that can be opened at a future date of your choosing.",
    "tutorial.card1Paragraph2": "With Time Capsule, you can:",
    "tutorial.card1Bullet1": "Write letters to your future self or loved ones",
    "tutorial.card1Bullet2": "Upload photos that capture special moments",
    "tutorial.card1Bullet3": "Record video messages to bring your memories to life",
    "tutorial.card1Bullet4": "Set a future date when your capsule will be \"delivered\"",
    "tutorial.card1Bullet5": "Share your capsules with friends and family",
    "tutorial.card1Paragraph3": "Let's walk through the key features to help you get started!",
    "tutorial.next": "Next",
    "tutorial.cardTitle2": "Key Features",
    "tutorial.cardSubtitle2": "Discover what you can do with Time Capsule.",
    "tutorial.featureLettersTitle": "Write Letters",
    "tutorial.featureLettersText": "Compose heartfelt messages to your future self or loved ones. Share your current thoughts, goals, and experiences that you want to remember years from now.",
    "tutorial.featurePhotosTitle": "Upload Photos",
    "tutorial.featurePhotosText": "Add images that capture special moments, people, or places. These visual memories will be preserved exactly as they are today for you to rediscover in the future.",
    "tutorial.featureVideosTitle": "Record Videos",
    "tutorial.featureVideosText": "Create video messages that bring your memories to life. Record yourself speaking directly to your future self or loved ones for a more personal connection across time.",
    "tutorial.back": "Back",
    "tutorial.cardTitle3": "Ready to Get Started?",
    "tutorial.cardSubtitle3": "You're all set to begin creating your first time capsule!",
    "tutorial.card3Paragraph1": "Now that you understand the basics of Time Capsule, you're ready to create your first capsule. Here's what to do next:",
    "tutorial.card3Bullet1": "Click the \"Create a Time Capsule\" button on the home page",
    "tutorial.card3Bullet2": "Give your capsule a title and choose a delivery date",
    "tutorial.card3Bullet3": "Add letters, photos, or videos to your capsule",
    "tutorial.card3Bullet4": "Submit your capsule to seal it until the delivery date",
    "tutorial.card3Bullet5": "Optionally, share your capsule with others",
    "tutorial.card3Paragraph2": "Your capsules will be stored securely and will be available to view after the delivery date you choose. You can always view your list of capsules from the \"View Your Capsules\" section.",
    "tutorial.card3Paragraph3": "Click \"Complete Tutorial\" below to go to the home page and start creating your first time capsule!",
    "tutorial.complete": "Complete Tutorial",
    // Home page
    "home.title": "Sealed Moments, Timeless Memories",
    "home.subtitle": "Preserve moments today, rediscover them tomorrow.",
    "home.createCapsule": "Create a Time Capsule",
    "home.viewCapsules": "View Recent Capsules",
    "home.viewArchived": "View Archived Capsules",
    "home.editProfile": "Edit Profile",
    "home.logout": "Logout",

    // Features
    "feature.letters": "Write Letters",
    "feature.lettersDesc": "Share your thoughts, feelings, and experiences with your future self or loved ones.",
    "feature.photos": "Upload Photos",
    "feature.photosDesc": "Preserve visual memories that capture special moments in your life.",
    "feature.videos": "Upload Videos",
    "feature.videosDesc": "Stay tuned for this! We are planning to add this soon.",

    // Create page
    "create.back": "Back to Home",
    "create.capsuleTitle": "Create Your Time Capsule",
    "create.messageLabel": "Your Message",
    "create.titleLabel": "Title",
    "create.titlePlaceholder": "My Time Capsule",
    "create.recipientLabel": "Recipients",
    "create.recipientPlaceholder": "Add recipients...",
    "create.recipientHelp": "Add people who can view this capsule after delivery",
    "create.deliveryLabel": "Delivery Date",
    "create.letterTab": "Letter",
    "create.photosTab": "Photos",
    "create.videoTab": "Video",
    "create.messagePlaceholder": "Write your message to the future...",
    "create.uploadPhotos": "Upload Photos",
    "create.uploadVideos": "Upload Videos",
    "create.selectPhotos": "Select Photos (Coming Soon)",
    "create.selectVideos": "Select Videos",
    "create.changeVideo": "Change Video",
    "create.removeVideo": "Remove Video",
    "create.submit": "Create Time Capsule",

    // View page
    "view.back": "Back to Home",
    "view.activeCapsules": "Your Active Capsules",
    "view.noCapsules": "No Capsules Yet",
    "view.noCapsulesSub": "You haven't created any time capsules yet.",
    "view.createFirstCapsule": "Create Your First Capsule",

    // Modal labels
    "modal.deleteTitle": "Delete Time Capsule",
    "modal.deleteMsg": "Are you sure you want to delete this time capsule? This action cannot be undone.",
    "modal.addRecipients": "Add Recipients",
    "modal.addRecipientsMsg": "Add people who can view this time capsule after the delivery date.",
    "modal.editProfile": "Edit Profile",
    "modal.profileInfo": "Your Profile",
    "modal.profileDesc": "Update your personal information",
    "modal.fullName": "Full Name",
    "modal.emailAddress": "Email Address",
    "modal.saveChanges": "Save Changes",
    "modal.closeHint": "You can close this by clicking outside.",
    "modal.cancel": "Cancel",
    "modal.delete": "Delete",
    "modal.addRecipients2": "Add Recipients",

    // Loading and beta banner
    "loading.title": "Preparing your experience...",
    "loading.subtext": "Just a moment — we’re waking things up (usually takes less than a minute)!",
    "beta.tag": "BETA",
    "beta.message": "We're still improving! Your feedback helps us make Time Capsule better.",

    // Notifications
    "notification.empty": "No notifications",
    "notification.title": "Notifications",
    "notification.clearAll": "Clear All",
    "notification.sharedTitle": "New Time Capsule Shared",
    "notification.sharedWith": "{userName} shared \"{title}\" with you",
    "notification.sealedUntil": "Sealed until {date}",
    "notification.sealedAlert": "This time capsule is sealed until {date}. Please check back then!",
    "notification.notAvailable": "This time capsule is not yet available to view.",
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
    
    // Forgot password flow
    "forgot.title": "忘记密码",
    "forgot.description": "输入您的电子邮件以接收验证码",
    "forgot.emailLabel": "电子邮件",
    "forgot.emailPlaceholder": "your@email.com",
    "forgot.sendCode": "发送验证码",
    "forgot.backToLogin": "返回登录",
    "forgot.verifyTitle": "验证您的电子邮件",
    "forgot.verifyDescription": "输入发送到您电子邮件的4位验证码",
    "forgot.verificationLabel": "验证码",
    "forgot.verifyCode": "验证验证码",
    "forgot.back": "返回",
    "forgot.resetTitle": "重置您的密码",
    "forgot.resetDescription": "为您的帐户创建新密码",
    "forgot.newPasswordLabel": "新密码",
    "forgot.confirmPasswordLabel": "确认密码",
    "forgot.resetPassword": "重置密码",
    
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
    "view.back": "返回首页",
    "view.activeCapsules": "您的活跃胶囊",
    "view.noCapsules": "还没有胶囊",
    "view.noCapsulesSub": "您还没有创建任何时间胶囊。",
    "view.createFirst": "创建您的第一个胶囊",
    "view.createFirstCapsule": "创建您的第一个胶囊",
    "view.viewArchived": "查看已存档的胶囊",
    "view.status.sealed": "已封存",
    "view.status.delivered": "已送达",
    "view.sharedBy": "由...分享给你",
    "view.letter": "信件",
    "view.photos": "照片",
    "view.video": "视频",
    "view.viewBtn": "查看",
    "view.deleteBtn": "删除",
    "view.archiveBtn": "存档",
    "view.archived": "已存档",
    "view.created": "创建于",
    "view.delivery": "送达日期",
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
    "footer.copyright": "© 2026 Time Capsule。版权所有。",
    
    // Messages
    "msg.success": "成功！",
    "msg.error": "错误",
    "msg.loading": "加载胶囊中...",
    "msg.language": "语言",
    "msg.photoLimit": "您最多只能上传2张照片。请先删除一些照片或选择更少的照片。",
    "msg.videoTooLarge": "视频文件太大。请选择小于100MB的文件。",
    "msg.loadFailed": "加载您的时间胶囊失败。请稍后再试。",
    "msg.googleSignInFailed": "Google 登录失败。请检查控制台以获取详细信息。",
    "msg.googleOAuthConfig": "Google OAuth 配置不正确。请检查控制台以获取设置说明。",
    "msg.uploadFailed": "上传失败：",
    "msg.archivedLoadFailed": "加载您的已存档胶囊失败。请稍后再试。",
    "msg.archiveSuccess": "胶囊已成功存档",
    "msg.archiveFailed": "存档胶囊失败。请稍后再试。",
    "msg.unarchiveSuccess": "胶囊已成功取消存档",
    "msg.unarchiveFailed": "取消存档胶囊失败。请稍后再试。",
    "msg.titleRequired": "请提供标题和送达日期。",
    "msg.createSuccess": "时间胶囊创建成功！",
    "msg.createFailed": "创建时间胶囊失败。请稍后再试。",
    "msg.deleteSuccess": "时间胶囊删除成功。",
    "msg.deleteFailed": "删除时间胶囊失败。请稍后再试。",
    "msg.profileUpdateSuccess": "个人资料更新成功！",

    // About page raw text
    "Back to Home": "返回首页",
    "About Us": "关于我们",
    "Time Capsule": "时间胶囊",
    "Time Capsule - About Us": "时间胶囊 - 关于我们",
    "Time Capsule - Terms of Service": "时间胶囊 - 服务条款",
    "Time Capsule - Please wait...": "时间胶囊 - 请稍候...",
    "Tutorial": "教程",
    "Welcome to Time Capsule! Learn more about the project and the developer behind it.": "欢迎来到时间胶囊！了解更多有关该项目和开发人员的信息。",
    "Hello! I'm a passionate high school student at STI College, currently learning web development and exploring the exciting world of programming.": "你好！我是 STI College 的一名充满热情的高中生，目前正在学习网页开发并探索令人兴奋的编程世界。",
    "Time Capsule is my personal project that I developed as part of my web development journey. The idea came from wanting to create something meaningful that helps people preserve their memories in a digital format.": "时间胶囊是我作为网页开发旅程的一部分开发的个人项目。这个想法来自于希望创建一个有意义的东西，帮助人们以数字形式保存他们的记忆。",
    "As a student developer, I'm constantly learning and improving my skills. This project represents my current abilities, and I'm excited to continue enhancing it as I grow as a developer.": "作为一名学生开发者，我不断学习和提升技能。这个项目代表了我目前的能力，我很高兴随着成长继续改进它。",
    "Skills & Technologies": "技能与技术",
    "Email": "电子邮件",
    "Phone": "电话",
    "Address": "地址",
    "Office Hours": "办公时间",
    "Monday - Friday: 11:00 AM - 3:00 PM": "周一至周五：上午11:00 - 下午3:00",
    "Saturday: 12:00 PM - 5:00 PM": "周六：中午12:00 - 下午5:00",
    "Sunday: Closed": "周日：休息",
    "Feel free to reach out with any questions or feedback about the Time Capsule project!": "如果您对时间胶囊项目有任何问题或反馈，请随时联系我们！",
    "Project Mission": "项目使命",
    "Time Capsule aims to provide a secure and intuitive way for people to preserve their memories digitally and share them with loved ones at a future date.": "时间胶囊旨在提供一种安全且直观的方式，让人们以数字形式保存记忆，并在将来的日期与所爱的人分享。",
    "Our goal is to create a platform that combines nostalgia with modern technology, allowing users to capture moments that matter and deliver them exactly when they want.": "我们的目标是创建一个将怀旧与现代技术结合的平台，让用户捕捉重要时刻，并在他们想要的时间准确地呈现这些时刻。",

    // Privacy & Security text
    "Privacy & Security": "隐私和安全",
    "At Time Capsule, we take your privacy and the security of your data seriously. This page outlines how we protect your information and the measures we've implemented to ensure your time capsules remain private and secure.": "在时间胶囊，我们非常重视您的隐私和数据安全。本页面概述了我们如何保护您的信息以及我们已实施的措施，以确保您的时间胶囊保持私密和安全。",
    "End-to-End Encryption": "端到端加密",
    "All time capsule content is encrypted using industry-standard encryption algorithms. This means that only you and your intended recipients can access the contents of your time capsules.": "所有时间胶囊内容均使用行业标准的加密算法进行加密。这意味着只有您和您指定的收件人可以访问时间胶囊的内容。",
    "Secure Storage": "安全存储",
    "Your time capsules are stored in secure, redundant cloud storage systems with multiple layers of protection. We implement regular security audits and updates to ensure your data remains safe.": "您的时间胶囊存储在安全、冗余的云存储系统中，具有多层保护。我们定期进行安全审核和更新，以确保您的数据保持安全。",
    "Access Control": "访问控制",
    "You have complete control over who can access your time capsules. Set specific delivery dates and recipients to ensure your memories are shared only with those you intend, when you intend.": "您可以完全控制谁可以访问您的时间胶囊。设置特定的送达日期和收件人，以确保您的记忆仅与您打算的人共享，并在您希望的时间共享。",
    "Data Privacy": "数据隐私",
    "We do not sell or share your personal information with third parties. Your time capsule content is private and will never be analyzed for advertising or other commercial purposes.": "我们不会将您的个人信息出售或分享给第三方。您的时间胶囊内容是私密的，绝不会用于广告或其他商业目的的分析。",
    "Privacy Policy": "隐私政策",
    "Information We Collect": "我们收集的信息",
    "We collect the following information to provide and improve our services:": "我们收集以下信息以提供和改进我们的服务：",
    "Account information (name, email address)": "账户信息（姓名，电子邮件地址）",
    "Time capsule content (text, photos, videos)": "时间胶囊内容（文本、照片、视频）",
    "Usage data (how you interact with our service)": "使用数据（您如何与我们的服务交互）",
    "Device information (browser type, operating system)": "设备信息（浏览器类型，操作系统）",
    "How We Use Your Information": "我们如何使用您的信息",
    "We use your information for the following purposes:": "我们出于以下目的使用您的信息：",
    "To provide and maintain our service": "提供和维护我们的服务",
    "To notify you about changes to our service": "通知您有关我们服务变更的信息",
    "To provide customer support": "提供客户支持",
    "To gather analysis or valuable information to improve our service": "收集分析或有价值的信息以改进我们的服务",
    "To detect, prevent, and address technical issues": "检测、预防并处理技术问题",
    "Data Retention": "数据保留",
    "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.": "我们仅在实现本隐私政策中概述的目的所必需的期限内保留您的个人信息。我们将在必要范围内保留和使用您的信息，以遵守法律义务、解决争议和执行我们的政策。",
    "Your Rights": "您的权利",
    "You have the following rights regarding your personal information:": "您对个人信息享有以下权利：",
    "The right to access your personal data": "访问您个人数据的权利",
    "The right to request correction of inaccurate data": "请求更正不准确数据的权利",
    "The right to request deletion of your data": "请求删除您的数据的权利",
    "The right to restrict or object to processing": "限制或反对处理的权利",
    "The right to data portability": "数据可携带性的权利",
    "Changes to This Policy": "本政策的变更",
    "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last Updated\" date.": "我们可能会不时更新隐私政策。我们将通过在此页面发布新的隐私政策并更新“最后更新”日期来通知您任何更改。",
    "Last Updated: April 20, 2026": "最后更新：2026年4月20日",

    // Terms page raw text
    "Terms of Service": "服务条款",
    "Welcome to Time Capsule. By using our service, you agree to these Terms of Service. Please read them carefully.": "欢迎来到时间胶囊。使用我们的服务即表示您同意这些服务条款。请仔细阅读。",
    "1. Acceptance of Terms": "1. 接受条款",
    "By accessing or using the Time Capsule service, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.": "访问或使用时间胶囊服务即表示您同意受这些服务条款和所有适用法律法规的约束。如果您不同意任何这些条款，则禁止您使用或访问本网站。",
    "2. Use of Service": "2. 服务使用",
    "Time Capsule provides a platform for creating and storing digital time capsules that can be accessed at a future date. You are responsible for all content you upload to our service.": "时间胶囊提供创建和存储数字时间胶囊的平台，这些胶囊可在将来访问。您对上传到我们服务的所有内容负责。",
    "2.1 Account Registration": "2.1 账户注册",
    "To use certain features of the service, you must register for an account. You agree to provide accurate and complete information during the registration process and to update such information to keep it accurate and current.": "要使用服务的某些功能，您必须注册一个账户。您同意在注册过程中提供准确完整的信息，并更新该信息以保持其准确和最新。",
    "2.2 Account Security": "2.2 账户安全",
    "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.": "您负责维护账户凭证的机密性，并对您账户下发生的所有活动负责。您同意立即通知我们任何未经授权的账户使用。",
    "3. User Content": "3. 用户内容",
    "You retain all rights to the content you upload to Time Capsule. By uploading content, you grant us a non-exclusive, worldwide, royalty-free license to use, store, and display your content for the purpose of providing the Time Capsule service.": "您保留上传到时间胶囊的内容的所有权利。通过上传内容，您授予我们非独占的全球范围内免版税的许可，以使用、存储和展示您的内容，以提供时间胶囊服务。",
    "3.1 Prohibited Content": "3.1 禁止内容",
    "You agree not to upload content that:": "您同意不上传以下内容：",
    "Violates any applicable law or regulation": "违反任何适用法律或法规",
    "Infringes on the intellectual property rights of others": "侵犯他人知识产权",
    "Contains malicious code or software": "包含恶意代码或软件",
    "Is harmful, abusive, defamatory, or obscene": "有害、辱骂、诽谤或淫秽",
    "Constitutes unsolicited commercial communications": "构成未经请求的商业通信",
    "4. Service Modifications": "4. 服务修改",
    "We reserve the right to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice. We shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the service.": "我们保留修改或暂停、临时或永久终止服务（或其任何部分）的权利，恕不另行通知。对于服务的任何修改、中断或终止，我们不对您或任何第三方承担责任。",
    "5. Termination": "5. 终止",
    "We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms of Service.": "我们可能会立即终止或暂停您的账户和对服务的访问，恕不另行通知或承担责任，原因包括但不限于您违反这些服务条款。",
    "6. Limitation of Liability": "6. 责任限制",
    "In no event shall Time Capsule, its officers, directors, employees, or agents, be liable to you for any direct, indirect, incidental, special, punitive, or consequential damages whatsoever resulting from any:": "在任何情况下，时间胶囊及其高级职员、董事、员工或代理人均不对您因以下任何情况导致的任何直接、间接、附带、特殊、惩罚性或后果性损害承担责任：",
    "Errors, mistakes, or inaccuracies of content": "内容错误、失误或不准确",
    "Personal injury or property damage of any nature": "任何形式的人身伤害或财产损失",
    "Unauthorized access to or use of our servers and/or any personal information stored therein": "未经授权访问或使用我们的服务器和/或其中存储的任何个人信息",
    "Interruption or cessation of transmission to or from our service": "我们的服务传输中断或停止",
    "Bugs, viruses, trojan horses, or the like that may be transmitted to or through our service": "可能通过我们的服务传输的漏洞、病毒、特洛伊木马或类似威胁",
    "7. Governing Law": "7. 适用法律",
    "These Terms shall be governed and construed in accordance with the laws, without regard to its conflict of law provisions.": "这些条款应受法律管辖并按其解释，但不考虑其冲突法规定。",
    "8. Changes to Terms": "8. 条款变更",
    "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes to these Terms by posting the new Terms on this page and updating the \"Last Updated\" date.": "我们保留自行决定随时修改或替换这些条款的权利。我们将通过在此页面发布新的条款并更新“最后更新”日期来通知您任何重大更改。",
    "Last Updated: April 20, 2026": "最后更新：2026年4月20日",

    // Build page raw text
    "BETA": "测试版",
    "We're still improving! Your feedback helps us make Time Capsule better.": "我们仍在改进中！您的反馈有助于我们让时间胶囊变得更好。",
    "Server cleaning": "服务器清理",
    "We're working hard to bring you an amazing experience for preserving your memories. The Time Capsule will be ready soon!": "我们正在努力为您带来出色的记忆保存体验。时间胶囊很快就会准备好！",
    "Days": "天",
    "Hours": "小时",
    "Minutes": "分钟",
    "Seconds": "秒",
    "I assure you your capsule's is safe with us! We keep it in a private locker so no goons will grab it from you!": "我向您保证，您的胶囊在我们这里是安全的！我们将其存放在一个私人储物柜中，因此没有人会抢走它！",
    "Have questions? Contact us at forestparty223@gmail.com": "如有疑问，请通过 forestparty223@gmail.com 与我们联系",

    // Footer raw text
    "Privacy & Security": "隐私和安全",
    "Terms of Service": "服务条款",
    "About Us": "关于我们",

    // Messages
    "msg.success": "成功！",
    "msg.error": "错误",
    "msg.loading": "加载胶囊中...",
    "msg.language": "语言",

    // Tutorial page
    "tutorial.logo": "时间胶囊",
    "tutorial.welcomeTitle": "欢迎使用时间胶囊！",
    "tutorial.welcomeSubtitle": "让我们帮助您开始创建和管理您的时间胶囊。",
    "tutorial.step1": "欢迎",
    "tutorial.step2": "功能",
    "tutorial.step3": "开始",
    "tutorial.cardTitle1": "欢迎来到您的时间胶囊之旅",
    "tutorial.cardSubtitle1": "时间胶囊允许您今天保存记忆，并在将来重新发现它们。",
    "tutorial.card1Paragraph1": "感谢您加入时间胶囊！我们很高兴帮助您创建有意义的数字时间胶囊，这些胶囊可以在您选择的将来日期打开。",
    "tutorial.card1Paragraph2": "使用时间胶囊，您可以：",
    "tutorial.card1Bullet1": "写信给未来的自己或亲人",
    "tutorial.card1Bullet2": "上传捕捉特殊瞬间的照片",
    "tutorial.card1Bullet3": "记录视频消息，让您的记忆栩栩如生",
    "tutorial.card1Bullet4": "设置胶囊将在将来“交付”的日期",
    "tutorial.card1Bullet5": "与朋友和家人分享您的胶囊",
    "tutorial.card1Paragraph3": "让我们浏览关键功能，帮助您开始使用！",
    "tutorial.next": "下一步",
    "tutorial.cardTitle2": "关键功能",
    "tutorial.cardSubtitle2": "发现您可以使用时间胶囊做什么。",
    "tutorial.featureLettersTitle": "写信",
    "tutorial.featureLettersText": "为未来的自己或亲人撰写真挚的信息。分享您当前的想法、目标和希望多年后记住的经历。",
    "tutorial.featurePhotosTitle": "上传照片",
    "tutorial.featurePhotosText": "添加记录特殊时刻、人物或地点的图像。您可以今天保存这些视觉记忆，并在将来重新发现它们。",
    "tutorial.featureVideosTitle": "录制视频",
    "tutorial.featureVideosText": "创建视频信息，让您的记忆栩栩如生。录制您自己直接对未来的自己或亲人说话，以获得更加个性化的跨时代联系。",
    "tutorial.back": "返回",
    "tutorial.cardTitle3": "准备开始了吗？",
    "tutorial.cardSubtitle3": "您已准备好开始创建第一个时间胶囊！",
    "tutorial.card3Paragraph1": "现在您已经了解了时间胶囊的基础知识，就可以开始创建第一个胶囊。接下来该怎么做：",
    "tutorial.card3Bullet1": "单击首页上的“创建时间胶囊”按钮",
    "tutorial.card3Bullet2": "为胶囊命名并选择一个送达日期",
    "tutorial.card3Bullet3": "向胶囊添加信件、照片或视频",
    "tutorial.card3Bullet4": "提交您的胶囊，以便在送达日期之前封存",
    "tutorial.card3Bullet5": "可选地与他人分享您的胶囊",
    "tutorial.card3Paragraph2": "您的胶囊将安全存储，并将在您选择的送达日期后可供查看。您始终可以从“查看您的胶囊”部分查看胶囊列表。",
    "tutorial.card3Paragraph3": "单击下面的“完成教程”按钮，返回主页并开始创建您的第一个时间胶囊！",
    "tutorial.complete": "完成教程",

    // Home page
    "home.title": "密封时刻，永恒回忆",
    "home.subtitle": "今天保存时刻，明天重新发现。",
    "home.createCapsule": "创建时间胶囊",
    "home.viewCapsules": "查看最近的胶囊",
    "home.viewArchived": "查看已存档的胶囊",
    "home.editProfile": "编辑个人资料",
    "home.logout": "登出",
    
    // Features
    "feature.letters": "写信",
    "feature.lettersDesc": "与未来的自己或亲人分享您的想法、感受和经历。",
    "feature.photos": "上传照片",
    "feature.photosDesc": "保存捕捉生活中特殊时刻的视觉记忆。",
    "feature.videos": "上传视频",
    "feature.videosDesc": "敬请期待！我们计划很快添加此功能。",
    
    // Create page
    "create.back": "返回首页",
    "create.capsuleTitle": "创建您的时间胶囊",
    "create.titleLabel": "标题",
    "create.titlePlaceholder": "我的时间胶囊",
    "create.messageLabel": "您的信息",
    "create.recipientLabel": "收件人",
    "create.recipientPlaceholder": "添加收件人...",
    "create.recipientHelp": "添加在送达后可以查看此胶囊的人",
    "create.deliveryLabel": "送达日期",
    "create.letterTab": "信",
    "create.photosTab": "照片",
    "create.videoTab": "视频",
    "create.messagePlaceholder": "写下您对未来的消息...",
    "create.uploadPhotos": "上传照片",
    "create.uploadVideos": "上传视频",
    "create.selectPhotos": "选择照片（即将推出）",
    "create.selectVideos": "选择视频",
    "create.changeVideo": "更改视频",
    "create.removeVideo": "移除视频",
    "create.submit": "创建时间胶囊",
    
    // View page
    "view.back": "返回首页",
    "view.activeCapsules": "您的活跃胶囊",
    "view.noCapsules": "还没有胶囊",
    "view.noCapsulesSub": "您还没有创建任何时间胶囊。",
    "view.createFirstCapsule": "创建您的第一个胶囊",
    
    // Modals
    "modal.deleteTitle": "删除时间胶囊",
    "modal.deleteMsg": "您确定要删除此时间胶囊吗？此操作无法撤销。",
    "modal.addRecipients": "添加收件人",
    "modal.addRecipientsMsg": "添加在送达日期后可以查看此时间胶囊的人。",
    "modal.editProfile": "编辑个人资料",
    "modal.profileInfo": "您的个人资料",
    "modal.profileDesc": "更新您的个人信息",
    "modal.fullName": "姓名",
    "modal.emailAddress": "电子邮件地址",
    "modal.saveChanges": "保存更改",
    "modal.closeHint": "您可以点击外部关闭此窗口。",
    "modal.cancel": "取消",
    "modal.delete": "删除",
    "modal.addRecipients2": "添加收件人",

    // Notifications
    "notification.empty": "无通知",
    "notification.title": "通知",
    "notification.clearAll": "清除所有",
    "notification.sharedTitle": "新的时间胶囊已共享",
    "notification.sharedWith": "{userName} 已与您共享“{title}”",
    "notification.sealedUntil": "封存至 {date}",
    "notification.sealedAlert": "此时间胶囊已封存至 {date}。请稍后再查看！",
    "notification.notAvailable": "此时间胶囊尚无法查看。",
  }
};

class TranslationManager {
  constructor() {
    this.currentLanguage = localStorage.getItem('preferredLanguage') || 'en';
    this.languageChangeListeners = [];
    // Wait for DOM to be ready before applying language
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeLanguage());
    } else {
      // DOM is already loaded, initialize immediately
      Promise.resolve().then(() => this.initializeLanguage());
    }
  }

  initializeLanguage() {
    // Apply the saved language preference
    this.applyLanguage();
    // Update language buttons after a small delay to ensure DOM is ready
    Promise.resolve().then(() => this.updateLanguageButtons());
  }
  
  t(key, replacements = {}) {
    const languagePack = translations[this.currentLanguage] || translations.en;
    let translation = key;

    if (languagePack && Object.prototype.hasOwnProperty.call(languagePack, key)) {
      translation = languagePack[key];
    } else if (translations.en && Object.prototype.hasOwnProperty.call(translations.en, key)) {
      translation = translations.en[key];
    } else {
      translation = key;
    }

    if (replacements && typeof replacements === 'object') {
      Object.keys(replacements).forEach((replacementKey) => {
        const replacementValue = replacements[replacementKey];
        translation = translation.replace(new RegExp(`\\{${replacementKey}\\}`, 'g'), replacementValue);
      });
    }

    return translation;
  }
  
  setLanguage(lang) {
    if (lang === 'en' || lang === 'zh') {
      this.currentLanguage = lang;
      localStorage.setItem('preferredLanguage', lang);
      // Apply translation immediately
      this.applyLanguage();
      // Update language buttons
      this.updateLanguageButtons();
      // Notify listeners
      this.languageChangeListeners.forEach(listener => listener(lang));
      // Reload page to ensure all content is properly translated
      // This ensures dynamic content, scripts, and all text is translated correctly
      setTimeout(() => window.location.reload(), 100);
    }
  }

  addLanguageChangeListener(callback) {
    this.languageChangeListeners.push(callback);
  }
  
  getLanguage() {
    return this.currentLanguage;
  }
  
  applyLanguage() {
    document.documentElement.lang = this.currentLanguage;
    // Update page title if it has a translation
    const currentTitle = document.title.trim();
    const translatedTitle = this.t(currentTitle);
    if (translatedTitle !== currentTitle) {
      document.title = translatedTitle;
    }
    this.translateElements();
  }

  updateLanguageButtons() {
    try {
      const lang = this.currentLanguage;
      const langENBtn = document.getElementById('langEN');
      const langZHBtn = document.getElementById('langZH');
      
      if (langENBtn) {
        langENBtn.classList.toggle('active', lang === 'en');
      }
      if (langZHBtn) {
        langZHBtn.classList.toggle('active', lang === 'zh');
      }
    } catch (e) {
      // Silently fail if buttons don't exist
    }
  }
  
  translateElements() {
    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);
      
      // Only update if there are child elements (like links)
      if (element.children.length > 0) {
        // For elements with children, we need to be more careful
        let hasFoundText = false;
        for (let i = 0; i < element.childNodes.length; i++) {
          const node = element.childNodes[i];
          if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
            node.nodeValue = translation;
            hasFoundText = true;
            break;
          }
        }
        if (!hasFoundText) {
          // If no text node found, set as text content
          element.textContent = translation;
        }
      } else {
        // For simple elements, just set text content
        element.textContent = translation;
      }
    });
    
    // Translate input placeholders
    document.querySelectorAll('input[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      element.placeholder = this.t(key);
    });
    
    // Translate textarea placeholders
    document.querySelectorAll('textarea[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      element.placeholder = this.t(key);
    });

    // Translate plain text nodes for static pages without explicit data-i18n annotations
    this.translateTextNodes(document.body);
  }

  translateTextNodes(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: node => {
        const text = node.nodeValue.trim();
        if (!text) return NodeFilter.FILTER_REJECT;
        const parentTag = node.parentElement?.tagName;
        if (!parentTag) return NodeFilter.FILTER_REJECT;
        if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'HEAD', 'TITLE'].includes(parentTag)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach(node => {
      const originalText = node.nodeValue.trim();
      const normalizedText = originalText.replace(/\s+/g, ' ');
      const translation = this.t(normalizedText);
      if (translation && translation !== normalizedText) {
        node.nodeValue = node.nodeValue.replace(originalText, translation);
      }
    });
  }
}

// Initialize translation manager
window.translationManager = new TranslationManager();

// Expose translation function globally
window.t = (key, replacements) => window.translationManager.t(key, replacements);
