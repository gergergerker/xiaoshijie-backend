import React, { useContext } from 'react';

// 权限检查组件
// action: 'view' | 'edit' | 'delete' | 'add' | 'admin'
// children: React节点
// fallback: 没有权限时显示的内容

const PermissionCheck = ({ action, children, fallback = null }) => {
  // 从本地存储获取用户信息
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { role: 'guest' };
  const userRole = currentUser.role;

  // 权限规则定义
  // admin: 所有权限
  // editor: 只有查看和编辑权限，没有删除和管理员权限
  const permissionRules = {
    admin: ['view', 'edit', 'delete', 'add', 'admin'],
    editor: ['view', 'edit', 'add'],
    guest: [],
  };

  // 检查是否有权限
  const hasPermission = permissionRules[userRole]?.includes(action);

  // 如果有权限，返回子组件，否则返回备用组件或null
  return hasPermission ? children : fallback;
};

export default PermissionCheck; 