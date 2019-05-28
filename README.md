# insomnia-plugin-google-sheets-helper

## Installation
1. Open your preferences in Insomnia
2. Type `insomnia-plugin-google-sheets-helper`
3. Click 'Install Plugin'

## Usage
Allows easy insertion of a JSON structure to a Google sheet whose ID is specified in the Insomnia Environment. The user must set up OAuth 2 token for the Google Sheet API to work. Here are instructions to [authorise on the Google API](https://developers.google.com/sheets/api/guides/authorizing "Google Sheet's Authorisation") and [set up OAuth in Insomnia](https://insomnia.rest/blog/oauth2-github-api/ "Insomnia OAuth setup")

The JSON structure will be converted to key value pairs being in adjacent columns. Arrays or JSON objects as values will leave space in the key column and populate down the value column. JSON objects will cascade through repeating the pattern described, moving across the columns as the tree gets deeper.

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
| Top   |Child1 | String        |       |
|       |Child2 | GrandChild21  |String |
|       |       | GrandChild22  |String |
|       |Child3 | GrandChild31  |       |
|       |       | GrandChild32  |       |

The end point is automatically generated from the Sheet's ID. It will be the [Google spreadsheets.values.update end point](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/update).

```
{
    "G_SHEET_HELPER": {
        "sheet-id": "String"
    }
}
```