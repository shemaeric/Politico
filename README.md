[![Build Status](https://travis-ci.org/shemaeric/Politico.svg?branch=develop)](https://travis-ci.org/shemaeric/Politico)
[![Licence](https://img.shields.io/github/license/shemaeric/politico.svg?style=plastic)](https://img.shields.io/github/license/shemaeric/politico.svg?style=plastic)
[![Maintainability](https://api.codeclimate.com/v1/badges/36771a2cd14fac35445b/maintainability)](https://codeclimate.com/github/shemaeric/Politico/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/shemaeric/Politico/badge.svg?branch=chore-setup-coveralls-163682403)](https://coveralls.io/github/shemaeric/Politico?branch=chore-setup-coveralls-163682403)

# Politico
Politico is a platform to help a Citizen to vote and Politicians to register as Candidates and show their interests to run for Political Offices.(https://politic-api.herokuapp.com/api/v1/)

# Prerequisites
The required tools : 
    * Node : 10.14.1 
    * NPM : 6.4.1
    * ESLINT 
    * AIRBNB Style guide

# Setting up Dev

Getting the Project in your local machine <br/>
`git clone https://github.com/shemaeric/Politico` cd into the project `cd Politico` 

Install dependencies <br/>
`npm install`

Starting development server <br/> 
`npm run start`

Run Tests <br/>
`npm run test`


## API-Endpoints
JSON Object is what is returned for each API endpoint, structure of return JSON Object:

## Party
`GET /parties`
```source-json
{
	"status" : 200,
	"data" : [
		{
			"id" : 12345,
			"name" : "Democrats",
			"hqAdress" : "Washington",
			"logoUrl" : "fdkfd"
			"createdDate" : 1549401505876,
			"modifiedDate" : 1549401505876
		},
		{
			"id" : 12345,
			"name" : "Democrats",
			"hqAdress" : "Washington",
			"logoUrl" : "fdkfd"
			"createdDate" : 1549401505876,
			"modifiedDate" : 1549401505876
		}
	]
}
```

`POST /parties`
```source-json
{
	"status" : 201,
	"message" : "Party Succefully Created"
	"data" : [{
		"id" : 12345,
		"name" : "Democrats",
		"hqAdress" : "Washington",
		"logoUrl" : "fdkfd"
		"createdDate" : 1549401505876,
		"modifiedDate" : 1549401505876
	}]
}
```

`GET /parties/<party-id>`
```source-json
{
	"status" : 200,
	"data": [
        {
            "id": "04c83be0-d292-4c02-871e-5c7ca579396b",
            "name": "democ",
            "hqAdress": "washington",
            "logoUrl": "hiensisss",
            "createdDate": 1549401491722,
            "modifiedDate": 1549401491722
        }
    ]
}
```

`PATCH /parties/<party-id>`
```source-json
{
	"status" : 200,
	"data": [
        {
            "id": "04c83be0-d292-4c02-871e-5c7ca579396b",
            "name": "democrats",
            "hqAdress": "washington",
            "logoUrl": "hiensisss",
            "createdDate": 1549401491722,
            "modifiedDate": 1549401491722
        }
    ]
}
```

`DELETE /parties/<party-id>`
```source-json
{
    "status": 200,
    "message": "party deleted",
    "data": [
        {
            "message": "party deleted",
            "data": [
                {}
            ]
        }
    ]
}
```

## Office
`POST /Offices`
```source-json
{
    "status": 201,
    "message": "Office Succefully Created",
    "data": [
        {
            "id": 1,
            "name": "democa",
            "type": "state",
            "createdDate": 1549402198309,
            "modifiedDate": 1549402198309
        }
    ]
}
```

`GET /offices`
```source-json
{
    "status": 200,
    "data": [
        [
            {
                "id": 1,
                "name": "democa",
                "type": "state",
                "createdDate": 1549402198309,
                "modifiedDate": 1549402198309
            },
            {
                "id": 2,
                "name": "state office",
                "type": "state",
                "createdDate": 1549402309933,
                "modifiedDate": 1549402309933
            }
        ]
    ]
}
```

`GET /offices/<office-id>`
```source-json
{
    "status": 200,
    "data": [
        {
            "id": 1,
            "name": "democa",
            "type": "state",
            "createdDate": 1549402198309,
            "modifiedDate": 1549402198309
        }
    ]
}
```

`PATCH /offices/<office-id>`
```source-json
{
    "status": 200,
    "data": [
        {
            "id": 1,
            "name": "democa",
            "type": "local",
            "createdDate": 1549402198309,
            "modifiedDate": 1549402467853
        }
    ]
}
```

`DELETE /offices/<office-id>`
```source-json
{
    "status": 200,
    "data": [
        {
            "message": "office deleted",
            "data": [
                {}
            ]
        }
    ]
}
```
