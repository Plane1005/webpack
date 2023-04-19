import { RoleEnum, VisibleEnum } from '../utils/enums'

type RoleType = RoleEnum
type VisibleType = VisibleEnum

type IVoidFn = () => void

interface AjaxResult<T = any> {
  code: number
  data: T
  message: string
  status: 'success' | 'fail'
}

interface PagingData<T> {
  list: T[]
  totalCount: number
  pageSize: number
  pageNum: number
}

type VisibleInfo = {
  visible: boolean
  isAdd?: boolean
  isEdit?: boolean
  isCopy?: boolean
  info?: any
  type?: VisibleType
  [key: string]: any
}

interface ModalProps {
  visibleInfo: VisibleInfo
  onClose: IVoidFn
  refresh?: IVoidFn
}

type ICO = {
  [key: string]: any
}

interface IOption {
  label: number | string
  value: number | string
}

interface IFilterForm {
  filterCom?: JSX.Element
  name: string;
  label: string;
  component: JSX.Element;
  span?: number;
  hiddenFilter?: boolean;
  notRequire?: boolean;
}

interface IDrawerInfo {
  visible: boolean;
  isEdit?: boolean;
  isCopy?: boolean;
  data?: any
}