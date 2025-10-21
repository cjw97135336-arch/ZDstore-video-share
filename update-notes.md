# 热点添加功能更新说明

## 更新内容

### 1. 新增字段
- **点赞数**：记录视频获得的点赞数量
- **评论数**：记录视频获得的评论数量  
- **收藏数**：记录视频被收藏的数量
- **分享数**：记录视频被分享的数量

### 2. 封面图片上传功能
- 将原有的"封面图片URL"输入框改为文件上传控件
- 添加了图片预览功能
- 图片以Base64编码格式存储在本地

### 3. 分类选项更新
- 更新分类选项为：
  - 家纺类
  - 家居类
  - IP类
  - 其他

### 4. 标签选项改进
- 添加了常用标签快速选择功能
- 保留了自定义标签输入功能
- 支持标签的添加和删除
- 已选标签可视化展示

## 数据结构变更

原数据结构：
```javascript
{
  id: "xxx",
  title: "xxx",
  description: "xxx",
  playCount: 12500,
  publishTime: "2023-07-20",
  videoUrl: "https://v.douyin.com/xxx/",
  coverImage: "https://example.com/image.jpg",
  category: "家纺",
  tags: ["家纺", "拍摄技巧", "引流"],
  isHot: true,
  createdAt: "2023-07-20T12:00:00Z",
  updatedAt: "2023-07-20T12:00:00Z"
}
```

更新后数据结构：
```javascript
{
  id: "xxx",
  title: "xxx",
  description: "xxx",
  playCount: 12500,
  likeCount: 3200,      // 新增
  commentCount: 450,    // 新增
  favoriteCount: 890,   // 新增
  shareCount: 210,      // 新增
  publishTime: "2023-07-20",
  videoUrl: "https://v.douyin.com/xxx/",
  coverImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...", // 改为Base64
  category: "家纺类",   // 更新分类值
  tags: ["家纺", "拍摄技巧", "引流"],
  isHot: true,
  createdAt: "2023-07-20T12:00:00Z",
  updatedAt: "2023-07-20T12:00:00Z"
}
```

## 使用说明

### 添加新热点
1. 点击"添加新热点"按钮
2. 填写基本信息（标题、描述、播放量等）
3. 填写互动数据（点赞数、评论数、收藏数、分享数）
4. 选择发布时间和视频链接
5. 上传封面图片（支持预览）
6. 选择分类（家纺类、家居类、IP类、其他）
7. 选择或输入标签
8. 点击"保存"按钮

### 编辑热点
1. 在数据列表中点击"编辑"按钮
2. 修改需要更新的信息
3. 如果需要更新封面图片，重新上传即可
4. 点击"保存"按钮

### 注意事项
- 封面图片上传后会转换为Base64编码存储
- 编辑模式下，封面图片显示预览，无需重新上传
- 标签支持通过预设标签点击添加或手动输入添加
- 所有新增字段在编辑模式下会显示原有数据

## 测试页面
可通过访问 `test-add.html` 页面测试新增功能是否正常工作。
