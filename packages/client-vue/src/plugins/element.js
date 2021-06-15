import {
  ElAside,
  ElButton,
  ElCalendar,
  ElCard,
  ElContainer,
  ElFooter,
  ElForm,
  ElFormItem,
  ElHeader,
  ElInput,
  ElMain
} from 'element-plus'

export default (app) => {
  app.use(ElContainer)
  app.use(ElMain)
  app.use(ElCard)
  app.use(ElForm)
  app.use(ElFormItem)
  app.use(ElInput)
  app.use(ElButton)
  app.use(ElCalendar)
  app.use(ElHeader)
  app.use(ElAside)
  app.use(ElFooter)
}
