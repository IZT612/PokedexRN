#### 1. Button

Main button of the application.

| Prop    | Type                     | Required | Description                                                                       |
| :------ | :----------------------- | :------: | :-------------------------------------------------------------------------------- |
| title   | string                   |   Yes    | The text that is shown inside the button.                                         |
| onPress | () => void               |   Yes    | Function that runs when the user presses the button.                              |
| variant | 'primary' \| 'secondary' |    No    | Defines the main color of the button (Red or Blue). The default value is primary. |

#### 2. Card

Container component with shadow and rounded corners. It is used to group content inside a styled box.

| Prop     | Type      | Required | Description                                               |
| :------- | :-------- | :------: | :-------------------------------------------------------- |
| children | ReactNode |   Yes    | Elements that will be rendered inside the card component. |

#### 3. SearchInput

Text input field used for searching content inside the app.

| Prop         | Type                   | Required | Description                                                           |
| :----------- | :--------------------- | :------: | :-------------------------------------------------------------------- |
| placeholder  | string                 |    No    | Placeholder text. This is a guide text shown when the input is empty. |
| onChangeText | (text: string) => void |   Yes    | Function that receives the text written by the user.                  |

#### 4. Tag

Small label used to show categories or Pokémon types.

| Prop  | Type   | Required | Description                                              |
| :---- | :----- | :------: | :------------------------------------------------------- |
| label | string |   Yes    | The text shown inside the label.                         |
| color | string |   Yes    | Background color (it uses the pokemonTypeColors tokens). |

#### 5. ErrorMessage

Alert message component used to show errors to the user.

| Prop    | Type   | Required | Description                            |
| :------ | :----- | :------: | :------------------------------------- |
| message | string |   Yes    | The error text that will be displayed. |

#### 6. LoadingSpinner

Visual loading indicator that is centered inside its container. It does not receive any props.
