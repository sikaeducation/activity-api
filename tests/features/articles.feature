Feature: Article actions

  An article is an activity with a GitHub URL intended to represent markdown for display.

  Scenario: Reading articles
    Given there are 3 saved articles
    When I make a "GET" request to the "/activities?type=articles" endpoint
    Then I see 3 articles
