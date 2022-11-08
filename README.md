# Activity Service

RESTful API for interacting with activities. Lives at [https://sika-activity-api.herokuapp.com](http://sika-activity-api.herokuapp.com).

## REST Endpoints

* `/activities`
* `/vocab`
* `/questions`

## Activity Types

These activity types are currently supported:

* `"article"`
* `"guide"`
* `"exercise"`
* `"quiz"`
* `"lesson"`
* `"video"`

All activities have these properties:

```
readonly _id?: string
_type: ActivityType
title: string
published: boolean
tags?: string[]
notes?: string
description?: string
readonly created_at?: string
readonly updated_at?: string
```

Specific activities have these properties:

### Article

```
post_url: string
```

### Guide

```
post_url: string
```

### Exercise

```
submission_url: string
prompt: string
solution_url: string
tests: boolean
```

### Vocab List

```
entries: Vocab[]
```

### Lesson

```
video_url?: string
plan?: string
objectives?: string[]
video_link?: string
scheduled_at: string
```

### Video

```
video_url: string
```

## Vocab

There is a vocab API at `/vocab`, featuring the following properties:

```
readonly _id: string
id?: string
term: string
definition: string
context?: string
```

## Question/Answer

There is a question and answer API at `/questions`, featuring the following properties:

```
id?: string
prompt: string
answer: string
```

## Dependencies

* Docker / Docker Compose

## Stack

* Express
* Mongo
* Cucumber, Expect
* Supertest

## Scripts

* `npm test` - Run tests
* `npm run dev` - Start dev environment (base URL is `localhost://3000`)
* `npm run lint` - Check and fix code for formatting and linting errors
