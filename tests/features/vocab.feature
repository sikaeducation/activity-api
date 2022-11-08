Feature: Vocab actions

  Scenario: Listing
    Given 3 saved vocabs exist
    When I list vocabs
    Then I see 3 vocabs

  Scenario: Reading
    Given the vocab for "HTTP" exists
    When I get the vocab for "HTTP"
    Then I see the vocab for "HTTP"

  Scenario: Creating
    Given 0 saved vocabs exist
    When I create the vocab for "HTTP"
    Then the vocab for "HTTP" is saved

  Scenario: Updating
    Given the vocab for "HTTP" exists
    When I update the vocab definition for "HTTP" to "HyperText Transfer Protocol"
    Then "HTTP"'s definition is updated to "HyperText Transfer Protocol"

  Scenario: Deleting
    Given 3 saved vocabs exist
    When I delete a vocab
    Then there are 2 saved vocabs
