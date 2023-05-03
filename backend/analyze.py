import sklearn
import pandas as pd
import numpy as np

import matplotlib
import matplotlib.pyplot as plt

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import TfidfTransformer 
from sklearn.feature_extraction.text import CountVectorizer 
from sklearn.metrics.pairwise import cosine_similarity
from scipy.spatial import distance
from sklearn.preprocessing import StandardScaler
from kneed import KneeLocator

from word2number import w2n
import re
import nltk
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs
from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from nltk.tokenize import TweetTokenizer
from sklearn.metrics.pairwise import cosine_similarity
from scipy.spatial import distance
from sklearn.preprocessing import StandardScaler
from kneed import KneeLocator
# nltk.download('punkt')
# nltk.download('stopwords')

# from nltk.corpus import stopwords
# from nltk.tokenize import word_tokenize



# Steps for clustering student responses
#   1. Load the data (create a file with a bunch of potential responses to a single question)
#   2. Process the data (check the spelling of each response, potentially remove stop words, remove punctuation, group like terms (ex. lbs, LBS, pounds), etc.)
#   3. Vectorize the data (convert the responses into a vector of numbers)
#   4. Cluster the data (use k-means to cluster the responses into groups)
#   5. Display the results (print out the clusters and the responses in each cluster)



# Load the data from file and return array of responses
def load_data(filename):
    responses = []
    with open(filename, 'r') as f:
        responses = f.read().splitlines()
    return responses

# Process the data and return array of processed responses
def process2_data(responses):
    processed_responses = []
    for response in responses:
        processed_response = response.lower()
        processed_responses.append(processed_response)
    final_arr = []
    for elem in processed_responses:
        x = convert_text_numbers_to_numeric_numbers(elem)
        y = standardize_number(x)
        final_arr.append(y)
        print(str(elem) + " -> " + str(y))
    return final_arr

def process_data(responses):
    processed_responses = []
    for response in responses:
        processed_response = response.lower()
        processed_responses.append(processed_response)
    return processed_responses

# Convert all text numbers in a string to numeric numbers
def convert_text_numbers_to_numeric_numbers(sentence):
    to_num_arr = []
    for word in sentence.split():
        try:
            conversion = w2n.word_to_num(word)
            if (conversion != None):
                # loop through remaining words of the sentence 
                to_num_arr.append(conversion)
        except:
            to_num_arr.append(word)
            continue
    return (" ".join(str(x) for x in to_num_arr))

def standardize_number(text):
    elems = re.split(r'(\d+)', text) 
    split_array = []
    
    count = 0
    while count < len(elems):
        elems[count] = elems[count].strip()
        if elems[count].isdigit():
            if (len(elems) - 2) <= count:
                rounded_num = round(float(elems[count]), 3)
                split_array.append(str(rounded_num))
                count += 1
                
            elif elems[count+1] == '.' and elems[count+2].isdigit():
                rounded_num = round(float("".join([elems[count], elems[count+1], elems[count+2]])), 3)
                split_array.append(str(rounded_num))
                count += 3
            elif elems[count+1] == '/' and elems[count+2].isdigit():
                rounded_num = round((float(elems[count])) / (float(elems[count+2])), 3)
                split_array.append(str(rounded_num))
                count += 3
            else:
                rounded_num = round(float(elems[count]), 3)
                split_array.append(str(rounded_num))
                count += 1

        elif elems[count] == '.':
            if (len(elems) - 1) <= count:
                count += 1
            elif elems[count+1].isdigit():
                rounded_num = round(float("".join([elems[count], elems[count+1]])), 3)
                split_array.append(str(rounded_num))
                count += 2
        else:
            get_string = re.sub('[^A-Za-z0-9]+', " ", elems[count])
            if not get_string.isspace():
                split_array.append(get_string)
            count += 1

    return (" ".join(split_array)).strip()


    


