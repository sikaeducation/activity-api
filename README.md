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

| Property | Type | Note |
| --- | --- | --- |
| _id | ActivityType | Read only |
| _type | ActivityType | |
| title | string | |
| published | boolean | Defaults to false |
| tags | string[] | |
| notes | string | Optional |
| description | string | Optional |
| created_at | string | Read only |
| updated_at | string | Read only |

Specific activities have these properties:

### Article

| Property | Type | Note |
| --- | --- | --- |
| post_url | string | |

### Guide

| Property | Type | Note |
| --- | --- | --- |
| post_url | string | |

### Exercise

| Property | Type | Note |
| --- | --- | --- |
| submission_url | string | |
| prompt | string | |
| solution_url | string | |
| tests | boolean | |

### Vocab List

| Property | Type | Note |
| --- | --- | --- |
| entries | Vocab[] | |

### Lesson

| Property | Type | Note |
| --- | --- | --- |
| video_url | string | Optional |
| plan | string | Optional |
| objectives | string[] | Optional |
| video_link | string | Optional |
| scheduled_at | string | |

### Video

| Property | Type | Note |
| --- | --- | --- |
| video_url | string | |

## Vocab

[Documentation](tests/vocab.feature)

## Question

[Documentation](tests/question.feature)

## Dependencies

* Docker / Docker Compose

## Stack

* Express
* Mongo
* Cucumber, Expect
* Supertest

## Scripts

* `npm test:ci` - Run CI tests
* `npm test:watch` - Run tests in development
* `npm run dev` - Start dev environment (base URL is `localhost://3000`)
* `npm run lint` - Check and fix code for formatting and linting errors
