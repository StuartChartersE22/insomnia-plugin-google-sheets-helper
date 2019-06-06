# insomnia-plugin-google-sheets-helper

## Installation
1. Open your preferences in Insomnia
2. Type `insomnia-plugin-google-sheets-helper`
3. Click 'Install Plugin'

## Goal

Allows easy insertion of a JSON structure to a Google sheet whose ID is specified in the Insomnia Environment. The user must set up OAuth 2 token for the Google Sheet API to work. Here are instructions to [authorise on the Google API](https://developers.google.com/sheets/api/guides/authorizing "Google Sheet's Authorisation") and [set up OAuth in Insomnia](https://insomnia.rest/blog/oauth2-github-api/ "Insomnia OAuth setup").

This plugin is also part of the [insomnia-plugin-testing](https://github.com/StuartChartersE22/insomnia-plugin-testing "GitHub insomnia plugin testing repo"). This plugin provides the same functionality as this one but can also help setup a testing environment.

## Usage

The JSON structure will be converted to key value pairs being in adjacent columns. JSON objects as values will leave space in the key column and populate down the value column. JSON objects will cascade through repeating the pattern described, moving across the columns as the tree gets deeper. Currently limited to maximum right column of ZZ.

Request JSON:
```
{
    "Top": {
        "Child1": "String",
        "Child2": {
            "GrandChild21": "String",
            "GrandChild22": "String"
        },
        "Child3": [GrandChild31,GrandChild32]
    }
}
```
Corresponding sheet layout:
```
----------------------------------------
| Top | Child1 | String       |        |
----------------------------------------
|     | Child2 | GrandChild21 | String |
----------------------------------------
|     |        | GrandChild22 | String |
----------------------------------------
|     | Child3 | GrandChild31 |        |
----------------------------------------
|     |        | GrandChild32 |        |
----------------------------------------
```

The end point must be set to PUT "g-sheet-request\[setting option number\]" for the intended request to be picked up. The actual request URL is automatically generated from the Sheet's ID. It will be the [Google spreadsheets.values.update end point](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/update).

```
{
    "G_SHEET_HELPER": [
        {
            "sheet-id": "String1",
            "top-left-coord": "A1" (optional)
        },
        {
            "sheet-id": "String2",
            "top-left-coord": "Sheet1!C4" (optional)
        }
    ]
}
```