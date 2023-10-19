Feature: Activities Types

  There are specific types of activities with their own schemas. All activities have these properties:

  # | Property    | Type          | Note              |
  # | ----------- | ------------- | ----------------- |
  # | _id         | ActivityType  | Read only         |
  # | _type       | ActivityType  |                   |
  # | title       | string        |                   |
  # | published   | boolean       | Defaults to false |
  # | tags        | string[]      |                   |
  # | notes       | string        | Optional          |
  # | description | string        | Optional          |
  # | created_at  | string        | Read only         |
  # | updated_at  | string        | Read only         |

  These activity types are currently supported:

  # * `"Article"`
  # * `"Guide"`
  # * `"Exercise"`
  # * `"Quiz"`
  # * `"Lesson"`
  # * `"Video"`

  These are the specific schemas:

	# Article:
	# | Property  | Type   | Note |
	# | --------- | ------ | ---- |
	# | post_slug  | string |      |
	#
	# VocabList:
	# | Property  | Type    | Note  |
	# | --------- | ------- | ----- |
	# | entries   | Vocab[] |       |
	#
	# (A `Vocab` is):
	# | Property    | Type    | Note      |
	# | ----------- | ------- | --------- |
	# | term        | string  |           |
	# | definition  | string  |           |
	# | context     | string  | Optional  |
	#
	# Guide:
	# | Property  | Type   | Note |
	# | --------- | ------ | ---- |
	# | post_slug  | string |      |
	#
	# Exercise:
	# | Property        | Type    | Note              |
	# | --------------- | ------- | ----------------- |
	# | exercise_url    | string  |                   |
	# | prompt          | string  |                   |
	# | solution_url    | string  | Optional          |
	# | tests           | boolean | Defaults to false |
	#
	# Video:
	# | Property    | Type   | Note |
	# | ----------  | ------ | ---- |
	# | video_url   | string |      |
	#
	# Lesson:
	# | Property | Type | Note |
	# | --- | --- | --- |
	# | objectives    | string[]  | Optional  |
	# | video_url     | string    | Optional  |
	# | plan          | string    | Optional  |
	# | notes         | string    | Optional  |
	# | date          | string    | Optional  |

  Scenario: Article
    When I make a "POST" request to the "/activities" endpoint with:
      | _id                      | _type    | title          | post_slug |
      | 507f1f77bcf86cd799439011 | Article  | Intro to Mongo | /        |
    Then this is saved in "activities":
      | _id                      | _type    | title          | post_slug |
      | 507f1f77bcf86cd799439011 | Article  | Intro to Mongo | /        |

  Scenario: Guide
    When I make a "POST" request to the "/activities" endpoint with:
      | _id                      | _type    | title          | post_slug |
      | 507f1f77bcf86cd799439011 | Guide    | Guide to Mongo | /        |
    Then this is saved in "activities":
      | _id                      | _type    | title          | post_slug |
      | 507f1f77bcf86cd799439011 | Guide    | Guide to Mongo | /        |

  Scenario: Exercise
    When I make a "POST" request to the "/activities" endpoint with:
      | _id                      | _type        | title          | exercise_url | prompt |
      | 507f1f77bcf86cd799439011 | Exercise     | Mongo Practice | http://a.com   | Do it! |
    Then this is saved in "activities":
      | _id                      | _type        | title          | exercise_url | prompt |
      | 507f1f77bcf86cd799439011 | Exercise     | Mongo Practice | http://a.com   | Do it! |

  Scenario: Video
    When I make a "POST" request to the "/activities" endpoint with:
      | _id                      | _type    | title   | video_url    |
      | 507f1f77bcf86cd799439011 | Video    | Mongo   | http://a.com |
    Then this is saved in "activities":
      | _id                      | _type    | title   | video_url    |
      | 507f1f77bcf86cd799439011 | Video    | Mongo   | http://a.com |

  Scenario: Lesson
    When I make a "POST" request to the "/activities" endpoint with:
      | _id                      | _type    | title             | plan          |
      | 507f1f77bcf86cd799439011 | Lesson   | Intro to Mongo    | Learn lots    |
    Then this is saved in "activities":
      | _id                      | _type    | title             | plan          |
      | 507f1f77bcf86cd799439011 | Lesson   | Intro to Mongo    | Learn lots    |

  Scenario: Vocab List
    When I make a "POST" request to the "/activities" endpoint with a vocab list:
      | _id                      | _type        | title         | entries                                 |
      | 507f1f77bcf86cd799439011 | VocabList    | Mongo vocab   | mongod: daemon, document: like a record |
    Then this vocab list is saved in "activities":
      | _id                      | _type        | title         | entries                                 |
      | 507f1f77bcf86cd799439011 | VocabList    | Mongo vocab   | mongod: daemon, document: like a record |
