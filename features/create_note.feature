Feature: Create note
  In order to store valuable information
  As a person who forgets
  I want create a new note

  Scenario: Create note with valid parameters
    Given I have no notes
    When I create a new note
    And I set the "title" to "Note Title"
    And I set the "content" to "Note content"
    And I save the note
    Then I should have 1 saved note
    And I should see the created note

  Scenario: Create note with invalid parameters
    Given I have no notes
    When I create a new note
    And I set the "title" to ""
    And I set the "content" to ""
    And I save the note
    Then I should have 0 saved notes
    And I should see the validation error
      | field | error    |
      | title | required |
