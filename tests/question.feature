Feature: Question actions

  Scenario: Listing
    Given these questions exist:
      | prompt | answer |
      | P1     | A1     |
      | P2     | A2     |
      | P3     | A3     |
    When I list all the questions
    Then I see these questions:
      | prompt | answer |
      | P1     | A1     |
      | P2     | A2     |
      | P3     | A3     |

  Scenario: Reading
    Given this question exists:
      | prompt      | answer            |
      | What is √4? | Why, 2 of course  |
    When I get the question "What is √4?"
    Then I see this question:
      | prompt      | answer            |
      | What is √4? | Why, 2 of course  |

  Scenario: Creating
    When I create this question:
      | prompt      | answer            |
      | What is √4? | Why, 2 of course  |
    Then this question is saved:
      | prompt      | answer            |
      | What is √4? | Why, 2 of course  |

  Scenario: Updating
    Given this question exists:
      | prompt      | answer            |
      | What is √4? | Why, 2 of course  |
    When I update the question "What is √4?" to:
      | prompt        | answer  |
      | What is √-1?  | Woof    |
    Then this question is saved:
      | prompt        | answer  |
      | What is √-1?  | Woof    |

  Scenario: Deleting
    Given these questions exist:
      | prompt | answer |
      | P1     | A1     |
      | P2     | A2     |
      | P3     | A3     |
    When I delete the question "P2"
    Then these questions are saved:
      | prompt | answer |
      | P1     | A1     |
      | P3     | A3     |
