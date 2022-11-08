Feature: Vocab actions

  Scenario: Listing
    Given these vocabs exist:
      | term | definition |
      | T1   | D1         |
      | T2   | D2         |
      | T3   | D3         |
    When I list all the vocabs
    Then I see these vocabs:
      | term | definition |
      | T1   | D1         |
      | T2   | D2         |
      | T3   | D3         |

  Scenario: Reading
    Given this vocab exists:
      | term  | definition                  |
      | HTTP  | HyperText Transfer Protocol |
    When I get the vocab "HTTP"
    Then I see this vocab:
      | term  | definition                  |
      | HTTP  | HyperText Transfer Protocol |

  Scenario: Creating
    When I create this vocab:
      | term  | definition                  |
      | HTTP  | HyperText Transfer Protocol |
    Then this vocab is saved:
      | term  | definition                  |
      | HTTP  | HyperText Transfer Protocol |

  Scenario: Updating
    Given this vocab exists:
      | term  | definition  |
      | HTTP  | Unknown     |
    When I update the vocab "HTTP" to:
      | term  | definition                  |
      | HTTP  | HyperText Transfer Protocol |
    Then this vocab is saved:
      | term  | definition                  |
      | HTTP  | HyperText Transfer Protocol |

  Scenario: Deleting
    Given these vocabs exist:
      | term | definition |
      | T1   | D1         |
      | T2   | D2         |
      | T3   | D3         |
    When I delete the vocab "T2"
    Then these vocabs are saved:
      | term | definition |
      | T1   | D1         |
      | T3   | D3         |
