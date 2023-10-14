Feature: Regenerating posts
  Scenario: Valid request
    When I make a POST request to the "/regenerate-posts" endpoint with a "valid" webhook token
    Then posts are repopulated
    And I get a 200 response code

  Scenario: Invalid request
    When I make a POST request to the "/regenerate-posts" endpoint with a "invalid" webhook token
    Then I get a 401 response code
