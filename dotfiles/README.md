# Dotfiles

Information and instructions regarding some of the files in this directory.

## karabiner.json

Reference: https://pqrs.org/osx/karabiner/json.html

### Complex modifications

```JSON
"rules": [
    {
        "description": "Change `f1` to `display_brightness_decrement` when fn is held down.",
        "manipulators": [
            {
                "type": "basic",
                "from": {
                    "key_code": "f1", // The key in question
                    "modifiers": {
                        "mandatory": [ // These keys must be pressed
                            "fn"
                        ],
                        "optional": [ // These keys may be pressed but won't affect the manipulator
                            "caps_lock"
                        ]
                    }
                },
                "to": [ // Do what
                    {
                        "consumer_key_code": "display_brightness_decrement"
                    }
                ]
            }
        ]
    }
]
```
