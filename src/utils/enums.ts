export enum RoleEnum {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export enum VisibleEnum {
  Add = 'Add',
  Edit = 'Edit',
  Copy = 'Copy',
}

export enum GenderEnum {
  Male = '男',
  Female = '女',
}

export enum LiveEnum {
  Close = '密接',
  Asymptomatic = '无症状',
  Confirmed = '确诊',
}

export enum LiveColorEnum {
  Close = 'blue',
  Asymptomatic = 'warning',
  Confirmed = 'red',
}

export enum InOutEnum {
  Allow = '允许',
  Ban = '限行'
}

export enum ModuleEnum {
  Person = '常住人员管理',
  Locus = '人员轨迹查询',
  Inout = '限行权限管理',
  Notification = '通知公告管理',
  Account = '账号管理',
}