Feature: Smoke test

  Scenario: Index
    When I make a request to the index route
    Then I get description of the API
