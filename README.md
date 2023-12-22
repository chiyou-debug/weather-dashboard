Our project is a weather monitoring table that also provides energy-saving suggestions based on the current temperature.

We have two members in our team. RuiJie Fan, Haocheng Lu

Our division of work:

Ruijie Fan: Implemented the functionality to retrieve weather information JSON from the 'onWeather' API.
            Designed the layout for the weather forecast display board.
            Basic architecture of the entire program.


Haocheng Lu: Implemented the login and registration functionality for the program.
             Implemented the loading of Google Maps.
             Implemented data retrieval from Firebase, marking city names and coordinates on Google Maps based on the data in Firebase.
             Implemented conditional rendering of different pop-ups based on temperature differences.
             Implemented routing functionality.



According to the scoring sheet, we've implemented the following functionalities:
1.Api: We utilized the Google API to acquire maps and employed the onWeatherAPI to obtain weather information.
2.database: We employed Firebase Authentication for user login and registration, utilized Firestore database to store geographical information of cities, and utilized Firebase Storage to store the background image for the login interface.
3.External Json:  We used the JSON obtained from the OnWeatherAPI.
4.Conditional rendering: Implemented conditional rendering based on temperature information to display different pages.
5.Sorting,Filtering,Searching: Implemented a search function that filters specific city weather information based on the user-input city name.
6.UI: Login, register, buttons, input fields.
7.Parent-Child: Passing the user-input city name as a prop to the child component, and within the child component, filtering the corresponding city's weather information based on that prop.
8.Multiple Component: Obviously,we have several components.
9.Using React Router: We used router to navigate to different pages.
10.mixture Functional and Class...: Yes.