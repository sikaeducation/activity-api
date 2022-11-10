Feature: Activities actions

  Activities are the core model of this API. A single `/activities` endpoint
  abstracts away many different specific kinds of activities while still enforcing
  the schema for each.

  All activities have these properties:

  | Property    | Type          | Note              |
  | ----------- | ------------- | ----------------- |
  | _id         | ActivityType  | Read only         |
  | _type       | ActivityType  |                   |
  | title       | string        |                   |
  | published   | boolean       | Defaults to false |
  | tags        | string[]      |                   |
  | notes       | string        | Optional          |
  | description | string        | Optional          |
  | created_at  | string        | Read only         |
  | updated_at  | string        | Read only         |

  Scenario: Listing
    Given these "activities" exist:
      | _type       | title           |
      | Article     | Intro to Mongo  |
      | Exercise    | Mongo practice  |
      | Guide       | Guide to Mongo  |
    When I make a "GET" request to the "/activities" endpoint
    Then I see these:
      | _type       | title           |
      | Article     | Intro to Mongo  |
      | Exercise    | Mongo practice  |
      | Guide       | Guide to Mongo  |

  Scenario: Reading
    Given this exists in "activities":
      | _id                      | _type    | title          |
      | 507f1f77bcf86cd799439011 | Article  | Intro to Mongo |
    When I make a "GET" request to the "/activities/507f1f77bcf86cd799439011" endpoint
    Then I see this:
      | _id                      | _type    | title          |
      | 507f1f77bcf86cd799439011 | Article  | Intro to Mongo |

  Scenario: Creating
    When I make a "POST" request to the "/activities" endpoint with:
      | _id                      | _type    | title          | post_url |
      | 507f1f77bcf86cd799439011 | Article  | Intro to Mongo | /        |
    Then this is saved in "activities":
      | _id                      | _type    | title          | post_url |
      | 507f1f77bcf86cd799439011 | Article  | Intro to Mongo | /        |

  Scenario: Updating

    The `_type` key is required for patches.

    Given this exists in "activities":
      | _id                      | _type    | title          | post_url |
      | 507f1f77bcf86cd799439011 | Article  | Intro to Mongo | /        |
    When I make a "PATCH" request to the "/activities/507f1f77bcf86cd799439011?_type=Article" endpoint with:
      | post_url |
      | /mongo   |
    Then this is saved in "activities":
      | _id                      | _type    | title          | post_url |
      | 507f1f77bcf86cd799439011 | Article  | Intro to Mongo | /mongo   |

  Scenario: Deleting
    Given these "activities" exist:
      | _id                       | _type       | title           |
      | 507f1f77bcf86cd799439011  | Article     | Intro to Mongo  |
      | 507f1f77bcf86cd799439012  | Exercise    | Mongo practice  |
      | 507f1f77bcf86cd799439013  | Guide       | Guide to Mongo  |
    When I make a "DELETE" request to the "/activities/507f1f77bcf86cd799439012" endpoint
    Then these are saved in "activities":
      | _id                       | _type       | title           |
      | 507f1f77bcf86cd799439011  | Article     | Intro to Mongo  |
      | 507f1f77bcf86cd799439013  | Guide       | Guide to Mongo  |
