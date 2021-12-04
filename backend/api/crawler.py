# required libraries - bs4, requests
# https://www.imdb.com/chart/top/ IMDB website scrapping

from bs4.builder import HTMLTreeBuilder
import requests
from bs4 import BeautifulSoup
import json

def run():
    def processLink(movie_link):
        dataDict = {}
        nested_req = requests.get(movie_link)
        soup2 = BeautifulSoup(nested_req.text, 'html.parser')
        nested_movie_content = soup2.find('div',class_=['Hero__MetaContainer__Video-kvkd64-4 kNqsIK'])
        try:
            nested_movie_desc = nested_movie_content.p.get_text(strip=True)
            nested_movie_people = nested_movie_content.find('div',class_='PrincipalCredits__PrincipalCreditsPanelWideScreen-hdn81t-0')
            nested_movie_people = nested_movie_people.find_all('div', class_='ipc-metadata-list-item__content-container')
            
            # get director, writer, star cast
            people = []
            for peop in nested_movie_people: #first for loop to separte people as per cast, writer, director
                inGroup = []
                inText = peop.find_all('a',class_='ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link')
                for individual in inText: #second for loop to separate cast if 1+ in one
                    inGroup.append(individual.get_text())
                    
                people.append(inGroup)

        except:
            nested_movie_desc = "No Description Provided"
            nested_movie_people = "Info not available"
            people = [["Not provided"],["Not provided"],["Not provided"]]


        dataDict['nested_movie_desc'] = nested_movie_desc
        dataDict['nested_movie_director'] = ', '.join(people[0])
        dataDict['nested_movie_writer'] = ', '.join(people[1])
        dataDict['nested_movie_casts'] = ', '.join(people[2])
    
        return dataDict


    try:

        baselink = 'https://www.imdb.com'
        res = requests.get(baselink+'/chart/top/')
        soup = BeautifulSoup(res.text,'html.parser')
        
        movies = soup.find('tbody', class_="lister-list")
        movies = movies.find_all('tr')
        
        myList = []

        counter = 0
        for movie in movies:
            if(counter<20):
                counter+=1
            else:
                break
            movieData = {}
            movie_image_url = movie.find('td', class_='posterColumn').find('img')['src']
            
            movie_rank = movie.find('td', class_="titleColumn").get_text(strip=True).split(".")[0]
            movie_title = movie.find('td', class_="titleColumn").get_text(strip=True).split(".")[1].split("(")[0]
            movie_year = movie.find('td', class_="titleColumn").get_text(strip=True).split(".")[1].split("(")[1][:-1]
            imdb_rating = movie.find('td', class_="imdbRating").get_text(strip=True)

            # crawl to pages of the links in this page
            movie_link = movie.find('td', class_="titleColumn").a['href']
            movie_link = baselink+movie_link
            getMovieData = processLink(movie_link)

            movieData['movie_rank']=movie_rank
            movieData['movie_image_url']=movie_image_url
            movieData['movie_title']=movie_title
            movieData['movie_year']=movie_year
            movieData['imdb_rating']=imdb_rating


            result = {**movieData,**getMovieData}
            print(result)


            # print(movieData)
            myList.append(result)

        # print(myList)

        with open('./test.json', 'w') as fout:
            json.dump(myList , fout, indent=4)


    except Exception as e:
        print(e)