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
  Owner = '业主',
  Long = '长租',
  Short = '短租',
}

export enum LiveColorEnum {
  Owner = 'blue',
  Long = 'purple',
  Short = 'green',
  Leave = 'grey'
}

export enum InOutEnum {
  Allow = '允许',
  Ban = '限行'
}

export enum ModuleEnum {
  Person = '常住人员管理',
  Locus = '人员轨迹查询',
  Inout = '访客进出管理',
  Notification = '通知公告管理',
  Account = '账号管理',
}