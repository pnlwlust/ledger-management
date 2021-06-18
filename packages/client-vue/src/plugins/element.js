import {
  ElAside,
  ElButton,
  ElCalendar,
  ElCard, ElCheckbox, ElCollapse, ElCollapseItem,
  ElContainer, ElDatePicker, ElDialog,
  ElFooter,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElMain, ElOption, ElPagination, ElRate, ElSelect, ElTable, ElTableColumn, ElTag
} from 'element-plus'

export default (app) => {
  app.use(ElContainer)
  app.use(ElMain)
  app.use(ElCard)
  app.use(ElDialog)
  app.use(ElForm)
  app.use(ElFormItem)
  app.use(ElInput)
  app.use(ElCheckbox)
  app.use(ElButton)
  app.use(ElCalendar)
  app.use(ElTable)
  app.use(ElTableColumn)
  app.use(ElPagination)
  app.use(ElCollapse)
  app.use(ElCollapseItem)
  app.use(ElTag)
  app.use(ElRate)
  app.use(ElDatePicker)
  app.use(ElSelect)
  app.use(ElOption)
  app.use(ElHeader)
  app.use(ElAside)
  app.use(ElFooter)
}
