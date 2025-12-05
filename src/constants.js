const SEMI_CHAR = "•";
const SEMI_PREFIX = "SEMI_";

const QUALITY = {
  "RELIABLE": {
    "key": "RELIABLE",
    "srs_value": 1,
    "text": "RELIABLE",
    "tr_value": 1,
    "offense": true,
    "defense": false,
    "category": "INT",
    "order": 1
  },
  "SEMI_RELIABLE": {
    "key": "SEMI_RELIABLE",
    "srs_value": 0.5,
    "text": "RELIABLE•",
    "tr_value": 0.5,
    "offense": true,
    "defense": false,
    "category": "INT",
    "order": 2
  },
  "SEMI_SHAKY": {
    "key": "SEMI_SHAKY",
    "srs_value": -0.5,
    "text": "SHAKY•",
    "tr_value": -0.5,
    "offense": true,
    "defense": false,
    "category": "INT",
    "order": 3
  },
  "SHAKY": {
    "key": "SHAKY",
    "srs_value": -1,
    "text": "SHAKY",
    "tr_value": -1,
    "offense": true,
    "defense": false,
    "category": "INT",
    "order": 4
  },
  "SECURE": {
    "key": "SECURE",
    "srs_value": 1,
    "text": "SECURE",
    "tr_value": 1,
    "offense": true,
    "defense": false,
    "category": "FUM",
    "order": 5
  },
  "SEMI_SECURE": {
    "key": "SEMI_SECURE",
    "srs_value": 0.5,
    "text": "SECURE•",
    "tr_value": 0.5,
    "offense": true,
    "defense": false,
    "category": "FUM",
    "order": 6
  },
  "SEMI_CLUMSY": {
    "key": "SEMI_CLUMSY",
    "srs_value": -0.5,
    "text": "CLUMSY•",
    "tr_value": -0.5,
    "offense": true,
    "defense": false,
    "category": "FUM",
    "order": 7
  },
  "CLUMSY": {
    "key": "CLUMSY",
    "srs_value": -1,
    "text": "CLUMSY",
    "tr_value": -1,
    "offense": true,
    "defense": false,
    "category": "FUM",
    "order": 8
  },
  "DISCIPLINED": {
    "key": "DISCIPLINED",
    "srs_value": 1,
    "text": "DISCIPLINED",
    "tr_value": 1,
    "offense": true,
    "defense": true,
    "category": "PEN",
    "order": 9
  },
  "SEMI_DISCIPLINED": {
    "key": "SEMI_DISCIPLINED",
    "srs_value": 0.5,
    "text": "DISCIPLINED•",
    "tr_value": 0.5,
    "offense": true,
    "defense": true,
    "category": "PEN",
    "order": 10
  },
  "SEMI_UNDISCIPLINED": {
    "key": "SEMI_UNDISCIPLINED",
    "srs_value": -0.5,
    "text": "UNDISCIPLINED•",
    "tr_value": -0.5,
    "offense": true,
    "defense": true,
    "category": "PEN",
    "order": 11
  },
  "UNDISCIPLINED": {
    "key": "UNDISCIPLINED",
    "srs_value": -1,
    "text": "UNDISCIPLINED",
    "tr_value": -1,
    "offense": true,
    "defense": true,
    "category": "PEN",
    "order": 12
  },
  "DYNAMIC": {
    "key": "DYNAMIC",
    "srs_value": 1,
    "text": "DYNAMIC",
    "tr_value": 1,
    "offense": true,
    "defense": false,
    "category": "BALL_CONTROL",
    "order": 0
  },
  "SEMI_DYNAMIC": {
    "key": "SEMI_DYNAMIC",
    "srs_value": 0.5,
    "text": "DYNAMIC•",
    "tr_value": 0.5,
    "offense": true,
    "defense": false,
    "category": "BALL_CONTROL",
    "order": 0
  },
  "SEMI_ERRATIC": {
    "key": "SEMI_ERRATIC",
    "srs_value": -0.5,
    "text": "ERRATIC•",
    "tr_value": -0.5,
    "offense": true,
    "defense": false,
    "category": "BALL_CONTROL",
    "order": 0
  },
  "ERRATIC": {
    "key": "ERRATIC",
    "srs_value": -1,
    "text": "ERRATIC",
    "tr_value": -1,
    "offense": true,
    "defense": false,
    "category": "BALL_CONTROL",
    "order": 0
  },
  "EFFICIENT": {
    "key": "EFFICIENT",
    "srs_value": 4,
    "text": "EFFICIENT",
    "tr_value": 2,
    "offense": true,
    "defense": false,
    "category": "EFFICIENCY",
    "order": 0
  },
  "SEMI_EFFICIENT": {
    "key": "SEMI_EFFICIENT",
    "srs_value": 2,
    "text": "EFFICIENT•",
    "tr_value": 1,
    "offense": true,
    "defense": false,
    "category": "EFFICIENCY",
    "order": 0
  },
  "SEMI_INEFFICIENT": {
    "key": "SEMI_INEFFICIENT",
    "srs_value": -2,
    "text": "INEFFICIENT•",
    "tr_value": -1,
    "offense": true,
    "defense": false,
    "category": "EFFICIENCY",
    "order": 0
  },
  "INEFFICIENT": {
    "key": "INEFFICIENT",
    "srs_value": -4,
    "text": "INEFFICIENT",
    "tr_value": -2,
    "offense": true,
    "defense": false,
    "category": "EFFICIENCY",
    "order": 0
  },
  "SOLID": {
    "key": "SOLID",
    "srs_value": 1,
    "text": "SOLID",
    "tr_value": 1,
    "offense": true,
    "defense": false,
    "category": "SACKS",
    "order": 0
  },
  "SEMI_SOLID": {
    "key": "SEMI_SOLID",
    "srs_value": 0.5,
    "text": "SOLID•",
    "tr_value": 0.5,
    "offense": true,
    "defense": false,
    "category": "SACKS",
    "order": 0
  },
  "SEMI_POROUS": {
    "key": "SEMI_POROUS",
    "srs_value": -0.5,
    "text": "POROUS•",
    "tr_value": -0.5,
    "offense": true,
    "defense": false,
    "category": "SACKS",
    "order": 0
  },
  "POROUS": {
    "key": "POROUS",
    "srs_value": -1,
    "text": "POROUS",
    "tr_value": -1,
    "offense": true,
    "defense": false,
    "category": "SACKS",
    "order": 0
  },
  "PROLIFIC": {
    "key": "PROLIFIC",
    "srs_value": 4,
    "text": "PROLIFIC",
    "tr_value": 4,
    "offense": true,
    "defense": false,
    "category": "SCORING",
    "order": 0
  },
  "SEMI_PROLIFIC": {
    "key": "SEMI_PROLIFIC",
    "srs_value": 2,
    "text": "PROLIFIC•",
    "tr_value": 2,
    "offense": true,
    "defense": false,
    "category": "SCORING",
    "order": 0
  },
  "SEMI_DULL": {
    "key": "SEMI_DULL",
    "srs_value": -2,
    "text": "DULL•",
    "tr_value": -2,
    "offense": true,
    "defense": false,
    "category": "SCORING",
    "order": 0
  },
  "DULL": {
    "key": "DULL",
    "srs_value": -4,
    "text": "DULL",
    "tr_value": -4,
    "offense": true,
    "defense": false,
    "category": "SCORING",
    "order": 0
  },
  "AGGRESSIVE": {
    "key": "AGGRESSIVE",
    "srs_value": 1,
    "text": "AGGRESSIVE",
    "tr_value": 1,
    "offense": false,
    "defense": true,
    "category": "INT",
    "order": 1
  },
  "SEMI_AGGRESSIVE": {
    "key": "SEMI_AGGRESSIVE",
    "srs_value": 0.5,
    "text": "AGGRESSIVE•",
    "tr_value": 0.5,
    "offense": false,
    "defense": true,
    "category": "INT",
    "order": 2
  },
  "SEMI_MEEK": {
    "key": "SEMI_MEEK",
    "srs_value": -0.5,
    "text": "MEEK•",
    "tr_value": -0.5,
    "offense": false,
    "defense": true,
    "category": "INT",
    "order": 3
  },
  "MEEK": {
    "key": "MEEK",
    "srs_value": -1,
    "text": "MEEK",
    "tr_value": -1,
    "offense": false,
    "defense": true,
    "category": "INT",
    "order": 4
  },
  "ACTIVE": {
    "key": "ACTIVE",
    "srs_value": 1,
    "text": "ACTIVE",
    "tr_value": 1,
    "offense": false,
    "defense": true,
    "category": "FUM",
    "order": 5
  },
  "SEMI_ACTIVE": {
    "key": "SEMI_ACTIVE",
    "srs_value": 0.5,
    "text": "ACTIVE•",
    "tr_value": 0.5,
    "offense": false,
    "defense": true,
    "category": "FUM",
    "order": 6
  },
  "SEMI_PASSIVE": {
    "key": "SEMI_PASSIVE",
    "srs_value": -0.5,
    "text": "PASSIVE•",
    "tr_value": -0.5,
    "offense": false,
    "defense": true,
    "category": "FUM",
    "order": 7
  },
  "PASSIVE": {
    "key": "PASSIVE",
    "srs_value": -1,
    "text": "PASSIVE",
    "tr_value": -1,
    "offense": false,
    "defense": true,
    "category": "FUM",
    "order": 8
  },
  "STIFF": {
    "key": "STIFF",
    "srs_value": 1,
    "text": "STIFF",
    "tr_value": 1,
    "offense": false,
    "defense": true,
    "category": "BALL_CONTROL",
    "order": 0
  },
  "SEMI_STIFF": {
    "key": "SEMI_STIFF",
    "srs_value": 0.5,
    "text": "STIFF•",
    "tr_value": 0.5,
    "offense": false,
    "defense": true,
    "category": "BALL_CONTROL",
    "order": 0
  },
  "SEMI_SOFT": {
    "key": "SEMI_SOFT",
    "srs_value": -0.5,
    "text": "SOFT•",
    "tr_value": -0.5,
    "offense": false,
    "defense": true,
    "category": "BALL_CONTROL",
    "order": 0
  },
  "SOFT": {
    "key": "SOFT",
    "srs_value": -1,
    "text": "SOFT",
    "tr_value": -1,
    "offense": false,
    "defense": true,
    "category": "BALL_CONTROL",
    "order": 0
  },
  "PUNISHING": {
    "key": "PUNISHING",
    "srs_value": 1,
    "text": "PUNISHING",
    "tr_value": 1,
    "offense": false,
    "defense": true,
    "category": "SACKS",
    "order": 0
  },
  "SEMI_PUNISHING": {
    "key": "SEMI_PUNISHING",
    "srs_value": 0.5,
    "text": "PUNISHING•",
    "tr_value": 0.5,
    "offense": false,
    "defense": true,
    "category": "SACKS",
    "order": 0
  },
  "SEMI_MILD": {
    "key": "SEMI_MILD",
    "srs_value": -0.5,
    "text": "MILD•",
    "tr_value": -0.5,
    "offense": false,
    "defense": true,
    "category": "SACKS",
    "order": 0
  },
  "MILD": {
    "key": "MILD",
    "srs_value": -1,
    "text": "MILD",
    "tr_value": -1,
    "offense": false,
    "defense": true,
    "category": "SACKS",
    "order": 0
  },
  "STAUNCH": {
    "key": "STAUNCH",
    "srs_value": 4,
    "text": "STAUNCH",
    "tr_value": 4,
    "offense": false,
    "defense": true,
    "category": "SCORING",
    "order": 0
  },
  "SEMI_STAUNCH": {
    "key": "SEMI_STAUNCH",
    "srs_value": 2,
    "text": "STAUNCH•",
    "tr_value": 2,
    "offense": false,
    "defense": true,
    "category": "SCORING",
    "order": 0
  },
  "SEMI_INEPT": {
    "key": "SEMI_INEPT",
    "srs_value": -2,
    "text": "INEPT•",
    "tr_value": -2,
    "offense": false,
    "defense": true,
    "category": "SCORING",
    "order": 0
  },
  "INEPT": {
    "key": "INEPT",
    "srs_value": -4,
    "text": "INEPT",
    "tr_value": -4,
    "offense": false,
    "defense": true,
    "category": "SCORING",
    "order": 0
  },
  "NO_QUALITY": {
    "key": "NO_QUALITY",
    "srs_value": 0,
    "text": "No quality",
    "tr_value": 0,
    "offense": false,
    "defense": false,
    "category": "",
    "order": 0
  },
  "SEMI_ELECTRIC": {
    "key": "SEMI_ELECTRIC",
    "srs_value": 0.5,
    "text": "ELECTRIC•",
    "tr_value": 0,
    "offense": false,
    "defense": false,
    "category": "",
    "order": 0
  },
  "ELECTRIC": {
    "key": "ELECTRIC",
    "srs_value": 1,
    "text": "ELECTRIC",
    "tr_value": 0,
    "offense": false,
    "defense": false,
    "category": "",
    "order": 0
  }
}
