# Quick jaunt through GraphQL for another project

Install should be an

```
npm i
npm start
```

Hit http://localhost:3000/graphql with queries. Sample:

```
{
	"query": "query ($arg1: WhereIn, $arg2: WhereIn) { students(studentList: $arg1, unitList: $arg2) { students, units} }",
	"variables": {
		"arg1": {
			"search": ["foo", "baz"]
		},
		"arg2": {
			"search": ["wombat"]
		}
	}
}
```

Result:

```
{
  "data": {
    "students": {
      "students": [
        "foo",
        "baz"
      ],
      "units": [
        "wombat"
      ]
    }
  }
}
```
