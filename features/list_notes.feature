Feature: List notes
  In order to find the information I stored
  As a person who forgets
  I want list all the created notes

  Scenario: No notes
    Given I have no notes
    When I request to see the notes list
    Then I should see 0 notes

  Scenario: With notes to list
    Given I have the following notes
      | title  | content            |
      | Note 1 | Content for note 1 |
      | Note 2 | Content for note 2 |
    When I request to see the notes list
    Then I should see 2 notes
    And I should see the following notes
      | title  | content            |
      | Note 1 | Content for note 1 |
      | Note 2 | Content for note 2 |
