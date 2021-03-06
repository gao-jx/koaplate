import * as Router from 'koa-router'
import User from 'app/server/model/User'
import Talk from 'app/server/model/Talk'

const router = new Router()

router.get('/talk', async (ctx:any) => {
  const list = await Talk.findAll({
    order: [ ['createdAt', 'DESC'] ],
    include: [ User ]
  })
  await ctx.render('talk', {
    title: 'talk - ' + ctx.state.title,
    list
  })
})

router.post('/talk', async (ctx:any) => {
  const msg = ctx.request.body.content

  if (!ctx.state.user) {
    ctx.throw(401)
  }

  const newTalk = new Talk({
    content: msg,
    userId: ctx.state.user.id
  })

  await newTalk.save()

  ctx.redirect('/talk')
  // ctx.body = newTalk
})

export default router

