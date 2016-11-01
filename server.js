const koa = require('koa')
const koaRouter = require('koa-router')
const koaBody = require('koa-bodyparser')
const graphqlKoa = require('graphql-server-koa').graphqlKoa
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const app = new koa()
const router = new koaRouter()
const PORT = 3000

app.use(koaBody())

const data = {
  students: ['foo', 'bar', 'baz'],
  units: ['wombat', 'aardvark', 'kinkajou'],
  questions: ['kumquat', 'durian', 'caperberry']
}

const typeDefs = `
  input WhereIn {
    search: [String]
  }

  type SheetsAPIDataset {
    students: [String],
    units: [String]
  }

  type Query {
    students(studentList: WhereIn, unitList: WhereIn) : SheetsAPIDataset
  }

  schema {
    query: Query
  }
`

const resolvers = {
  Query: {
    students (_, {studentList, unitList}) {
      const students = data.students.filter(student => studentList.search.includes(student))
      const units = data.units.filter(unit => unitList.search.includes(unit))

      return {
        students,
        units
      }
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

router.post('/graphql', graphqlKoa({ schema }))
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(PORT)
