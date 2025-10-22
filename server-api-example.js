/**
 * 服务器API接口示例
 * 用于演示如何实现本地存储数据与服务器数据的互通
 * 实际项目中应根据具体后端技术栈进行实现
 */

// 模拟服务器数据存储
let serverData = [];

// 模拟服务器API接口
const ServerAPI = {
  /**
   * 获取所有热点数据
   */
  getAllHotspots: async function() {
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 返回服务器数据的副本，避免直接修改
    return JSON.parse(JSON.stringify(serverData));
  },
  
  /**
   * 根据ID获取热点数据
   * @param {string} id - 热点ID
   */
  getHotspotById: async function(id) {
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const data = serverData.find(item => item.id === id);
    return data ? JSON.parse(JSON.stringify(data)) : null;
  },
  
  /**
   * 添加新热点数据
   * @param {object} hotspot - 热点数据
   */
  addHotspot: async function(hotspot) {
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 生成唯一ID（实际项目中应由服务器生成）
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    
    // 添加时间戳
    const newHotspot = {
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...hotspot
    };
    
    // 保存到服务器
    serverData.push(newHotspot);
    
    // 返回新创建的数据
    return JSON.parse(JSON.stringify(newHotspot));
  },
  
  /**
   * 更新热点数据
   * @param {string} id - 热点ID
   * @param {object} updatedData - 更新的数据
   */
  updateHotspot: async function(id, updatedData) {
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 查找要更新的数据
    const index = serverData.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('未找到热点数据');
    }
    
    // 合并数据
    serverData[index] = {
      ...serverData[index],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    
    // 返回更新后的数据
    return JSON.parse(JSON.stringify(serverData[index]));
  },
  
  /**
   * 删除热点数据
   * @param {string} id - 热点ID
   */
  deleteHotspot: async function(id) {
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 查找并删除数据
    const initialLength = serverData.length;
    serverData = serverData.filter(item => item.id !== id);
    
    // 返回删除结果
    return serverData.length < initialLength;
  },
  
  /**
   * 同步数据（增量同步）
   * @param {object} syncData - 同步数据，包含最后同步时间和本地变更
   */
  syncData: async function(syncData) {
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const { lastSyncTime, localChanges } = syncData;
    
    // 获取服务器端的增量更新（最后同步时间之后的变更）
    const serverChanges = serverData.filter(item => 
      new Date(item.updatedAt) > new Date(lastSyncTime)
    );
    
    // 应用本地变更到服务器
    for (const change of localChanges) {
      switch (change.type) {
        case 'add':
          await this.addHotspot(change.data);
          break;
        case 'update':
          await this.updateHotspot(change.id, change.data);
          break;
        case 'delete':
          await this.deleteHotspot(change.id);
          break;
      }
    }
    
    // 获取更新后的完整数据
    const updatedData = await this.getAllHotspots();
    
    // 返回同步结果
    return {
      success: true,
      serverChanges,
      updatedData,
      lastSyncTime: new Date().toISOString()
    };
  },
  
  /**
   * 导入数据（批量导入）
   * @param {array} data - 要导入的数据数组
   */
  importData: async function(data) {
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!Array.isArray(data)) {
      throw new Error('无效的数据格式');
    }
    
    // 验证数据格式
    const validData = data.filter(item => item.id && item.title);
    
    // 导入数据
    serverData = validData;
    
    // 返回导入结果
    return {
      success: true,
      importedCount: validData.length,
      totalCount: serverData.length
    };
  }
};

// 模拟从localStorage导入初始数据
function importFromLocalStorage() {
  try {
    if (typeof localStorage !== 'undefined') {
      const localData = localStorage.getItem('douyin_hotspot_data');
      if (localData) {
        const parsedData = JSON.parse(localData);
        ServerAPI.importData(parsedData)
          .then(result => {
            console.log(`成功从localStorage导入${result.importedCount}条数据`);
          })
          .catch(error => {
            console.error('导入数据失败:', error);
          });
      }
    }
  } catch (error) {
    console.error('从localStorage导入数据时出错:', error);
  }
}

// 初始化时导入本地数据（仅在服务器启动时执行一次）
// importFromLocalStorage();

// 导出API
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ServerAPI;
}