def standardize_number(text):

    # split elements via digits
    elems = re.split(r'(\d+)', text) 
    split_array = []
    
    count = 0
    while count < len(elems):
        elems[count] = elems[count].strip()

        # starts by checking if word is number
        if elems[count].isdigit():

            # checks edge case (end of answer cases)
            if (len(elems) - 2) <= count:
                rounded_num = round(float(elems[count]), 3)
                split_array.append(str(rounded_num))
                count += 1

            # checks if number is a float
            elif elems[count+1] == '.' and elems[count+2].isdigit():
                rounded_num = round(float("".join([elems[count], elems[count+1], elems[count+2]])), 3)
                split_array.append(str(rounded_num))
                count += 3

            # checks if number is a fraction
            elif elems[count+1] == '/' and elems[count+2].isdigit():
                rounded_num = round((float(elems[count])) / (float(elems[count+2])), 3)
                split_array.append(str(rounded_num))
                count += 3

            # if its just a normal int
            else:
                rounded_num = round(float(elems[count]), 3)
                split_array.append(str(rounded_num))
                count += 1

        # if a number is less than 1
        elif elems[count] == '.':
            if (len(elems) - 1) <= count:
                count += 1;
            elif elems[count+1].isdigit():
                rounded_num = round(float("".join([elems[count], elems[count+1]])), 3)
                split_array.append(str(rounded_num))
                count += 2;
        
        # if parsed string is not a number
        else:
            get_string = re.sub('[^A-Za-z0-9]+', " ", elems[count])
            if not get_string.isspace():
                split_array.append(get_string)
            count += 1

    return (" ".join(split_array)).strip()




# main
if __name__ == "__main__":

    print("Welcome to my Algorithm")

    # Initialize tweeker
    tk = TweetTokenizer()
    count_vectorizer = CountVectorizer(stop_words=[], tokenizer=tk.tokenize)
   
    
    ## Creating a data frame to represent the number of the words in every sentence
    unprocessed_responses = load_data("./text_responses_bell3.txt")
    responses = process_data(unprocessed_responses)

    final_arr = []
    for elem in responses:
        x = convert_text_numbers_to_numeric_numbers(elem)
        y = standardize_number(x)
        final_arr.append(y)

    print(final_arr)

    matrix = count_vectorizer.fit_transform(final_arr)
    table = matrix.todense()
    df = pd.DataFrame(table, columns=count_vectorizer.get_feature_names_out())


    ## Aplying the Cosine similarity module 
    values = cosine_similarity(df, df)
    df = pd.DataFrame(values)


    ## Applying the Euclidean Distance
    matrix2 = distance.cdist(df, df, 'euclidean')
    df_eucl = pd.DataFrame(matrix2)

    ## Standardization
    # scaler = StandardScaler()
    # scaled_features = scaler.fit_transform(df)

    # Varying the number of clusters and to see what the optimum k is
    kmeans_kwargs = {
    "init": "random",
    "n_init": 10,
    "max_iter": 300,
    }

    # A list holds the SSE values for each k. Try for each k 1 - 10 and compare SSE values
    sse = []
    for k in range(1, 10):
        kmeans = KMeans(n_clusters = k, **kmeans_kwargs)
        kmeans.fit(df)
        sse.append(kmeans.inertia_)
        cluster_labels = kmeans.labels_
        silhouette_avg=[]

    cluster_labels = kmeans.labels_
    silhouette_avg=[]
 

    # Calculate true k from the results
    kl = KneeLocator(range(1, 10), sse, curve="convex", direction="decreasing")
    print("True K: " + str(kl.elbow))
    true_k = kl.elbow + 3

    # ACTUAL K means - COSINE
    kmeans = KMeans(init="random", n_clusters=true_k, n_init=10, max_iter=300)
    kmeans.fit(df)
    predict = kmeans.fit_predict(df)
    #print("Array of clusters:")
    #print(predict)

    # Write COSINE results to file
    fp = input_file = open("Clusters_processed_+3_clusters_bell3.txt", "w")
    fp.write("Results Using Cosine Function \n")
    for i in range(0, 10):
        fp.write("Cluster: " + str(i) + " --> ")
        for x in range(len(responses)):
            if predict[x] == i: 
                fp.write(responses[x])
                fp.write(" | ")
        fp.write("\n")
        


     # ACTUAL K means - EUCL
    kmeans = KMeans(init="random", n_clusters=true_k, n_init=10, max_iter=300)
    kmeans.fit(df_eucl)
    predict = kmeans.fit_predict(df_eucl)
    #print("Array of clusters:")
    #print(predict)

     # Write EUCL results to file
    fp.write("\n")
    fp.write("Results Using Eucl Function \n")
    for i in range(0, 10):
        fp.write("Cluster: " + str(i) + " --> ")
        for x in range(len(responses)):
            if predict[x] == i: 
                fp.write(responses[x])
                fp.write(" | ")
        fp.write("\n")
    fp.close()
    



