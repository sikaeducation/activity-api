Feature: Vocab actions

  There is a vocab API at `/vocabs` featuring the following properties:

  | Property    | Type    | Note      |
  | ----------- | ------- | --------- |
  | term        | string  |           |
  | definition  | string  |           |
  | context     | string  | Optional  |

  Scenario: Listing
    Given these "vocabs" exist:
      | term | definition |
      | T1   | D1         |
      | T2   | D2         |
      | T3   | D3         |
    When I make a "GET" request to the "/vocabs" endpoint
    Then I see these:
      | term | definition |
      | T1   | D1         |
      | T2   | D2         |
      | T3   | D3         |

  Scenario: Reading
    Given this exists in "vocabs":
      | _id                      | term  | definition                  |
      | 507f1f77bcf86cd799439011 | HTTP  | HyperText Transfer Protocol |
    When I make a "GET" request to the "/vocabs/507f1f77bcf86cd799439011" endpoint
    Then I see this:
      | _id                      | term  | definition                  |
      | 507f1f77bcf86cd799439011 | HTTP  | HyperText Transfer Protocol |

  Scenario: Creating
    When I make a "POST" request to the "/vocabs" endpoint with:
      | _id                      | term  | definition                  |
      | 507f1f77bcf86cd799439011 | HTTP  | HyperText Transfer Protocol |
    Then this is saved in "vocabs":
      | _id                      | term  | definition                  |
      | 507f1f77bcf86cd799439011 | HTTP  | HyperText Transfer Protocol |

  Scenario: Updating
    Given this exists in "vocabs":
      | _id                      | term  | definition                   |
      | 507f1f77bcf86cd799439011 | HTTP  | Unknown                      |
    When I make a "PATCH" request to the "/vocabs/507f1f77bcf86cd799439011" endpoint with:
      | term  | definition                  |
      | HTTP  | HyperText Transfer Protocol |
    Then this is saved in "vocabs":
      | _id                      | term  | definition                  |
      | 507f1f77bcf86cd799439011 | HTTP  | HyperText Transfer Protocol |

  Scenario: Deleting
    Given these "vocabs" exist:
      | _id                       | term | definition |
      | 507f1f77bcf86cd799439011  | T1   | D1         |
      | 507f1f77bcf86cd799439012  | T2   | D2         |
      | 507f1f77bcf86cd799439013  | T3   | D3         |
    When I make a "DELETE" request to the "/vocabs/507f1f77bcf86cd799439012" endpoint
    Then these are saved in "vocabs":
      | _id                       | term | definition |
      | 507f1f77bcf86cd799439011  | T1   | D1         |
      | 507f1f77bcf86cd799439013  | T3   | D3         |
