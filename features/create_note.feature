Feature: Create note
  In order to store valuable information
  As a person who forgets
  I want create a new note

  Scenario: Create note
    Given I have 0 notes
    When I create a new note
    And I set the "title" to "Note Title"
    And I set the "content" to "Note content"
    And I save the note
    Then I should have 1 saved note
