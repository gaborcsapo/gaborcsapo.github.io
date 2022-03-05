# PerfectWeather

I created this simple website to learn more about Javascript and web development. You can check out the live website [here](http://gc1569.nyuad.im/perfectweather/perfectWeather.html)

The rationale behind the project is that we have many websites that tell you the weather at any point of the Earth but we don’t really care about the places with bad weather. We want to see the places with the perfect weather (at least when planning to travel somewhere). So in my opinion if the website was further developed it could serve some actual purpose in the world of the internet.

First, I wanted to really overcomplicate the project. I wanted to filter a weather map layer for the perfect weather and then display the layer on top of google maps, which is definitely possible I just have absolutely no clue where to start and I didn’t understand a single line of code in the examples related to the topic. So I went with the easier solution, which is just putting markers on the map.

##How does it work?

###In short:
I get weather data for a list of cities then based on the user input I grab the ones that have a perfect weather. Following that, I display them as markers on a google map.

###In detail:
The program flow starts after everything is loaded. However, for some reason the document.ready method doesn’t care about the google libraries that I load for the maps, which required a little bit of work around, because google maps wanted to initialise itself before it was loaded.

I use two APIs for the project. One is the OpenWeather API, which I use to get weather information about the top 150 tourist destinations. I hard-coded the list of cities and in a loop I send out request for data for each city, which I then store in the listofCities array. Once that’s done I’m waiting for the user to provide an input and to click the button.

As soon as this event happens, I check what values he provided for the program. A common mistake people make is that they set accidentally the minimum value to a larger number than the maximum, which results obviously in no results. Therefore I check whether the input is valid and if it’s not, I send an alert about the mistake. If it’s valid I pass the weather preference information into checkWeather function, which I wrap into the putMarkers method.

The checkWeather method simply loops through all the cities’ weather data looking for matches, which then it stores and passes on to the putMarkers method. In the following step I put the marker on the map, which I create using Google Maps API. First of all, I clear the list of markers to make sure there are no markers left over from the previous search. Then I run a loop over the list of Matches and create a marker and info window for each one of the cities. And finally I center the map so that all the markers are visible.

 

##Design

Since it’s a very simple website I wanted to keep the design clear. Since it’s all about the perfect weather I was thinking about a beach. I had an idea about a logo for the site, with a minimal depiction of a beach and with a stick figure lying on a towel. In the end, I kept the minimal beach design, made it the background of the website and discarded the stick figure because it did not really fit into the picture and it just caused a lot of problems in terms of the layout.

 

##Challenges and the future

One challenge was the event driven nature of Javascript and managing the time it took to load some of the libraries. It took some time to wrap my mind around the concept but I think I have a good understanding of how JS actually works. Other than that it is just the usual hardship one faces when using an API with all the missing documentation for certain topics. Fortunately, I chose APIs that are well documented and are popular so I could google most of my problems. In the future I want to keep using the Google Maps API since it’s widely used and it might come in handy later in my career and since it’s easy to work with.

One huge improvement I could make in the future is to incorporate a database (which we haven’t learnt though). In that case, I would call a bulk data package once a day from OpenWeatherMap, which include thousands of cities, so I wouldn’t be limited by the number of calls I can make per minute and the map could be more detailed.
