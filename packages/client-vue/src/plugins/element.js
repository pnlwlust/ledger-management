import {ElButton, ElCard, ElContainer, ElForm, ElFormItem, ElInput, ElMain} from 'element-plus'

export default (app) => {
  app.use(ElContainer)
  app.use(ElMain)
  app.use(ElCard)
  app.use(ElForm)
  app.use(ElFormItem)
  app.use(ElInput)
  app.use(ElButton)
}
