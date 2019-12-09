# Helpers

## Color based classes

All influenced by [color declarations](../scaffolding/colors.md)

### Background (Basic)

#### Absolute values

*   **`.background-primary`**
*   **`.background-accent`**
*   **`.background-neutral`**
*   **`.background-base` (Not to be confused with theme-color)**
*   **`.background-background` (Not to be confused with theme-background)**
*   **`.background-success`**
*   **`.background-caution`**
*   **`.background-error`**
*   **`.background-intensity-1`**
*   **`.background-intensity-2`**
*   **`.background-intensity-3`**
*   **`.background-intensity-4`**
*   **`.background-intensity-5`**
*   **`.background-inherit`**
*   **`.background-transparent`**

#### Background (Gradient)

This will add gradient colors. By default, the gradient will be at angle 0deg, appending -#{$angle} will angle otherwise. **Valid angles are 45,90,135,180,225,270, and 315**

*   **`.background-gradient`** (0deg)
*   **`.background-gradient-45`** (45deg)
*   **`.background-gradient-90`** (90deg)
*   **`.background-gradient-135`** (135deg)
*   **`.background-gradient-180`** (180deg)
*   **`.background-gradient-225`** (225deg)
*   **`.background-gradient-270`** (270deg)
*   **`.background-gradient-315`** (315deg)

#### Background (Theme Based)

These classes will set the proper color based off of html tag having the `.theme-inverse` class

| Class                                 | Set color | Set color when `.theme-inverse is active`                     |
| --                                    | --        | --                                                            |
| **`.background-theme`**               | `$theme-background`             | `$theme-background-inverse`             |
| **`.background-theme-contrast`**      | `$theme-background-contrast`    | `$theme-background-contrast-inverse`    |
| **`.background-inverse`**             | `$theme-color`                  | `$theme-color-inverse`                  |
| **`.background-inverse-contrast`**    | `$theme-color-contrast`         | `$theme-color-contrast-inverse`         |

To set any background classes only on pseudo classes or interactive conditions, append whichever is needed

#### Background (Pseudo/Toggle Based) 

| Appendage | Condition when the color is applied |
| -- | -- |
| **.background-[color]-hover** | &:hover |
| **.background-[color]-focus** | &:focus,&.focus |
| **.background-[color]-active** | &:active |
| **.background-[color]-toggle** | &.open,&.active |



eg: `.background-primary-hover` applies $brand-color-primary on :hover


### Color (Basic)

#### Absolute values

*   **`.color-primary`**
*   **`.color-accent`**
*   **`.color-neutral`**
*   **`.color-base` (Not to be confused with theme-color)**
*   **`.color-background` (Not to be confused with theme-background)**
*   **`.color-success`**
*   **`.color-caution`**
*   **`.color-error`**
*   **`.color-intensity-1`**
*   **`.color-intensity-2`**
*   **`.color-intensity-3`**
*   **`.color-intensity-4`**
*   **`.color-intensity-5`**
*   **`.color-inherit`**


#### Color (Theme Based)

These classes will set the proper color based off of html tag having the `.theme-inverse` class

| Class                                 | Set color | Set color when `.theme-inverse is active`              |
| --                                    | --        | --                                                     |
| **`.color-theme`**               | `$theme-color`                 | `$theme-color-inverse`                 |
| **`.color-theme-contrast`**      | `$theme-color-contrast`        | `$theme-color-contrast-inverse`        |
| **`.color-inverse`**             | `$theme-background`            | `$theme-background-inverse`            |
| **`.color-inverse-contrast`**    | `$theme-background-contrast`   | `$theme-background-contrast-inverse`   |


#### Color (Pseudo/Toggle Based) 

| Appendage | Condition when the color is applied |
| -- | -- |
| **.color-[color]-hover** | &:hover |
| **.color-[color]-focus** | &:focus,&.focus |
| **.color-[color]-active** | &:active |
| **.color-[color]-toggle** | &.open,&.active |

## Display
*   **`.color-block`**
*   **`.color-inline-block`**
*   **`.color-inline`**

[Back to TOC](../../../readme.md)