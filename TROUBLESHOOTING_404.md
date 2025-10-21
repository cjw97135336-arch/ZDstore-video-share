# GitHub Pages 404错误故障排除指南

当您在访问GitHub Pages网站时遇到"404 Not Found"错误，这意味着服务器无法找到您请求的页面。本指南将帮助您识别并解决常见的404错误原因。

## 常见原因及解决方案

### 1. GitHub Pages设置不正确

**检查步骤：**
1. 访问您的GitHub仓库
2. 点击"Settings"
3. 滚动到"GitHub Pages"部分

**可能的问题：**
- 未选择正确的部署分支
- 未选择正确的部署文件夹

**解决方案：**
- 确保选择了正确的分支（通常是`main`或`gh-pages`）
- 如果您的网站文件在子文件夹中（如`docs/`或`public/`），请在"Source"下拉菜单中选择该文件夹
- 点击"Save"保存设置

### 2. 资源路径问题

这是最常见的404错误原因，通常是由于CSS、JavaScript或图片文件的路径不正确导致的。

**检查步骤：**
1. 打开浏览器开发者工具（F12或Ctrl+Shift+I）
2. 查看"Console"标签，寻找404错误
3. 检查错误中显示的文件路径

**常见路径问题：**

**错误示例：**
```html
<!-- 绝对路径 - 在GitHub Pages上可能不工作 -->
<link href="/css/style.css" rel="stylesheet">
<script src="/js/script.js"></script>
<img src="/images/logo.png" alt="Logo">
```

**正确示例：**
```html
<!-- 相对路径 - 推荐使用 -->
<link href="css/style.css" rel="stylesheet">
<script src="js/script.js"></script>
<img src="images/logo.png" alt="Logo">
```

**修复方法：**
- 将所有绝对路径（以`/`开头）改为相对路径
- 确保路径与您的文件系统结构匹配

### 3. 主页文件名不正确

GitHub Pages默认寻找以下文件名作为主页：
- `index.html`
- `index.md`
- `README.md`

**解决方案：**
- 确保您的主页文件名为`index.html`
- 如果您使用其他文件名，需要在URL中明确指定，例如：`https://yourusername.github.io/yourrepo/home.html`

### 4. 部署分支问题

如果您使用`gh-pages`分支部署：

**检查步骤：**
1. 确认`gh-pages`分支是否存在：
   ```bash
   git branch
   ```
2. 如果不存在，创建并推送：
   ```bash
   git checkout -b gh-pages
   git push -u origin gh-pages
   ```

**可能的问题：**
- `gh-pages`分支没有最新的代码
- `gh-pages`分支中没有网站文件

**解决方案：**
```bash
# 切换到主分支
git checkout main

# 确保主分支是最新的
git pull origin main

# 切换到gh-pages分支
git checkout gh-pages

# 合并主分支的更新
git merge main

# 推送更新
git push origin gh-pages
```

### 5. 文件未提交或推送

**检查步骤：**
1. 检查本地更改是否已提交：
   ```bash
   git status
   ```
2. 如果有未提交的更改：
   ```bash
   git add .
   git commit -m "描述您的更改"
   ```
3. 推送更改到GitHub：
   ```bash
   git push origin main  # 或您正在使用的分支
   ```

### 6. 部署延迟

GitHub Pages部署可能需要一些时间才能生效，特别是在第一次部署或更改部署设置后。

**解决方案：**
- 等待5-10分钟后再尝试访问
- 清除浏览器缓存（Ctrl+Shift+R或Cmd+Shift+R）

### 7. 自定义域名问题

如果您使用自定义域名：

**检查步骤：**
1. 确保您的`CNAME`文件正确配置：
   - 文件必须位于仓库的根目录
   - 内容应为您的域名（例如：`yourdomain.com`）
   - 不要包含`www`或`http://`

2. 检查DNS设置：
   - A记录应指向GitHub Pages的IP地址：185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - CNAME记录（如果使用www）应指向`yourusername.github.io`

3. 检查GitHub Pages设置中的自定义域名是否正确配置

### 8. 子目录部署问题

如果您的网站部署在仓库的子目录中：

**解决方案：**
1. 在GitHub Pages设置中，选择"Source"为"main branch /docs folder"（或您的子目录名称）
2. 确保您的HTML文件中的路径考虑到子目录结构

### 9. HTML中的链接问题

**检查步骤：**
1. 检查页面中的所有链接是否正确
2. 特别注意导航菜单中的链接

**错误示例：**
```html
<a href="/about">关于我们</a>  <!-- 绝对路径可能导致404 -->
```

**正确示例：**
```html
<a href="about.html">关于我们</a>  <!-- 相对路径 -->
```

## 本地测试方法

在部署到GitHub Pages之前，建议先在本地测试您的网站：

### 使用Python简易服务器

```bash
# 进入项目目录
cd /path/to/your/simple-website

# 启动服务器
python -m http.server 8000
```

在浏览器中访问：`http://localhost:8000`

### 使用Node.js服务器

```bash
# 安装http-server（如果尚未安装）
npm install -g http-server

# 进入项目目录
cd /path/to/your/simple-website

# 启动服务器
http-server -p 8000
```

在浏览器中访问：`http://localhost:8000`

## 检查部署状态

您可以通过以下方式检查GitHub Pages的部署状态：

1. 访问您的GitHub仓库
2. 点击"Actions"标签
3. 查看最近的部署工作流是否成功

## 快速修复清单

1. [ ] 确认GitHub Pages设置正确（分支和文件夹）
2. [ ] 检查所有资源路径是否为相对路径
3. [ ] 确保主页文件名为`index.html`
4. [ ] 验证所有文件都已提交并推送到GitHub
5. [ ] 检查`gh-pages`分支是否存在且包含最新代码
6. [ ] 清除浏览器缓存后重试
7. [ ] 等待5-10分钟让部署生效
8. [ ] 如果使用自定义域名，检查CNAME文件和DNS设置

## 示例修复流程

假设您的网站结构如下：

```
simple-website/
├── index.html
├── about.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

**修复前的index.html：**
```html
<!DOCTYPE html>
<html>
<head>
    <link href="/css/style.css" rel="stylesheet">  <!-- 绝对路径 - 问题所在 -->
</head>
<body>
    <nav>
        <a href="/">首页</a>
        <a href="/about">关于我们</a>  <!-- 绝对路径 - 问题所在 -->
    </nav>
    
    <script src="/js/script.js"></script>  <!-- 绝对路径 - 问题所在 -->
</body>
</html>
```

**修复后的index.html：**
```html
<!DOCTYPE html>
<html>
<head>
    <link href="css/style.css" rel="stylesheet">  <!-- 相对路径 - 正确 -->
</head>
<body>
    <nav>
        <a href="index.html">首页</a>
        <a href="about.html">关于我们</a>  <!-- 相对路径 - 正确 -->
    </nav>
    
    <script src="js/script.js"></script>  <!-- 相对路径 - 正确 -->
</body>
</html>
```

## 进一步帮助

如果您尝试了以上所有步骤仍然遇到问题：

1. 检查GitHub Pages官方文档：https://docs.github.com/en/pages
2. 查看GitHub Pages部署日志：在仓库的"Settings" > "GitHub Pages" > "Deployments"中
3. 在GitHub社区寻求帮助：https://github.community/c/github-pages/46

请提供以下信息以获得更好的帮助：
- 您的GitHub仓库URL
- 您尝试访问的具体URL
- 浏览器开发者工具中显示的错误信息
- 您已经尝试过的解决方案
