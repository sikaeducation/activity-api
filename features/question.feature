Feature: Question actions

  There is a questions API at `/questions` featuring the following properties:

  # | Property  | Type   | Note     |
  # | --------- | ------ | -------- |
  # | prompt    | string |          |
  # | answer    | string |          |
  # | context   | string | Optional |

  Scenario: Listing
    Given these "questions" exist:
      | _id                       | prompt | answer |
      | 507f1f77bcf86cd799439011  | P1     | A1     |
      | 507f1f77bcf86cd799439012  | P2     | A2     |
      | 507f1f77bcf86cd799439013  | P3     | A3     |
    When I make a "GET" request to the "/questions" endpoint
    Then I see these "questions":
      | _id                       | prompt | answer |
      | 507f1f77bcf86cd799439011  | P1     | A1     |
      | 507f1f77bcf86cd799439012  | P2     | A2     |
      | 507f1f77bcf86cd799439013  | P3     | A3     |

  Scenario: Reading
    Given this exists in "questions":
      | _id                      | prompt      | answer            |
      | 507f1f77bcf86cd799439011 | What is √4? | Why, 2 of course  |
    When I make a "GET" request to the "/questions/507f1f77bcf86cd799439011 " endpoint
    Then I see this "question":
      | _id                      | prompt      | answer            |
      | 507f1f77bcf86cd799439011 | What is √4? | Why, 2 of course  |

  Scenario: Creating
    When I make a "POST" request to the "/questions" endpoint with:
      | _id                      | prompt      | answer            |
      | 507f1f77bcf86cd799439011 | What is √4? | Why, 2 of course  |
    Then this is saved in "questions":
      | _id                      | prompt      | answer            |
      | 507f1f77bcf86cd799439011 | What is √4? | Why, 2 of course  |

  Scenario: Updating
    Given this exists in "questions":
      | _id                      | term  | definition                   |
      | 507f1f77bcf86cd799439011 | HTTP  | Unknown                      |
    When I make a "PATCH" request to the "/questions/507f1f77bcf86cd799439011" endpoint with:
      | prompt        | answer  |
      | What is √-1?  | Woof    |
    Then this is saved in "questions":
      | _id                      | prompt        | answer  |
      | 507f1f77bcf86cd799439011 | What is √-1?  | Woof    |

  Scenario: Deleting
    Given these "questions" exist:
      | _id                       | prompt | answer |
      | 507f1f77bcf86cd799439011  | P1     | A1     |
      | 507f1f77bcf86cd799439012  | P2     | A2     |
      | 507f1f77bcf86cd799439013  | P3     | A3     |
    When I make a "DELETE" request to the "/questions/507f1f77bcf86cd799439012" endpoint
    Then these are saved in "questions":
      | _id                       | prompt | answer |
      | 507f1f77bcf86cd799439011  | P1     | A1     |
      | 507f1f77bcf86cd799439013  | P3     | A3     |
