# 将网站部署到GitHub Pages

本指南将详细介绍如何将您的新媒体运营中心网站部署到GitHub Pages，以便在线测试和分享。

## 前提条件

1. 已安装Git
2. 拥有GitHub账号
3. 已创建一个新的GitHub仓库

## 部署步骤

### 1. 准备本地项目

首先，确保您的项目文件结构如下：

```
simple-website/
├── index.html          # 网站首页
├── hotspot.html        # 视频热点榜页面
├── materials.html      # 文案选题页面
├── about.html          # 枕朵介绍页面
├── admin.html          # 管理页面
├── js/                 # JavaScript文件目录
└── ...其他文件
```

### 2. 初始化Git仓库

如果您的项目尚未使用Git进行版本控制，请执行以下命令：

```bash
# 进入项目目录
cd /path/to/your/simple-website

# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交初始版本
git commit -m "Initial commit: 新媒体运营中心网站"
```

### 3. 连接到GitHub仓库

1. 在GitHub上创建一个新的仓库（例如：`new-media-center`）
2. 将本地仓库连接到GitHub仓库：

```bash
# 添加远程仓库
git remote add origin https://github.com/your-username/your-repo-name.git

# 验证远程连接
git remote -v
```

### 4. 部署到GitHub Pages

GitHub Pages支持两种部署方式：

#### 方式一：使用master/main分支部署

如果您希望使用主分支部署：

```bash
# 确保您在主分支
git checkout main  # 或 git checkout master

# 推送到GitHub
git push -u origin main
```

然后在GitHub仓库设置中：
1. 点击"Settings"
2. 滚动到"GitHub Pages"部分
3. 在"Source"下拉菜单中选择"main branch"
4. 点击"Save"

#### 方式二：使用gh-pages分支部署（推荐）

创建一个专门用于部署的分支：

```bash
# 创建并切换到gh-pages分支
git checkout -b gh-pages

# 推送到GitHub
git push -u origin gh-pages
```

然后在GitHub仓库设置中：
1. 点击"Settings"
2. 滚动到"GitHub Pages"部分
3. 在"Source"下拉菜单中选择"gh-pages branch"
4. 点击"Save"

### 5. 访问您的网站

部署完成后，您的网站将可以通过以下URL访问：
`https://your-username.github.io/your-repo-name/`

例如：`https://john-doe.github.io/new-media-center/`

## 6. 更新网站内容

当您需要更新网站内容时，只需：

```bash
# 1. 确保您在主分支
git checkout main  # 或 git checkout master

# 2. 编辑您的文件

# 3. 提交更改
git add .
git commit -m "Update website content"

# 4. 推送到GitHub
git push origin main

# 5. 如果使用gh-pages分支，需要合并更新
git checkout gh-pages
git merge main
git push origin gh-pages
```

## 7. 本地测试服务器（可选）

在部署前，您可以使用本地服务器测试网站：

### 使用Python简易服务器

```bash
# 进入项目目录
cd /path/to/your/simple-website

# 启动Python服务器
python -m http.server 8000
```

然后在浏览器中访问：`http://localhost:8000`

### 使用Node.js服务器

如果您安装了Node.js，可以使用：

```bash
# 安装http-server
npm install -g http-server

# 进入项目目录
cd /path/to/your/simple-website

# 启动服务器
http-server -p 8000
```

然后在浏览器中访问：`http://localhost:8000`

## 8. 自定义域名（可选）

如果您拥有自定义域名，可以将其绑定到GitHub Pages：

1. 在GitHub仓库根目录创建一个名为`CNAME`的文件，内容为您的域名：
   ```
   yourdomain.com
   ```

2. 提交并推送该文件

3. 在您的域名注册商处，添加DNS以下DNS记录：
   - A记录：指向GitHub Pages的IP地址（185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153）
   - CNAME记录：`www`指向`your-username.github.io`

## 常见问题

### 1. 页面加载后样式丢失

这通常是因为资源路径问题。确保您的CSS和JavaScript文件使用相对路径：

```html
<!-- 正确 -->
<link href="css/style.css" rel="stylesheet">
<script src="js/script.js"></script>

<!-- 错误 -->
<link href="/css/style.css" rel="stylesheet">
<script src="/js/script.js"></script>
```

### 2. 404错误

- 确保您的主页文件名为`index.html`
- 检查GitHub Pages设置是否正确
- 等待几分钟，部署可能需要时间生效

### 3. 部署成功但内容未更新

- 尝试清除浏览器缓存
- 检查您是否推送到了正确的分支
- 确认GitHub Pages设置中的源分支是否正确

## 自动化部署（高级）

对于频繁更新的项目，可以使用GitHub Actions实现自动化部署：

1. 在项目根目录创建`.github/workflows/deploy.yml`文件
2. 添加以下内容：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]  # 当主分支有推送时触发

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./  # 部署当前目录下的所有文件
```

3. 提交并推送该文件

现在，每次您推送到主分支时，GitHub Actions将自动部署您的网站到gh-pages分支。

## 总结

通过以上步骤，您可以轻松地将新媒体运营中心网站部署到GitHub Pages进行在线测试。GitHub Pages提供了免费的静态网站托管服务，非常适合前端项目的展示和测试。

如果您遇到任何问题，请参考GitHub Pages官方文档：https://docs.github.com/en/pages
